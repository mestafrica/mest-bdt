import React from "react";
// 1. Import Lucide icons
import { ShieldAlert, Lock } from "lucide-react";
import HankoLogout from "./HankoLogout";
import NoSSR from "../core/NoSSR";
import Link from "next/link";
import Button from "../core/Button";

// Interface for component props (optional but good practice in TypeScript)
interface AccessDeniedProps {
  title?: string;
  message?: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({
  title = "Access Denied",
  message = "You do not have permission to view this page. Please contact your system administrator if you believe this is an error.",
}) => {
  return (
    // Full-page container: Centered, fills viewport, uses a background color
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 w-full">
      {/* Content Card: Max width, rounded corners, shadow, white/dark background */}
      <div className="w-full max-w-xl p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl text-center">
        {/* Illustration Section (Visual Indicator) */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Main Icon - Lucide icons accept Tailwind classes via 'className' */}
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/50">
            <ShieldAlert
              className="w-16 h-16 text-red-600 dark:text-red-400"
              strokeWidth={1.5} // Lucide specific prop to control line thickness
            />
          </div>
          {/* Secondary Illustration/Lock Visual */}
          <div className="flex items-center justify-center space-x-2 text-gray-400 dark:text-gray-500">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Secured Zone
            </span>
          </div>
        </div>
        {/* Text Content */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        {/* Small Print/Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-between">
          <NoSSR>
            <HankoLogout />
          </NoSSR>
          <Link href="/user">
            <Button variant="primary">Visit Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
