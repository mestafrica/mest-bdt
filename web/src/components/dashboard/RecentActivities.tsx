// src/components/dashboard/RecentActivities.tsx
import React from "react";
import { CheckCircle, Clock } from "lucide-react";

const activities = [
  {
    action: "Created “Tech for Growth” Program",
    date: "Nov 5, 2025",
    status: "Success",
  },
  {
    action: "Added “MEST Cohort 2025”",
    date: "Nov 3, 2025",
    status: "Success",
  },
  {
    action: "Updated “Startup Accelerator”",
    date: "Nov 1, 2025",
    status: "Pending",
  },
];

const RecentActivities = () => {
  return (
    <div className="p-6 bg-white dark:bg-[#1a1d24] rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2a2d34] rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {activity.action}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activity.date}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {activity.status === "Success" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-500" />
              )}
              <span
                className={`text-sm font-semibold ${
                  activity.status === "Success"
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
