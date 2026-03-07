// src/components/dashboard/StatCard.tsx
import React from "react";
import { LucideProps } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "pending";
  icon: React.ComponentType<LucideProps>;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}) => {


  return (
    <div className="p-6 bg-[#0f1724] rounded-xl border border-slate-800 shadow-sm flex items-center justify-between transition-all duration-300 hover:border-slate-700 hover:shadow-md group">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-slate-100 tracking-tight">
            {value}
          </p>
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
            changeType === 'increase' ? 'bg-green-900/30 text-green-400' : 
            changeType === 'decrease' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'
          }`}>
            {change}
          </span>
        </div>
      </div>
      <div className="p-3 bg-blue-900/20 rounded-lg group-hover:bg-blue-900/30 transition-colors">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
  );
};

export default StatCard;
