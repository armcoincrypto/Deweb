import type { BlogCategory } from "./types";

export const blogCategories: BlogCategory[] = [
  {
    slug: "shopify",
    name: "Shopify & E-commerce",
    description: "Shopify development, store design, apps and ecommerce strategy guides.",
  },
  {
    slug: "ai",
    name: "AI & Automation",
    description: "AI chatbots, business automation and intelligent ecommerce workflows.",
  },
  {
    slug: "web-development",
    name: "Web Development",
    description: "Custom web apps, tech stacks and modern development practices.",
  },
  {
    slug: "marketplace",
    name: "Marketplace",
    description: "Two-sided platforms, competitive bidding and marketplace growth.",
  },
  {
    slug: "saas",
    name: "SaaS",
    description: "SaaS product development, MVPs and subscription business models.",
  },
];

export function getCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}
