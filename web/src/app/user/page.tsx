import UserInfo from "@/components/user/UserInfo";

export default function UserProfilePage() {
  return (
    <div className="p-6 sm:p-10 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          User Profile
        </h1>
        <p className="text-foreground/50 text-sm mt-2 font-medium">
          View and edit your personal information and account preferences.
        </p>
      </div>

      <UserInfo />
    </div>
  );
}
