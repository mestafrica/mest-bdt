import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { Profile } from "@/utils/types";

export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR<Profile>(
    "/profiles/me",
    apiFetcher,
  );

  return {
    profile: data,
    error,
    isLoading,
    mutate,
  };
}
