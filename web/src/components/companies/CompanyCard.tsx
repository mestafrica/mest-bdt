import { Company } from "@/utils/types";
import { Users, Dot, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-[#0b1220] rounded-md overflow-hidden border border-slate-800 shadow-sm flex flex-col">
      {/* Card Image */}
      <div className="relative h-32 w-full bg-slate-900 border-b border-slate-800 transform transition-transform duration-300 hover:scale-105">
        <Image
          src={"https://placehold.co/600x400.png"}
          alt="Company Image"
          fill
          quality={100}
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Company Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <Link
            href={`/companies/view?id=${company.id}`}
            className="text-slate-100 font-medium hover:text-blue-400 focus:outline-none transition-colors"
          >
            {company.name}
          </Link>
          <p className="border border-green-900 bg-green-900/40 text-green-200 px-2 py-0.5 rounded-md text-xs whitespace-nowrap">
            Completed
          </p>
        </div>
        
        <div className="mt-2 flex items-center text-xs text-slate-400">
          <p>Venture Capital</p>
          <span className="flex items-center ml-2">
            <Dot className="text-slate-500 h-4 w-4" /> 85 employees
          </span>
        </div>

        <div className="flex-1" />

        {/* Details */}
        <div className="space-y-2 mt-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-slate-500" />
            <p>Participants: 6</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-slate-500" />
            <p>Onboarded: Aug 15, 2024</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/50">
          <div className="flex justify-between items-center mb-1.5">
            <p className="text-xs text-slate-400">Completion</p>
            <p className="text-xs text-slate-300 font-medium">100%</p>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
