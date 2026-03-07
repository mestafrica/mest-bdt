"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Loader2, User, Shield } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiClient } from "@/utils/api";

interface ProfileHeaderProps {
  id: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ id }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/profiles/${id}`);
      toast.success("Profile deleted successfully!");
      router.back();
    } catch {
      toast.error("Failed to delete profile");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-foreground/5 text-foreground/40 hover:text-primary transition-all hover:bg-primary/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <User className="text-primary" size={28} />
            Profile Details
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              Access Control
            </span>
            <span className="w-1 h-1 bg-foreground/20 rounded-full"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              User Profile
            </span>
          </div>
        </div>
      </div>

      <div className="card-meltwater p-3 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-3 px-4">
          <Shield size={18} className="text-primary" />
          <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Account ID:
          </span>
          <span className="text-xs font-bold text-foreground">{id}</span>
        </div>

        <div className="md:ml-auto flex items-center gap-2">
          <Link
            href={`/profiles/edit?id=${id}`}
            className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-xl transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all text-xs font-bold disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {isDeleting ? "Deleting..." : "Delete Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
