"use client";

import { useMemo, useState } from "react";
import { getAllArticles, searchArticles } from "@/lib/blog";
import { blogCategories } from "@/lib/blog/categories";
import { PinnedBlogListingExperience } from "@/components/blog/PinnedBlogListingExperience";
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
    <PinnedBlogListingExperience
      articles={articles}
      kicker="Insights"
      title={activeCat ? `${activeCat.name} Articles` : "DEWEB Blog"}
      subtitle={
        activeCat?.description ??
        "Expert guides on Shopify development, AI automation, SaaS growth, marketplace strategy, and web application development."
      }
      categories={allCategories}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      query={query}
      onQueryChange={setQuery}
    />
  );
}
