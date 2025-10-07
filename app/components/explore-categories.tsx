"use client";

import * as React from "react";
import Image from "next/image";
import { Tabs, Tab } from "@heroui/react";
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

interface Category {
  name: string;
  icon: string;
}

const VENUE_CATEGORIES: Category[] = [
  { name: "Wedding", icon: wedding },
  { name: "Party", icon: party },
  { name: "Outdoor", icon: outdoor },
  { name: "Production", icon: studio },
  { name: "Banquet", icon: banquet },
  { name: "Wellness", icon: wellness },
  { name: "Dining", icon: dinning },
];

const SKELETON_COUNT = 4;
const VENUES_LIMIT = 5;

export default function VenueCategories() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const { queryVenues } = useVenues();
  const { data, error, isLoading } = queryVenues({
    query: selected ? { venue_type: selected } : {},
    limit: VENUES_LIMIT,
    page: 1,
  });

  return (
    <section className="mt-5">
      <BodyWrapper>
        <h2 className="h2 mb-3">Explore Venues by Category</h2>
        <Tabs
          // fullWidth
          variant="underlined"
          // shouldSelectOnPressUp
          size="sm"
          color="primary"
          className="w-full"
          // classNames={{
          //   base: "p-0",
          //   tabList: "p-0",
          //   tab: "p-0",
          //   tabContent: "p-0"
          // }}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
        >
          {VENUE_CATEGORIES.map((category) => (
            <Tab
              className="h-full"
              key={category.name.toLowerCase()}
              title={
                <div className="flex flex-col items-center justify-center gap-2 font-semibold">
                  <Image
                    src={category.icon}
                    alt={`${category.name} icon`}
                    width={32}
                    height={32}
                    className="transition-transform hover:scale-110"
                  />
                  <span className="capitalize">{category.name}</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {isLoading ? (
                  Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                ) : error ? (
                  <div className="col-span-full py-8 text-center text-red-500">
                    <p className="font-medium">Error loading venues</p>
                    <p className="text-sm text-gray-500">{error.message}</p>
                  </div>
                ) : !data || data.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-gray-500">
                    <p>No venues available for this category</p>
                  </div>
                ) : (
                  data.map((venue) => (
                    <VenueCards key={venue.id} data={venue} />
                  ))
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      </BodyWrapper>
    </section>
  );
}
