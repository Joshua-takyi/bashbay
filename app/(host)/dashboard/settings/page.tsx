import { DashboardHeader } from "@/app/components/dashboard/dashboard-header";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </div>
      </div>
    </div>
  );
}
