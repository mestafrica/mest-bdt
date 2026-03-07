"use client";
import useSWR from "swr";
import CompanyCard from "./CompanyCard";
import { apiFetcher } from "@/utils/api";
import { Company } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { Loader2, Building2 } from "lucide-react";

export default function Companies() {
  const searchParams = useSearchParams();
  const filter = JSON.stringify({ cohort: searchParams.get("cid") });
  const { data, isLoading, error } = useSWR(
    `/companies?filter=${filter}`,
    apiFetcher,
  );

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
          Loading Companies...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater border-rose-500/20 bg-rose-500/5">
        <p className="text-rose-500 font-bold">Failed to load companies</p>
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
          <Building2 className="h-8 w-8 text-foreground/20" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          No Companies Found
        </h3>
        <p className="text-foreground/40 text-sm font-medium">
          Add your first company to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((company: Company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
