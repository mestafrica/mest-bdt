import CohortDetail from "@/components/cohorts/CohortDetail";
import CohortHeader from "@/components/cohorts/CohortHeader";

export default function ViewCohortPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <CohortHeader />
      <CohortDetail />
    </div>
  );
}
