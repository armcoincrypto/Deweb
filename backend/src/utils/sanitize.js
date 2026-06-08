export function cleanText(value, maxLen = 5000) {
  return String(value || "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function cleanEmail(value) {
  return cleanText(value, 254).toLowerCase();
}

export function cleanPhone(value) {
  return cleanText(value, 40).replace(/[^\d+\-() .@a-zA-Z]/g, "");
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parsePrice(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Strip script tags and event handlers from text fields. */
export function sanitizeBlogText(value, maxLen = 8000) {
  return cleanText(value, maxLen)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

export function sanitizeBlogHref(href) {
  const h = cleanText(href, 200);
  if (!h.startsWith("/") || h.startsWith("//")) return "/";
  return h.replace(/[<>"']/g, "");
}

export function sanitizeBlogContent(content) {
  if (!content || typeof content !== "object") {
    return { intro: [], sections: [], faqs: [], internalLinks: [], cta: null };
  }
  return {
    intro: Array.isArray(content.intro)
      ? content.intro.map((p) => sanitizeBlogText(p, 8000))
      : [],
    sections: Array.isArray(content.sections)
      ? content.sections.map((s) => ({
          title: sanitizeBlogText(s.title, 300),
          paragraphs: Array.isArray(s.paragraphs)
            ? s.paragraphs.map((p) => sanitizeBlogText(p, 8000))
            : [],
        }))
      : [],
    faqs: Array.isArray(content.faqs)
      ? content.faqs.map((f) => ({
          question: sanitizeBlogText(f.question, 500),
          answer: sanitizeBlogText(f.answer, 3000),
        }))
      : [],
    internalLinks: Array.isArray(content.internalLinks)
      ? content.internalLinks.slice(0, 8).map((l) => ({
          href: sanitizeBlogHref(l.href),
          label: sanitizeBlogText(l.label, 200),
        }))
      : [],
    cta: content.cta
      ? {
          title: sanitizeBlogText(content.cta.title, 300),
          description: sanitizeBlogText(content.cta.description, 1000),
          primaryLabel: sanitizeBlogText(content.cta.primaryLabel, 100),
          primaryHref: sanitizeBlogHref(content.cta.primaryHref || "/contact"),
          secondaryLabel: content.cta.secondaryLabel
            ? sanitizeBlogText(content.cta.secondaryLabel, 100)
            : undefined,
          secondaryHref: content.cta.secondaryHref
            ? sanitizeBlogHref(content.cta.secondaryHref)
            : undefined,
        }
      : null,
  };
}
