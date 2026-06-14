"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { pinnedHomeSlides } from "@/lib/home-pinned-services-data";
import { PinnedServiceSlide } from "./PinnedServiceSlide";
import { cn } from "@/lib/utils";

export function PinnedServiceExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [usePin, setUsePin] = useState(false);
  const [ready, setReady] = useState(false);

  const slides = pinnedHomeSlides;
  const total = slides.length;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const shouldPin = !prefersReduced && !isMobile && !reduceMotion;
    setUsePin(shouldPin);
    setReady(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (!ready || !usePin || !containerRef.current || !stageRef.current) return;

    registerGsap();
    slideRefs.current = slideRefs.current.slice(0, total);

    const ctx = gsap.context(() => {
      const slideEls = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      if (slideEls.length !== total) return;

      slideEls.forEach((el, i) => {
        gsap.set(el, {
          autoAlpha: i === 0 ? 1 : 0,
          z: i === 0 ? 0 : -280,
          rotateX: i === 0 ? 0 : 14,
          scale: i === 0 ? 1 : 0.84,
          transformOrigin: "50% 50%",
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      const scrollDistance = (total - 1) * window.innerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: stageRef.current,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(total - 1, Math.round(progress * (total - 1)));
            setActiveIndex(idx);
          },
        },
      });

      for (let i = 1; i < total; i++) {
        const prev = slideEls[i - 1];
        const curr = slideEls[i];
        const at = i - 1;

        tl.to(
          prev,
          {
            autoAlpha: 0,
            z: 180,
            rotateX: -8,
            scale: 0.9,
            duration: 0.38,
            ease: "power2.in",
            pointerEvents: "none",
          },
          at
        );

        tl.fromTo(
          curr,
          {
            autoAlpha: 0,
            z: -280,
            rotateX: 14,
            scale: 0.84,
            pointerEvents: "none",
          },
          {
            autoAlpha: 1,
            z: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.48,
            ease: "power2.out",
            pointerEvents: "auto",
          },
          at + 0.08
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [ready, usePin, total]);

  if (!ready) {
    return (
      <section id="services" className="min-h-screen">
        <PinnedServiceSlide slide={slides[0]} index={0} total={total} active stacked />
      </section>
    );
  }

  if (!usePin) {
    return (
      <section id="services" className="pinned-experience-fallback">
        {slides.map((slide, i) => (
          <PinnedServiceSlide
            key={slide.id}
            slide={slide}
            index={i}
            total={total}
            active
            stacked
          />
        ))}
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="services"
      className="pinned-experience"
      style={{ height: `${total * 100}vh` }}
      aria-label="DeWeb services"
    >
      <div ref={stageRef} className="pinned-stage perspective-3d">
        {slides.map((slide, i) => (
          <PinnedServiceSlide
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            slide={slide}
            index={i}
            total={total}
            active={activeIndex === i}
          />
        ))}

        <nav
          className="pointer-events-none absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:right-8"
          aria-label="Service progress"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={cn(
                "flex items-center justify-end gap-2 transition-all duration-300",
                activeIndex === i ? "opacity-100" : "opacity-35"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                {slide.kind === "hero"
                  ? "Intro"
                  : slide.kind === "service"
                    ? slide.category.title
                    : ""}
              </span>
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "scale-125 bg-deweb-cyan shadow-[0_0_12px_rgba(0,242,255,0.8)]"
                    : "bg-white/30"
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
