"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient } from "@/utils/api";
import { useRouter } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import { Code, Layout, Info, AlertCircle } from "lucide-react";

export default function AddForm() {
  const router = useRouter();
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
      await apiClient.post("/forms", {
        name,
        description,
        schema: schemaStr || "{}",
        uiSchema: uiSchemaStr || "{}",
      });
      toast.success("Form template created successfully!");
      router.back();
    } catch (error: unknown) {
      console.error(error);
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create form template!";
      toast.error(errorMessage);
    }
  };

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Create Form Template
        </h1>
        <p className="text-foreground/40 text-sm mt-1 font-medium">
          Design a new dynamic data collection form using JSON Schema.
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
              className={`w-full p-6 bg-foreground/[0.03] border ${schemaError ? "border-rose-500" : "border-transparent focus:border-primary/30"} rounded-2xl text-[11px] font-mono text-foreground/70 placeholder:text-foreground/20 outline-none transition-all min-h-[250px] scrollbar-hide`}
              defaultValue='{
  "type": "object",
  "properties": {
    "title": { "type": "string", "title": "Field Title" }
  }
}'
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
              className={`w-full p-6 bg-foreground/[0.03] border ${uiSchemaError ? "border-rose-500" : "border-transparent focus:border-primary/30"} rounded-2xl text-[11px] font-mono text-foreground/70 placeholder:text-foreground/20 outline-none transition-all min-h-[200px] scrollbar-hide`}
              defaultValue="{}"
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
          title="Create Template"
          className="px-10 py-3 text-base"
        />
      </div>
    </form>
  );
}
