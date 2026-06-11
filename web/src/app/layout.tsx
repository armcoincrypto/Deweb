import { siteMetadata, siteViewport } from "@/lib/site-metadata";

// Root layout — html/body live in [locale]/layout.tsx; metadata applies to all routes.
export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
