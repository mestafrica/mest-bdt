import Companies from "@/components/companies/Companies";
import CompaniesHeader from "@/components/companies/CompaniesHeader";

export default function CompaniesPage() {
  return (
    <div className="bg-[#0B1220] p-4 sm:p-8 rounded-md min-h-screen">
      <CompaniesHeader />
      <Companies />
    </div>
  );
}
