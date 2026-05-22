"use client";

import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardPlaceholder } from "@/components/dashboard/DashboardPlaceholder";

export default function Page() {
  const t = useTranslations("dashboard");
  return (
    <DashboardShell role="customer">
      <DashboardPlaceholder title={t("offers")} />
    </DashboardShell>
  );
}
