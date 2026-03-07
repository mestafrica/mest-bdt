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
    <div className="p-6 bg-[#0f1724] rounded-xl border border-slate-800 shadow-sm h-full">
      <h2 className="text-lg font-semibold text-slate-100 mb-6">
        Recent Activities
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-800/50 rounded-lg group hover:border-slate-700 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${
                activity.status === "Success" ? "bg-green-900/20" : "bg-yellow-900/20"
              }`}>
                {activity.status === "Success" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                  {activity.action}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {activity.date}
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-800/50 ${
                activity.status === "Success"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {activity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
