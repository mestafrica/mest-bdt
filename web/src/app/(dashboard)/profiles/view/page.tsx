"use client";
import ProfileHeader from "@/components/profiles/ProfileHeader";
import ProfileDetail from "@/components/profiles/ProfileDetail";
import { useSearchParams } from "next/navigation";

export default function ViewProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) return <div>Invalid Profile ID</div>;

  return (
    <div className="space-y-6">
      <ProfileHeader id={id} />
      <ProfileDetail id={id} />
    </div>
  );
}
