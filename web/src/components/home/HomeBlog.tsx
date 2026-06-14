"use client";

import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { BlogImage } from "@/components/blog/BlogImage";
import type { BlogArticle } from "@/lib/blog/types";

type HomeBlogProps = {
  articles: BlogArticle[];
};

export function HomeBlog({ articles }: HomeBlogProps) {
  return (
    <section className="section-padding" aria-labelledby="blog-heading">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Insights"
          title="Latest from the DEWEB blog"
          subtitle="Guides on Shopify, AI automation, SaaS development, and digital growth."
          id="blog-heading"
        />

        {articles.length === 0 ? (
          <p className="text-center text-white/50">New articles coming soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post, i) => (
              <GlassCard key={post.slug} glow tilt delay={i * 0.06} className="group overflow-hidden">
                <article>
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <BlogImage
                        src={post.image}
                        alt={post.title}
                        categorySlug={post.categorySlug}
                        fill
                        className="transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute left-4 top-4 rounded-full border border-deweb-cyan/30 bg-deweb-bg/80 px-3 py-1 text-xs font-bold text-deweb-cyan backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <time className="text-xs text-white/40" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <h3 className="mt-2 text-lg font-bold text-white group-hover:text-deweb-cyan transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-white/55">{post.excerpt}</p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-deweb-cyan">
                        Read article →
                      </span>
                    </div>
                  </Link>
                </article>
              </GlassCard>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <GlowButton href="/blog" variant="secondary">
            View all articles
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
