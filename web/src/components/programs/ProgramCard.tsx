import { Program } from "@/utils/types";
import { Eye, Boxes, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-[#0b1220] rounded-md overflow-hidden border border-slate-800 shadow-sm flex flex-col">
      <div className="relative h-32 w-full bg-slate-900 border-b border-slate-800 transform transition-transform duration-300 hover:scale-105">
        <Image
          src={program?.image || "https://placehold.co/600x400.png"}
          alt="Program Image"
          fill
          quality={100}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex mt-4 px-4 items-center justify-between">
        {/*Action tags  */}
        <p className="border border-blue-900 bg-blue-900/40 text-blue-200 px-2 py-0.5 rounded-md text-xs">
          Upcoming
        </p>
      </div>

      {/* Program Details */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-slate-100 font-medium">{program.name}</h2>
        <p className="text-sm text-slate-400 mt-1 line-clamp-3 leading-relaxed">
          {program.description}
        </p>
        <div className="flex-1" />
        
        <div className="space-y-2 mt-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4" />
            <p>24 Cohorts</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <p>
              {new Date(program.startDate).toDateString()} -{" "}
              {new Date(program.endDate).toDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
          <Link href={`/programs/view?id=${program.id}`}>
            <button className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm flex items-center gap-2 cursor-pointer transition-colors">
              <Eye className="h-4 w-4" /> View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
