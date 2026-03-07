"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { apiClient, apiFetcher } from "@/utils/api";
import toast from "react-hot-toast";
import { Trash, Edit, ArrowLeft } from "lucide-react";
import useSWR from "swr";
export default function CompanyHeader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const { data } = useSWR(`/companies/${searchParams.get("id")}`, apiFetcher);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await apiClient.delete(
          `/companies/${searchParams.get("id")}`,
        );
        console.log(response.data);
        toast.success("Company deleted successfully!");
        // Navigate back
        router.back();
      } catch (error) {
        toast.error("Failed to delete company!");
        console.log(error);
      }
    });
  };

  return (
    <div className="bg-[#0B1220] p-4 rounded-md border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-start lg:items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 mt-1 lg:mt-0 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-slate-100">
              {data?.name || "Company Details"}
            </h1>
            {data?.sector && (
              <p className="px-2 py-0.5 text-xs bg-blue-900/40 border border-blue-800/50 text-blue-200 rounded-full">
                {data.sector}
              </p>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1">{data?.mission || "View company information"}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:ml-auto">
        <Link
          href={`/companies/edit?id=${searchParams.get("id")}`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors text-sm font-medium border border-slate-700"
        >
          <Edit className="h-4 w-4" />
          Edit Company
        </Link>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-red-900/40 hover:bg-red-900/80 text-red-200 border border-red-800/50 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
        >
          <Trash className="h-4 w-4" />
          {isPending ? "Deleting..." : "Delete Company"}
        </button>
      </div>
    </div>
  );
}
