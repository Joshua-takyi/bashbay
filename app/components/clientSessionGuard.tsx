"use client";

import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ClientSessionGuardProps {
  children: React.ReactNode;
}

export default function ClientSessionGuard({
  children,
}: ClientSessionGuardProps) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If we have a user session, redirect to home page
    if (session?.user && !isLoading) {
      router.push("/");
    }
  }, [session, isLoading, router]);

  // Show loading state briefly, then show signin form
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is logged in, don't show signin form (redirect will happen)
  if (session?.user) {
    return null;
  }

  // No user session, show the signin form
  return <>{children}</>;
}
