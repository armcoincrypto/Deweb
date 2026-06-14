"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { pinnedContainerHeight } from "@/lib/pinned-scroll-config";
import { setupPinnedTimeline } from "@/lib/pinned-scroll-timeline";
import { BlogListingFilters } from "@/components/blog/BlogListingFilters";
import {
  PinnedBlogListingSlide,
  buildBlogListingSlides,
} from "@/components/blog/PinnedBlogListingSlide";
import type { BlogArticle } from "@/lib/blog/types";

type Category = { slug: string; name: string; description: string };

type Props = {
  articles: BlogArticle[];
  title: string;
  subtitle: string;
  kicker?: string;
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
};

export function PinnedBlogListingExperience({
  articles,
  title,
  subtitle,
  kicker,
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [usePin, setUsePin] = useState(false);
  const [ready, setReady] = useState(false);

  const slides = useMemo(
    () => buildBlogListingSlides(articles, { title, subtitle, kicker }),
    [articles, title, subtitle, kicker]
  );
  const total = slides.length;
  const filterKey = `${activeCategory}-${query}-${articles.length}`;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    setUsePin(!prefersReduced && !isMobile && !reduceMotion);
    setReady(true);
  }, [reduceMotion]);

  useEffect(() => {
    setActiveIndex(0);
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
  }, [ready, usePin, total, filterKey]);

  const filters = (
    <BlogListingFilters
      query={query}
      onQueryChange={onQueryChange}
      activeCategory={activeCategory}
      onCategoryChange={onCategoryChange}
      categories={categories}
      articleCount={articles.length}
      compact={!usePin}
    />
  );

  if (!ready) {
    return (
      <section className="min-h-screen">
        {filters}
        <PinnedBlogListingSlide slide={slides[0]} index={0} total={total} stacked />
      </section>
    );
  }

  if (!usePin) {
    return (
      <section className="pinned-experience-fallback">
        {filters}
        {slides.map((slide, i) => (
          <PinnedBlogListingSlide key={slide.id} slide={slide} index={i} total={total} stacked />
        ))}
      </section>
    );
  }

  return (
    <section
      key={filterKey}
      ref={containerRef}
      className="pinned-experience"
      style={{ height: pinnedContainerHeight(total) }}
      aria-label="Blog articles"
    >
      <div ref={stageRef} className="pinned-stage perspective-3d">
        <div className="absolute left-0 right-0 top-[4.5rem] z-40 sm:top-20">{filters}</div>

        {slides.map((slide, i) => (
          <PinnedBlogListingSlide
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            slide={slide}
            index={i}
            total={total}
          />
        ))}

        <div
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2"
          aria-hidden="true"
        >
          {slides.map((slide, i) => (
            <span
              key={slide.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i ? "w-8 bg-deweb-cyan" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
