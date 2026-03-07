"use client";
import AccessDenied from "./AccessDenied";
import AccessLoader from "./AccessLoader";
import { useProfile } from "@/hooks/profile";

export default function ProfileAccessChecker({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, error } = useProfile();

  if (isLoading) return <AccessLoader />;
  if (error) return <AccessDenied href="/user" label="Return to Profile" />;
  return <>{children}</>;
}
