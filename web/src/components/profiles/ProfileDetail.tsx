"use client";
import React from "react";
import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { Profile } from "@/utils/types";
import { Mail, Calendar, Clock, ShieldCheck, MailCheck } from "lucide-react";

interface ProfileDetailProps {
  id: string;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ id }) => {
  const { data: profile, error, isLoading } = useSWR<Profile>(
    id ? `/profiles/${id}` : null, 
    apiFetcher
  );

  if (isLoading) {
    return (
      <div className="bg-[#0f1724] rounded-xl border border-slate-800 p-8 animate-pulse">
        <div className="h-6 bg-slate-800 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-10 text-center bg-red-900/10 border border-red-900/20 rounded-xl">
        <p className="text-red-400 font-medium">Error loading profile details.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Main Info */}
        <div className="bg-[#0f1724] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-800 bg-slate-900/30">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              General Information
            </h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</p>
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Mail size={16} className="text-slate-500" />
                  {profile.email}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verification Status</p>
                <div className="flex items-center gap-2 text-green-400 font-medium bg-green-900/10 px-2 py-1 rounded w-fit text-sm">
                  <MailCheck size={14} />
                  Confirmed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for more details if needed */}
        <div className="bg-[#0f1724] rounded-xl border border-slate-800 p-8 border-dashed flex flex-col items-center justify-center text-slate-600">
           <p className="text-sm italic">Additional user metadata will appear here when available.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Metadata Card */}
        <div className="bg-[#0f1724] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-800 bg-slate-900/30">
            <h2 className="text-lg font-semibold text-slate-100">Metadata</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar size={14} className="text-slate-500" />
                Created At
              </div>
              <span className="text-xs text-slate-200 font-medium">
                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock size={14} className="text-slate-500" />
                Last Updated
              </div>
              <span className="text-xs text-slate-200 font-medium">
                {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
