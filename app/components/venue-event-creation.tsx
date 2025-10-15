"use client";

import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import VenueForm from "./forms/venue-form";
import EventForm from "./forms/event-form";

export default function VenueEventCreation() {
  const [selected, setSelected] = useState("venue");

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs
        aria-label="Venue and Event Creation form"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        size="sm"
        color="primary"
        classNames={
          {
            //   tabList:
            //     "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            //   tabContent: "group-data-[selected=true]:text-primary",
          }
        }
      >
        <Tab
          key="venue"
          title={
            <div className="flex items-center space-x-2">
              <span>List a Venue</span>
            </div>
          }
        >
          <div className="py-8">
            <VenueForm />
          </div>
        </Tab>
        <Tab
          key="event"
          title={
            <div className="flex items-center space-x-2">
              <span>Create an Event</span>
            </div>
          }
        >
          <div className="py-8">
            <EventForm />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
