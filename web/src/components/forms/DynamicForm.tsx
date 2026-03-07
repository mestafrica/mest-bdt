"use client";
import { useState } from "react";
import { apiFetcher, apiClient } from "@/utils/api";
import Form from "@rjsf/shadcn";
import validator from "@rjsf/validator-ajv8";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Loader2, FileText, AlertCircle, ArrowLeft, Send } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../core/Button";
import { useUser } from "@/hooks/user";

export default function DynamicForm() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { data, isLoading, error } = useSWR(
    id ? `/forms/${id}` : null,
    apiFetcher,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { formData?: Record<string, unknown> }) => {
    const { formData } = data;
    if (!formData) return;

    setIsSubmitting(true);
    try {
      await apiClient.post("/responses", {
        form: id,
        company: user?.company,
        data: JSON.stringify(formData),
      });
      toast.success("Form submitted successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-20">
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-6 card-meltwater bg-foreground/[0.02] border-dashed">
          <div className="relative">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-foreground/40 font-bold uppercase tracking-[0.2em] text-[10px]">
              Portal Initialization
            </p>
            <p className="text-foreground font-bold text-lg">
              Loading Dynamic Schema...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full max-w-4xl mx-auto py-20">
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-6 card-meltwater border-rose-500/20 bg-rose-500/5">
          <div className="p-4 rounded-3xl bg-rose-500/10">
            <AlertCircle size={48} className="text-rose-500/60" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-rose-500">
              Schema Sync Failed
            </h2>
            <p className="text-sm text-foreground/50 max-w-xs mx-auto">
              We couldn&apos;t retrieve the requested form structure. Please
              verify the URL or contact support.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 hover:text-primary uppercase tracking-widest transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Portal
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-foreground tracking-tight leading-none uppercase italic">
                {data.name}
              </h1>
              <p className="text-foreground/40 text-xs mt-2 font-bold uppercase tracking-[0.2em]">
                {data.description || "Comprehensive Diagnostic Data Point"}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="px-4 py-2 bg-foreground/5 rounded-xl border border-border">
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest block mb-1">
              Status
            </span>
            <span className="text-xs font-black text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Awaiting Input
            </span>
          </div>
        </div>
      </div>

      <div className="card-meltwater p-8 sm:p-12 shadow-2xl shadow-primary/[0.03] transition-all duration-500">
        <div className="rjsf-meltwater-theme">
          <Form
            schema={JSON.parse(data?.schema || "{}")}
            uiSchema={JSON.parse(data?.uiSchema || "{}")}
            validator={validator}
            onSubmit={handleSubmit}
            disabled={isSubmitting}
          >
            <div className="mt-12 pt-8 border-t border-border flex justify-end">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="px-12 py-4 text-sm uppercase tracking-[0.1em]"
              >
                {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
                Finalize & Submit Response
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em] w-full">
          <div className="h-px bg-foreground/5 flex-1"></div>
          Secure End-to-End Encryption Enabled
          <div className="h-px bg-foreground/5 flex-1"></div>
        </div>
        <p className="text-[9px] text-foreground/30 max-w-sm text-center font-medium leading-relaxed">
          By submitting this form, you acknowledge that the data provided is
          accurate to the best of your knowledge and will be used for diagnostic
          purposes.
        </p>
      </div>

      <style jsx global>{`
        .rjsf-meltwater-theme .form-group {
          margin-bottom: 2rem;
        }
        .rjsf-meltwater-theme label {
          display: block;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--foreground);
          opacity: 0.4;
          margin-bottom: 0.75rem;
          padding-left: 0.25rem;
        }
        .rjsf-meltwater-theme input[type="text"],
        .rjsf-meltwater-theme input[type="email"],
        .rjsf-meltwater-theme input[type="number"],
        .rjsf-meltwater-theme textarea,
        .rjsf-meltwater-theme select {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background-color: var(--input);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          transition: all 0.3s ease;
          outline: none;
        }
        .rjsf-meltwater-theme input:focus,
        .rjsf-meltwater-theme textarea:focus,
        .rjsf-meltwater-theme select:focus {
          background-color: var(--background);
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(0, 193, 180, 0.1);
        }
        .rjsf-meltwater-theme .field-description {
          font-size: 0.75rem;
          color: var(--foreground);
          opacity: 0.5;
          margin-top: 0.5rem;
          font-style: italic;
        }
        .rjsf-meltwater-theme .panel-danger {
          border-radius: 0.75rem;
          border-color: rgba(239, 68, 68, 0.2);
          background-color: rgba(239, 68, 68, 0.05);
          padding: 1rem;
          margin-top: 1rem;
        }
        .rjsf-meltwater-theme .error-detail {
          color: #ef4444;
          font-size: 0.75rem;
          font-weight: 600;
          list-style: none;
        }
      `}</style>
    </div>
  );
}
