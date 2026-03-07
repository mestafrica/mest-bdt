import React from "react";
import { Loader2, Briefcase } from "lucide-react";

interface AccessLoaderProps {
  message?: string;
}

const AccessLoader: React.FC<AccessLoaderProps> = ({
  message = "Verifying your credentials and preparing your workspace...",
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6 w-full animate-in fade-in duration-500">
      <div className="w-full max-w-md p-10 space-y-10 card-meltwater text-center bg-card shadow-2xl shadow-primary/5 flex flex-col items-center">
        {/* Brand Logo Integration */}
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 animate-pulse">
          <Briefcase className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-10 w-full">
          {/* Main Loader */}
          <div className="flex justify-center">
            <Loader2
              className="w-12 h-12 text-primary animate-spin"
              strokeWidth={2.5}
            />
          </div>

          {/* Status Indicators */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              {message}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
              Secured by MEST Africa BDT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessLoader;
