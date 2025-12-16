import useSWR from "swr";
import { apiFetcher } from "@/utils/api";

export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR("/profiles/me", apiFetcher);

  return {
    profile: data,
    error,
    isLoading,
    mutate,
  };
}
