import { DashboardHeader } from "@/app/components/dashboard/dashboard-header";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Calendar"
        subtitle="View and manage your event schedule"
      />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Calendar view coming soon...</p>
        </div>
      </div>
    </div>
  );
}
