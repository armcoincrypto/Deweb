import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/seo";
import { siteIcons } from "@/lib/site-icons";

export const siteViewport: Viewport = {
  themeColor: "#00D4FF",
  colorScheme: "dark",
};

/** Layout-level defaults only — each page sets its own title via generateMetadata. */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "DEWEB",
  manifest: "/site.webmanifest",
  icons: siteIcons,
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
  <link rel="shortcut icon" type="image/png" href="/brand-logo.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#00D4FF">
  <meta name="application-name" content="DEWEB">
`.trim();
