"use client";

import { useTranslations } from "next-intl";

export function DashboardPlaceholder({ title }: { title: string }) {
  const t = useTranslations("dashboard");
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="mt-4 text-white/50">
        Full {title.toLowerCase()} management — connect to API in next sprint. Use{" "}
        <a
          href={`${process.env.NEXT_PUBLIC_LEGACY_URL || "https://dewebam.com"}/account-dashboard.html`}
          className="text-deweb-cyan hover:underline"
        >
          {t("legacyAccount")}
        </a>{" "}
        for wallet and profile today.
      </p>
    </div>
  );
}
