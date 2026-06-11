import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { slugify } from "../utils/blogHelpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, "../../uploads/blog");

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

function buildImagePrompt({ featuredImagePrompt, title, topic, categoryName }) {
  if (featuredImagePrompt?.trim()) {
    return `${featuredImagePrompt.trim()}. Professional blog hero image, modern SaaS ecommerce AI agency aesthetic, clean composition, no text, no logos, no watermarks.`;
  }
  return (
    `Professional blog hero image for article: "${title || topic}". ` +
    `Theme: ${categoryName || "technology business"}. ` +
    `Modern SaaS, ecommerce, Shopify, or AI automation agency style. ` +
    `Abstract tech workspace, dashboards, or growth visuals. No text, no logos, no watermarks.`
  );
}

function isGptImageModel(model) {
  return model.startsWith("gpt-image");
}

function isDallE3(model) {
  return model.includes("dall-e-3");
}

/** Build request body with only parameters supported by each image model. */
function buildImageRequestBody(model, prompt) {
  const text = prompt.slice(0, 4000);
  if (isGptImageModel(model)) {
    return {
      model,
      prompt: text,
      n: 1,
      size: "1536x1024",
    };
  }
  if (isDallE3(model)) {
    return {
      model,
      prompt: text,
      n: 1,
      size: "1792x1024",
      quality: "standard",
    };
  }
  return {
    model,
    prompt: text.slice(0, 1000),
    n: 1,
    size: "1024x1024",
  };
}

function fallbackModels(primaryModel) {
  const chain = [];
  if (!isDallE3(primaryModel) && !isGptImageModel(primaryModel)) {
    chain.push("dall-e-3");
  } else if (isGptImageModel(primaryModel)) {
    chain.push("dall-e-3");
  }
  return chain;
}

/**
 * Generate featured image via OpenAI. Returns public URL path or null on failure.
 * Never throws — article creation must continue without an image.
 */
export async function generateBlogFeaturedImage({
  featuredImagePrompt,
  title,
  topic,
  categoryName,
  slug,
}) {
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (!openaiKey) {
    console.warn("[blog-image] OPENAI_API_KEY not set — skipping image.");
    return null;
  }

  const primaryModel = process.env.OPENAI_IMAGE_MODEL || "dall-e-3";
  const prompt = buildImagePrompt({ featuredImagePrompt, title, topic, categoryName });

  async function requestImage(model) {
    const body = buildImageRequestBody(model, prompt);
    return fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify(body),
    });
  }

  try {
    const modelsToTry = [primaryModel, ...fallbackModels(primaryModel)];
    let res = null;
    let usedModel = primaryModel;

    for (const model of modelsToTry) {
      usedModel = model;
      res = await requestImage(model);
      if (res.ok) break;
      const errBody = await res.text().catch(() => "");
      console.warn(`[blog-image] ${model} failed (${res.status}):`, errBody.slice(0, 200));
      if (model !== modelsToTry[modelsToTry.length - 1]) {
        console.warn(`[blog-image] Trying fallback model…`);
      }
    }

    if (!res?.ok) {
      console.warn("[blog-image] All image models failed — continuing without featured image.");
      return null;
    }

    const data = await res.json();
    const b64 = data.data?.[0]?.b64_json;
    const imageUrl = data.data?.[0]?.url;

    ensureUploadDir();
    const baseName = slugify(slug || title || topic || "blog") || "blog";
    const filename = `${baseName}-${Date.now().toString(36)}.png`;
    const filePath = path.join(UPLOAD_DIR, filename);

    if (b64) {
      fs.writeFileSync(filePath, Buffer.from(b64, "base64"));
    } else if (imageUrl) {
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) {
        console.warn("[blog-image] Failed to download image URL.");
        return null;
      }
      const buf = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(filePath, buf);
    } else {
      console.warn("[blog-image] No image data in response.");
      return null;
    }

    console.log(`[blog-image] Saved featured image (${usedModel}): /api/uploads/blog/${filename}`);
    return `/api/uploads/blog/${filename}`;
  } catch (err) {
    console.warn("[blog-image] Generation failed:", err.message);
    return null;
  }
}
