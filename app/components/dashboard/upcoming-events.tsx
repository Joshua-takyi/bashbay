import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

interface Event {
  id: string;
  date: string;
  title: string;
  venue: string;
  time: string;
}

interface UpcomingEventsProps {
  events?: Event[];
  maxEvents?: number;
}

export function UpcomingEvents({ events, maxEvents = 4 }: UpcomingEventsProps) {
  const defaultEvents: Event[] = [
    {
      id: "1",
      date: "Oct 18",
      title: "Corporate Gala",
      venue: "Grand Ballroom",
      time: "6:00 PM",
    },
    {
      id: "2",
      date: "Oct 22",
      title: "Conference",
      venue: "Executive Conference Room",
      time: "9:00 AM",
    },
    {
      id: "3",
      date: "Oct 28",
      title: "Wedding",
      venue: "Grand Ballroom",
      time: "5:00 PM",
    },
    {
      id: "4",
      date: "Oct 30",
      title: "Birthday Party",
      venue: "Garden Terrace",
      time: "3:00 PM",
    },
  ];

  const displayEvents = (events || defaultEvents).slice(0, maxEvents);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Events</CardTitle>
        <span className="text-sm font-medium text-muted-foreground">
          {displayEvents.length} event{displayEvents.length !== 1 ? "s" : ""}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayEvents.map((event) => (
            <div
              key={event.id}
              className="flex gap-4 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
            >
              {/* Date Badge */}
              <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg px-3 py-2 min-w-[60px]">
                <span className="text-xs font-medium">{event.date}</span>
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1 truncate">
                  {event.title}
                </h4>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
