import { db } from "../db.js";
import { slugify, wordCountFromContent, RESERVED_BLOG_SLUGS } from "../utils/blogHelpers.js";

const MIN_WORDS = 1500;
const MIN_SECTIONS = 6;
const MIN_FAQS = 4;
const PASS_SCORE = 75;

function countKeywordOccurrences(text, keyword) {
  if (!keyword || !text) return 0;
  const k = keyword.toLowerCase().trim();
  const t = text.toLowerCase();
  let count = 0;
  let pos = 0;
  while ((pos = t.indexOf(k, pos)) !== -1) {
    count++;
    pos += k.length;
  }
  return count;
}

function draftFullText(draft) {
  const parts = [
    draft.title,
    draft.seoTitle,
    draft.metaDescription,
    draft.excerpt,
    ...(draft.content?.intro || []),
  ];
  for (const s of draft.content?.sections || []) {
    parts.push(s.title);
    parts.push(...(s.paragraphs || []));
  }
  for (const f of draft.content?.faqs || []) {
    parts.push(f.question, f.answer);
  }
  return parts.join(" ");
}

/**
 * Score AI blog draft 0–100. passed=true when score >= 75.
 */
export function checkBlogQuality(draft, { excludePostId = null } = {}) {
  const issues = [];
  const suggestions = [];
  let score = 0;

  const titleLen = (draft.seoTitle || draft.title || "").length;
  if (titleLen >= 30 && titleLen <= 65) {
    score += 10;
  } else {
    issues.push(`SEO title length ${titleLen} (target 30–65 chars).`);
    suggestions.push("Rewrite the SEO title to 30–65 characters with the target keyword near the start.");
  }

  const metaLen = (draft.metaDescription || "").length;
  if (metaLen >= 120 && metaLen <= 160) {
    score += 10;
  } else {
    issues.push(`Meta description length ${metaLen} (target 120–160 chars).`);
    suggestions.push("Expand or trim the meta description to 120–160 characters with a clear value proposition.");
  }

  const words = wordCountFromContent(draft.content);
  if (words >= MIN_WORDS) {
    score += 15;
  } else {
    issues.push(`Word count ${words} (minimum ${MIN_WORDS}).`);
    suggestions.push("Add more practical sections with CEO-focused ROI, cost, and implementation detail.");
  }

  const sections = draft.content?.sections || [];
  if (sections.length >= MIN_SECTIONS) {
    score += 15;
  } else {
    issues.push(`Only ${sections.length} sections (minimum ${MIN_SECTIONS}).`);
    suggestions.push("Add sections for problem, solution, DEWEB approach, steps, cost/timeline, and business value.");
  }

  const faqs = draft.content?.faqs || [];
  if (faqs.length >= MIN_FAQS) {
    score += 10;
  } else {
    issues.push(`Only ${faqs.length} FAQs (minimum ${MIN_FAQS}).`);
    suggestions.push("Add FAQ items that address buyer objections and cost/timeline questions.");
  }

  const keyword = draft.aiMeta?.targetKeyword || "";
  const fullText = draftFullText(draft);
  const kwCount = countKeywordOccurrences(fullText, keyword);
  if (keyword && kwCount >= 3) {
    score += 10;
  } else if (keyword && kwCount >= 1) {
    score += 5;
    suggestions.push(`Use "${keyword}" more naturally in headings and body copy (currently ${kwCount} times).`);
  } else {
    issues.push("Target keyword not used naturally in content.");
    suggestions.push(`Weave "${keyword || "target keyword"}" into intro, one H2, and conclusion.`);
  }

  const cta = draft.content?.cta;
  if (cta?.title && cta?.primaryHref) {
    score += 10;
  } else {
    issues.push("Missing or incomplete CTA block.");
    suggestions.push("Add a strong CTA linking to /contact with a clear business outcome.");
  }

  const links = draft.content?.internalLinks || [];
  if (links.length >= 2) {
    score += 10;
  } else {
    issues.push(`Only ${links.length} internal links (need at least 2).`);
    suggestions.push("Link to relevant DEWEB service pages from the body.");
  }

  const emptySections = sections.filter(
    (s) => !s.title?.trim() || !(s.paragraphs || []).some((p) => p.trim())
  );
  if (emptySections.length === 0) {
    score += 10;
  } else {
    issues.push(`${emptySections.length} section(s) have empty title or paragraphs.`);
    suggestions.push("Fill every section with substantive CEO-focused copy.");
  }

  const slug = slugify(draft.slug || draft.title);
  if (!slug || slug.length < 3) {
    issues.push("Invalid slug.");
    score -= 5;
  } else if (RESERVED_BLOG_SLUGS.has(slug)) {
    issues.push("Slug conflicts with a reserved static article.");
  } else {
    const row = db.prepare("SELECT id FROM blog_posts WHERE slug = ?").get(slug);
    if (row && row.id !== excludePostId) {
      issues.push("Slug already exists in blog_posts.");
      suggestions.push("Use a more specific slug with year or qualifier.");
    } else {
      score += 10;
    }
  }

  score = Math.max(0, Math.min(100, score));
  const passed = score >= PASS_SCORE && !issues.some((i) => i.includes("Slug already") || i.includes("reserved"));

  return {
    score,
    passed,
    issues,
    suggestions,
    wordCount: words,
    passThreshold: PASS_SCORE,
  };
}

export { PASS_SCORE as BLOG_QUALITY_PASS_SCORE };
