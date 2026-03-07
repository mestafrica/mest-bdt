import { Company } from "@/utils/types";
import { Users, Dot, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-[#0b1220] rounded-md overflow-hidden border border-slate-800 shadow-sm flex flex-col group transition-all duration-300 hover:border-slate-700">
      {/* Card Image */}
      <div className="relative h-32 w-full bg-slate-900 border-b border-slate-800 overflow-hidden">
        <Image
          src={"https://placehold.co/600x400.png"}
          alt="Company Image"
          fill
          quality={100}
          style={{ objectFit: "cover" }}
          className="transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <p className="border border-green-900/50 bg-green-900/40 text-green-200 px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm">
            Completed
          </p>
        </div>
      </div>

      {/* Company Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <p className="text-slate-100 font-medium">
            {company.name}
          </p>
        </div>

        <div className="flex items-center text-[11px] text-slate-400 mb-4">
          <span className="bg-slate-800/50 px-1.5 py-0.5 rounded text-slate-300">Venture Capital</span>
          <Dot className="text-slate-600 h-4 w-4" />
          <span>85 employees</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-900/30 p-2 rounded border border-slate-800/50">
            <Users size={12} className="text-blue-400" />
            <p><span className="text-slate-300 font-medium">6</span> Participants</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-900/30 p-2 rounded border border-slate-800/50">
            <Calendar size={12} className="text-blue-400" />
            <p>Aug 15, 2024</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between items-center text-[10px]">
            <p className="text-slate-500 uppercase tracking-wider font-semibold">Completion</p>
            <p className="text-blue-400 font-bold">100%</p>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <Link href={`/companies/view?id=${company.id}`} className="w-full">
            <button className="w-full px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 font-medium border border-slate-700 hover:border-slate-600 shadow-sm">
              <Eye className="h-3.5 w-3.5" />
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
