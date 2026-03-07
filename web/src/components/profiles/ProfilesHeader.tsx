"use client";
import React from "react";
import Link from "next/link";
import { Plus, UserPlus, Search } from "lucide-react";

const ProfilesHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <UserPlus className="text-primary" size={28} />
            Profiles
          </h1>
          <p className="text-foreground/50 text-sm mt-1 font-medium">
            Manage user identities and access profiles
          </p>
        </div>
        <Link href="/profiles/add">
          <button className="btn-pill bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            Add Profile
          </button>
        </Link>
      </div>

      <div className="card-meltwater p-2 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-3 px-4 py-2 bg-foreground/5 rounded-lg w-full md:w-96 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="h-4 w-4 text-foreground/40" />
          <input
            placeholder="Search profiles..."
            className="bg-transparent outline-none text-foreground placeholder:text-foreground/30 w-full text-sm font-medium"
          />
        </div>
        <div className="md:ml-auto flex items-center gap-2 px-4">
          <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Type
          </span>
          <select className="bg-transparent text-sm font-bold text-foreground outline-none cursor-pointer">
            <option>All Users</option>
            <option>Admins</option>
            <option>Staff</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfilesHeader;
