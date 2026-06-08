import type { BlogAuthor } from "./types";

export const blogAuthors: Record<string, BlogAuthor> = {
  "deweb-editorial": {
    id: "deweb-editorial",
    name: "DEWEB Editorial Team",
    role: "Technology & Marketplace Insights",
    bio: "The DEWEB editorial team publishes practical guides on Shopify development, AI automation, web applications and marketplace strategy for growing businesses.",
  },
  "deweb-tech": {
    id: "deweb-tech",
    name: "DEWEB Tech Desk",
    role: "Software Engineering",
    bio: "DEWEB Tech Desk covers web development stacks, SaaS architecture, marketplace engineering and technical decision guides for founders and product teams.",
  },
};

export function getAuthor(id: string): BlogAuthor {
  return blogAuthors[id] ?? blogAuthors["deweb-editorial"];
}
