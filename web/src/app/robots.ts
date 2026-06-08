import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

/** Private route prefixes — block crawl budget on auth/account areas. */
const PRIVATE_PREFIXES = ["/account", "/dashboard", "/admin", "/login", "/signup"];

function privateDisallowPaths(): string[] {
  const paths: string[] = [];
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
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
