#!/usr/bin/env node
/**
 * DEWEB SEO audit — validates sitemaps, robots.txt, and page metadata on a live site.
 *
 * Usage:
 *   npm run seo:audit
 *   npm run seo:audit -- --base=https://dewebam.com
 *   npm run seo:audit -- --base=http://localhost:3001 --limit=20
 */

const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith("--base="));
const limitArg = args.find((a) => a.startsWith("--limit="));
const BASE = (baseArg?.split("=")[1] || process.env.SEO_AUDIT_BASE_URL || "https://dewebam.com").replace(/\/$/, "");
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : 0;
const LOCALES = ["en", "es", "ru", "am"];
const HREFLANG = [...LOCALES, "x-default"];
const BLOCKED_PREFIXES = ["/account", "/dashboard", "/admin", "/login", "/signup", "/pricing", "/api"];
const CONCURRENCY = 12;

function decodeXml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "DEWEB-SEO-Audit/1.0" } });
  const text = await res.text();
  return { status: res.status, url: res.url, text, headers: res.headers };
}

function parseLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeXml(m[1].trim()));
}

function parseDisallows(robots) {
  const rules = [];
  let agent = "*";
  for (const line of robots.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [key, ...rest] = t.split(":");
    const val = rest.join(":").trim();
    if (key.toLowerCase() === "user-agent") agent = val;
    if (key.toLowerCase() === "disallow" && agent === "*") rules.push(val);
  }
  return rules;
}

function pathFromUrl(url) {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/^\/(en|es|ru|am)(\/.*)?$/);
    return m ? m[2] || "/" : u.pathname;
  } catch {
    return url;
  }
}

function isBlockedByRobots(url, disallows) {
  const path = pathFromUrl(url);
  const fullPath = path === "/" ? "" : path;
  for (const locale of LOCALES) {
    const localePath = `/${locale}${fullPath}`;
    for (const rule of disallows) {
      if (!rule) continue;
      if (localePath === rule || localePath.startsWith(rule.replace(/\/$/, ""))) return true;
      if (localePath.startsWith(rule)) return true;
    }
  }
  return false;
}

function extractMeta(html) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
    null;
  const canonical =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1] ??
    html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i)?.[1] ??
    null;
  const robotsRaw =
    html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i)?.[1] ??
    "";
  const ogTitle =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? null;
  const twitterCard =
    html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? null;
  const hreflang = [...html.matchAll(/hreflang=["']([^"']+)["']/gi)].map((m) => m[1]);
  const hasOrg = html.includes('"@type":"Organization"') || html.includes('"@type": "Organization"');
  const hasWebSite = html.includes('"@type":"WebSite"') || html.includes('"@type": "WebSite"');
  const hasBreadcrumb = html.includes("BreadcrumbList");
  const hasArticle = html.includes('"@type":"Article"') || html.includes('"@type": "Article"');
  const hasService = html.includes('"@type":"Service"') || html.includes('"@type": "Service"');

  const noindex = /noindex/i.test(robotsRaw);
  const indexFollow = !noindex && /index/i.test(robotsRaw) && /follow/i.test(robotsRaw);

  return {
    title: title ? decodeXml(title) : null,
    description: description ? decodeXml(description) : null,
    canonical: canonical ? decodeXml(canonical) : null,
    robotsRaw,
    indexFollow: noindex ? false : robotsRaw ? indexFollow : true,
    noindex,
    ogTitle: ogTitle ? decodeXml(ogTitle) : null,
    twitterCard,
    hreflang: [...new Set(hreflang)],
    hasOrg,
    hasWebSite,
    hasBreadcrumb,
    hasArticle,
    hasService,
  };
}

async function auditUrl(url) {
  const issues = [];
  try {
    const { status, text, url: finalUrl } = await fetchText(url);
    if (status !== 200) issues.push(`HTTP ${status}`);
    if (finalUrl !== url && !finalUrl.replace(/\/$/, "").endsWith(url.replace(/\/$/, ""))) {
      issues.push(`redirected to ${finalUrl}`);
    }
    if (url.includes("localhost") || url.includes("127.0.0.1")) issues.push("localhost URL");
    if (!url.startsWith("https://dewebam.com") && BASE.includes("dewebam.com")) {
      issues.push("not https://dewebam.com");
    }

    const meta = extractMeta(text);
    if (!meta.title) issues.push("missing title");
    if (!meta.description) issues.push("missing description");
    if (!meta.canonical) issues.push("missing canonical");
    else {
      if (meta.canonical.includes("localhost")) issues.push("canonical has localhost");
      if (BASE.includes("dewebam.com") && !meta.canonical.startsWith("https://dewebam.com")) {
        issues.push(`canonical not dewebam.com: ${meta.canonical}`);
      }
      const canonPath = pathFromUrl(meta.canonical);
      const pagePath = pathFromUrl(url);
      const urlLocale = url.match(/\/(en|es|ru|am)\//)?.[1] ?? url.match(/\/(en|es|ru|am)$/)?.[1];
      const canonLocale = meta.canonical.match(/\/(en|es|ru|am)\//)?.[1] ?? meta.canonical.match(/\/(en|es|ru|am)$/)?.[1];
      if (urlLocale && canonLocale && urlLocale !== canonLocale) {
        issues.push(`canonical locale mismatch (${canonLocale} vs ${urlLocale})`);
      }
      if (canonPath !== pagePath && !issues.some((i) => i.startsWith("redirected"))) {
        // allow trailing slash normalization only
        if (canonPath.replace(/\/$/, "") !== pagePath.replace(/\/$/, "")) {
          issues.push(`canonical path mismatch: ${canonPath}`);
        }
      }
    }
    if (meta.noindex) issues.push("noindex");
    if (!meta.ogTitle) issues.push("missing og:title");
    if (!meta.twitterCard) issues.push("missing twitter:card");
    for (const lang of HREFLANG) {
      if (!meta.hreflang.includes(lang)) issues.push(`missing hreflang ${lang}`);
    }

    return { url, status, issues, meta };
  } catch (err) {
    return { url, status: 0, issues: [`fetch error: ${err.message}`], meta: null };
  }
}

async function pool(items, fn, size) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, worker));
  return results;
}

async function main() {
  console.log(`\n=== DEWEB SEO Audit ===`);
  console.log(`Base: ${BASE}\n`);

  const robotsRes = await fetchText(`${BASE}/robots.txt`);
  const disallows = parseDisallows(robotsRes.text);
  const sitemapLines = robotsRes.text.match(/^Sitemap:\s*(.+)$/gim)?.map((l) => l.split(":").slice(1).join(":").trim()) ?? [];

  console.log("--- robots.txt ---");
  console.log(`Status: ${robotsRes.status}`);
  console.log(`Disallow rules: ${disallows.length}`);
  console.log(`Sitemaps declared: ${sitemapLines.join(", ") || "none"}`);
  if (!sitemapLines.some((s) => s.includes("sitemap.xml"))) {
    console.log("⚠ Missing Sitemap: sitemap.xml in robots.txt");
  }
  if (!sitemapLines.some((s) => s.includes("sitemap-blog.xml"))) {
    console.log("⚠ Missing Sitemap: sitemap-blog.xml in robots.txt");
  }

  const sitemapMain = await fetchText(`${BASE}/sitemap.xml`);
  const sitemapBlog = await fetchText(`${BASE}/sitemap-blog.xml`);
  const mainUrls = parseLocs(sitemapMain.text);
  const blogUrls = parseLocs(sitemapBlog.text);
  const allUrls = [...mainUrls, ...blogUrls];
  const urlsToCheck = LIMIT > 0 ? allUrls.slice(0, LIMIT) : allUrls;

  console.log("\n--- Sitemaps ---");
  console.log(`sitemap.xml: ${sitemapMain.status} — ${mainUrls.length} URLs`);
  console.log(`sitemap-blog.xml: ${sitemapBlog.status} — ${blogUrls.length} URLs`);
  console.log(`Total sitemap URLs: ${allUrls.length}`);

  const sitemapIssues = [];
  for (const url of allUrls) {
    if (url.includes("localhost") || url.includes("127.0.0.1")) sitemapIssues.push(`${url}: localhost in sitemap`);
    if (BASE.includes("dewebam.com") && !url.startsWith("https://dewebam.com")) {
      sitemapIssues.push(`${url}: not https://dewebam.com`);
    }
    const localeOk = LOCALES.some((l) => url.startsWith(`${BASE}/${l}`) || url === `${BASE}/${l}`);
    if (!localeOk) sitemapIssues.push(`${url}: missing locale prefix`);
    if (isBlockedByRobots(url, disallows)) sitemapIssues.push(`${url}: blocked by robots.txt`);
    for (const prefix of BLOCKED_PREFIXES) {
      if (pathFromUrl(url).startsWith(prefix)) sitemapIssues.push(`${url}: private path ${prefix}`);
    }
  }

  if (sitemapIssues.length) {
    console.log(`\n⚠ Sitemap URL issues (${sitemapIssues.length}):`);
    for (const issue of sitemapIssues.slice(0, 20)) console.log(`  - ${issue}`);
    if (sitemapIssues.length > 20) console.log(`  ... and ${sitemapIssues.length - 20} more`);
  } else {
    console.log("Sitemap URL hygiene: OK (no localhost, correct domain, no blocked paths)");
  }

  console.log(`\n--- Auditing ${urlsToCheck.length} page(s) ---`);
  const pageResults = await pool(urlsToCheck, auditUrl, CONCURRENCY);

  const ok200 = pageResults.filter((r) => r.status === 200).length;
  const withCanonical = pageResults.filter((r) => r.meta?.canonical).length;
  const indexFollow = pageResults.filter((r) => r.meta?.indexFollow).length;
  const withTitle = pageResults.filter((r) => r.meta?.title).length;
  const withDesc = pageResults.filter((r) => r.meta?.description).length;
  const withHreflang = pageResults.filter((r) => HREFLANG.every((h) => r.meta?.hreflang.includes(h))).length;
  const problems = pageResults.filter((r) => r.issues.length > 0);

  console.log("\n--- Results ---");
  console.log(`Total checked:     ${pageResults.length}`);
  console.log(`HTTP 200:          ${ok200}/${pageResults.length}`);
  console.log(`Has title:         ${withTitle}/${pageResults.length}`);
  console.log(`Has description:   ${withDesc}/${pageResults.length}`);
  console.log(`Has canonical:     ${withCanonical}/${pageResults.length}`);
  console.log(`index,follow:      ${indexFollow}/${pageResults.length}`);
  console.log(`Full hreflang set: ${withHreflang}/${pageResults.length}`);
  console.log(`Pages with issues: ${problems.length}`);

  if (problems.length) {
    console.log("\n--- Issues (first 25) ---");
    for (const p of problems.slice(0, 25)) {
      console.log(`\n✗ ${p.url}`);
      for (const issue of p.issues) console.log(`    • ${issue}`);
    }
    if (problems.length > 25) console.log(`\n... and ${problems.length - 25} more pages with issues`);
  }

  const exitOk = sitemapIssues.length === 0 && problems.length === 0 && ok200 === pageResults.length;
  console.log(exitOk ? "\n✓ SEO audit passed\n" : "\n✗ SEO audit found problems\n");
  process.exit(exitOk ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
