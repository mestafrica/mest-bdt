"use client";
import { Company } from "@/utils/types";
import {
  Users,
  Calendar,
  Eye,
  Building2,
  Dot,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="card-meltwater overflow-hidden group flex flex-col h-full hover:border-primary/30 transition-all duration-300">
      <div className="relative h-32 w-full bg-foreground/5 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
          <Building2 size={48} className="text-primary/10" />
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md backdrop-blur-sm border border-primary/20">
            Partner
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {company.name}
            </h2>
            <div className="flex items-center text-[11px] font-bold text-foreground/40 uppercase tracking-wider">
              <span>Tech Startup</span>
              <Dot size={16} />
              <span>Accra, Ghana</span>
            </div>
          </div>
          <Link
            href={`/companies/view?id=${company.id}`}
            className="p-2 rounded-lg bg-foreground/5 hover:bg-primary hover:text-white transition-all"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-foreground/[0.03] border border-border/50">
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Team Size
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Users size={12} className="text-primary" />
              <span>12 Members</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-foreground/[0.03] border border-border/50">
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Joined
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Calendar size={12} className="text-primary" />
              <span>Aug 2024</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Onboarding Progress
            </span>
            <span className="text-[10px] font-bold text-primary">85%</span>
          </div>
          <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        <Link href={`/companies/view?id=${company.id}`} className="mt-auto">
          <button className="w-full py-2.5 rounded-xl bg-foreground/5 hover:bg-primary hover:text-white text-foreground text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2">
            <Eye size={16} /> View Company
          </button>
        </Link>
      </div>
    </div>
  );
}
