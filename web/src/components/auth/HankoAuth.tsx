"use client";
import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL || "";

export default function HankoAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectAfterLogin = useCallback(() => {
    // change this to the page you wish to be redirected to
    router.replace(searchParams.get("redirect") || "/");
  }, [router, searchParams]);

  useEffect(() => {
    const hanko = new Hanko(hankoApi);
    hanko?.onSessionCreated(() => {
      // successfully logged in
      redirectAfterLogin();
    });
  }, [redirectAfterLogin]);

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
      console.log(error);
    });
  }, []);

  return <hanko-auth />;
}
