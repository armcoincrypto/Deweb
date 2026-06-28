"use client";

import { Link } from "@/i18n/routing";
import { motion, useReducedMotion } from "framer-motion";
import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";
import { caseStudies } from "@/lib/conversion-data";
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
          kicker="Case Studies"
          title="Production portfolio examples"
          subtitle="Illustrative project examples showing the problems we solve, our delivery approach, and practical engineering outcomes."
          id="portfolio-heading"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((project, i) => (
            <motion.article
              key={project.id}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              variants={cardReveal3D}
              transition={{ ...transitionFast, delay: i * 0.03 }}
              className="content-panel flex h-full flex-col rounded-2xl overflow-hidden"
            >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: project.accent }}
                  >
                    {project.projectType}
                  </span>
                  {project.demo && (
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/40">
                      Demo project
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{project.title}</h3>

                <div className="mt-4 space-y-3 text-sm leading-relaxed">
                  <p className="text-white/75">
                    <span className="font-semibold text-white">Problem: </span>
                    {project.problem}
                  </p>
                  <p className="text-white/75">
                    <span className="font-semibold text-white">Solution: </span>
                    {project.solution}
                  </p>
                  <p className="font-semibold text-emerald-400">
                    <span className="text-white/80">Result: </span>
                    {project.result}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/65"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={project.href}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-deweb-cyan/40 hover:text-deweb-cyan"
                  >
                    View Project
                  </Link>
                  <GlowButton href="/contact" variant="secondary" className="!px-4 !py-2 !text-sm">
                    Request Similar Project
                  </GlowButton>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GlowButton href="/contact" variant="primary">
            Start Your Project
          </GlowButton>
        </div>
      </div>
    </CinematicSection>
  );
}
