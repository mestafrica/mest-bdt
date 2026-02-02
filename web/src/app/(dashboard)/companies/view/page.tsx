import CompanyHeader from "@/components/companies/CompanyHeader";
import InviteUserSection from "@/components/companies/InviteUserSection";
import CompanyStats from "@/components/companies/CompanyStats";
import CompanyImage from "@/components/companies/CompanyImage";
import CompanyContactInfo from "@/components/companies/CompanyContactInfo";
import OrganizationProfile from "@/components/companies/OrganizationProfile";
import CompanyGoals from "@/components/companies/CompanyGoals";

export default function ViewCompanyPage() {
  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-100  text-gray-900  transition-colors duration-300">
      <CompanyHeader />

      <div className="mt-6">
        <InviteUserSection />
      </div>

      <CompanyStats />
      <CompanyImage />

      {/* Company details */}
      <div className="flex flex-col md:flex-row justify-between gap-4 ">
        <CompanyContactInfo />
        <OrganizationProfile />
      </div>

      <CompanyGoals />
    </div>
  );
}
