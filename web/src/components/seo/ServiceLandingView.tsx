"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";
import type { ServiceLandingPage } from "@/lib/service-landing/types";
import { ServiceConversionBlocks } from "@/components/conversion/ServiceConversionBlocks";
import { getServiceOffer } from "@/lib/conversion-data";
import type { BreadcrumbItem } from "@/lib/schema";

type ServiceLandingViewProps = {
  page: ServiceLandingPage;
  breadcrumbs: BreadcrumbItem[];
};

export function ServiceLandingView({ page, breadcrumbs }: ServiceLandingViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const offer = getServiceOffer(page.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <HeroBackground />
        <div
          className="perspective-3d container-narrow relative z-10 px-4 pb-16 pt-[var(--navbar-offset)] sm:px-6 lg:px-8 lg:pb-20 lg:pt-32"
          style={{ perspective: PERSPECTIVE }}
        >
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            variants={heroReveal3D}
            transition={transition3D}
            style={motion3DStyle}
            className="preserve-3d"
          >
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.path} className="transition-colors hover:text-deweb-cyan">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deweb-cyan">
            {page.heroBadge}
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {page.subtitle}
          </p>

          {(offer || page.priceRange) && (
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {offer && (
                <span className="rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-2 font-semibold text-deweb-cyan">
                  {offer.startingPrice}
                </span>
              )}
              {(offer?.timeline || page.priceRange) && (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
                  {offer ? `Timeline: ${offer.timeline}` : `Typical investment: ${page.priceRange}`}
                </span>
              )}
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <GlowButton href={page.cta.primaryHref} variant="primary">
              {page.cta.primaryLabel}
            </GlowButton>
            {page.cta.secondaryHref && page.cta.secondaryLabel && (
              <GlowButton href={page.cta.secondaryHref} variant="ghost">
                {page.cta.secondaryLabel}
              </GlowButton>
            )}
          </div>
          </motion.div>
        </div>
      </section>

      {/* Intro + content sections */}
      <div className="container-narrow px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {page.intro.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-white/65">
              {paragraph}
            </p>
          ))}
        </div>

        {offer && <ServiceConversionBlocks offer={offer} />}

        <div className="mx-auto mt-16 max-w-3xl space-y-14">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{section.title}</h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-white/60">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Benefits */}
        <section className="mt-20" aria-labelledby="benefits-heading">
          <div className="text-center">
            <h2 id="benefits-heading" className="text-3xl font-bold text-white">
              Why Choose DEWEB
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/50">
              Verified experts, transparent delivery and results that scale with your business.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.benefits.map((benefit, i) => (
              <GlassCard
                key={benefit.title}
                tilt
                delay={i * 0.06}
                className="group"
              >
                <div className="p-6 transition-colors hover:border-deweb-cyan/30">
                <span className="text-3xl" aria-hidden="true">
                  {benefit.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-deweb-cyan">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{benefit.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-20" aria-labelledby="process-heading">
          <div className="text-center">
            <h2 id="process-heading" className="text-3xl font-bold text-white">
              Our Process
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/50">
              A proven delivery framework from discovery to launch and beyond.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {page.process.map((step) => (
              <div key={step.step} className="relative text-center md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-deweb-cyan/40 bg-deweb-cyan/10 text-lg font-bold text-deweb-cyan md:mx-0">
                  {step.step}
                </div>
                <h3 className="mt-4 font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {page.faqs.map((faq, i) => (
              <GlassCard key={faq.question} className="overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  <span className="shrink-0 text-xl text-deweb-cyan" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="border-t border-white/[0.06] px-6 pb-6 pt-4 text-sm leading-relaxed text-white/60">
                    {faq.answer}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Related services — internal links */}
        <section className="mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-center text-3xl font-bold text-white">
            Related Services
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.relatedServices.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="group block">
                <GlassCard className="h-full p-6 transition-all hover:border-deweb-cyan/40 hover:shadow-glow-sm">
                  <h3 className="font-bold text-white group-hover:text-deweb-cyan">{svc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{svc.description}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-deweb-cyan">
                    Learn more →
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-20 overflow-hidden rounded-2xl border border-deweb-cyan/25 bg-gradient-to-br from-deweb-cyan/15 via-[#0a1628] to-purple-900/20 p-8 text-center sm:p-14">
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
        </section>
      </div>
    </>
  );
}
