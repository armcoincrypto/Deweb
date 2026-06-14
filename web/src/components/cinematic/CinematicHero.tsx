"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlowButton } from "@/components/ui/GlowButton";
import { EcosystemScene } from "./scenes/EcosystemScene";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";
import { gsap, registerGsap } from "@/lib/gsap-client";

export function CinematicHero() {
  const t = useTranslations("home");
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion || !heroRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="cinematic-hero perspective-3d relative flex min-h-screen items-center overflow-hidden pt-24"
      style={{ perspective: PERSPECTIVE }}
      aria-label={t("taglineAria")}
    >
      <EcosystemScene />

      <div className="container-narrow relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={heroReveal3D}
          transition={transition3D}
          style={motion3DStyle}
          className="preserve-3d mx-auto max-w-4xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan backdrop-blur-md"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-deweb-cyan shadow-[0_0_8px_#00f2ff]" />
            {t("badge")}
          </motion.span>

          <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient-cyan">{t("seoH1")}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55 sm:text-xl">
            {t("subtitle")}
          </p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24, rotateX: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={motion3DStyle}
            className="preserve-3d mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton href="#contact" variant="primary">
              {t("ctaPrimary")}
            </GlowButton>
            <GlowButton href="/services" variant="secondary">
              {t("ctaSecondary")}
            </GlowButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/40"
          >
            <span>
              <span className="font-bold text-white">150+</span> projects delivered
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>
              <span className="font-bold text-emerald-400">98%</span> client satisfaction
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Shopify · AI · SaaS · Automation</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
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
    </section>
  );
}
