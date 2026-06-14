import type { ServiceLandingPage } from "../types";
import { DEFAULT_CTA, related, servicePath } from "../shared";

export const landingPageDevelopment: ServiceLandingPage = {
  slug: "landing-page-development",
  path: servicePath("landing-page-development"),
  h1: "Landing Page Development",
  subtitle:
    "High-conversion landing pages for ads, launches, and lead generation — built fast and mobile-first.",
  heroBadge: "Conversion Pages",
  priceRange: "From $200",
  intro: [
    "A strong landing page gives your campaign one clear message, one focused offer, and one simple action for visitors to take. We build landing pages that help businesses turn paid traffic, product launches, and promotions into real inquiries instead of wasted clicks.",
    "Every page is structured around clarity: headline, value proposition, proof, benefits, and a strong CTA. We design for mobile first, keep loading speed high, and make the form or booking flow easy to complete.",
  ],
  sections: [
    {
      title: "What you get",
      paragraphs: [
        "A custom landing page with conversion-focused copy structure, responsive layout, lead form integration, analytics-ready setup, and launch support.",
      ],
    },
    {
      title: "Best for",
      paragraphs: [
        "Businesses running Google or Meta ads, launching a new service, promoting a limited offer, or collecting leads for sales follow-up.",
      ],
    },
  ],
  benefits: [
    { icon: "🎯", title: "Campaign-focused", description: "One page, one goal, one clear conversion path." },
    { icon: "📱", title: "Mobile-first", description: "Designed for phones where most ad traffic arrives." },
    { icon: "⚡", title: "Fast launch", description: "Most landing pages can be delivered in days, not weeks." },
    { icon: "📈", title: "Better ad ROI", description: "Send traffic to a page built to convert, not a generic homepage." },
    { icon: "🧩", title: "Easy to update", description: "Simple structure for future offers and seasonal campaigns." },
    { icon: "🔍", title: "Tracking-ready", description: "Prepared for analytics, forms, and campaign measurement." },
  ],
  process: [
    { step: 1, title: "Offer clarity", description: "Define the audience, offer, CTA, and campaign goal." },
    { step: 2, title: "Page structure", description: "Plan sections, proof, form flow, and mobile layout." },
    { step: 3, title: "Design & build", description: "Create the page with premium visuals and fast loading." },
    { step: 4, title: "Test", description: "Check forms, mobile UX, speed, and conversion flow." },
    { step: 5, title: "Launch", description: "Deploy and connect tracking for your campaign." },
  ],
  faqs: [
    {
      question: "How much does a landing page cost?",
      answer: "Landing pages start from $200. Final pricing depends on design complexity, number of sections, integrations, and timeline.",
    },
    {
      question: "How fast can you deliver?",
      answer: "Many landing pages can be completed in 3–10 days depending on content readiness and revision rounds.",
    },
    {
      question: "Can you design for ads?",
      answer: "Yes. We build landing pages specifically for paid campaigns, promos, and lead generation funnels.",
    },
    {
      question: "Can you connect forms and analytics?",
      answer: "Yes. We can connect lead forms, email notifications, CRM handoff, and analytics tracking.",
    },
  ],
  relatedServices: related([
    { slug: "web-application-development", title: "Business Websites", description: "Full company websites with multiple service pages." },
    { slug: "shopify-development", title: "Shopify Development", description: "Ecommerce stores built to sell products online." },
    { slug: "ai-chatbot-development", title: "AI Chatbots", description: "Capture and answer leads automatically 24/7." },
    { slug: "saas-development", title: "SaaS / Web Apps", description: "Scalable web products and dashboards." },
  ]),
  cta: {
    title: "Need a landing page that converts?",
    description: "Tell us about your campaign and we'll propose a clear page structure, timeline, and starting price.",
    ...DEFAULT_CTA,
    primaryLabel: "Send Project Request",
  },
};
