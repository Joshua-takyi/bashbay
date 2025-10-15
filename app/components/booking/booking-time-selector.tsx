"use client";

import { TimeInput } from "@heroui/react";

interface BookingTimeSelectorProps {
  startTime: any;
  endTime: any;
  onStartTimeChange: (value: any) => void;
  onEndTimeChange: (value: any) => void;
}

export default function BookingTimeSelector({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: BookingTimeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <TimeInput
        label="Start time"
        value={startTime}
        onChange={onStartTimeChange}
        hourCycle={12}
      />
      <TimeInput
        label="End time"
        value={endTime}
        onChange={onEndTimeChange}
        hourCycle={12}
      />
    </div>
  );
}
