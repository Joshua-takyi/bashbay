"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile page since we now use modal for editing
    router.replace("/profile");
  }, [router]);

  return null;
}
