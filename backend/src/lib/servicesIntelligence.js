/** Smart validation, categorization, and prioritization for service inquiries. */

const CATEGORY_KEYWORDS = {
  ecommerce: ["shopify", "woocommerce", "store", "ecommerce", "e-commerce", "checkout", "cart"],
  ai: ["ai", "chatbot", "gpt", "openai", "automation", "agent", "llm", "machine learning"],
  websites: ["website", "web app", "next.js", "react", "landing", "portal", "dashboard"],
  mobile: ["mobile", "ios", "android", "app store", "flutter", "react native"],
  saas: ["saas", "marketplace", "multi-tenant", "subscription", "platform"],
  bots: ["telegram", "discord", "bot", "messenger"],
  uiux: ["ui", "ux", "design", "figma", "prototype", "wireframe"],
  branding: ["brand", "logo", "identity", "guidelines"],
  seo: ["seo", "google", "ranking", "organic", "search"],
  marketing: ["ads", "marketing", "campaign", "funnel", "meta ads"]
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateOffer(body) {
  const errors = [];
  const email = String(body.email || "").trim().toLowerCase();
  const message = String(body.message || "").trim();
  const name = String(body.name || "").trim();
  const budget = String(body.budget || "").trim();
  const deadline = String(body.deadline || "").trim();
  const category = String(body.category || "").trim();

  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("Enter a valid email address.");

  if (!message) errors.push("Message is required.");
  else if (message.length < 20) errors.push("Please describe your project in at least 20 characters.");
  else if (message.length > 5000) errors.push("Message is too long (max 5000 characters).");

  if (name && name.length > 120) errors.push("Name is too long.");

  return {
    ok: errors.length === 0,
    errors,
    normalized: { email, message, name, budget, deadline, category }
  };
}

export function detectCategory(message, explicitCategory = "") {
  if (explicitCategory && CATEGORY_KEYWORDS[explicitCategory]) return explicitCategory;

  const text = `${explicitCategory} ${message}`.toLowerCase();
  let best = explicitCategory || "general";
  let bestScore = 0;

  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score += kw.includes(" ") ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  }
  return best;
}

export function parseBudget(budgetStr) {
  if (!budgetStr) return { min: null, max: null, currency: "USD", raw: "" };

  const raw = budgetStr.trim();
  const currency = raw.includes("€") ? "EUR" : raw.includes("£") ? "GBP" : "USD";
  const cleaned = raw.replace(/[^0-9.kKmM\-–—]/g, " ").replace(/[kK]/g, "000").replace(/[mM]/g, "000000");

  const numbers = cleaned.match(/\d+/g)?.map(Number).filter((n) => n > 0) || [];
  if (numbers.length === 0) return { min: null, max: null, currency, raw };
  if (numbers.length === 1) return { min: numbers[0], max: numbers[0], currency, raw };
  return { min: Math.min(...numbers), max: Math.max(...numbers), currency, raw };
}

export function scorePriority({ message, budget, deadline, detectedCategory }) {
  let score = 0;
  const parsed = parseBudget(budget);

  if (parsed.max && parsed.max >= 10000) score += 3;
  else if (parsed.max && parsed.max >= 3000) score += 2;
  else if (parsed.max) score += 1;

  if (deadline && /urgent|asap|immediately|this week|1 week/i.test(deadline)) score += 2;
  else if (deadline) score += 1;

  if (message.length > 200) score += 1;
  if (["ecommerce", "ai", "saas", "mobile"].includes(detectedCategory)) score += 1;

  if (score >= 5) return "high";
  if (score >= 3) return "medium";
  return "low";
}

export function suggestTimeline(category, budgetParsed) {
  const defaults = {
    ecommerce: "2–8 weeks",
    ai: "2–6 weeks",
    websites: "4–12 weeks",
    mobile: "6–16 weeks",
    saas: "8–20 weeks",
    bots: "1–4 weeks",
    uiux: "2–8 weeks",
    branding: "2–6 weeks",
    seo: "Ongoing",
    marketing: "2–6 weeks",
    general: "2–8 weeks"
  };
  const base = defaults[category] || defaults.general;
  if (budgetParsed.max && budgetParsed.max >= 50000) return "8–20 weeks";
  return base;
}

export function enrichOffer(body) {
  const validation = validateOffer(body);
  if (!validation.ok) return validation;

  const { email, message, name, budget, deadline, category } = validation.normalized;
  const detectedCategory = detectCategory(message, category);
  const budgetParsed = parseBudget(budget);
  const priority = scorePriority({ message, budget, deadline, detectedCategory });
  const suggestedTimeline = suggestTimeline(detectedCategory, budgetParsed);

  return {
    ok: true,
    data: {
      email,
      message,
      name,
      budget,
      deadline,
      category: category || detectedCategory,
      detectedCategory,
      priority,
      budgetParsed,
      suggestedTimeline,
      meta: {
        messageLength: message.length,
        hasBudget: Boolean(budget),
        hasDeadline: Boolean(deadline)
      }
    }
  };
}
