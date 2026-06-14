"use client";

import { CinematicHero } from "./CinematicHero";
import { ServiceStorySection } from "./ServiceStorySection";
import { ServiceCategories } from "@/components/home/ServiceCategories";
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
        title="Sell more with a store built to convert"
        description="Launch a fast, modern, and conversion-focused Shopify store designed to sell."
        benefits={[
          "Custom design that matches your brand",
          "Fast loading and mobile-friendly",
          "SEO-ready product pages",
        ]}
        href="/services/shopify-development"
        ctaLabel="Get a Shopify Store"
        accent="#95BF47"
        sceneKey="shopify"
      />

      <ServiceStorySection
        id="ai-chatbots"
        kicker="AI Chatbots"
        title="Answer customers instantly, 24/7"
        description="Smart chatbots that answer questions, collect leads, and support customers 24/7."
        benefits={[
          "Capture leads while you sleep",
          "Answer FAQs automatically",
          "Connect to your CRM and email",
        ]}
        href="/services/ai-chatbot-development"
        ctaLabel="Get an AI Chatbot"
        accent="#00f2ff"
        sceneKey="ai"
        reverse
      />

      <ServiceStorySection
        id="automation"
        kicker="Automation Systems"
        title="Stop doing the same tasks every day"
        description="Save time by automating repeated tasks, forms, emails, and business workflows."
        benefits={[
          "Automate forms, emails, and follow-ups",
          "Connect your existing tools",
          "Reduce errors and save hours weekly",
        ]}
        href="/services/ai-business-automation"
        ctaLabel="Automate My Business"
        accent="#34d399"
        sceneKey="automation"
      />

      <ServiceStorySection
        id="web-saas"
        kicker="Web & SaaS Development"
        title="Turn your idea into a live product"
        description="Custom platforms, dashboards, and digital tools built for your business goals."
        benefits={[
          "Business websites that build trust",
          "SaaS platforms with billing and dashboards",
          "From idea to live product — fast",
        ]}
        href="/services/saas-development"
        ctaLabel="Build My Platform"
        accent="#7c3aed"
        sceneKey="web"
        reverse
      />

      <WhyChoose />
      <HomePortfolio />
      {blogSection}
      <HomeContact />
    </div>
  );
}
