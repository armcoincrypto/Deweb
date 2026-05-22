"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

export default function PricingRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/marketplace");
  }, [router]);
  return null;
}
