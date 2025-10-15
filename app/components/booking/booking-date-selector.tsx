"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface UnavailableDateRange {
  start: string;
  end: string;
}

interface AvailabilityData {
  unavailable_dates?: string[];
  unavailable_date_ranges?: UnavailableDateRange[];
  weekly_hours?: Record<string, { start: string; end: string }[]>;
  timezone?: string;
}

interface StartAndEndDateProps {
  startDate?: string;
  endDate?: string;
  onChange?: (startDate: string, endDate: string) => void;
  className?: string;
  availabilityData?: AvailabilityData;
}

const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];
const DROPDOWN_WIDTH = 620;

export default function StartAndEndDate({
  startDate,
  endDate,
  onChange,
  className,
  availabilityData,
}: StartAndEndDateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    startDate ? new Date(startDate) : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    endDate ? new Date(endDate) : null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Format date for display
  const formatDate = useCallback((date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }, []);

  // Check if a date is unavailable
  const isDateUnavailable = useCallback(
    (date: Date): boolean => {
      const dateStr = date.toISOString().split("T")[0];

      if (availabilityData?.unavailable_dates?.includes(dateStr)) {
        return true;
      }

      if (availabilityData?.unavailable_date_ranges) {
        return availabilityData.unavailable_date_ranges.some((range) => {
          const rangeStart = new Date(range.start);
          const rangeEnd = new Date(range.end);
          return date >= rangeStart && date <= rangeEnd;
        });
      }

      return false;
    },
    [availabilityData]
  );

  // Check if date is in the past
  const isPastDate = useCallback((date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }, []);

  // Check if date is in selected range
  const isInRange = useCallback(
    (date: Date): boolean => {
      if (!selectedStartDate || !selectedEndDate) return false;
      return date > selectedStartDate && date < selectedEndDate;
    },
    [selectedStartDate, selectedEndDate]
  );

  // Get calendar days for current month
  const getCalendarDays = useCallback((month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = Array(startingDayOfWeek).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, monthIndex, day));
    }
    return days;
  }, []);

  // Get next month
  const nextMonth = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    [currentMonth]
  );

  // Calendar days memoized
  const firstMonthDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth, getCalendarDays]
  );
  const secondMonthDays = useMemo(
    () => getCalendarDays(nextMonth),
    [nextMonth, getCalendarDays]
  );

  // Update dropdown position when opened or on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const parentCard =
        triggerRef.current.closest(".sticky") ||
        triggerRef.current.parentElement;
      const parentRect = parentCard?.getBoundingClientRect();
      const parentRight = parentRect ? parentRect.right : rect.right;

      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: parentRight - DROPDOWN_WIDTH + window.scrollX,
      });
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle date selection
  const handleDateClick = useCallback(
    (date: Date) => {
      if (isPastDate(date) || isDateUnavailable(date)) return;

      if (selectingStart) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
        setSelectingStart(false);
      } else {
        if (date >= selectedStartDate!) {
          setSelectedEndDate(date);
          onChange?.(
            selectedStartDate!.toISOString().split("T")[0],
            date.toISOString().split("T")[0]
          );
          setTimeout(() => setIsOpen(false), 300);
        } else {
          setSelectedStartDate(date);
          setSelectedEndDate(null);
        }
      }
    },
    [isPastDate, isDateUnavailable, selectingStart, selectedStartDate, onChange]
  );

  // Navigate months
  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentMonth(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + (direction === "next" ? 1 : -1),
          1
        )
    );
  }, []);

  const clearDates = useCallback(() => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectingStart(true);
    onChange?.("", "");
  }, [onChange]);

  const handleSubmit = useCallback(() => {
    if (selectedStartDate && selectedEndDate) {
      onChange?.(
        selectedStartDate.toISOString().split("T")[0],
        selectedEndDate.toISOString().split("T")[0]
      );
    }
    setIsOpen(false);
  }, [selectedStartDate, selectedEndDate, onChange]);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  // Render date input button
  const renderDateButton = useCallback(
    (label: string, date: Date | null) => (
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex-1 flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors min-w-[140px]"
      >
        <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
        <div className="flex flex-col items-start flex-1 min-w-0">
          <span className="text-xs text-gray-500 font-medium">{label}</span>
          <span className="text-sm font-medium text-gray-900 truncate">
            {date ? formatDate(date) : "Add date"}
          </span>
        </div>
      </button>
    ),
    [toggleDropdown, formatDate]
  );

  // Render calendar month
  const renderCalendarMonth = useCallback(
    (monthDays: (Date | null)[], monthKey: string) => (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map((day, index) => (
            <div
              key={`day-name-${monthKey}-${index}`}
              className="w-10 h-10 flex items-center justify-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((date, index) => {
            if (!date) {
              return (
                <div key={`empty-${monthKey}-${index}`} className="w-10 h-10" />
              );
            }

            const isDisabled = isPastDate(date) || isDateUnavailable(date);
            const isSelected =
              (selectedStartDate &&
                date.toDateString() === selectedStartDate.toDateString()) ||
              (selectedEndDate &&
                date.toDateString() === selectedEndDate.toDateString());
            const inRange = isInRange(date);

            const buttonClassName = `
              w-10 h-10 rounded-full text-sm font-medium transition-all
              ${
                isDisabled
                  ? "text-gray-300 cursor-not-allowed line-through"
                  : "hover:bg-gray-100 cursor-pointer"
              }
              ${isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
              ${inRange && !isSelected ? "bg-blue-50 text-blue-600" : ""}
              ${!isSelected && !inRange && !isDisabled ? "text-gray-900" : ""}
            `;

            return (
              <motion.button
                key={`date-${monthKey}-${index}`}
                type="button"
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => handleDateClick(date)}
                disabled={isDisabled}
                className={buttonClassName}
              >
                {date.getDate()}
              </motion.button>
            );
          })}
        </div>
      </div>
    ),
    [
      isPastDate,
      isDateUnavailable,
      isInRange,
      selectedStartDate,
      selectedEndDate,
      handleDateClick,
    ]
  );

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Input Display */}
      <div ref={triggerRef} className="flex items-center gap-3 w-full max-w-md">
        {renderDateButton("Start date", selectedStartDate)}
        {renderDateButton("End date", selectedEndDate)}
      </div>

      {/* Mega Dropdown Calendar */}
      {isOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-visible"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${DROPDOWN_WIDTH}px`,
                maxHeight: "90vh",
                zIndex: 9999,
              }}
            >
              <div className="p-6">
                {/* Header with Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    type="button"
                    onClick={() => navigateMonth("prev")}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>

                  <div className="flex gap-8">
                    <h3 className="text-base font-semibold text-gray-900">
                      {currentMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <h3 className="text-base font-semibold text-gray-900">
                      {nextMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateMonth("next")}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Two Month Grid */}
                <div className="flex gap-8">
                  {renderCalendarMonth(firstMonthDays, "1")}
                  {renderCalendarMonth(secondMonthDays, "2")}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={clearDates}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors underline"
                  >
                    Clear dates
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!selectedStartDate || !selectedEndDate}
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
