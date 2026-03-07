import CompanyHeader from "@/components/companies/CompanyHeader";
import InviteUserSection from "@/components/companies/InviteUserSection";
import CompanyStats from "@/components/companies/CompanyStats";
import CompanyContactInfo from "@/components/companies/CompanyContactInfo";
import OrganizationProfile from "@/components/companies/OrganizationProfile";
import CompanyGoals from "@/components/companies/CompanyGoals";

export default function ViewCompanyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <CompanyHeader />

      <div className="space-y-8">
        <InviteUserSection />

        <CompanyStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CompanyContactInfo />
          <OrganizationProfile />
        </div>

        <CompanyGoals />
      </div>
    </div>
  );
}
