/** Homepage service categories — friendly, conversion-focused */
export type ServiceCategory = {
  icon: string;
  title: string;
  what: string;
  who: string;
  result: string;
  href: string;
  accent: string;
  startingPrice?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    icon: "🛒",
    title: "Shopify Stores",
    what: "A fast online store built to sell your products.",
    who: "For brands and businesses selling online.",
    result: "More sales, better checkout, stronger brand.",
    href: "/services/shopify-development",
    accent: "#95BF47",
    startingPrice: "From $500",
  },
  {
    icon: "💻",
    title: "Business Websites",
    what: "A professional website that explains what you do.",
    who: "For local businesses, agencies, and service companies.",
    result: "More trust, more inquiries, more clients.",
    href: "/services/web-application-development",
    accent: "#38bdf8",
    startingPrice: "From $400",
  },
  {
    icon: "💬",
    title: "AI Chatbots",
    what: "A smart assistant that talks to your customers.",
    who: "For businesses that get the same questions every day.",
    result: "24/7 answers, more leads, less support work.",
    href: "/services/ai-chatbot-development",
    accent: "#00f2ff",
    startingPrice: "From $300",
  },
  {
    icon: "⚙️",
    title: "Automation",
    what: "Systems that handle repetitive tasks for you.",
    who: "For teams tired of manual emails, forms, and follow-ups.",
    result: "Save hours every week and reduce mistakes.",
    href: "/services/ai-business-automation",
    accent: "#34d399",
    startingPrice: "From $600",
  },
  {
    icon: "☁️",
    title: "SaaS Platforms",
    what: "A custom web app or dashboard for your business.",
    who: "For startups and companies with a product idea.",
    result: "Launch faster and scale with confidence.",
    href: "/services/saas-development",
    accent: "#7c3aed",
    startingPrice: "From $1000",
  },
  {
    icon: "🎯",
    title: "Landing Pages",
    what: "A focused page built to turn visitors into leads.",
    who: "For ads, launches, and campaigns that need conversions.",
    result: "More signups and better ad performance.",
    href: "/services/landing-page-development",
    accent: "#f472b6",
    startingPrice: "From $200",
  },
];
