import ResponsesList from "@/components/responses/ResponsesList";
import ResponsesHeader from "@/components/responses/ResponsesHeader";

export default function ResponsesPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl animate-in fade-in duration-700">
      <ResponsesHeader />
      <ResponsesList />
    </div>
  );
}
