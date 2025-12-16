import UserInfo from "@/components/user/UserInfo";

export default function UserProfilePage() {
  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-100 dark:bg-[#0b0c10] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">User Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          View and edit your personal information
        </p>
      </div>

      <UserInfo />
    </div>
  );
}
