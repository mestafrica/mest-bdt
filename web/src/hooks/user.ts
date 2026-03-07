import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { User } from "@/utils/types";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    "/users/me",
    apiFetcher,
  );

  return {
    user: data,
    error,
    isLoading,
    mutate,
  };
}
