import Cohorts from "@/components/cohorts/Cohorts";
import CohortsHeader from "@/components/cohorts/CohortsHeader";

export default function CohortsPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
      <CohortsHeader />
      <Cohorts />
    </div>
  );
}
