"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

type DashboardOverviewProps = { role: "customer" | "supplier" };

export function DashboardOverview({ role }: DashboardOverviewProps) {
  const t = useTranslations("dashboard");

  const customerStats = [
    { label: t("activeProjects"), value: "—", href: "/dashboard/customer/projects" },
    { label: t("pendingOffers"), value: "—", href: "/dashboard/customer/offers" },
  ];

  const supplierStats = [
    { label: t("activeProposals"), value: "—", href: "/dashboard/supplier/proposals" },
    { label: t("orders"), value: "—", href: "/dashboard/supplier/orders" },
    { label: t("revenue"), value: "—", href: "/account/proposals" },
  ];

  const stats = role === "supplier" ? supplierStats : customerStats;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("welcome")}</h1>
          <p className="mt-1 text-white/50">
            {role === "customer"
              ? "Post projects and compare supplier offers."
              : "Manage products, proposals, and active orders."}
          </p>
        </div>
        {role === "customer" && (
          <GlowButton href="/signup" variant="primary">
            {t("postProject")}
          </GlowButton>
        )}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <GlassCard className="p-6 transition-all hover:border-deweb-cyan/30">
              <p className="text-sm text-white/45">{s.label}</p>
              <p className="mt-2 text-3xl font-bold text-deweb-cyan">{s.value}</p>
            </GlassCard>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="font-bold text-white">
            {role === "customer" ? "Recent offers" : "Recent proposals"}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            {role === "customer"
              ? "No offers to display yet. Post a project brief to start receiving scoped proposals from specialists."
              : "No proposals to display yet. Publish a service offer or respond to open client briefs on DEWEB Marketplace."}
          </p>
          <Link
            href={role === "customer" ? "/marketplace" : "/account/submit-offer"}
            className="mt-4 inline-block text-sm font-bold text-deweb-cyan hover:underline"
          >
            {role === "customer" ? "Post a project →" : "Submit an offer →"}
          </Link>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-bold text-white">{t("notifications")}</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Notifications appear here when bids, milestones, or messages are available in your account.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
