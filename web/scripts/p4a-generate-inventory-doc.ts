/**
 * Generate P4A blog localization inventory markdown.
 * Usage: cd web && npx tsx scripts/p4a-generate-inventory-doc.ts
 */
import fs from "fs";
import path from "path";
import { BLOG_ARTICLE_SLUGS } from "../src/lib/blog/article-slugs";
import { getArticle, articleWordCount } from "../src/lib/blog";

const BATCHES: Record<string, string[]> = {
  A: [
    "telegram-bot-development-guide",
    "ai-automation-for-ecommerce",
    "ai-chatbots-for-business",
    "how-to-hire-software-developers",
    "how-to-build-a-marketplace-website",
  ],
  B: [
    "shopify-development-cost-2026",
    "shopify-vs-woocommerce",
    "best-shopify-apps",
    "shopify-plus-vs-standard",
    "headless-commerce-guide",
  ],
  C: [
    "custom-web-application-development",
    "saas-development-guide",
    "best-ecommerce-platforms",
    "future-of-ai-in-business",
    "nextjs-vs-wordpress",
  ],
  D: [
    "mvp-development-cost-guide",
    "technical-seo-for-ecommerce",
    "marketplace-monetization-strategies",
    "outsourcing-software-development-2026",
    "competitive-bidding-it-projects",
  ],
};

const SERVICE_CLUSTER: Record<string, string> = {
  shopify: "Shopify / E-commerce",
  ai: "AI & Automation",
  "web-development": "Web / SaaS",
  marketplace: "Marketplace",
  saas: "SaaS",
};

const now = new Date();
const stamp = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
  "-",
  String(now.getHours()).padStart(2, "0"),
  String(now.getMinutes()).padStart(2, "0"),
].join("");

let md = `# DEWEB P4A Blog Localization Inventory

**Generated:** ${now.toISOString()}  
**Scope:** 20 static blog articles × 3 locales (RU, ES, AM)

---

## Article Inventory

| Slug | EN Title | Words | RU | ES | AM | Batch | Cluster | Internal Links |
|------|----------|------:|:--:|:--:|:--:|-------|---------|----------------|
`;

for (const slug of BLOG_ARTICLE_SLUGS) {
  const a = getArticle(slug)!;
  const batch = Object.entries(BATCHES).find(([, slugs]) => slugs.includes(slug))?.[0] ?? "?";
  const links = a.internalLinks.map((l) => `\`${l.href}\``).join(", ");
  md += `| \`${slug}\` | ${a.title.slice(0, 55)} | ${articleWordCount(a)} | MISSING | MISSING | MISSING | ${batch} | ${SERVICE_CLUSTER[a.categorySlug] ?? a.categorySlug} | ${links} |\n`;
}

md += `
---

## Storage Pattern

| Layer | Path |
|-------|------|
| EN base bodies | \`web/src/lib/blog/articles/*.ts\` |
| RU / ES / AM overlays | \`web/src/i18n/content/{locale}/blog/batch-{a-d}.json\` |
| Loader | \`getLocalizedBlogArticle()\` in \`web/src/lib/i18n/content/index.ts\` |
| Merge | \`mergeBlogArticle()\` in \`web/src/lib/i18n/content/merge.ts\` |

---

## Batch Plan

${Object.entries(BATCHES)
  .map(([k, slugs]) => `- **Batch ${k}:** ${slugs.map((s) => `\`${s}\``).join(", ")}`)
  .join("\n")}

---

*Pre-translation inventory — status updated in final P4A report after localization.*
`;

const out = path.join(__dirname, "../../docs/audits", `deweb-p4a-blog-localization-inventory-${stamp}.md`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(`Wrote ${out}`);
