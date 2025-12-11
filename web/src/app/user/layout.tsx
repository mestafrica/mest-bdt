import UserAccessChecker from "@/components/auth/UserAccessChecker";
import Navbar from "@/components/navigation/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MEST Africa - BDT User View",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UserAccessChecker>
        <Navbar />
        <div>{children}</div>
      </UserAccessChecker>
    </div>
  );
}
