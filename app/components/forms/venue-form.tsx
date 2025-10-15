"use client";

import { useState, useCallback } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@heroui/react";
import ImageUpload from "../image-upload";
import AmenitiesSelector from "./amenities-selector";
import AvailabilitySchedule from "./availability-schedule";
import DynamicListInput from "./dynamic-list-input";
import LocationPicker from "./location-picker";

interface VenueFormData {
  name: string;
  venueType: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  capacity: number;
  pricePerHour: number;
  minBookingDurationHours: number;
  cancellationPolicy: string;
  amenities: Record<string, boolean>;
  availability: Record<string, string>;
  rules: string[];
  accessibility: string[];
  images: File[];
}

const VENUE_TYPES = [
  "Conference Hall",
  "Meeting Room",
  "Outdoor Space",
  "Banquet Hall",
  "Auditorium",
  "Classroom",
  "Studio",
  "Gallery",
  "Garden",
  "Rooftop",
];

const CANCELLATION_POLICIES = ["Flexible", "Moderate", "Strict"];

export default function VenueForm() {
  const [formData, setFormData] = useState<VenueFormData>({
    name: "",
    venueType: "",
    description: "",
    location: "",
    coordinates: { lat: 0, lng: 0 },
    capacity: 0,
    pricePerHour: 0,
    minBookingDurationHours: 1,
    cancellationPolicy: "",
    amenities: {},
    availability: {},
    rules: [],
    accessibility: [],
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof VenueFormData,
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
      // TODO: Implement API call to submit venue
      console.log("Submitting venue:", formData);

      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      submitData.append("name", formData.name);
      submitData.append("venueType", formData.venueType);
      submitData.append("description", formData.description);
      submitData.append("location", formData.location);
      submitData.append("coordinates", JSON.stringify(formData.coordinates));
      submitData.append("capacity", formData.capacity.toString());
      submitData.append("pricePerHour", formData.pricePerHour.toString());
      submitData.append(
        "minBookingDurationHours",
        formData.minBookingDurationHours.toString()
      );
      submitData.append("cancellationPolicy", formData.cancellationPolicy);
      submitData.append("amenities", JSON.stringify(formData.amenities));
      submitData.append("availability", JSON.stringify(formData.availability));
      submitData.append("rules", JSON.stringify(formData.rules));
      submitData.append(
        "accessibility",
        JSON.stringify(formData.accessibility)
      );

      // Append images
      formData.images.forEach((image) => {
        submitData.append(`images`, image);
      });

      // Replace with actual API endpoint
      // const response = await fetch('/api/venues', {
      //   method: 'POST',
      //   body: submitData,
      // });

      alert("Venue submitted successfully!");
    } catch (error) {
      console.error("Error submitting venue:", error);
      alert("Failed to submit venue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold mb-2">List your venue</h2>
        <p className="text-default-600">
          Fill in the details below to create your venue listing
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
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
          label="Venue Name"
          placeholder="E.g., The Grand Hall"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />
        <Select
          isRequired
          label="Venue Type"
          placeholder="Select venue type"
          selectedKeys={formData.venueType ? [formData.venueType] : []}
          onChange={(e) => handleInputChange("venueType", e.target.value)}
          classNames={{
            trigger: "h-12",
          }}
        >
          {VENUE_TYPES.map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Description */}
      <Textarea
        isRequired
        label="Description"
        placeholder="Describe your venue in a few words..."
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        minRows={5}
        classNames={{
          input: "text-sm",
        }}
      />

      {/* Location */}
      <LocationPicker
        location={formData.location}
        coordinates={formData.coordinates}
        onLocationChange={(location) => handleInputChange("location", location)}
        onCoordinatesChange={(coordinates) =>
          setFormData((prev) => ({ ...prev, coordinates }))
        }
      />
      {/* <LocationPicker /> */}
      {/* Capacity and Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          type="number"
          label="Capacity"
          placeholder="Number of people"
          value={formData.capacity ? formData.capacity.toString() : ""}
          onChange={(e) =>
            handleInputChange("capacity", parseInt(e.target.value) || 0)
          }
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />
        <Input
          isRequired
          type="number"
          label="Price per hour ($)"
          placeholder="e.g., 150"
          value={formData.pricePerHour ? formData.pricePerHour.toString() : ""}
          onChange={(e) =>
            handleInputChange("pricePerHour", parseFloat(e.target.value) || 0)
          }
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />
      </div>

      {/* Amenities */}
      <AmenitiesSelector
        selectedAmenities={formData.amenities}
        onAmenitiesChange={(amenities) =>
          setFormData((prev) => ({ ...prev, amenities }))
        }
      />

      {/* Availability Schedule */}
      <AvailabilitySchedule
        availability={formData.availability}
        onAvailabilityChange={(availability) =>
          setFormData((prev) => ({ ...prev, availability }))
        }
      />

      {/* Booking Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          type="number"
          label="Min. Booking (hours)"
          placeholder="e.g., 2"
          value={
            formData.minBookingDurationHours
              ? formData.minBookingDurationHours.toString()
              : ""
          }
          onChange={(e) =>
            handleInputChange(
              "minBookingDurationHours",
              parseInt(e.target.value) || 1
            )
          }
          classNames={{
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />
        <Select
          isRequired
          label="Cancellation Policy"
          placeholder="Select policy"
          selectedKeys={
            formData.cancellationPolicy ? [formData.cancellationPolicy] : []
          }
          onChange={(e) =>
            handleInputChange("cancellationPolicy", e.target.value)
          }
          classNames={{
            trigger: "h-12",
          }}
        >
          {CANCELLATION_POLICIES.map((policy) => (
            <SelectItem key={policy}>{policy}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Rules */}
      <DynamicListInput
        label="Rules"
        items={formData.rules}
        onItemsChange={(rules) => setFormData((prev) => ({ ...prev, rules }))}
        placeholder="e.g., No smoking"
        addButtonText="Add Rule"
        emptyStateText="No rules added yet. Add house rules for your venue."
      />

      {/* Accessibility */}
      <DynamicListInput
        label="Accessibility Features"
        items={formData.accessibility}
        onItemsChange={(accessibility) =>
          setFormData((prev) => ({ ...prev, accessibility }))
        }
        placeholder="e.g., Wheelchair accessible"
        addButtonText="Add Feature"
        emptyStateText="No accessibility features added yet."
      />

      {/* Submit Button */}
      <div className="pt-6 border-t border-default-200">
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-full h-14 text-base font-semibold"
          isLoading={isSubmitting}
        >
          Submit Venue
        </Button>
      </div>
    </form>
  );
}
