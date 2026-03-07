"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Loader2, User } from "lucide-react";
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
    if (!window.confirm("Are you sure you want to delete this profile?")) return;

    setIsDeleting(true);
    try {
      await apiClient.delete(`/profiles/${id}`);
      toast.success("Profile deleted successfully!");
      router.push("/profiles");
    } catch {
      toast.error("Failed to delete profile");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-[#0f1724] p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/profiles")}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-slate-800"
          title="Back to Profiles"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-10 w-10 bg-blue-900/20 rounded-lg flex items-center justify-center">
          <User className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100">Profile Details</h1>
          <p className="text-xs text-slate-400 mt-0.5">ID: {id}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link 
          href={`/profiles/edit?id=${id}`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-all text-sm font-medium"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/30 rounded-lg transition-all text-sm font-medium disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
