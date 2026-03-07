// src/app/(dashboard)/page.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCardsGrid from "@/components/dashboard/StatCardsGrid";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="px-4 sm:px-8 py-6 min-h-screen bg-[#0B1220] text-slate-200">
      <DashboardHeader />
      <div className="space-y-0">
        <StatCardsGrid />
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  );
}
