import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { slugify } from "../utils/blogHelpers.js";
import { buildCategoryImagePrompt } from "./blogImagePrompts.js";
import {
  scoreBlogImageFile,
  isPoorImageQuality,
  MAX_IMAGE_GENERATION_ATTEMPTS,
  IMAGE_QUALITY_PASS_SCORE,
} from "./blogImageQuality.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, "../../uploads/blog");

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

function isGptImageModel(model) {
  return model.startsWith("gpt-image");
}

function isDallE3(model) {
  return model.includes("dall-e-3");
}

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
      quality: "hd",
    };
  }
  return {
    model,
    prompt: text.slice(0, 1000),
    n: 1,
    size: "1024x1024",
  };
}

function resolveImageModels() {
  const primary = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
  const models = [primary];
  if (!isGptImageModel(primary) && primary !== "dall-e-3") {
    models.push("dall-e-3");
  }
  return [...new Set(models)];
}

async function requestImage(model, prompt, openaiKey) {
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

async function saveImageResponse(data, slug, title, topic) {
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
    fs.writeFileSync(filePath, Buffer.from(await imgRes.arrayBuffer()));
  } else {
    return null;
  }

  return { filePath, publicUrl: `/api/uploads/blog/${filename}` };
}

/**
 * Generate premium category-specific featured image with quality scoring and retries.
 * Never throws — returns null url on total failure.
 */
export async function generateBlogFeaturedImage({
  featuredImagePrompt,
  title,
  topic,
  categoryName,
  categorySlug,
  slug,
}) {
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (!openaiKey) {
    console.warn("[blog-image] OPENAI_API_KEY not set — skipping image.");
    return { url: null, imageQualityScore: null, imageAttempts: 0 };
  }

  const models = resolveImageModels();
  const attempts = [];
  let best = null;

  for (let attempt = 1; attempt <= MAX_IMAGE_GENERATION_ATTEMPTS; attempt++) {
    const prompt = buildCategoryImagePrompt({
      categorySlug,
      categoryName,
      title,
      topic,
      featuredImagePrompt,
      attempt,
    });

    let res = null;
    let usedModel = models[0];

    for (const model of models) {
      usedModel = model;
      res = await requestImage(model, prompt, openaiKey);
      if (res.ok) break;
      const errBody = await res.text().catch(() => "");
      console.warn(`[blog-image] ${model} attempt ${attempt} failed (${res.status}):`, errBody.slice(0, 180));
    }

    if (!res?.ok) continue;

    try {
      const data = await res.json();
      const saved = await saveImageResponse(data, slug, title, topic);
      if (!saved) continue;

      const score = scoreBlogImageFile(saved.filePath, { categorySlug, attempt });
      const entry = {
        url: saved.publicUrl,
        score,
        attempt,
        model: usedModel,
        filePath: saved.filePath,
      };
      attempts.push(entry);

      if (!best || score > best.score) {
        best = entry;
      }

      if (!isPoorImageQuality(score)) {
        console.log(
          `[blog-image] Quality pass (${score}/${IMAGE_QUALITY_PASS_SCORE}) on attempt ${attempt} (${usedModel})`
        );
        break;
      }

      console.warn(
        `[blog-image] Quality below threshold (${score}/${IMAGE_QUALITY_PASS_SCORE}) — retrying (${attempt}/${MAX_IMAGE_GENERATION_ATTEMPTS})`
      );
    } catch (err) {
      console.warn(`[blog-image] Attempt ${attempt} save failed:`, err.message);
    }
  }

  if (!best) {
    console.warn("[blog-image] All generation attempts failed — continuing without featured image.");
    return { url: null, imageQualityScore: null, imageAttempts: attempts.length };
  }

  for (const entry of attempts) {
    if (entry.filePath !== best.filePath && fs.existsSync(entry.filePath)) {
      try {
        fs.unlinkSync(entry.filePath);
      } catch {
        /* keep best only */
      }
    }
  }

  console.log(
    `[blog-image] Saved featured image (score ${best.score}, attempt ${best.attempt}, ${best.model}): ${best.url}`
  );

  return {
    url: best.url,
    imageQualityScore: best.score,
    imageAttempts: attempts.length,
    categorySlug: categorySlug || null,
  };
}
