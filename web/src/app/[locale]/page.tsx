import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { SolutionsShowcase } from "@/components/home/SolutionsShowcase";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
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
      <TrustBadges />
      <SolutionsShowcase />
      <ServicesShowcase />
      <HowItWorks />
      <StatsBar />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
