"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlowButton } from "@/components/ui/GlowButton";
import type { BlogPost } from "@/lib/blog-data";

type BlogPostViewProps = {
  post: BlogPost;
};

export function BlogPostView({ post }: BlogPostViewProps) {
  const t = useTranslations("blog");

  return (
    <>
      <PageHeader
        kicker={post.category}
        title={t(`posts.${post.slug}.title`)}
        subtitle={t(`posts.${post.slug}.excerpt`)}
      />

      <article className="container-narrow px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative mb-10 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={post.image}
            alt={t(`posts.${post.slug}.title`)}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4 text-sm text-white/45">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="mt-8 space-y-6 leading-relaxed text-white/70">
            <p>{t(`posts.${post.slug}.body1`)}</p>
            <p>{t(`posts.${post.slug}.body2`)}</p>
            <p>{t(`posts.${post.slug}.body3`)}</p>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <Link href="/blog" className="text-sm font-semibold text-deweb-cyan hover:underline">
              ← {t("backToBlog")}
            </Link>
            <GlowButton href="/marketplace" variant="primary">
              {t("exploreMarketplace")}
            </GlowButton>
          </div>
        </div>
      </article>
    </>
  );
}
