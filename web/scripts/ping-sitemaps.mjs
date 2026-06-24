#!/usr/bin/env node
/** Notify search engines that sitemaps were updated. */
const BASE = (process.env.SEO_AUDIT_BASE_URL || "https://dewebam.com").replace(/\/$/, "");
const SITEMAPS = [`${BASE}/sitemap.xml`, `${BASE}/sitemap-blog.xml`];

const PING_TARGETS = [
  (url) => `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`,
  (url) => `https://www.bing.com/ping?sitemap=${encodeURIComponent(url)}`,
];

async function ping(url) {
  for (const build of PING_TARGETS) {
    const pingUrl = build(url);
    try {
      const res = await fetch(pingUrl, { method: "GET" });
      console.log(`${res.ok ? "✓" : "✗"} ${res.status} ${pingUrl}`);
    } catch (err) {
      console.log(`✗ ${pingUrl} — ${err.message}`);
    }
  }
}

console.log(`Pinging sitemaps for ${BASE}...\n`);
for (const sitemap of SITEMAPS) {
  console.log(`Sitemap: ${sitemap}`);
  await ping(sitemap);
  console.log("");
}
