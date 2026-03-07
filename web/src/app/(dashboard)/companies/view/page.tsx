import CompanyHeader from "@/components/companies/CompanyHeader";
import InviteUserSection from "@/components/companies/InviteUserSection";
import CompanyStats from "@/components/companies/CompanyStats";
// import CompanyImage from "@/components/companies/CompanyImage";
import CompanyContactInfo from "@/components/companies/CompanyContactInfo";
import OrganizationProfile from "@/components/companies/OrganizationProfile";
import CompanyGoals from "@/components/companies/CompanyGoals";

export default function ViewCompanyPage() {
  return (
    <div className="bg-[#0B1220] p-4 sm:p-8 rounded-md min-h-screen">
      <CompanyHeader />

      <div className="mt-6">
        <InviteUserSection />
      </div>

      <div className="mb-6">
        <CompanyStats />
      </div>
      {/* <CompanyImage /> */}

      {/* Company details */}
      <div className="flex flex-col md:flex-row justify-between gap-4 ">
        <CompanyContactInfo />
        <OrganizationProfile />
      </div>

      <div className="mt-6">
        <CompanyGoals />
      </div>
    </div>
  );
}
