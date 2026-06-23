import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";

function pathnameToSeoPath(pathname: string): string {
  const match = pathname.match(/^\/(en|es|ru|am)(\/.*)?$/);
  if (!match) return pathname === "" || pathname === "/" ? "/" : pathname;
  return match[2] || "/";
}

function absoluteUrl(locale: string, path: string): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${normalized}`;
}

function buildAlternateLinkHeader(path: string): string {
  const links = locales.map(
    (locale) => `<${absoluteUrl(locale, path)}>; rel="alternate"; hreflang="${locale}"`
  );
  links.push(`<${absoluteUrl("en", path)}>; rel="alternate"; hreflang="x-default"`);
  return links.join(", ");
}

function withSeoAlternateLinks(response: NextResponse, pathname: string): NextResponse {
  response.headers.set("Link", buildAlternateLinkHeader(pathnameToSeoPath(pathname)));
  return response;
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("www.")) {
    const pathname = request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(`https://${host.slice(4)}${pathname}`, 301);
  }

  const { pathname } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  const response = intlMiddleware(request);
  return withSeoAlternateLinks(response, pathname);
}

export const config = {
  matcher: ["/", "/(en|es|ru|am)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
