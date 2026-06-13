"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { heroReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";

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
    <div className="perspective-3d" style={{ perspective: PERSPECTIVE }}>
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
        variants={heroReveal3D}
        transition={transition3D}
        style={motion3DStyle}
        className={cn(
          "preserve-3d mb-14 max-w-3xl",
          align === "center" && "mx-auto text-center",
          className
        )}
      >
        {kicker && (
          <span className="mb-4 inline-block rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan">
            {kicker}
          </span>
        )}
        <h2
          id={id}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
