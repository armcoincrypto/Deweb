"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { ServiceLandingHero } from "@/components/seo/ServiceLandingHero";
import { ScrollReveal } from "@/components/animations";
import { GlowButton } from "@/components/ui/GlowButton";
import { FaqAccordion } from "@/components/premium/FaqAccordion";
import { SpotlightCard } from "@/components/premium/SpotlightCard";
import type { ServiceLandingPage } from "@/lib/service-landing/types";
import type { ResolvedRelatedGuide } from "@/lib/service-landing/resolve-related-guides";
import { getServiceLandingTheme } from "@/lib/service-landing/visual-theme";
import { getServiceHeroImage } from "@/lib/service-landing/hero-images";
import { ServiceConversionBlocks } from "@/components/conversion/ServiceConversionBlocks";
import { getServiceOffer } from "@/lib/conversion-data";
import { getServiceCanonicalPath } from "@/lib/seo";
import type { BreadcrumbItem } from "@/lib/schema";

type ServiceLandingViewProps = {
  page: ServiceLandingPage;
  breadcrumbs: BreadcrumbItem[];
  relatedGuides?: ResolvedRelatedGuide[];
  relatedGuidesCopy?: {
    title: string;
    intro: string;
    readGuide: string;
  };
};

function SectionNumber({ index, accent }: { index: number; accent: string }) {
  return (
    <span
      className="select-none text-5xl font-black leading-none tracking-tighter sm:text-6xl"
      style={{ color: `${accent}22` }}
      aria-hidden="true"
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

export function ServiceLandingView({
  page,
  breadcrumbs,
  relatedGuides = [],
  relatedGuidesCopy,
}: ServiceLandingViewProps) {
  const [activeSection, setActiveSection] = useState(0);
  const offer = getServiceOffer(page.slug);
  const theme = getServiceLandingTheme(page.slug);
  const heroImage = getServiceHeroImage(page.slug);

  useEffect(() => {
    const headings = page.sections.map((_, i) => document.getElementById(`service-section-${i}`));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          const idx = Number(visible.target.id.replace("service-section-", ""));
          if (!Number.isNaN(idx)) setActiveSection(idx);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    headings.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [page.sections]);

  return (
    <>
      <ServiceLandingHero
        page={page}
        breadcrumbs={breadcrumbs}
        theme={theme}
        heroImage={heroImage}
        offer={offer}
      />

      <div className="container-narrow px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Intro */}
        <ScrollReveal>
          <div className="border-l-4" style={{ borderLeftColor: theme.accent }}>
            <SpotlightCard className="p-8 sm:p-10 lg:p-12">
              <div className="mx-auto max-w-3xl space-y-6">
                {page.intro.map((paragraph, i) => (
                  <p key={i} className="text-lg leading-relaxed text-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>

        {offer && <ServiceConversionBlocks offer={offer} accent={theme.accent} />}

        {/* Content sections + sticky TOC */}
        <div className="mt-20 lg:mt-24">
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[260px_minmax(0,1fr)]">
            {page.sections.length > 2 && (
              <aside className="mb-10 hidden lg:block">
                <div className="sticky top-[calc(var(--navbar-offset)+1.5rem)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    On this page
                  </p>
                  <nav aria-label="Page sections" className="mt-4 space-y-1">
                    {page.sections.map((section, i) => (
                      <a
                        key={section.title}
                        href={`#service-section-${i}`}
                        className={`block rounded-lg border-l-2 py-2 pl-3 pr-2 text-sm transition-colors ${
                          activeSection === i
                            ? "border-deweb-cyan bg-deweb-cyan/5 font-semibold text-deweb-cyan"
                            : "border-transparent text-white/45 hover:border-white/20 hover:text-white/75"
                        }`}
                        style={activeSection === i ? { borderLeftColor: theme.accent } : undefined}
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            <div className="min-w-0 space-y-10 lg:space-y-12">
              {page.sections.map((section, i) => (
                <ScrollReveal key={section.title} id={`service-section-${i}`}>
                  <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-[#0a121c]/80 to-[#060a10]/90 p-8 sm:p-10">
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity group-hover:opacity-100"
                      style={{ background: theme.glow, opacity: 0.35 }}
                    />
                    <div className="relative flex flex-wrap items-start gap-4 sm:gap-6">
                      <SectionNumber index={i} accent={theme.accent} />
                      <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">{section.title}</h2>
                        <div className="mt-5 space-y-4">
                          {section.paragraphs.map((p, pi) => (
                            <p key={pi} className="leading-relaxed text-white/62">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <section className="mt-24" aria-labelledby="benefits-heading">
          <ScrollReveal className="text-center">
            <h2 id="benefits-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Why Choose DEWEB
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/50">
              Verified experts, transparent delivery and results that scale with your business.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.benefits.map((benefit, i) => (
              <ScrollReveal key={benefit.title} delay={i * 0.05}>
                <SpotlightCard className="group h-full transition-shadow hover:shadow-glow-sm">
                  <div className="flex h-full flex-col p-6 sm:p-7">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl border text-2xl"
                      style={{
                        borderColor: `${theme.accent}33`,
                        background: `${theme.accent}10`,
                      }}
                      aria-hidden="true"
                    >
                      {benefit.icon}
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-white transition-colors group-hover:text-deweb-cyan">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                      {benefit.description}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-24" aria-labelledby="process-heading">
          <ScrollReveal className="text-center">
            <h2 id="process-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Our Process
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/50">
              A proven delivery framework from discovery to launch and beyond.
            </p>
          </ScrollReveal>
          <div className="relative mt-14">
            <div
              className="absolute left-0 right-0 top-6 hidden h-px lg:block"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.accent}66, transparent)`,
              }}
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {page.process.map((step) => (
                <ScrollReveal key={step.step} delay={step.step * 0.05}>
                  <div className="relative text-center lg:text-left">
                    <div
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold lg:mx-0"
                      style={{
                        borderColor: `${theme.accent}55`,
                        background: `${theme.accent}12`,
                        color: theme.accent,
                      }}
                    >
                      {step.step}
                    </div>
                    <h3 className="mt-4 font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related guides */}
        {relatedGuides.length > 0 && relatedGuidesCopy && (
          <section className="mt-24" aria-labelledby="related-guides-heading">
            <ScrollReveal className="text-center">
              <h2 id="related-guides-heading" className="text-3xl font-bold text-white sm:text-4xl">
                {relatedGuidesCopy.title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-white/50">{relatedGuidesCopy.intro}</p>
            </ScrollReveal>
            <ul className="mx-auto mt-10 grid max-w-4xl gap-4">
              {relatedGuides.map((guide, i) => (
                <li key={guide.href}>
                  <Link href={guide.href} className="group block">
                    <SpotlightCard className="p-5 transition-all hover:border-deweb-cyan/40 sm:p-6">
                      <div className="flex items-start gap-4">
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                          style={{
                            background: `${theme.accent}15`,
                            color: theme.accent,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="font-semibold text-white group-hover:text-deweb-cyan">
                            {guide.label}
                          </span>
                          <span className="mt-2 block text-sm font-semibold text-deweb-cyan">
                            {relatedGuidesCopy.readGuide} →
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        <div className="mt-24">
          <FaqAccordion
            items={page.faqs}
            title="Frequently Asked Questions"
            className="mx-auto max-w-3xl"
          />
        </div>

        {/* Related services */}
        <section className="mt-24" aria-labelledby="related-heading">
          <ScrollReveal className="text-center">
            <h2 id="related-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Related Services
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.relatedServices.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 0.04}>
                <Link href={getServiceCanonicalPath(svc.slug)} className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col p-6 transition-all hover:border-deweb-cyan/40 hover:shadow-glow-sm">
                    <h3 className="font-bold text-white group-hover:text-deweb-cyan">{svc.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                      {svc.description}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-deweb-cyan">
                      Learn more →
                    </span>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Marketplace hire */}
        {page.marketplaceHire && (
          <section className="mt-24" aria-labelledby="marketplace-hire-heading">
            <ScrollReveal>
              <SpotlightCard className="mx-auto max-w-3xl p-8 text-center sm:p-12">
                <h2 id="marketplace-hire-heading" className="text-2xl font-bold text-white sm:text-3xl">
                  {page.marketplaceHire.label}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/60">
                  {page.marketplaceHire.description}
                </p>
                <div className="mt-8">
                  <GlowButton href={page.marketplaceHire.href} variant="secondary">
                    {page.marketplaceHire.label} →
                  </GlowButton>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </section>
        )}

        {/* Contact CTA */}
        <section className="relative mt-24 overflow-hidden rounded-2xl border border-deweb-cyan/25 p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${theme.glow}, transparent 55%), linear-gradient(135deg, rgba(0,242,255,0.12) 0%, #0a1628 45%, rgba(124,58,237,0.15) 100%)`,
            }}
          />
          <ScrollReveal className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">{page.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">{page.cta.description}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowButton href={page.cta.primaryHref} variant="primary">
                {page.cta.primaryLabel}
              </GlowButton>
              {page.cta.secondaryLabel && page.cta.secondaryHref && (
                <GlowButton href={page.cta.secondaryHref} variant="ghost">
                  {page.cta.secondaryLabel}
                </GlowButton>
              )}
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
