import { Hero } from "@/components/home/Hero";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MarketplaceCategories } from "@/components/home/MarketplaceCategories";
import { MarketplaceActivity } from "@/components/home/MarketplaceActivity";
import { AIAutomation } from "@/components/home/AIAutomation";
import { StatsBar } from "@/components/home/StatsBar";
import { Testimonials } from "@/components/home/Testimonials";
import { Pricing } from "@/components/home/Pricing";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <HowItWorks />
      <MarketplaceCategories />
      <MarketplaceActivity />
      <AIAutomation />
      <StatsBar />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </>
  );
}
