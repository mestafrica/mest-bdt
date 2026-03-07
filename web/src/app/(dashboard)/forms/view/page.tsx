import FormDetail from "@/components/forms/FormDetail";
import FormHeader from "@/components/forms/FormHeader";

export default function ViewFormPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <FormHeader />
      <FormDetail />
    </div>
  );
}
