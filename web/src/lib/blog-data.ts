export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-competitive-bidding-saves-it-budgets",
    category: "Marketplace",
    date: "2026-05-20",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    slug: "choosing-the-right-web-stack",
    category: "Web Development",
    date: "2026-05-15",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    slug: "ai-automation-for-small-business",
    category: "AI",
    date: "2026-05-10",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    slug: "escrow-payments-why-they-matter",
    category: "Payments",
    date: "2026-05-05",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    slug: "building-trust-with-verified-suppliers",
    category: "Marketplace",
    date: "2026-04-28",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    slug: "ecommerce-trends-2026",
    category: "E-commerce",
    date: "2026-04-20",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
