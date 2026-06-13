"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";
import { cardReveal3D, motion3DStyle, transition3D, PERSPECTIVE } from "@/lib/motion-3d";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
  tilt?: boolean;
};

function RevealWrap({
  children,
  className,
  delay,
  reduceMotion,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("perspective-3d", className)} style={{ perspective: PERSPECTIVE }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={cardReveal3D}
        transition={{ ...transition3D, delay }}
        style={motion3DStyle}
        className="preserve-3d h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function GlassCard({ children, className, glow, delay = 0, tilt = false }: GlassCardProps) {
  const reduceMotion = useReducedMotion();

  if (tilt) {
    return (
      <RevealWrap className={className} delay={delay} reduceMotion={reduceMotion}>
        <TiltCard glow={glow} className="h-full">
          {children}
        </TiltCard>
      </RevealWrap>
    );
  }

  if (reduceMotion) {
    return (
      <div className={cn(glow ? "glass-panel-glow glow-border" : "glass-panel", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("perspective-3d", className)} style={{ perspective: PERSPECTIVE }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={cardReveal3D}
        transition={{ ...transition3D, delay }}
        style={motion3DStyle}
        whileHover={{ y: -6, z: 8, rotateX: -2, scale: 1.01 }}
        className={cn(
          "preserve-3d transition-shadow duration-300 hover:shadow-glow-sm",
          glow ? "glass-panel-glow glow-border" : "glass-panel"
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
