"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Loader2, User, ShieldCheck, Info } from "lucide-react";
import toast from "react-hot-toast";
import { apiClient } from "@/utils/api";
import Button from "../core/Button";

const AddProfileForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required!");

    setIsLoading(true);
    try {
      await apiClient.post("/profiles", { email });
      toast.success("Profile added successfully!");
      router.back();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to add profile!";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
          Add New Profile
        </h1>
        <p className="text-foreground/40 text-sm font-medium">
          Provision a new user account by entering their primary email address.
        </p>
      </div>

      <div className="card-meltwater p-8 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <User size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              User Identity
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest px-1"
              >
                Email Address <span className="text-primary">*</span>
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-foreground/5 border border-transparent focus:border-primary/30 rounded-xl text-sm font-bold placeholder:text-foreground/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
              <Info size={16} className="text-primary mt-0.5" />
              <p className="text-[11px] font-medium text-foreground/60 leading-relaxed">
                The user will receive an automated invitation email to verify
                their account and set their password once the profile is
                created.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t border-border">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Access Permissions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={32} />
              </div>
              <p className="text-xs font-bold text-foreground mb-1">
                Standard User
              </p>
              <p className="text-[10px] font-medium text-foreground/40">
                Default access level for new profiles.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-foreground/[0.02] opacity-50 grayscale cursor-not-allowed">
              <p className="text-xs font-bold text-foreground mb-1">
                Administrative Access
              </p>
              <p className="text-[10px] font-medium text-foreground/40">
                Requires elevated verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="px-8"
        >
          Cancel
        </Button>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-pill bg-primary text-primary-foreground px-10 py-3 font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {isLoading ? "Provisioning..." : "Create Profile"}
        </button>
      </div>
    </form>
  );
};

export default AddProfileForm;
