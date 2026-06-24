"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, transitionPremium } from "@/lib/design-system/motion";
import { VIEWPORT_REVEAL } from "@/lib/animations/config";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  splitBy?: "words" | "lines";
  /** Scroll-triggered vs mount */
  onScroll?: boolean;
  gradient?: boolean;
};

export function TextReveal({
  text,
  className,
  as = "h1",
  splitBy = "words",
  onScroll = false,
  gradient = true,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;
  const parts =
    splitBy === "lines"
      ? text.includes("\n")
        ? text.split("\n")
        : [text]
      : text.split(" ");

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {splitBy === "lines" ? (
          parts.map((line, i) => (
            <span key={`${line}-${i}`} className="block">
              {line}
            </span>
          ))
        ) : (
          text
        )}
      </Tag>
    );
  }

  const motionProps = onScroll
    ? { whileInView: "visible" as const, viewport: VIEWPORT_REVEAL }
    : { animate: "visible" as const };

  if (splitBy === "lines") {
    return (
      <motion.div
        initial="hidden"
        {...motionProps}
        variants={staggerContainer(0.08)}
        className="w-full text-center"
      >
        <Tag
          className={cn(className, gradient && "text-gradient-cyan")}
          aria-label={parts.join(" ")}
        >
          {parts.map((line, i) => (
            <motion.span
              key={`${line}-${i}`}
              variants={fadeUp}
              transition={transitionPremium}
              className="block w-full text-center"
            >
              {line}
            </motion.span>
          ))}
        </Tag>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" {...motionProps} variants={staggerContainer(0.05)}>
      <Tag
        className={cn(
          className,
          "flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-center",
          gradient && "text-gradient-cyan"
        )}
      >
        {parts.map((part, i) => (
          <motion.span key={`${part}-${i}`} variants={fadeUp} transition={transitionPremium}>
            {part}
            {i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
