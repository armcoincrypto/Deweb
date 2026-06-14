"use client";

import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";
import { whyChooseItems } from "@/lib/portfolio-data";
import { motion, useReducedMotion } from "framer-motion";
import { cardReveal3D, transitionFast } from "@/lib/motion-3d";

export function WhyChoose() {
  const reduceMotion = useReducedMotion();

  return (
    <CinematicSection id="why" fullScreen={false} className="section-padding bg-white/[0.02]">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Why DeWeb"
          title="Why businesses choose DeWeb"
          subtitle="We make it simple to get a professional website, Shopify store, or AI system that actually helps your business grow."
          id="why-heading"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              variants={cardReveal3D}
              transition={{ ...transitionFast, delay: i * 0.03 }}
              className="content-panel rounded-2xl p-6 sm:p-7"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                style={{
                  background: `${item.accent}18`,
                  border: `1px solid ${item.accent}33`,
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GlowButton href="#contact" variant="primary">
            Start Your Project
          </GlowButton>
        </div>
      </div>
    </CinematicSection>
  );
}
