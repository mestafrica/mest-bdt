"use client";
import { apiFetcher } from "@/utils/api";
import Form from "@rjsf/shadcn";
import validator from "@rjsf/validator-ajv8";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function DynamicForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading, error } = useSWR(`/forms/${id}`, apiFetcher);

  if (isLoading) return <div className="p-8 text-center text-slate-400">Loading form...</div>;

  if (error) return <div className="p-8 text-center text-red-400">Error loading form: {error.message}</div>;

  return (
    <div className="bg-[#0f1724] p-6 rounded-xl border border-slate-800 shadow-sm">
      <Form
        schema={JSON.parse(data?.schema || "{}")}
        uiSchema={JSON.parse(data?.uiSchema || "{}")}
        validator={validator}
        onSubmit={(data) => {
          console.log(data.formData);
        }}
      />
    </div>
  );
}
