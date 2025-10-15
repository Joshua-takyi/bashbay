import { DashboardHeader } from "@/app/components/dashboard/dashboard-header";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Messages"
        subtitle="Communicate with your clients"
      />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Messages interface coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
