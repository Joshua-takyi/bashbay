"use client";

import { Checkbox, Input, Button } from "@heroui/react";
import { useState } from "react";

interface AmenitiesSelectorProps {
  selectedAmenities: Record<string, boolean>;
  onAmenitiesChange: (amenities: Record<string, boolean>) => void;
  availableAmenities?: string[];
  className?: string;
}

const DEFAULT_AMENITIES = [
  "WiFi",
  "Projector",
  "Whiteboard",
  "Coffee",
  "Parking",
  "Air Conditioning",
  "Sound System",
  "Catering",
  "Security",
  "Restrooms",
];

export default function AmenitiesSelector({
  selectedAmenities,
  onAmenitiesChange,
  availableAmenities = DEFAULT_AMENITIES,
  className = "",
}: AmenitiesSelectorProps) {
  const [customAmenity, setCustomAmenity] = useState("");
  const [allAmenities, setAllAmenities] =
    useState<string[]>(availableAmenities);

  const handleToggle = (amenity: string) => {
    onAmenitiesChange({
      ...selectedAmenities,
      [amenity]: !selectedAmenities[amenity],
    });
  };

  const handleAddCustomAmenity = () => {
    const trimmedAmenity = customAmenity.trim();

    if (!trimmedAmenity) return;

    // Check if amenity already exists (case-insensitive)
    const amenityExists = allAmenities.some(
      (a) => a.toLowerCase() === trimmedAmenity.toLowerCase()
    );

    if (amenityExists) {
      // Optionally show a message that amenity already exists
      setCustomAmenity("");
      return;
    }

    // Add the new amenity to the list and select it
    setAllAmenities([...allAmenities, trimmedAmenity]);
    onAmenitiesChange({
      ...selectedAmenities,
      [trimmedAmenity]: true,
    });
    setCustomAmenity("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomAmenity();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allAmenities.map((amenity) => (
          <div
            key={amenity}
            className={`
              flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
              ${
                selectedAmenities[amenity]
                  ? "border-primary bg-primary/5"
                  : "border-default-200 hover:border-primary/50 hover:bg-default-50"
              }
            `}
            onClick={() => handleToggle(amenity)}
          >
            <Checkbox
              isSelected={selectedAmenities[amenity] || false}
              onChange={() => handleToggle(amenity)}
              color="primary"
              size="sm"
            />
            <span className="text-sm font-medium">{amenity}</span>
          </div>
        ))}
      </div>

      {/* Custom Amenity Input */}
      <div className="flex gap-2 items-end pt-2">
        <Input
          label="Add Custom Amenity"
          placeholder="e.g., Kitchen, Stage, Dance Floor"
          value={customAmenity}
          onChange={(e) => setCustomAmenity(e.target.value)}
          onKeyPress={handleKeyPress}
          size="sm"
          className="flex-1"
        />
        <Button
          color="primary"
          onPress={handleAddCustomAmenity}
          isDisabled={!customAmenity.trim()}
          size="md"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
