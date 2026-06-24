"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Category = { slug: string; name: string };

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  categories: Category[];
  articleCount: number;
  compact?: boolean;
  pageHeading?: string;
};

export function BlogListingFilters({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  categories,
  articleCount,
  compact = false,
  pageHeading,
}: Props) {
  const t = useTranslations("blogUi");
  const heading = pageHeading ?? t("readArticle");

  return (
    <div
      className={cn(
        "z-40 w-full border-b border-white/[0.06] bg-[rgba(5,7,10,0.82)] backdrop-blur-xl",
        compact ? "relative" : "absolute left-0 right-0 top-0"
      )}
    >
      <div className="container-narrow px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">{heading}</h1>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-sm flex-1">
            <label htmlFor="blog-search" className="sr-only">
              {t("searchPlaceholder")}
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 pl-10 text-sm text-white placeholder:text-white/40 focus:border-deweb-cyan/50 focus:outline-none"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              ⌕
            </span>
          </div>

          <p className="shrink-0 text-xs text-white/45">
            {t("articlesCount", { count: articleCount })}
          </p>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <CategoryPill
            label={t("allCategories")}
            active={activeCategory === "all"}
            href="/blog"
            onClick={() => onCategoryChange("all")}
          />
          {categories.map((cat) => (
            <CategoryPill
              key={cat.slug}
              label={cat.name}
              active={activeCategory === cat.slug}
              href={`/blog/category/${cat.slug}`}
              onClick={() => onCategoryChange(cat.slug)}
            />
          ))}
        </div>
      </div>
    </div>
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
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "border-deweb-cyan/50 bg-deweb-cyan/15 text-deweb-cyan"
          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
      )}
    >
      {label}
    </Link>
  );
}
