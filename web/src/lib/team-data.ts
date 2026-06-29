export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string;
  yearsExperience?: number;
  skills: string[];
  initials: string;
  linkedin?: string;
};

/** Founder profile shown on the About page — verifiable public identity only. */
export const coreTeam: TeamMember[] = [
  {
    id: "gagik",
    name: "Gagik Poghosyan",
    role: "Founder",
    bio: "Leads DEWEB product direction across the IT marketplace, agency delivery, and engineering documentation.",
    expertise:
      "Product strategy, marketplace operations, and coordination of Shopify, web, AI, and marketplace delivery work.",
    skills: ["Product Strategy", "Marketplace", "Delivery Coordination"],
    initials: "GP",
    linkedin: "https://www.linkedin.com/company/dewebam",
  },
];

const deliveryContact: TeamMember = {
  id: "delivery",
  name: "DEWEB delivery team",
  role: "Engineering & project delivery",
  bio: "Scoped discovery, engineering, QA, and launch support through DEWEB agency delivery or marketplace specialists.",
  expertise: "Shopify, web applications, AI automation, SaaS, and marketplace builds.",
  skills: ["Shopify", "Next.js", "AI automation", "Marketplace builds"],
  initials: "DW",
  linkedin: "https://www.linkedin.com/company/dewebam",
};

export function getExpertForService(): TeamMember {
  return deliveryContact;
}
