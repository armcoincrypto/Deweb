"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";
import type { ServiceLandingPage } from "@/lib/service-landing/types";
import type { ServiceLandingTheme } from "@/lib/service-landing/visual-theme";
import type { ServiceHeroImage } from "@/lib/service-landing/hero-images";
import { isRemoteHeroImage } from "@/lib/service-landing/hero-images";
import type { ServiceOffer } from "@/lib/conversion-data";
import type { BreadcrumbItem } from "@/lib/schema";

type Props = {
  page: ServiceLandingPage;
  breadcrumbs: BreadcrumbItem[];
  theme: ServiceLandingTheme;
  heroImage: ServiceHeroImage;
  offer?: ServiceOffer;
};

function HeroVisual({
  heroImage,
  theme,
  variant,
}: {
  heroImage: ServiceHeroImage;
  theme: ServiceLandingTheme;
  variant: "desktop" | "mobile";
}) {
  const isReference = heroImage.layout === "split-reference";
  const isDesktop = variant === "desktop";

  return (
    <div
      className={
        isDesktop
          ? "relative hidden h-full min-h-[420px] overflow-hidden lg:block xl:min-h-[480px]"
          : "relative min-h-[240px] overflow-hidden sm:min-h-[280px] lg:hidden"
      }
    >
      <div
        className="absolute -inset-6 rounded-3xl blur-3xl opacity-60 lg:-inset-8"
        style={{ background: `radial-gradient(circle at 55% 45%, ${theme.glow}, transparent 68%)` }}
        aria-hidden="true"
      />

      <div
        className={
          isDesktop
            ? "relative h-full min-h-[inherit] overflow-hidden"
            : "relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/[0.08]"
        }
      >
        {isReference ? (
          <Image
            src={heroImage.src}
            alt=""
            fill
            priority={isDesktop}
            sizes={isDesktop ? "(max-width: 1280px) 58vw, 640px" : "100vw"}
            unoptimized={isRemoteHeroImage(heroImage.src)}
            className={
              isDesktop
                ? "object-cover object-[72%_center]"
                : "object-cover object-[65%_center] opacity-85"
            }
          />
        ) : (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority={isDesktop}
            sizes={isDesktop ? "(max-width: 1280px) 58vw, 640px" : "100vw"}
            unoptimized={isRemoteHeroImage(heroImage.src)}
            className={
              isDesktop
                ? "object-cover object-center"
                : "object-cover object-center opacity-70"
            }
          />
        )}

        <div
          className={
            isDesktop
              ? "absolute inset-0 bg-gradient-to-l from-transparent via-[#05070a]/15 to-[#05070a]/88"
              : "absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/55 to-[#05070a]/25"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/35 via-transparent to-[#05070a]/55" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 72% 42%, ${theme.glow}, transparent 62%)`,
          }}
        />
      </div>
    </div>
  );
}

export function ServiceLandingHero({ page, breadcrumbs, theme, heroImage, offer }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#05070a]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-hero-mesh opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 55% 45% at 78% 38%, ${theme.glow}, transparent 70%)`,
          }}
        />
      </div>

      <div className="container-narrow relative z-10 px-4 pb-14 pt-[var(--navbar-offset)] sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-32">
        <nav aria-label="Breadcrumb" className="text-sm text-white/55">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < breadcrumbs.length - 1 ? (
                  <Link href={crumb.path} className="transition-colors hover:text-deweb-cyan">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <span
          className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
          style={{
            borderColor: `${theme.accent}55`,
            color: theme.accent,
            background: `${theme.accent}18`,
          }}
        >
          {page.heroBadge}
        </span>

        <div className="mt-6 lg:mt-7 lg:grid lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:items-stretch lg:gap-8 xl:gap-10">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            variants={heroReveal3D}
            transition={transition3D}
            style={{ ...motion3DStyle, perspective: PERSPECTIVE }}
            className="preserve-3d relative z-10 max-w-xl lg:max-w-none lg:py-2"
          >
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06] xl:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">
              {page.subtitle}
            </p>

            {(offer || page.priceRange) && (
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {offer && (
                  <span
                    className="rounded-full border px-4 py-2 font-semibold"
                    style={{
                      borderColor: `${theme.accent}55`,
                      color: theme.accent,
                      background: `${theme.accent}12`,
                    }}
                  >
                    {offer.startingPrice}
                  </span>
                )}
                {(offer?.timeline || page.priceRange) && (
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-white/75">
                    {offer ? `Timeline: ${offer.timeline}` : `Typical investment: ${page.priceRange}`}
                  </span>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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

          <HeroVisual heroImage={heroImage} theme={theme} variant="desktop" />
        </div>

        <div className="mt-8 lg:hidden">
          <HeroVisual heroImage={heroImage} theme={theme} variant="mobile" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[44%] bg-gradient-to-r from-[#05070a] via-[#05070a]/92 to-transparent lg:block"
        aria-hidden="true"
      />
    </section>
  );
}
