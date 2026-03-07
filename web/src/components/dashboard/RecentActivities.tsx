"use client";
import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New Program added",
    time: "2 hours ago",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: "Cohort updated",
    time: "4 hours ago",
    status: "pending",
    icon: Clock,
  },
  {
    id: 3,
    title: "Form submission error",
    time: "6 hours ago",
    status: "error",
    icon: AlertCircle,
  },
];

const RecentActivities = () => {
  return (
    <div className="card-meltwater p-8 h-full flex flex-col">
      <h3 className="text-lg font-bold text-foreground mb-8 tracking-tight">
        Recent Activity
      </h3>
      <div className="space-y-6 flex-1">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 group">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                activity.status === "completed"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : activity.status === "pending"
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-rose-500/10 text-rose-500"
              }`}
            >
              <activity.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {activity.title}
              </p>
              <p className="text-xs text-foreground/40 font-medium">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-10 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors border border-primary/20">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivities;
