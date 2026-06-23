import { gsap, registerGsap } from "@/lib/gsap-client";

/** Lightweight cinematic reveal for stacked mobile/tablet slides (no pin). */
export function setupMobileStackedReveal(
  slides: HTMLElement[],
  onSlideEnter?: (index: number) => void
) {
  registerGsap();

  return gsap.context(() => {
    slides.forEach((slide, i) => {
      const content = slide.querySelector<HTMLElement>("[data-mobile-reveal]");
      const scene = slide.querySelector<HTMLElement>("[data-parallax-scene]");
      const visual = slide.querySelector<HTMLElement>("[data-service-visual]");
      const target = content ?? slide;

      if (i > 0) {
        gsap.set(target, {
          opacity: 0,
          y: 44,
          scale: 0.95,
          rotateX: 8,
          transformOrigin: "50% 60%",
        });
      }

      gsap.to(target, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: {
          trigger: slide,
          start: i === 0 ? "top 90%" : "top 82%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => onSlideEnter?.(i),
        },
      });

      if (visual && i > 0) {
        gsap.set(visual, { opacity: 0, y: 32, scale: 0.94, rotateX: 6, transformOrigin: "50% 60%" });
        gsap.to(visual, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.12,
          scrollTrigger: {
            trigger: slide,
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      if (scene) {
        gsap.fromTo(
          scene,
          { y: i === 0 ? 0 : 20, scale: 1.04 },
          {
            y: -20,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }
    });
  });
}
