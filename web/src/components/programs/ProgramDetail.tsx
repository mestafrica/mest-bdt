"use client";
import { apiFetcher } from "@/utils/api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Calendar, Users, Briefcase, Info, Loader2 } from "lucide-react";

export default function ProgramDetail() {
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useSWR(
    `/programs/${searchParams.get("id")}`,
    apiFetcher,
  );

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater bg-foreground/[0.02]">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
          Loading Program details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater border-rose-500/20 bg-rose-500/5">
        <p className="text-rose-500 font-bold">Failed to load program</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Banner */}
        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
          <Image
            src={data.image || "https://placehold.co/1200x800.png"}
            alt={data.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
            <div>
              <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                Active Program
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {data.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card-meltwater p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Info size={20} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Program Description
            </h3>
          </div>
          <p className="text-foreground/70 leading-relaxed font-medium whitespace-pre-wrap">
            {data.description || "No description provided for this program."}
          </p>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="space-y-8">
        <div className="card-meltwater p-8">
          <h3 className="text-lg font-bold text-foreground mb-8 tracking-tight">
            Key Information
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-1">
                  Duration
                </p>
                <p className="text-sm font-bold text-foreground">
                  {new Date(data.startDate).getFullYear()} -{" "}
                  {new Date(data.endDate).getFullYear()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-1">
                  Participants
                </p>
                <p className="text-sm font-bold text-foreground">24 Enrolled</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-1">
                  Cohorts
                </p>
                <p className="text-sm font-bold text-foreground">
                  6 Active Cohorts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-meltwater p-8">
          <h3 className="text-lg font-bold text-foreground mb-6 tracking-tight">
            Metadata
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                Visibility
              </span>
              <span className="text-xs font-extrabold text-foreground">
                Public
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                Type
              </span>
              <span className="text-xs font-extrabold text-foreground">
                Accelerator
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                Region
              </span>
              <span className="text-xs font-extrabold text-foreground">
                Africa
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
