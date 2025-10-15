/**
 * Icon mapping for all available SVG icons in /public/icons/
 * This provides a centralized reference for all icons
 */

export const ICON_NAMES = {
  // Age & People
  AGE_18: "age-18-svgrepo-com",
  PEOPLE: "people-svgrepo-com",

  // Amenities
  AIR_CONDITIONING: "air-conditioning-svgrepo-com",
  WIFI: "wifi-svgrepo-com",
  PARKING: "parking-svgrepo-com",
  ELEVATOR: "elevator-svgrepo-com",
  TV: "tv-svgrepo-com",

  // Kitchen & Dining
  BAR_CHAIR: "bar-chair-svgrepo-com",
  BBQ_GRILL: "bbq-grill-svgrepo-com",
  CUTLERY: "cutlery-plate-svgrepo-com",
  FOOD_COVER: "food-cover-svgrepo-com",
  FRIDGE: "fridge-2-svgrepo-com",
  KITCHEN: "kitchen-cabinets-2-svgrepo-com",
  MICROWAVE: "microwave-2-svgrepo-com",
  OUTDOOR_DINING: "outdoor-dining-svgrepo-com",

  // Appliances
  WASHER: "washer-svgrepo-com",
  SHOWER: "shower-3-svgrepo-com",
  SPEAKER: "speaker-minimalistic-svgrepo-com",

  // Events & Activities
  CAMERA: "camera-svgrepo-com",
  CELEBRATION: "celebration-party-winter-svgrepo-com",
  WEDDING_CAKE: "wedding-cake-svgrepo-com",
  CALENDAR: "calendar-today-svgrepo-com",
  GYM: "gym-svgrepo-com",
  WELLNESS: "wellness-group-svgrepo-com",

  // Business & Work
  CORPORATE: "corporate-svgrepo-com",
  PROJECTOR: "projector-svgrepo-com",
  LIGHT_BULB: "light-bulb-idea-svgrepo-com",
  SHOP: "shop-2-svgrepo-com",

  // Safety & Rules
  FIRE_EXTINGUISHER: "fire-extinguisher-svgrepo-com",
  FIRST_AID: "first-aid-kit-svgrepo-com",
  NO_SMOKING: "no-smoking-svgrepo-com",
  NO_PETS: "no-pets-allowed-symbol-svgrepo-com",
} as const;

export type IconName = (typeof ICON_NAMES)[keyof typeof ICON_NAMES];

/**
 * Get icon path by name
 */
export function getIconPath(name: string): string {
  const iconName = name.endsWith(".svg") ? name : `${name}.svg`;
  return `/icons/${iconName}`;
}

/**
 * Icon categories for easier organization
 */
export const ICON_CATEGORIES = {
  amenities: [
    ICON_NAMES.AIR_CONDITIONING,
    ICON_NAMES.WIFI,
    ICON_NAMES.PARKING,
    ICON_NAMES.ELEVATOR,
    ICON_NAMES.TV,
  ],
  kitchen: [
    ICON_NAMES.BAR_CHAIR,
    ICON_NAMES.BBQ_GRILL,
    ICON_NAMES.CUTLERY,
    ICON_NAMES.FOOD_COVER,
    ICON_NAMES.FRIDGE,
    ICON_NAMES.KITCHEN,
    ICON_NAMES.MICROWAVE,
  ],
  events: [
    ICON_NAMES.CAMERA,
    ICON_NAMES.CELEBRATION,
    ICON_NAMES.WEDDING_CAKE,
    ICON_NAMES.CALENDAR,
  ],
  business: [ICON_NAMES.CORPORATE, ICON_NAMES.PROJECTOR, ICON_NAMES.LIGHT_BULB],
  safety: [
    ICON_NAMES.FIRE_EXTINGUISHER,
    ICON_NAMES.FIRST_AID,
    ICON_NAMES.NO_SMOKING,
    ICON_NAMES.NO_PETS,
  ],
} as const;
