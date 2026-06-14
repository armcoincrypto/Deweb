"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";
import { gsap, registerGsap } from "@/lib/gsap-client";

const EcosystemScene = dynamic(
  () => import("./scenes/EcosystemScene").then((m) => ({ default: m.EcosystemScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-hero-mesh" aria-hidden="true" /> }
);

export function CinematicHero() {
  const t = useTranslations("home");
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !heroRef.current || !sceneRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.to(sceneRef.current, {
        y: 80,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="cinematic-hero perspective-3d relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
      style={{ perspective: PERSPECTIVE }}
      aria-label={t("taglineAria")}
    >
      <div ref={sceneRef} className="preserve-3d absolute inset-0">
        <div className="absolute inset-0 opacity-70 sm:opacity-85 lg:opacity-100">
          <EcosystemScene variant="full" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-deweb-bg/30 via-deweb-bg/65 to-deweb-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,transparent,rgba(5,7,10,0.75))]" />

      <div className="container-narrow relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={heroReveal3D}
          transition={transition3D}
          style={motion3DStyle}
          className="preserve-3d mx-auto max-w-4xl text-center"
        >
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient-cyan">{t("seoH1")}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
            {t("subtitle")}
          </p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton
              href="#contact"
              variant="primary"
              className="!px-8 !py-4 !text-base"
              trackCta={{
                eventType: "contact_click",
                placement: "hero",
                label: t("ctaPrimary"),
              }}
            >
              {t("ctaPrimary")}
            </GlowButton>
            <GlowButton
              href="/services"
              variant="secondary"
              className="!px-8 !py-4 !text-base"
              trackCta={{
                eventType: "cta_click",
                placement: "hero",
                label: t("ctaSecondary"),
              }}
            >
              {t("ctaSecondary")}
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>

      {!reduceMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
            <div className="h-8 w-5 rounded-full border border-white/20 p-1">
              <motion.div
                className="mx-auto h-1.5 w-1 rounded-full bg-deweb-cyan"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
