"use client";
import { Search, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function CohortsHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-foreground/5 text-foreground/40 hover:text-primary transition-all hover:bg-primary/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Cohorts
            </h1>
            <p className="text-foreground/50 text-sm mt-1 font-medium">
              List of Cohorts enrolled across our edTech offerings
            </p>
          </div>
        </div>
        <Link href={`/cohorts/add?pid=${searchParams.get("pid")}`}>
          <button className="btn-pill bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            Add New Cohort
          </button>
        </Link>
      </div>

      <div className="card-meltwater p-2 flex flex-col lg:flex-row items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-foreground/5 rounded-lg w-full lg:w-80 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="h-4 w-4 text-foreground/40" />
          <input
            placeholder="Search cohorts..."
            className="bg-transparent outline-none text-foreground placeholder:text-foreground/30 w-full text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {["All", "Active", "Ongoing", "Completed"].map((status) => (
            <button
              key={status}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                status === "All"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-foreground/5 text-foreground/60 border-transparent hover:border-border hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="lg:ml-auto flex items-center gap-2 px-4">
          <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Sort By
          </span>
          <select className="bg-transparent text-sm font-bold text-foreground outline-none cursor-pointer">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Name A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
