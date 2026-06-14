import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/seo";
import { siteIcons } from "@/lib/site-icons";

export { legacyFaviconHead } from "@/lib/site-icons";

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
