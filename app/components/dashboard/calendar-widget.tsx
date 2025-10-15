"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarWidgetProps {
  events?: Array<{ date: number; count: number }>;
}

export function CalendarWidget({ events = [] }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // Default event dates based on the image
  const defaultEvents = [15, 17, 18, 22, 28, 29, 30];

  const isEventDay = (day: number) => {
    if (events.length > 0) {
      return events.some((e) => e.date === day);
    }
    return defaultEvents.includes(day);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === 15 &&
      currentDate.getMonth() === 9 &&
      currentDate.getFullYear() === 2025
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const hasEvent = isEventDay(day);
            const isCurrentDay = isToday(day);

            return (
              <button
                key={day}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                  ${
                    isCurrentDay
                      ? "bg-primary text-primary-foreground font-semibold"
                      : hasEvent
                      ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                      : "hover:bg-accent"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
