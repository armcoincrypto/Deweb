import { Hero } from "@/components/home/Hero";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MarketplaceCategories } from "@/components/home/MarketplaceCategories";
import { MarketplaceActivity } from "@/components/home/MarketplaceActivity";
import { FeaturedSuppliers } from "@/components/home/FeaturedSuppliers";
import { AIAutomation } from "@/components/home/AIAutomation";
import { StatsBar } from "@/components/home/StatsBar";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("home"), "/", locale);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const seo = getPageSeo("home");

  return (
    <>
      <PageSchemas
        locale={locale}
        path="/"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
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
