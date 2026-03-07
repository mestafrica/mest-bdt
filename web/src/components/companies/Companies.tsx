"use client";
import useSWR from "swr";
import CompanyCard from "./CompanyCard";
import { apiFetcher } from "@/utils/api";
import { Company } from "@/utils/types";
import { useSearchParams } from "next/navigation";

export default function Companies() {
  const searchParams = useSearchParams();
  const filter = JSON.stringify({ cohort: searchParams.get("cid") });
  const { data, isLoading, error } = useSWR(
    `/companies?filter=${filter}`,
    apiFetcher,
  );

  if (isLoading) {
    return (
      <section className="mt-8 flex justify-center text-slate-400">
        <p>Loading all companies...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-8 flex justify-center text-red-400">
        <p>An unexpected error occured...</p>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="mt-8 flex justify-center text-slate-400 bg-[#0B1220] p-8 rounded-md border border-slate-800">
        <p>No companies found. Create one to get started.</p>
      </section>
    );
  }

  return (
    <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((company: Company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </section>
  );
}
