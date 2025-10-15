import Image from "next/image";
import nosmoking from "../../public/icons/no-smoking-svgrepo-com.svg";
import { formatCurrency } from "@/utilities/currency";
import { InfoSection, InfoList, InfoItem } from "./info-section";

const RulesIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  no_smoking: (props) => (
    <Image
      src={nosmoking}
      alt="No Smoking"
      className={props.className}
      height={20}
      width={20}
    />
  ),
};

export default function VenueRulesRefactored({
  rules,
  overtime_rate_per_hour,
  cancellation_policy,
  security_deposit,
  min_booking_duration_hours,
  setup_takedown_duration,
  load_in_access,
  alcohol_policy,
  external_catering_allowed,
  included_items,
}: {
  rules: string[] | null;
  alcohol_policy: string | null;
  external_catering_allowed: boolean | null;
  min_booking_duration_hours: number | null;
  setup_takedown_duration: number | null;
  load_in_access: string | null;
  overtime_rate_per_hour: number | null;
  cancellation_policy: string | null;
  security_deposit: number | null;
  included_items: string[] | null;
}) {
  if (!rules) return null;

  const infoItems: InfoItem[] = [
    {
      id: "venue-rules",
      title: "Venue Rules",
      content: <InfoList items={rules} emptyMessage="No rules specified." />,
    },
    {
      id: "damage",
      title: "Damage and incidentals",
      content: (
        <p className="small leading-relaxed font-medium">
          Guests are responsible for any damage to the venue or its contents.
        </p>
      ),
    },
    {
      id: "cancellation",
      title: "Cancellation Policy",
      content: (
        <p className="small leading-relaxed font-medium">
          {cancellation_policy || "No cancellation policy provided."}
        </p>
      ),
    },
    {
      id: "security-deposit",
      title: "Security Deposit",
      content: (
        <p className="small leading-relaxed font-medium">
          {formatCurrency(security_deposit || 0)} refundable security deposit
          may be required.
        </p>
      ),
    },
    {
      id: "included-items",
      title: "Included Items",
      content: (
        <InfoList items={included_items} emptyMessage="No items included." />
      ),
    },
    {
      id: "overtime",
      title: "Overtime Rate",
      content: (
        <p className="small leading-relaxed font-medium">
          {formatCurrency(overtime_rate_per_hour || 0)} per hour overtime rate
          may apply.
        </p>
      ),
    },
    {
      id: "load-in",
      title: "Load-in Access",
      content: (
        <p className="small leading-relaxed font-medium">
          {load_in_access || "No load-in access information provided."}
        </p>
      ),
    },
    {
      id: "min-booking",
      title: "Minimum Booking Duration",
      content: (
        <p className="small leading-relaxed font-medium">
          {min_booking_duration_hours
            ? `${min_booking_duration_hours} hours`
            : "No minimum booking duration."}
        </p>
      ),
    },
    {
      id: "setup-takedown",
      title: "Setup & Takedown Time",
      content: (
        <p className="small leading-relaxed font-medium">
          {setup_takedown_duration
            ? `${setup_takedown_duration} hours`
            : "No setup and takedown time information provided."}
        </p>
      ),
    },
    {
      id: "alcohol",
      title: "Alcohol Policy",
      content: (
        <p className="small leading-relaxed font-medium">
          {alcohol_policy || "No alcohol policy information provided."}
        </p>
      ),
    },
    {
      id: "catering",
      title: "External Catering",
      content: (
        <p className="small leading-relaxed font-medium">
          {external_catering_allowed
            ? "External catering is allowed."
            : "External catering is not allowed."}
        </p>
      ),
    },
  ];

  return <InfoSection title="Must Read" items={infoItems} />;
}
