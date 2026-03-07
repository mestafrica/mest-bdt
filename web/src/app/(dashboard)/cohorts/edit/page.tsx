import EditCohortForm from "@/components/cohorts/EditCohortForm";

export default function EditCohortPage() {
  return (
    <div className="bg-[#0B1220] rounded-lg p-4 sm:p-6 w-full min-h-screen flex text-slate-200">
      <div className="w-full max-w-4xl mx-auto">
        <EditCohortForm />
      </div>
    </div>
  );
}
