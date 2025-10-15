# Dashboard Components

This directory contains reusable dashboard components for the VenueHost platform. All components are built with shadcn/ui using default theme colors and are fully responsive.

## Components

### StatCard

Displays key metrics with icons and percentage changes.

**Props:**

- `title`: string - Card title
- `value`: string | number - Main metric value
- `change`: string (optional) - Change indicator text
- `changeType`: "positive" | "negative" (optional) - Type of change
- `icon`: LucideIcon - Icon component
- `iconColor`: string (optional) - Icon color class (default: text-primary)

**Usage:**

```tsx
import { StatCard } from "@/app/components/dashboard";
import { DollarSign } from "lucide-react";

<StatCard
  title="Total Revenue"
  value="$76,900"
  change="↑12.5% from last month"
  changeType="positive"
  icon={DollarSign}
/>;
```

### AppSidebar

Main navigation sidebar using shadcn/ui Sidebar component with built-in mobile support.

**Features:**

- Responsive (collapsible on mobile, expanded on desktop)
- Active state highlighting using shadcn defaults
- Grouped navigation items (Main Menu, Preferences)
- User profile section
- Keyboard shortcut support (Ctrl/Cmd + B)

**Usage:**

```tsx
import { AppSidebar } from "@/app/components/dashboard";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>;
```

### DashboardHeader

Page header with title, search, and action buttons.

**Props:**

- `title`: string - Page title
- `subtitle`: string (optional) - Page subtitle
- `showAddButton`: boolean (optional) - Show add venue button
- `showExportButton`: boolean (optional) - Show export button
- `onAddClick`: () => void (optional) - Add button click handler
- `onExportClick`: () => void (optional) - Export button click handler

**Usage:**

```tsx
import { DashboardHeader } from "@/app/components/dashboard";

<DashboardHeader
  title="Welcome back, Alex!"
  subtitle="Here's what's happening with your venues today."
  showAddButton
  showExportButton
/>;
```

### RevenueChart

Bar chart displaying revenue over time.

**Props:**

- `data`: Array<{ month: string; value: number }> (optional) - Chart data

**Usage:**

```tsx
import { RevenueChart } from "@/app/components/dashboard";

<RevenueChart />;
```

### CalendarWidget

Interactive calendar with event highlighting.

**Props:**

- `events`: Array<{ date: number; count: number }> (optional) - Event dates

**Usage:**

```tsx
import { CalendarWidget } from "@/app/components/dashboard";

<CalendarWidget />;
```

### UpcomingEvents

List of upcoming events with venue and time details.

**Props:**

- `events`: Event[] (optional) - Array of events
- `maxEvents`: number (optional) - Maximum events to display (default: 4)

**Event Type:**

```typescript
interface Event {
  id: string;
  date: string;
  title: string;
  venue: string;
  time: string;
}
```

**Usage:**

```tsx
import { UpcomingEvents } from "@/app/components/dashboard";

<UpcomingEvents />;
```

### RecentBookings

Table displaying recent booking information.

**Props:**

- `bookings`: Booking[] (optional) - Array of bookings
- `maxBookings`: number (optional) - Maximum bookings to display (default: 4)

**Booking Type:**

```typescript
interface Booking {
  id: string;
  venue: string;
  client: string;
  eventType: string;
  date: string;
  guests: number;
  revenue: string;
  status: "confirmed" | "pending" | "cancelled";
}
```

**Usage:**

```tsx
import { RecentBookings } from "@/app/components/dashboard";

<RecentBookings />;
```

## Pages

The dashboard includes the following pages:

- `/dashboard` - Overview page with stats and charts
- `/dashboard/venues` - Venue management
- `/dashboard/bookings` - Booking management
- `/dashboard/calendar` - Calendar view
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/messages` - Client messaging
- `/dashboard/clients` - Client management
- `/dashboard/settings` - Account settings
- `/dashboard/support` - Help & Support

## Responsive Design

All components are fully responsive with:

- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive grid layouts
- Touch-friendly interactive elements
- Optimized typography scaling

## Styling

Components use:

- Tailwind CSS for styling
- shadcn/ui components as base
- **Default shadcn theme colors** (primary, accent, muted, etc.)
- Consistent spacing and typography
- Full dark mode support through CSS variables
