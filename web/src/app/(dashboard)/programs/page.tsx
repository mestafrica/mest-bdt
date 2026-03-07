import Programs from "@/components/programs/Programs";
import ProgramsHeader from "@/components/programs/ProgramsHeader";

export default function ProgramsPage() {
  return (
    <div className="bg-[#0B1220] p-4 sm:p-8 rounded-md min-h-screen">
      <ProgramsHeader />
      <Programs />
    </div>
  );
}
