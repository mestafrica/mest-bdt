"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient, apiFetcher } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function EditCompanyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useSWR(`/companies/${searchParams.get("id")}`, apiFetcher);

  const handleSubmit = async (data: FormData) => {
    try {
      const response = await apiClient.patch(
        `/companies/${searchParams.get("id")}`,
        {
          name: data.get("name"),
        },
      );
      console.log(response.data);
      toast.success("Company updated successfully!");
      // Navigate back
      router.back();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update company!");
    }
  };

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="mt-6 bg-[#0B1220] p-4 sm:p-8 border border-slate-800 rounded-lg text-slate-200"
    >
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">Edit Company</h1>
      <p className="text-slate-400 text-sm mb-6">
        Update the company information for Leadership Development Program
      </p>
      {/* Basic information details */}
      <div className="w-full mx-auto mt-6">
        <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">Basic Information</h2>
        <div className="space-y-6 mt-4">
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="text-sm font-medium text-slate-300 mb-2 block"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data?.name}
              placeholder="e.g., TechVentures Inc."
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors w-full"
            />
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="mt-10 w-full mx-auto">
        <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">Contact Information</h2>
        <div className="mt-4">
          <label
            htmlFor=""
            className="text-sm font-medium text-slate-300 mb-2 block"
          >
            Project Manager <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Add a company objective..."
            className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors w-full"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-10 border-t border-slate-800">
        <Button type="button" variant="danger" onClick={() => router.back()}>
          Cancel
        </Button>
        <SubmitButton title="Update Company" />
      </div>
    </form>
  );
}
