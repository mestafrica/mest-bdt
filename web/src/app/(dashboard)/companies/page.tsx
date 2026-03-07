import Companies from "@/components/companies/Companies";
import CompaniesHeader from "@/components/companies/CompaniesHeader";

export default function CompaniesPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
      <CompaniesHeader />
      <Companies />
    </div>
  );
}
