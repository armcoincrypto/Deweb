import type { Transition, Variants } from "framer-motion";
import { animate, stagger } from "motion";
import { dewebTokens } from "./tokens";

export const easePremium = dewebTokens.motion.easePremium;

export const transitionPremium: Transition = {
  duration: dewebTokens.motion.durationBase,
  ease: easePremium,
};

export const transitionFast: Transition = {
  duration: dewebTokens.motion.durationFast,
  ease: easePremium,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer = (staggerChildren: number = dewebTokens.motion.stagger): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren: 0.06 },
  },
});

/** Motion One — lightweight DOM stagger for non-React-critical paths */
export function motionOneStagger(
  selector: string,
  keyframes: Record<string, string | number[]>,
  options?: { delay?: number; stagger?: number }
) {
  if (typeof window === "undefined") return;
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  animate(elements, keyframes, {
    delay: stagger(options?.stagger ?? 0.05, { from: "first", startDelay: options?.delay ?? 0 }),
    duration: dewebTokens.motion.durationBase,
    ease: easePremium,
  });
}
