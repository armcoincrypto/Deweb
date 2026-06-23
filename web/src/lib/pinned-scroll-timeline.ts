import { gsap } from "@/lib/gsap-client";
import { globeScrollState, resetGlobeScrollState } from "@/lib/globe-scroll-state";
import { PINNED_SCROLL, pinnedScrollDistance } from "@/lib/pinned-scroll-config";

type PinnedTimelineOptions = {
  container: HTMLElement;
  stage: HTMLElement;
  slides: HTMLElement[];
  globeLayer?: HTMLElement | null;
  onActiveChange?: (index: number) => void;
};

export function setupPinnedTimeline({
  container,
  stage,
  slides,
  globeLayer,
  onActiveChange,
}: PinnedTimelineOptions) {
  const total = slides.length;
  const { scrub, enterZ, exitZ, enterRotateX, exitRotateX, enterScale, exitScale } =
    PINNED_SCROLL;

  resetGlobeScrollState();

  slides.forEach((el, i) => {
    gsap.set(el, {
      autoAlpha: i === 0 ? 1 : 0,
      z: i === 0 ? 0 : enterZ,
      rotateX: i === 0 ? 0 : enterRotateX,
      scale: i === 0 ? 1 : enterScale,
      transformOrigin: "50% 55%",
      pointerEvents: i === 0 ? "auto" : "none",
    });
  });

  const heroContent = slides[0]?.querySelector<HTMLElement>("[data-hero-content]");
  if (heroContent) {
    gsap.set(heroContent, { autoAlpha: 1, y: 0 });
  }

  if (globeLayer) {
    gsap.set(globeLayer, {
      y: 0,
      scale: 1,
      z: 0,
      rotateZ: 0,
      transformOrigin: "50% 42%",
    });
  }

  const scrollDistance = pinnedScrollDistance(total);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: stage,
      scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const raw = self.progress * (total - 1);
        const idx = Math.min(total - 1, Math.round(raw));
        globeScrollState.progress = self.progress;
        globeScrollState.rotationY = self.progress * Math.PI * 1.6;
        globeScrollState.activeIndex = idx;
        globeScrollState.slideProgress = raw - Math.floor(raw);
        onActiveChange?.(idx);
      },
    },
  });

  if (globeLayer) {
    tl.to(
      globeLayer,
      {
        y: -100,
        scale: 0.48,
        z: -90,
        rotateZ: -8,
        ease: "none",
        duration: Math.max(1, total - 1),
      },
      0
    );
  }

  if (heroContent) {
    tl.to(
      heroContent,
      {
        autoAlpha: 0,
        y: -48,
        duration: 0.35,
        ease: "power2.inOut",
      },
      0
    );
  }

  for (let i = 1; i < total; i++) {
    const prev = slides[i - 1];
    const curr = slides[i];
    const at = i - 1;

    tl.to(
      prev,
      {
        autoAlpha: 0,
        z: exitZ,
        rotateX: exitRotateX,
        scale: exitScale,
        duration: PINNED_SCROLL.exitDuration,
        ease: PINNED_SCROLL.exitEase,
        pointerEvents: "none",
      },
      at
    );

    tl.fromTo(
      curr,
      {
        autoAlpha: 0,
        z: enterZ,
        rotateX: enterRotateX,
        scale: enterScale,
        pointerEvents: "none",
      },
      {
        autoAlpha: 1,
        z: 0,
        rotateX: 0,
        scale: 1,
        duration: PINNED_SCROLL.enterDuration,
        ease: PINNED_SCROLL.enterEase,
        pointerEvents: "auto",
      },
      at + PINNED_SCROLL.enterOverlap
    );
  }

  return tl;
}
