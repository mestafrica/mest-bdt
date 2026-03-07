"use client";
import { Edit, Trash, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient, apiFetcher } from "@/utils/api";
import useSWR from "swr";
import toast from "react-hot-toast";

export default function FormHeader() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { data: form } = useSWR(id ? `/forms/${id}` : null, apiFetcher);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/forms/${id}`);
      toast.success("Form deleted successfully");
      router.push("/forms");
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to delete form";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-[#0B1220] p-4 rounded-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/forms")}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">
            {form ? form.name : "Loading..."}
          </h1>
          <p className="text-sm text-slate-400">View form details and schema</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {id && (
          <>
            <Link href={`/forms/edit?id=${id}`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors text-sm font-medium border border-slate-700">
                <Edit className="h-4 w-4" />
                Edit Form
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/40 hover:bg-red-900/80 text-red-200 border border-red-800/50 rounded-md transition-colors text-sm font-medium"
            >
              <Trash className="h-4 w-4" />
              Delete Form
            </button>
          </>
        )}
      </div>
    </div>
  );
}
