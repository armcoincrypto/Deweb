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
