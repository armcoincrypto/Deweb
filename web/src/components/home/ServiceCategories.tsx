"use client";

import { Link } from "@/i18n/routing";
import { motion, useReducedMotion } from "framer-motion";
import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories } from "@/lib/home-services-data";
import { cardReveal3D, transitionFast } from "@/lib/motion-3d";

export function ServiceCategories() {
  const reduceMotion = useReducedMotion();

  return (
    <CinematicSection id="services" fullScreen={false} className="section-padding">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="What we build"
          title="Simple solutions for real business growth"
          subtitle="Pick the service that fits your goal. Every option is built to help you get more clients, save time, or sell more."
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
                <p className="mt-3 text-sm text-white/80">
                  <span className="font-semibold text-white/90">What: </span>
                  {service.what}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  <span className="font-semibold text-white/85">Who: </span>
                  {service.who}
                </p>
                <p className="mt-2 flex-1 text-sm text-white/75">
                  <span className="font-semibold" style={{ color: service.accent }}>
                    Result:{" "}
                  </span>
                  {service.result}
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
      </div>
    </CinematicSection>
  );
}
