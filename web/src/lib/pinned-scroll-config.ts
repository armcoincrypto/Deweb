/** Comfortable pinned-scroll tuning — smooth, unhurried, no harsh snap */
export const PINNED_SCROLL = {
  /** Viewport heights per slide transition */
  stepVh: 95,
  /** Higher scrub = smoother, more lagged follow (feels cinematic) */
  scrub: 1.35,
  /** Gentle 3D depth */
  enterZ: -70,
  exitZ: 50,
  enterRotateX: 4,
  exitRotateX: -3,
  enterScale: 0.96,
  exitScale: 0.97,
  /** Timeline segment lengths within each slide step */
  exitDuration: 0.55,
  enterDuration: 0.65,
  enterOverlap: 0.3,
  exitEase: "sine.inOut",
  enterEase: "power1.out",
} as const;

export function pinnedContainerHeight(slideCount: number) {
  return `${PINNED_SCROLL.stepVh + (slideCount - 1) * PINNED_SCROLL.stepVh}vh`;
}

export function pinnedScrollDistance(slideCount: number) {
  if (typeof window === "undefined") return 0;
  return (slideCount - 1) * window.innerHeight * (PINNED_SCROLL.stepVh / 100);
}
