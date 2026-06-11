import { db, uid, nowIso, parseJson } from "../db.js";
import { slugify, estimateReadingTime } from "../utils/blogHelpers.js";
import { cleanText } from "../utils/sanitize.js";

const SERVICE_LINKS = [
  { href: "/services/shopify-development", label: "Shopify Development" },
  { href: "/services/shopify-store-design", label: "Shopify Store Design" },
  { href: "/services/ai-chatbot-development", label: "AI Chatbot Development" },
  { href: "/services/ai-business-automation", label: "AI Business Automation" },
  { href: "/services/saas-development", label: "SaaS Development" },
  { href: "/services/marketplace-development", label: "Marketplace Development" },
  { href: "/services/web-application-development", label: "Web Application Development" },
];

function getOpenAiKey() {
  return process.env.OPENAI_API_KEY?.trim() || null;
}

function buildSystemPrompt({ tone, wordCount, categoryName }) {
  return `You are DEWEB's senior SEO content strategist and business copywriter for dewebam.com — an IT marketplace for Shopify development, AI automation, SaaS, marketplace platforms, web apps, and ecommerce growth.

Write for CEOs and business owners — not developers. Focus on:
- ROI, cost savings, automation, scaling, conversion, lead generation, ecommerce growth
- Real business pain points and practical solutions
- How DEWEB helps (marketplace + verified developers)

Tone: ${tone || "authoritative, practical, CEO-focused"}.
Target length: ${wordCount || 2000}+ words across intro + sections.

Return ONLY valid JSON:
{
  "seoTitle": "string max 60 chars — strong SEO title with keyword",
  "metaTitle": "string max 60 chars",
  "metaDescription": "string 120-160 chars",
  "slug": "kebab-case-url-slug",
  "excerpt": "string max 160 chars",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "featuredImagePrompt": "describe a professional blog hero image, no text in image",
  "intro": ["paragraph1: business pain point hook", "paragraph2: stakes for the business"],
  "sections": [
    {"title": "The Business Problem", "paragraphs": ["..."]},
    {"title": "Why This Problem Costs You Money", "paragraphs": ["..."]},
    {"title": "The Practical Solution", "paragraphs": ["..."]},
    {"title": "How DEWEB Solves This", "paragraphs": ["..."]},
    {"title": "Step-by-Step Implementation", "paragraphs": ["..."]},
    {"title": "Cost, Timeline and Business Value", "paragraphs": ["..."]},
    {"title": "Additional depth section", "paragraphs": ["..."]},
    {"title": "Scaling and Automation Opportunities", "paragraphs": ["..."]}
  ],
  "faqs": [{"question": "...", "answer": "..."}],
  "internalLinks": [{"href": "/services/...", "label": "..."}],
  "cta": {
    "title": "string",
    "description": "string with ROI/lead-gen angle and DEWEB",
    "primaryLabel": "Get a Free Consultation",
    "primaryHref": "/contact"
  },
  "linkedinPost": "LinkedIn post promoting article + DEWEB service",
  "facebookPost": "Facebook post",
  "xThread": ["tweet1", "tweet2", "tweet3"],
  "instagramCaption": "Instagram caption with hashtags",
  "buyerStage": "awareness|consideration|decision",
  "searchIntent": "informational|commercial|transactional"
}

REQUIRED ARTICLE STRUCTURE (map to sections):
1. Strong SEO title (seoTitle)
2. Meta title (metaTitle)
3. Meta description
4. Intro with business pain point
5. Problem explanation
6. Practical solution
7. How DEWEB can solve it
8. Step-by-step implementation
9. Cost / timeline / business value
10. FAQ (min 6 items)
11. Internal links (min 2 from: ${SERVICE_LINKS.map((l) => l.href).join(", ")})
12. Strong CTA

Rules:
- Min 8 sections, 2 paragraphs each
- Min 6 FAQs
- No generic AI filler — specific, actionable, SEO-optimized
- Natural keyword usage, no stuffing
- CEO language: revenue, margin, efficiency, competitive advantage`;
}

function parseAiResponse(parsed, { targetKeyword, tone, wordCount, model, buyerStage, searchIntent }) {
  const slug = slugify(parsed.slug || parsed.seoTitle || "article");
  const content = {
    intro: Array.isArray(parsed.intro) ? parsed.intro.map((p) => cleanText(p, 8000)) : [],
    sections: Array.isArray(parsed.sections)
      ? parsed.sections.map((s) => ({
          title: cleanText(s.title, 300),
          paragraphs: (s.paragraphs || []).map((p) => cleanText(p, 8000)),
        }))
      : [],
    faqs: Array.isArray(parsed.faqs)
      ? parsed.faqs.map((f) => ({
          question: cleanText(f.question, 500),
          answer: cleanText(f.answer, 3000),
        }))
      : [],
    internalLinks: Array.isArray(parsed.internalLinks)
      ? parsed.internalLinks.slice(0, 5).map((l) => ({
          href: cleanText(l.href, 200),
          label: cleanText(l.label, 200),
        }))
      : SERVICE_LINKS.slice(0, 3),
    cta: parsed.cta
      ? {
          title: cleanText(parsed.cta.title, 200),
          description: cleanText(parsed.cta.description, 1000),
          primaryLabel: cleanText(parsed.cta.primaryLabel, 80) || "Get a Free Consultation",
          primaryHref: cleanText(parsed.cta.primaryHref, 200) || "/contact",
        }
      : {
          title: "Ready to grow with DEWEB?",
          description: "Connect with verified developers for Shopify, AI, SaaS and marketplace projects.",
          primaryLabel: "Get a Free Consultation",
          primaryHref: "/contact",
        },
  };

  const xThread = Array.isArray(parsed.xThread)
    ? parsed.xThread
    : Array.isArray(parsed.twitterThread)
      ? parsed.twitterThread
      : [];

  const aiMeta = {
    featuredImagePrompt: cleanText(parsed.featuredImagePrompt, 500),
    linkedinPost: cleanText(parsed.linkedinPost || parsed.linkedinDraft, 3000),
    facebookPost: cleanText(parsed.facebookPost || parsed.facebookDraft, 2000),
    xThread: xThread.map((t) => cleanText(t, 500)).filter(Boolean),
    instagramCaption: cleanText(parsed.instagramCaption, 2200),
    linkedinDraft: cleanText(parsed.linkedinPost || parsed.linkedinDraft, 3000),
    facebookDraft: cleanText(parsed.facebookPost || parsed.facebookDraft, 2000),
    twitterThread: xThread.map((t) => cleanText(t, 500)).filter(Boolean),
    targetKeyword: cleanText(targetKeyword, 200),
    tone: cleanText(tone, 100),
    wordCount,
    model,
    buyerStage: cleanText(parsed.buyerStage || buyerStage, 50),
    searchIntent: cleanText(parsed.searchIntent || searchIntent, 50),
  };

  const title = cleanText(
    (parsed.metaTitle || parsed.seoTitle || "").replace(/\s*\|.*$/, "") || parsed.seoTitle,
    300
  );

  return {
    title,
    seoTitle: cleanText(parsed.seoTitle || parsed.metaTitle || title, 120),
    metaDescription: cleanText(parsed.metaDescription, 320),
    slug,
    excerpt: cleanText(parsed.excerpt, 500),
    tags: Array.isArray(parsed.tags) ? parsed.tags.map((t) => cleanText(t, 80)).slice(0, 8) : [],
    content,
    readingTime: estimateReadingTime(content),
    aiMeta,
    status: "draft",
  };
}

async function callOpenAiJson({ systemPrompt, userPrompt, maxTokens = 10000 }) {
  const openaiKey = getOpenAiKey();
  if (!openaiKey) {
    const err = new Error("OPENAI_API_KEY is not configured. Add it to backend .env");
    err.status = 503;
    throw err;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    const err = new Error(`OpenAI API error (${res.status}): ${errBody.slice(0, 200)}`);
    err.status = 502;
    throw err;
  }

  const completion = await res.json();
  const raw = completion.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    const err = new Error("AI returned empty response.");
    err.status = 502;
    throw err;
  }

  try {
    return { parsed: JSON.parse(raw), model };
  } catch {
    const err = new Error("AI returned invalid JSON.");
    err.status = 502;
    throw err;
  }
}

export async function generateBlogDraft({
  topic,
  targetKeyword,
  categoryName,
  tone,
  wordCount,
  createdBy,
  regenerationHint = null,
  buyerStage = null,
  searchIntent = null,
}) {
  let userPrompt = `Topic: ${topic}
Target keyword: ${targetKeyword || topic}
Category: ${categoryName}
Buyer stage: ${buyerStage || "consideration"}
Search intent: ${searchIntent || "commercial"}
Write a CEO-focused SEO article that drives leads for DEWEB services.`;

  if (regenerationHint) {
    userPrompt += `\n\nIMPORTANT: ${regenerationHint}`;
  }

  const { parsed, model } = await callOpenAiJson({
    systemPrompt: buildSystemPrompt({ tone, wordCount, categoryName }),
    userPrompt,
  });

  const draft = parseAiResponse(parsed, {
    targetKeyword,
    tone,
    wordCount: wordCount || 2000,
    model,
    buyerStage,
    searchIntent,
  });

  const generationId = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO blog_ai_generations (id, post_id, topic, target_keyword, category_id, tone, word_count, result_json, created_by, created_at)
    VALUES (?, NULL, ?, ?, NULL, ?, ?, ?, ?, ?)
  `).run(
    generationId,
    cleanText(topic, 500),
    cleanText(targetKeyword, 200),
    cleanText(tone, 100),
    wordCount || 2000,
    JSON.stringify({ parsed, aiMeta: draft.aiMeta }),
    createdBy || null,
    t
  );

  return { generationId, draft };
}

export async function improveBlogDraft({
  draft,
  issues = [],
  suggestions = [],
  targetKeyword,
  categoryName,
}) {
  const improvePrompt = `You are improving a DEWEB blog article that scored below quality threshold.

Target keyword: ${targetKeyword}
Category: ${categoryName}

ISSUES:
${issues.map((i) => `- ${i}`).join("\n")}

SUGGESTIONS:
${suggestions.map((s) => `- ${s}`).join("\n")}

CURRENT ARTICLE JSON:
${JSON.stringify({
  seoTitle: draft.seoTitle,
  metaDescription: draft.metaDescription,
  slug: draft.slug,
  excerpt: draft.excerpt,
  intro: draft.content?.intro,
  sections: draft.content?.sections,
  faqs: draft.content?.faqs,
  internalLinks: draft.content?.internalLinks,
  cta: draft.content?.cta,
  linkedinPost: draft.aiMeta?.linkedinPost,
  facebookPost: draft.aiMeta?.facebookPost,
  xThread: draft.aiMeta?.xThread,
  instagramCaption: draft.aiMeta?.instagramCaption,
})}

Rewrite and return the FULL improved article as JSON using the same schema as the original generation system prompt. Fix all issues. Keep CEO/ROI focus. Min 2000 words, 8 sections, 6 FAQs.`;

  const { parsed, model } = await callOpenAiJson({
    systemPrompt: buildSystemPrompt({ tone: draft.aiMeta?.tone, wordCount: 2200, categoryName }),
    userPrompt: improvePrompt,
    maxTokens: 12000,
  });

  const improved = parseAiResponse(parsed, {
    targetKeyword: targetKeyword || draft.aiMeta?.targetKeyword,
    tone: draft.aiMeta?.tone,
    wordCount: draft.aiMeta?.wordCount || 2200,
    model,
    buyerStage: draft.aiMeta?.buyerStage,
    searchIntent: draft.aiMeta?.searchIntent,
  });

  improved.aiMeta = { ...improved.aiMeta, ...draft.aiMeta, model, improvedAt: nowIso() };
  improved.tags = improved.tags.length ? improved.tags : draft.tags;

  return { draft: improved };
}

export function listAiGenerations(limit = 20) {
  const rows = db
    .prepare(
      `SELECT id, post_id, topic, target_keyword, tone, word_count, created_by, created_at
       FROM blog_ai_generations ORDER BY created_at DESC LIMIT ?`
    )
    .all(limit);
  return rows.map((r) => ({
    id: r.id,
    postId: r.post_id,
    topic: r.topic,
    targetKeyword: r.target_keyword,
    tone: r.tone,
    wordCount: r.word_count,
    createdBy: r.created_by,
    createdAt: r.created_at,
  }));
}

export function getAiGeneration(id) {
  const row = db.prepare("SELECT * FROM blog_ai_generations WHERE id = ?").get(id);
  if (!row) return null;
  return {
    id: row.id,
    postId: row.post_id,
    topic: row.topic,
    result: parseJson(row.result_json, {}),
    createdAt: row.created_at,
  };
}
