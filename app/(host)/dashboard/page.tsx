import { DashboardHeader } from "@/app/components/dashboard/dashboard-header";
import { StatCard } from "@/app/components/dashboard/stat-card";
import { RevenueChart } from "@/app/components/dashboard/revenue-chart";
import { CalendarWidget } from "@/app/components/dashboard/calendar-widget";
import { UpcomingEvents } from "@/app/components/dashboard/upcoming-events";
import { RecentBookings } from "@/app/components/dashboard/recent-bookings";
import { DollarSign, Building2, Calendar, Star } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Welcome back, Alex!"
        subtitle="Here's what's happening with your venues today."
        showAddButton
        showExportButton
      />

      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$76,900"
            change="↑12.5% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Active Venues"
            value="4"
            change="All venues operational"
            changeType="positive"
            icon={Building2}
          />
          <StatCard
            title="Upcoming Events"
            value="34"
            change="↑8 from last week"
            changeType="positive"
            icon={Calendar}
          />
          <StatCard
            title="Avg. Rating"
            value="4.8"
            change="Based on 383 reviews"
            changeType="positive"
            icon={Star}
          />
        </div>

        {/* Revenue and Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <CalendarWidget />
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UpcomingEvents />
          </div>
          <div className="lg:col-span-2">
            <RecentBookings />
          </div>
        </div>
      </div>
    </div>
  );
}
