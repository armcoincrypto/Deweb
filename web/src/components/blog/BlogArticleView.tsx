"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { BlogImage } from "@/components/blog/BlogImage";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import type { BlogArticle } from "@/lib/blog/types";
import type { BreadcrumbItem } from "@/lib/schema";
import { getAuthor } from "@/lib/blog/authors";
import { getRelatedArticles } from "@/lib/blog";
import { trackBlogEvent, trackBlogView } from "@/lib/blog/tracking";

type BlogArticleViewProps = {
  article: BlogArticle;
  breadcrumbs: BreadcrumbItem[];
  locale?: string;
};

function isContactHref(href: string) {
  return href.includes("/contact");
}

export function BlogArticleView({ article, breadcrumbs, locale }: BlogArticleViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const scrollTracked = useRef({ half: false, full: false });
  const author = getAuthor(article.authorId);
  const related = getRelatedArticles(article);

  useEffect(() => {
    trackBlogView(article.slug, locale);
  }, [article.slug, locale]);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;
      if (!scrollTracked.current.half && ratio >= 0.5) {
        scrollTracked.current.half = true;
        trackBlogEvent(article.slug, "scroll_50");
      }
      if (!scrollTracked.current.full && ratio >= 0.9) {
        scrollTracked.current.full = true;
        trackBlogEvent(article.slug, "scroll_90");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [article.slug]);

  function handleCtaClick(href: string, label: string) {
    if (isContactHref(href)) {
      trackBlogEvent(article.slug, "contact_click", { href, label });
    } else {
      trackBlogEvent(article.slug, "cta_click", { href, label });
    }
  }

  function handleServiceLinkClick(href: string, label: string) {
    trackBlogEvent(article.slug, "service_link_click", { href, label });
  }

  return (
    <>
      {/* Hero */}
      <header className="border-b border-white/[0.06]">
        <div className="container-narrow px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.path} className="hover:text-deweb-cyan">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="line-clamp-1 text-white/70">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <Link
            href={`/blog/category/${article.categorySlug}`}
            className="inline-flex rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deweb-cyan hover:bg-deweb-cyan/20"
          >
            {article.category}
          </Link>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/60">{article.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/45">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{author.name}</span>
          </div>
        </div>

        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <BlogImage
              src={article.image}
              alt={article.title}
              categorySlug={article.categorySlug}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </header>

      <article className="container-narrow px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Author card */}
          <GlassCard className="mb-12 flex gap-4 p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 text-lg font-bold text-deweb-cyan">
              DE
            </div>
            <div>
              <p className="font-bold text-white">{author.name}</p>
              <p className="text-sm text-deweb-cyan">{author.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{author.bio}</p>
            </div>
          </GlassCard>

          {/* Body */}
          <div className="space-y-6">
            {article.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-white/70">
                {p}
              </p>
            ))}
          </div>

          {article.sections.map((section) => (
            <section key={section.title} className="mt-12">
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-white/65">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Internal links */}
          {article.internalLinks.length > 0 && (
            <aside className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-deweb-cyan">
                Related DEWEB Services
              </h3>
              <ul className="mt-4 space-y-2">
                {article.internalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-deweb-cyan hover:underline"
                      onClick={() => handleServiceLinkClick(link.href, link.label)}
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* FAQ */}
          <section className="mt-16" aria-labelledby="article-faq">
            <h2 id="article-faq" className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              {article.faqs.map((faq, i) => (
                <GlassCard key={faq.question} className="overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <h3 className="font-semibold text-white">{faq.question}</h3>
                    <span className="text-deweb-cyan">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <p className="border-t border-white/[0.06] px-5 pb-5 pt-3 text-sm leading-relaxed text-white/60">
                      {faq.answer}
                    </p>
                  )}
                </GlassCard>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl border border-deweb-cyan/20 bg-gradient-to-br from-deweb-cyan/10 to-transparent p-8 text-center">
            <h2 className="text-2xl font-bold text-white">{article.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60">{article.cta.description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowButton
                href={article.cta.primaryHref}
                variant="primary"
                onClick={() =>
                  handleCtaClick(article.cta.primaryHref, article.cta.primaryLabel)
                }
              >
                {article.cta.primaryLabel}
              </GlowButton>
              {article.cta.secondaryHref && article.cta.secondaryLabel && (
                <GlowButton
                  href={article.cta.secondaryHref}
                  variant="ghost"
                  onClick={() =>
                    handleCtaClick(article.cta.secondaryHref!, article.cta.secondaryLabel!)
                  }
                >
                  {article.cta.secondaryLabel}
                </GlowButton>
              )}
            </div>
          </section>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-articles">
              <h2 id="related-articles" className="text-2xl font-bold text-white">
                Related Articles
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block">
                    <GlassCard className="h-full p-5 transition-colors hover:border-deweb-cyan/30">
                      <span className="text-xs font-bold text-deweb-cyan">{rel.category}</span>
                      <h3 className="mt-2 font-bold text-white group-hover:text-deweb-cyan">
                        {rel.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-white/50">{rel.excerpt}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 border-t border-white/10 pt-8">
            <Link href="/blog" className="text-sm font-semibold text-deweb-cyan hover:underline">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
