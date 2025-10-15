"use client";

import { Input } from "@heroui/react";

interface AvailabilityScheduleProps {
  availability: Record<string, string>;
  onAvailabilityChange: (availability: Record<string, string>) => void;
  className?: string;
}

const DAYS_OF_WEEK = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export default function AvailabilitySchedule({
  availability,
  onAvailabilityChange,
  className = "",
}: AvailabilityScheduleProps) {
  const handleDayChange = (day: string, value: string) => {
    onAvailabilityChange({
      ...availability,
      [day]: value,
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold">Availability</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {DAYS_OF_WEEK.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <Input
              value={availability[key] || ""}
              onChange={(e) => handleDayChange(key, e.target.value)}
              placeholder="e.g., 9am-5pm"
              classNames={{
                input: "text-sm",
                inputWrapper: "h-12",
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-default-500">
        Enter time ranges (e.g., "9am-5pm") or "Closed" for unavailable days
      </p>
    </div>
  );
}
