export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI", href: "#ai" },
  { label: "About", href: "#about" },
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
  { name: "AI & Automation", count: "Marketplace category", icon: "🤖" },
  { name: "Web Development", count: "Marketplace category", icon: "🌐" },
  { name: "Mobile Apps", count: "Marketplace category", icon: "📱" },
  { name: "UI/UX Design", count: "Marketplace category", icon: "✨" },
  { name: "Bots & SaaS", count: "Marketplace category", icon: "⚡" },
  { name: "Custom Software", count: "Marketplace category", icon: "🔧" },
];

/** Illustrative marketplace bid rows — not real suppliers or prices. */
export const liveBids = [
  { supplier: "Open proposal", project: "E-commerce API scope", price: "Pending review", rating: "—", trend: "new" },
  { supplier: "Open proposal", project: "CRM dashboard scope", price: "Pending review", rating: "—", trend: "new" },
  { supplier: "Open proposal", project: "Mobile UI scope", price: "Pending review", rating: "—", trend: "new" },
];

/** Illustrative activity feed — not real users or timestamps. */
export const recentActivity = [
  { user: "Client brief", action: "posted", project: "AI chatbot integration", time: "Illustrative" },
  { user: "Specialist offer", action: "submitted", project: "Mobile banking UI", time: "Illustrative" },
  { user: "Project milestone", action: "updated", project: "SaaS landing page", time: "Illustrative" },
  { user: "Client brief", action: "posted", project: "DevOps pipeline", time: "Illustrative" },
];

export const aiShowcase = [
  {
    title: "Intelligent Automation",
    description: "Workflow bots, CRM sync, and AI agents for repeatable operational tasks.",
    gradient: "from-cyan-500/20 to-purple-600/20",
  },
  {
    title: "Predictive Analytics",
    description: "Dashboards and operational insights for clearer project decisions.",
    gradient: "from-purple-500/20 to-fuchsia-600/20",
  },
  {
    title: "AI-Assisted Matching",
    description: "Brief-to-listing workflows that help buyers compare scoped proposals.",
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
