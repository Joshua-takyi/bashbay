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
      className="relative rounded-md border-[0.5px] border-gray-300"
      href={`/venues/${data.id}`}
    >
      <div className="relative h-[15rem] rounded-lg overflow-hidden w-full">
        <Image src={imageUrl} alt={data.name} fill className="object-cover" />
      </div>
      <span
        className="absolute top-2 right-2 cursor-pointer z-10 bg-white/60 dark:bg-black/50 backdrop-blur-sm rounded-full p-2"
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
            <HeartFilledIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-white drop-shadow-lg" />
          )}
        </motion.div>
      </span>
      <div className="flex justify-between items-center my-3 px-2">
        <div className="flex flex-col">
          <p className="font-medium text-[1rem]">{data.name}</p>
          <p className="small my-1 ">{data.location}</p>
          <div>{/* <Person */}</div>
        </div>
        <span>
          <StarIcon className="inline-block w-4 h-4 text-yellow-500 " />
          {4.5}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1 px-2 ">
        <Image
          src={people}
          alt="people icon"
          width={16}
          height={16}
          className="inline-block w-4 h-4 mr-1"
        />
        <span className="text-tiny">{data.venue_type}</span>
        <span className="text-cyan-500">&#8226; ${data.price_per_hour}/hr</span>
      </div>
    </Link>
  );
}
