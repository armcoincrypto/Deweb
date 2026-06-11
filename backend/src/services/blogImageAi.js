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

/**
 * Generate featured image via OpenAI. Returns public URL path or null on failure.
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
    const body = {
      model,
      prompt: prompt.slice(0, 1000),
      n: 1,
      size: model.includes("dall-e-3") ? "1792x1024" : "1024x1024",
    };
    if (model.includes("dall-e")) {
      body.quality = "standard";
      body.response_format = "b64_json";
    }
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
    let res = await requestImage(primaryModel);
    if (!res.ok && primaryModel !== "dall-e-3") {
      console.warn("[blog-image] Primary model failed, trying dall-e-3");
      res = await requestImage("dall-e-3");
    }

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.warn("[blog-image] API error:", res.status, errBody.slice(0, 200));
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
      if (!imgRes.ok) return null;
      const buf = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(filePath, buf);
    } else {
      console.warn("[blog-image] No image data in response.");
      return null;
    }

    return `/api/uploads/blog/${filename}`;
  } catch (err) {
    console.warn("[blog-image] Generation failed:", err.message);
    return null;
  }
}
