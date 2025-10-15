import React from "react";

/**
 * InfoItem - Represents a single information item with title and content
 */
export interface InfoItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * InfoSectionProps - Props for the InfoSection component
 */
interface InfoSectionProps {
  title?: string;
  items: InfoItem[];
  variant?: "default" | "compact" | "detailed";
  className?: string;
}

/**
 * InfoSection - A responsive reusable component for displaying information items
 * with a consistent layout pattern (title on left, content on right)
 *
 * @example
 * ```tsx
 * <InfoSection
 *   title="Venue Details"
 *   items={[
 *     {
 *       id: "1",
 *       title: "Capacity",
 *       content: "50-100 people"
 *     }
 *   ]}
 * />
 * ```
 */
export function InfoSection({
  title,
  items,
  variant = "default",
  className = "",
}: InfoSectionProps) {
  const variants = {
    default: "gap-4 lg:gap-6",
    compact: "gap-2 lg:gap-4",
    detailed: "gap-6 lg:gap-8",
  };

  return (
    <section className={`flex flex-col ${variants[variant]} ${className}`}>
      {title && (
        <div className="mb-2 px-2 py-2">
          <h3 className="text-2xl lg:text-[2rem] font-semibold">{title}</h3>
        </div>
      )}
      <div className={`px-2 py-2 flex flex-col ${variants[variant]}`}>
        {items.map((item) => (
          <InfoRow key={item.id} item={item} variant={variant} />
        ))}
      </div>
    </section>
  );
}

/**
 * InfoRow - A single row in the InfoSection
 */
interface InfoRowProps {
  item: InfoItem;
  variant?: "default" | "compact" | "detailed";
}

function InfoRow({ item, variant = "default" }: InfoRowProps) {
  const spacing = variant === "compact" ? "gap-3" : "gap-4 lg:gap-6";
  const padding = variant === "compact" ? "py-1" : "py-2";

  return (
    <div className={`flex flex-col lg:flex-row ${spacing} ${padding}`}>
      <div className="w-full lg:w-2/5 lg:max-w-[280px] flex items-start gap-2 flex-shrink-0">
        {item.icon && <div className="flex-shrink-0 mt-1">{item.icon}</div>}
        <h4 className="h6 font-semibold text-base lg:text-lg">{item.title}</h4>
      </div>
      <div className="w-full lg:flex-1">
        <div className="small leading-relaxed font-medium text-sm lg:text-base">
          {item.content}
        </div>
      </div>
    </div>
  );
}

/**
 * InfoList - Component for rendering a list of items
 */
interface InfoListProps {
  items: string[] | null;
  emptyMessage?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function InfoList({
  items,
  emptyMessage = "No items available.",
  icon,
  className = "",
}: InfoListProps) {
  if (!items || items.length === 0) {
    return (
      <p className="small leading-relaxed font-medium text-gray-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
          <p className="small leading-relaxed font-medium">{item}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * InfoGrid - Component for displaying items in a grid layout
 */
interface InfoGridProps {
  items: InfoItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function InfoGrid({
  items,
  columns = 2,
  className = "",
}: InfoGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 lg:gap-6 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
        >
          {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
          <h4 className="font-semibold text-base">{item.title}</h4>
          <div className="text-sm text-gray-600">{item.content}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * InfoCard - Component for displaying information in a card format
 */
interface InfoCardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "filled";
}

export function InfoCard({
  title,
  icon,
  children,
  className = "",
  variant = "default",
}: InfoCardProps) {
  const variants = {
    default: "border border-gray-200 bg-white",
    outlined: "border-2 border-gray-300 bg-white",
    filled: "bg-gray-50 border border-gray-200",
  };

  return (
    <div className={`rounded-lg p-4 lg:p-6 ${variants[variant]} ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          {title && (
            <h3 className="text-lg lg:text-xl font-semibold">{title}</h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
