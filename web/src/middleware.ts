import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // Canonical host: non-www apex domain (avoid internal proxy port in redirect URL)
  if (host.startsWith("www.")) {
    const pathname = request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(`https://${host.slice(4)}${pathname}`, 301);
  }

  // Normalize trailing slashes (except root)
  const { pathname } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|es|ru|am)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
