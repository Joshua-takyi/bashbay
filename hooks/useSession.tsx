"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppContext } from "../context/appcontext";

export interface SessionUser {
  user_id?: string;
  role?: string;
  email?: string;
  phone_number?: string;
  fullname?: string;
  is_verified?: boolean;
  created_at?: string;
  is_admin?: boolean;
  auth_role?: string;
  status?: string;
  avatar_url?: string;
  username?: string;
  bio?: string;
  location?: string;
}

export interface SessionResponse {
  user: SessionUser | null;
}

export const useSession = () => {
  const { api } = useAppContext();

  return useQuery({
    queryKey: ["session"],
    queryFn: async (): Promise<SessionResponse> => {
      try {
        const response = await api.get("/profile");
        const userData = response.data;

        // Validate that we have essential user data
        if (userData && (userData.user_id || userData.email)) {
          // Ensure status is not inactive or banned
          if (userData.status === "inactive" || userData.status === "banned") {
            console.warn("User account is inactive or banned");
            return { user: null };
          }

          return { user: userData };
        }

        return { user: null };
      } catch (error) {
        // Handle 401 (unauthorized) gracefully - user not logged in
        if (error instanceof AxiosError && error.response?.status === 401) {
          return { user: null };
        }

        // Handle 403 (forbidden) - possible account issue
        if (error instanceof AxiosError && error.response?.status === 403) {
          console.warn("Access forbidden - possible account issue");
          return { user: null };
        }

        // For network errors or other issues, still return null
        // but don't spam the console in production
        if (process.env.NODE_ENV === "development") {
          console.error("Session check failed:", error);
        }

        return { user: null };
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnReconnect: true, // Refetch on network reconnect
    retry: (failureCount, error) => {
      // Don't retry on authentication/authorization errors
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          return false;
        }
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });
};
