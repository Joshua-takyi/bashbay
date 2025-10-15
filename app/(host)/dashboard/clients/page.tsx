import { DashboardHeader } from "@/app/components/dashboard/dashboard-header";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Clients"
        subtitle="Manage your client relationships"
        showExportButton
      />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Client management coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
