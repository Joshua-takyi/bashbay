"use client";

import { Tabs, Tab, Skeleton } from "@heroui/react";
import EmptyState from "./empty-state";
import { useAuthSession } from "@/hooks/useAuthSession";

interface ProfileTabsProps {
  tabA?: string;
  tabB?: string;
  header?: string;
  headerType?: "hosted_by" | "user_venues" | "user_events" | "custom";
  content?: React.ReactNode;
  isEmpty?: boolean;
}

export default function ProfileTabs({
  tabA,
  tabB,
  header,
  headerType = "hosted_by",
  content,
  isEmpty,
}: ProfileTabsProps) {
  const { user, isLoading } = useAuthSession();

  const getHeaderText = () => {
    const userName = user?.fullname || "You";

    if (header && headerType === "custom") {
      return header.replace("{name}", userName);
    }

    switch (headerType) {
      case "hosted_by":
        return `Hosted by ${userName}`;
      case "user_venues":
        return `${userName} venues`;
      case "user_events":
        return `${userName} events`;
      default:
        return header || `Hosted by ${userName}`;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="h4 font-semibold mb-4">{getHeaderText()}</p>
      <Tabs
        aria-label="Profile sections"
        variant="underlined"
        color="default"
        classNames={{
          base: "p-0",
          tab: "px-2 py-1 sm:px-4 sm:py-2",
        }}
      >
        <Tab key={tabA} title={tabA}>
          {isEmpty ? (
            <EmptyState
              title="No venues listed"
              description="You haven't listed any venues yet. Start by adding your first venue to get bookings."
            />
          ) : (
            content
          )}
        </Tab>
        <Tab key={tabB} title={tabB}>
          {isEmpty ? (
            <EmptyState
              title={`No ${tabB?.toLowerCase()} yet`}
              description={`You haven't added any ${tabB?.toLowerCase()} yet. Start by adding your first ${tabB?.toLowerCase()}.`}
            />
          ) : (
            content
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
