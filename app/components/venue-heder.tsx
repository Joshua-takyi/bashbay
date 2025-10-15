"use client";

import Link from "next/link";
import { HeartFilledIcon, HeartIcon, Share2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useFavourite } from "@/hooks/useFavourite";
import { VenueData } from "./venues-cards";
// import {Button} from ""
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
interface Props {
  venue: VenueData;
}

export default function VenueHeader({ venue }: Props) {
  const { addToFavourites, removeFromFavourites, isFavourited } =
    useFavourite();
  const { mutate: addFav } = addToFavourites(venue?.id || "");
  const { mutate: removeFav } = removeFromFavourites(venue?.id || "");

  // const linkPath = type === "venues" ? "/venues" : "/events";
  // const linkText = type === "venues" ? "View all venues" : "View all events";
  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const shareData = {
      title: venue?.name,
      text: `Check out ${venue?.name} – ${
        venue?.vibe_headline || "Amazing venue for your next event!"
      }`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
      }
    }
  };

  const handleToggleFavourite = () => {
    if (!venue?.id) return;
    const isCurrentlyFavourited = isFavourited(venue.id);
    if (isCurrentlyFavourited) {
      // Remove from favourites
      removeFav(undefined, {
        onSuccess: () => {
          toast.success("Removed from favourites");
        },
        onError: (error) => {
          console.error("Failed to remove from favourites:", error);
          toast.error("Failed to remove from favourites");
        },
      });
    } else {
      // Add to favourites
      addFav("venue", {
        onSuccess: () => {
          toast.success("Added to favourites");
        },
        onError: (error) => {
          console.error("Failed to add to favourites:", error);
          toast.error("Failed to add to favourites");
        },
      });
    }
  };
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-800"
    >
      {/* Left side - back link */}
      <h1 className="h2 font-medium">
        {venue?.name || "Venue Name"}
        {/* <ArrowLeftIcon className="w-4 h-4 mr-1" /> */}
      </h1>

      <div className="flex items-center gap-2">
        <Button size="icon-lg" className="cursor-pointer">
          <Share2Icon className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          // variant="light"
          onClick={handleToggleFavourite}
          className=" transition-all cursor-pointer"
        >
          {isFavourited(venue?.id || "") ? (
            <HeartFilledIcon className="w-5 h-5 text-red-500 drop-shadow-lg" />
          ) : (
            <HeartIcon className="w-5 h-5 text-white stroke-white stroke-2 drop-shadow-lg" />
          )}
        </Button>
      </div>
    </motion.header>
  );
}
