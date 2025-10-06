import { Skeleton } from "@heroui/react";

export default function SkeletonCard() {
  return (
    <div className="group">
      {/* Image skeleton with aspect ratio */}
      <div className="relative aspect-[4/3] rounded-lg mb-3 overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-lg">
          <div className="h-full w-full rounded-lg bg-default-300" />
        </Skeleton>
        {/* Favorite icon skeleton */}
        <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full p-2">
          <Skeleton className="w-5 h-5 rounded-full">
            <div className="w-5 h-5 rounded-full bg-default-400" />
          </Skeleton>
        </div>
      </div>

      {/* Title and rating skeleton */}
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-4/5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-12 h-4 rounded-lg">
          <div className="w-12 h-4 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      {/* Location skeleton */}
      <Skeleton className="w-3/5 rounded-lg mb-2">
        <div className="h-4 w-3/5 rounded-lg bg-default-200" />
      </Skeleton>

      {/* Venue type and price skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4 rounded">
          <div className="w-4 h-4 rounded bg-default-300" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-1/5 rounded-lg">
          <div className="h-4 w-1/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </div>
  );
}
