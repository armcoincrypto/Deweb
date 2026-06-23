import type { Transition } from "framer-motion";

/** Premium easing — Apple / Linear curve */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.75,
} as const;

export const TRANSITION_FAST: Transition = {
  duration: DURATION.fast,
  ease: EASE_PREMIUM,
};

export const TRANSITION_BASE: Transition = {
  duration: DURATION.base,
  ease: EASE_PREMIUM,
};

export const TRANSITION_SLOW: Transition = {
  duration: DURATION.slow,
  ease: EASE_PREMIUM,
};

/** Scroll reveal — triggers before element is fully in view */
export const VIEWPORT_REVEAL = {
  once: true,
  margin: "-8% 0px -6% 0px",
  amount: 0.18,
} as const;

/** Page transition — short, no layout shift */
export const PAGE_TRANSITION: Transition = {
  duration: DURATION.fast,
  ease: EASE_PREMIUM,
};

/** Parallax intensity caps for mobile */
export const PARALLAX = {
  desktop: 0.12,
  tablet: 0.08,
  mobile: 0.04,
} as const;
