/** Mutable scroll state — updated by GSAP ScrollTrigger, read by R3F useFrame. */
export const globeScrollState = {
  progress: 0,
  rotationY: 0,
  activeIndex: 0,
  /** 0–1 progress within the current slide segment */
  slideProgress: 0,
  accent: "#00f2ff",
};

export function resetGlobeScrollState() {
  globeScrollState.progress = 0;
  globeScrollState.rotationY = 0;
  globeScrollState.activeIndex = 0;
  globeScrollState.slideProgress = 0;
  globeScrollState.accent = "#00f2ff";
}

export function setGlobeAccent(accent: string) {
  globeScrollState.accent = accent;
}
