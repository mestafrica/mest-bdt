"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient } from "@/utils/api";
import { useRouter } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import { useUpload } from "@/hooks/upload";

export default function AddProgramForm() {
  const router = useRouter();
  const { upload, loading, url } = useUpload();

  const handleSubmit = async (data: FormData) => {
    try {
      const response = await apiClient.post("/programs", {
        name: data.get("name"),
        description: data.get("description"),
        image: url,
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
      });
      console.log(response.data);
      toast.success("Program added successfully!");
      // Navigate back
      router.back();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add program!");
    }
  };

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="mt-6 bg-[#0B1220] p-4 sm:p-8 border border-slate-800 rounded-lg text-slate-200"
    >
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">
        Add New Program
      </h1>
      <p className="text-slate-400 text-sm mb-6">
        Create a new cohort program by filling out the information below
      </p>
      <div className="w-full mx-auto mt-6">
        {/* Basic Information Section */}
        <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">Basic Information</h2>
        <div className="space-y-6 mt-4">
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm font-medium text-slate-300 mb-2">
              Program Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Leadership Development Program"
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm font-medium text-slate-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Provide a detailed description of the program..."
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              rows={4}
              required
            />
          </div>
        </div>
      </div>

      {/* Scheduling of participants */}
      <div className="mt-10 w-full mx-auto">
        <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">Schedule</h2>
        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="" className="text-sm font-medium text-slate-300 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-slate-200 w-full"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="" className="text-sm font-medium text-slate-300 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-slate-200 w-full"
              required
            />
          </div>
        </div>
      </div>

      {/* Insert of Images */}
      {loading ? (
        <p className="mt-6 text-slate-400">Uploading...</p>
      ) : url ? (
        <p className="mt-6 text-green-400">Image uploaded successfully</p>
      ) : (
        <div className="mt-10 w-full mx-auto">
          <h2 className="text-lg font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">Image (Optional)</h2>
          <div className="flex flex-col">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  upload(e.target.files?.[0]);
                }
              }}
              className="bg-[#0f1724] px-4 py-3 rounded-md text-sm border border-slate-700 focus:border-blue-500 outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 text-slate-300 w-full"
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-10 border-t border-slate-800">
        <Button type="button" variant="danger" onClick={() => router.back()}>
          Cancel
        </Button>
        <SubmitButton title="Create Program" />
      </div>
    </form>
  );
}
