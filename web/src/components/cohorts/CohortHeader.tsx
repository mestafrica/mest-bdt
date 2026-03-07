"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { apiClient } from "@/utils/api";
import toast from "react-hot-toast";
import { ArrowLeft, Edit, Trash, Users, ExternalLink } from "lucide-react";

export default function CohortHeader({ name }: { name?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await apiClient.delete(`/cohorts/${searchParams.get("id")}`);
        toast.success("Cohort deleted successfully!");
        router.back();
      } catch (error) {
        toast.error("Failed to delete cohort!");
        console.error(error);
      }
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-foreground/5 text-foreground/40 hover:text-primary transition-all hover:bg-primary/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {name || "Cohort Details"}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Resource Management
            </span>
            <span className="w-1 h-1 bg-foreground/20 rounded-full"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Cohort Overview
            </span>
          </div>
        </div>
      </div>

      <div className="card-meltwater p-3 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-3 px-4">
          <Users size={18} className="text-primary" />
          <span className="text-sm font-bold text-foreground">
            Actions & Navigation
          </span>
        </div>

        <div className="md:ml-auto flex items-center gap-2">
          <Link
            href={`/companies?cid=${searchParams.get("id")}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all text-xs font-bold"
          >
            <ExternalLink size={14} />
            View Companies
          </Link>
          <Link
            href={`/cohorts/edit?id=${searchParams.get("id")}`}
            className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-xl transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all text-xs font-bold disabled:opacity-50"
          >
            <Trash className="h-4 w-4" />
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
