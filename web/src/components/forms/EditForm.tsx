"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient, apiFetcher } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import useSWR from "swr";

export default function EditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: form, isLoading, error } = useSWR(id ? `/forms/${id}` : null, apiFetcher);

  const [schemaError, setSchemaError] = useState("");
  const [uiSchemaError, setUiSchemaError] = useState("");

  const handleSubmit = async (data: FormData) => {
    setSchemaError("");
    setUiSchemaError("");

    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const schemaStr = data.get("schema") as string;
    const uiSchemaStr = data.get("uiSchema") as string;

    // Validate JSON parsing
    try {
      if (schemaStr) JSON.parse(schemaStr);
    } catch {
      setSchemaError("Invalid JSON in Schema");
      return;
    }

    try {
      if (uiSchemaStr) JSON.parse(uiSchemaStr);
    } catch {
      setUiSchemaError("Invalid JSON in UI Schema");
      return;
    }

    try {
      const response = await apiClient.patch(`/forms/${id}`, {
        name,
        description,
        schema: schemaStr || "{}",
        uiSchema: uiSchemaStr || "{}",
      });
      console.log(response.data);
      toast.success("Form updated successfully!");
      router.back();
    } catch (error: unknown) {
      console.log(error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update form!";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading form...</div>;
  }

  if (error || !form) {
    return <div className="p-8 text-center text-red-500">Failed to load form details.</div>;
  }

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="mt-6 bg-[#0B1220] p-4 sm:p-8 border border-slate-800 rounded-lg text-slate-200"
    >
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">
        Edit Form
      </h1>
      <p className="text-slate-400 text-sm mb-6">
        Update the details and schema for this form
      </p>

      <div className="space-y-6">
        {/* Form Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-300 mb-2">
            Form Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={form.name}
            placeholder="e.g., User Feedback Form"
            className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Form Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-300 mb-2">
            Form Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            defaultValue={form.description}
            placeholder="Provide a description of the form's purpose..."
            className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            rows={3}
          />
        </div>

        {/* JSON Schema */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-300 mb-2 flex justify-between">
            <span>JSON Schema <span className="text-red-500">*</span></span>
            {schemaError && <span className="text-red-500 text-xs">{schemaError}</span>}
          </label>
          <textarea
            name="schema"
            required
            defaultValue={typeof form.schema === 'string' ? form.schema : JSON.stringify(form.schema, null, 2)}
            placeholder='{"type": "object", "properties": {}}'
            className={`font-mono bg-[#0f1724] px-4 py-3 rounded-md text-sm border ${schemaError ? 'border-red-500' : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} outline-none transition-colors`}
            rows={10}
          />
        </div>

        {/* UI Schema */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-300 mb-2 flex justify-between">
            <span>UI Schema <span className="text-slate-500 font-normal">(Optional)</span></span>
            {uiSchemaError && <span className="text-red-500 text-xs">{uiSchemaError}</span>}
          </label>
          <textarea
            name="uiSchema"
            defaultValue={typeof form.uiSchema === 'string' ? form.uiSchema : JSON.stringify(form.uiSchema || {}, null, 2)}
            placeholder='{"ui:order": []}'
            className={`font-mono bg-[#0f1724] px-4 py-3 rounded-md text-sm border ${uiSchemaError ? 'border-red-500' : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} outline-none transition-colors`}
            rows={10}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-6 border-t border-slate-800">
          <Button type="button" variant="danger" onClick={() => router.back()}>
            Cancel
          </Button>
          <SubmitButton title="Update Form" />
        </div>
      </div>
    </form>
  );
}
