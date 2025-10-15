# Component Structure

```
venue-booking-card.tsx (Main Container)
├── booking-price-header.tsx
│   └── Displays: $150 /hour
│
├── booking-date-selector.tsx
│   └── HeroUI DateRangePicker
│
├── booking-time-selector.tsx
│   ├── Start time (TimeInput)
│   └── End time (TimeInput)
│
├── booking-attendees-input.tsx
│   └── Number input with capacity validation
│
├── booking-price-breakdown.tsx
│   ├── Base price calculation
│   ├── Cleaning fee (if > 0)
│   ├── Service fee (10%)
│   └── Total
│
├── booking-validation-message.tsx
│   └── Shows warnings when invalid
│
└── booking-button.tsx
    ├── "Book now" button
    └── "You won't be charged yet" text
```

## File Structure

```
client/app/components/
├── venue-booking-card.tsx       # Main orchestrator component
└── booking/
    ├── index.ts                 # Barrel export file
    ├── README.md                # Documentation
    ├── booking-price-header.tsx
    ├── booking-date-selector.tsx
    ├── booking-time-selector.tsx
    ├── booking-attendees-input.tsx
    ├── booking-price-breakdown.tsx
    ├── booking-validation-message.tsx
    └── booking-button.tsx
```

## Import Methods

### Method 1: Import the main component

```tsx
import VenueBookingCard from "@/app/components/venue-booking-card";

<VenueBookingCard pricePerHour={150} />;
```

### Method 2: Import from barrel file

```tsx
import { VenueBookingCard, BookingDetails } from "@/app/components/booking";

<VenueBookingCard pricePerHour={150} />;
```

### Method 3: Import individual components

```tsx
import BookingPriceHeader from "@/app/components/booking/booking-price-header";
import BookingDateSelector from "@/app/components/booking/booking-date-selector";

// Build your own custom layout
<BookingPriceHeader pricePerHour={150} />
<BookingDateSelector value={date} onChange={setDate} />
```
