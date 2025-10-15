# Booking Components

A collection of clean, minimal, and reusable booking components for event venue reservations.

## Components Overview

### 1. **VenueBookingCard** (Main Component)

The main booking card that orchestrates all sub-components.

**Location:** `/app/components/venue-booking-card.tsx`

**Props:**

```typescript
interface VenueBookingCardProps {
  pricePerHour: number; // Hourly rate for the venue
  minBookingDuration?: number; // Minimum hours required (default: 2)
  capacity?: number; // Maximum attendees (default: 50)
  cleaningFee?: number; // One-time cleaning fee (default: 0)
  cancellationPolicy?: string; // Cancellation policy text
  onBook?: (details: BookingDetails) => void; // Callback when booking
  className?: string; // Additional CSS classes
}
```

**Usage:**

```tsx
import VenueBookingCard from "@/app/components/venue-booking-card";

<VenueBookingCard
  pricePerHour={150}
  minBookingDuration={3}
  capacity={100}
  cleaningFee={75}
  cancellationPolicy="Free cancellation within 24 hours"
  onBook={(details) => {
    console.log("Booking:", details);
  }}
/>;
```

---

### 2. **BookingPriceHeader**

Displays the hourly price in a clean format.

**Location:** `/app/components/booking/booking-price-header.tsx`

**Props:**

```typescript
interface BookingPriceHeaderProps {
  pricePerHour: number;
}
```

**Usage:**

```tsx
<BookingPriceHeader pricePerHour={150} />
```

---

### 3. **BookingDateSelector**

Date range picker using HeroUI's DateRangePicker component.

**Location:** `/app/components/booking/booking-date-selector.tsx`

**Props:**

```typescript
interface BookingDateSelectorProps {
  value: any; // Current date range value
  onChange: (value: any) => void; // Handler for date changes
}
```

**Usage:**

```tsx
const [dateRange, setDateRange] = useState(null);

<BookingDateSelector value={dateRange} onChange={setDateRange} />;
```

---

### 4. **BookingTimeSelector**

Time picker for start and end times using HeroUI's TimeInput.

**Location:** `/app/components/booking/booking-time-selector.tsx`

**Props:**

```typescript
interface BookingTimeSelectorProps {
  startTime: any;
  endTime: any;
  onStartTimeChange: (value: any) => void;
  onEndTimeChange: (value: any) => void;
}
```

**Usage:**

```tsx
const [startTime, setStartTime] = useState(null);
const [endTime, setEndTime] = useState(null);

<BookingTimeSelector
  startTime={startTime}
  endTime={endTime}
  onStartTimeChange={setStartTime}
  onEndTimeChange={setEndTime}
/>;
```

---

### 5. **BookingAttendeesInput**

Input field for number of attendees with capacity validation.

**Location:** `/app/components/booking/booking-attendees-input.tsx`

**Props:**

```typescript
interface BookingAttendeesInputProps {
  attendees: number;
  capacity: number;
  onChange: (attendees: number) => void;
}
```

**Usage:**

```tsx
const [attendees, setAttendees] = useState(2);

<BookingAttendeesInput
  attendees={attendees}
  capacity={100}
  onChange={setAttendees}
/>;
```

---

### 6. **BookingPriceBreakdown**

Displays the cost breakdown including base price, fees, and total.

**Location:** `/app/components/booking/booking-price-breakdown.tsx`

**Props:**

```typescript
interface BookingPriceBreakdownProps {
  pricePerHour: number;
  totalHours: number;
  cleaningFee: number;
  basePrice: number;
  serviceFee: number;
  total: number;
}
```

**Usage:**

```tsx
<BookingPriceBreakdown
  pricePerHour={150}
  totalHours={8}
  cleaningFee={75}
  basePrice={1200}
  serviceFee={120}
  total={1395}
/>
```

---

### 7. **BookingValidationMessage**

Shows validation warnings when booking requirements aren't met.

**Location:** `/app/components/booking/booking-validation-message.tsx`

**Props:**

```typescript
interface BookingValidationMessageProps {
  totalHours: number;
  minBookingDuration: number;
  isValid: boolean;
}
```

**Usage:**

```tsx
<BookingValidationMessage
  totalHours={1.5}
  minBookingDuration={2}
  isValid={false}
/>
```

---

### 8. **BookingButton**

Primary action button for submitting the booking.

**Location:** `/app/components/booking/booking-button.tsx`

**Props:**

```typescript
interface BookingButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}
```

**Usage:**

```tsx
<BookingButton isDisabled={!isValid} onClick={handleBooking} />
```

---

## Complete Example

```tsx
"use client";

import { useState } from "react";
import VenueBookingCard from "@/app/components/venue-booking-card";
import type { BookingDetails } from "@/app/components/venue-booking-card";

export default function VenuePage() {
  const handleBooking = (details: BookingDetails) => {
    console.log("Booking submitted:", details);
    // Send to API, redirect to payment, etc.
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Venue details */}
        <div className="lg:col-span-2">
          <h1>Beautiful Event Space</h1>
          <p>Your venue description...</p>
        </div>

        {/* Booking card */}
        <div>
          <VenueBookingCard
            pricePerHour={150}
            minBookingDuration={3}
            capacity={100}
            cleaningFee={75}
            cancellationPolicy="Free cancellation within 24 hours"
            onBook={handleBooking}
          />
        </div>
      </div>
    </div>
  );
}
```

---

## BookingDetails Type

The booking callback receives the following data structure:

```typescript
interface BookingDetails {
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  startTime: string; // Time in format "HH:MM"
  endTime: string; // Time in format "HH:MM"
  attendees: number; // Number of guests
  totalHours: number; // Calculated duration
  totalCost: number; // Final price including fees
}
```

---

## Features

✅ **Clean & Minimal Design** - Modern, uncluttered UI  
✅ **Fully Responsive** - Works on mobile, tablet, and desktop  
✅ **HeroUI Components** - Uses native DateRangePicker and TimeInput  
✅ **Modular Architecture** - Each part is a separate, reusable component  
✅ **Type Safe** - Full TypeScript support  
✅ **Dark Mode Ready** - Supports HeroUI's dark mode  
✅ **Real-time Validation** - Instant feedback on booking requirements  
✅ **Automatic Calculations** - Dynamic price breakdown

---

## Styling

All components use HeroUI's design tokens for consistent styling:

- `text-default-500` for secondary text
- `text-default-600` for muted text
- `text-default-400` for helper text
- Built-in responsive utilities

You can customize appearance with the `className` prop or by modifying the components directly.

---

## Dependencies

- `@heroui/react` - UI components
- `@heroui/button`, `@heroui/card`, `@heroui/divider`, `@heroui/input` - HeroUI primitives
- `@internationalized/date` - Date utilities
- `@heroicons/react` - Icons
- `react` - Core library

---

## Notes

- The service fee is calculated at 10% of the base price
- Minimum booking duration validation is enforced
- Attendee count is automatically capped at venue capacity
- Dates cannot be selected in the past
- All monetary values are formatted to 2 decimal places
