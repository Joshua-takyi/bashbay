"use client";

import Icon from "@/app/components/icon";
import { ICON_NAMES, ICON_CATEGORIES } from "@/app/components/icons/icon-map";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";

/**
 * Demo component showing all available icons
 * This can be used as a reference or icon picker
 */
export default function IconShowcase() {
  const allIcons = Object.entries(ICON_NAMES);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Icon Showcase</h1>
        <p className="text-default-500">
          All available SVG icons in your project
        </p>
      </div>

      {/* Category-based display */}
      <div className="space-y-6">
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {ICON_CATEGORIES.amenities.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-default-100 transition-colors"
                  title={iconName}
                >
                  <Icon name={iconName} size={32} />
                  <span className="text-xs text-center text-default-500 line-clamp-2">
                    {iconName.replace(/-svgrepo-com/g, "")}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Kitchen & Dining</h2>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {ICON_CATEGORIES.kitchen.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-default-100 transition-colors"
                  title={iconName}
                >
                  <Icon name={iconName} size={32} />
                  <span className="text-xs text-center text-default-500 line-clamp-2">
                    {iconName.replace(/-svgrepo-com/g, "")}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Events & Activities</h2>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {ICON_CATEGORIES.events.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-default-100 transition-colors"
                  title={iconName}
                >
                  <Icon name={iconName} size={32} />
                  <span className="text-xs text-center text-default-500 line-clamp-2">
                    {iconName.replace(/-svgrepo-com/g, "")}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Business</h2>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {ICON_CATEGORIES.business.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-default-100 transition-colors"
                  title={iconName}
                >
                  <Icon name={iconName} size={32} />
                  <span className="text-xs text-center text-default-500 line-clamp-2">
                    {iconName.replace(/-svgrepo-com/g, "")}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Safety & Rules</h2>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {ICON_CATEGORIES.safety.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-default-100 transition-colors"
                  title={iconName}
                >
                  <Icon name={iconName} size={32} />
                  <span className="text-xs text-center text-default-500 line-clamp-2">
                    {iconName.replace(/-svgrepo-com/g, "")}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Divider />

      {/* All icons alphabetically */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            All Icons (Alphabetical)
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {allIcons.map(([key, iconName]) => (
              <div
                key={key}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-default-100 transition-colors cursor-pointer"
                title={iconName}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<Icon name={ICON_NAMES.${key}} />`
                  );
                }}
              >
                <Icon name={iconName} size={32} />
                <span className="text-xs text-center text-default-500 line-clamp-2">
                  {key}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-default-400 mt-4">
            💡 Click any icon to copy its usage code
          </p>
        </CardBody>
      </Card>

      {/* Usage examples */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Different Sizes:</p>
              <div className="flex items-center gap-4">
                <Icon name={ICON_NAMES.WIFI} size={16} />
                <Icon name={ICON_NAMES.WIFI} size={24} />
                <Icon name={ICON_NAMES.WIFI} size={32} />
                <Icon name={ICON_NAMES.WIFI} size={48} />
                <Icon name={ICON_NAMES.WIFI} size={64} />
              </div>
              <code className="text-xs text-default-500 block mt-2">
                {`<Icon name={ICON_NAMES.WIFI} size={16|24|32|48|64} />`}
              </code>
            </div>

            <Divider />

            <div>
              <p className="text-sm font-medium mb-2">With Custom Styling:</p>
              <div className="flex items-center gap-4">
                <Icon
                  name={ICON_NAMES.PARKING}
                  size={32}
                  className="opacity-30"
                />
                <Icon
                  name={ICON_NAMES.PARKING}
                  size={32}
                  className="opacity-50"
                />
                <Icon
                  name={ICON_NAMES.PARKING}
                  size={32}
                  className="opacity-75"
                />
                <Icon name={ICON_NAMES.PARKING} size={32} />
              </div>
              <code className="text-xs text-default-500 block mt-2">
                {`<Icon name={ICON_NAMES.PARKING} size={32} className="opacity-50" />`}
              </code>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
