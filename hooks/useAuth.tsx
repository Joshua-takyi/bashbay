"use client";
import { useAppContext } from "@/context/appcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";

type AuthTypes = {
  email: string | null;
  password: string | null;
};

export const useAuth = () => {
  const { api } = useAppContext();
  const queryClient = useQueryClient();

  const useCreateUser = () => {
    return useMutation({
      mutationFn: async (data: AuthTypes) => {
        const response = await api.post("/signup", data);
        return response.data;
      },
      onSuccess: () => {
        // Invalidate session query to update authentication state
        queryClient.invalidateQueries({ queryKey: ["session"] });
      },
      onError: (error: AxiosError) => {
        if (isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "An error occurred";
          throw new Error(message);
        }
      },
    });
  };

  const useLogin = () => {
    return useMutation({
      mutationFn: async (data: AuthTypes) => {
        const response = await api.post("/login", data);
        return response.data;
      },
      onSuccess: () => {
        // Invalidate session query to update authentication state
        queryClient.invalidateQueries({ queryKey: ["session"] });
      },
      onError: (error: AxiosError) => {
        if (isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "An error occurred";
          throw new Error(message);
        }
      },
    });
  };

  const useLogout = () => {
    return useMutation({
      mutationFn: async () => {
        const response = await api.post("/logout");
        return response.data;
      },
      onSuccess: () => {
        // Clear session query cache on logout
        queryClient.invalidateQueries({ queryKey: ["session"] });
        // Optionally clear all queries
        // queryClient.clear();
      },
      onError: (error: AxiosError) => {
        if (isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Logout failed";
          throw new Error(message);
        }
      },
    });
  };

  return { useCreateUser, useLogin, useLogout };
};
