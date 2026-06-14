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
  benefits: string[];
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
  benefits,
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
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <CinematicSection id={id} className="section-padding">
      <div className="container-narrow relative px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            ref={contentRef}
            className={cn("relative z-10", reverse && "lg:order-2")}
          >
            <div className="content-panel rounded-2xl p-7 sm:p-9">
              <span
                className="inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ borderColor: `${accent}44`, color: accent, background: `${accent}12` }}
              >
                {kicker}
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                {description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/75">
                    <span className="mt-0.5 font-bold" style={{ color: accent }}>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <GlowButton href={href} variant="primary">
                  {ctaLabel}
                </GlowButton>
                <GlowButton href="#contact" variant="secondary">
                  Contact Us
                </GlowButton>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "relative hidden min-h-[320px] lg:block",
              reverse && "lg:order-1"
            )}
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <Scene />
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
