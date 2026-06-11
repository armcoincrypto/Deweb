import { db, nowIso } from "../db.js";
import { slugify } from "../utils/blogHelpers.js";
import { createTopicQueueItem } from "./blogTopicQueue.js";
import { cleanText } from "../utils/sanitize.js";

const CATEGORY_ALIASES = {
  shopify: "shopify-development",
  "shopify development": "shopify-development",
  "shopify store": "shopify-store-design",
  ai: "ai-automation",
  "ai automation": "ai-automation",
  "ai chatbot": "ai-chatbot-development",
  chatbot: "ai-chatbot-development",
  saas: "saas-development",
  marketplace: "marketplace-development",
  "web app": "web-development",
  "web development": "web-development",
  ecommerce: "ecommerce",
  "e-commerce": "ecommerce",
};

function getExistingTopicFingerprints() {
  const fingerprints = new Set();

  const queueRows = db.prepare("SELECT topic, target_keyword FROM blog_topic_queue").all();
  const postRows = db.prepare("SELECT title, slug FROM blog_posts").all();
  const genRows = db.prepare("SELECT topic, target_keyword FROM blog_ai_generations").all();

  for (const r of [...queueRows, ...genRows]) {
    fingerprints.add(slugify(r.topic));
    fingerprints.add(slugify(r.target_keyword));
  }
  for (const r of postRows) {
    fingerprints.add(slugify(r.title));
    fingerprints.add(slugify(r.slug));
  }

  return fingerprints;
}

function isDuplicate(topic, keyword, fingerprints) {
  const t = slugify(topic);
  const k = slugify(keyword);
  if (!t) return true;
  if (fingerprints.has(t) || fingerprints.has(k)) return true;
  for (const fp of fingerprints) {
    if (fp && (t.includes(fp) || fp.includes(t)) && fp.length > 12) return true;
  }
  return false;
}

function resolveCategoryId(categoryName) {
  const cats = db.prepare("SELECT id, name, slug FROM blog_categories").all();
  const raw = String(categoryName || "").toLowerCase().trim();
  const aliasSlug = CATEGORY_ALIASES[raw];
  if (aliasSlug) {
    const match = cats.find((c) => c.slug === aliasSlug);
    if (match) return match.id;
  }
  const bySlug = cats.find((c) => c.slug === slugify(categoryName));
  if (bySlug) return bySlug.id;
  const byName = cats.find((c) => c.name.toLowerCase() === raw);
  if (byName) return byName.id;
  const partial = cats.find(
    (c) => c.name.toLowerCase().includes(raw) || raw.includes(c.slug.replace(/-/g, " "))
  );
  return partial?.id || cats[0]?.id;
}

export async function generateFreshBlogTopics({ count = 8 } = {}) {
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (!openaiKey) {
    const err = new Error("OPENAI_API_KEY is not configured.");
    err.status = 503;
    throw err;
  }

  const categories = db.prepare("SELECT name, slug FROM blog_categories ORDER BY name").all();
  const existing = getExistingTopicFingerprints();
  const existingTopics = db
    .prepare("SELECT topic FROM blog_topic_queue UNION SELECT title AS topic FROM blog_posts LIMIT 40")
    .all()
    .map((r) => r.topic)
    .filter(Boolean);

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.85,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are DEWEB's SEO strategist. Generate fresh blog topics for Shopify development, AI automation, SaaS, ecommerce, marketplace development, web apps, AI chatbots, and business automation.

Focus on current business problems, high buyer intent, and topics that can bring leads to dewebam.com.

Available categories: ${categories.map((c) => c.name).join(", ")}

Return JSON: { "topics": [{ "topic", "target_keyword", "category", "search_intent", "buyer_stage": "awareness|consideration|decision", "priority": 1-10, "suggested_cta", "why_this_can_rank" }] }

Generate exactly ${Math.min(10, Math.max(5, count))} unique topics. Do not repeat these existing topics:
${existingTopics.slice(0, 25).join("\n") || "(none yet)"}`,
        },
        {
          role: "user",
          content: "Generate fresh high-intent SEO blog topics for DEWEB lead generation.",
        },
      ],
      max_tokens: 4000,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`OpenAI API error (${res.status}): ${errBody.slice(0, 200)}`);
  }

  const completion = await res.json();
  const raw = completion.choices?.[0]?.message?.content?.trim();
  const parsed = JSON.parse(raw);
  const ideas = Array.isArray(parsed.topics) ? parsed.topics : [];

  const created = [];
  const skipped = [];
  const fingerprints = new Set(existing);

  for (const idea of ideas) {
    const topic = cleanText(idea.topic, 500);
    const targetKeyword = cleanText(idea.target_keyword, 200) || topic;
    if (!topic) continue;

    if (isDuplicate(topic, targetKeyword, fingerprints)) {
      skipped.push({ topic, reason: "duplicate" });
      continue;
    }

    const categoryId = resolveCategoryId(idea.category);
    if (!categoryId) {
      skipped.push({ topic, reason: "no category" });
      continue;
    }

    const topicMeta = {
      searchIntent: cleanText(idea.search_intent, 100),
      buyerStage: cleanText(idea.buyer_stage, 50),
      suggestedCta: cleanText(idea.suggested_cta, 300),
      whyThisCanRank: cleanText(idea.why_this_can_rank, 500),
    };

    const result = createTopicQueueItem({
      topic,
      targetKeyword,
      categoryId,
      priority: Math.min(10, Math.max(1, Number(idea.priority) || 5)),
      scheduledFor: nowIso(),
      topicMeta,
    });

    if (result.item) {
      created.push(result.item);
      fingerprints.add(slugify(topic));
      fingerprints.add(slugify(targetKeyword));
    }
  }

  return { created, skipped, total: ideas.length };
}
