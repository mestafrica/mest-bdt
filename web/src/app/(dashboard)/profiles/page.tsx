import ProfilesHeader from "@/components/profiles/ProfilesHeader";
import Profiles from "@/components/profiles/Profiles";

export default function ProfilesPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
      <div className="space-y-6">
        <ProfilesHeader />
        <Profiles />
      </div>
    </div>
  );
}
