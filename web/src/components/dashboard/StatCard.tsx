"use client";
import React from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}) => {
  const isIncrease = changeType === "increase";

  return (
    <div className="card-meltwater p-6 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
            isIncrease
              ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
              : "text-rose-600 bg-rose-500/10 dark:text-rose-400"
          }`}
        >
          {isIncrease ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-foreground tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
