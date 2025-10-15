"use client";

import { CSSProperties } from "react";

interface SVGIconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * SVG Icon component that renders SVG files as inline SVG
 * This allows for better styling control (color, stroke, etc.)
 *
 * @param name - Icon name (with or without .svg extension)
 * @param size - Icon size (default: 24)
 * @param color - Icon color (applies to stroke/fill)
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 *
 * @example
 * <SVGIcon name="wifi" size={32} color="#3B82F6" />
 * <SVGIcon name="parking-svgrepo-com" className="text-blue-500" />
 */
export default function SVGIcon({
  name,
  size = 24,
  color,
  className = "",
  style,
}: SVGIconProps) {
  const iconName = name.endsWith(".svg") ? name : `${name}.svg`;
  const iconPath = `/icons/${iconName}`;

  const dimensions = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: dimensions,
        height: dimensions,
        color: color,
        ...style,
      }}
    >
      <img
        src={iconPath}
        alt={name.replace(/-svgrepo-com\.svg|\.svg/g, "").replace(/-/g, " ")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: color ? undefined : "currentColor",
        }}
      />
    </div>
  );
}
