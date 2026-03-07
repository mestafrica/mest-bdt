"use client";
import { apiFetcher } from "@/utils/api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function ProgramDetail() {
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useSWR(
    `/programs/${searchParams.get("id")}`,
    apiFetcher,
  );

  if (isLoading) {
    return (
      <div className="mt-6 p-8 text-center text-slate-400 bg-[#0B1220] rounded-md border border-slate-800">
        Loading program detail...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-8 text-center text-red-400 bg-[#0B1220] rounded-md border border-slate-800">
        An unexpected error occured...
      </div>
    );
  }

  return (
    <>
      {/* Image Section */}
      <div className="relative mb-6 mt-6 h-[400px]">
        <Image
          src={data.image || "https://placehold.co/600x400.png"}
          alt="Program Image"
          fill
          quality={100}
          className="rounded-md object-cover border border-slate-800"
        />
        <p className="absolute top-5 left-5 bg-green-900/80 text-green-200 border border-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          Active
        </p>
      </div>

      {/* Summary Information */}
      <div className="bg-[#0B1220] p-6 rounded-md border border-slate-800 mb-6">
        <h2 className="text-lg font-medium mb-4 pb-2 border-b border-slate-800 text-slate-200">
          Summary Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-sm">
          <div>
            <p className="text-slate-500 mb-1">Program Name</p>
            <p className="font-medium text-slate-200">{data.name}</p>
          </div>

          <div>
            <p className="text-slate-500 mb-1">Start Date</p>
            <p className="font-medium text-slate-200">
              {new Date(data.startDate).toDateString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500 mb-1">End Date</p>
            <p className="font-medium text-slate-200">
              {new Date(data.endDate).toDateString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500 mb-1">Cohort</p>
            <p className="font-medium text-slate-200">2025 Spring Cohort</p>
          </div>

          <div>
            <p className="text-slate-500 mb-1">Participants</p>
            <p className="font-medium text-slate-200">24</p>
          </div>

          <div>
            <p className="text-slate-500 mb-1">Status</p>
            <p className="font-medium text-green-400">Active</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-[#0B1220] p-6 rounded-md border border-slate-800">
        <h2 className="text-lg font-medium mb-4 pb-2 border-b border-slate-800 text-slate-200">
          Description
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {data.description}
        </p>
      </div>
    </>
  );
}
