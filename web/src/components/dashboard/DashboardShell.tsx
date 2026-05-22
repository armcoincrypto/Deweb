"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { dewebApi, getToken, type User } from "@/lib/api";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  role: "customer" | "supplier";
  children: React.ReactNode;
};

export function DashboardShell({ role, children }: DashboardShellProps) {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    dewebApi.auth
      .me()
      .then((d) => setUser(d.user))
      .catch(() => router.replace("/login"));
  }, [router]);

  const customerLinks = [
    { href: "/dashboard/customer", label: t("overview") },
    { href: "/dashboard/customer/projects", label: t("projects") },
    { href: "/dashboard/customer/offers", label: t("offers") },
    { href: "/dashboard/customer/messages", label: t("messages") },
    { href: "/dashboard/customer/payments", label: t("payments") },
  ];

  const supplierLinks = [
    { href: "/dashboard/supplier", label: t("overview") },
    { href: "/dashboard/supplier/products", label: t("products") },
    { href: "/dashboard/supplier/proposals", label: t("proposals") },
    { href: "/dashboard/supplier/orders", label: t("orders") },
    { href: "/dashboard/supplier/analytics", label: t("analytics") },
  ];

  const links = role === "supplier" ? supplierLinks : customerLinks;
  const legacyUrl =
    process.env.NEXT_PUBLIC_LEGACY_URL || "https://dewebam.com";

  return (
    <div className="min-h-screen pt-20 lg:flex">
      <aside className="w-full border-b border-white/10 bg-black/40 lg:w-64 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-5rem)]">
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-deweb-cyan">
            {role === "supplier" ? t("supplier") : t("customer")} {t("dashboard")}
          </p>
          <p className="mt-2 truncate text-sm font-semibold text-white">
            {user?.name || user?.email || "…"}
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                pathname === link.href
                  ? "bg-deweb-cyan/15 text-deweb-cyan"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`${legacyUrl}/account-dashboard.html`}
            className="whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold text-white/45 hover:text-deweb-cyan"
          >
            {t("legacyAccount")} →
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}
