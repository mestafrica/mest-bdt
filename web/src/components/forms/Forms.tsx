"use client";
import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { Form } from "@/utils/types";
import FormCard from "./FormCard";
import { Loader2, FileWarning } from "lucide-react";

export default function Forms() {
  const { data, isLoading, error } = useSWR(`/forms`, apiFetcher);

  if (isLoading) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
          Loading form templates...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 card-meltwater p-12 text-center border-rose-500/20 bg-rose-500/5">
        <div className="flex justify-center mb-4">
          <FileWarning className="h-12 w-12 text-rose-500/40" />
        </div>
        <p className="text-rose-500 font-bold">
          Failed to load form templates.
        </p>
        <p className="text-rose-500/60 text-xs mt-1">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-8 card-meltwater p-20 text-center bg-foreground/[0.02] border-dashed">
        <div className="flex justify-center mb-4 opacity-10">
          <FileWarning className="h-16 w-16" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          No form templates found
        </h3>
        <p className="text-foreground/40 text-sm mt-1 max-w-xs mx-auto font-medium">
          Get started by creating your first dynamic form template to collect
          structured data.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((form: Form) => (
        <FormCard key={form.id || (form as { _id?: string })._id} form={form} />
      ))}
    </div>
  );
}
