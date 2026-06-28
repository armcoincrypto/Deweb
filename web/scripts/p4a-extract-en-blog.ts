/**
 * Extract EN blog translatable fields for P4A localization.
 * Usage: cd web && npx tsx scripts/p4a-extract-en-blog.ts
 */
import fs from "fs";
import path from "path";
import { BLOG_ARTICLE_SLUGS } from "../src/lib/blog/article-slugs";
import { getArticle, articleWordCount } from "../src/lib/blog";
import type { BlogTexts } from "../src/lib/i18n/content/types";

const OUT = path.join(__dirname, "p4a/en");

function toBlogTexts(slug: string): BlogTexts | undefined {
  const a = getArticle(slug);
  if (!a) return undefined;
  return {
    title: a.title,
    excerpt: a.excerpt,
    seoTitle: a.seoTitle,
    metaDescription: a.metaDescription,
    category: a.category,
    readTime: a.readTime,
    tags: a.tags,
    intro: a.intro,
    sections: a.sections,
    faqs: a.faqs,
    internalLinks: a.internalLinks,
    cta: a.cta,
  };
}

fs.mkdirSync(OUT, { recursive: true });

const inventory: {
  slug: string;
  title: string;
  wordCount: number;
  internalLinks: { href: string; label: string }[];
  categorySlug: string;
}[] = [];

for (const slug of BLOG_ARTICLE_SLUGS) {
  const a = getArticle(slug);
  if (!a) continue;
  const texts = toBlogTexts(slug)!;
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(texts, null, 2));
  inventory.push({
    slug,
    title: a.title,
    wordCount: articleWordCount(a),
    internalLinks: a.internalLinks,
    categorySlug: a.categorySlug,
  });
}

fs.writeFileSync(path.join(OUT, "_inventory.json"), JSON.stringify(inventory, null, 2));
console.log(`Exported ${inventory.length} articles to ${OUT}`);
