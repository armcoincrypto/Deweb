import { db } from "../db.js";
import { runBlogGenerationPipeline } from "./blogGenerationPipeline.js";
import { savePendingReviewPost } from "./blogDraftPersist.js";

export const DEWEBAM_TOPICS = {
  shopify: {
    label: "Shopify Development",
    keyword: "Shopify development services for growing brands",
    categorySlug: "shopify-development",
  },
  ai_chatbot: {
    label: "AI Chatbot",
    keyword: "AI chatbot for business lead generation",
    categorySlug: "ai-chatbot-development",
  },
  web_development: {
    label: "Web Development",
    keyword: "custom web development for business",
    categorySlug: "web-development",
  },
  automation: {
    label: "Automation",
    keyword: "AI business automation systems",
    categorySlug: "ai-automation",
  },
  saas: {
    label: "SaaS Development",
    keyword: "SaaS product development",
    categorySlug: "saas-development",
  },
  landing_page: {
    label: "Landing Page",
    keyword: "high-converting landing page development",
    categorySlug: "web-development",
  },
};

export const DEWEBAM_PLATFORMS = {
  linkedin: { label: "LinkedIn", emoji: "💼" },
  instagram: { label: "Instagram", emoji: "📸" },
  facebook: { label: "Facebook", emoji: "📘" },
  x: { label: "X", emoji: "🐦" },
  blog: { label: "DeWeb Blog", emoji: "📝" },
};

function getOpenAiKey() {
  return process.env.OPENAI_API_KEY?.trim() || null;
}

function getModel() {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

function siteUrl() {
  return process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";
}

function resolveTopic(topicKey, customTopic) {
  if (topicKey === "custom") {
    const text = String(customTopic || "").trim();
    return {
      label: text || "Custom Topic",
      keyword: text || "digital business growth",
      categorySlug: "web-development",
    };
  }
  return DEWEBAM_TOPICS[topicKey] || DEWEBAM_TOPICS.web_development;
}

function platformPrompt(platform, topicInfo) {
  const base = `You are DeWebam — the official DeWeb (dewebam.com) marketing AI.
DeWeb is a premium IT agency: Shopify stores, AI chatbots, automation, SaaS, web apps, landing pages.
Site: ${siteUrl()}/en/contact

Topic: ${topicInfo.label}
Keyword focus: ${topicInfo.keyword}

Return ONLY valid JSON:
{
  "title": "short internal title",
  "hook": "strong opening hook",
  "postText": "main post body",
  "caption": "platform caption if different from postText",
  "hashtags": ["tag1", "tag2"],
  "cta": "clear call to action with DeWeb contact link",
  "imagePrompt": "detailed prompt for premium marketing banner, no text in image",
  "thread": ["optional tweet 2", "optional tweet 3"]
}`;

  const prompts = {
    linkedin: `${base}

PLATFORM: LinkedIn — PRIMARY CHANNEL. This must be the strongest, most professional content.
- B2B executive tone for founders, CEOs, Shopify sellers, agencies, operators
- Lead with business pain → cost of inaction → practical solution → measurable value
- Explain ROI, efficiency, revenue impact, competitive advantage
- 900-1400 characters, structured with short paragraphs
- Strong authority — thought leadership, not hype
- CTA: invite to contact DeWeb for consultation at ${siteUrl()}/en/contact
- No emoji spam — max 2 professional emojis if any`,

    instagram: `${base}

PLATFORM: Instagram
- Visual-first caption, premium modern brand voice
- Strong hook in first line (pattern interrupt)
- 150-300 words max, scannable lines
- 8-12 modern hashtags in hashtags array
- CTA: DM or link in bio → DeWeb
- Energetic but premium`,

    facebook: `${base}

PLATFORM: Facebook
- Friendly professional business tone
- Clear explanation of service and who it's for
- 400-700 characters
- Trust-building, approachable
- CTA: message DeWeb or visit ${siteUrl()}/en/contact`,

    x: `${base}

PLATFORM: X (Twitter)
- Sharp hook, concise main post under 260 chars in postText
- Optional thread array with 2-4 follow-up tweets (each under 260 chars)
- Bold, direct, high-signal
- CTA to visit DeWeb`,
  };

  return prompts[platform] || prompts.linkedin;
}

async function callOpenAi(systemPrompt, userPrompt) {
  const key = getOpenAiKey();
  if (!key) throw new Error("OPENAI_API_KEY is not configured");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: getModel(),
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`OpenAI error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty OpenAI response");
  return JSON.parse(raw);
}

export async function generateSocialContent(platform, topicKey, customTopic) {
  const topicInfo = resolveTopic(topicKey, customTopic);
  const systemPrompt = platformPrompt(platform, topicInfo);
  const userPrompt = `Create a ${DEWEBAM_PLATFORMS[platform]?.label || platform} post about: ${topicInfo.label}`;

  const content = await callOpenAi(systemPrompt, userPrompt);
  return {
    topicInfo,
    content: {
      title: content.title || topicInfo.label,
      hook: content.hook || "",
      postText: content.postText || content.caption || "",
      caption: content.caption || content.postText || "",
      hashtags: Array.isArray(content.hashtags) ? content.hashtags : [],
      cta: content.cta || `Contact DeWeb: ${siteUrl()}/en/contact`,
      imagePrompt: content.imagePrompt || `Premium ${topicInfo.label} marketing visual for DeWeb IT agency`,
      thread: Array.isArray(content.thread) ? content.thread : [],
    },
  };
}

function getCategoryId(slug) {
  const row = db.prepare("SELECT id, name, slug FROM blog_categories WHERE slug = ?").get(slug);
  if (row) return row;
  const fallback = db.prepare("SELECT id, name, slug FROM blog_categories LIMIT 1").get();
  return fallback;
}

export async function generateBlogFromTelegram(topicKey, customTopic) {
  const topicInfo = resolveTopic(topicKey, customTopic);
  const category = getCategoryId(topicInfo.categorySlug);
  if (!category) throw new Error("No blog categories configured");

  const { draft } = await runBlogGenerationPipeline({
    topic: topicInfo.label,
    targetKeyword: topicInfo.keyword,
    categoryName: category.name,
    categoryId: category.id,
    categorySlug: category.slug,
    tone: "professional, CEO-focused, SEO-optimized",
    wordCount: 1800,
    createdBy: "dewebam-telegram",
  });

  const { postId, row } = savePendingReviewPost({
    draft,
    generationId: null,
    categoryId: category.id,
    slugFallbackTopic: topicInfo.keyword,
    featuredImage: draft.featuredImage,
  });

  return {
    topicInfo,
    postId,
    blogPost: row,
    content: {
      title: draft.title,
      hook: draft.excerpt,
      postText: draft.excerpt,
      caption: draft.metaDescription,
      hashtags: draft.tags || [],
      cta: draft.content?.cta?.description || `Read on DeWeb Blog`,
      imagePrompt: draft.aiMeta?.featuredImagePrompt || "",
      slug: draft.slug,
      metaDescription: draft.metaDescription,
      category: category.name,
    },
    imageUrl: draft.featuredImage || null,
  };
}

export function formatPostPreview(platform, content, imageUrl) {
  const tags = (content.hashtags || []).map((t) => (t.startsWith("#") ? t : `#${t}`)).join(" ");
  const lines = [
    `<b>${DEWEBAM_PLATFORMS[platform]?.emoji || "📣"} ${DEWEBAM_PLATFORMS[platform]?.label || platform} Preview</b>`,
    "",
    content.hook ? `<b>Hook:</b> ${escapeHtml(content.hook)}` : "",
    "",
    `<b>Post:</b>`,
    escapeHtml(content.postText || content.caption || ""),
  ];

  if (content.thread?.length) {
    lines.push("", "<b>Thread:</b>");
    content.thread.forEach((t, i) => lines.push(`${i + 2}. ${escapeHtml(t)}`));
  }

  if (tags) lines.push("", `<b>Hashtags:</b> ${escapeHtml(tags)}`);
  if (content.cta) lines.push("", `<b>CTA:</b> ${escapeHtml(content.cta)}`);

  if (platform === "blog") {
    lines.push(
      "",
      `<b>SEO Title:</b> ${escapeHtml(content.title || "")}`,
      `<b>Meta:</b> ${escapeHtml(content.metaDescription || content.caption || "")}`,
      `<b>Slug:</b> ${escapeHtml(content.slug || "")}`,
      `<b>Category:</b> ${escapeHtml(content.category || "")}`
    );
  }

  if (imageUrl) lines.push("", "🖼 Image generated and attached below.");

  return lines.filter((l) => l !== undefined).join("\n").slice(0, 3900);
}

export function formatCopyText(platform, content) {
  const tags = (content.hashtags || []).map((t) => (t.startsWith("#") ? t : `#${t}`)).join(" ");
  const parts = [content.postText || content.caption || ""];
  if (tags) parts.push("", tags);
  if (content.cta) parts.push("", content.cta);
  if (platform === "x" && content.thread?.length) {
    parts.push("", "--- Thread ---");
    content.thread.forEach((t, i) => parts.push(`${i + 2}/ ${t}`));
  }
  return parts.join("\n").trim();
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
