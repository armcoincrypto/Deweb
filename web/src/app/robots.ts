import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

/** Private route prefixes — block crawl budget on auth/account areas. */
const PRIVATE_PREFIXES = [
  "/account",
  "/dashboard",
  "/admin",
  "/login",
  "/signup",
  "/pricing",
];

function privateDisallowPaths(): string[] {
  const paths: string[] = ["/api", "/api/"];
  for (const locale of locales) {
    for (const prefix of PRIVATE_PREFIXES) {
      paths.push(`/${locale}${prefix}`);
      paths.push(`/${locale}${prefix}/`);
    }
  }
  return paths;
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: privateDisallowPaths(),
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-blog.xml`],
    host: SITE_URL,
  };
}
