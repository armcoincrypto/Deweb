"use client";

import { Link } from "@/i18n/routing";
import { motion, useReducedMotion } from "framer-motion";
import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";
import { serviceCategories } from "@/lib/home-services-data";
import { cardReveal3D, transitionFast } from "@/lib/motion-3d";

export function ServiceCategories() {
  const reduceMotion = useReducedMotion();

  return (
    <CinematicSection id="services" fullScreen={false} className="section-padding">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="What we build"
          title="Everything your business needs to grow online"
          subtitle="Websites, Shopify stores, AI chatbots, automation, and custom digital tools — built to get you more clients and sales."
          id="services-heading"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service, i) => (
            <motion.div
              key={service.title}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              variants={cardReveal3D}
              transition={{ ...transitionFast, delay: i * 0.04 }}
            >
              <Link
                href={service.href}
                className="content-panel group flex h-full flex-col rounded-2xl p-6 transition-all duration-200 hover:border-deweb-cyan/30 hover:shadow-glow-sm sm:p-7"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{
                    background: `${service.accent}18`,
                    border: `1px solid ${service.accent}33`,
                  }}
                >
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-deweb-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
                  {service.description}
                </p>
                <span
                  className="mt-5 inline-flex text-sm font-bold transition-colors"
                  style={{ color: service.accent }}
                >
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <GlowButton href="/services" variant="primary">
            See Our Services
          </GlowButton>
          <GlowButton href="#contact" variant="secondary">
            Contact Us
          </GlowButton>
        </div>
      </div>
    </CinematicSection>
  );
}
