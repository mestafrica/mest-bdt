"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { apiClient } from "@/utils/api";
import toast from "react-hot-toast";
import { Edit, Trash, ArrowLeft } from "lucide-react";

export default function ProgamHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await apiClient.delete(
          `/programs/${searchParams.get("id")}`,
        );
        console.log(response.data);
        toast.success("Program deleted successfully!");
        // Navigate back
        router.back();
      } catch (error) {
        toast.error("Failed to delete program!");
        console.log(error);
      }
    });
  };

  return (
    <div className="bg-[#0B1220] p-4 rounded-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push("/programs")}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            Program Details
          </h1>
          <p className="text-sm text-slate-400">View program information</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={`/cohorts?pid=${searchParams.get("id")}`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
        >
          View Cohorts
        </Link>
        <Link
          href={`/programs/edit?id=${searchParams.get("id")}`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors text-sm font-medium border border-slate-700"
        >
          <Edit className="h-4 w-4" />
          Edit Program
        </Link>
        <button 
          onClick={handleDelete}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-red-900/40 hover:bg-red-900/80 text-red-200 border border-red-800/50 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
        >
          <Trash className="h-4 w-4" />
          {isPending ? "Deleting..." : "Delete Program"}
        </button>
      </div>
    </div>
  );
}
