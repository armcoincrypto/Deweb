#!/usr/bin/env node
/**
 * Post-build SEO audit — validates unique titles/descriptions in prerendered HTML.
 * Usage: npm run build && node scripts/seo-audit.mjs
 */
import fs from "fs";
import path from "path";

const APP_DIR = path.join(process.cwd(), ".next/server/app");

const SAMPLE_PAGES = [
  "en.html",
  "en/about.html",
  "en/contact.html",
  "en/services.html",
  "en/marketplace.html",
  "en/blog.html",
  "en/services/ecommerce.html",
  "en/services/ai.html",
  "en/blog/how-competitive-bidding-saves-it-budgets.html",
  "en/services/shopify-development.html",
  "en/services/shopify-store-design.html",
  "en/services/shopify-custom-apps.html",
  "en/services/ai-chatbot-development.html",
  "en/services/ai-business-automation.html",
  "en/services/web-application-development.html",
  "en/services/marketplace-development.html",
  "en/services/saas-development.html",
];

function extract(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"') : null;
}

function auditFile(relPath) {
  const file = path.join(APP_DIR, relPath);
  if (!fs.existsSync(file)) return { path: relPath, error: "missing build output" };

  const html = fs.readFileSync(file, "utf8");
  const title = extract(html, /<title>([^<]*)<\/title>/);
  const description = extract(html, /name="description" content="([^"]*)"/);
  const canonical = extract(html, /rel="canonical" href="([^"]*)"/);
  const ogTitle = extract(html, /property="og:title" content="([^"]*)"/);
  const twitterCard = extract(html, /name="twitter:card" content="([^"]*)"/);
  const h1Count = (html.match(/<h1/g) || []).length;
  const jsonLdCount = (html.match(/application\/ld\+json/g) || []).length;
  const hasOrg = html.includes('"@type":"Organization"') || html.includes('"@type": "Organization"');
  const hasWebSite = html.includes('"@type":"WebSite"') || html.includes('"@type": "WebSite"');
  const hasBreadcrumb = html.includes("BreadcrumbList");

  return {
    path: relPath,
    title,
    description: description?.slice(0, 60) + (description?.length > 60 ? "…" : ""),
    canonical,
    ogTitle: ogTitle === title ? "✓" : "mismatch",
    twitterCard,
    h1Count,
    jsonLdCount,
    hasOrg,
    hasWebSite,
    hasBreadcrumb,
    ok: !!(title && description && canonical && h1Count === 1),
  };
}

const results = SAMPLE_PAGES.map(auditFile);
const titles = results.filter((r) => r.title).map((r) => r.title);
const descriptions = results.filter((r) => r.description).map((r) => r.description);
const dupTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
const dupDescs = descriptions.filter((d, i) => descriptions.indexOf(d) !== i);

console.log("\n=== DEWEB SEO Audit ===\n");
for (const r of results) {
  if (r.error) {
    console.log(`✗ ${r.path}: ${r.error}`);
    continue;
  }
  const status = r.ok ? "✓" : "✗";
  console.log(
    `${status} ${r.path}\n   title: ${r.title}\n   h1: ${r.h1Count} | json-ld: ${r.jsonLdCount} | org: ${r.hasOrg} | breadcrumb: ${r.hasBreadcrumb}`
  );
}

console.log("\n--- Duplicate check (sample) ---");
console.log(`Duplicate titles: ${dupTitles.length ? dupTitles.join(", ") : "none"}`);
console.log(`Duplicate descriptions: ${dupDescs.length ? "found" : "none"}`);
console.log(`Pages audited: ${results.length}`);
console.log(`Passing: ${results.filter((r) => r.ok).length}/${results.length}\n`);

process.exit(results.every((r) => r.ok || r.error) ? 0 : 1);
