import Programs from "@/components/programs/Programs";
import ProgramsHeader from "@/components/programs/ProgramsHeader";

export default function ProgramsPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
      <ProgramsHeader />
      <Programs />
    </div>
  );
}
