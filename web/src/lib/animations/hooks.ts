"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useMotionSafe() {
  const reduceMotion = useReducedMotion();
  return { reduceMotion: !!reduceMotion };
}

/** Disable magnetic / hover micro-interactions on touch devices */
export function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return coarse;
}

export function useParallaxSpeed() {
  const [speed, setSpeed] = useState(0.08);

  useEffect(() => {
    const w = window.innerWidth;
    if (w < 640) setSpeed(0.04);
    else if (w < 1024) setSpeed(0.08);
    else setSpeed(0.12);
  }, []);

  return speed;
}
