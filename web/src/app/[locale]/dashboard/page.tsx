"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

export default function DashboardRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/account");
  }, [router]);
  return null;
}
