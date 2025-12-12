"use client"; //Only for NextJS App Router
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hanko } from "@teamhanko/hanko-elements";
import Button from "../core/Button";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL || "";

export default function HankoLogout() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const logout = async () => {
    try {
      const hanko = new Hanko(hankoApi);
      setLoading(true);
      await hanko?.logout();
      // router.push("/");
      router.refresh();
      return;
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={logout} isLoading={loading} variant="danger">
      Log Out
    </Button>
  );
}
