import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { PlatformNavbar } from "@/components/layout/PlatformNavbar";
import { PlatformFooter } from "@/components/layout/PlatformFooter";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <NextIntlClientProvider messages={messages}>
          <ParticlesBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <PlatformNavbar />
            <div className="flex-1">{children}</div>
            <PlatformFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
