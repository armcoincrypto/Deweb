import type { Transition, Variants } from "framer-motion";

export const PERSPECTIVE = 1200;

export const easePremium = [0.22, 1, 0.36, 1] as const;

export const transition3D: Transition = {
  duration: 0.65,
  ease: easePremium,
};

export const cardReveal3D: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    rotateX: 14,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
  },
};

export const panelReveal3D: Variants = {
  hidden: {
    opacity: 0,
    y: 64,
    rotateX: 18,
    rotateY: -6,
    scale: 0.92,
    z: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    z: 0,
  },
};

export const bannerReveal3D = (fromLeft: boolean): Variants => ({
  hidden: {
    opacity: 0,
    x: fromLeft ? -48 : 48,
    rotateY: fromLeft ? 12 : -12,
    rotateX: 8,
    scale: 0.96,
    z: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    z: 0,
  },
});

export const heroReveal3D: Variants = {
  hidden: { opacity: 0, y: 32, rotateX: 10, scale: 0.97 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
};

export const motion3DStyle = {
  transformPerspective: PERSPECTIVE,
  transformStyle: "preserve-3d" as const,
};
