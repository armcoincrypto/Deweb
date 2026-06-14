"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { pinnedContainerHeight } from "@/lib/pinned-scroll-config";
import { setupPinnedTimeline } from "@/lib/pinned-scroll-timeline";
import { setupMobileStackedReveal } from "@/lib/mobile-scroll-reveal";
import { pinnedHomeSlides } from "@/lib/home-pinned-services-data";
import { PinnedServiceSlide } from "./PinnedServiceSlide";
import { cn } from "@/lib/utils";

function shouldUsePin(reduceMotion: boolean | null) {
  if (typeof window === "undefined") return false;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 1023px)").matches;
  return !prefersReduced && !isMobile && !reduceMotion;
}

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
    const update = () => setUsePin(shouldUsePin(reduceMotion));
    update();
    setReady(true);

    const mq = window.matchMedia("(max-width: 1023px)");
    const onMotionChange = () => update();
    mq.addEventListener("change", onMotionChange);
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", onMotionChange);

    return () => {
      mq.removeEventListener("change", onMotionChange);
      window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener("change", onMotionChange);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!ready || !usePin || !containerRef.current || !stageRef.current) return;

    registerGsap();
    slideRefs.current = slideRefs.current.slice(0, total);

    const ctx = gsap.context(() => {
      const slideEls = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      if (slideEls.length !== total) return;

      setupPinnedTimeline({
        container: containerRef.current!,
        stage: stageRef.current!,
        slides: slideEls,
        onActiveChange: setActiveIndex,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [ready, usePin, total]);

  useEffect(() => {
    if (!ready || usePin || !containerRef.current) return;

    registerGsap();
    slideRefs.current = slideRefs.current.slice(0, total);

    const slideEls = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slideEls.length !== total) return;

    const ctx = setupMobileStackedReveal(slideEls);
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
      <section id="services" ref={containerRef} className="pinned-experience-fallback">
        {slides.map((slide, i) => (
          <PinnedServiceSlide
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
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
      style={{ height: pinnedContainerHeight(total) }}
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
                "flex items-center justify-end gap-2 transition-all duration-500",
                activeIndex === i ? "opacity-100" : "opacity-30"
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
                  "h-2 w-2 rounded-full transition-all duration-500",
                  activeIndex === i
                    ? "scale-110 bg-deweb-cyan shadow-[0_0_10px_rgba(0,242,255,0.6)]"
                    : "bg-white/25"
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
