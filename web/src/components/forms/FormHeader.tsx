"use client";
import { Edit, Trash, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient, apiFetcher } from "@/utils/api";
import useSWR from "swr";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../core/Button";

export default function FormHeader() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { data: form } = useSWR(id ? `/forms/${id}` : null, apiFetcher);
  const [, setIsDeleting] = useState(false); // Added isDeleting state

  const handleDelete = async () => {
    setIsDeleting(true); // Added setIsDeleting(true)
    try {
      await apiClient.delete(`/forms/${id}`);
      toast.success("Form deleted successfully");
      router.back();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to delete form";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false); // Added setIsDeleting(false)
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2.5 rounded-xl bg-foreground/5 text-foreground/40 hover:text-primary transition-all hover:bg-primary/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={14} className="text-primary" />
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
              Form Template
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {form ? form.name : "Loading..."}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {id && (
          <>
            <Link href={`/forms/edit?id=${id}`}>
              <Button variant="outline" size="md" className="gap-2 px-5">
                <Edit className="h-4 w-4" />
                Edit Template
              </Button>
            </Link>
            <Button
              variant="danger"
              size="md"
              onClick={handleDelete}
              className="gap-2 px-5"
            >
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
