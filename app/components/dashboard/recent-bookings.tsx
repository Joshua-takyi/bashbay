import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

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

interface RecentBookingsProps {
  bookings?: Booking[];
  maxBookings?: number;
}

export function RecentBookings({
  bookings,
  maxBookings = 4,
}: RecentBookingsProps) {
  const defaultBookings: Booking[] = [
    {
      id: "1",
      venue: "Grand Ballroom",
      client: "Sarah Johnson",
      eventType: "Wedding",
      date: "Oct 28, 2025",
      guests: 200,
      revenue: "$5,500",
      status: "confirmed",
    },
    {
      id: "2",
      venue: "Executive Conference Room",
      client: "Tech Corp Inc.",
      eventType: "Conference",
      date: "Oct 22, 2025",
      guests: 80,
      revenue: "$2,800",
      status: "confirmed",
    },
    {
      id: "3",
      venue: "Garden Terrace",
      client: "Michael Chen",
      eventType: "Birthday Party",
      date: "Oct 30, 2025",
      guests: 50,
      revenue: "$1,800",
      status: "pending",
    },
    {
      id: "4",
      venue: "Rooftop Lounge",
      client: "StartUp Labs",
      eventType: "Networking Event",
      date: "Nov 5, 2025",
      guests: 120,
      revenue: "$3,200",
      status: "confirmed",
    },
  ];

  const displayBookings = (bookings || defaultBookings).slice(0, maxBookings);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Bookings</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your upcoming and past events
          </p>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  Venue
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  Client
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  Event Type
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  Guests
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  Revenue
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-2">
                  Status
                </th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {displayBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b last:border-0 hover:bg-accent transition-colors"
                >
                  <td className="py-4 px-2 text-sm font-medium">
                    {booking.venue}
                  </td>
                  <td className="py-4 px-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                        {booking.client.charAt(0)}
                      </div>
                      {booking.client}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">
                    {booking.eventType}
                  </td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">
                    {booking.date}
                  </td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">
                    {booking.guests}
                  </td>
                  <td className="py-4 px-2 text-sm font-medium text-green-600">
                    {booking.revenue}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
