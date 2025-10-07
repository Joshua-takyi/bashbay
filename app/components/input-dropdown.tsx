"use client";

import { Button } from "@heroui/react";
import {
  DateValue,
  parseAbsoluteToLocal,
  CalendarDate,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

const TIME_SLOTS = ["09:00", "12:00", "15:00", "18:00", "21:00"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);

export default function InputDropDown() {
  const [events, setEvents] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState<DateValue>(
    parseAbsoluteToLocal(new Date().toISOString())
  );
  const [selectedTime, setSelectedTime] = useState<string>("09:00");
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customHour, setCustomHour] = useState("09");
  const [customMinute, setCustomMinute] = useState("00");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [eventsQuery] = useDebounce(events, 500);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDateTimeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (day: number) => {
    const newDate = new CalendarDate(selectedYear, selectedMonth + 1, day);
    setDate(newDate);
    setIsDateTimeOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTime = isCustomTime
      ? `${customHour}:${customMinute}`
      : selectedTime;
    console.log("Searching for:", { date, time: finalTime });
    if (venue) console.log("Searching for venue:", venue);
    else if (eventsQuery) console.log("Searching for events:", eventsQuery);
  };

  const handleTimeSlotClick = (slot: string) => {
    setSelectedTime(slot);
    setIsCustomTime(false);
  };

  const handleHourChange = (hour: string) => {
    setCustomHour(hour);
    setIsCustomTime(true);
  };

  const handleMinuteChange = (minute: string) => {
    setCustomMinute(minute);
    setIsCustomTime(true);
  };

  const displayTime = isCustomTime
    ? `${customHour}:${customMinute}`
    : selectedTime;

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === selectedMonth &&
      today.getFullYear() === selectedYear;

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        date.day === day &&
        date.month === selectedMonth + 1 &&
        date.year === selectedYear;
      const isToday = isCurrentMonth && today.getDate() === day;

      days.push(
        <motion.button
          key={day}
          type="button"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDateChange(day)}
          className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all
            ${
              isSelected
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : isToday
                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-2 border-blue-500 dark:border-blue-400"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border hover:border-slate-200 dark:hover:border-slate-700"
            }
          `}
        >
          {day}
        </motion.button>
      );
    }
    return days;
  };

  return (
    <I18nProvider locale="en-US">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white dark:bg-slate-900 p-2 md:p-3 rounded-2xl md:rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <form
          className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-0"
          onSubmit={handleSearch}
        >
          <motion.div
            className="relative col-span-1"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Image
                alt="celebration"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
                src="/icons/celebration-party-winter-svgrepo-com.svg"
              />
            </div>
            <input
              className="w-full h-11 md:h-12 pl-10 md:pl-11 pr-3 md:pr-4 rounded-xl md:rounded-l-full md:rounded-r-none text-slate-900 dark:text-white placeholder:text-slate-400 bg-transparent border-none focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800 text-sm transition-colors duration-200"
              placeholder="Search events"
              value={events}
              onChange={(e) => setEvents(e.target.value)}
              type="text"
            />
          </motion.div>

          <motion.div
            className="relative col-span-1 md:border-l md:dark:border-slate-700"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Image
                alt="shop"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
                src="/icons/shop-2-svgrepo-com.svg"
              />
            </div>
            <input
              className="w-full h-11 md:h-12 pl-10 md:pl-11 pr-3 md:pr-4 rounded-xl md:rounded-none text-slate-900 dark:text-white placeholder:text-slate-400 bg-transparent border-none focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800 text-sm transition-colors duration-200"
              placeholder="Search venues"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              type="text"
            />
          </motion.div>

          <div
            className="relative col-span-1 md:border-l md:dark:border-slate-700"
            ref={dropdownRef}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.03)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDateTimeOpen(!isDateTimeOpen)}
              className="w-full h-11 md:h-12 px-3 md:px-4 flex items-center justify-between md:justify-start gap-2 text-slate-900 dark:text-white rounded-xl md:rounded-none text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <CalendarIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="font-semibold text-xs md:text-sm truncate">
                  {date.day} {MONTHS[date.month - 1]}
                </span>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <ClockIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    {displayTime}
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isDateTimeOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isDateTimeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full mt-2 left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full md:w-[480px] overflow-hidden"
                >
                  <div className="p-5 md:p-6 space-y-5">
                    {/* Calendar Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Select Date
                        </h3>
                        <div className="flex gap-2">
                          <select
                            value={selectedMonth}
                            onChange={(e) =>
                              setSelectedMonth(Number(e.target.value))
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            {MONTHS.map((month, idx) => (
                              <option key={month} value={idx}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={selectedYear}
                            onChange={(e) =>
                              setSelectedYear(Number(e.target.value))
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            {Array.from(
                              { length: 5 },
                              (_, i) => new Date().getFullYear() + i
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map((day) => (
                          <div
                            key={day}
                            className="h-8 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendar()}
                      </div>
                    </div>

                    {/* Time Section */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                        <ClockIcon className="w-4 h-4" />
                        Select Time
                      </h3>

                      {/* Quick Time Slots */}
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {TIME_SLOTS.map((slot) => (
                          <motion.button
                            key={slot}
                            type="button"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTimeSlotClick(slot)}
                            className={`py-2.5 rounded-lg text-xs font-semibold transition-all shadow-sm
                              ${
                                !isCustomTime && selectedTime === slot
                                  ? "bg-primary text-white shadow-primary/20"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                              }
                            `}
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>

                      {/* Custom Time Input */}
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                          Or set custom time
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                              Hour
                            </label>
                            <select
                              value={customHour}
                              onChange={(e) => handleHourChange(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer"
                            >
                              {HOURS.map((hour) => (
                                <option key={hour} value={hour}>
                                  {hour}
                                </option>
                              ))}
                            </select>
                          </div>
                          <span className="text-2xl font-bold text-slate-400 mt-4">
                            :
                          </span>
                          <div className="flex-1">
                            <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                              Minute
                            </label>
                            <select
                              value={customMinute}
                              onChange={(e) =>
                                handleMinuteChange(e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer"
                            >
                              {MINUTES.map((minute) => (
                                <option key={minute} value={minute}>
                                  {minute}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {isCustomTime && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 text-center"
                          >
                            <span className="text-sm font-semibold text-primary">
                              Selected: {customHour}:{customMinute}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="flex justify-end col-span-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              color="primary"
              radius="full"
              className="w-full md:w-3/4 h-11 md:h-12 font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              type="submit"
            >
              Search
            </Button>
          </motion.div>
        </form>
      </motion.section>
    </I18nProvider>
  );
}
