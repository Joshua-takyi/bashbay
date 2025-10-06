"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppContext } from "../context/appcontext";

export interface SessionUser {
  user_id?: string;
  role?: string;
  email?: string;
  fullname?: string;
  phone?: string;
  is_verified?: boolean;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  is_admin?: boolean;
  username?: string;
  auth_role?: string;
  status?: string;
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

        if (userData && (userData.user_id || userData.email)) {
          return { user: userData };
        }

        return { user: null };
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          return { user: null };
        }
        // For other errors, still return null but log for debugging
        // console.error("Session check failed:", error);
        return { user: null };
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
