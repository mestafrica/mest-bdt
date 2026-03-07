import FormDetail from "@/components/forms/FormDetail";
import FormHeader from "@/components/forms/FormHeader";

export default function ViewFormPage() {
  return (
    <div className="bg-[#0B1220] p-4 sm:p-8 rounded-md min-h-screen">
      <FormHeader />
      <FormDetail />
    </div>
  );
}
