"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function AuthLayout({
  children,
  active,
}: {
  children: React.ReactNode;
  active: "login" | "signup" | "forgot";
}) {
  const t = useTranslations("auth");

  const tabs = [
    { key: "login" as const, href: "/account/login", label: t("loginBtn") },
    { key: "signup" as const, href: "/account/signup", label: t("signupBtn") },
  ];

  return (
    <div className="min-h-[85vh] px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-deweb-cyan text-xl font-black text-deweb-bg shadow-glow-sm">
              D
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/45">{t("platformTagline")}</p>
        </div>

        {active !== "forgot" && (
          <div className="mb-6 flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                className={`flex-1 rounded-xl py-3 text-center text-sm font-bold transition-all ${
                  active === tab.key
                    ? "bg-deweb-cyan text-deweb-bg shadow-glow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        )}

        <div className="glass-panel-glow glow-border p-8 sm:p-10">{children}</div>
      </div>
    </div>
  );
}
