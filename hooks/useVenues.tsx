"use client";

import { useAppContext } from "@/context/appcontext";
import { useQuery } from "@tanstack/react-query";

export type Venue = {
  id?: string;
  host_id?: string;
  images: string[];
  name: string;
  venue_type: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: Record<string, boolean>;
  price_per_hour: number;
  rules: string[];
  accessibility: string[];
  min_booking_duration_hours: number;
  cancellation_policy: string;
  availability: string[];
  capacity?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

type VenuesResponse = {
  success: boolean;
  data: Venue[];
  page?: number;
  limit?: number;
  total?: number;
};

export const useVenues = () => {
  const { api } = useAppContext();

  const ListVenues = (
    params: { limit?: number; page?: number; offset?: number } = {}
  ) => {
    const { limit = 10, page = 1, offset = 0 } = params;
    return useQuery({
      queryKey: ["venues", limit, page, offset],
      queryFn: async () => {
        const response = await api.get<VenuesResponse>("/venues/", {
          params: { limit, page, offset },
        });
        if (!response.data.success) {
          throw new Error("Failed to fetch venues");
        }
        return response.data.data || [];
      },
    });
  };

  const queryVenues = (
    params: { query?: Record<string, any>; limit?: number; page?: number } = {}
  ) => {
    const { query = {}, limit = 10, page = 1 } = params;
    return useQuery({
      queryKey: ["searchVenues", query, limit, page],
      queryFn: async () => {
        const response = await api.get<VenuesResponse>("/venues/search?", {
          params: { ...query, limit, page },
        });
        if (!response.data.success) {
          throw new Error("Failed to fetch venues");
        }
        // console.log(response.data);
        return response.data.data || [];
      },
      enabled: Object.keys(query).length > 0, // Only run the query if there are search parameters
    });
  };

  return { ListVenues, queryVenues };
};
