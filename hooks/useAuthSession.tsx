"use client";

import { useSession } from "./useSession";
import { useAuth } from "./useAuth";
import { useMemo } from "react";

export const useAuthSession = () => {
  const { data: session, isLoading, error, refetch } = useSession();
  const { useLogout } = useAuth();
  const logoutMutation = useLogout();

  // Memoize computed values to prevent unnecessary re-renders
  const computedValues = useMemo(() => {
    const user = session?.user || null;

    // More robust authentication check
    const isLoggedIn = Boolean(
      user && (user.user_id || user.email) && user.status !== "inactive"
    );

    const isAdmin = Boolean(user?.is_admin || user?.auth_role === "admin");
    const userRole = user?.role || user?.auth_role || null;

    return {
      isLoggedIn,
      user,
      isAdmin,
      userRole,
      username: user?.username,
      avatar_url: user?.avatar_url,
      created_at: user?.created_at,
      userId: user?.user_id || null,
      email: user?.email || null,
      fullname: user?.fullname || null,
      phone_number: user?.phone_number || null,
      is_verified: user?.is_verified || false,
    };
  }, [session]);

  // Secure logout function with error handling
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      // Refetch session to update auth state immediately
      await refetch();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return {
    ...computedValues,
    isLoading,
    error,
    refetch,
    logout,
    isLoggingOut: logoutMutation.isPending,
  };
};
