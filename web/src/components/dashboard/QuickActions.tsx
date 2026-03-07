"use client";
import React from "react";
import Link from "next/link";
import { Users, Layout, FileText, Building2 } from "lucide-react";

const actions = [
  { name: "New Program", href: "/programs/add", icon: Layout },
  { name: "New Cohort", href: "/cohorts/add", icon: Users },
  { name: "New Company", href: "/companies/add", icon: Building2 },
  { name: "New Form", href: "/forms/add", icon: FileText },
];

export default function QuickActions() {
  return (
    <div className="card-meltwater p-8">
      <h3 className="text-lg font-bold text-foreground mb-8 tracking-tight">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-foreground/5 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <action.icon
                size={22}
                className="text-primary group-hover:text-white"
              />
            </div>
            <span className="text-sm font-bold text-foreground/70 group-hover:text-primary transition-colors text-center">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
