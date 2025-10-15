"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const authStatus = searchParams.get("auth");
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (error) {
        toast.error(errorDescription || "Authentication failed");
        setTimeout(() => router.push("/auth/signin"), 2000);
        return;
      }

      if (authStatus === "success") {
        toast.success("Successfully signed in with Google!");
        setTimeout(() => router.push("/"), 1000);
      } else {
        // No specific status, just redirect to home
        router.push("/");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Completing sign in...
        </p>
      </div>
    </div>
  );
}
