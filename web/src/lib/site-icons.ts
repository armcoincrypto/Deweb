import type { Metadata } from "next";

/** DEWEB logo favicon set — generated from public/brand-logo.png via npm run favicons */
export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico", type: "image/x-icon" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/brand-logo.png", sizes: "512x512", type: "image/png" },
  ],
  shortcut: [{ url: "/brand-logo.png", type: "image/png" }],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  other: [
    { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
    { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
  ],
};
