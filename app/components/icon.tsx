interface IconProps {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Icon component for displaying SVG icons from /public/icons/
 *
 * @param name - Icon name (with or without .svg extension)
 * @param size - Icon size in pixels (default: 24)
 * @param className - Additional CSS classes
 * @param alt - Alt text for accessibility
 *
 * @example
 * <Icon name="wifi-svgrepo-com" size={32} />
 * <Icon name={ICON_NAMES.PARKING} className="text-blue-500" />
 */
export default function Icon({
  name,
  size = 24,
  className = "",
  alt,
}: IconProps) {
  // Add .svg extension if not present
  const iconName = name.endsWith(".svg") ? name : `${name}.svg`;

  // Generate alt text if not provided
  const altText =
    alt || name.replace(/-svgrepo-com\.svg|\.svg/g, "").replace(/-/g, " ");

  return (
    <img
      src={`/icons/${iconName}`}
      alt={altText}
      width={size}
      height={size}
      className={className}
      style={{ width: `${size}px`, height: `${size}px`, objectFit: "contain" }}
    />
  );
}
