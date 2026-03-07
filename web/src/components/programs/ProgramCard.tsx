"use client";
import { Program } from "@/utils/types";
import { Eye, Boxes, Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="card-meltwater overflow-hidden group flex flex-col h-full">
      <div className="relative h-48 w-full bg-foreground/5 overflow-hidden">
        <Image
          src={program?.image || "https://placehold.co/600x400.png"}
          alt={program.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1">
            View Details <ChevronRight size={14} />
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
            Active Program
          </span>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {program.name}
        </h2>
        <p className="text-sm text-foreground/50 line-clamp-3 mb-6 font-medium leading-relaxed">
          {program.description}
        </p>

        <div className="mt-auto space-y-3 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2 text-foreground/40">
              <Boxes size={14} className="text-primary" />
              <span>Cohorts</span>
            </div>
            <span className="text-foreground">24 Active</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2 text-foreground/40">
              <Calendar size={14} className="text-primary" />
              <span>Timeline</span>
            </div>
            <span className="text-foreground">
              {new Date(program.startDate).getFullYear()}
            </span>
          </div>
        </div>

        <Link href={`/programs/view?id=${program.id}`} className="mt-6">
          <button className="w-full py-2.5 rounded-xl bg-foreground/5 hover:bg-primary hover:text-white text-foreground text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2">
            <Eye size={16} /> View Program
          </button>
        </Link>
      </div>
    </div>
  );
}
