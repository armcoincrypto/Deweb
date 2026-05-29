"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const PRIMARY_NAV = ["/", "/services", "/marketplace"] as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(pathname: string, href: string, mobile = false) {
  const active = isNavActive(pathname, href);
  const isPrimary = (PRIMARY_NAV as readonly string[]).includes(href);

  if (mobile) {
    return cn(
      "block py-3 font-medium transition-colors",
      active ? "text-deweb-cyan" : "text-white/80"
    );
  }

  return cn(
    "relative text-sm font-medium transition-colors",
    active
      ? isPrimary
        ? "text-deweb-cyan after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-deweb-cyan after:shadow-[0_0_10px_rgba(0,242,255,0.55)]"
        : "text-deweb-cyan"
      : "text-white/65 hover:text-deweb-cyan"
  );
}

export function PlatformNavbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { user, loading, displayName, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/marketplace", label: t("marketplace") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-deweb-bg/85 py-3 backdrop-blur-2xl"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-narrow flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <BrandLogo size={40} priority className="transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-deweb-cyan transition-colors">
            DEWEB
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClass(pathname, link.href)}
              aria-current={isNavActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          {!loading && user ? (
            <>
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-300"
                >
                  {t("admin")}
                </Link>
              )}
              <Link
                href="/account"
                className="flex items-center gap-2 rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-2 text-sm font-bold text-deweb-cyan"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-deweb-cyan text-xs font-black text-deweb-bg">
                  {displayName[0]?.toUpperCase() || "U"}
                </span>
                {displayName}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-2 text-xs text-white/45 hover:text-white"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/account/login"
                className="px-3 py-2 text-sm font-semibold text-white/75 hover:text-white"
              >
                {t("login")}
              </Link>
              <GlowButton href="/account/signup" variant="primary" className="!px-4 !py-2 !text-xs">
                {t("postProject")}
              </GlowButton>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-deweb-bg/95 px-4 py-4 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClass(pathname, link.href, true)}
              onClick={() => setMobileOpen(false)}
              aria-current={isNavActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <LanguageSwitcher />
            {user ? (
              <Link href="/account" className="text-center font-bold text-deweb-cyan">
                {displayName}
              </Link>
            ) : (
              <>
                <GlowButton href="/account/signup" variant="primary">
                  {t("postProject")}
                </GlowButton>
                <Link href="/account/login" className="text-center text-sm text-white/70">
                  {t("login")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.header>
  );
}
