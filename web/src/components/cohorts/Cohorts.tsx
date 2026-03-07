"use client";
import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { Cohort } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import CohortCard from "./CohortCard";
import { Loader2, Users } from "lucide-react";

export default function Cohorts() {
  const searchParams = useSearchParams();
  const filter = JSON.stringify({ program: searchParams.get("pid") });
  const { data, isLoading, error } = useSWR(
    `/cohorts?filter=${filter}`,
    apiFetcher,
  );

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
          Loading Cohorts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater border-rose-500/20 bg-rose-500/5">
        <p className="text-rose-500 font-bold">Failed to load cohorts</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs font-bold text-foreground/40 hover:text-foreground underline decoration-primary underline-offset-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater bg-foreground/[0.02]">
        <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center mb-2">
          <Users className="h-8 w-8 text-foreground/20" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No Cohorts Found</h3>
        <p className="text-foreground/40 text-sm font-medium">
          Enroll your first cohort to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((cohort: Cohort) => (
        <CohortCard key={cohort.id} cohort={cohort} />
      ))}
    </div>
  );
}
