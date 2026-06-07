import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/seo";

export const siteViewport: Viewport = {
  themeColor: "#00D4FF",
  colorScheme: "dark",
};

const defaultDescription =
  "Browse IT services and marketplace listings, offer your price, and contact DEWEB to negotiate projects — transparent pricing, no online checkout.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "DEWEB",
  title: {
    default: "DEWEB — IT Marketplace & Digital Services",
    template: "%s | DEWEB",
  },
  description: defaultDescription,
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
  openGraph: {
    type: "website",
    siteName: "DEWEB",
    url: SITE_URL,
    title: "DEWEB — IT Marketplace & Digital Services",
    description: defaultDescription,
    locale: "en",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "DEWEB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEWEB — IT Marketplace & Digital Services",
    description: defaultDescription,
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** HTML head snippet for legacy static pages (deweb-community). */
export const legacyFaviconHead = `
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#00D4FF">
  <meta name="application-name" content="DEWEB">
`.trim();
