"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SocialLinks } from "@/components/contact/SocialLinks";

export function PlatformFooter() {
  const t = useTranslations("nav");

  return (
    <footer className="border-t border-white/[0.06] bg-black/50 py-14">
      <div className="container-narrow grid gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <BrandLogo size={36} />
            <span className="font-bold text-white">DEWEB</span>
          </div>
          <p className="mt-3 text-sm text-white/45">
            Suppliers compete. Customers win. Global IT marketplace.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Platform</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/services" className="hover:text-deweb-cyan">{t("services")}</Link></li>
            <li><Link href="/marketplace" className="hover:text-deweb-cyan">{t("marketplace")}</Link></li>
            <li><Link href="/blog" className="hover:text-deweb-cyan">{t("blog")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-deweb-cyan">{t("about")}</Link></li>
            <li><Link href="/contact" className="hover:text-deweb-cyan">{t("contact")}</Link></li>
          </ul>
          <SocialLinks size="sm" className="mt-4 justify-start" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Account</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/account/login" className="hover:text-deweb-cyan">{t("login")}</Link></li>
            <li><Link href="/account/signup" className="hover:text-deweb-cyan">{t("signup")}</Link></li>
            <li><Link href="/account" className="hover:text-deweb-cyan">{t("dashboard")}</Link></li>
          </ul>
        </div>
      </div>
      <p className="container-narrow mt-10 border-t border-white/5 px-4 pt-8 text-center text-xs text-white/35 sm:px-6">
        © {new Date().getFullYear()} DEWEB — IT marketplace & competitive bidding
      </p>
    </footer>
  );
}
