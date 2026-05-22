"use client";

import { useTranslations } from "next-intl";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardPlaceholder } from "@/components/dashboard/DashboardPlaceholder";

export default function Page() {
  const t = useTranslations("dashboard");
  return (
    <DashboardShell role="supplier">
      <DashboardPlaceholder title={t("orders")} />
    </DashboardShell>
  );
}
