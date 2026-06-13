"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { motion3DStyle, PERSPECTIVE } from "@/lib/motion-3d";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: boolean;
};

export function TiltCard({ children, className, maxTilt = 10, glow }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 280,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 280,
    damping: 28,
  });

  useEffect(() => {
    setCanTilt(window.matchMedia("(pointer: fine)").matches);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!canTilt || reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const interactive = canTilt && !reduceMotion;

  return (
    <div
      className={cn("perspective-3d", className)}
      style={{ perspective: PERSPECTIVE }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        ref={ref}
        style={{
          ...motion3DStyle,
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
        }}
        whileHover={interactive ? { z: 12, scale: 1.02 } : { y: -4 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "preserve-3d transition-shadow duration-300",
          glow ? "glass-panel-glow glow-border" : "glass-panel",
          interactive && "hover:shadow-glow-lg"
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
