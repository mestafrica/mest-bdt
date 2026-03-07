"use client";

import HankoProfile from "@/components/auth/HankoProfile";
import NoSSR from "@/components/core/NoSSR";
import { User } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl min-h-screen">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Account Settings
            </h1>
            <p className="text-foreground/50 text-sm mt-1 font-medium">
              Manage your personal information and security settings.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="card-meltwater overflow-hidden">
          <div className="p-8 border-b border-border bg-foreground/[0.02]">
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              Profile Information
            </h2>
            <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mt-1">
              Update your account details and email preferences.
            </p>
          </div>
          <div className="p-8 hanko-profile-container">
            <NoSSR>
              <HankoProfile />
            </NoSSR>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hanko-profile-container hanko-profile::part(container) {
          background-color: transparent !important;
          color: var(--foreground) !important;
        }
        .hanko-profile-container hanko-profile::part(heading) {
          color: var(--foreground) !important;
          font-weight: 700 !important;
          letter-spacing: -0.025em !important;
        }
        .hanko-profile-container hanko-profile::part(input) {
          background-color: var(--foreground) / 0.05 !important;
          border-color: var(--border) !important;
          color: var(--foreground) !important;
          border-radius: 0.75rem !important;
        }
        .hanko-profile-container hanko-profile::part(button) {
          background-color: var(--primary) !important;
          color: var(--primary-foreground) !important;
          border-radius: 9999px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          font-size: 0.75rem !important;
          padding: 0.75rem 1.5rem !important;
        }
      `}</style>
    </div>
  );
}
