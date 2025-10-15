"use client";

import { useState, useEffect } from "react";
import { RangeCalendar } from "@heroui/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { Clock } from "lucide-react";
import { Divider } from "@heroui/divider";

interface UnavailableDateRange {
  start: string;
  end: string;
}

interface WeeklyHours {
  start: string;
  end: string;
}

interface AvailabilityData {
  unavailable_dates?: string[];
  unavailable_date_ranges?: UnavailableDateRange[];
  weekly_hours?: Record<string, WeeklyHours[]>;
  timezone?: string;
}

interface VenueAvailabilityCalendarProps {
  availabilityData: AvailabilityData;
}

const FULL_DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function VenueAvailabilityCalendar({
  availabilityData,
}: VenueAvailabilityCalendarProps) {
  const [dateRange, setDateRange] = useState<any>(null);
  const [visibleMonths, setVisibleMonths] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setVisibleMonths(window.innerWidth < 768 ? 1 : 2);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format time for display (convert 24h to 12h format)
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Check if a date is unavailable
  const isDateUnavailable = (date: any): boolean => {
    const dateStr = `${date.year}-${String(date.month).padStart(
      2,
      "0"
    )}-${String(date.day).padStart(2, "0")}`;

    // Check single unavailable dates
    if (availabilityData.unavailable_dates?.includes(dateStr)) {
      return true;
    }

    // Check unavailable date ranges
    if (availabilityData.unavailable_date_ranges) {
      return availabilityData.unavailable_date_ranges.some((range) => {
        const checkDate = parseDate(dateStr);
        const rangeStart = parseDate(range.start);
        const rangeEnd = parseDate(range.end);
        return (
          checkDate.compare(rangeStart) >= 0 && checkDate.compare(rangeEnd) <= 0
        );
      });
    }

    return false;
  };

  // Get working hours for a day
  const getWorkingHours = (dayName: string): WeeklyHours[] | undefined => {
    return availabilityData.weekly_hours?.[dayName];
  };

  return (
    <section className="py-8" id="availability">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Availability & Hours</h2>
          <p className="text-gray-600">
            Select your dates and review our operating hours
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Calendar */}
          <div>
            <div className="pb-2">
              <h3 className="text-lg font-medium">Select Dates</h3>
              <p className="text-sm text-gray-600">
                Choose your start and end dates
              </p>
            </div>
            <RangeCalendar
              aria-label="Select your booking dates"
              value={dateRange}
              onChange={setDateRange}
              visibleMonths={visibleMonths}
              pageBehavior="visible"
              color="primary"
              isDateUnavailable={isDateUnavailable}
              classNames={{
                base: "w-full",
                content: "flex flex-col md:flex-row gap-8",
                gridHeader: "text-xs font-medium text-gray-500",
                headerWrapper: "pb-2 flex justify-between",
                prevButton: "text-gray-500 hover:text-black",
                nextButton: "text-gray-500 hover:text-black",
                title: "text-base font-medium",
                cellButton: [
                  "text-sm w-8 h-8 flex items-center justify-center",
                  "data-[today=true]:font-medium",
                  "data-[today=true]:text-black",
                  "data-[selected=true]:text-white",
                  "data-[selected=true]:font-medium",
                  "data-[range-selection=true]:bg-gray-100",
                  "data-[range-selection=true]:text-black",
                  "data-[range-start=true]:bg-black",
                  "data-[range-start=true]:text-white",
                  "data-[range-start=true]:rounded-full",
                  "data-[range-end=true]:bg-black",
                  "data-[range-end=true]:text-white",
                  "data-[range-end=true]:rounded-full",
                  "data-[range-selection=true]:not([data-range-start=true]):not([data-range-end=true]):bg-white",
                  "data-[range-selection=true]:not([data-range-start=true]):not([data-range-end=true]):border",
                  "data-[range-selection=true]:not([data-range-start=true]):not([data-range-end=true]):border-black",
                  "data-[range-selection=true]:not([data-range-start=true]):not([data-range-end=true]):rounded-full",
                  "data-[disabled=true]:text-gray-300",
                  "data-[disabled=true]:line-through",
                  "data-[unavailable=true]:text-gray-400",
                  "data-[unavailable=true]:line-through",
                  "data-[hover=true]:bg-gray-100",
                  "transition-colors duration-150",
                ],
              }}
            />

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <span className="text-xs text-white">1</span>
                </div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center">
                  <span className="text-xs text-black">1</span>
                </div>
                <span className="text-sm text-gray-600">In Range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-xs text-gray-400 line-through">1</span>
                </div>
                <span className="text-sm text-gray-600">Unavailable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-medium">1</span>
                </div>
                <span className="text-sm text-gray-600">Today</span>
              </div>
            </div>
          </div>

          {/* Weekly Hours */}
          <div>
            <div className="pb-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Weekly Hours
              </h3>
              <p className="text-sm text-gray-600">
                Our operating hours throughout the week
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {FULL_DAY_NAMES.map((dayName, index) => {
                const shortDay = DAY_NAMES[index];
                const hours = getWorkingHours(shortDay);
                const isToday = new Date().getDay() === index;

                return (
                  <div
                    key={dayName}
                    className={`flex items-center justify-between p-3 ${
                      isToday ? "bg-gray-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 flex items-center justify-center text-sm font-medium ${
                          isToday
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {shortDay}
                      </div>
                      <span
                        className={`text-sm ${
                          isToday ? "text-black" : "text-gray-700"
                        }`}
                      >
                        {dayName}
                      </span>
                    </div>
                    <div className="text-right">
                      {hours && hours.length > 0 ? (
                        <div className="space-y-0.5">
                          {hours.map((hour, idx) => (
                            <div key={idx} className="text-sm text-gray-600">
                              {formatTime(hour.start)} - {formatTime(hour.end)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Closed</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timezone Info */}
            {availabilityData.timezone && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 text-center">
                  <span className="font-medium">Timezone:</span>{" "}
                  <span className="font-mono">{availabilityData.timezone}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <Divider className="mt-8" />
      </div>
    </section>
  );
}
