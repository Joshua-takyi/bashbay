"use client";
import Image from "next/image";
// import { useAppContext } from "@/context/appcontext";
// import axios from "axios";
// import { useEffect } from "react";
// import Image from "next/image";
import SkeletonCard from "./skeleton-card";
import Link from "next/link";
import { HeartIcon, HeartFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utilities/currency";
import { useFavourite } from "@/hooks/useFavourite";

export type VenueData = {
  id?: string;
  name: string;
  vibe_headline?: string;
  capacity?: number | null;
  tags?: string[];
  seating_capacity?: number | null;
  standing_capacity?: number | null;
  venue_type: string[];
  ceiling_height_feet?: number | null;
  load_in_access?: string;
  alcohol_policy?: string;
  external_catering_allowed?: boolean;
  price_model?: string;
  rules: string[];
  accessibility: string[];
  min_booking_duration_hours: number;
  cancellation_policy: string;
  description: string;
  slug?: string;
  location?: string;
  images: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  fixed_price_package_price?: number;
  package_duration_hours?: number;
  overtime_rate_per_hour?: number;
  cleaning_fee?: number;
  security_deposit?: number;
  amenities: Record<string, any>;
  setup_takedown_duration?: number;
  included_items?: string[];
  price_per_hour?: number;
  availability: Record<string, string>;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type Reviews = {
  id: string;
  user_id: string;
  venue_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
};

export type VenueCardsProps = {
  success?: boolean;
  data: VenueData;
  loading?: boolean;
};

export default function VenueCards({ data, loading = false }: VenueCardsProps) {
  const { addToFavourites, removeFromFavourites, isFavourited, isLoading } =
    useFavourite();
  const { mutate: addFav } = addToFavourites(data.id || "");
  const { mutate: removeFav } = removeFromFavourites(data.id || "");

  // Check if this venue is already favorited
  const isFilled = isFavourited(data.id || "");
  const [imageError, setImageError] = useState(false);

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!data.id) return;

    if (isFilled) {
      // Remove from favourites
      removeFav(undefined, {
        onSuccess: () => {
          // addToast({ title: "Removed from favourites", color: "default" });
        },
        onError: (error) => {
          console.error("Failed to remove from favourites:", error);
          // addToast({
          //   title: "Failed to remove from favourites",
          //   color: "danger",
          // });
        },
      });
    } else {
      // Add to favourites
      addFav("venue", {
        onSuccess: () => {
          // addToast({ title: "Added to favourites", color: "success" });
        },
        onError: (error) => {
          console.error("Failed to add to favourites:", error);
          // addToast({ title: "Failed to add to favourites", color: "danger" });
        },
      });
    }
  };

  if (loading) {
    return <SkeletonCard />;
  }

  // Better image validation with fallback
  const getImageUrl = () => {
    if (!data.images || !Array.isArray(data.images)) {
      return "https://via.placeholder.com/400x300?text=No+Image";
    }

    const validImage = data.images.find((img) => {
      if (!img || typeof img !== "string") return false;
      const trimmed = img.trim();
      return (
        trimmed !== "" &&
        (trimmed.startsWith("http://") ||
          trimmed.startsWith("https://") ||
          trimmed.startsWith("/"))
      );
    });

    return validImage || "https://via.placeholder.com/400x300?text=No+Image";
  };

  const imageUrl = getImageUrl();

  return (
    <Link
      className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
      href={`/venues/${data.slug}`}
    >
      {/* Image Container */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={data.name || "no image"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          unoptimized={imageUrl.includes("placeholder")}
        />

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-gray-400">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Premier Venue Badge */}
        <div className="absolute top-2 left-2 bg-white px-2.5 py-1 rounded-md shadow-sm">
          <span className="text-xs font-semibold text-gray-800">
            Premier venue
          </span>
        </div>

        {/* Heart Icon */}
        <span
          className="absolute top-2 right-2 cursor-pointer z-10"
          onClick={handleToggleFavourite}
        >
          <motion.div
            key={isFilled ? "filled" : "empty"}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFilled ? (
              <HeartFilledIcon className="w-5 h-5 text-red-500 drop-shadow-lg" />
            ) : (
              <HeartIcon className="w-5 h-5 text-white stroke-white stroke-2 drop-shadow-lg" />
            )}
          </motion.div>
        </span>
      </div>

      {/* Content Container */}
      <div className="pt-2.5 pb-2 px-2">
        {/* Venue Type */}
        {/* <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
          {data.venue_type}
        </p> */}

        {/* Location & Name */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {data.name}
        </p>

        {/* Bottom Row - Rating and Price */}
        <div className="flex items-center justify-between">
          {/* Rating Badge */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-1.5 py-0.5 rounded">
              <StarIcon className="w-3 h-3" />
              <span className="text-xs font-semibold">10.0</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              44 reviews
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(data.price_per_hour || 0)}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {" "}
                /hr
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
