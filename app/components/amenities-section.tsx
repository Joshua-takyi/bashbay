"use client";

import {
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import Icon from "./icon";
import { ICON_NAMES } from "./icons/icon-map";

interface AmenitiesSectionProps {
  amenities: Record<string, boolean | string> | string[];
}

interface AmenityItem {
  key: string;
  name: string;
  description?: string;
  category: string;
}

// Icon mapping using your downloaded SVG icons
const amenityIcons: Record<string, string> = {
  // Connectivity
  wifi: ICON_NAMES.WIFI,
  internet: ICON_NAMES.WIFI,

  // Entertainment & Media
  television: ICON_NAMES.TV,
  tv: ICON_NAMES.TV,
  speaker: ICON_NAMES.SPEAKER,
  projector: ICON_NAMES.PROJECTOR,
  projectors: ICON_NAMES.PROJECTOR,
  screens: ICON_NAMES.PROJECTOR,
  screen: ICON_NAMES.PROJECTOR,

  // Audio/Video Production
  microphone: ICON_NAMES.SPEAKER,
  microphones: ICON_NAMES.SPEAKER,
  sound_systems: ICON_NAMES.SPEAKER,
  audio: ICON_NAMES.SPEAKER,
  recording: ICON_NAMES.CAMERA,
  broadcast_studio: ICON_NAMES.CAMERA,
  live_streaming: ICON_NAMES.CAMERA,
  streaming: ICON_NAMES.CAMERA,
  video_switching: ICON_NAMES.TV,

  // Kitchen & Dining
  kitchen: ICON_NAMES.KITCHEN,
  catering_kitchen: ICON_NAMES.KITCHEN,
  breakfast: ICON_NAMES.FOOD_COVER,
  food: ICON_NAMES.FOOD_COVER,
  catering: ICON_NAMES.CUTLERY,
  coffee: ICON_NAMES.FOOD_COVER,
  cutlery: ICON_NAMES.CUTLERY,
  dining: ICON_NAMES.OUTDOOR_DINING,
  "outdoor dining": ICON_NAMES.OUTDOOR_DINING,
  bar: ICON_NAMES.BAR_CHAIR,
  bars: ICON_NAMES.BAR_CHAIR,
  "bar chair": ICON_NAMES.BAR_CHAIR,
  drinks: ICON_NAMES.BAR_CHAIR,
  fridge: ICON_NAMES.FRIDGE,
  refrigerator: ICON_NAMES.FRIDGE,
  microwave: ICON_NAMES.MICROWAVE,
  bbq: ICON_NAMES.BBQ_GRILL,
  grill: ICON_NAMES.BBQ_GRILL,
  barbecue: ICON_NAMES.BBQ_GRILL,
  linens: ICON_NAMES.OUTDOOR_DINING,

  // Furniture & Setup
  chairs: ICON_NAMES.BAR_CHAIR,
  tables: ICON_NAMES.OUTDOOR_DINING,
  staging: ICON_NAMES.CELEBRATION,
  stage: ICON_NAMES.CELEBRATION,
  podiums: ICON_NAMES.CORPORATE,
  podium: ICON_NAMES.CORPORATE,

  // Access & Parking
  parking: ICON_NAMES.PARKING,

  // Climate Control
  "air conditioning": ICON_NAMES.AIR_CONDITIONING,
  ac: ICON_NAMES.AIR_CONDITIONING,
  aircon: ICON_NAMES.AIR_CONDITIONING,
  heating: ICON_NAMES.AIR_CONDITIONING,
  climate_control: ICON_NAMES.AIR_CONDITIONING,

  // Amenities & Facilities
  restroom: ICON_NAMES.SHOWER,
  restrooms: ICON_NAMES.SHOWER,
  bathroom: ICON_NAMES.SHOWER,
  toilet: ICON_NAMES.SHOWER,
  washroom: ICON_NAMES.SHOWER,
  shower: ICON_NAMES.SHOWER,
  washer: ICON_NAMES.WASHER,
  laundry: ICON_NAMES.WASHER,
  elevator: ICON_NAMES.ELEVATOR,
  elevators: ICON_NAMES.ELEVATOR,
  lift: ICON_NAMES.ELEVATOR,
  coat_check: ICON_NAMES.SHOP,

  // Spaces & Rooms
  auditorium: ICON_NAMES.CORPORATE,
  ballroom: ICON_NAMES.CELEBRATION,
  grand_ballroom: ICON_NAMES.CELEBRATION,
  breakout_rooms: ICON_NAMES.CORPORATE,
  exhibition_hall: ICON_NAMES.SHOP,
  pre_function_space: ICON_NAMES.PEOPLE,

  // Fitness & Wellness
  gym: ICON_NAMES.GYM,
  fitness: ICON_NAMES.GYM,
  exercise: ICON_NAMES.GYM,
  wellness: ICON_NAMES.WELLNESS,
  spa: ICON_NAMES.WELLNESS,

  // Events & Celebrations
  camera: ICON_NAMES.CAMERA,
  photography: ICON_NAMES.CAMERA,
  photo: ICON_NAMES.CAMERA,
  studio: ICON_NAMES.CAMERA,
  celebration: ICON_NAMES.CELEBRATION,
  party: ICON_NAMES.CELEBRATION,
  wedding: ICON_NAMES.WEDDING_CAKE,
  "wedding cake": ICON_NAMES.WEDDING_CAKE,
  calendar: ICON_NAMES.CALENDAR,
  event: ICON_NAMES.CALENDAR,

  // Business & Work
  office: ICON_NAMES.CORPORATE,
  corporate: ICON_NAMES.CORPORATE,
  business: ICON_NAMES.CORPORATE,
  workspace: ICON_NAMES.CORPORATE,
  meeting: ICON_NAMES.CORPORATE,
  conference: ICON_NAMES.CORPORATE,
  printing: ICON_NAMES.SHOP,
  confidence_monitors: ICON_NAMES.TV,

  // Technical & Power
  power: ICON_NAMES.LIGHT_BULB,
  lighting: ICON_NAMES.LIGHT_BULB,
  lights: ICON_NAMES.LIGHT_BULB,
  presentation_tech: ICON_NAMES.PROJECTOR,
  whiteboards: ICON_NAMES.LIGHT_BULB,

  // Safety & Security
  "fire extinguisher": ICON_NAMES.FIRE_EXTINGUISHER,
  safety: ICON_NAMES.FIRE_EXTINGUISHER,
  "first aid": ICON_NAMES.FIRST_AID,
  medical: ICON_NAMES.FIRST_AID,
  security: ICON_NAMES.FIRE_EXTINGUISHER,

  // Rules & Restrictions
  smoking: ICON_NAMES.NO_SMOKING,
  "non-smoking": ICON_NAMES.NO_SMOKING,
  "no smoking": ICON_NAMES.NO_SMOKING,
  pets: ICON_NAMES.NO_PETS,
  "no pets": ICON_NAMES.NO_PETS,
  animals: ICON_NAMES.NO_PETS,

  // Capacity & Size
  "18+": ICON_NAMES.AGE_18,
  age: ICON_NAMES.AGE_18,
  people: ICON_NAMES.PEOPLE,
  capacity: ICON_NAMES.PEOPLE,
  total_square_footage: ICON_NAMES.SHOP,

  // Shopping
  shop: ICON_NAMES.SHOP,
  store: ICON_NAMES.SHOP,
  retail: ICON_NAMES.SHOP,
};

// Find the best matching icon for an amenity string
const getAmenityIcon = (amenity: string): string => {
  const lowerAmenity = amenity.toLowerCase();

  // Exact match first
  if (amenityIcons[lowerAmenity]) {
    return amenityIcons[lowerAmenity];
  }

  // Partial matching
  for (const [key, icon] of Object.entries(amenityIcons)) {
    if (lowerAmenity.includes(key)) {
      return icon;
    }
  }

  // Default fallback - use a generic icon
  return ICON_NAMES.LIGHT_BULB;
};

// Categorize amenities
const categorizeAmenity = (key: string): string => {
  const lowerKey = key.toLowerCase();

  // Spaces & Rooms
  if (
    lowerKey.includes("auditorium") ||
    lowerKey.includes("ballroom") ||
    lowerKey.includes("breakout") ||
    lowerKey.includes("exhibition") ||
    lowerKey.includes("hall") ||
    lowerKey.includes("function") ||
    lowerKey.includes("square_footage") ||
    lowerKey.includes("footage")
  ) {
    return "Spaces & Capacity";
  }

  // Technical & Production
  if (
    lowerKey.includes("sound") ||
    lowerKey.includes("lighting") ||
    lowerKey.includes("audio") ||
    lowerKey.includes("microphone") ||
    lowerKey.includes("speaker") ||
    lowerKey.includes("projector") ||
    lowerKey.includes("screen") ||
    lowerKey.includes("broadcast") ||
    lowerKey.includes("streaming") ||
    lowerKey.includes("recording") ||
    lowerKey.includes("video") ||
    lowerKey.includes("presentation") ||
    lowerKey.includes("rigging") ||
    lowerKey.includes("power") ||
    lowerKey.includes("monitor") ||
    lowerKey.includes("whiteboard") ||
    lowerKey.includes("dj") ||
    lowerKey.includes("bluetooth speaker") ||
    lowerKey.includes("stage")
  ) {
    return "Technical & Production";
  }

  // Furniture & Setup
  if (
    lowerKey.includes("chair") ||
    lowerKey.includes("table") ||
    lowerKey.includes("staging") ||
    lowerKey.includes("podium") ||
    lowerKey.includes("linen") ||
    lowerKey.includes("furniture") ||
    lowerKey.includes("coat") ||
    lowerKey.includes("wardrobe")
  ) {
    return "Furniture & Setup";
  }

  // Kitchen & Catering
  if (
    lowerKey.includes("kitchen") ||
    lowerKey.includes("catering") ||
    lowerKey.includes("bar") ||
    lowerKey.includes("coffee") ||
    lowerKey.includes("food") ||
    lowerKey.includes("fridge") ||
    lowerKey.includes("refrigerator") ||
    lowerKey.includes("bbq") ||
    lowerKey.includes("grill") ||
    lowerKey.includes("microwave") ||
    lowerKey.includes("dining")
  ) {
    return "Kitchen & Catering";
  }

  // Connectivity
  if (
    lowerKey.includes("wifi") ||
    lowerKey.includes("internet") ||
    lowerKey.includes("phone")
  ) {
    return "Connectivity";
  }

  // Access & Parking
  if (
    lowerKey.includes("parking") ||
    lowerKey.includes("transit") ||
    lowerKey.includes("load") ||
    lowerKey.includes("access") ||
    lowerKey.includes("elevator") ||
    lowerKey.includes("printing")
  ) {
    return "Access & Parking";
  }

  // Amenities & Comfort
  if (
    lowerKey.includes("restroom") ||
    lowerKey.includes("bathroom") ||
    lowerKey.includes("toilet") ||
    lowerKey.includes("hvac") ||
    lowerKey.includes("climate") ||
    lowerKey.includes("ac") ||
    lowerKey.includes("heating") ||
    lowerKey.includes("air conditioning") ||
    lowerKey.includes("green")
  ) {
    return "Amenities & Comfort";
  }

  // Security & Safety
  if (
    lowerKey.includes("security") ||
    lowerKey.includes("camera") ||
    lowerKey.includes("safety") ||
    lowerKey.includes("fire") ||
    lowerKey.includes("first_aid") ||
    lowerKey.includes("medical")
  ) {
    return "Security & Safety";
  }

  // Space Features
  if (
    lowerKey.includes("floor") ||
    lowerKey.includes("window") ||
    lowerKey.includes("ceiling") ||
    lowerKey.includes("square") ||
    lowerKey.includes("outdoor")
  ) {
    return "Space Features";
  }

  return "Additional Amenities";
};

const formatAmenityName = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Safety check for undefined or null amenities
  if (!amenities) return null;

  // Normalize amenities list with descriptions
  const amenitiesData: AmenityItem[] = Array.isArray(amenities)
    ? amenities.map((item) => ({
        key: item,
        name: item,
        category: categorizeAmenity(item),
      }))
    : Object.entries(amenities)
        .filter(([_, value]) => value === true || typeof value === "string")
        .map(([key, value]) => ({
          key,
          name: formatAmenityName(key),
          description: typeof value === "string" ? value : undefined,
          category: categorizeAmenity(key),
        }));

  if (amenitiesData.length === 0) return null;

  const displayedAmenities = amenitiesData.slice(0, 6);
  const hasMore = amenitiesData.length > 6;

  // Group amenities by category for modal
  const groupedAmenities = amenitiesData.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, AmenityItem[]>);

  return (
    <section className="px-2 py-2 scroll-mt-10 mt-5" id="amenities">
      <div className="">
        <div className="space-y-4 ">
          <h3 className="text-base font-semibold border-b pb-3">Amenities</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayedAmenities.map((amenity) => {
              const iconName = getAmenityIcon(amenity.key);
              return (
                <div key={amenity.key} className="flex items-center gap-3">
                  <Icon
                    name={iconName}
                    size={24}
                    className="text-foreground-700 flex-shrink-0"
                  />
                  <span className="text-sm">{amenity.name}</span>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <span
              onClick={onOpen}
              className="inline-block px-3 py-1  text-center border  hover:bg-warning-50 rounded-md font-medium cursor-pointer transition-colors"
            >
              See all {amenitiesData.length} amenities
            </span>
          )}
        </div>

        {/* Modal - Airbnb Style */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          backdrop="blur"
          scrollBehavior="inside"
          classNames={{
            body: "py-6",
            backdrop: "bg-black/50 backdrop-blur-sm",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-xl font-semibold px-6 py-4 border-b flex items-center justify-between">
                  <span>What this place offers</span>
                </ModalHeader>
                <ModalBody className="px-6">
                  <div className="space-y-8">
                    {Object.entries(groupedAmenities).map(
                      ([category, items]) => (
                        <div key={category} className="space-y-4">
                          <h3 className="text-base font-semibold text-foreground-800">
                            {category}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {items.map((amenity) => {
                              const iconName = getAmenityIcon(amenity.key);
                              return (
                                <div
                                  key={amenity.key}
                                  className="flex items-start gap-4 py-3 border-b border-divider last:border-0"
                                >
                                  <Icon
                                    name={iconName}
                                    size={24}
                                    className="text-foreground-600 flex-shrink-0 mt-0.5"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-normal text-foreground-800">
                                      {amenity.name}
                                    </p>
                                    {amenity.description && (
                                      <p className="text-xs text-foreground-500 mt-1">
                                        {amenity.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </ModalBody>
                <ModalFooter className="px-6 py-4 border-t">
                  <Button
                    color="primary"
                    onPress={onClose}
                    className="px-6"
                    size="lg"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
