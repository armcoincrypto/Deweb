import { fetchCmsSitemapPosts } from "@/lib/blog/cms";
import {
  INDEXABLE_LOCALES,
  absoluteUrl,
  assertCleanSitemapPaths,
  buildLanguageAlternates,
  getBlogSitemapPaths,
} from "@/lib/seo";
import { blogPathLastModified } from "@/lib/sitemap-utils";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const cmsPosts = await fetchCmsSitemapPosts();
  const cmsDates = new Map(cmsPosts.map((p) => [p.slug, p.date]));
  const paths = getBlogSitemapPaths(cmsPosts.map((p) => p.slug));
  assertCleanSitemapPaths(paths);
  const now = new Date();

  const urls: string[] = [];

  for (const locale of INDEXABLE_LOCALES) {
    for (const path of paths) {
      const loc = absoluteUrl(locale, path);
      const lastmod = blogPathLastModified(path, cmsDates, now).toISOString();
      const alternates = buildLanguageAlternates(path);

      const hreflangLinks = Object.entries(alternates)
        .map(
          ([lang, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`
        )
        .join("\n");

      urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
${hreflangLinks}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
