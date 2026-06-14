"use client";

import { CinematicHero } from "./CinematicHero";
import { ServiceStorySection } from "./ServiceStorySection";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { SocialProof } from "@/components/home/SocialProof";
import { WhyChoose } from "@/components/home/WhyChoose";
import { HomePortfolio } from "@/components/home/HomePortfolio";
import { HomeContact } from "@/components/home/HomeContact";

type CinematicHomeProps = {
  blogSection: React.ReactNode;
};

export function CinematicHome({ blogSection }: CinematicHomeProps) {
  return (
    <div className="cinematic-home">
      <CinematicHero />
      <ServiceCategories />

      <ServiceStorySection
        id="shopify"
        kicker="Shopify Development"
        title="Launch a fast Shopify store designed to sell"
        description="Launch a fast Shopify store designed to sell."
        href="/services/shopify-development"
        ctaLabel="Build My Shopify Store"
        accent="#95BF47"
        sceneKey="shopify"
      />

      <ServiceStorySection
        id="ai-chatbots"
        kicker="AI Chatbots"
        title="Answer customers and collect leads 24/7"
        description="Answer customers and collect leads 24/7."
        href="/services/ai-chatbot-development"
        ctaLabel="Add AI Chatbot"
        accent="#00f2ff"
        sceneKey="ai"
        reverse
      />

      <ServiceStorySection
        id="automation"
        kicker="Automation Systems"
        title="Save time by automating repeated business tasks"
        description="Save time by automating repeated business tasks."
        href="/services/ai-business-automation"
        ctaLabel="Automate My Business"
        accent="#34d399"
        sceneKey="automation"
      />

      <ServiceStorySection
        id="web-saas"
        kicker="Web & SaaS Development"
        title="Turn your idea into a scalable digital product"
        description="Turn your idea into a scalable digital product."
        href="/services/saas-development"
        ctaLabel="Build My Platform"
        accent="#7c3aed"
        sceneKey="web"
        reverse
      />

      <SocialProof />
      <WhyChoose />
      <HomePortfolio />
      {blogSection}
      <HomeContact />
    </div>
  );
}
