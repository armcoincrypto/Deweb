"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/routing";
import { BlogListingCard } from "@/components/blog/BlogListingCard";
import { GlassCard } from "@/components/ui/GlassCard";
import type { BlogArticle } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

export type BlogListingPinnedSlide =
  | {
      id: string;
      kind: "intro";
      title: string;
      subtitle: string;
      kicker?: string;
    }
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

        {slide.kind === "intro" && (
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-36 text-center sm:px-6 lg:px-8">
            {slide.kicker && (
              <span className="inline-flex rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan">
                {slide.kicker}
              </span>
            )}
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg lg:text-xl">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                { label: "Shopify", href: "/services/shopify-development" },
                { label: "AI Automation", href: "/services/ai-business-automation" },
                { label: "SaaS", href: "/services/saas-development" },
                { label: "Contact DEWEB", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-deweb-cyan/40 hover:text-deweb-cyan"
                >
                  {link.label} →
                </Link>
              ))}
            </div>

            <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              Scroll — articles appear in front
            </p>
          </div>
        )}

        {slide.kind === "pair" && (
          <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-10 pt-44 sm:px-6 lg:px-10 lg:pb-12 lg:pt-48">
            <div className="grid h-[calc(100vh-13rem)] max-h-[720px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
              {slide.articles.map((article) => (
                <BlogListingCard key={article.slug} article={article} large />
              ))}
              {slide.articles.length === 1 && (
                <div className="hidden items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] lg:flex">
                  <p className="text-sm text-white/35">More articles below</p>
                </div>
              )}
            </div>
            <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {String(index).padStart(2, "0")} / {String(total - 1).padStart(2, "0")}
            </p>
          </div>
        )}

        {slide.kind === "empty" && (
          <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-36">
            <GlassCard className="max-w-lg p-12 text-center">
              <p className="text-white/60">No articles found. Try a different search or category.</p>
            </GlassCard>
          </div>
        )}
      </div>
    );
  }
);

export function buildBlogListingSlides(
  articles: BlogArticle[],
  meta: { title: string; subtitle: string; kicker?: string }
): BlogListingPinnedSlide[] {
  const slides: BlogListingPinnedSlide[] = [
    {
      id: "blog-listing-intro",
      kind: "intro",
      title: meta.title,
      subtitle: meta.subtitle,
      kicker: meta.kicker,
    },
  ];

  if (articles.length === 0) {
    slides.push({ id: "blog-listing-empty", kind: "empty" });
    return slides;
  }

  for (let i = 0; i < articles.length; i += 2) {
    slides.push({
      id: `blog-listing-pair-${i}`,
      kind: "pair",
      articles: articles.slice(i, i + 2),
    });
  }

  return slides;
}
