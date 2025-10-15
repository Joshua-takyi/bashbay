"use client";

import { Card, CardBody, CardHeader, Divider, Chip } from "@heroui/react";
import Image from "next/image";

interface FormPreviewProps {
  data: Record<string, any>;
  type: "venue" | "event";
  className?: string;
}

export default function FormPreview({
  data,
  type,
  className = "",
}: FormPreviewProps) {
  const formatValue = (key: string, value: any): string => {
    if (value === null || value === undefined) return "Not provided";

    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "None";
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      if (key === "coordinates") {
        return `${value.lat?.toFixed(4)}, ${value.lng?.toFixed(4)}`;
      }
      // For amenities or other object types
      const selected = Object.entries(value)
        .filter(([_, v]) => v === true)
        .map(([k]) => k);
      return selected.length > 0 ? selected.join(", ") : "None";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "number") {
      return value.toString();
    }

    return value || "Not provided";
  };

  const fieldLabels: Record<string, string> = {
    name: "Venue Name",
    title: "Event Title",
    venueType: "Venue Type",
    eventType: "Event Type",
    description: "Description",
    location: "Location",
    coordinates: "GPS Coordinates",
    capacity: "Capacity",
    maxAttendees: "Max Attendees",
    pricePerHour: "Price per Hour",
    ticketPrice: "Ticket Price",
    startTime: "Start Time",
    endTime: "End Time",
    minBookingDurationHours: "Minimum Booking",
    cancellationPolicy: "Cancellation Policy",
    amenities: "Amenities",
    availability: "Availability",
    rules: "Rules",
    accessibility: "Accessibility Features",
    venueId: "Venue",
  };

  const excludeFields = ["images", "hostId", "id"];

  return (
    <Card className={`max-w-3xl ${className}`}>
      <CardHeader className="flex flex-col items-start pb-4">
        <h3 className="text-2xl font-bold">
          {type === "venue" ? "Venue Preview" : "Event Preview"}
        </h3>
        <p className="text-sm text-default-500">
          Review your {type} details before submission
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4 p-6">
        {/* Images Preview */}
        {data.images && data.images.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-default-700">Images</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.images.slice(0, 4).map((image: File, index: number) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-lg overflow-hidden bg-default-100"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {data.images.length > 4 && (
              <p className="text-xs text-default-500">
                +{data.images.length - 4} more images
              </p>
            )}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4 mt-4">
          {Object.entries(data)
            .filter(([key]) => !excludeFields.includes(key))
            .map(([key, value]) => {
              const label = fieldLabels[key] || key;
              const displayValue = formatValue(key, value);

              // Skip empty or default values
              if (
                !value ||
                displayValue === "Not provided" ||
                displayValue === "None" ||
                displayValue === "0"
              ) {
                return null;
              }

              return (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-default-700">
                    {label}
                  </span>
                  <span className="text-sm text-default-600">
                    {displayValue}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Status Indicator */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2">
            <Chip color="primary" variant="flat" size="sm">
              Ready to Submit
            </Chip>
            <span className="text-sm text-default-600">
              All required fields are complete
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
