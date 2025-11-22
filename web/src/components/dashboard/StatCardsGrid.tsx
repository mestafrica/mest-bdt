// src/components/dashboard/StatCardsGrid.tsx
import React from "react";
import StatCard from "./StatCard";
import { Briefcase, Building2, Calendar, Users } from "lucide-react";

const StatCardsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard
        title="Total Programs"
        value="12"
        change="+8%"
        changeType="increase"
        icon={Briefcase}
      />
      <StatCard
        title="Total Cohorts"
        value="7"
        change="+5%"
        changeType="increase"
        icon={Users}
      />
      <StatCard
        title="Active Programs"
        value="4"
        change="Pending"
        changeType="pending"
        icon={Calendar}
      />
      <StatCard
        title="Upcoming Cohorts"
        value="3"
        change="+2%"
        changeType="increase"
        icon={Building2}
      />
    </div>
  );
};

export default StatCardsGrid;
