"use client";
import AccessDenied from "./AccessDenied";
import AccessLoader from "./AccessLoader";
import { useUser } from "@/hooks/user";

export default function UserAccessChecker({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, error } = useUser();

  if (isLoading) return <AccessLoader />;
  if (error) return <AccessDenied />;
  return <>{children}</>;
}
