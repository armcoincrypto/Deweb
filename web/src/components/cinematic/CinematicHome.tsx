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
        title="Ecommerce that converts and scales"
        description="Launch a fast Shopify store designed to sell — with floating products, optimized checkout, and a premium storefront experience."
        href="/services/shopify-development"
        ctaLabel="Explore Shopify"
        accent="#95BF47"
        sceneKey="shopify"
      />

      <ServiceStorySection
        id="ai-chatbots"
        kicker="AI Chatbots"
        title="Intelligent conversations that never sleep"
        description="Answer customers and collect leads 24/7 with AI nodes, real-time messaging, and smart automation built for your business."
        href="/services/ai-chatbot-development"
        ctaLabel="Explore AI Chatbots"
        accent="#00f2ff"
        sceneKey="ai"
        reverse
      />

      <ServiceStorySection
        id="automation"
        kicker="Automation Systems"
        title="Workflows that run while you grow"
        description="Save time by automating repeated business tasks — connected apps, emails, forms, and workflows moving automatically."
        href="/services/ai-business-automation"
        ctaLabel="Explore Automation"
        accent="#34d399"
        sceneKey="automation"
      />

      <ServiceStorySection
        id="web-saas"
        kicker="Web & SaaS Development"
        title="From code to scalable product"
        description="Turn your idea into a scalable digital product — floating browser windows, dashboards, and code transforming into live UI."
        href="/services/saas-development"
        ctaLabel="Explore Web & SaaS"
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
