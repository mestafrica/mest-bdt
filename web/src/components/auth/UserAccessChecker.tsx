"use client";
import { apiFetcher } from "@/utils/api";
import useSWR from "swr";
import AccessDenied from "./AccessDenied";
import AccessLoader from "./AccessLoader";

export default function UserAccessChecker({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, error } = useSWR("/users/me", apiFetcher);

  if (isLoading) return <AccessLoader />;
  if (error) return <AccessDenied />;
  return <>{children}</>;
}
