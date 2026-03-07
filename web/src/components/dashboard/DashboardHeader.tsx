// src/components/dashboard/DashboardHeader.tsx
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Dashboard Overview</h1>
      <span className="text-slate-400 text-sm mt-1 sm:mt-0">
        {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', day: 'numeric' }).format(new Date())}
      </span>
    </div>
  );
};

export default DashboardHeader;
