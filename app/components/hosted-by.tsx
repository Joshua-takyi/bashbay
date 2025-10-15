"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { Skeleton } from "@heroui/react";
import { UserIcon } from "lucide-react";
import Image from "next/image";

export default function HostedBy() {
  const session = useAuthSession();

  const avatarSrc =
    session?.avatar_url?.startsWith("data:image") ||
    session?.avatar_url?.startsWith("http")
      ? session.avatar_url
      : `data:image/jpeg;base64,${session?.avatar_url || ""}`;

  const joinedYear = session?.created_at
    ? new Date(session.created_at).getFullYear()
    : null;

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-24 rounded-lg" />
          <Skeleton className="h-3 w-32 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 py-3 px-4 my-2">
      <div className="rounded-full overflow-hidden">
        {avatarSrc ? (
          <Image
            height={40}
            width={40}
            src={avatarSrc}
            alt={session?.fullname || "Host Avatar"}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-default-200"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-default-200 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-default-500" />
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <p className="font-semibold text-sm">
          Hosted by {session?.fullname || "Host Name"}
        </p>
        <p className="text-sm text-default-400">
          Joined {joinedYear ? `in ${joinedYear}` : "recently"}
        </p>
      </div>
    </div>
  );
}
