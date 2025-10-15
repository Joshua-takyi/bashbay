"use client";

import { Input } from "@heroui/input";
import { UsersIcon } from "@heroicons/react/24/outline";

interface BookingAttendeesInputProps {
  attendees: number;
  capacity: number;
  onChange: (attendees: number) => void;
}

export default function BookingAttendeesInput({
  attendees,
  capacity,
  onChange,
}: BookingAttendeesInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      capacity,
      Math.max(1, parseInt(e.target.value) || 1)
    );
    onChange(value);
  };

  return (
    <div className="relative">
      <Input
        type="number"
        label="Attendees"
        value={attendees.toString()}
        onChange={handleChange}
        min={1}
        max={capacity}
        startContent={<UsersIcon className="w-4 h-4 text-default-400" />}
        // description={`Max capacity: ${capacity} people`}
      />
    </div>
  );
}
