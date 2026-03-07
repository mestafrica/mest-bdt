import Forms from "@/components/forms/Forms";
import FormsHeader from "@/components/forms/FormsHeader";

export default function FormsPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
      <FormsHeader />
      <Forms />
    </div>
  );
}
