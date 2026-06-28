/**
 * Validate localized blog batch JSON files.
 * Usage: cd web && npx tsx scripts/p4a-validate-blog-locale.ts ru
 */
import fs from "fs";
import path from "path";
import { BLOG_ARTICLE_SLUGS } from "../src/lib/blog/article-slugs";
import { getArticle } from "../src/lib/blog";
import type { BlogTexts } from "../src/lib/i18n/content/types";

const locale = process.argv[2];
if (!locale || !["ru", "es", "am"].includes(locale)) {
  console.error("Usage: npx tsx scripts/p4a-validate-blog-locale.ts <ru|es|am>");
  process.exit(1);
}

const dir = path.join(__dirname, "../src/i18n/content", locale, "blog");
const batches = ["batch-a.json", "batch-b.json", "batch-c.json", "batch-d.json"];
let errors = 0;

function wc(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function validateSlug(slug: string, data: BlogTexts): string[] {
  const issues: string[] = [];
  const en = getArticle(slug);
  if (!en) {
    issues.push("missing EN base");
    return issues;
  }
  if (!data.title?.trim()) issues.push("missing title");
  if (!data.excerpt?.trim()) issues.push("missing excerpt");
  if (!data.intro?.length) issues.push("missing intro");
  if (data.sections?.length !== en.sections.length) {
    issues.push(`section count ${data.sections?.length} != EN ${en.sections.length}`);
  }
  if (data.faqs?.length !== en.faqs.length) {
    issues.push(`faq count ${data.faqs?.length} != EN ${en.faqs.length}`);
  }
  if (data.internalLinks?.length !== en.internalLinks.length) {
    issues.push(`internalLinks count mismatch`);
  }
  for (const link of data.internalLinks ?? []) {
    if (!link.href.startsWith("/")) issues.push(`bad href ${link.href}`);
    if (link.href.includes("custom-web-development")) issues.push(`invalid href ${link.href}`);
  }
  const body = [
    data.title,
    data.excerpt,
    ...(data.intro ?? []),
    ...(data.sections ?? []).flatMap((s) => [s.title, ...(s.paragraphs ?? [])]),
  ].join(" ");
  if (/\b(the|and|with|your|business|development)\b/i.test(body) && locale !== "en") {
    // heuristic only for long EN leakage
    const enWords = (body.match(/\b(the|and|with|your)\b/gi) ?? []).length;
    const total = wc(body);
    if (enWords / total > 0.08) issues.push("possible EN leakage (heuristic)");
  }
  return issues;
}

const allSlugs = new Set<string>();

for (const batch of batches) {
  const file = path.join(dir, batch);
  if (!fs.existsSync(file)) {
    console.error(`MISSING ${file}`);
    errors++;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, BlogTexts>;
  for (const [slug, texts] of Object.entries(data)) {
    allSlugs.add(slug);
    const issues = validateSlug(slug, texts);
    if (issues.length) {
      console.error(`${batch} ${slug}: ${issues.join("; ")}`);
      errors++;
    } else {
      console.log(`OK ${slug}`);
    }
  }
}

for (const slug of BLOG_ARTICLE_SLUGS) {
  if (!allSlugs.has(slug)) {
    console.error(`MISSING slug ${slug}`);
    errors++;
  }
}

console.log(errors ? `\n${errors} validation issue(s)` : "\nAll blog translations valid");
process.exit(errors ? 1 : 0);
