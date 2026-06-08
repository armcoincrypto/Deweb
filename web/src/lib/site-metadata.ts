import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/seo";

export const siteViewport: Viewport = {
  themeColor: "#00D4FF",
  colorScheme: "dark",
};

/** Layout-level defaults only — each page sets its own title via generateMetadata. */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "DEWEB",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "DEWEB",
    statusBarStyle: "black-translucent",
  },
};

export const legacyFaviconHead = `
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#00D4FF">
  <meta name="application-name" content="DEWEB">
`.trim();
