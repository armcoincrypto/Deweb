"use client";

import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";
import { BlogImage } from "@/components/blog/BlogImage";
import { CinematicSection } from "@/components/cinematic/CinematicSection";
import type { BlogArticle } from "@/lib/blog/types";

type HomeBlogProps = {
  articles: BlogArticle[];
};

export function HomeBlog({ articles }: HomeBlogProps) {
  return (
    <CinematicSection id="blog" fullScreen={false} className="section-padding">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Blog"
          title="Tips to grow your business online"
          subtitle="Simple guides on websites, Shopify, AI, and automation."
          id="blog-heading"
        />

        {articles.length === 0 ? (
          <p className="text-center text-white/60">New articles coming soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="content-panel group flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:border-deweb-cyan/25"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    categorySlug={post.categorySlug}
                    fill
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-deweb-cyan/30 bg-deweb-bg/90 px-2.5 py-1 text-xs font-bold text-deweb-cyan">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs text-white/50" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="mt-2 line-clamp-2 text-base font-bold text-white group-hover:text-deweb-cyan transition-colors sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-white/70">{post.excerpt}</p>
                  <span className="mt-4 text-sm font-bold text-deweb-cyan">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <GlowButton href="/blog" variant="secondary">
            View all articles
          </GlowButton>
        </div>
      </div>
    </CinematicSection>
  );
}
