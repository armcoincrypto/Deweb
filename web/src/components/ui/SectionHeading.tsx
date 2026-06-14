"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { heroReveal3D, transitionFast } from "@/lib/motion-3d";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  id,
  align = "center",
  className,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={heroReveal3D}
      transition={transitionFast}
      className={cn(
        "mb-12 max-w-3xl sm:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {kicker && (
        <span className="mb-3 inline-block rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deweb-cyan">
          {kicker}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
