"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Plus, Download } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showAddButton?: boolean;
  showExportButton?: boolean;
  onAddClick?: () => void;
  onExportClick?: () => void;
}

export function DashboardHeader({
  title,
  subtitle,
  showAddButton = false,
  showExportButton = false,
  onAddClick,
  onExportClick,
}: DashboardHeaderProps) {
  return (
    <div className="border-b bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 lg:p-6">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search venues, bookings..."
              className="pl-9 w-full"
            />
          </div>

          {/* Notification Bell */}
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Export Button */}
          {showExportButton && (
            <Button variant="outline" onClick={onExportClick}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}

          {/* Add Venue Button */}
          {showAddButton && (
            <Button onClick={onAddClick}>
              <Plus className="h-4 w-4 mr-2" />
              Add Venue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
