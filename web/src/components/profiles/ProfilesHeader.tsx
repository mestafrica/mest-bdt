"use client";
import React from "react";
import Link from "next/link";
import { Plus, UserPlus } from "lucide-react";

const ProfilesHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-3">
          <UserPlus className="text-blue-400" />
          Profiles Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage user identities and access profiles.
        </p>
      </div>
      <Link
        href="/profiles/add"
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md font-medium text-sm"
      >
        <Plus size={18} />
        Add Profile
      </Link>
    </div>
  );
};

export default ProfilesHeader;
