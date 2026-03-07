"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient, apiFetcher } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import useSWR from "swr";
import dayjs from "dayjs";
import { useUpload } from "@/hooks/upload";

export default function EditCohortForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useSWR(`/cohorts/${searchParams.get("id")}`, apiFetcher);
  const { upload, loading, url } = useUpload();

  const handleSubmit = async (data: FormData) => {
    try {
      const response = await apiClient.patch(
        `/cohorts/${searchParams.get("id")}`,
        {
          name: data.get("name"),
          description: data.get("description"),
          ...(url && { image: url }),
          startDate: data.get("startDate"),
          endDate: data.get("endDate"),
        },
      );
      console.log(response.data);
      toast.success("Cohort updated successfully!");
      // Navigate back
      router.back();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cohort!");
    }
  };

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="mt-6 bg-[#0B1220] p-4 sm:p-8 border border-slate-800 rounded-lg text-slate-200"
    >
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">
        Edit Cohort
      </h1>
      <p className="text-slate-400 text-sm mb-6">
        Update cohort information by filling this form
      </p>
      <div className="w-full mx-auto mt-6">
        <div className="space-y-6 mt-4">
          {/* Cohort Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-300 mb-2">
              Cohort Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data?.name}
              placeholder="e.g., 2025 Spring Cohort"
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
          {/* Cohort Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-300 mb-2">
              Cohort Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              defaultValue={data?.description}
              placeholder="Provide a detailed description of the cohort..."
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              rows={5}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium text-slate-300 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={dayjs(data?.startDate).format("YYYY-MM-DD")}
                className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-slate-200"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium text-slate-300 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                defaultValue={dayjs(data?.endDate).format("YYYY-MM-DD")}
                className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-slate-200"
              />
            </div>
          </div>
          {/* Upload Image */}
          {loading ? (
            <p>Uploading...</p>
          ) : url ? (
            <p>Image uploaded successfully</p>
          ) : (
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-300 mb-2">
                Upload Image <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    upload(e.target.files?.[0]);
                  }
                }}
                className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 text-slate-300"
              />
            </div>
          )}
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-6 border-t border-slate-800">
            <Button type="button" variant="danger" onClick={() => router.back()}>
              Cancel
            </Button>
            <SubmitButton title="Edit Cohort" />
          </div>
        </div>
      </div>
    </form>
  );
}
