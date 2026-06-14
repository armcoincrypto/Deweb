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
  { ssr: false }
);
const AINeuralScene = dynamic(
  () => import("./scenes/AINeuralScene").then((m) => ({ default: m.AINeuralScene })),
  { ssr: false }
);
const AutomationScene = dynamic(
  () => import("./scenes/AutomationScene").then((m) => ({ default: m.AutomationScene })),
  { ssr: false }
);
const WebSaasScene = dynamic(
  () => import("./scenes/WebSaasScene").then((m) => ({ default: m.WebSaasScene })),
  { ssr: false }
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
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const Scene = sceneMap[sceneKey];

  useEffect(() => {
    if (reduceMotion || !contentRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 32, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <CinematicSection
      id={id}
      fullScreen
      className="relative flex min-h-[88vh] items-center py-16 lg:py-20"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          reverse ? "lg:right-[35%]" : "lg:left-[35%]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 z-10 from-deweb-bg/40 via-deweb-bg/70 to-deweb-bg bg-gradient-to-b lg:bg-gradient-to-r",
            reverse ? "lg:from-transparent lg:via-deweb-bg/50 lg:to-deweb-bg/95" : "lg:from-deweb-bg/95 lg:via-deweb-bg/50 lg:to-transparent"
          )}
        />
        <div className="absolute inset-0 opacity-70 sm:opacity-85 lg:opacity-100">
          <Scene />
        </div>
      </div>

      <div className="container-narrow relative z-20 w-full px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className={cn(
            "max-w-lg",
            reverse ? "lg:ml-auto" : "lg:mr-auto"
          )}
        >
          <div className="hero-glass-panel rounded-2xl p-7 sm:p-9">
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
    </CinematicSection>
  );
}
