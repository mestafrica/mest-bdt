import AddForm from "@/components/forms/AddForm";

export default function AddFormPage() {
  return (
    <div className="bg-[#0B1220] rounded-lg p-4 sm:p-6 w-full min-h-screen flex text-slate-200">
      <div className="w-full max-w-4xl mx-auto">
        <AddForm />
      </div>
    </div>
  );
}
