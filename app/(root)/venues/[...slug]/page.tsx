"use client";

import BodyWrapper from "@/app/components/body-Wrapper";
import DescriptionSection from "@/app/components/description-section";
import GetHeader from "@/app/components/getHeader";
import HostedBy from "@/app/components/hosted-by";
import ImageSection from "@/app/components/image-section";
import VenueBookingCard from "@/app/components/venue-booking-card";
import VenueHeader from "@/app/components/venue-heder";
import VenueNav from "@/app/components/venue-nav";
import VenueRules from "@/app/components/venue-rules";
import CustomCalendar from "@/app/components/custom-calendar";
import Loader from "@/app/loading";
import { useVenues } from "@/hooks/useVenues";
import { useParams } from "next/navigation";
import AmenitiesSection from "@/app/components/amenities-section";
import CapacitySection from "@/app/components/capacity-section";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appcontext";
import { useViewTracking } from "@/hooks/useViewTracking";

export default function VenuesPage() {
  const params = useParams();
  const slugParam = Array.isArray(params?.slug)
    ? params.slug.join(" ")
    : typeof params?.slug === "string"
    ? params.slug
    : "";
  const { api } = useAppContext();
  const { GetVenueBySlug } = useVenues();
  const { data: venue, isLoading } = GetVenueBySlug(slugParam);

  // Track view once when venue loads (clean implementation)
  const { hasTracked } = useViewTracking({ 
    venueId: venue?.id, 
    delay: 2000, // 2 second delay to ensure genuine view
    enabled: !!venue?.id // Only enabled when venue exists
  });

  if (isLoading) return <Loader />;
  if (!venue) return <div>Venue not found</div>;

  return (
    <main>
      <BodyWrapper>
        <VenueHeader venue={venue} />
        <ImageSection images={venue.images} />
        <VenueNav />
        <section className="flex lg:gap-x-10">
          <div className="flex-1 lg:w-2/3 w-full">
            <GetHeader
              title={venue.vibe_headline ?? slugParam}
              venue_type={venue.venue_type}
            />
            <HostedBy />
            <DescriptionSection description={venue.description} />
            <CapacitySection
              capacity={venue.capacity}
              standing_capacity={venue.standing_capacity}
              seating_capacity={venue.seating_capacity}
            />
            <AmenitiesSection amenities={venue.amenities} />
            {venue.availability && (
              <CustomCalendar availabilityData={venue.availability} />
            )}

            <VenueRules
              alcohol_policy={venue.alcohol_policy || null}
              external_catering_allowed={
                venue.external_catering_allowed || null
              }
              min_booking_duration_hours={
                venue.min_booking_duration_hours || null
              }
              setup_takedown_duration={venue.setup_takedown_duration || null}
              load_in_access={venue.load_in_access || null}
              overtime_rate_per_hour={venue.overtime_rate_per_hour || null}
              included_items={venue.included_items || null}
              security_deposit={venue.security_deposit || null}
              rules={venue.rules}
              cancellation_policy={venue.cancellation_policy}
            />
          </div>
          <BodyWrapper className=" lg:w-1/3">
            <VenueBookingCard
              pricePerHour={venue.price_per_hour ?? 0}
              capacity={venue.capacity}
              priceModel={venue.price_model ?? ""}
              availabilityData={venue.availability}
            />
          </BodyWrapper>
        </section>
      </BodyWrapper>
    </main>
  );
}
