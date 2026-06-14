"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { BlogImage } from "@/components/blog/BlogImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogArticle } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

export type BlogPinnedSlide =
  | { id: string; kind: "intro" }
  | { id: string; kind: "pair"; articles: BlogArticle[] }
  | { id: string; kind: "cta" };

type Props = {
  slide: BlogPinnedSlide;
  index: number;
  total: number;
  stacked?: boolean;
};

export const PinnedBlogSlide = forwardRef<HTMLDivElement, Props>(
  function PinnedBlogSlide({ slide, index, total, stacked }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "pinned-slide preserve-3d",
          stacked
            ? "relative min-h-screen w-full py-20 pt-[var(--navbar-offset)] sm:py-24"
            : "absolute inset-0 flex items-center pt-24 pb-16"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,242,255,0.06),transparent_65%)]" />

        <div className="container-narrow relative z-10 w-full px-4 sm:px-6 lg:px-8">
          {slide.kind === "intro" && (
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                kicker="Blog"
                title="Tips to grow your business online"
                subtitle="Simple guides on websites, Shopify, AI, and automation."
                id="blog-heading"
                align="center"
              />
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-white/35">
                Scroll to explore articles
              </p>
            </div>
          )}

          {slide.kind === "pair" && (
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
              {slide.articles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card content-panel group relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors duration-300 hover:border-deweb-cyan/30 lg:min-h-[480px]"
                >
                  <div
                    className="pointer-events-none absolute -inset-3 rounded-3xl opacity-50"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(0,242,255,0.14), transparent 70%)",
                    }}
                  />
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/9]">
                    <BlogImage
                      src={post.image}
                      alt={post.title}
                      categorySlug={post.categorySlug}
                      fill
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/90 via-[#05070a]/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-deweb-cyan/35 bg-deweb-bg/90 px-3 py-1.5 text-xs font-bold text-deweb-cyan">
                      {post.category}
                    </span>
                  </div>
                  <div className="relative flex flex-1 flex-col p-6 lg:p-8">
                    <time className="text-xs text-white/45" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="mt-3 line-clamp-3 text-xl font-bold leading-snug text-white transition-colors group-hover:text-deweb-cyan lg:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-white/70 lg:text-base">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-deweb-cyan">
                      Read article
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
              {slide.articles.length === 1 && <div className="hidden lg:block" aria-hidden="true" />}
            </div>
          )}

          {slide.kind === "cta" && (
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">More insights waiting for you</h2>
              <p className="mt-4 text-base text-white/70 sm:text-lg">
                Explore the full blog for Shopify, AI, SaaS, and growth strategies.
              </p>
              <div className="mt-10">
                <GlowButton href="/blog" variant="primary" className="!px-10 !py-4 !text-base">
                  View all articles
                </GlowButton>
              </div>
            </div>
          )}
        </div>

        {slide.kind !== "intro" && slide.kind !== "cta" && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            {String(index).padStart(2, "0")} / {String(total - 1).padStart(2, "0")}
          </div>
        )}
      </div>
    );
  }
);

export function buildBlogPinnedSlides(articles: BlogArticle[]): BlogPinnedSlide[] {
  const slides: BlogPinnedSlide[] = [{ id: "blog-intro", kind: "intro" }];

  for (let i = 0; i < articles.length; i += 2) {
    slides.push({
      id: `blog-pair-${i}`,
      kind: "pair",
      articles: articles.slice(i, i + 2),
    });
  }

  slides.push({ id: "blog-cta", kind: "cta" });
  return slides;
}
