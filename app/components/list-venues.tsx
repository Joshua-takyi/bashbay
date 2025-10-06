"use client";

import { useVenues, Venue } from "@/hooks/useVenues";
import BodyWrapper from "./body-Wrapper";
import VenueCards from "./venues-cards";
import SkeletonCard from "./skeleton-card";
import { motion } from "framer-motion";
export const ListVenues = () => {
  const { ListVenues } = useVenues();

  const { data, error, isLoading } = ListVenues({
    limit: 10,
    page: 1,
    offset: 0,
  });

  if (isLoading)
    return (
      <motion.section>
        <BodyWrapper>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 grid grid-cols-2 md:grid-cols-4  gap-5"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        </BodyWrapper>
      </motion.section>
    );

  if (error) return <div>Error: {error.message}</div>;

  if (!data || (Array.isArray(data) && data.length === 0))
    return <div>No venues available</div>;
  return (
    <section className="py-5">
      <BodyWrapper>
        <div className="mb-8">
          <h2 className="h2">Popular Venues</h2>
        </div>
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4  gap-5">
          {data &&
            data.length > 0 &&
            data.map((venue: Venue) => (
              <VenueCards key={venue.id} data={venue} />
            ))}
        </div>
      </BodyWrapper>
    </section>
  );
};
