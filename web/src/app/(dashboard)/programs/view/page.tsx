import ProgramDetail from "@/components/programs/ProgramDetail";
import ProgramHeader from "@/components/programs/ProgramHeader";

export default function ViewProgramPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ProgramHeader />
      <ProgramDetail />
    </div>
  );
}
