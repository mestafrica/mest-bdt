import AllCompanies from "@/components/companies/AllCompanies";
import CompaniesHeader from "@/components/companies/CompaniesHeader";

export default function Companies() {
  return (
    <>
      <div className="flex flex-col bg-gray-200 p-8 text-black">
        <CompaniesHeader />
        <AllCompanies />
      </div>
    </>
  );
}
