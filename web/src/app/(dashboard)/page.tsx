import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCardsGrid from "@/components/dashboard/StatCardsGrid";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
      <DashboardHeader />
      <div className="space-y-8">
        <StatCardsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PerformanceChart />
            <QuickActions />
          </div>
          <div className="h-full">
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  );
}
