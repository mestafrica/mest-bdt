import CompanyInfo from "@/components/user/CompanyInfo";

export default function UserCompanyPage() {
  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-100 dark:bg-[#0b0c10] text-gray-900 dark:text-gray-100">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Company Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          View and edit your company information
        </p>
      </div>

      <CompanyInfo />
    </div>
  );
}
