"use client";

import { MapPinIcon } from "@heroicons/react/16/solid";
import { Divider, Input } from "@heroui/react";

export default function InputDropDown() {
  return (
    <div className="flex justify-center overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
      <Input
        radius="none"
        size="lg"
        aria-label="input field used for the search of events  "
        placeholder="Search events"
        className="w-full flex gap-4 justify-center lg:w-1/2"
      />
      <Divider orientation="vertical" />
      {/* <Divider /> */}
      <Input
        size="lg"
        aria-label="input field used for the search of venues"
        radius="none"
        className="w-full flex gap-4 justify-center lg:w-1/2 "
        placeholder="Search venues"
        startContent={
          <span className="w-fit p-3 rounded-full hover:cursor-pointer">
            <MapPinIcon className="w-4 h-4 text-gray-500" />
          </span>
        }
      />
    </div>
  );
}
