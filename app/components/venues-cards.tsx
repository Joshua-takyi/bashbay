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
import people from "../../public/icons/people-svgrepo-com.svg";

export type VenueData = {
  id?: string;
  name: string;
  venue_type: string;
  rules: string[];
  accessibility: string[];
  min_booking_duration_hours: number;
  cancellation_policy: string;
  description: string;
  location?: string;
  images: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  amenities: Record<string, boolean>;
  price_per_hour: number;
  availability: string[];
  status?: string;
  created_at?: string;
  updated_at?: string;
};

type Reviews = {
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
  const [isFilled, setIsFilled] = useState(false);
  const handleFillHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFilled(!isFilled);
  };

  if (loading) {
    return <SkeletonCard />;
  }

  const imageUrl =
    data.images && data.images.length > 0
      ? data.images[0]
      : "https://via.placeholder.com/400x300";

  return (
    <Link
      className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
      href={`/venues/${data.id}`}
    >
      {/* Image Container */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Premier Venue Badge */}
        <div className="absolute top-2 left-2 bg-white px-2.5 py-1 rounded-md shadow-sm">
          <span className="text-xs font-semibold text-gray-800">
            Premier venue
          </span>
        </div>

        {/* Heart Icon */}
        <span
          className="absolute top-2 right-2 cursor-pointer z-10"
          onClick={handleFillHeart}
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
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
          {data.venue_type}
        </p>

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
                ${data.price_per_hour}
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
