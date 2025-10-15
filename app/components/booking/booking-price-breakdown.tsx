import { Divider } from "@heroui/divider";

interface BookingPriceBreakdownProps {
  pricePerHour: number;
  totalHours: number;
  cleaningFee: number;
  basePrice: number;
  serviceFee: number;
  total: number;
  priceModel?: string;
}

export default function BookingPriceBreakdown({
  pricePerHour,
  totalHours,
  cleaningFee,
  basePrice,
  serviceFee,
  total,
  priceModel = "HOURLY",
}: BookingPriceBreakdownProps) {
  if (totalHours <= 0 && priceModel === "HOURLY") return null;

  const isFixed = priceModel === "FIXED";
  const isHourly = priceModel === "HOURLY";

  return (
    <>
      <Divider />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-default-600">
            {isFixed ? (
              <>Fixed venue price</>
            ) : (
              <>
                ${pricePerHour} × {totalHours.toFixed(1)} hours
              </>
            )}
          </span>
          <span className="font-medium">${basePrice.toFixed(2)}</span>
        </div>

        {cleaningFee > 0 && (
          <div className="flex justify-between">
            <span className="text-default-600">Cleaning fee</span>
            <span className="font-medium">${cleaningFee.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-default-600">Service fee</span>
          <span className="font-medium">${serviceFee.toFixed(2)}</span>
        </div>

        <Divider />

        <div className="flex justify-between items-center pt-1">
          <span className="font-semibold text-base">Total</span>
          <span className="font-semibold text-lg">${total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}
