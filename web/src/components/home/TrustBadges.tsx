"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cardReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";

const badges = [
  { label: "Shopify Plus ready", icon: "🛒" },
  { label: "AI automation", icon: "🤖" },
  { label: "SaaS & MVPs", icon: "☁️" },
  { label: "Marketplace builds", icon: "🏪" },
  { label: "Custom web apps", icon: "💻" },
  { label: "24h response", icon: "⚡" },
];

export function TrustBadges() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-white/[0.06] py-10" aria-label="Trust indicators">
      <div className="container-narrow px-4 sm:px-6 lg:px-8" style={{ perspective: PERSPECTIVE }}>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true }}
              variants={cardReveal3D}
              transition={{ ...transition3D, delay: i * 0.05 }}
              style={motion3DStyle}
              whileHover={reduceMotion ? undefined : { z: 10, rotateX: -4, scale: 1.03 }}
              className="preserve-3d flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-colors hover:border-deweb-cyan/30 hover:text-white"
            >
              <span aria-hidden="true">{badge.icon}</span>
              <span className="font-medium">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
