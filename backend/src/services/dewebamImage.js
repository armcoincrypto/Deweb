import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { slugify } from "../utils/blogHelpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, "../../uploads/social");

function ensureDir() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function getOpenAiKey() {
  return process.env.OPENAI_API_KEY?.trim() || null;
}

function siteUrl() {
  return process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://dewebam.com";
}

export async function generateSocialImage(imagePrompt, topic, platform) {
  const key = getOpenAiKey();
  if (!key || !imagePrompt) return null;

  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
  const prompt = [
    imagePrompt,
    "Premium DeWeb IT agency brand style.",
    "Dark navy background, cyan neon accents, professional marketing visual.",
    "No text, no logos, no watermarks.",
    `Topic: ${topic}. Platform: ${platform}.`,
  ]
    .join(" ")
    .slice(0, 4000);

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        n: 1,
        size: model.startsWith("gpt-image") ? "1536x1024" : "1024x1024",
      }),
    });

    if (!res.ok) {
      console.warn("[dewebam-image] generation failed:", res.status);
      return null;
    }

    const data = await res.json();
    const b64 = data.data?.[0]?.b64_json;
    const remoteUrl = data.data?.[0]?.url;
    ensureDir();
    const filename = `social-${slugify(topic || platform)}-${Date.now().toString(36)}.png`;
    const filePath = path.join(UPLOAD_DIR, filename);

    if (b64) {
      fs.writeFileSync(filePath, Buffer.from(b64, "base64"));
    } else if (remoteUrl) {
      const imgRes = await fetch(remoteUrl);
      if (!imgRes.ok) return null;
      fs.writeFileSync(filePath, Buffer.from(await imgRes.arrayBuffer()));
    } else {
      return null;
    }

    return {
      publicUrl: `/api/uploads/social/${filename}`,
      absoluteUrl: `${siteUrl()}/api/uploads/social/${filename}`,
    };
  } catch (err) {
    console.warn("[dewebam-image]", err.message);
    return null;
  }
}

export function absoluteImageUrl(relativePath) {
  if (!relativePath) return null;
  if (relativePath.startsWith("http")) return relativePath;
  return `${siteUrl()}${relativePath.startsWith("/") ? "" : "/"}${relativePath}`;
}
