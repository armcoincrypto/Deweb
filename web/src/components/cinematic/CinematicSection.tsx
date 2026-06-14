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
  depth?: boolean;
};

export function CinematicSection({
  id,
  children,
  className,
  fullScreen = false,
  depth = true,
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !ref.current || !depth) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 48, scale: 0.96, rotateX: 6 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion, depth]);

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
