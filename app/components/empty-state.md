# EmptyState Component

A flexible, reusable, and responsive empty state component for displaying when there's no content to show.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Customizable icon/illustration
- ✅ Default empty box illustration included
- ✅ Optional call-to-action button
- ✅ Dark mode support
- ✅ TypeScript support with full type safety
- ✅ Multiple icon size options
- ✅ Flexible styling with className prop

## Props

| Prop              | Type                           | Required | Default | Description                             |
| ----------------- | ------------------------------ | -------- | ------- | --------------------------------------- |
| `title`           | `string`                       | Yes      | -       | The main heading text to display        |
| `description`     | `string`                       | Yes      | -       | The descriptive text below the title    |
| `icon`            | `React.ReactNode \| string`    | No       | -       | Custom icon or image path               |
| `buttonText`      | `string`                       | No       | -       | Text for the call-to-action button      |
| `onButtonClick`   | `() => void`                   | No       | -       | Button click handler                    |
| `iconSize`        | `"sm" \| "md" \| "lg" \| "xl"` | No       | `"lg"`  | Size of the icon/illustration           |
| `className`       | `string`                       | No       | `""`    | Additional CSS classes                  |
| `showDefaultIcon` | `boolean`                      | No       | `true`  | Show the default empty box illustration |

## Usage Examples

### Basic Usage (Default Icon)

```tsx
import EmptyState from "@/app/components/empty-state";

export default function MyComponent() {
  return (
    <EmptyState
      title="No events hosted yet"
      description="You haven't hosted any events yet. Create an event and start sharing your experiences."
    />
  );
}
```

### With Custom Icon/Illustration

```tsx
import EmptyState from "@/app/components/empty-state";

export default function MyComponent() {
  return (
    <EmptyState
      title="No venues found"
      description="We couldn't find any venues matching your search. Try adjusting your filters."
      icon="/images/no-venues.svg"
      iconSize="xl"
    />
  );
}
```

### With Call-to-Action Button

```tsx
import EmptyState from "@/app/components/empty-state";
import { useRouter } from "next/navigation";

export default function MyComponent() {
  const router = useRouter();

  return (
    <EmptyState
      title="No bookings yet"
      description="Start exploring amazing venues and make your first booking today!"
      buttonText="Explore Venues"
      onButtonClick={() => router.push("/venues")}
      iconSize="lg"
    />
  );
}
```

### With React Icon Component

```tsx
import EmptyState from "@/app/components/empty-state";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function MyComponent() {
  return (
    <EmptyState
      title="No upcoming events"
      description="You don't have any events scheduled. Check back later or create a new event."
      icon={<CalendarIcon className="w-full h-full text-gray-400" />}
      iconSize="md"
    />
  );
}
```

### Without Default Icon

```tsx
import EmptyState from "@/app/components/empty-state";

export default function MyComponent() {
  return (
    <EmptyState
      title="Search for venues"
      description="Enter a location or venue name to start searching."
      showDefaultIcon={false}
    />
  );
}
```

### With Custom Styling

```tsx
import EmptyState from "@/app/components/empty-state";

export default function MyComponent() {
  return (
    <EmptyState
      title="No reviews yet"
      description="Be the first to leave a review for this venue!"
      buttonText="Write a Review"
      onButtonClick={() => console.log("Write review")}
      className="bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[400px]"
      iconSize="sm"
    />
  );
}
```

## Real-World Examples in BashBay

### Profile Events Tab

```tsx
// In profile page for events tab
import EmptyState from "@/app/components/empty-state";

export default function ProfileEvents() {
  const hasEvents = false; // From your data

  if (!hasEvents) {
    return (
      <EmptyState
        title="No events hosted yet"
        description="You haven't hosted any events yet. Create an event and start sharing your experiences."
        buttonText="Create Event"
        onButtonClick={() => router.push("/events/create")}
      />
    );
  }

  return <EventsList />;
}
```

### Venues Search Results

```tsx
// In venues page
import EmptyState from "@/app/components/empty-state";

export default function VenuesPage() {
  const venues = []; // From API

  if (venues.length === 0) {
    return (
      <EmptyState
        title="No venues found"
        description="We couldn't find any venues matching your search criteria. Try adjusting your filters or search in a different location."
        buttonText="Reset Filters"
        onButtonClick={handleResetFilters}
        iconSize="lg"
      />
    );
  }

  return <VenuesList venues={venues} />;
}
```

### User Bookings

```tsx
// In user bookings page
import EmptyState from "@/app/components/empty-state";

export default function MyBookings() {
  const bookings = useBookings();

  if (!bookings || bookings.length === 0) {
    return (
      <EmptyState
        title="No bookings yet"
        description="You haven't made any bookings. Start exploring amazing venues and book your perfect event space today!"
        buttonText="Browse Venues"
        onButtonClick={() => router.push("/venues")}
      />
    );
  }

  return <BookingsList bookings={bookings} />;
}
```

## Responsive Behavior

The component automatically adjusts for different screen sizes:

- **Mobile (< 640px)**: Smaller icons, compact spacing, readable text
- **Tablet (640px - 1024px)**: Medium-sized icons, comfortable spacing
- **Desktop (> 1024px)**: Larger icons, generous spacing, optimal readability

## Customization Tips

1. **Custom Colors**: Override text colors using the `className` prop
2. **Animation**: Add Framer Motion animations by wrapping the component
3. **Custom Icons**: Use SVG, React components, or image paths
4. **Multiple States**: Create variants for different empty states in your app

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Color contrast compliant
- Keyboard navigation support (for buttons)
- Screen reader friendly

## Best Practices

1. Keep titles concise and descriptive (3-7 words)
2. Use descriptions to explain why content is empty and what users can do
3. Include a CTA button when there's a clear action users should take
4. Match the tone and style with your brand
5. Use appropriate icon sizes based on the context

## Testing

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import EmptyState from "@/app/components/empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="Test Title" description="Test Description" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("calls onButtonClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(
      <EmptyState
        title="Test"
        description="Test"
        buttonText="Click Me"
        onButtonClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalled();
  });
});
```
