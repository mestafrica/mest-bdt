import useSWR from "swr";
import { apiFetcher } from "@/utils/api";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR("/users/me", apiFetcher);

  return {
    user: data,
    error,
    isLoading,
    mutate,
  };
}
