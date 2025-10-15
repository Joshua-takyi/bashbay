"use client";

import { useState, useCallback } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@heroui/react";
import ImageUpload from "../image-upload";
import { CalendarIcon } from "@radix-ui/react-icons";

interface EventFormData {
  title: string;
  description: string;
  venueId: string;
  startTime: string;
  endTime: string;
  maxAttendees: number;
  eventType: string;
  ticketPrice: number;
  images: File[];
}

const EVENT_TYPES = [
  "Conference",
  "Workshop",
  "Seminar",
  "Concert",
  "Party",
  "Meeting",
  "Exhibition",
  "Networking",
  "Sports",
  "Other",
];

export default function EventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    venueId: "",
    startTime: "",
    endTime: "",
    maxAttendees: 0,
    eventType: "",
    ticketPrice: 0,
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof EventFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagesChange = useCallback((files: File[]) => {
    setFormData((prev) => ({ ...prev, images: files }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to submit event
      console.log("Submitting event:", formData);

      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("venueId", formData.venueId);
      submitData.append("startTime", formData.startTime);
      submitData.append("endTime", formData.endTime);
      submitData.append("maxAttendees", formData.maxAttendees.toString());
      submitData.append("eventType", formData.eventType);
      submitData.append("ticketPrice", formData.ticketPrice.toString());

      // Append images
      formData.images.forEach((image) => {
        submitData.append(`images`, image);
      });

      // Replace with actual API endpoint
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   body: submitData,
      // });

      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold mb-2">Create an Event</h2>
        <p className="text-default-600">
          Fill in the details below to create your event
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Event Images</label>
        <ImageUpload
          mode="multiple"
          maxFiles={10}
          maxFileSize={20}
          onImagesChange={handleImagesChange}
          showPreview={true}
        />
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          label="Event Title"
          placeholder="E.g., Annual Tech Conference"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />
        <Select
          isRequired
          label="Event Type"
          placeholder="Select event type"
          selectedKeys={formData.eventType ? [formData.eventType] : []}
          onChange={(e) => handleInputChange("eventType", e.target.value)}
          classNames={{
            trigger: "h-12",
          }}
        >
          {EVENT_TYPES.map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Description */}
      <Textarea
        isRequired
        label="Event Description"
        placeholder="Describe your event in detail..."
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        minRows={5}
        classNames={{
          input: "text-sm",
        }}
      />

      {/* Venue Selection - TODO: Replace with actual venue dropdown from API */}
      <Input
        isRequired
        label="Venue ID"
        placeholder="Enter or select venue"
        value={formData.venueId}
        onChange={(e) => handleInputChange("venueId", e.target.value)}
        description="In production, this will be a searchable dropdown of available venues"
        classNames={{
          input: "text-sm",
          inputWrapper: "h-12",
        }}
      />

      {/* Date and Time */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Event Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            isRequired
            type="datetime-local"
            label="Start Time"
            value={formData.startTime}
            onChange={(e) => handleInputChange("startTime", e.target.value)}
            classNames={{
              input: "text-sm",
              inputWrapper: "h-12",
            }}
          />
          <Input
            isRequired
            type="datetime-local"
            label="End Time"
            value={formData.endTime}
            onChange={(e) => handleInputChange("endTime", e.target.value)}
            classNames={{
              input: "text-sm",
              inputWrapper: "h-12",
            }}
          />
        </div>
      </div>

      {/* Attendees and Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          type="number"
          label="Maximum Attendees"
          placeholder="Number of attendees"
          value={formData.maxAttendees ? formData.maxAttendees.toString() : ""}
          onChange={(e) =>
            handleInputChange("maxAttendees", parseInt(e.target.value) || 0)
          }
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />
        <Input
          type="number"
          label="Ticket Price ($)"
          placeholder="e.g., 50 (Leave 0 for free events)"
          value={formData.ticketPrice ? formData.ticketPrice.toString() : ""}
          onChange={(e) =>
            handleInputChange("ticketPrice", parseFloat(e.target.value) || 0)
          }
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-default-200">
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-full h-14 text-base font-semibold"
          isLoading={isSubmitting}
        >
          Create Event
        </Button>
      </div>
    </form>
  );
}
