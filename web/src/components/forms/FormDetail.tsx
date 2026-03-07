"use client";
import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { useSearchParams } from "next/navigation";

export default function FormDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: form, isLoading, error } = useSWR(
    id ? `/forms/${id}` : null,
    apiFetcher
  );

  if (isLoading) {
    return (
      <div className="mt-6 p-8 text-center text-slate-400 bg-[#0B1220] rounded-md border border-slate-800">
        Loading form details...
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="mt-6 p-8 text-center text-red-400 bg-[#0B1220] rounded-md border border-slate-800">
        Failed to load form details.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Details Card */}
      <div className="bg-[#0B1220] rounded-md border border-slate-800 p-6">
        <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Name</p>
            <p className="text-slate-200">{form.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">ID</p>
            <p className="text-slate-200 font-mono text-sm">{form.id || (form as { _id?: string })._id}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-slate-500 mb-1">Description</p>
            <p className="text-slate-200">{form.description}</p>
          </div>
          {(form.createdAt || form.updatedAt) && (
            <>
              <div>
                <p className="text-sm text-slate-500 mb-1">Created At</p>
                <p className="text-slate-200">
                  {form.createdAt ? new Date(form.createdAt).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Last Updated</p>
                <p className="text-slate-200">
                  {form.updatedAt ? new Date(form.updatedAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Schemas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JSON Schema */}
        <div className="bg-[#0B1220] rounded-md border border-slate-800 p-6 flex flex-col">
          <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">
            JSON Schema
          </h2>
          <pre className="flex-1 bg-[#0f1724] p-4 rounded-md overflow-x-auto text-sm text-slate-300 font-mono border border-slate-800/50">
            {typeof form.schema === "string"
              ? (() => {
                  try {
                    return JSON.stringify(JSON.parse(form.schema), null, 2);
                  } catch {
                    return form.schema;
                  }
                })()
              : JSON.stringify(form.schema, null, 2)}
          </pre>
        </div>

        {/* UI Schema */}
        <div className="bg-[#0B1220] rounded-md border border-slate-800 p-6 flex flex-col">
          <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">
            UI Schema
          </h2>
          <pre className="flex-1 bg-[#0f1724] p-4 rounded-md overflow-x-auto text-sm text-slate-300 font-mono border border-slate-800/50">
            {typeof form.uiSchema === "string"
              ? (() => {
                  try {
                    return JSON.stringify(JSON.parse(form.uiSchema || "{}"), null, 2);
                  } catch {
                    return form.uiSchema;
                  }
                })()
              : JSON.stringify(form.uiSchema || {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
