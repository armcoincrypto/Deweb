"use client";

import { Link } from "@/i18n/routing";
import { motion, useReducedMotion } from "framer-motion";
import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";
import { portfolioProjects } from "@/lib/portfolio-data";
import { cardReveal3D, transitionFast } from "@/lib/motion-3d";

export function HomePortfolio() {
  const reduceMotion = useReducedMotion();

  return (
    <CinematicSection
      id="portfolio"
      fullScreen={false}
      className="section-padding border-y border-white/[0.06]"
    >
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Results"
          title="Real projects. Real results."
          subtitle="See what we've built for businesses like yours — Shopify stores, AI tools, websites, and automation systems."
          id="portfolio-heading"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              variants={cardReveal3D}
              transition={{ ...transitionFast, delay: i * 0.03 }}
            >
              <Link
                href={project.href}
                className="content-panel group flex h-full flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:border-deweb-cyan/25 hover:shadow-glow-sm"
              >
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                />
                <div className="flex flex-1 flex-col p-6">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: project.accent }}
                  >
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white group-hover:text-deweb-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-emerald-400">{project.metrics}</p>
                  <span className="mt-4 text-sm font-bold text-deweb-cyan">View details →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GlowButton href="#contact" variant="primary">
            View Results
          </GlowButton>
        </div>
      </div>
    </CinematicSection>
  );
}
