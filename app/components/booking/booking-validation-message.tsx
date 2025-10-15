interface BookingValidationMessageProps {
  totalHours: number;
  minBookingDuration: number;
  isValid: boolean;
}

export default function BookingValidationMessage({
  totalHours,
  minBookingDuration,
  isValid,
}: BookingValidationMessageProps) {
  if (totalHours <= 0 || isValid) return null;

  return (
    <p className="text-xs text-warning">
      Minimum booking duration is {minBookingDuration} hours
    </p>
  );
}
