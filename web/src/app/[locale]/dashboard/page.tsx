"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { dewebApi, getToken } from "@/lib/api";

export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    dewebApi.auth
      .me()
      .then((d) => {
        const mode = d.user?.accountMode || d.user?.account_mode;
        if (mode === "seller") router.replace("/dashboard/supplier");
        else router.replace("/dashboard/customer");
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-white/50">
      Loading…
    </div>
  );
}
