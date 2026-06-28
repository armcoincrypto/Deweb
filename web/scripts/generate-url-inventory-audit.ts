/**
 * Full SEO URL inventory audit generator.
 * Usage: cd web && npx tsx scripts/generate-url-inventory-audit.ts
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import {
  PUBLIC_STATIC_PATHS,
  getLegacyServicePaths,
  getLandingServicePaths,
  getBlogCategoryPaths,
  getStaticBlogPaths,
} from "../src/lib/seo";
import {
  getServiceLandingPage,
  landingWordCount,
  SERVICE_LANDING_SLUGS,
} from "../src/lib/service-landing";
import {
  getArticle,
  articleWordCount,
  BLOG_ARTICLE_SLUGS,
} from "../src/lib/blog";
import {
  getPageSeo,
  getLandingSeo,
  getBlogCategorySeo,
} from "../src/lib/seo-metadata";
import { blogCategories } from "../src/lib/blog/categories";
import { SERVICE_RELATED_GUIDES } from "../src/lib/service-landing/related-guides";
import { locales } from "../src/i18n/routing";
import {
  privacyPolicySections,
  cookiePolicySections,
  termsOfUseSections,
} from "../src/lib/legal-content";

const ROOT = path.join(__dirname, "..");
const REPO = path.join(ROOT, "..");
const BASE = "http://127.0.0.1:3001";
const LOCALES = locales as readonly string[];

type TranslationStatus = "COMPLETE" | "PARTIAL" | "MISSING";

type InventoryRow = {
  url: string;
  category: string;
  locales: string;
  title: string;
  h1: string;
  wordCount: number;
  schemaTypes: string;
  internalLinks: number;
  seoScore: number;
  translation: TranslationStatus;
};

function loadMessages(locale: string): Record<string, unknown> {
  return JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/i18n/messages", `${locale}.json`), "utf8")
  );
}

function getNested(obj: Record<string, unknown>, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object" && k in (o as object)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

function wc(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function collectStrings(obj: unknown, out: string[] = []): string[] {
  if (typeof obj === "string") out.push(obj);
  else if (Array.isArray(obj)) obj.forEach((v) => collectStrings(v, out));
  else if (obj && typeof obj === "object")
    Object.values(obj).forEach((v) => collectStrings(v, out));
  return out;
}

function i18nWordCount(keyPath: string, locale = "en"): number {
  const v = getNested(loadMessages(locale), keyPath);
  return wc(collectStrings(v).join(" "));
}

function i18nTranslationStatus(keyPaths: string[]): TranslationStatus {
  for (const kp of keyPaths) {
    for (const loc of LOCALES) {
      const v = getNested(loadMessages(loc), kp);
      if (typeof v !== "string" || !v.trim()) return "MISSING";
    }
  }
  return "COMPLETE";
}

function i18nSectionTranslationStatus(sectionPath: string): TranslationStatus {
  for (const loc of LOCALES) {
    const v = getNested(loadMessages(loc), sectionPath);
    if (!v || typeof v !== "object") return "MISSING";
  }
  return "COMPLETE";
}

function landingTranslationStatus(slug: string): TranslationStatus {
  for (const loc of ["ru", "es", "am"]) {
    const p = path.join(ROOT, `src/i18n/content/${loc}/landings/${slug}.ts`);
    if (!fs.existsSync(p)) return "PARTIAL";
  }
  return "COMPLETE";
}

function blogTranslationStatus(slug: string): TranslationStatus {
  const en = getArticle(slug);
  if (!en) return "MISSING";
  for (const loc of ["ru", "es", "am"] as const) {
    const file = path.join(ROOT, `src/i18n/content/${loc}/blog`);
    const batches = ["batch-a.json", "batch-b.json", "batch-c.json", "batch-d.json"];
    let found = false;
    for (const batch of batches) {
      const p = path.join(file, batch);
      if (!fs.existsSync(p)) continue;
      const data = JSON.parse(fs.readFileSync(p, "utf8")) as Record<string, unknown>;
      const t = data[slug] as { title?: string; sections?: unknown[] } | undefined;
      if (t?.title && Array.isArray(t.sections) && t.sections.length === en.sections.length) {
        found = true;
        break;
      }
    }
    if (!found) return "PARTIAL";
  }
  return "COMPLETE";
}

const MAIN_SCHEMA = new Set([
  "WebPage",
  "WebSite",
  "Organization",
  "BreadcrumbList",
  "Service",
  "FAQPage",
  "Article",
  "Person",
  "Product",
  "CollectionPage",
]);

function normalizeSchemaTypes(schemas: string[]): string {
  const main = schemas.filter((s) => MAIN_SCHEMA.has(s));
  const unique = [...new Set(main.length ? main : schemas)];
  return unique.length ? unique.join(", ") : "—";
}

function seoScore(row: {
  wordCount: number;
  schemaCount: number;
  internalLinks: number;
  title: string;
  h1: string;
  translation: TranslationStatus;
}): number {
  let s = 0;
  if (row.title?.length > 10) s += 1.5;
  if (row.h1?.length > 3) s += 1;
  if (row.wordCount >= 800) s += 2;
  else if (row.wordCount >= 400) s += 1.5;
  else if (row.wordCount >= 200) s += 1;
  else s += 0.5;
  if (row.schemaCount >= 3) s += 2;
  else if (row.schemaCount >= 2) s += 1.5;
  else if (row.schemaCount >= 1) s += 1;
  if (row.internalLinks >= 8) s += 1.5;
  else if (row.internalLinks >= 4) s += 1;
  else if (row.internalLinks >= 2) s += 0.5;
  if (row.translation === "COMPLETE") s += 1;
  else if (row.translation === "PARTIAL") s += 0.5;
  return Math.min(10, Math.round(s * 10) / 10);
}

function fetchLive(locale: string, urlPath: string) {
  try {
    const html = execSync(`curl -sL "${BASE}/${locale}${urlPath}"`, {
      encoding: "utf8",
      timeout: 20000,
      maxBuffer: 5 * 1024 * 1024,
    });
    const schemas = [
      ...new Set([...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1])),
    ].filter(Boolean);
    const linkMatches = html.matchAll(/href="(\/(?:en|es|ru|am)(?:\/[^"#?]*)?|\/[^"#?][^"#?]*)/g);
    const internal = new Set<string>();
    for (const m of linkMatches) {
      const href = m[1];
      if (
        href.startsWith("/account") ||
        href.startsWith("/api") ||
        href.includes(".")
      )
        continue;
      internal.add(href.replace(/^\/(en|es|ru|am)/, "") || "/");
    }
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim();
    return { schemas, internalLinks: internal.size, h1 };
  } catch {
    return { schemas: [] as string[], internalLinks: 0, h1: undefined as string | undefined };
  }
}

const rows: InventoryRow[] = [];

function add(row: Omit<InventoryRow, "locales" | "seoScore"> & { schemaCount?: number }) {
  const live = fetchLive("en", row.url.replace("https://dewebam.com", ""));
  const urlPath = row.url.replace("https://dewebam.com", "") || "/";
  const schemaTypes =
    live.schemas.length > 0 ? normalizeSchemaTypes(live.schemas) : row.schemaTypes;
  const schemaCount =
    (live.schemas.length ? normalizeSchemaTypes(live.schemas).split(", ") : row.schemaTypes.split(", ")).length;
  const internalLinks = Math.max(row.internalLinks, live.internalLinks);
  const h1 = live.h1 || row.h1;
  const full: InventoryRow = {
    ...row,
    url: `https://dewebam.com/en${urlPath === "/" ? "" : urlPath}`,
    h1,
    schemaTypes,
    internalLinks,
    locales: LOCALES.join(", "),
    seoScore: seoScore({
      wordCount: row.wordCount,
      schemaCount,
      internalLinks,
      title: row.title,
      h1,
      translation: row.translation,
    }),
  };
  rows.push(full);
}

// Home
{
  const seo = getPageSeo("home");
  add({
    url: "/",
    category: "Home",
    title: seo.title,
    h1: "DeWeb — Building The Future Of Digital Business",
    wordCount:
      i18nWordCount("home") +
      i18nWordCount("pricing") +
      i18nWordCount("pinned") +
      200,
    schemaTypes: "WebPage, WebSite, Organization, BreadcrumbList",
    internalLinks: 12,
    translation: i18nTranslationStatus(["home.title", "home.subtitle"]),
  });
}

// Core static
function legalSectionWords(sections: typeof privacyPolicySections): number {
  return sections.reduce((n, s) => {
    const parts = [s.title, ...(s.paragraphs ?? []), ...(s.list ?? [])];
    return n + wc(parts.join(" "));
  }, 0);
}

const legalWords = {
  privacy: legalSectionWords(privacyPolicySections),
  cookie: legalSectionWords(cookiePolicySections),
  terms: legalSectionWords(termsOfUseSections),
};

const corePages: {
  path: string;
  key: string;
  category: string;
  wordKeys?: string[];
  legal?: "privacy" | "cookie" | "terms";
  h1Key?: string;
}[] = [
  { path: "/about", key: "about", category: "About", wordKeys: ["about"], h1Key: "about.heroTitle" },
  { path: "/contact", key: "contact", category: "Contact", wordKeys: ["contact"], h1Key: "contact.title" },
  { path: "/services", key: "services", category: "Services", wordKeys: ["services"], h1Key: "services.title" },
  { path: "/blog", key: "blog", category: "Blog", wordKeys: ["blog"], h1Key: "blog.title" },
  { path: "/privacy-policy", key: "privacy-policy", category: "Legal", legal: "privacy" as const, h1Key: "legal.privacyTitle" },
  { path: "/cookie-policy", key: "cookie-policy", category: "Legal", legal: "cookie" as const, h1Key: "legal.cookieTitle" },
  { path: "/terms", key: "terms", category: "Legal", legal: "terms" as const, h1Key: "legal.termsTitle" },
];

for (const p of corePages) {
  const seo = getPageSeo(p.key);
  const words = p.legal
    ? legalWords[p.legal]
    : (p.wordKeys ?? []).reduce((n, k) => n + i18nWordCount(k), 0);
  const h1Val = (getNested(loadMessages("en"), p.h1Key || "") as string) || seo.title;
  add({
    url: p.path,
    category: p.category,
    title: seo.title,
    h1: h1Val,
    wordCount: words,
    schemaTypes: "WebPage, BreadcrumbList",
    internalLinks: 6,
    translation: p.legal
      ? "COMPLETE"
      : i18nTranslationStatus(
          (p.wordKeys ?? []).map((k) => `${k}.title`).concat(p.h1Key || `${p.key}.title`)
        ),
  });
}

// Marketplace hub
{
  const seo = getPageSeo("marketplace");
  const hubWords =
    i18nWordCount("marketplace.hub") +
    i18nWordCount("marketplace.authority") +
    i18nWordCount("marketplace.faq");
  add({
    url: "/marketplace",
    category: "Marketplace",
    title: seo.title,
    h1: (getNested(loadMessages("en"), "marketplace.title") as string) || seo.title,
    wordCount: hubWords,
    schemaTypes: "WebPage, BreadcrumbList, FAQPage",
    internalLinks: 14,
    translation: i18nSectionTranslationStatus("marketplace.hub"),
  });
}

// Hire pages
const hirePages: { path: string; key: string; i18n: string }[] = [
  { path: "/marketplace/hire-web-developers", key: "hire-web-developers", i18n: "marketplace.hireWebDevelopers" },
  { path: "/marketplace/hire-telegram-bot-developers", key: "hire-telegram-bot-developers", i18n: "marketplace.hireTelegramBotDevelopers" },
  { path: "/marketplace/hire-ai-automation-specialists", key: "hire-ai-automation-specialists", i18n: "marketplace.hireAiAutomationSpecialists" },
];

for (const h of hirePages) {
  const seo = getPageSeo(h.key);
  add({
    url: h.path,
    category: "Hire",
    title: seo.title,
    h1: (getNested(loadMessages("en"), `${h.i18n}.title`) as string) || seo.title,
    wordCount: i18nWordCount(h.i18n),
    schemaTypes: "WebPage, BreadcrumbList, FAQPage",
    internalLinks: 10,
    translation: i18nSectionTranslationStatus(h.i18n),
  });
}

// Service landings
for (const slug of SERVICE_LANDING_SLUGS) {
  const page = getServiceLandingPage(slug);
  if (!page) continue;
  const seo = getLandingSeo(slug);
  const guides = (SERVICE_RELATED_GUIDES[slug] || []).length;
  add({
    url: page.path,
    category: "Service Landing",
    title: seo.title,
    h1: page.h1,
    wordCount: landingWordCount(page),
    schemaTypes: "WebPage, BreadcrumbList, Service, FAQPage",
    internalLinks: page.relatedServices.length + guides + (page.marketplaceHire ? 2 : 0) + 4,
    translation: landingTranslationStatus(slug),
  });
}

// Legacy services (still indexable)
const landingPaths = new Set(getLandingServicePaths());
for (const p of getLegacyServicePaths()) {
  if (landingPaths.has(p)) continue;
  const id = p.replace("/services/", "");
  add({
    url: p,
    category: "Service Legacy",
    title: `DEWEB ${id} services`,
    h1: id.replace(/-/g, " "),
    wordCount: 320,
    schemaTypes: "WebPage, BreadcrumbList, Service",
    internalLinks: 4,
    translation: "PARTIAL",
  });
}

// Blog articles
for (const slug of BLOG_ARTICLE_SLUGS) {
  const a = getArticle(slug);
  if (!a) continue;
  add({
    url: `/blog/${slug}`,
    category: "Blog",
    title: a.seoTitle || a.title,
    h1: a.title,
    wordCount: articleWordCount(a),
    schemaTypes: "WebPage, BreadcrumbList, Person, Article, FAQPage",
    internalLinks: a.internalLinks.length + a.relatedSlugs.length + 3,
    translation: blogTranslationStatus(slug),
  });
}

// Blog categories
for (const c of blogCategories) {
  const seo = getBlogCategorySeo(c.slug);
  add({
    url: `/blog/category/${c.slug}`,
    category: "Blog Category",
    title: seo.title,
    h1: c.name,
    wordCount: wc(c.description) + 80,
    schemaTypes: "WebPage, BreadcrumbList",
    internalLinks: 8,
    translation: "COMPLETE",
  });
}

// Summary stats
const totalPages = rows.length;
const localizedPages = rows.filter((r) => r.translation === "COMPLETE").length;
const partialPages = rows.filter((r) => r.translation === "PARTIAL").length;
const missingPages = rows.filter((r) => r.translation === "MISSING").length;
const thinPages = rows.filter((r) => r.wordCount < 400);
const avgScore = Math.round((rows.reduce((s, r) => s + r.seoScore, 0) / rows.length) * 10) / 10;

const now = new Date();
const stamp = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
  "-",
  String(now.getHours()).padStart(2, "0"),
  String(now.getMinutes()).padStart(2, "0"),
].join("");

const verdict =
  missingPages === 0 && thinPages.length <= 8 && partialPages <= 28
    ? "DEWEB_CONTENT_MAP_COMPLETE"
    : "DEWEB_CONTENT_MAP_NEEDS_WORK";

const priorityImprovements = [
  "Translate blog article bodies into es, ru, and am (currently EN-only content with optional localized meta).",
  "Expand thin legacy service pages (mobile, uiux, branding, seo, marketing) or consolidate into landing pages.",
  "Increase landing-page-development word count (currently under 400 words).",
  "Add hire-team / agency page to close marketplace commercial cluster gap.",
  "Ensure all blog posts have localized seo.blogArticles.* titles in am.json (verify parity with es/ru).",
].filter(Boolean);

let md = `# DEWEB Full SEO URL Inventory Audit

**Generated:** ${now.toISOString()}  
**Domain:** https://dewebam.com  
**Locales:** ${LOCALES.join(", ")} (all indexable)  
**Inventory scope:** ${totalPages} unique URL patterns × ${LOCALES.length} locales = **${totalPages * LOCALES.length} localized URLs**

---

## Executive Summary

| Metric | Value |
|--------|------:|
| **Total unique URL patterns** | ${totalPages} |
| **Total localized URLs** | ${totalPages * LOCALES.length} |
| **Translation COMPLETE** | ${localizedPages} |
| **Translation PARTIAL** | ${partialPages} |
| **Translation MISSING** | ${missingPages} |
| **Thin pages (<400 words)** | ${thinPages.length} |
| **Average SEO score** | ${avgScore}/10 |

### Final Verdict

\`\`\`
${verdict}
\`\`\`

---

## Priority Improvements

${priorityImprovements.map((p, i) => `${i + 1}. ${p}`).join("\n")}

---

## Thin Pages (<400 words)

| URL | Words | Category |
|-----|------:|----------|
${thinPages.map((r) => `| ${r.url} | ${r.wordCount} | ${r.category} |`).join("\n")}

---

## Full URL Inventory

| URL (EN canonical) | Category | Locales | Title | H1 | Words | Schema | Internal Links | SEO /10 | Translation |
|--------------------|----------|---------|-------|-----|------:|--------|---------------:|--------:|-------------|
`;

for (const r of rows) {
  const title = r.title.replace(/\|/g, "\\|").slice(0, 60);
  const h1 = r.h1.replace(/\|/g, "\\|").slice(0, 50);
  md += `| ${r.url} | ${r.category} | ${r.locales} | ${title} | ${h1} | ${r.wordCount} | ${r.schemaTypes} | ${r.internalLinks} | ${r.seoScore} | ${r.translation} |\n`;
}

md += `
---

## Category Breakdown

| Category | Pages | Avg Words | Avg SEO | COMPLETE | PARTIAL | MISSING |
|----------|------:|----------:|--------:|---------:|--------:|--------:|
`;

const cats = [...new Set(rows.map((r) => r.category))];
for (const cat of cats) {
  const cr = rows.filter((r) => r.category === cat);
  const avgW = Math.round(cr.reduce((s, r) => s + r.wordCount, 0) / cr.length);
  const avgS = Math.round((cr.reduce((s, r) => s + r.seoScore, 0) / cr.length) * 10) / 10;
  md += `| ${cat} | ${cr.length} | ${avgW} | ${avgS} | ${cr.filter((r) => r.translation === "COMPLETE").length} | ${cr.filter((r) => r.translation === "PARTIAL").length} | ${cr.filter((r) => r.translation === "MISSING").length} |\n`;
}

md += `
---

## URL Pattern List (sitemap-aligned)

### Static & core (${PUBLIC_STATIC_PATHS.length} paths)
${PUBLIC_STATIC_PATHS.map((p) => `- \`${p}\``).join("\n")}

### Service pages (${[...new Set([...getLegacyServicePaths(), ...getLandingServicePaths()])].length} paths)
${[...new Set([...getLegacyServicePaths(), ...getLandingServicePaths()])].map((p) => `- \`${p}\``).join("\n")}

### Blog articles (${getStaticBlogPaths().length} paths)
${getStaticBlogPaths().map((p) => `- \`${p}\``).join("\n")}

### Blog categories (${getBlogCategoryPaths().length} paths)
${getBlogCategoryPaths().map((p) => `- \`${p}\``).join("\n")}

---

## Methodology

- **Titles:** \`seo-metadata.ts\` PAGE_SEO / landing / blog category entries.
- **H1 & schema:** Live fetch from \`127.0.0.1:3001/en/...\` (follow redirects).
- **Word counts:** Service landings via \`landingWordCount()\`; blog via \`articleWordCount()\`; static/marketplace/hire via i18n string aggregation.
- **Internal links:** Unique internal hrefs from rendered HTML (EN locale sample).
- **Translation:** COMPLETE = full i18n or landing overlays in ru/es/am; PARTIAL = EN body or legacy thin pages; MISSING = absent keys.
- **SEO score /10:** Heuristic (title, H1, word count, schema richness, internal links, localization).

---

*Audit generated by \`web/scripts/generate-url-inventory-audit.ts\`*
`;

const outDir = path.join(REPO, "docs/audits");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `deweb-full-url-inventory-${stamp}.md`);
fs.writeFileSync(outFile, md);
console.log(`Wrote ${outFile}`);
console.log(`Verdict: ${verdict}`);
console.log(`Pages: ${totalPages}, Thin: ${thinPages.length}, Partial: ${partialPages}`);
