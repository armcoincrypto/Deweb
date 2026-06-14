import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { PlatformNavbar } from "@/components/layout/PlatformNavbar";
import { PlatformFooter } from "@/components/layout/PlatformFooter";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { AuthProvider } from "@/lib/auth-context";
import { GlobalSchema } from "@/components/seo/GlobalSchema";
import { SmoothScrollProvider } from "@/components/cinematic/SmoothScrollProvider";
import { CookieConsent } from "@/components/cookies/CookieConsent";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "../globals.css";

export const metadata = siteMetadata;
export const viewport = siteViewport;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`}
        style={{ backgroundColor: "#05070a", color: "#ffffff" }}
      >
        <GlobalSchema />
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <SmoothScrollProvider>
              <ParticlesBackground />
              <div className="relative z-10 flex min-h-screen flex-col">
                <PlatformNavbar />
                <div className="flex-1">{children}</div>
                <PlatformFooter />
              </div>
              <CookieConsent />
            </SmoothScrollProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
