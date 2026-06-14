"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { portfolioProjects } from "@/lib/portfolio-data";

export function HomePortfolio() {
  return (
    <section
      className="section-padding border-y border-white/[0.06] bg-white/[0.02]"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Portfolio"
          title="Projects that drive real business results"
          subtitle="Shopify stores, AI platforms, SaaS products, and automation systems built for growth."
          id="portfolio-heading"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project, i) => (
            <GlassCard key={project.id} glow tilt delay={i * 0.05} className="group overflow-hidden">
              <Link href={project.href} className="block h-full">
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                />
                <div className="p-6 sm:p-8">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: project.accent }}
                  >
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white group-hover:text-deweb-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{project.description}</p>
                  <p className="mt-4 text-sm font-semibold text-emerald-400">{project.metrics}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/45"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    className="mt-5 inline-flex text-sm font-semibold text-deweb-cyan"
                    whileHover={{ x: 4 }}
                  >
                    View solution →
                  </motion.span>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GlowButton href="/contact" variant="primary">
            Start your project
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
