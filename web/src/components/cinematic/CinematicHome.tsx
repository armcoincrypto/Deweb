"use client";

import { CinematicHero } from "./CinematicHero";
import { ServiceStorySection } from "./ServiceStorySection";
import { ShopifyScene } from "./scenes/ShopifyScene";
import { AINeuralScene } from "./scenes/AINeuralScene";
import { AutomationScene } from "./scenes/AutomationScene";
import { WebSaasScene } from "./scenes/WebSaasScene";
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

      <ServiceStorySection
        id="shopify"
        kicker="Shopify Development"
        title="Ecommerce that converts and scales"
        description="Custom Shopify and Shopify Plus stores engineered for speed, brand differentiation, and revenue growth — not generic themes."
        features={[
          "Custom storefront design & CRO optimization",
          "Shopify Plus migrations and integrations",
          "Subscription flows and checkout optimization",
          "Speed, SEO, and analytics built in",
        ]}
        href="/services/shopify-development"
        ctaLabel="Explore Shopify"
        accent="#95BF47"
        scene={<ShopifyScene />}
      />

      <ServiceStorySection
        id="ai-chatbots"
        kicker="AI Chatbots"
        title="Intelligent conversations that never sleep"
        description="AI-powered chatbots for sales, support, and lead qualification — integrated with your CRM and workflows."
        features={[
          "24/7 customer support automation",
          "Lead qualification and CRM sync",
          "Custom training on your business data",
          "Human handoff when it matters",
        ]}
        href="/services/ai-chatbot-development"
        ctaLabel="Explore AI Chatbots"
        accent="#00f2ff"
        scene={<AINeuralScene />}
        reverse
      />

      <ServiceStorySection
        id="automation"
        kicker="Automation Systems"
        title="Workflows that run while you grow"
        description="Connect your tools, eliminate manual work, and scale operations with AI-powered automation systems."
        features={[
          "CRM, email, and support integrations",
          "Custom workflow orchestration",
          "Error reduction and team efficiency",
          "Real-time monitoring and alerts",
        ]}
        href="/services/ai-business-automation"
        ctaLabel="Explore Automation"
        accent="#34d399"
        scene={<AutomationScene />}
      />

      <ServiceStorySection
        id="web-saas"
        kicker="Web & SaaS Development"
        title="From code to scalable product"
        description="Modern websites, web applications, and SaaS platforms with premium UI, robust architecture, and growth-ready infrastructure."
        features={[
          "MVP to enterprise SaaS platforms",
          "Admin panels, billing, and analytics",
          "Mobile-first responsive design",
          "SEO, performance, and security built in",
        ]}
        href="/services/saas-development"
        ctaLabel="Explore Web & SaaS"
        accent="#7c3aed"
        scene={<WebSaasScene />}
        reverse
      />

      <WhyChoose />
      <HomePortfolio />
      {blogSection}
      <HomeContact />
    </div>
  );
}
