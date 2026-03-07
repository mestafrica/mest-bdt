import ProgramDetail from "@/components/programs/ProgamDetail";
import ProgamHeader from "@/components/programs/ProgramHeader";

export default function ViewProgramPage() {
  return (
    <div className="bg-[#0B1220] p-4 sm:p-8 rounded-md min-h-screen">
      <ProgamHeader />
      <ProgramDetail />
    </div>
  );
}
