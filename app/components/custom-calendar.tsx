"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

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

interface CustomCalendarProps {
  availabilityData: AvailabilityData;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
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
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DateInfo {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isUnavailable: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
}

export default function CustomCalendar({
  availabilityData,
}: CustomCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Format time for display (convert 24h to 12h format)
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Check if a date is unavailable
  const isDateUnavailable = (date: Date): boolean => {
    const dateStr = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    // Check single unavailable dates
    if (availabilityData.unavailable_dates?.includes(dateStr)) {
      return true;
    }

    // Check unavailable date ranges
    if (availabilityData.unavailable_date_ranges) {
      return availabilityData.unavailable_date_ranges.some((range) => {
        const checkDate = new Date(dateStr);
        const rangeStart = new Date(range.start);
        const rangeEnd = new Date(range.end);
        return checkDate >= rangeStart && checkDate <= rangeEnd;
      });
    }

    return false;
  };

  // Get working hours for a day
  const getWorkingHours = (dayName: string): WeeklyHours[] | undefined => {
    return availabilityData.weekly_hours?.[dayName];
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getDaysInMonth = (month: number, year: number): DateInfo[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DateInfo[] = [];

    // Add previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isUnavailable: isDateUnavailable(date),
        isSelected: false,
        isInRange: false,
        isRangeStart: false,
        isRangeEnd: false,
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        day,
        month,
        year,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        isUnavailable: isDateUnavailable(date),
        isSelected: false,
        isInRange: false,
        isRangeStart: false,
        isRangeEnd: false,
      });
    }

    // Add next month's days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        day,
        month: month + 1,
        year,
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isUnavailable: isDateUnavailable(date),
        isSelected: false,
        isInRange: false,
        isRangeStart: false,
        isRangeEnd: false,
      });
    }

    return days;
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderMonth = (monthOffset: number) => {
    let month = currentMonth + monthOffset;
    let year = currentYear;

    if (month > 11) {
      month = month - 12;
      year = year + 1;
    } else if (month < 0) {
      month = month + 12;
      year = year - 1;
    }

    const days = getDaysInMonth(month, year);

    return (
      <div className="flex-1 min-w-[300px]">
        <div className="mb-4">
          <h3 className="text-base font-medium text-gray-900">
            {MONTHS[month]} {year}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {WEEKDAYS.map((day, index) => (
            <div
              key={index}
              className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}

          {/* Days */}
          {days.map((dayInfo, index) => {
            const isDisabled = !dayInfo.isCurrentMonth || dayInfo.isUnavailable;
            const baseClasses =
              "h-10 flex items-center justify-center text-sm transition-all";
            let classes = baseClasses;

            if (!dayInfo.isCurrentMonth) {
              classes += " text-gray-300";
            } else if (dayInfo.isUnavailable) {
              classes += " text-gray-400 line-through opacity-50";
            } else if (dayInfo.isToday) {
              classes += " bg-blue-500 text-white font-semibold rounded-full";
            } else {
              classes += " text-gray-900 bg-green-50 rounded-full";
            }

            return (
              <div
                key={index}
                className={classes}
                title={
                  dayInfo.isUnavailable && dayInfo.isCurrentMonth
                    ? "Unavailable"
                    : dayInfo.isCurrentMonth
                    ? "Available"
                    : ""
                }
              >
                {dayInfo.day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="py-8" id="availability">
      <div className="max-w-6xl mx-auto px-2 py-2">
        {/* <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Availability & Hours</h2>
          <p className="text-gray-600">
            Select your dates and review our operating hours
          </p>
        </div> */}

        {/* Calendar Section */}
        <div className="mb-8">
          {/* <div className="mb-6">
            <h3 className="text-lg font-medium mb-1">Select Dates</h3>
            <p className="text-sm text-gray-600">
              Choose your start and end dates
            </p>
          </div> */}

          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Two Month View */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {renderMonth(0)}
            {renderMonth(1)}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-50 rounded-full border border-green-200"></div>
              <span className="text-gray-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Today</span>
            </div>
          </div>
        </div>

        {/* Weekly Hours Section */}
        <div className="mt-5 pt-3 border-t border-gray-200">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900">
              Weekly Hours
            </h3>
          </div>

          <div className="space-y-0 max-w-2xl">
            {FULL_DAY_NAMES.map((dayName, index) => {
              const shortDay = DAY_NAMES[index];
              const hours = getWorkingHours(shortDay);
              const isToday = new Date().getDay() === index;

              return (
                <div
                  key={dayName}
                  className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-0 transition-colors ${
                    isToday ? "bg-gray-50 -mx-4 px-4" : ""
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isToday ? "font-semibold text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {dayName}
                  </span>
                  <div className="text-right">
                    {hours && hours.length > 0 ? (
                      <div className="space-y-0.5">
                        {hours.map((hour, idx) => (
                          <div
                            key={idx}
                            className={`text-sm ${
                              isToday
                                ? "font-medium text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
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

          {/* Timezone Info
          {availabilityData.timezone && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="text-gray-500">Timezone:</span>{" "}
                {availabilityData.timezone}
              </p>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}
