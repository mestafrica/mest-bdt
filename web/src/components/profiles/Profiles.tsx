"use client";
import React from "react";
import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { Profile } from "@/utils/types";
import ProfileCard from "./ProfileCard";
import { Users } from "lucide-react";

const Profiles = () => {
  const { data: profiles, error, isLoading } = useSWR<Profile[]>("/profiles", apiFetcher);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-48 bg-[#0f1724] animate-pulse rounded-xl border border-slate-800"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center bg-red-900/10 border border-red-900/20 rounded-xl">
        <p className="text-red-400 font-medium">Failed to load profiles. Please try again later.</p>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="p-20 text-center bg-[#0f1724] border border-slate-800 border-dashed rounded-xl">
        <Users className="w-12 h-12 text-slate-700 mx-auto mb-4" />
        <h3 className="text-slate-100 font-semibold text-lg">No profiles found</h3>
        <p className="text-slate-500 text-sm mt-1">Start by adding a new user profile to the system.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default Profiles;
