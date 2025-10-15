import { formatCurrency } from "@/utilities/currency";

interface BookingPriceHeaderProps {
  pricePerHour: number;
  priceModel?: string;
}

export default function BookingPriceHeader({
  pricePerHour,
  priceModel = "HOURLY",
}: BookingPriceHeaderProps) {
  const isFixed = priceModel === "FIXED";

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold">
        {formatCurrency(pricePerHour)}
      </span>
      <span className="text-sm text-default-500">
        {isFixed ? "fixed price" : "/hour"}
      </span>
    </div>
  );
}
