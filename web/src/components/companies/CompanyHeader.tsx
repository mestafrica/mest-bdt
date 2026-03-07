"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { apiClient, apiFetcher } from "@/utils/api";
import toast from "react-hot-toast";
import { Trash, Edit, ArrowLeft, Building2, MapPin } from "lucide-react";
import useSWR from "swr";

export default function CompanyHeader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const { data } = useSWR(`/companies/${searchParams.get("id")}`, apiFetcher);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await apiClient.delete(`/companies/${searchParams.get("id")}`);
        toast.success("Company deleted successfully!");
        router.back();
      } catch (error) {
        toast.error("Failed to delete company!");
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
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <Building2 size={28} className="text-primary" />
            {data?.name || "Company Details"}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Resource Management
            </span>
            <span className="w-1 h-1 bg-foreground/20 rounded-full"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Partner Profile
            </span>
          </div>
        </div>
      </div>

      <div className="card-meltwater p-3 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-4 px-4">
          {data?.sector && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">
              {data.sector}
            </span>
          )}
          <div className="flex items-center gap-2 text-foreground/40 text-xs font-bold uppercase tracking-wider">
            <MapPin size={14} className="text-primary" />
            <span>Accra, Ghana</span>
          </div>
        </div>

        <div className="md:ml-auto flex items-center gap-2">
          <Link
            href={`/companies/edit?id=${searchParams.get("id")}`}
            className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-xl transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
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
