"use client";
import SubmitButton from "../core/SubmitButton";
import { apiClient } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../core/Button";
import toast from "react-hot-toast";
import { Building2, User, Globe, Briefcase } from "lucide-react";

export default function AddCompanyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    try {
      await apiClient.post("/companies", {
        cohort: searchParams.get("cid"),
        name: data.get("name"),
      });
      toast.success("Company added successfully!");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add company!");
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
          Add Partner Company
        </h1>
        <p className="text-foreground/40 text-sm mt-1 font-medium">
          Register a new partner organization into the ecosystem.
        </p>
      </div>

      <div className="card-meltwater p-8 space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Company Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Company Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., TechVentures Inc."
                className="w-full px-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6 pt-8 border-t border-border">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Lead Contact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Project Manager <span className="text-primary">*</span>
              </label>
              <div className="relative group">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                />
                <input
                  type="text"
                  placeholder="e.g. Sarah Ayitey"
                  className="w-full pl-11 pr-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1">
                Website URL
              </label>
              <div className="relative group">
                <Globe
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full pl-11 pr-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all"
                />
              </div>
            </div>
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
        <SubmitButton title="Create Company" className="px-10 py-3 text-base" />
      </div>
    </form>
  );
}
