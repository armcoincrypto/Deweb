"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

export default function SignupRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/account/signup");
  }, [router]);
  return null;
}
