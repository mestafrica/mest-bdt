"use client";
import { apiFetcher } from "@/utils/api";
import Form from "@rjsf/shadcn";
import validator from "@rjsf/validator-ajv8";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Loader2, FileText, AlertCircle } from "lucide-react";

export default function DynamicForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading, error } = useSWR(id ? `/forms/${id}` : null, apiFetcher);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater bg-foreground/[0.02]">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Initializing Dynamic Form...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater border-rose-500/20 bg-rose-500/5">
        <AlertCircle size={40} className="text-rose-500/50" />
        <p className="text-rose-500 font-bold">Failed to load form schema</p>
        <p className="text-xs text-rose-500/60 uppercase tracking-widest font-bold">Format ID: {id || 'MISSING'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <FileText className="text-primary" size={28} />
            Data Submission
         </h1>
         <p className="text-foreground/40 text-sm mt-1 font-medium italic">Please complete all required fields below to proceed with your request.</p>
      </div>

      <div className="card-meltwater p-8 shadow-xl shadow-primary/[0.02]">
        <div className="prose prose-sm prose-invert max-w-none">
          <Form
            schema={JSON.parse(data?.schema || "{}")}
            uiSchema={JSON.parse(data?.uiSchema || "{}")}
            validator={validator}
            onSubmit={({ formData }) => {
              console.log("Form Submitted:", formData);
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em] pt-8">
         <span className="w-12 h-px bg-foreground/10"></span>
         SECURE DATA ENTRY PORTAL
         <span className="w-12 h-px bg-foreground/10"></span>
      </div>
    </div>
  );
}
