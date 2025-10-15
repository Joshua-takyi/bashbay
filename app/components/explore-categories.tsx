"use client";

import Image from "next/image";
import { Tabs, Tab } from "@heroui/react";
import { motion } from "framer-motion";
import { useVenues } from "@/hooks/useVenues";
import BodyWrapper from "./body-Wrapper";
import VenueCards from "./venues-cards";
import SkeletonCard from "./skeleton-card";
import studio from "../../public/icons/camera-svgrepo-com.svg";
import banquet from "../../public/icons/kitchen-cabinets-2-svgrepo-com.svg";
import wellness from "../../public/icons/wellness-group-svgrepo-com.svg";
import outdoor from "../../public/icons/outdoor-dining-svgrepo-com.svg";
import party from "../../public/icons/celebration-party-winter-svgrepo-com.svg";
import wedding from "../../public/icons/wedding-cake-svgrepo-com.svg";
import dinning from "../../public/icons/food-cover-svgrepo-com.svg";
import conference from "../../public/icons/projector-svgrepo-com.svg";
import sports from "../../public/icons/gym-svgrepo-com.svg";
import parking from "../../public/icons/parking-svgrepo-com.svg";
import corporate from "../../public/icons/corporate-svgrepo-com.svg";
import shop from "../../public/icons/shop-2-svgrepo-com.svg";
import people from "../../public/icons/people-svgrepo-com.svg";
import bar from "../../public/icons/bar-chair-svgrepo-com.svg";
import bbq from "../../public/icons/bbq-grill-svgrepo-com.svg";
import calendar from "../../public/icons/calendar-today-svgrepo-com.svg";
import speaker from "../../public/icons/speaker-minimalistic-svgrepo-com.svg";
import tv from "../../public/icons/tv-svgrepo-com.svg";
import Wrapper from "./wrapper";
import { useRef, useState } from "react";

interface Category {
  name: string;
  icon: string;
}

const VENUE_CATEGORIES: Category[] = [
  { name: "Wedding", icon: wedding },
  { name: "Party", icon: party },
  { name: "Conference", icon: conference },
  { name: "Corporate", icon: corporate },
  { name: "Outdoor", icon: outdoor },
  { name: "Sports", icon: sports },
  { name: "Studio", icon: studio },
  { name: "Banquet", icon: banquet },
  { name: "Wellness", icon: wellness },
  { name: "Dining", icon: dinning },
  { name: "Car Park", icon: parking },
  { name: "Warehouse", icon: shop },
  { name: "Bar/Lounge", icon: bar },
  { name: "Social", icon: people },
  { name: "BBQ/Grill", icon: bbq },
  { name: "Concert", icon: speaker },
  { name: "Theater", icon: tv },
  { name: "Exhibition", icon: calendar },
  { name: "Rooftop", icon: outdoor },
  { name: "Garden", icon: outdoor },
];

const SKELETON_COUNT = 5;
const VENUES_LIMIT = 5;

export default function VenueCategories() {
  const [selected, setSelected] = useState<string | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const { queryVenues } = useVenues();
  const { data, error, isLoading } = queryVenues({
    query: selected ? { venue_type: selected } : {},
    limit: VENUES_LIMIT,
    page: 1,
  });

  return (
    <section className="mt-8">
      <Wrapper className="max-w-[90rem]">
        <h2 className="text-2xl mb-6 text-foreground-800">
          Explore Venues by Category
        </h2>

        {/* Draggable Tab List */}
        <div ref={constraintsRef} className="relative overflow-hidden mb-8">
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            className="cursor-grab active:cursor-grabbing flex gap-3 w-max py-2"
            whileTap={{ cursor: "grabbing" }}
          >
            {VENUE_CATEGORIES.map((category) => (
              <motion.button
                key={category.name.toLowerCase()}
                onClick={() => setSelected(category.name.toLowerCase())}
                className={`flex flex-col items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-none transition-all ${
                  selected === category.name.toLowerCase()
                    ? " text-primary underline-offset-8 underline font-semibold"
                    : "text-foreground-600 hover:bg-foreground-100"
                }`}
              >
                <Image
                  src={category.icon}
                  alt={`${category.name} icon`}
                  width={28}
                  height={28}
                  className="opacity-80"
                />
                <span className="text-xs whitespace-nowrap">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-2 md:gap-6 gap-4  md:grid-cols-3 lg:grid-cols-5">
          {isLoading ? (
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : error ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-red-500">Error loading venues</p>
              <p className="text-sm text-foreground-400 mt-1">
                {error.message}
              </p>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-foreground-500">
                No venues available for this category
              </p>
            </div>
          ) : (
            data.map((venue) => (
              <VenueCards
                key={venue.id}
                data={{
                  ...venue,
                  capacity: venue.capacity ?? 0,
                  venue_type: [venue.venue_type],
                  availability: {},
                }}
              />
            ))
          )}
        </div>
      </Wrapper>
    </section>
  );
}
