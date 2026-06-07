import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/",
    locale,
  });
}
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MarketplaceCategories } from "@/components/home/MarketplaceCategories";
import { MarketplaceActivity } from "@/components/home/MarketplaceActivity";
import { FeaturedSuppliers } from "@/components/home/FeaturedSuppliers";
import { AIAutomation } from "@/components/home/AIAutomation";
import { StatsBar } from "@/components/home/StatsBar";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <HowItWorks />
      <MarketplaceCategories />
      <MarketplaceActivity />
      <FeaturedSuppliers />
      <AIAutomation />
      <StatsBar />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
