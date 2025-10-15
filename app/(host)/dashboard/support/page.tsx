import { DashboardHeader } from "@/app/components/dashboard/dashboard-header";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Help & Support"
        subtitle="Get help and find answers to your questions"
      />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Support resources coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
