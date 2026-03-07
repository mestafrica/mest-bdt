import React from "react";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";
import HankoLogout from "./HankoLogout";
import NoSSR from "../core/NoSSR";
import Link from "next/link";
import Button from "../core/Button";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  href: string;
  label: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({
  title = "Access Restricted",
  message = "You don't have the necessary permissions to access this module. Please verify your account status or contact your administrator.",
  href,
  label,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6 w-full animate-in zoom-in-95 duration-300">
      <div className="w-full max-w-lg p-10 space-y-10 card-meltwater bg-card text-center shadow-2xl shadow-rose-500/5 border-rose-500/10">
        {/* Visual Indicator */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="p-6 rounded-3xl bg-rose-500/10 ring-8 ring-rose-500/5">
              <ShieldAlert
                className="w-16 h-16 text-rose-500"
                strokeWidth={1.5}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 bg-card border border-border rounded-xl shadow-lg">
              <Lock className="w-5 h-5 text-foreground/40" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-rose-500/60 uppercase tracking-[0.3em]">
              Security Protocol Alert
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-foreground/50 font-medium leading-relaxed max-w-md mx-auto">
            {message}
          </p>
        </div>

        {/* Action Footer */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4">
          <NoSSR>
            <HankoLogout />
          </NoSSR>
          <Link href={href}>
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {label}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
