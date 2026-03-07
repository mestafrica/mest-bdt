import CohortDetail from "@/components/cohorts/CohortDetail";
import CohortHeader from "@/components/cohorts/CohortHeader";

export default function ViewCohortPage() {
  return (
    <div className="bg-[#0B1220] p-4 sm:p-8 rounded-md min-h-screen">
      <CohortHeader />
      <CohortDetail />
    </div>
  );
}
