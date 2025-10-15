"use client";

import { useAppContext } from "@/context/appcontext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./useAuthSession";
import { AxiosError, isAxiosError } from "axios";

type FavouriteItem = {
  item_id: string;
  item_type: string;
  added_at: string;
};

interface FavouriteResponse {
  id: string;
  user_id: string;
  items: Record<string, FavouriteItem>;
  created_at: string;
  updated_at: string;
}
export const useFavourite = () => {
  const queryClient = useQueryClient();
  const { api } = useAppContext();
  const { isLoggedIn } = useAuthSession();

  const getFavourites = useQuery({
    queryKey: ["favourites"],
    queryFn: async () => {
      if (!isLoggedIn) {
        const storedFavs = localStorage.getItem("fav_items");
        if (!storedFavs) return { items: {} };
        const favArray = JSON.parse(storedFavs);
        // Convert array to object format to match API
        const itemsObj: Record<string, FavouriteItem> = {};
        favArray.forEach((fav: { id: string; item_type: string }) => {
          itemsObj[fav.id] = {
            item_id: fav.id,
            item_type: fav.item_type,
            added_at: new Date().toISOString(),
          };
        });
        return { items: itemsObj };
      }
      try {
        const res = await api.get("/favourites/");

        // console.log("API Response:", res.data);

        const responseData = Array.isArray(res.data) ? res.data[0] : res.data;

        return responseData || { items: {} };
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
        return { items: {} };
      }
    },
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  // Helper to check if an item is favorited
  const isFavourited = (itemId: string) => {
    if (!itemId || !getFavourites.data?.items) {
      // console.log(`No data for ${itemId}`, getFavourites.data);
      return false;
    }
    const isFav = itemId in getFavourites.data.items;
    // debug
    // console.log(
    //   `Checking if ${itemId} is favourited:`,
    //   isFav,
    //   "Available IDs:",
    //   Object.keys(getFavourites.data.items)
    // );
    return isFav;
  };

  const addToFavourites = (id: string) => {
    return useMutation({
      mutationFn: async (item_type: string) => {
        if (!isLoggedIn) {
          const existingFavs = localStorage.getItem("fav_items");
          const favArray = existingFavs ? JSON.parse(existingFavs) : [];
          const newFav = { id, item_type };

          // Check if already exists
          if (!favArray.some((fav: { id: string }) => fav.id === id)) {
            favArray.push(newFav);
            localStorage.setItem("fav_items", JSON.stringify(favArray));
          }
          return null;
        }
        const res = await api.post<FavouriteResponse>(`/favourites/${id}`, {
          item_type,
        });
        // console.log("Add to favourites response:", res.data);
        if (!res.data) {
          throw new Error("Failed to add to favourites");
        }

        return res.data;
      },
      onSuccess: (data) => {
        // Optimistically update the cache
        queryClient.setQueryData(["favourites"], (old: any) => {
          const newData = Array.isArray(data) ? data[0] : data;
          if (!old) {
            return (
              newData || {
                items: {
                  [id]: {
                    item_id: id,
                    item_type: "venue",
                    added_at: new Date().toISOString(),
                  },
                },
              }
            );
          }

          // If data from API has the updated items, use it
          if (newData?.items) {
            return newData;
          }

          // Otherwise manually add to cache
          if (id in old.items) return old;
          return {
            ...old,
            items: {
              ...old.items,
              [id]: {
                item_id: id,
                item_type: "venue",
                added_at: new Date().toISOString(),
              },
            },
          };
        });
        // Refetch to ensure sync
        queryClient.invalidateQueries({ queryKey: ["favourites"] });
      },
      onError: (error: AxiosError) => {
        if (isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "An error occurred";
          throw new Error(message);
        }
      },
    });
  };

  const removeFromFavourites = (id: string) => {
    return useMutation({
      mutationFn: async () => {
        if (!isLoggedIn) {
          const existingFavs = localStorage.getItem("fav_items");
          if (!existingFavs) return null;
          const favArray = JSON.parse(existingFavs);
          const updatedFavs = favArray.filter(
            (fav: { id: string }) => fav.id !== id
          );
          localStorage.setItem("fav_items", JSON.stringify(updatedFavs));
          return null;
        }
        const res = await api.delete<FavouriteResponse>(`/favourites/${id}`);
        // console.log("Remove from favourites response:", res.data);
        return res.data;
      },
      onSuccess: (data) => {
        // console.log("Remove success, updating cache");
        // Optimistically update the cache
        queryClient.setQueryData(["favourites"], (old: any) => {
          // console.log("Current cache before remove:", old);

          // Handle if API returns array
          const newData = Array.isArray(data) ? data[0] : data;

          if (!old) return { items: {} };

          // If data from API has the updated items, use it
          if (newData?.items) {
            return newData;
          }

          // Otherwise manually remove from cache
          const { [id]: removed, ...remainingItems } = old.items;
          return {
            ...old,
            items: remainingItems,
          };
        });
        // Refetch to ensure sync
        queryClient.invalidateQueries({ queryKey: ["favourites"] });
      },
      onError: (error: AxiosError) => {
        if (isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "An error occurred";
          throw new Error(message);
        }
      },
    });
  };

  const syncLocalFavorites = useMutation({
    mutationFn: async () => {
      const storedFavs = localStorage.getItem("fav_items");
      if (!storedFavs) return [];

      const favArray = JSON.parse(storedFavs);
      const results = [];

      for (const fav of favArray) {
        try {
          const res = await api.post<FavouriteResponse>(
            `/favourites/${fav.id}`,
            {
              item_type: fav.item_type,
            }
          );
          results.push(res.data);
        } catch (error) {
          console.error(`Failed to sync favorite ${fav.id}:`, error);
        }
      }

      return results;
    },
    onSuccess: () => {
      localStorage.removeItem("fav_items");
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });

  return {
    addToFavourites,
    syncLocalFavorites,
    removeFromFavourites,
    getFavourites,
    isFavourited,
    isLoading: getFavourites.isLoading,
  };
};
