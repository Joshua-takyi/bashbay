"use client";

import { useSession } from "./useSession";
import { useAuth } from "./useAuth";
import { join } from "path";

export const useAuthSession = () => {
  const { data: session, isLoading, error, refetch } = useSession();
  const { useLogout } = useAuth();
  const logoutMutation = useLogout();

  const isLoggedIn = Boolean(session?.user);

  const user = session?.user || null;

  const isAdmin = Boolean(user?.is_admin || user?.auth_role === "admin");
  const userRole = user?.role || user?.auth_role || null;

  // Convenient logout function
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return {
    isLoggedIn,
    isLoading,
    error,

    user,
    isAdmin,
    userRole,

    userId: user?.user_id || null,
    email: user?.email || null,
    username: user?.username || null,
    phone: user?.phone || null,
    avatar_url: user?.avatar_url || null,
    is_verified: user?.is_verified || null,
    fullname: user ? `${user.fullname}` : null,
    joinedAt: user?.created_at || null,

    refetch,
    logout,
    isLoggingOut: logoutMutation.isPending,
  };
};
