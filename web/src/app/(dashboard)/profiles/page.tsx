import ProfilesHeader from "@/components/profiles/ProfilesHeader";
import Profiles from "@/components/profiles/Profiles";

export default function ProfilesPage() {
  return (
    <div className="space-y-6">
      <ProfilesHeader />
      <Profiles />
    </div>
  );
}
