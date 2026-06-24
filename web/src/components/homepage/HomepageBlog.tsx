"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ScrollReveal, StaggerContainer, FadeIn } from "@/components/animations";
import { BlogListingCard } from "@/components/blog/BlogListingCard";
import { GlowButton } from "@/components/ui/GlowButton";
import type { BlogArticle } from "@/lib/blog/types";

type Props = {
  articles: BlogArticle[];
};

export function HomepageBlog({ articles }: Props) {
  const t = useTranslations("home");
  const [featured, ...rest] = articles;

  if (!featured) return null;

  return (
    <section id="blog" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_50%,rgba(0,242,255,0.05),transparent)]" />
      <div className="container-narrow relative px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("blogKicker")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("blogTitle")}</h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">{t("blogSubtitle")}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeIn className="min-h-[420px] lg:min-h-[520px]">
            <BlogListingCard article={featured} large className="h-full" />
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1" stagger={0.06}>
            {rest.map((article) => (
              <FadeIn key={article.slug} inherit className="min-h-[200px]">
                <BlogListingCard article={article} className="h-full" />
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-10 flex justify-center">
          <GlowButton href="/blog" variant="secondary">
            {t("blogViewAll")}
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
