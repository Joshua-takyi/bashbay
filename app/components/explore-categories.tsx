"use client";

import * as React from "react";
import { Tabs, Tab } from "@heroui/react";
import BodyWrapper from "./body-Wrapper";
import studio from "../../public/icons/camera-svgrepo-com.svg";
// import conference from "../../public/icons/corporate-svgrepo-com.svg";
import banquet from "../../public/icons/kitchen-cabinets-2-svgrepo-com.svg";
import wellness from "../../public/icons/wellness-group-svgrepo-com.svg";
import outdoor from "../../public/icons/outdoor-dining-svgrepo-com.svg";
import party from "../../public/icons/celebration-party-winter-svgrepo-com.svg";
import wedding from "../../public/icons/wedding-cake-svgrepo-com.svg";
import dinning from "../../public/icons/food-cover-svgrepo-com.svg";
import Image from "next/image";
import { useVenues } from "@/hooks/useVenues";
import VenueCards from "./venues-cards";
import SkeletonCard from "./skeleton-card";

type Category = {
  name: string;
  icon: string;
};

export default function VenueCategories() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const { queryVenues } = useVenues();
  const { data, error, isLoading } = queryVenues({
    query: selected ? { venue_type: selected } : {},
    limit: 5,
    page: 1,
  });
  const categories: Category[] = [
    {
      name: "Wedding",
      icon: wedding,
    },
    {
      name: "Party",
      icon: party,
    },
    {
      name: "Outdoor",
      icon: outdoor,
    },
    {
      name: "Production",
      icon: studio,
    },
    {
      name: "Banquet",
      icon: banquet,
    },
    {
      name: "Wellness",
      icon: wellness,
    },
    {
      name: "Dining",
      icon: dinning,
    },
  ];
  return (
    <section className="mt-5 ">
      <BodyWrapper>
        <h2 className="h2 mb-3  ">Explore Venues by Category</h2>
        <Tabs
          variant="underlined"
          size="sm"
          className="flex justify-between w-full"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
        >
          {categories.map((category) => (
            <Tab
              className="h-full overflow-hidden flex w-full  "
              key={category.name.toLowerCase()}
              title={
                <div className="flex font-semibold flex-col items-center justify-center gap-y-2  ">
                  <Image
                    src={category.icon}
                    alt={`${category.name} icon`}
                    width={32}
                    height={32}
                  />
                  <span className="capitalize">{category.name}</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                ) : error ? (
                  <div className="col-span-full text-center py-8">
                    Error: {error.message}
                  </div>
                ) : !data || data.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    No venues available for this category
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
