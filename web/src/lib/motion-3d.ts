import type { Transition, Variants } from "framer-motion";

export const PERSPECTIVE = 1000;

export const easePremium = [0.25, 0.46, 0.45, 0.94] as const;

export const transitionFast: Transition = {
  duration: 0.4,
  ease: easePremium,
};

export const transition3D: Transition = {
  duration: 0.45,
  ease: easePremium,
};

export const cardReveal3D: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const panelReveal3D: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const bannerReveal3D = (fromLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: fromLeft ? -24 : 24 },
  visible: { opacity: 1, x: 0 },
});

export const heroReveal3D: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const motion3DStyle = {
  transformPerspective: PERSPECTIVE,
  transformStyle: "preserve-3d" as const,
};
