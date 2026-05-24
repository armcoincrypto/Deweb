"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { blogPosts } from "@/lib/blog-data";

export function BlogView() {
  const t = useTranslations("blog");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} kicker={t("kicker")} />

      <div className="container-narrow px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-panel-glow group relative overflow-hidden"
            >
              <motion.div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={t(`posts.${post.slug}.title`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-full border border-deweb-cyan/30 bg-deweb-bg/80 px-3 py-1 text-xs font-bold text-deweb-cyan backdrop-blur-sm">
                  {post.category}
                </span>
              </motion.div>
              <div className="p-6">
                <motion.div className="flex items-center gap-3 text-xs text-white/40">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </motion.div>
                <h2 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-deweb-cyan">
                  <Link href={`/blog/${post.slug}`}>{t(`posts.${post.slug}.title`)}</Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">
                  {t(`posts.${post.slug}.excerpt`)}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-deweb-cyan hover:underline"
                >
                  {t("readMore")} →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </>
  );
}
