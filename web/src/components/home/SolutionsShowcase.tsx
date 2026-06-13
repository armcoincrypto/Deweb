"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { solutionBlocks } from "@/lib/home-services-data";

export function SolutionsShowcase() {
  return (
    <section className="section-padding" aria-labelledby="solutions-heading">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Solutions"
          title="Built for how your business actually grows"
          subtitle="Whether you sell online, automate operations, launch a SaaS, or run a marketplace — DEWEB delivers production-ready systems."
          id="solutions-heading"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {solutionBlocks.map((block, i) => (
            <GlassCard key={block.id} glow delay={i * 0.08} tilt className="group">
              <Link href={block.href} className="block h-full p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${block.accent}22, transparent)`,
                      border: `1px solid ${block.accent}44`,
                    }}
                  >
                    {block.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-deweb-cyan transition-colors">
                      {block.title}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-white/55"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: block.accent }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <motion.span
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-deweb-cyan"
                      whileHover={{ x: 4 }}
                    >
                      Explore solution →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
