"use client";

import HankoProfile from "@/components/auth/HankoProfile";
import NoSSR from "@/components/core/NoSSR";
import { User } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="px-4 sm:px-8 py-6 min-h-screen bg-[#0B1220] text-slate-200">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-900/20 rounded-lg">
            <User className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Account Settings</h1>
        </div>
        <p className="text-slate-400 text-sm">
          Manage your personal information and security settings.
        </p>
      </div>

      <div className="max-w-4xl">
        <div className="bg-[#0f1724] rounded-xl border border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50">
            <h2 className="text-lg font-semibold text-slate-100">Profile Information</h2>
            <p className="text-xs text-slate-500 mt-1">Update your account details and email preferences.</p>
          </div>
          <div className="p-6 hanko-profile-container">
            <NoSSR>
              <HankoProfile />
            </NoSSR>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hanko-profile-container hanko-profile::part(container) {
          background-color: transparent !important;
          color: #e2e8f0 !important;
        }
        .hanko-profile-container hanko-profile::part(heading) {
          color: #f1f5f9 !important;
        }
        .hanko-profile-container hanko-profile::part(input) {
          background-color: #1e293b !important;
          border-color: #334155 !important;
          color: #f1f5f9 !important;
        }
        .hanko-profile-container hanko-profile::part(button) {
          background-color: #3b82f6 !important;
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
