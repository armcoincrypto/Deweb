import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";

/** Absolute favicon URL — required for Google Search favicon discovery. */
function faviconUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/** DEWEB logo favicon set — generated from public/brand-logo.png via npm run favicons */
export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: faviconUrl("/favicon.ico"), type: "image/x-icon" },
    { url: faviconUrl("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
    { url: faviconUrl("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
    { url: faviconUrl("/android-chrome-192x192.png"), sizes: "192x192", type: "image/png" },
    { url: faviconUrl("/android-chrome-512x512.png"), sizes: "512x512", type: "image/png" },
  ],
  shortcut: [{ url: faviconUrl("/favicon.ico"), type: "image/x-icon" }],
  apple: [{ url: faviconUrl("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
};

/** Static link tags for legacy crawlers — mirrors siteIcons with absolute URLs. */
export const legacyFaviconHead = `
  <link rel="icon" type="image/x-icon" href="${faviconUrl("/favicon.ico")}">
  <link rel="icon" type="image/png" sizes="32x32" href="${faviconUrl("/favicon-32x32.png")}">
  <link rel="icon" type="image/png" sizes="16x16" href="${faviconUrl("/favicon-16x16.png")}">
  <link rel="shortcut icon" type="image/x-icon" href="${faviconUrl("/favicon.ico")}">
  <link rel="apple-touch-icon" sizes="180x180" href="${faviconUrl("/apple-touch-icon.png")}">
  <link rel="manifest" href="${faviconUrl("/site.webmanifest")}">
  <meta name="theme-color" content="#00D4FF">
  <meta name="application-name" content="DEWEB">
`.trim();
