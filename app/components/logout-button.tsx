"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_PROD_URL
          : process.env.NEXT_PUBLIC_DEV_URL || "http://localhost:8080/api/v1";

      const response = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/auth/signin");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="ghost"
      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
}
