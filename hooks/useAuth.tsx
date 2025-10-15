"use client";
import { useAppContext } from "@/context/appcontext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";

type AuthTypes = {
  email: string | null;
  password: string | null;
};

type userResponse = {
  id?: string;
  fullname?: string | null;
  username?: string | null;
  phone_number?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  location?: string | null;
  bio?: string | null;
  is_verified?: boolean;
  role?: string;
  preferences?: Record<string, undefined>;
  created_at?: string | null;
  updated_at?: string | null;
};

export const useAuth = () => {
  const { api } = useAppContext();
  const queryClient = useQueryClient();

  const useCreateUser = () => {
    return useMutation({
      mutationFn: async (data: AuthTypes) => {
        const response = await api.post("/signup", data);
        return response.data;
      },
      onSuccess: () => {
        // Invalidate session query to update authentication state
        queryClient.invalidateQueries({ queryKey: ["session"] });
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

  const useLogin = () => {
    return useMutation({
      mutationFn: async (data: AuthTypes) => {
        const response = await api.post("/login", data);
        return response.data;
      },
      onSuccess: () => {
        // Invalidate session query to update authentication state
        queryClient.invalidateQueries({ queryKey: ["session"] });
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

  const useUpdateUser = () => {
    return useMutation({
      mutationFn: async (data: {
        id: string;
        avatar_url?: string;
        username?: string;
        fullname?: string;
        bio?: string;
        phone_number?: string;
        location?: string;
      }) => {
        const { id, ...updateData } = data;
        const response = await api.patch(`/users/${id}`, updateData);
        // debugging
        // console.log(response.data);
        return response.data;
      },
      onSuccess: () => {
        // Invalidate user query to update user data
        queryClient.invalidateQueries({ queryKey: ["user"] });
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

  const useLogout = () => {
    return useMutation({
      mutationFn: async () => {
        const response = await api.post("/logout");
        return response.data;
      },
      onSuccess: () => {
        // Clear session query cache on logout
        queryClient.invalidateQueries({ queryKey: ["session"] });
        // Optionally clear all queries
        // queryClient.clear();
      },
      onError: (error: AxiosError) => {
        if (isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Logout failed";
          throw new Error(message);
        }
      },
    });
  };

  const getUserbyId = (id: string, enabled: boolean = true) => {
    return useQuery({
      queryKey: ["user", id],
      queryFn: async () => {
        const res = await api.get<userResponse>(`/users/${id}`);
        if (!res.data) {
          throw new Error("failed to get the user by their id ");
        }
        // console.log("user data", res.data);
        return res.data;
      },
      enabled: enabled && !!id, // Only run query if enabled and id exists
      retry: (failureCount, error) => {
        // Don't retry on 401/403 errors (authentication/authorization issues)
        if (
          error instanceof Error &&
          (error.message.includes("401") || error.message.includes("403"))
        ) {
          return false;
        }
        return failureCount < 2;
      },
    });
  };

  const uploadAvatar = () => {
    return useMutation({
      mutationFn: async (data: { id: string; avatar: File }) => {
        // Create form data
        const formData = new FormData();
        formData.append("avatar", data.avatar);

        const response = await api.patch(`/users/avatar/${data.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      },
      onSuccess: () => {
        // Invalidate user query to update user data
        queryClient.invalidateQueries({ queryKey: ["user"] });
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
  return {
    useCreateUser,
    useLogin,
    useLogout,
    useUpdateUser,
    getUserbyId,
    uploadAvatar,
  };
};
1;
