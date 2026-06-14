"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { CinematicSection } from "./CinematicSection";
import { cn } from "@/lib/utils";

type ServiceStorySectionProps = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  ctaLabel: string;
  accent: string;
  scene: React.ReactNode;
  reverse?: boolean;
};

export function ServiceStorySection({
  id,
  kicker,
  title,
  description,
  features,
  href,
  ctaLabel,
  accent,
  scene,
  reverse = false,
}: ServiceStorySectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    registerGsap();

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: reverse ? 60 : -60, rotateY: reverse ? -10 : 10 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
            },
          }
        );
      }
      if (sceneRef.current) {
        gsap.fromTo(
          sceneRef.current,
          { opacity: 0, scale: 0.9, rotateX: 12 },
          {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sceneRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [reduceMotion, reverse]);

  return (
    <CinematicSection id={id} className="flex items-center py-20 lg:py-0">
      <div className="absolute inset-0 opacity-40 lg:opacity-100">{scene}</div>

      <div className="container-narrow relative z-10 grid min-h-[80vh] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div
          ref={contentRef}
          className={cn(
            "preserve-3d perspective-3d relative z-20",
            reverse && "lg:order-2"
          )}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em]"
            style={{ borderColor: `${accent}44`, color: accent, background: `${accent}12` }}
          >
            {kicker}
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/55">{description}</p>
          <ul className="mt-8 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs"
                  style={{ background: `${accent}22`, color: accent }}
                >
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <GlowButton href={href} variant="primary">
              {ctaLabel}
            </GlowButton>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-white/60 transition-colors hover:text-deweb-cyan"
            >
              Start a project →
            </Link>
          </div>
        </div>

        <div
          ref={sceneRef}
          className={cn(
            "preserve-3d perspective-3d relative hidden min-h-[400px] lg:block",
            reverse && "lg:order-1"
          )}
        >
          <div className="absolute inset-0">{scene}</div>
        </div>
      </div>
    </CinematicSection>
  );
}
