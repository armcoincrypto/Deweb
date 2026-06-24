"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/layout/PageHeader";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal3D } from "@/components/ui/ScrollReveal3D";
import { SiteFaqSection } from "@/components/conversion/SiteFaqSection";
import { TrustSignalsSection } from "@/components/conversion/TrustSignalsSection";
import { PRICING_NOTE, SERVICE_OFFERS } from "@/lib/conversion-data";

export function ContactView() {
  const t = useTranslations("contact");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="container-narrow px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Shopify", href: "/services/shopify-development" },
            { label: "AI Chatbots", href: "/services/ai-chatbot-development" },
            { label: "SaaS", href: "/services/saas-development" },
            { label: "Telegram Bots", href: "/services/telegram-bot-development" },
            { label: "Automation", href: "/services/ai-business-automation" },
            { label: "Web Apps", href: "/services/web-application-development" },
            { label: "Landing Pages", href: "/services/landing-page-development" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:border-deweb-cyan/40 hover:text-deweb-cyan"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_OFFERS.map((offer) => (
            <div key={offer.slug} className="content-panel rounded-xl p-4 text-center sm:text-left">
              <p className="text-sm font-bold text-white">{offer.title}</p>
              <p className="mt-1 text-sm font-semibold text-deweb-cyan">{offer.startingPrice}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-white/45">{PRICING_NOTE}</p>
      </section>

      <div className="container-narrow px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-white/45">
          {t("followUs")}
        </p>
        <SocialLinks size="lg" className="mt-8" />

        <ScrollReveal3D depth="panel" className="mx-auto mt-14 max-w-2xl">
          <div className="glass-panel-glow p-6 sm:p-8">
            <ContactForm className="space-y-4" />
          </div>
        </ScrollReveal3D>

        <TrustSignalsSection className="mt-16" />
        <SiteFaqSection className="mt-16" />
      </div>
    </>
  );
}
