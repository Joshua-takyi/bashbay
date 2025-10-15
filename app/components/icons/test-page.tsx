"use client";

import Icon from "@/app/components/icon";
import { ICON_NAMES } from "@/app/components/icons/icon-map";
import { Card, CardBody } from "@heroui/card";

/**
 * Simple test page to verify icons are loading correctly
 * Navigate to this page to see if icons render
 */
export default function IconTest() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Icon Test Page</h1>

      <Card>
        <CardBody className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Direct Path Test</h2>
            <div className="flex items-center gap-4">
              <img
                src="/icons/wifi-svgrepo-com.svg"
                alt="WiFi Direct"
                width={24}
                height={24}
                className="border border-red-500"
              />
              <span>Direct img tag (should show WiFi icon)</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Icon Component Test</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Icon name={ICON_NAMES.WIFI} size={24} />
                <span>WiFi icon via Icon component</span>
              </div>

              <div className="flex items-center gap-4">
                <Icon name={ICON_NAMES.PARKING} size={24} />
                <span>Parking icon via Icon component</span>
              </div>

              <div className="flex items-center gap-4">
                <Icon name={ICON_NAMES.KITCHEN} size={24} />
                <span>Kitchen icon via Icon component</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">All Available Icons</h2>
            <div className="grid grid-cols-8 gap-4">
              {Object.values(ICON_NAMES).map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-2 border rounded"
                >
                  <Icon name={iconName} size={32} />
                  <span className="text-xs text-center break-all">
                    {iconName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Debug Info</h2>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
              {JSON.stringify(
                {
                  "Sample Icon Path": `/icons/${ICON_NAMES.WIFI}.svg`,
                  "ICON_NAMES.WIFI": ICON_NAMES.WIFI,
                  "ICON_NAMES.PARKING": ICON_NAMES.PARKING,
                },
                null,
                2
              )}
            </pre>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
