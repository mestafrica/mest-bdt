import Forms from "@/components/forms/Forms";
import FormsHeader from "@/components/forms/FormsHeader";

export default function FormsPage() {
  return (
    <div className="bg-[#0B1220] p-4 sm:p-8 rounded-md min-h-screen">
      <FormsHeader />
      <Forms />
    </div>
  );
}
