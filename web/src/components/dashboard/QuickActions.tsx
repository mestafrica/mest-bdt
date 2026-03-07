import React from "react";
import Link from "next/link";
import { Briefcase, Users, Building2, ClipboardList } from "lucide-react";

const actions = [
  {
    title: "Add Program",
    href: "/programs/add",
    icon: Briefcase,
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
  },
  {
    title: "Add Cohort",
    href: "/cohorts/add",
    icon: Users,
    color: "text-green-400",
    bgColor: "bg-green-900/20",
  },
  {
    title: "Add Company",
    href: "/companies/add",
    icon: Building2,
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
  },
  {
    title: "Add Form",
    href: "/forms/add",
    icon: ClipboardList,
    color: "text-orange-400",
    bgColor: "bg-orange-900/20",
  },
];

const QuickActions = () => {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex items-center gap-3 p-4 bg-[#0f1724] border border-slate-800 rounded-xl hover:border-slate-600 transition-all group shadow-sm hover:shadow-md"
          >
            <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="text-sm font-medium text-slate-200">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
