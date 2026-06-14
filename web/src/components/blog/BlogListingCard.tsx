"use client";

import { Link } from "@/i18n/routing";
import { BlogImage } from "@/components/blog/BlogImage";
import type { BlogArticle } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type Props = {
  article: BlogArticle;
  className?: string;
  large?: boolean;
};

export function BlogListingCard({ article, className, large = false }: Props) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        "blog-card content-panel group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-deweb-cyan/35 hover:shadow-glow-sm",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,242,255,0.16), transparent 70%)",
        }}
      />

      <div
        className={cn(
          "relative overflow-hidden",
          large ? "min-h-[42vh] flex-[1.15] lg:min-h-0" : "aspect-[16/10]"
        )}
      >
        <BlogImage
          src={article.image}
          alt={article.title}
          categorySlug={article.categorySlug}
          fill
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/95 via-[#05070a]/25 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-deweb-cyan/35 bg-deweb-bg/90 px-3 py-1.5 text-xs font-bold text-deweb-cyan backdrop-blur-sm">
          {article.category}
        </span>
      </div>

      <div className={cn("relative flex flex-1 flex-col", large ? "p-6 lg:p-8" : "p-6")}>
        <div className="flex items-center gap-3 text-xs text-white/45">
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
        <h2
          className={cn(
            "mt-3 font-bold leading-snug text-white transition-colors group-hover:text-deweb-cyan",
            large ? "line-clamp-3 text-2xl lg:text-3xl" : "line-clamp-2 text-lg"
          )}
        >
          {article.title}
        </h2>
        <p
          className={cn(
            "mt-3 flex-1 leading-relaxed text-white/65",
            large ? "line-clamp-4 text-sm lg:text-base" : "line-clamp-3 text-sm"
          )}
        >
          {article.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-deweb-cyan">
          Read article
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}
