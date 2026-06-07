"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

type DashboardOverviewProps = { role: "customer" | "supplier" };

export function DashboardOverview({ role }: DashboardOverviewProps) {
  const t = useTranslations("dashboard");

  const customerStats = [
    { label: t("activeProjects"), value: "3", href: "/dashboard/customer/projects" },
    { label: t("pendingOffers"), value: "12", href: "/dashboard/customer/offers" },
  ];

  const supplierStats = [
    { label: t("activeProposals"), value: "7", href: "/dashboard/supplier/proposals" },
    { label: t("orders"), value: "5", href: "/dashboard/supplier/orders" },
    { label: t("revenue"), value: "By inquiry", href: "/account/proposals" },
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
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Nexus Labs — E-commerce API</span>
              <span className="font-bold text-deweb-cyan">$7,200</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>CloudForge — CRM Dashboard</span>
              <span className="font-bold text-deweb-cyan">$4,100</span>
            </li>
            <li className="flex justify-between">
              <span>PixelStack — Mobile UI</span>
              <span className="font-bold text-deweb-cyan">$5,800</span>
            </li>
          </ul>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-bold text-white">{t("notifications")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>New bid received on Custom AI CRM</li>
            <li>Milestone approved — Web App Phase 2</li>
            <li>Supplier message from DevMint</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
