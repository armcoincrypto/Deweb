"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
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
      "block rounded-lg px-3 py-3 font-medium transition-all hover:bg-white/5",
      active ? "text-deweb-cyan" : "text-white/80"
    );
  }

  return cn(
    "relative rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/[0.04] hover:text-deweb-cyan",
    active
      ? isPrimary
        ? "text-deweb-cyan after:absolute after:-bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-deweb-cyan after:shadow-[0_0_10px_rgba(0,242,255,0.55)]"
        : "text-deweb-cyan"
      : "text-white/65"
  );
}

export function PlatformNavbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { user, loading, displayName, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

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
      id="site-navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 lg:px-8"
    >
      <div
        className={cn(
          "container-narrow mx-auto flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:gap-4 sm:px-6 sm:py-3",
          scrolled
            ? "border-white/[0.08] bg-deweb-bg/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            : "border-white/[0.04] bg-white/[0.02] backdrop-blur-xl"
        )}
        style={{
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset"
            : "0 0 0 1px rgba(255,255,255,0.03) inset",
        }}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2 sm:gap-2.5">
          <BrandLogo size={32} priority className="transition-transform group-hover:scale-105 sm:h-9 sm:w-9" />
          <span className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-deweb-cyan sm:text-lg lg:text-xl">
            DEWEB
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
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
                  className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-300 transition-colors hover:bg-amber-400/20"
                >
                  {t("admin")}
                </Link>
              )}
              <Link
                href="/account"
                className="flex items-center gap-2 rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-2 text-sm font-bold text-deweb-cyan transition-all hover:bg-deweb-cyan/20"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-deweb-cyan text-xs font-black text-deweb-bg">
                  {displayName[0]?.toUpperCase() || "U"}
                </span>
                {displayName}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-2 text-xs text-white/45 transition-colors hover:text-white"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/account/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-white/75 transition-colors hover:bg-white/5 hover:text-white"
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
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-lg transition-colors hover:border-deweb-cyan/30 hover:bg-white/5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-narrow mx-auto mt-2 max-h-[calc(100dvh-var(--navbar-offset)-1rem)] overflow-y-auto rounded-2xl border border-white/10 bg-deweb-bg/95 p-4 backdrop-blur-2xl md:hidden"
        >
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
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
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
        </motion.div>
      )}
    </motion.header>
  );
}
