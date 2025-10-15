# Migration Examples

Here's how to update your existing components to use the new Icon system.

## Example 1: Updating explore-categories.tsx

### Before:

```tsx
import studio from "../../public/icons/camera-svgrepo-com.svg";
import banquet from "../../public/icons/kitchen-cabinets-2-svgrepo-com.svg";
import wellness from "../../public/icons/wellness-group-svgrepo-com.svg";
import outdoor from "../../public/icons/outdoor-dining-svgrepo-com.svg";
import party from "../../public/icons/celebration-party-winter-svgrepo-com.svg";
import wedding from "../../public/icons/wedding-cake-svgrepo-com.svg";
import dinning from "../../public/icons/food-cover-svgrepo-com.svg";

// Then using with Image component
<Image src={studio} alt="Studio" width={24} height={24} />;
```

### After:

```tsx
import Icon from "@/app/components/icon";
import { ICON_NAMES } from "@/app/components/icons/icon-map";

const categories = [
  { name: "Studio", icon: ICON_NAMES.CAMERA },
  { name: "Banquet", icon: ICON_NAMES.KITCHEN },
  { name: "Wellness", icon: ICON_NAMES.WELLNESS },
  { name: "Outdoor", icon: ICON_NAMES.OUTDOOR_DINING },
  { name: "Party", icon: ICON_NAMES.CELEBRATION },
  { name: "Wedding", icon: ICON_NAMES.WEDDING_CAKE },
  { name: "Dining", icon: ICON_NAMES.FOOD_COVER },
];

// Then use in render
{
  categories.map((category) => (
    <div key={category.name}>
      <Icon name={category.icon} size={24} />
      <span>{category.name}</span>
    </div>
  ));
}
```

---

## Example 2: Updating amenities-section.tsx

### Before:

```tsx
import parking from "../../public/icons/parking-svgrepo-com.svg";

<Image src={parking} alt="Parking" width={24} height={24} />;
```

### After:

```tsx
import Icon from "@/app/components/icon";
import { ICON_NAMES } from "@/app/components/icons/icon-map";

<Icon name={ICON_NAMES.PARKING} size={24} alt="Parking" />;
```

---

## Example 3: Updating venue-rules.tsx

### Before:

```tsx
import nosmoking from "../../public/icons/no-smoking-svgrepo-com.svg";

<Image src={nosmoking} alt="No Smoking" width={24} height={24} />;
```

### After:

```tsx
import Icon from "@/app/components/icon";
import { ICON_NAMES } from "@/app/components/icons/icon-map";

<Icon name={ICON_NAMES.NO_SMOKING} size={24} alt="No Smoking" />;
```

---

## Example 4: Dynamic Icon Rendering

### Before:

```tsx
// Multiple imports
import wifi from "../../public/icons/wifi-svgrepo-com.svg";
import parking from "../../public/icons/parking-svgrepo-com.svg";
import ac from "../../public/icons/air-conditioning-svgrepo-com.svg";

const iconMap = { wifi, parking, ac };

// Usage
<Image src={iconMap[amenityType]} ... />
```

### After:

```tsx
import Icon from "@/app/components/icon";
import { ICON_NAMES } from "@/app/components/icons/icon-map";

const iconMap = {
  wifi: ICON_NAMES.WIFI,
  parking: ICON_NAMES.PARKING,
  ac: ICON_NAMES.AIR_CONDITIONING,
};

// Usage
<Icon name={iconMap[amenityType]} size={24} />;
```

---

## Example 5: Amenities Component (Complete Example)

```tsx
"use client";

import Icon from "@/app/components/icon";
import { ICON_NAMES, ICON_CATEGORIES } from "@/app/components/icons/icon-map";
import { Card, CardBody } from "@heroui/card";

interface Amenity {
  name: string;
  icon: string;
  available: boolean;
}

export default function VenueAmenities() {
  const amenities: Amenity[] = [
    { name: "WiFi", icon: ICON_NAMES.WIFI, available: true },
    { name: "Parking", icon: ICON_NAMES.PARKING, available: true },
    {
      name: "Air Conditioning",
      icon: ICON_NAMES.AIR_CONDITIONING,
      available: true,
    },
    { name: "TV", icon: ICON_NAMES.TV, available: false },
    { name: "Kitchen", icon: ICON_NAMES.KITCHEN, available: true },
    { name: "Projector", icon: ICON_NAMES.PROJECTOR, available: true },
  ];

  return (
    <Card>
      <CardBody className="p-6">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <div
              key={amenity.name}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                amenity.available
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50 opacity-50"
              }`}
            >
              <Icon
                name={amenity.icon}
                size={24}
                className={amenity.available ? "" : "opacity-50"}
              />
              <span className="text-sm font-medium">{amenity.name}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
```

---

## Example 6: Using Category Groups

```tsx
import Icon from "@/app/components/icon";
import { ICON_CATEGORIES } from "@/app/components/icons/icon-map";

export default function AmenitiesByCategory() {
  return (
    <div className="space-y-6">
      {/* Essential Amenities */}
      <div>
        <h3 className="font-semibold mb-3">Essential Amenities</h3>
        <div className="flex flex-wrap gap-3">
          {ICON_CATEGORIES.amenities.map((icon) => (
            <div
              key={icon}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full"
            >
              <Icon name={icon} size={20} />
              <span className="text-sm">
                {icon.replace(/-svgrepo-com/g, "").replace(/-/g, " ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Kitchen Facilities */}
      <div>
        <h3 className="font-semibold mb-3">Kitchen Facilities</h3>
        <div className="flex flex-wrap gap-3">
          {ICON_CATEGORIES.kitchen.map((icon) => (
            <div
              key={icon}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full"
            >
              <Icon name={icon} size={20} />
              <span className="text-sm">
                {icon.replace(/-svgrepo-com/g, "").replace(/-/g, " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Benefits of Migration

✅ **Consistency** - All icons use the same component
✅ **Type Safety** - TypeScript autocomplete for icon names
✅ **Maintainability** - Centralized icon management
✅ **Performance** - Next.js Image optimization
✅ **Flexibility** - Easy to change icons globally
✅ **Less Code** - No need for multiple imports
✅ **Better DX** - Constants prevent typos

---

## Step-by-Step Migration

1. **Replace imports:**

   ```tsx
   // Old
   import iconName from "../../public/icons/icon-name.svg";

   // New
   import Icon from "@/app/components/icon";
   import { ICON_NAMES } from "@/app/components/icons/icon-map";
   ```

2. **Replace Image components:**

   ```tsx
   // Old
   <Image src={iconName} alt="Description" width={24} height={24} />

   // New
   <Icon name={ICON_NAMES.ICON_NAME} size={24} alt="Description" />
   ```

3. **Test and verify** - Icons should render identically

4. **Remove old imports** - Clean up unused icon imports

That's it! Your icons are now using the new system. 🎉
