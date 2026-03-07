"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient, apiFetcher } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import useSWR from "swr";
import { Code, Layout, Info, AlertCircle, Loader2 } from "lucide-react";

export default function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const {
    data: form,
    isLoading,
    error,
  } = useSWR(id ? `/forms/${id}` : null, apiFetcher);

  const [schemaError, setSchemaError] = useState("");
  const [uiSchemaError, setUiSchemaError] = useState("");

  const handleSubmit = async (data: FormData) => {
    setSchemaError("");
    setUiSchemaError("");

    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const schemaStr = data.get("schema") as string;
    const uiSchemaStr = data.get("uiSchema") as string;

    try {
      if (schemaStr) JSON.parse(schemaStr);
    } catch {
      setSchemaError("Invalid JSON structure in Schema");
      return;
    }

    try {
      if (uiSchemaStr) JSON.parse(uiSchemaStr);
    } catch {
      setUiSchemaError("Invalid JSON structure in UI Schema");
      return;
    }

    try {
      await apiClient.patch(`/forms/${id}`, {
        name,
        description,
        schema: schemaStr || "{}",
        uiSchema: uiSchemaStr || "{}",
      });
      toast.success("Form template updated successfully!");
      router.back();
    } catch (error: unknown) {
      console.error(error);
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to update form template!";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater bg-foreground/[0.02]">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
          Loading template...
        </p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="card-meltwater p-12 text-center border-rose-500/20 bg-rose-500/5">
        <p className="text-rose-500 font-bold">
          Failed to load form definitions.
        </p>
      </div>
    );
  }

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
          Edit Form Template
        </h1>
        <p className="text-foreground/40 text-sm font-medium">
          Update the dynamic form configuration and schema definitions.
        </p>
      </div>

      <div className="card-meltwater p-8 space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Info size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              General Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Internal Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={form.name}
                placeholder="e.g. Quarterly Performance Review"
                className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Templates Description <span className="text-primary">*</span>
              </label>
              <textarea
                name="description"
                required
                defaultValue={form.description}
                placeholder="Describe the purpose of this form configuration..."
                className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="space-y-8 pt-8 border-t border-border">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Code size={18} className="text-primary" />
                <h2 className="text-lg font-bold text-foreground tracking-tight">
                  JSON Schema
                </h2>
              </div>
              {schemaError && (
                <div className="flex items-center gap-2 text-rose-500 animate-pulse">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {schemaError}
                  </span>
                </div>
              )}
            </div>
            <textarea
              name="schema"
              required
              defaultValue={
                typeof form.schema === "string"
                  ? form.schema
                  : JSON.stringify(form.schema, null, 2)
              }
              className={`w-full p-6 bg-foreground/[0.03] border ${schemaError ? "border-rose-500" : "border-transparent focus:border-primary/30"} rounded-2xl text-[11px] font-mono text-foreground/70 placeholder:text-foreground/20 outline-none transition-all min-h-[300px] scrollbar-hide`}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Layout size={18} className="text-primary" />
                <h2 className="text-lg font-bold text-foreground tracking-tight">
                  UI Schema (Optional)
                </h2>
              </div>
              {uiSchemaError && (
                <div className="flex items-center gap-2 text-rose-500 animate-pulse">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {uiSchemaError}
                  </span>
                </div>
              )}
            </div>
            <textarea
              name="uiSchema"
              defaultValue={
                typeof form.uiSchema === "string"
                  ? form.uiSchema
                  : JSON.stringify(form.uiSchema || {}, null, 2)
              }
              className={`w-full p-6 bg-foreground/[0.03] border ${uiSchemaError ? "border-rose-500" : "border-transparent focus:border-primary/30"} rounded-2xl text-[11px] font-mono text-foreground/70 placeholder:text-foreground/20 outline-none transition-all min-h-[250px] scrollbar-hide`}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="px-8"
        >
          Cancel
        </Button>
        <SubmitButton
          title="Update Template"
          className="px-10 py-3 text-base"
        />
      </div>
    </form>
  );
}
