"use client";

import { Button, DatePicker } from "@heroui/react";
import {
  DateValue,
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import Image from "next/image";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function InputDropDown() {
  const [events, setEvents] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState<DateValue>(
    parseAbsoluteToLocal(new Date().toISOString())
  );

  const [eventsQuery] = useDebounce(events, 500);

  const handleDateChange = (value: DateValue | null) => {
    if (value) {
      setDate(value);
    }
  };

  const handleChangeEvents = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvents(e.target.value);
  };
  const handleVenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVenue(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", { date });
    // we can either search for a venue or an event
    if (venue) {
      console.log("Searching for venue:", venue);
    } else if (eventsQuery) {
      console.log("Searching for events:", eventsQuery);
    }
  };

  return (
    <I18nProvider locale="en-US">
      <section className="bg-white dark:bg-slate-900 p-4 rounded-full ">
        <form
          className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-0"
          onSubmit={handleSearch}
        >
          <div className="relative flex-grow col-span-1 md:col-span-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Image
                alt="celebration icon"
                width={16}
                height={16}
                className="w-6 h-6"
                src="/icons/celebration-party-winter-svgrepo-com.svg"
              />
            </div>
            <input
              className="form-input w-full h-14 pl-12 pr-4 focus:ring-0 rounded-full md:rounded-l-full md:rounded-r-none text-slate-900 dark:text-white bg-transparent border-none focus:outline-none"
              placeholder="Search events"
              name="events"
              value={events}
              onChange={handleChangeEvents}
              type="text"
            />
          </div>
          <div className="relative flex-grow col-span-1 md:col-span-1 md:border-l md:dark:border-slate-700">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Image
                alt="shop icon"
                width={16}
                height={16}
                className="w-6 h-6"
                src="/icons/shop-2-svgrepo-com.svg"
              />
            </div>
            <input
              className="form-input w-full h-14 pl-12 pr-4 rounded-full md:rounded-none text-slate-900 dark:text-white bg-transparent border-none focus:outline-none"
              placeholder="Search venues"
              name="venue"
              value={venue}
              onChange={handleVenueChange}
              type="text"
            />
          </div>
          <div className="relative flex-grow col-span-1 md:col-span-1 md:border-l md:dark:border-slate-700">
            <DatePicker
              // hideTimeZone
              showMonthAndYearPickers
              radius="none"
              size="lg"
              className="border-0 focus:ring-0 ring-0 "
              onChange={handleDateChange}
              defaultValue={now(getLocalTimeZone())}
              variant="underlined"
            />
          </div>
          <div className="flex justify-end col-span-1 md:col-span-1">
            <Button
              color="primary"
              radius="full"
              className="w-full md:w-3/4 py-6 font-semibold small ring-0"
              type="submit"
              aria-label="Search events and venues"
            >
              Search
            </Button>
          </div>
        </form>
      </section>
    </I18nProvider>
  );
}
