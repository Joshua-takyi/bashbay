// hooks/useViewTracking.ts
import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/appcontext";

interface UseViewTrackingOptions {
  venueId?: string;
  delay?: number; // Delay before tracking (default 2000ms)
  enabled?: boolean; // Whether tracking is enabled (default true)
}

export const useViewTracking = ({
  venueId,
  delay = 2000,
  enabled = true,
}: UseViewTrackingOptions) => {
  const { api } = useAppContext();
  const hasTrackedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled || !venueId || hasTrackedRef.current.has(venueId)) {
      return;
    }

    const trackView = async () => {
      try {
        // Mark as tracked immediately to prevent duplicates
        hasTrackedRef.current.add(venueId);

        await api.post(`/venues/${venueId}/view`);
        console.log("✅ View tracked for venue:", venueId);
      } catch (error) {
        console.error("❌ Failed to track view:", error);
        // Remove from tracked set on error so it can retry
        hasTrackedRef.current.delete(venueId);
      }
    };

    // Add delay to ensure genuine human interaction
    const timer = setTimeout(trackView, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [venueId, api, delay, enabled]);

  return {
    hasTracked: venueId ? hasTrackedRef.current.has(venueId) : false,
  };
};
