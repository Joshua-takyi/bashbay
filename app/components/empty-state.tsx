import React from "react";
import { Button } from "@heroui/react";

interface EmptyStateProps {
  /**
   * The main heading text to display
   */
  title: string;
  /**
   * The descriptive text below the title
   */
  description: string;
  /**
   * Optional icon or image element to display
   * Can be a React component or an image path
   */
  icon?: React.ReactNode | string;
  /**
   * Optional button text - if provided, shows a call-to-action button
   */
  buttonText?: string;
  /**
   * Optional button click handler
   */
  onButtonClick?: () => void;
  /**
   * Optional custom icon size
   * @default "lg"
   */
  iconSize?: "sm" | "md" | "lg" | "xl";
  /**
   * Optional custom className for additional styling
   */
  className?: string;
  /**
   * Show default empty box illustration
   * @default true
   */
  showDefaultIcon?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  buttonText,
  onButtonClick,
  iconSize = "lg",
  className = "",
  showDefaultIcon = true,
}) => {
  // Icon size mappings
  const iconSizeClasses = {
    sm: "w-24 h-24 sm:w-32 sm:h-32",
    md: "w-32 h-32 sm:w-40 sm:h-40",
    lg: "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56",
    xl: "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64",
  };

  // Default empty box SVG illustration
  const DefaultEmptyIcon = () => (
    <svg
      className={`${iconSizeClasses[iconSize]} mx-auto mb-6 sm:mb-8`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill="#FEF3E8" />

      {/* Empty box illustration */}
      <g transform="translate(50, 55)">
        {/* Box shadow */}
        <ellipse cx="50" cy="85" rx="35" ry="8" fill="#E5D4C1" opacity="0.5" />

        {/* Box back panel */}
        <path d="M30 45 L30 75 L70 75 L70 45 Z" fill="#E8C9A6" />

        {/* Box left side */}
        <path d="M20 40 L30 45 L30 75 L20 70 Z" fill="#D4B59A" />

        {/* Box right side */}
        <path d="M70 45 L80 40 L80 70 L70 75 Z" fill="#C9A889" />

        {/* Box top - open flaps */}
        <path d="M30 45 L50 35 L70 45 L50 55 Z" fill="#EDD5B8" />

        {/* Left flap */}
        <path d="M20 40 L30 35 L30 45 L20 40 Z" fill="#F0DBC4" />

        {/* Right flap */}
        <path d="M70 45 L80 40 L80 30 L70 35 Z" fill="#E5C9AD" />

        {/* Front left flap */}
        <path d="M30 45 L50 35 L50 25 L30 35 Z" fill="#F5E5D3" />

        {/* Front right flap */}
        <path d="M50 35 L70 45 L70 35 L50 25 Z" fill="#EDD9C2" />
      </g>
    </svg>
  );

  // Render icon based on type
  const renderIcon = () => {
    if (icon) {
      if (typeof icon === "string") {
        return (
          <div
            className={`${iconSizeClasses[iconSize]} mx-auto mb-6 sm:mb-8 relative`}
          >
            <img
              src={icon}
              alt="Empty state illustration"
              className="w-full h-full object-contain"
            />
          </div>
        );
      }
      return (
        <div
          className={`${iconSizeClasses[iconSize]} mx-auto mb-6 sm:mb-8 flex items-center justify-center`}
        >
          {icon}
        </div>
      );
    }

    if (showDefaultIcon) {
      return <DefaultEmptyIcon />;
    }

    return null;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20 text-center ${className}`}
    >
      {/* Icon/Illustration */}
      {renderIcon()}

      {/* Title */}
      <h2 className="h3 text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 max-w-md lg:max-w-lg">
        {title}
      </h2>

      {/* Description */}
      <p className="h6 text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-lg leading-relaxed">
        {description}
      </p>

      {/* Optional CTA Button */}
      {buttonText && onButtonClick && (
        <Button
          color="primary"
          size="lg"
          onPress={onButtonClick}
          className="font-medium px-6 sm:px-8"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
