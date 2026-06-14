/** Homepage service categories — simple, sales-focused copy */
export type ServiceCategory = {
  icon: string;
  title: string;
  description: string;
  href: string;
  accent: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    icon: "🛒",
    title: "Shopify Development",
    description: "Launch a fast, modern, and conversion-focused Shopify store designed to sell.",
    href: "/services/shopify-development",
    accent: "#95BF47",
  },
  {
    icon: "💻",
    title: "Business Websites",
    description: "Professional websites that build trust, explain your services clearly, and help clients contact you.",
    href: "/services/web-application-development",
    accent: "#38bdf8",
  },
  {
    icon: "💬",
    title: "AI Chatbots",
    description: "Smart chatbots that answer questions, collect leads, and support customers 24/7.",
    href: "/services/ai-chatbot-development",
    accent: "#00f2ff",
  },
  {
    icon: "⚙️",
    title: "Automation Systems",
    description: "Save time by automating repeated tasks, forms, emails, and business workflows.",
    href: "/services/ai-business-automation",
    accent: "#34d399",
  },
  {
    icon: "☁️",
    title: "SaaS & Web Apps",
    description: "Custom platforms, dashboards, and digital tools built for your business goals.",
    href: "/services/saas-development",
    accent: "#7c3aed",
  },
  {
    icon: "🎯",
    title: "Landing Pages",
    description: "High-converting pages for ads, product launches, services, and lead generation.",
    href: "/contact",
    accent: "#f472b6",
  },
];

export const sellingPoints = [
  "Built for real business growth",
  "Fast, mobile-friendly and SEO-ready",
  "From idea to live product",
  "Clear design, clean code, real results",
];
