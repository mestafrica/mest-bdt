import CompanyInfo from "@/components/user/CompanyInfo";

export default function UserCompanyPage() {
  return (
    <div className="p-6 sm:p-10 min-h-screen">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Company Profile
        </h1>
        <p className="text-foreground/50 text-sm mt-2 font-medium">
          Manage your organization&apos;s details and core information.
        </p>
      </div>

      <CompanyInfo />
    </div>
  );
}
