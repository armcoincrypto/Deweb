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
};

export function CinematicSection({
  id,
  children,
  className,
  fullScreen = false,
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "cinematic-section relative overflow-hidden",
        fullScreen && "min-h-[90vh]",
        className
      )}
    >
      {children}
    </section>
  );
}
