import type { Metadata } from "next";
import Sidebar from "@/components/navigation/Sidebar";
import AccessChecker from "@/components/auth/AccessChecker";

export const metadata: Metadata = {
  title: "MEST Africa - BDT Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <AccessChecker>
        <Sidebar />
        <main className="grow p-8 h-dvh overflow-y-scroll">{children}</main>
      </AccessChecker>
    </div>
  );
}
