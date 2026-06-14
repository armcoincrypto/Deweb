"use client";

import { forwardRef } from "react";
import { BlogListingCard } from "@/components/blog/BlogListingCard";
import { GlassCard } from "@/components/ui/GlassCard";
import type { BlogArticle } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

export type BlogListingPinnedSlide =
  | { id: string; kind: "pair"; articles: BlogArticle[] }
  | { id: string; kind: "empty" };

type Props = {
  slide: BlogListingPinnedSlide;
  index: number;
  total: number;
  stacked?: boolean;
};

export const PinnedBlogListingSlide = forwardRef<HTMLDivElement, Props>(
  function PinnedBlogListingSlide({ slide, index, total, stacked }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "pinned-slide preserve-3d",
          stacked
            ? "relative min-h-screen w-full"
            : "absolute inset-0 flex flex-col"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_35%,rgba(0,242,255,0.07),transparent_65%)]" />

        {slide.kind === "pair" && (
          <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-10 pt-[var(--navbar-offset)] sm:px-6 lg:px-10 lg:pb-12 lg:pt-48">
            <div className="grid min-h-0 auto-rows-fr grid-cols-1 gap-6 lg:h-[calc(100vh-13rem)] lg:max-h-[720px] lg:grid-cols-2 lg:gap-10">
              {slide.articles.map((article) => (
                <BlogListingCard key={article.slug} article={article} large />
              ))}
              {slide.articles.length === 1 && (
                <div className="hidden items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] lg:flex">
                  <p className="text-sm text-white/35">More articles below</p>
                </div>
              )}
            </div>
            {total > 1 && (
              <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            )}
          </div>
        )}

        {slide.kind === "empty" && (
          <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-[var(--navbar-offset)] lg:pt-48">
            <GlassCard className="max-w-lg p-12 text-center">
              <p className="text-white/60">No articles found. Try a different search or category.</p>
            </GlassCard>
          </div>
        )}
      </div>
    );
  }
);

export function buildBlogListingSlides(articles: BlogArticle[]): BlogListingPinnedSlide[] {
  if (articles.length === 0) {
    return [{ id: "blog-listing-empty", kind: "empty" }];
  }

  const slides: BlogListingPinnedSlide[] = [];
  for (let i = 0; i < articles.length; i += 2) {
    slides.push({
      id: `blog-listing-pair-${i}`,
      kind: "pair",
      articles: articles.slice(i, i + 2),
    });
  }

  return slides;
}
