export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  avatar: string;
};

export const coreTeam: TeamMember[] = [
  {
    id: "gagik",
    name: "Gagik Poghosyan",
    role: "Founder & CEO",
    bio: "Builds DEWEB's vision — competitive IT marketplace, supplier quality, and client success at scale.",
    skills: ["Product Strategy", "Marketplace", "Business Development", "Team Leadership"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gagik&backgroundColor=0a1628",
  },
  {
    id: "harut",
    name: "Harut",
    role: "Senior Web Developer",
    bio: "Leads website and web app delivery — from landing pages to full-stack products with modern stacks.",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "WordPress"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harut&backgroundColor=0a1628",
  },
  {
    id: "aram",
    name: "Aram",
    role: "Lead AI & Automation Engineer",
    bio: "Designs AI agents, bots, and automation workflows that power smarter delivery and operations.",
    skills: ["OpenAI", "LangChain", "Python", "n8n", "Telegram Bots"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aram&backgroundColor=0a1628",
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
