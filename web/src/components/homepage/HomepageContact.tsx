"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { SiteFaqSection } from "@/components/conversion/SiteFaqSection";
import { AnimatedCTA } from "@/components/premium/AnimatedCTA";
import { ScrollReveal, StaggerContainer, AnimatedCard } from "@/components/animations";
import { PRICING_NOTE, SERVICE_OFFERS } from "@/lib/conversion-data";

export function HomepageContact() {
  const t = useTranslations("home");

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(0,242,255,0.08),transparent)]" />
      <div className="container-narrow relative px-4 sm:px-6 lg:px-8">
        <AnimatedCTA
          title={t("ctaFinalTitle")}
          subtitle={t("ctaFinalSubtitle")}
          primaryLabel={t("consultCta")}
          primaryHref="#contact-form"
          secondaryLabel={t("viewServicesCta")}
          secondaryHref="#services"
          className="mb-16"
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {SERVICE_OFFERS.map((offer) => (
            <AnimatedCard key={offer.slug} inherit className="content-panel rounded-xl p-4">
              <p className="text-sm font-bold text-white">{offer.title}</p>
              <p className="mt-1 text-sm font-semibold text-deweb-cyan">{offer.startingPrice}</p>
              <p className="mt-1 text-xs text-white/50">{offer.timeline}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
        <p className="mt-4 text-center text-xs text-white/45">{PRICING_NOTE}</p>

        <div id="contact-form" className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal variant="scale" className="hero-glass-panel rounded-2xl p-7 sm:p-9">
            <h3 className="text-xl font-bold text-white sm:text-2xl">{t("contactFormTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
              {t("contactFormSubtitle")}
            </p>
            <ContactForm className="mt-6 space-y-4" compact />
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.08} className="space-y-6">
            <div className="content-panel rounded-2xl p-7">
              <h3 className="text-lg font-bold text-white">{t("contactBenefitsTitle")}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> {t("contactBenefit1")}
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> {t("contactBenefit2")}
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> {t("contactBenefit3")}
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> {t("contactBenefit4")}
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">{t("followUs")}</p>
              <SocialLinks size="lg" className="mt-3 justify-start" />
            </div>
          </ScrollReveal>
        </div>

        <SiteFaqSection className="mt-16" limit={5} />
      </div>
    </section>
  );
}
