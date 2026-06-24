"use client";

import { useMemo, useState } from "react";
import { getAllArticles, searchArticles } from "@/lib/blog";
import { blogCategories } from "@/lib/blog/categories";
import { PinnedBlogListingExperience } from "@/components/blog/PinnedBlogListingExperience";
import type { BlogArticle } from "@/lib/blog/types";

import type { BlogCategory } from "@/lib/blog/types";

type BlogListingViewProps = {
  categorySlug?: string;
  initialQuery?: string;
  articles?: BlogArticle[];
  extraCategories?: { slug: string; name: string; description: string }[];
  categories?: BlogCategory[];
  pageHeading?: string;
};

export function BlogListingView({
  categorySlug,
  initialQuery = "",
  articles: articlesProp,
  extraCategories = [],
  categories: categoriesProp,
  pageHeading,
}: BlogListingViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(categorySlug ?? "all");

  const allCategories = useMemo(() => {
    const base = categoriesProp ?? blogCategories;
    const seen = new Set(base.map((c) => c.slug));
    const merged = [...base];
    for (const c of extraCategories) {
      if (!seen.has(c.slug)) merged.push(c);
    }
    return merged;
  }, [extraCategories, categoriesProp]);

  const articles = useMemo(() => {
    const base = articlesProp ?? getAllArticles();
    let list =
      activeCategory === "all"
        ? base
        : base.filter((a) => a.categorySlug === activeCategory);
    if (query.trim()) list = searchArticles(query, list);
    return list;
  }, [query, activeCategory, articlesProp]);

  return (
    <PinnedBlogListingExperience
      articles={articles}
      categories={allCategories}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      query={query}
      onQueryChange={setQuery}
      pageHeading={pageHeading}
    />
  );
}
