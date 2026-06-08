"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { getAllArticles, searchArticles } from "@/lib/blog";
import { blogCategories } from "@/lib/blog/categories";
import type { BlogArticle } from "@/lib/blog/types";

type BlogListingViewProps = {
  categorySlug?: string;
  initialQuery?: string;
  articles?: BlogArticle[];
  extraCategories?: { slug: string; name: string; description: string }[];
};

export function BlogListingView({
  categorySlug,
  initialQuery = "",
  articles: articlesProp,
  extraCategories = [],
}: BlogListingViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(categorySlug ?? "all");

  const allCategories = useMemo(() => {
    const seen = new Set(blogCategories.map((c) => c.slug));
    const merged = [...blogCategories];
    for (const c of extraCategories) {
      if (!seen.has(c.slug)) merged.push(c);
    }
    return merged;
  }, [extraCategories]);

  const articles = useMemo(() => {
    const base = articlesProp ?? getAllArticles();
    let list =
      activeCategory === "all"
        ? base
        : base.filter((a) => a.categorySlug === activeCategory);
    if (query.trim()) list = searchArticles(query, list);
    return list;
  }, [query, activeCategory, articlesProp]);

  const activeCat = allCategories.find((c) => c.slug === activeCategory);

  return (
    <>
      <PageHeader
        kicker="Insights"
        title={activeCat ? `${activeCat.name} Articles` : "DEWEB Blog"}
        subtitle={
          activeCat?.description ??
          "Practical guides on Shopify, AI automation, web development, SaaS and marketplace strategy."
        }
      />

      <div className="container-narrow px-4 py-10 sm:px-6 lg:px-8">
        {/* Search + category filters */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pl-10 text-white placeholder:text-white/40 focus:border-deweb-cyan/50 focus:outline-none"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              ⌕
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <CategoryPill
              label="All"
              active={activeCategory === "all"}
              href="/blog"
              onClick={() => setActiveCategory("all")}
            />
            {allCategories.map((cat) => (
              <CategoryPill
                key={cat.slug}
                label={cat.name}
                active={activeCategory === cat.slug}
                href={`/blog/category/${cat.slug}`}
                onClick={() => setActiveCategory(cat.slug)}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-white/45">
          {articles.length} article{articles.length !== 1 ? "s" : ""}
          {query.trim() ? ` matching "${query}"` : ""}
        </p>

        {articles.length === 0 ? (
          <GlassCard className="mt-10 p-12 text-center">
            <p className="text-white/60">No articles found. Try a different search or category.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 text-sm font-semibold text-deweb-cyan hover:underline"
            >
              Clear filters
            </button>
          </GlassCard>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <article key={post.slug} className="glass-panel-glow group overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-deweb-cyan/30 bg-deweb-bg/80 px-3 py-1 text-xs font-bold text-deweb-cyan backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-deweb-cyan">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-deweb-cyan">
                      Read article →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function CategoryPill({
  label,
  active,
  href,
  onClick,
}: {
  label: string;
  active: boolean;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-deweb-cyan/50 bg-deweb-cyan/15 text-deweb-cyan"
          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
