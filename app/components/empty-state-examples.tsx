/**
 * EmptyState Component Usage Examples
 * This file contains various examples of how to use the EmptyState component
 * throughout the BashBay application
 */
"use client";

import EmptyState from "./empty-state";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  MapPinIcon,
  HeartIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

// Example 1: No Events Hosted (Like in the image)
export function NoEventsHosted() {
  const router = useRouter();

  return (
    <EmptyState
      title="No events hosted yet"
      description="You haven't hosted any events yet. Create an event and start sharing your experiences."
      buttonText="Create Event"
      onButtonClick={() => router.push("/events/create")}
      iconSize="lg"
    />
  );
}

// Example 2: No Venues Found
export function NoVenuesFound({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      title="No venues found"
      description="We couldn't find any venues matching your search. Try adjusting your filters or search in a different location."
      icon={<MapPinIcon className="w-full h-full text-gray-400" />}
      buttonText={onReset ? "Reset Filters" : undefined}
      onButtonClick={onReset}
      iconSize="lg"
    />
  );
}

// Example 3: No Bookings
export function NoBookings() {
  const router = useRouter();

  return (
    <EmptyState
      title="No bookings yet"
      description="You haven't made any bookings. Start exploring amazing venues and book your perfect event space today!"
      icon={<CalendarIcon className="w-full h-full text-gray-400" />}
      buttonText="Browse Venues"
      onButtonClick={() => router.push("/venues")}
      iconSize="lg"
    />
  );
}

// Example 4: No Favorites
export function NoFavorites() {
  const router = useRouter();

  return (
    <EmptyState
      title="No favorites yet"
      description="You haven't saved any venues to your favorites. Start exploring and save venues you love!"
      icon={<HeartIcon className="w-full h-full text-red-400" />}
      buttonText="Explore Venues"
      onButtonClick={() => router.push("/venues")}
      iconSize="md"
    />
  );
}

// Example 5: No Reviews
export function NoReviews({ onWrite }: { onWrite?: () => void }) {
  return (
    <EmptyState
      title="No reviews yet"
      description="This venue hasn't received any reviews yet. Be the first to share your experience!"
      showDefaultIcon={false}
      buttonText={onWrite ? "Write a Review" : undefined}
      onButtonClick={onWrite}
      iconSize="sm"
      className="bg-gray-50 dark:bg-gray-900 rounded-lg py-12"
    />
  );
}

// Example 6: Search Empty State
export function SearchEmptyState() {
  return (
    <EmptyState
      title="Start your search"
      description="Enter a location, venue name, or keywords to discover amazing event spaces."
      icon={<MagnifyingGlassIcon className="w-full h-full text-gray-400" />}
      showDefaultIcon={false}
      iconSize="lg"
    />
  );
}

// Example 7: No Saved Searches
export function NoSavedSearches() {
  return (
    <EmptyState
      title="No saved searches"
      description="Save your frequent searches for quick access later."
      icon={<BookmarkIcon className="w-full h-full text-gray-400" />}
      iconSize="sm"
    />
  );
}

// Example 8: No Attendees
export function NoAttendees() {
  return (
    <EmptyState
      title="No attendees yet"
      description="Once people start registering for your event, they'll appear here."
      icon={<UserGroupIcon className="w-full h-full text-gray-400" />}
      iconSize="md"
    />
  );
}

// Example 9: Custom Image Empty State
export function CustomImageEmptyState() {
  return (
    <EmptyState
      title="Under construction"
      description="This feature is coming soon. We're working hard to bring you the best experience!"
      icon="/images/construction.svg"
      iconSize="xl"
      className="min-h-[500px]"
    />
  );
}

// Example 10: Minimal Empty State (No Icon, No Button)
export function MinimalEmptyState() {
  return (
    <EmptyState
      title="Nothing to show"
      description="There's no content available at the moment."
      showDefaultIcon={false}
      className="py-8"
    />
  );
}

// Example 11: Loading Complete, No Results
export function NoSearchResults({ query }: { query: string }) {
  return (
    <EmptyState
      title="No results found"
      description={`We couldn't find any results for "${query}". Try different keywords or check your spelling.`}
      icon={<MagnifyingGlassIcon className="w-full h-full text-gray-400" />}
      iconSize="md"
    />
  );
}

// Example 12: Error State (Can also use EmptyState)
export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      title="Something went wrong"
      description="We encountered an error loading this content. Please try again."
      showDefaultIcon={false}
      buttonText={onRetry ? "Try Again" : undefined}
      onButtonClick={onRetry}
      className="text-red-600 dark:text-red-400"
    />
  );
}
