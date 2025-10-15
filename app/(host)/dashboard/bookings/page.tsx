import { DashboardHeader } from "@/app/components/dashboard/dashboard-header";

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Bookings"
        subtitle="Manage all your venue bookings"
        showExportButton
      />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Bookings content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
