// src/components/dashboard/DashboardHeader.tsx
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold">Dashboard Overview</h1>
      <span className="text-gray-500 dark:text-gray-400 text-sm mt-1 sm:mt-0">
        November 2025
      </span>
    </div>
  );
};

export default DashboardHeader;
