"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient } from "@/utils/api";
import { useRouter } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import { useState } from "react";

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
      const response = await apiClient.post("/forms", {
        name,
        description,
        schema: schemaStr || "{}",
        uiSchema: uiSchemaStr || "{}",
      });
      console.log(response.data);
      toast.success("Form added successfully!");
      router.back();
    } catch (error: unknown) {
      console.log(error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to add form!";
      toast.error(errorMessage);
    }
  };

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="mt-6 bg-[#0B1220] p-4 sm:p-8 border border-slate-800 rounded-lg text-slate-200"
    >
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">
        Add New Form
      </h1>
      <p className="text-slate-400 text-sm mb-6">
        Create a new dynamic form by specifying its JSON schema
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
            placeholder='{"type": "object", "properties": {}}'
            className={`font-mono bg-[#0f1724] px-4 py-3 rounded-md text-sm border ${schemaError ? 'border-red-500' : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} outline-none transition-colors`}
            rows={8}
            defaultValue='{"type": "object", "properties": {}}'
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
            placeholder='{"ui:order": []}'
            className={`font-mono bg-[#0f1724] px-4 py-3 rounded-md text-sm border ${uiSchemaError ? 'border-red-500' : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} outline-none transition-colors`}
            rows={8}
            defaultValue='{}'
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-6 border-t border-slate-800">
          <Button type="button" variant="danger" onClick={() => router.back()}>
            Cancel
          </Button>
          <SubmitButton title="Create Form" />
        </div>
      </div>
    </form>
  );
}
