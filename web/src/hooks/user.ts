import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { User } from "@/utils/types";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    "/users/me",
    apiFetcher,
  );

    console.log("Current user:", data);
  console.log("User error:", error);
  
  return {
    user: data,
    error,
    isLoading,
    mutate,
  };
}
