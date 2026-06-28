"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedCard, StaggerContainer } from "@/components/animations";
import { useMotionSafe } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils";

export type Testimonial = {
  id: string;
  quote: string;
  label: string;
  type: string;
};

type TestimonialSliderProps = {
  items: Testimonial[];
  className?: string;
};

export function TestimonialSlider({ items, className }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);
  const { reduceMotion } = useMotionSafe();
  const current = items[index];

  function prev() {
    setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  }

  return (
    <section className={cn("relative", className)} aria-roledescription="carousel">
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        <StaggerContainer stagger={0.08}>
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} inherit />
          ))}
        </StaggerContainer>
      </div>

      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <TestimonialCard item={current} />
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
            aria-label="Previous example scenario"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-xs text-white/45">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
            aria-label="Next example scenario"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, inherit }: { item: Testimonial; inherit?: boolean }) {
  return (
    <AnimatedCard inherit={inherit} className="flex h-full flex-col p-8 glass-panel-glow" hover>
      <p className="flex-1 text-sm leading-relaxed text-white/75">{item.quote}</p>
      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="font-semibold text-white">{item.label}</p>
        <p className="text-xs text-white/45">{item.type}</p>
      </div>
    </AnimatedCard>
  );
}
