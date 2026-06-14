"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { CinematicSection } from "./CinematicSection";
import { cn } from "@/lib/utils";

const ShopifyScene = dynamic(
  () => import("./scenes/ShopifyScene").then((m) => ({ default: m.ShopifyScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);
const AINeuralScene = dynamic(
  () => import("./scenes/AINeuralScene").then((m) => ({ default: m.AINeuralScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);
const AutomationScene = dynamic(
  () => import("./scenes/AutomationScene").then((m) => ({ default: m.AutomationScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);
const WebSaasScene = dynamic(
  () => import("./scenes/WebSaasScene").then((m) => ({ default: m.WebSaasScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh opacity-40" /> }
);

const sceneMap = {
  shopify: ShopifyScene,
  ai: AINeuralScene,
  automation: AutomationScene,
  web: WebSaasScene,
} as const;

type ServiceStorySectionProps = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  accent: string;
  sceneKey: keyof typeof sceneMap;
  reverse?: boolean;
};

export function ServiceStorySection({
  id,
  kicker,
  title,
  description,
  href,
  ctaLabel,
  accent,
  sceneKey,
  reverse = false,
}: ServiceStorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const Scene = sceneMap[sceneKey];

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: reverse ? 48 : -48, rotateY: reverse ? -10 : 10, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 78%" },
          }
        );
      }
      if (sceneWrapRef.current) {
        gsap.fromTo(
          sceneWrapRef.current,
          { opacity: 0, scale: 0.92, rotateX: 8 },
          {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: sceneWrapRef.current, start: "top 80%" },
          }
        );
        gsap.to(sceneWrapRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion, reverse]);

  return (
    <CinematicSection id={id} fullScreen depth={false} className="min-h-screen">
      <div ref={sectionRef} className="relative flex min-h-screen items-center py-16 lg:py-0">
        <div
          ref={sceneWrapRef}
          className={cn(
            "pointer-events-none absolute inset-0 overflow-hidden preserve-3d",
            reverse ? "lg:left-[42%]" : "lg:right-[42%]"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 z-10 bg-gradient-to-b from-deweb-bg/50 via-deweb-bg/70 to-deweb-bg lg:bg-gradient-to-r",
              reverse
                ? "lg:from-transparent lg:via-deweb-bg/40 lg:to-deweb-bg/90"
                : "lg:from-deweb-bg/90 lg:via-deweb-bg/40 lg:to-transparent"
            )}
          />
          <div className="absolute inset-0 opacity-80 lg:opacity-100">
            <Scene />
          </div>
        </div>

        <div className="container-narrow relative z-20 w-full px-4 sm:px-6 lg:px-8">
          <div
            ref={contentRef}
            className={cn(
              "preserve-3d perspective-3d max-w-lg",
              reverse ? "lg:ml-auto" : "lg:mr-auto"
            )}
          >
            <div className="hero-glass-panel glow-border rounded-2xl p-7 sm:p-9">
              <span
                className="inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ borderColor: `${accent}44`, color: accent, background: `${accent}12` }}
              >
                {kicker}
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                {description}
              </p>
              <div className="mt-8">
                <GlowButton href={href} variant="primary">
                  {ctaLabel}
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
