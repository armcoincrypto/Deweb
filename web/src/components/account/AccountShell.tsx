"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export function AccountShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "customer" | "supplier";
}) {
  const t = useTranslations("account");
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout, displayName } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace("/account/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white/50">
        {t("loading")}
      </div>
    );
  }

  if (!user) return null;

  const customerLinks = [
    { href: "/account", label: t("overview") },
    { href: "/account/profile", label: t("profile") },
    { href: "/account/listings", label: t("myListings") },
    { href: "/account/submit-offer", label: "Submit Offer" },
    { href: "/account/messages", label: t("messages") },
  ];

  const supplierLinks = [
    { href: "/account", label: t("overview") },
    { href: "/account/profile", label: t("profile") },
    { href: "/account/listings", label: t("myListings") },
    { href: "/account/submit-offer", label: "Submit Offer" },
    { href: "/account/messages", label: t("messages") },
    { href: "/account/proposals", label: t("proposals") },
  ];

  const links = role === "supplier" ? supplierLinks : customerLinks;
  const isSeller = user.accountMode === "seller" || user.account_mode === "seller";

  return (
    <div className="min-h-screen pt-20 lg:flex">
      <aside className="w-full border-b border-white/10 bg-black/40 lg:w-72 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-5rem)]">
        <div className="border-b border-white/10 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-deweb-cyan">
            {t("welcome")}, {displayName}
          </p>
          <p className="mt-1 truncate text-sm text-white/45">{user.email}</p>
          <span className="mt-3 inline-block rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase text-white/50">
            {isSeller ? t("supplier") : t("customer")}
          </span>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold",
                pathname === link.href
                  ? "bg-deweb-cyan/15 text-deweb-cyan"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/account/login");
            }}
            className="w-full rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-white/60 hover:border-red-400/40 hover:text-red-400"
          >
            {t("logout")}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}
