export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string;
  yearsExperience: number;
  skills: string[];
  initials: string;
  linkedin?: string;
};

export const coreTeam: TeamMember[] = [
  {
    id: "gagik",
    name: "Gagik Poghosyan",
    role: "Founder & CEO",
    bio: "Builds DEWEB's vision — competitive IT marketplace, supplier quality, and client success at scale.",
    expertise:
      "Product strategy, marketplace growth, enterprise partnerships, and building teams that deliver at scale.",
    yearsExperience: 12,
    skills: ["Product Strategy", "Marketplace", "Business Development", "Team Leadership"],
    initials: "GP",
    linkedin: "https://www.linkedin.com/company/dewebam",
  },
  {
    id: "harut",
    name: "Harut",
    role: "Senior Web Developer",
    bio: "Leads website and web app delivery — from landing pages to full-stack products with modern stacks.",
    expertise:
      "Full-stack web development, Next.js architecture, performance optimization, and scalable frontend systems.",
    yearsExperience: 8,
    skills: ["Next.js", "React", "TypeScript", "Node.js", "WordPress"],
    initials: "H",
    linkedin: "https://www.linkedin.com/company/dewebam",
  },
  {
    id: "aram",
    name: "Aram",
    role: "Lead AI & Automation Engineer",
    bio: "Designs AI agents, bots, and automation workflows that power smarter delivery and operations.",
    expertise:
      "AI agents, LLM integrations, workflow automation, and intelligent systems for business operations.",
    yearsExperience: 7,
    skills: ["OpenAI", "LangChain", "Python", "n8n", "Telegram Bots"],
    initials: "A",
    linkedin: "https://www.linkedin.com/company/dewebam",
  },
];

export const serviceExperts: Record<string, string> = {
  websites: "harut",
  ecommerce: "harut",
  ai: "aram",
  bots: "aram",
  saas: "harut",
  mobile: "aram",
  uiux: "gagik",
  branding: "gagik",
  seo: "gagik",
  marketing: "gagik",
};

export function getExpertForService(serviceId: string): TeamMember {
  const expertId = serviceExperts[serviceId] ?? "gagik";
  return coreTeam.find((m) => m.id === expertId) ?? coreTeam[0];
}
