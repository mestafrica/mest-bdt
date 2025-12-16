"use client";
import AccessDenied from "./AccessDenied";
import AccessLoader from "./AccessLoader";
import { useProfile } from "@/hooks/profile";

export default function AccessChecker({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, error } = useProfile();

  if (isLoading) return <AccessLoader />;
  if (error) return <AccessDenied />;
  return <>{children}</>;
}
