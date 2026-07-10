"use client";

import CompanyHeader from "@/components/companies/CompanyHeader";
import InviteUserSection from "@/components/companies/InviteUserSection";
import CompanyStats from "@/components/companies/CompanyStats";
import CompanyContactInfo from "@/components/companies/CompanyContactInfo";
import OrganizationProfile from "@/components/companies/OrganizationProfile";
import CompanyGoals from "@/components/companies/CompanyGoals";
import useSWR from "swr";
import { useUser } from "@/hooks/user";
import { apiFetcher } from "@/utils/api";

export default function ViewCompanyPage() {
  const {user} = useUser();

  console.log("User:", user);
console.log("Company ID:", user?.company);

  const {data: company, isLoading, error} = useSWR(user?.company
    ? `/companies/${user.company}`
    : null,
    apiFetcher  
    
  );
  console.log("Company data:", company)


  if (isLoading) {
  return <p>Loading company...</p>;
}

if (error) {
  return <p>Failed to load company.</p>;
}


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <CompanyHeader />

      <div className="space-y-8">
        <InviteUserSection />

       {company && <CompanyStats company={company} />}
      {company && <CompanyContactInfo company={company} />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OrganizationProfile />
        </div>

        {company && <CompanyGoals company={company} />}

        {/* <CompanyGoals /> */}
      </div>
    </div>
  );
}
