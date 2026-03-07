"use client";
import React from "react";
import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { Profile } from "@/utils/types";
import ProfileCard from "./ProfileCard";
import { UserPlus } from "lucide-react";

const Profiles = () => {
  const {
    data: profiles,
    error,
    isLoading,
  } = useSWR<Profile[]>("/profiles", apiFetcher);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-64 card-meltwater animate-pulse bg-foreground/[0.02]"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater border-rose-500/20 bg-rose-500/5">
        <p className="text-rose-500 font-bold">Failed to load profiles</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs font-bold text-foreground/40 hover:text-foreground underline decoration-primary underline-offset-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 card-meltwater bg-foreground/[0.02]">
        <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center mb-2">
          <UserPlus className="h-8 w-8 text-foreground/20" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No Profiles Found</h3>
        <p className="text-foreground/40 text-sm font-medium">
          Add your first profile to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default Profiles;
