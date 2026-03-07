"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import { useUpload } from "@/hooks/upload";
import Image from "next/image";
import { Image as ImageIcon, Calendar, Users, Loader2 } from "lucide-react";

export default function AddCohortForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { upload, loading, url } = useUpload();

  const handleSubmit = async (data: FormData) => {
    try {
      await apiClient.post("/cohorts", {
        program: searchParams.get("pid"),
        name: data.get("name"),
        description: data.get("description"),
        image: url,
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
      });
      toast.success("Cohort added successfully!");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add cohort!");
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
          Add New Cohort
        </h1>
        <p className="text-foreground/40 text-sm mt-1 font-medium">
          Create a new student cohort by filling out the information below.
        </p>
      </div>

      <div className="card-meltwater p-8 space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Users size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Cohort Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Cohort Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., 2025 Spring Cohort"
                className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Cohort Description <span className="text-primary">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Provide a detailed description of the cohort..."
                className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all min-h-[120px]"
                required
              />
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="space-y-6 pt-8 border-t border-border">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Duration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Start Date <span className="text-primary">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                End Date <span className="text-primary">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold outline-none transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-6 pt-8 border-t border-border">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Cohort Banner
            </h2>
          </div>

          <div className="relative">
            {loading ? (
              <div className="w-full py-10 flex flex-col items-center justify-center gap-3 bg-foreground/5 rounded-2xl border border-dashed border-border transition-all">
                <Loader2 size={32} className="text-primary animate-spin" />
                <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                  Uploading Image...
                </span>
              </div>
            ) : url ? (
              <div className="w-full p-6 flex flex-col items-center justify-center gap-4 bg-primary/5 rounded-2xl border border-primary/20 transition-all">
                <div className="relative h-32 w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-primary/10">
                  <Image
                    src={url}
                    alt="Uploaded"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">
                  Image uploaded successfully
                </p>
              </div>
            ) : (
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      upload(e.target.files?.[0]);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full py-12 flex flex-col items-center justify-center gap-4 bg-foreground/[0.02] border-2 border-dashed border-border group-hover:bg-primary/5 group-hover:border-primary/30 rounded-2xl transition-all">
                  <div className="w-12 h-12 bg-foreground/5 group-hover:bg-primary group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                    <ImageIcon size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-foreground">
                      Click or drag banner image here
                    </p>
                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            )}
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
        <SubmitButton title="Create Cohort" className="px-10 py-3 text-base" />
      </div>
    </form>
  );
}
