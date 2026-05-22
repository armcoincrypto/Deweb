"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

export default function LoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/account/login");
  }, [router]);
  return null;
}
