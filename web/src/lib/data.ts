export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI", href: "#ai" },
  { label: "About", href: "#about" },
];

export const trustedCompanies = [
  "Microsoft",
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Shopify",
  "Figma",
  "AWS",
];

export const howItWorks = [
  {
    step: "01",
    title: "Post Your Project",
    description:
      "Describe scope, budget, and timeline. DEWEB routes your brief to verified IT suppliers instantly.",
    icon: "post",
  },
  {
    step: "02",
    title: "Receive Competitive Bids",
    description:
      "Multiple suppliers submit offers with pricing, delivery time, and portfolios — you compare side by side.",
    icon: "bids",
  },
  {
    step: "03",
    title: "Choose & Launch",
    description:
      "Pick the best fit, contact us to finalize terms, and track milestones until delivery.",
    icon: "launch",
  },
];

export const categories = [
  { name: "AI & Automation", count: "240+ suppliers", icon: "🤖" },
  { name: "Web Development", count: "380+ suppliers", icon: "🌐" },
  { name: "Mobile Apps", count: "190+ suppliers", icon: "📱" },
  { name: "UI/UX Design", count: "310+ suppliers", icon: "✨" },
  { name: "Bots & SaaS", count: "165+ suppliers", icon: "⚡" },
  { name: "Custom Software", count: "420+ suppliers", icon: "🔧" },
];

export const liveBids = [
  { supplier: "Nexus Labs", project: "E-commerce API", price: "$7,200", rating: 4.9, trend: "down" },
  { supplier: "CloudForge", project: "E-commerce API", price: "$6,850", rating: 4.8, trend: "down" },
  { supplier: "PixelStack", project: "E-commerce API", price: "$7,500", rating: 5.0, trend: "new" },
  { supplier: "DevMint", project: "CRM Dashboard", price: "$4,100", rating: 4.7, trend: "down" },
];

export const recentActivity = [
  { user: "Sarah K.", action: "posted", project: "AI Chatbot Integration", time: "2m ago" },
  { user: "Marcus T.", action: "bid on", project: "Mobile Banking UI", time: "5m ago" },
  { user: "Elena R.", action: "won", project: "SaaS Landing Page", time: "12m ago" },
  { user: "James W.", action: "posted", project: "DevOps Pipeline", time: "18m ago" },
];

export const aiShowcase = [
  {
    title: "Intelligent Automation",
    description: "Workflow bots, CRM sync, and AI agents that cut manual work by 60%.",
    gradient: "from-cyan-500/20 to-purple-600/20",
  },
  {
    title: "Predictive Analytics",
    description: "Real-time dashboards and ML insights for smarter project decisions.",
    gradient: "from-purple-500/20 to-fuchsia-600/20",
  },
  {
    title: "AI-Assisted Matching",
    description: "Our engine pairs your brief with the best suppliers in seconds.",
    gradient: "from-fuchsia-500/20 to-cyan-600/20",
  },
];

export const testimonials = [
  {
    quote:
      "Illustrative marketplace scenario: a buyer posts a scoped brief, compares supplier proposals side by side, and selects delivery terms that match timeline and budget.",
    label: "Marketplace bidding workflow",
    type: "Illustrative client scenario",
  },
  {
    quote:
      "Illustrative supplier scenario: specialists respond with clear scope, milestones, and pricing so buyers can evaluate fit before committing.",
    label: "Supplier proposal comparison",
    type: "Illustrative client scenario",
  },
  {
    quote:
      "Illustrative automation scenario: internal workflows are mapped first, then bots handle repeatable steps while humans keep approval and exception handling.",
    label: "AI automation delivery",
    type: "Illustrative client scenario",
  },
];

export const pricingPlans = [
  {
    name: "Startup",
    price: "Free",
    period: "to post projects",
    description: "Perfect for founders testing the marketplace.",
    features: [
      "Post up to 3 projects / month",
      "Receive unlimited bids",
      "Basic supplier profiles",
      "Email support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/ month",
    description: "For teams scaling IT delivery with competitive bidding.",
    features: [
      "Unlimited project posts",
      "Priority supplier matching",
      "AI brief optimization",
      "Escrow & milestone tracking",
      "Dedicated success manager",
    ],
    cta: "Start Now",
    highlighted: true,
    badge: "Recommended",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Volume procurement, SLAs, and white-label marketplace.",
    features: [
      "Private supplier network",
      "Custom integrations & API",
      "SOC2-ready workflows",
      "24/7 priority support",
      "Volume DEWEB discounts",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const stats = [
  { value: "🛠", label: "Production delivery" },
  { value: "📂", label: "Portfolio-backed work" },
  { value: "⚙️", label: "Engineering-led execution" },
];
