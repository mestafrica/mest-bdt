"use client";
import React from "react";
import useSWR from "swr";
import { apiFetcher } from "@/utils/api";
import { Response } from "@/utils/types";
import ResponseCard from "./ResponseCard";
import { Loader2, AlertCircle, FileX } from "lucide-react";

export default function ResponsesList() {
  const {
    data: responses,
    error,
    isLoading,
    mutate,
  } = useSWR<Response[]>("/responses", apiFetcher);

  const handleDelete = (id: string) => {
    mutate(
      responses?.filter((r) => r.id !== id),
      false,
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 card-meltwater bg-foreground/5 border-dashed">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
          Fetching Submissions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 card-meltwater border-rose-500/20 bg-rose-500/5">
        <AlertCircle className="h-12 w-12 text-rose-500/40" />
        <div className="text-center">
          <p className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-1">
            Retrieval Error
          </p>
          <p className="text-foreground/40 text-sm">
            Failed to connect to response stream
          </p>
        </div>
      </div>
    );
  }

  if (!responses || responses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 card-meltwater border-dashed bg-foreground/[0.02]">
        <div className="p-4 rounded-3xl bg-foreground/5 text-foreground/20">
          <FileX size={48} />
        </div>
        <div className="text-center">
          <p className="text-foreground font-bold uppercase tracking-widest text-xs mb-1">
            Silence
          </p>
          <p className="text-foreground/40 text-sm">
            No submissions have been recorded yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {responses.map((response) => (
        <ResponseCard
          key={response.id}
          response={response}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
