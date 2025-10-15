"use client";

import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import BookingPriceHeader from "./booking/booking-price-header";
import BookingTimeSelector from "./booking/booking-time-selector";
import BookingAttendeesInput from "./booking/booking-attendees-input";
import BookingValidationMessage from "./booking/booking-validation-message";
import BookingButton from "./booking/booking-button";
import StartAndEndDate from "./booking/booking-date-selector";
import { formatCurrency } from "@/utilities/currency";

interface VenueBookingCardProps {
  pricePerHour: number;
  priceModel?: string;
  minBookingDuration?: number;
  onBook?: (bookingDetails: BookingDetails) => void;
  className?: string;
  availabilityData?: {
    unavailable_dates?: string[];
    unavailable_date_ranges?: { start: string; end: string }[];
    weekly_hours?: Record<string, { start: string; end: string }[]>;
    timezone?: string;
  };
  capacity?: number;
}

export interface BookingDetails {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  attendees: number;
  totalHours: number;
  totalCost: number;
}

export default function VenueBookingCard({
  pricePerHour,
  minBookingDuration = 2,
  priceModel,
  onBook,
  className = "",
  availabilityData,
  capacity = 100,
}: VenueBookingCardProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const [attendees, setAttendees] = useState<number>(2);

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const calculateHours = (): number => {
    if (!startDate || !endDate || !startTime || !endTime) return 0;

    const startDateTime = new Date(startDate);
    startDateTime.setHours(startTime.hour, startTime.minute, 0, 0);

    const endDateTime = new Date(endDate);
    endDateTime.setHours(endTime.hour, endTime.minute, 0, 0);

    const diffMs = endDateTime.getTime() - startDateTime.getTime();
    return Math.max(0, diffMs / (1000 * 60 * 60));
  };

  const model = priceModel ? priceModel.toUpperCase() : "HOURLY";
  const isQuoteOnly = model === "QUOTE_ONLY";
  const isFixed = model === "FIXED";
  const isHourly = model === "HOURLY";

  const totalHours = calculateHours();

  // Calculate price based on model
  const basePrice = isFixed ? pricePerHour : totalHours * pricePerHour;
  const cleaningFee = 50; // Fixed cleaning fee
  const serviceFee = basePrice * 0.1;
  const total = basePrice + cleaningFee + serviceFee;

  // Validation: for hourly, check minimum duration; for fixed, just check dates
  const isValid = isHourly
    ? totalHours >= minBookingDuration
    : isFixed && startDate && endDate && startTime && endTime;

  const handleBooking = () => {
    if (!isValid || !startDate || !endDate || !startTime || !endTime) return;

    const bookingDetails: BookingDetails = {
      startDate,
      endDate,
      startTime: `${startTime.hour}:${String(startTime.minute).padStart(
        2,
        "0"
      )}`,
      endTime: `${endTime.hour}:${String(endTime.minute).padStart(2, "0")}`,
      attendees,
      totalHours,
      totalCost: total,
    };

    onBook?.(bookingDetails);
  };

  return (
    <>
      {/* Desktop/Tablet View - Sticky Card */}
      <Card className={`hidden md:block sticky top-9 ${className}`} shadow="sm">
        <CardBody className="gap-4 p-3">
          {isQuoteOnly ? (
            <>
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold mb-2">
                  Custom Pricing Available
                </h3>
                <p className="text-default-500 mb-6">
                  This venue offers custom quotes based on your specific needs.
                  Contact the host to discuss pricing and availability.
                </p>
                <Button
                  color="primary"
                  size="lg"
                  className="w-full font-semibold"
                  onPress={() => {
                    // Handle contact host action
                    console.log("Contact host clicked");
                  }}
                >
                  Contact Host
                </Button>
                <p className="text-sm text-center text-default-400 mt-2">
                  Get a personalized quote for your event
                </p>
              </div>
            </>
          ) : (
            <>
              <BookingPriceHeader
                pricePerHour={pricePerHour}
                priceModel={model}
              />

              <Divider />

              <StartAndEndDate
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                availabilityData={availabilityData}
              />

              <BookingTimeSelector
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
              />

              <BookingAttendeesInput
                attendees={attendees}
                capacity={capacity}
                onChange={setAttendees}
              />

              {isHourly && (
                <BookingValidationMessage
                  totalHours={totalHours}
                  minBookingDuration={minBookingDuration}
                  isValid={isValid}
                />
              )}

              <BookingButton
                isDisabled={
                  !isValid || !startDate || !endDate || !startTime || !endTime
                }
                onClick={handleBooking}
              />
            </>
          )}
        </CardBody>
      </Card>

      {/* Mobile View - Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-default-200 shadow-lg z-50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold">
                {formatCurrency(isFixed ? pricePerHour : pricePerHour)}
              </span>
              <span className="text-xs text-default-500">
                {isFixed ? "" : "/ hour"}
              </span>
            </div>
            {startDate && endDate && (
              <span className="text-xs text-default-500">
                {new Date(startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                –{" "}
                {new Date(endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
            {!isQuoteOnly && (
              <div className="flex items-center gap-1 mt-1">
                <svg
                  className="w-3 h-3 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs text-default-600">
                  Free cancellation
                </span>
              </div>
            )}
          </div>
          <Button
            color="primary"
            size="lg"
            className="font-semibold px-8 rounded-lg"
            onPress={() => {
              if (isQuoteOnly) {
                console.log("Contact host clicked");
              } else {
                handleBooking();
              }
            }}
          >
            {isQuoteOnly ? "Contact" : "Reserve"}
          </Button>
        </div>
      </div>
    </>
  );
}
