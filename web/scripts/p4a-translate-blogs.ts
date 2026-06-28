/**
 * Translate EN blog JSON overlays to RU / ES / AM batch files.
 * Usage:
 *   npx tsx scripts/p4a-translate-blogs.ts all
 *   npx tsx scripts/p4a-translate-blogs.ts batch-b --locale ru --force
 */
import fs from "fs";
import path from "path";
import { translate } from "@vitalets/google-translate-api";
import type { BlogTexts } from "../src/lib/i18n/content/types";

const EN_DIR = path.join(__dirname, "p4a/en");
const LOCALES = ["ru", "es", "am"] as const;
type Locale = (typeof LOCALES)[number];

const BATCHES: Record<string, string[]> = {
  "batch-a": [
    "telegram-bot-development-guide",
    "ai-automation-for-ecommerce",
    "ai-chatbots-for-business",
    "how-to-hire-software-developers",
    "how-to-build-a-marketplace-website",
  ],
  "batch-b": [
    "shopify-development-cost-2026",
    "shopify-vs-woocommerce",
    "best-shopify-apps",
    "shopify-plus-vs-standard",
    "headless-commerce-guide",
  ],
  "batch-c": [
    "custom-web-application-development",
    "saas-development-guide",
    "best-ecommerce-platforms",
    "future-of-ai-in-business",
    "nextjs-vs-wordpress",
  ],
  "batch-d": [
    "mvp-development-cost-guide",
    "technical-seo-for-ecommerce",
    "marketplace-monetization-strategies",
    "outsourcing-software-development-2026",
    "competitive-bidding-it-projects",
  ],
};

const LOCALE_MAP: Record<Locale, string> = { ru: "ru", es: "es", am: "hy" };

const LINK_LABELS: Record<Locale, Record<string, string>> = {
  ru: {
    "/marketplace/hire-web-developers": "Нанять веб-разработчиков на маркетплейсе DEWEB",
    "/marketplace/hire-telegram-bot-developers": "Нанять разработчиков Telegram-ботов на DEWEB",
    "/marketplace/hire-ai-automation-specialists":
      "Нанять специалистов по AI-автоматизации на DEWEB",
    "/marketplace": "Маркетплейс разработки DEWEB",
    "/services/shopify-development": "Разработка Shopify",
    "/services/shopify-custom-apps": "Разработка кастомных приложений Shopify",
    "/services/ai-chatbot-development": "Разработка AI-чатботов",
    "/services/ai-business-automation": "AI-автоматизация бизнеса",
    "/services/web-application-development": "Разработка веб-приложений",
    "/services/marketplace-development": "Разработка маркетплейсов",
    "/services/saas-development": "Разработка SaaS",
    "/services/telegram-bot-development": "Разработка Telegram-ботов",
    "/services/landing-page-development": "Разработка лендингов",
    "/services/seo": "Техническое SEO",
    "/services": "Услуги DEWEB",
    "/contact": "Связаться с DEWEB",
  },
  es: {
    "/marketplace/hire-web-developers": "Contratar desarrolladores web en DEWEB Marketplace",
    "/marketplace/hire-telegram-bot-developers":
      "Contratar desarrolladores de bots de Telegram en DEWEB",
    "/marketplace/hire-ai-automation-specialists":
      "Contratar especialistas en automatización con IA en DEWEB",
    "/marketplace": "Marketplace de desarrollo DEWEB",
    "/services/shopify-development": "Desarrollo Shopify",
    "/services/shopify-custom-apps": "Desarrollo de apps personalizadas Shopify",
    "/services/ai-chatbot-development": "Desarrollo de chatbots con IA",
    "/services/ai-business-automation": "Automatización empresarial con IA",
    "/services/web-application-development": "Desarrollo de aplicaciones web",
    "/services/marketplace-development": "Desarrollo de marketplaces",
    "/services/saas-development": "Desarrollo SaaS",
    "/services/telegram-bot-development": "Desarrollo de bots de Telegram",
    "/services/landing-page-development": "Desarrollo de landing pages",
    "/services/seo": "SEO técnico",
    "/services": "Servicios DEWEB",
    "/contact": "Contactar con DEWEB",
  },
  am: {
    "/marketplace/hire-web-developers": "DEWEB Marketplace-ում վեբ ծրագրավորողներ",
    "/marketplace/hire-telegram-bot-developers": "DEWEB-ում Telegram բոտերի ծրագրավորողներ",
    "/marketplace/hire-ai-automation-specialists": "DEWEB-ում AI ավտոմատացման մասնագետներ",
    "/marketplace": "DEWEB ծրագրավորման marketplace",
    "/services/shopify-development": "Shopify զարգացում",
    "/services/shopify-custom-apps": "Shopify custom apps զարգացում",
    "/services/ai-chatbot-development": "AI chatbot զարգացում",
    "/services/ai-business-automation": "AI բիզնես ավտոմատացում",
    "/services/web-application-development": "Վեբ հավելվածների զարգացում",
    "/services/marketplace-development": "Marketplace զարգացում",
    "/services/saas-development": "SaaS զարգացում",
    "/services/telegram-bot-development": "Telegram բոտերի զարգացում",
    "/services/landing-page-development": "Landing page զարգացում",
    "/services/seo": "Տեխնիկական SEO",
    "/services": "DEWEB ծառայություններ",
    "/contact": "Կապ DEWEB-ի հետ",
  },
};

const CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  ru: {
    "Shopify & E-commerce": "Shopify и E-commerce",
    "AI & Automation": "AI и автоматизация",
    "Web Development": "Веб-разработка",
    Marketplace: "Маркетплейс",
    SaaS: "SaaS",
  },
  es: {
    "Shopify & E-commerce": "Shopify y E-commerce",
    "AI & Automation": "IA y automatización",
    "Web Development": "Desarrollo web",
    Marketplace: "Marketplace",
    SaaS: "SaaS",
  },
  am: {
    "Shopify & E-commerce": "Shopify և E-commerce",
    "AI & Automation": "AI և ավտոմատացում",
    "Web Development": "Վեբ զարգացում",
    Marketplace: "Marketplace",
    SaaS: "SaaS",
  },
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function isCorrupted(text: string): boolean {
  return (
    /MYMEMORY WARNING/i.test(text) ||
    /QUERY LENGTH LIMIT/i.test(text) ||
    /USAGE LIMITS/i.test(text)
  );
}

function isLikelyTranslated(text: string, locale: Locale, enText: string): boolean {
  if (!text || text === enText || isCorrupted(text)) return false;
  if (locale === "ru") return /[а-яА-ЯёЁ]/.test(text);
  if (locale === "es") return /[áéíóúñü]|ción|ación|para |desde /i.test(text);
  if (locale === "am") return /[\u0530-\u058F]/.test(text);
  return false;
}

function validateBlogTexts(data: BlogTexts, locale: Locale, en: BlogTexts): string[] {
  const issues: string[] = [];
  const sample = JSON.stringify(data);
  if (isCorrupted(sample)) issues.push("corrupted translation payload");
  if (!isLikelyTranslated(data.title, locale, en.title)) issues.push("title not localized");
  if (!isLikelyTranslated(data.intro[0] ?? "", locale, en.intro[0] ?? "")) {
    issues.push("intro not localized");
  }
  if (data.sections.length !== en.sections.length) issues.push("section count mismatch");
  return issues;
}

async function googleTranslate(text: string, locale: Locale, attempt = 1): Promise<string> {
  if (!text.trim()) return text;
  try {
    const res = await translate(text, { to: LOCALE_MAP[locale], from: "en" });
    if (isCorrupted(res.text)) throw new Error("Corrupted translation response");
    await sleep(2800);
    return res.text;
  } catch (err) {
    if (attempt < 6) {
      const wait = attempt * 12000;
      console.warn(`Retry ${attempt} in ${wait}ms...`);
      await sleep(wait);
      return googleTranslate(text, locale, attempt + 1);
    }
    throw err;
  }
}

async function translateString(text: string, locale: Locale): Promise<string> {
  if (!text.trim()) return text;
  const words = text.split(/\s+/);
  if (words.length <= 450 && text.length <= 4800) return googleTranslate(text, locale);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += 450) {
    chunks.push(words.slice(i, i + 450).join(" "));
  }
  const parts: string[] = [];
  for (const chunk of chunks) parts.push(await googleTranslate(chunk, locale));
  return parts.join(" ");
}

async function translateBlogTexts(en: BlogTexts, locale: Locale): Promise<BlogTexts> {
  const title = await translateString(en.title, locale);
  const excerpt = await translateString(en.excerpt, locale);
  const category = CATEGORY_LABELS[locale][en.category] ?? (await translateString(en.category, locale));
  const readTime = await translateString(en.readTime, locale);
  const tags = [];
  for (const tag of en.tags) tags.push(await translateString(tag, locale));

  const intro = [];
  for (const p of en.intro) intro.push(await translateString(p, locale));

  const sections = [];
  for (const section of en.sections) {
    const sectionTitle = await translateString(section.title, locale);
    const paragraphs = [];
    for (const p of section.paragraphs) paragraphs.push(await translateString(p, locale));
    sections.push({ title: sectionTitle, paragraphs });
  }

  const faqs = [];
  for (const faq of en.faqs) {
    faqs.push({
      question: await translateString(faq.question, locale),
      answer: await translateString(faq.answer, locale),
    });
  }

  const internalLinks = [];
  for (const link of en.internalLinks) {
    internalLinks.push({
      href: link.href,
      label: LINK_LABELS[locale][link.href] ?? (await translateString(link.label, locale)),
    });
  }

  const cta = {
    title: await translateString(en.cta.title, locale),
    description: await translateString(en.cta.description, locale),
    primaryLabel: await translateString(en.cta.primaryLabel, locale),
    primaryHref: en.cta.primaryHref,
    ...(en.cta.secondaryLabel
      ? {
          secondaryLabel: await translateString(en.cta.secondaryLabel, locale),
          secondaryHref: en.cta.secondaryHref,
        }
      : {}),
  };

  return {
    title,
    excerpt,
    seoTitle: en.seoTitle ? await translateString(en.seoTitle, locale) : undefined,
    metaDescription: en.metaDescription
      ? await translateString(en.metaDescription, locale)
      : undefined,
    category,
    readTime,
    tags,
    intro,
    sections,
    faqs,
    internalLinks,
    cta,
  };
}

async function translateBatch(
  batchName: string,
  targetLocales: Locale[],
  force: boolean
) {
  const slugs = BATCHES[batchName];
  if (!slugs) throw new Error(`Unknown batch ${batchName}`);

  for (const locale of targetLocales) {
    const outPath = path.join(__dirname, "../src/i18n/content", locale, "blog", `${batchName}.json`);
    const out: Record<string, BlogTexts> = fs.existsSync(outPath)
      ? (JSON.parse(fs.readFileSync(outPath, "utf8")) as Record<string, BlogTexts>)
      : {};

    console.log(`\n=== ${batchName} → ${locale} ===`);
    for (const slug of slugs) {
      const en = JSON.parse(
        fs.readFileSync(path.join(EN_DIR, `${slug}.json`), "utf8")
      ) as BlogTexts;

      const existing = out[slug];
      const corrupted = existing && isCorrupted(JSON.stringify(existing));
      const valid =
        existing &&
        !corrupted &&
        validateBlogTexts(existing, locale, en).length === 0;
      if (!force && valid) {
        console.log(`Skip ${slug} (already localized)`);
        continue;
      }

      console.log(`Translating ${slug}...`);
      const translated = await translateBlogTexts(en, locale);
      const issues = validateBlogTexts(translated, locale, en);
      if (issues.length) {
        throw new Error(`${slug} validation failed: ${issues.join(", ")}`);
      }
      out[slug] = translated;
      fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
      console.log(`  Saved ${slug}`);
    }
    console.log(`Wrote ${outPath}`);
  }
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const localeArg = args.find((a) => a.startsWith("--locale="))?.split("=")[1] as Locale | undefined;
const batchArg = args.find((a) => !a.startsWith("--")) ?? "all";
const targetLocales = localeArg ? [localeArg] : [...LOCALES];
const batches = batchArg === "all" ? Object.keys(BATCHES) : [batchArg];

(async () => {
  for (const batch of batches) {
    await translateBatch(batch, targetLocales, force);
  }
  console.log("\nDone.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
