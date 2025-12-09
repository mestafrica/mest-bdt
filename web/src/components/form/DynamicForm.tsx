"use client";
import { apiFetcher } from "@/utils/api";
import Form from "@rjsf/shadcn";
import validator from "@rjsf/validator-ajv8";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function DynamicForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading, error } = useSWR(`/forms/${id}`, apiFetcher);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Form
      schema={JSON.parse(data?.schema || "{}")}
      validator={validator}
      onSubmit={(data) => {
        console.log(JSON.stringify(data.schema));
      }}
    />
  );
}
