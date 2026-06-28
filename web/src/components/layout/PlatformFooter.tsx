"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SocialLinks } from "@/components/contact/SocialLinks";

export function PlatformFooter() {
  const tNav = useTranslations("nav");
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/[0.06] bg-black/50 py-14">
      <div className="container-narrow grid gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <BrandLogo size={36} />
            <span className="font-bold text-white">DEWEB</span>
          </div>
          <p className="mt-3 text-sm text-white/45">{t("tagline")}</p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">{t("platform")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/services" className="hover:text-deweb-cyan">{tNav("services")}</Link></li>
            <li><Link href="/marketplace" className="hover:text-deweb-cyan">{tNav("marketplace")}</Link></li>
            <li><Link href="/blog" className="hover:text-deweb-cyan">{tNav("blog")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">{t("solutions")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/services/shopify-development" className="hover:text-deweb-cyan">{t("shopifyDevelopment")}</Link></li>
            <li><Link href="/services/shopify-store-design" className="hover:text-deweb-cyan">{t("shopifyStoreDesign")}</Link></li>
            <li><Link href="/services/shopify-custom-apps" className="hover:text-deweb-cyan">{t("shopifyCustomApps")}</Link></li>
            <li><Link href="/services/ai-chatbot-development" className="hover:text-deweb-cyan">{t("aiChatbot")}</Link></li>
            <li><Link href="/services/ai-business-automation" className="hover:text-deweb-cyan">{t("aiAutomation")}</Link></li>
            <li><Link href="/services/telegram-bot-development" className="hover:text-deweb-cyan">{t("telegramBots")}</Link></li>
            <li><Link href="/services/web-application-development" className="hover:text-deweb-cyan">{t("webApps")}</Link></li>
            <li><Link href="/services/marketplace-development" className="hover:text-deweb-cyan">{t("marketplaceDev")}</Link></li>
            <li><Link href="/services/saas-development" className="hover:text-deweb-cyan">{t("saasDev")}</Link></li>
            <li><Link href="/services/landing-page-development" className="hover:text-deweb-cyan">{t("landingPageDev")}</Link></li>
            <li><Link href="/services/seo" className="hover:text-deweb-cyan">{t("seoServices")}</Link></li>
            <li><Link href="/services/mobile" className="hover:text-deweb-cyan">{t("mobileDev")}</Link></li>
            <li><Link href="/dedicated-development-team" className="hover:text-deweb-cyan">{t("dedicatedTeam")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">{t("company")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-deweb-cyan">{tNav("about")}</Link></li>
            <li><Link href="/contact" className="hover:text-deweb-cyan">{tNav("contact")}</Link></li>
            <li className="pt-0.5">
              <SocialLinks size="footer" />
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">{t("legal")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/privacy-policy" className="hover:text-deweb-cyan">{t("privacyPolicy")}</Link></li>
            <li><Link href="/cookie-policy" className="hover:text-deweb-cyan">{t("cookiePolicy")}</Link></li>
            <li><Link href="/terms" className="hover:text-deweb-cyan">{t("termsOfUse")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">{t("account")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link href="/account/login" className="hover:text-deweb-cyan">{tNav("login")}</Link></li>
            <li><Link href="/account/signup" className="hover:text-deweb-cyan">{tNav("signup")}</Link></li>
            <li><Link href="/account" className="hover:text-deweb-cyan">{tNav("dashboard")}</Link></li>
          </ul>
        </div>
      </div>
      <p className="container-narrow mt-10 border-t border-white/5 px-4 pt-8 text-center text-xs text-white/35 sm:px-6">
        {t("copyright", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
