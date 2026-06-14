"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";
import { BlogImage } from "@/components/blog/BlogImage";
import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { gsap, registerGsap } from "@/lib/gsap-client";
import type { BlogArticle } from "@/lib/blog/types";

type HomeBlogProps = {
  articles: BlogArticle[];
};

export function HomeBlog({ articles }: HomeBlogProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { autoAlpha: 0, x: -48, rotateY: 10 },
          {
            autoAlpha: 1,
            x: 0,
            rotateY: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];
      if (cards.length && gridRef.current) {
        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 72,
            rotateX: 14,
            rotateY: (i) => (i % 2 === 0 ? -8 : 8),
            scale: 0.9,
            transformOrigin: "50% 80%",
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.42,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        cards.forEach((card, i) => {
          const imageWrap = card.querySelector<HTMLElement>(".blog-card-image-wrap");
          if (!imageWrap) return;

          gsap.to(imageWrap, {
            y: -28,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          });

          const glow = card.querySelector<HTMLElement>(".blog-card-glow");
          if (glow) {
            gsap.to(glow, {
              opacity: 0.85,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "center center",
                scrub: 0.35,
              },
            });
          }

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              rotateY: i % 2 === 0 ? 4 : -4,
              rotateX: -3,
              y: -6,
              scale: 1.02,
              duration: 0.28,
              ease: "power2.out",
              transformPerspective: 900,
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              y: 0,
              scale: 1,
              duration: 0.32,
              ease: "power2.out",
            });
          });
        });
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 24, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.38,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion, articles.length]);

  return (
    <CinematicSection id="blog" fullScreen={false} depth={false} className="section-padding overflow-hidden">
      <div ref={sectionRef} className="container-narrow px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="preserve-3d perspective-3d">
          <SectionHeading
            kicker="Blog"
            title="Tips to grow your business online"
            subtitle="Simple guides on websites, Shopify, AI, and automation."
            id="blog-heading"
          />
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-white/60">New articles coming soon.</p>
        ) : (
          <div ref={gridRef} className="perspective-3d grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post, i) => (
              <Link
                key={post.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={`/blog/${post.slug}`}
                className="blog-card preserve-3d content-panel group relative flex flex-col overflow-hidden rounded-2xl transition-colors duration-200 hover:border-deweb-cyan/25"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="blog-card-glow pointer-events-none absolute -inset-2 rounded-3xl opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(0,242,255,0.18), transparent 65%)",
                  }}
                />
                <div className="blog-card-image-wrap relative aspect-[16/10] overflow-hidden">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    categorySlug={post.categorySlug}
                    fill
                    className="transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-3 top-3 rounded-full border border-deweb-cyan/30 bg-deweb-bg/90 px-2.5 py-1 text-xs font-bold text-deweb-cyan">
                    {post.category}
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col p-5">
                  <time className="text-xs text-white/50" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="mt-2 line-clamp-2 text-base font-bold text-white transition-colors group-hover:text-deweb-cyan sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-white/70">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-deweb-cyan">
                    Read article
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div ref={ctaRef} className="mt-10 text-center">
          <GlowButton href="/blog" variant="secondary">
            View all articles
          </GlowButton>
        </div>
      </div>
    </CinematicSection>
  );
}
