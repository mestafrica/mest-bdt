"use client";
import ProfileHeader from "@/components/profiles/ProfileHeader";
import ProfileDetail from "@/components/profiles/ProfileDetail";
import { useSearchParams } from "next/navigation";

export default function ViewProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) return <div>Invalid Profile ID</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ProfileHeader id={id} />
      <ProfileDetail id={id} />
    </div>
  );
}
