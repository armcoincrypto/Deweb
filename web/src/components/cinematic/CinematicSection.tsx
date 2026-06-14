"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { cn } from "@/lib/utils";

type CinematicSectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
  parallax?: number;
};

export function CinematicSection({
  id,
  children,
  className,
  fullScreen = true,
  parallax = 0,
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 80, scale: 0.96, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (parallax) {
        gsap.to(ref.current, {
          y: parallax,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion, parallax]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "cinematic-section perspective-3d relative overflow-hidden",
        fullScreen && "min-h-screen",
        className
      )}
    >
      {children}
    </section>
  );
}
