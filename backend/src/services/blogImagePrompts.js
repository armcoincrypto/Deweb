/**
 * Category-specific premium marketing prompts for blog hero images.
 * Maps category slugs to agency-quality 16:9 creative briefs.
 */

const SHARED_REQUIREMENTS = `
Requirements:
- No random text, no watermarks, no distorted logos, no AI artifacts
- High click-through rate visual appeal
- Photorealistic business illustration style
- 16:9 hero banner composition
- Premium corporate marketing campaign quality
- DEWEB brand palette: clean blue and teal accents on dark professional backgrounds
`.trim();

const CATEGORY_PROMPTS = {
  shopify: `
Create a premium blog hero image for a Shopify development agency.
Theme: Growing ecommerce business using Shopify.
Visual elements: modern Shopify storefront UI, Shopify admin dashboard, revenue growth charts, conversion analytics, business owner on laptop, premium ecommerce interface, modern SaaS design elements.
Style: Professional marketing campaign quality suitable for a Shopify Plus agency website.
${SHARED_REQUIREMENTS}
`.trim(),

  "ai-automation": `
Create a premium AI automation blog hero image.
Visual elements: AI workflow automation, connected systems and APIs, analytics dashboards, business process automation, modern technology environment, professional executives reviewing data on screens.
Style: Enterprise software marketing quality, modern SaaS company design, photorealistic, 16:9.
${SHARED_REQUIREMENTS}
`.trim(),

  "ai-chatbot-development": `
Create a premium AI chatbot and automation blog hero image.
Visual elements: conversational AI interface, customer support automation, chat workflows, CRM integration, business team using AI tools, modern dashboard with conversation analytics.
Style: Enterprise SaaS marketing quality, photorealistic, 16:9.
${SHARED_REQUIREMENTS}
`.trim(),

  "marketplace-development": `
Create a premium marketplace platform hero image.
Visual elements: multi-vendor marketplace dashboard, buyers and sellers, orders and transactions, growth metrics, modern marketplace UI, vendor management screens.
Style: Technology startup marketing quality, photorealistic, 16:9.
${SHARED_REQUIREMENTS}
`.trim(),

  "saas-development": `
Create a premium SaaS software platform hero image.
Visual elements: software product dashboard, MRR growth chart, subscription analytics, product metrics, startup growth visuals, modern SaaS UI.
Style: High-end SaaS marketing image like HubSpot or Semrush, photorealistic, 16:9.
${SHARED_REQUIREMENTS}
`.trim(),

  "web-development": `
Create a premium custom web development hero image.
Visual elements: modern website interfaces, development workflow, UI/UX screens on monitors, performance metrics, agency team collaboration.
Style: Agency-quality marketing creative, photorealistic, 16:9.
${SHARED_REQUIREMENTS}
`.trim(),

  ecommerce: `
Create a premium ecommerce growth and development hero image.
Visual elements: online store analytics, conversion funnel, shopping experience UI, revenue dashboards, ecommerce operations, modern retail technology.
Style: Premium ecommerce agency marketing quality, photorealistic, 16:9.
${SHARED_REQUIREMENTS}
`.trim(),

  "shopify-store-design": `
Create a premium Shopify store design and conversion optimization hero image.
Visual elements: beautiful Shopify storefront, UX design screens, conversion rate charts, mobile and desktop shopping UI, brand-focused ecommerce design.
Style: Shopify Plus partner agency marketing quality, photorealistic, 16:9.
${SHARED_REQUIREMENTS}
`.trim(),
};

const SLUG_ALIASES = {
  shopify: "shopify",
  ai: "ai-automation",
};

function normalizeCategorySlug(slug, categoryName) {
  const s = String(slug || "").toLowerCase().trim();
  if (s === "shopify-development" || s === "shopify") return "shopify";
  if (CATEGORY_PROMPTS[s]) return s;
  if (SLUG_ALIASES[s]) return SLUG_ALIASES[s];

  const name = String(categoryName || "").toLowerCase();
  if (name.includes("shopify")) return s.includes("design") ? "shopify-store-design" : "shopify";
  if (name.includes("chatbot")) return "ai-chatbot-development";
  if (name.includes("automation") || name.includes(" ai")) return "ai-automation";
  if (name.includes("marketplace")) return "marketplace-development";
  if (name.includes("saas")) return "saas-development";
  if (name.includes("web")) return "web-development";
  if (name.includes("ecommerce") || name.includes("e-commerce")) return "ecommerce";

  return s || "web-development";
}

/**
 * Build category-specific image prompt. Custom AI prompt from article takes precedence.
 */
export function buildCategoryImagePrompt({
  categorySlug,
  categoryName,
  title,
  topic,
  featuredImagePrompt,
  attempt = 1,
}) {
  if (featuredImagePrompt?.trim()) {
    return `${featuredImagePrompt.trim()}\n\n${SHARED_REQUIREMENTS}`;
  }

  const key = normalizeCategorySlug(categorySlug, categoryName);
  const base = CATEGORY_PROMPTS[key] || CATEGORY_PROMPTS["web-development"];

  const context = `Article title: "${title || topic || "DEWEB Blog"}". Target keyword context: ${topic || title || "business technology"}.`;

  let qualityBoost = "";
  if (attempt >= 2) {
    qualityBoost =
      "\n\nENHANCED QUALITY: Ultra-premium agency marketing creative. Hyper-detailed, cinematic lighting, depth of field. Must look like a paid campaign from a top Shopify Plus or SaaS agency — NOT a generic stock placeholder.";
  }
  if (attempt >= 3) {
    qualityBoost +=
      " Maximum visual impact for LinkedIn and Facebook sharing. Bold composition, rich detail, professional color grading.";
  }

  return `${base}\n\n${context}${qualityBoost}`;
}

export { normalizeCategorySlug, CATEGORY_PROMPTS };
