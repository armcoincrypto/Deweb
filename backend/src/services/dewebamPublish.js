/**
 * Publish DeWebam content to social platforms.
 * Requires API credentials in .env — see .env.example for all keys.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { absoluteImageUrl } from "./dewebamImage.js";
import { formatCopyText } from "./dewebamContentAi.js";
import { getLinkedInAccessToken, ensureLinkedInAuthorUrn, getLinkedInAuthorUrn } from "./linkedinOAuth.js";
import {
  createXTweet,
  getXCredentials,
  isXConfigured,
  uploadXMedia,
} from "./xOAuth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_ROOT = path.resolve(__dirname, "../../uploads");
const LINKEDIN_API_VERSION = "202506";

function linkedInHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "LinkedIn-Version": LINKEDIN_API_VERSION,
    "X-Restli-Protocol-Version": "2.0.0",
  };
}

function env(name) {
  return process.env[name]?.trim() || "";
}

function buildPostText(platform, content) {
  return formatCopyText(platform, content);
}

async function downloadImageBuffer(imageUrl) {
  const abs = absoluteImageUrl(imageUrl);
  if (!abs) return null;

  if (abs.includes("/api/uploads/")) {
    const rel = abs.split("/api/uploads/")[1];
    const local = path.join(UPLOAD_ROOT, rel);
    if (fs.existsSync(local)) return fs.readFileSync(local);
  }

  const res = await fetch(abs);
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

/** LinkedIn — REST Posts API (replaces legacy ugcPosts) */
async function uploadLinkedInImage(token, authorUrn, imageBuffer) {
  const initRes = await fetch("https://api.linkedin.com/rest/images?action=initializeUpload", {
    method: "POST",
    headers: linkedInHeaders(token),
    body: JSON.stringify({ initializeUploadRequest: { owner: authorUrn } }),
  });

  if (!initRes.ok) {
    const err = await initRes.text().catch(() => "");
    throw new Error(`LinkedIn image init ${initRes.status}: ${err.slice(0, 300)}`);
  }

  const initData = await initRes.json();
  const uploadUrl = initData.value?.uploadUrl;
  const imageUrn = initData.value?.image;
  if (!uploadUrl || !imageUrn) {
    throw new Error("LinkedIn image init missing uploadUrl or image URN");
  }

  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "image/png" },
    body: imageBuffer,
  });
  if (!putRes.ok) {
    const err = await putRes.text().catch(() => "");
    throw new Error(`LinkedIn image upload ${putRes.status}: ${err.slice(0, 200)}`);
  }

  return imageUrn;
}

async function publishLinkedIn(text, imageUrl) {
  const token = getLinkedInAccessToken();
  const author = await ensureLinkedInAuthorUrn();
  if (!token || !author) {
    return {
      ok: false,
      error:
        "Missing LinkedIn token or profile ID. Open /api/linkedin/setup after connecting, or reconnect with openid profile w_member_social scopes.",
    };
  }

  let imageUrn = null;
  if (imageUrl) {
    const imageBuffer = await downloadImageBuffer(imageUrl);
    if (!imageBuffer) {
      return { ok: false, error: "Could not load image for LinkedIn post." };
    }
    try {
      imageUrn = await uploadLinkedInImage(token, author, imageBuffer);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  const commentary = text.trim() ? text.slice(0, 3000) : " ";
  const body = {
    author,
    commentary,
    visibility: "PUBLIC",
    distribution: { feedDistribution: "MAIN_FEED" },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  if (imageUrn) {
    body.content = { media: { id: imageUrn, altText: "DeWeb" } };
  }

  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: linkedInHeaders(token),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { ok: false, error: `LinkedIn API ${res.status}: ${err.slice(0, 300)}` };
  }

  const platformId =
    res.headers.get("x-restli-id") ||
    res.headers.get("location")?.split("/").pop() ||
    null;
  return { ok: true, platformId, url: env("SOCIAL_LINK_LINKEDIN") || null };
}

/** Facebook Page — Graph API */
async function publishFacebook(text, imageUrl) {
  const pageId = env("FACEBOOK_PAGE_ID");
  const token = env("FACEBOOK_PAGE_ACCESS_TOKEN");
  if (!pageId || !token) {
    return { ok: false, error: "Missing FACEBOOK_PAGE_ID or FACEBOOK_PAGE_ACCESS_TOKEN" };
  }

  const absImage = absoluteImageUrl(imageUrl);
  let url = `https://graph.facebook.com/v21.0/${pageId}/feed`;
  const params = new URLSearchParams({ access_token: token, message: text.slice(0, 63206) });

  if (absImage) {
    url = `https://graph.facebook.com/v21.0/${pageId}/photos`;
    params.set("url", absImage);
    params.set("caption", text.slice(0, 63206));
    params.delete("message");
  }

  const res = await fetch(`${url}?${params.toString()}`, { method: "POST" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: `Facebook API: ${data.error?.message || res.status}` };
  }
  return { ok: true, platformId: data.id || data.post_id || null };
}

/** Instagram Business — Graph API (2-step publish) */
async function publishInstagram(text, imageUrl) {
  const igId = env("INSTAGRAM_BUSINESS_ACCOUNT_ID");
  const token = env("FACEBOOK_PAGE_ACCESS_TOKEN");
  const absImage = absoluteImageUrl(imageUrl);

  if (!igId || !token) {
    return { ok: false, error: "Missing INSTAGRAM_BUSINESS_ACCOUNT_ID or FACEBOOK_PAGE_ACCESS_TOKEN" };
  }
  if (!absImage) {
    return { ok: false, error: "Instagram requires an image — regenerate with image enabled" };
  }

  const caption = text.slice(0, 2200);
  const createParams = new URLSearchParams({
    access_token: token,
    image_url: absImage,
    caption,
  });

  const createRes = await fetch(
    `https://graph.facebook.com/v21.0/${igId}/media?${createParams.toString()}`,
    { method: "POST" }
  );
  const createData = await createRes.json().catch(() => ({}));
  if (!createRes.ok) {
    return { ok: false, error: `Instagram media: ${createData.error?.message || createRes.status}` };
  }

  const publishParams = new URLSearchParams({
    access_token: token,
    creation_id: createData.id,
  });
  const pubRes = await fetch(
    `https://graph.facebook.com/v21.0/${igId}/media_publish?${publishParams.toString()}`,
    { method: "POST" }
  );
  const pubData = await pubRes.json().catch(() => ({}));
  if (!pubRes.ok) {
    return { ok: false, error: `Instagram publish: ${pubData.error?.message || pubRes.status}` };
  }

  return { ok: true, platformId: pubData.id || null };
}

/** X (Twitter) API v2 — OAuth 1.0a user context (preferred) or bearer fallback */
async function publishX(text, content, imageUrl) {
  const creds = getXCredentials();
  if (!creds) {
    return {
      ok: false,
      error:
        "Missing X credentials — set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET (or X_BEARER_TOKEN)",
    };
  }

  const mainText = (content.postText || text || "").trim().slice(0, 280);
  if (!mainText) {
    return { ok: false, error: "X post text is empty" };
  }

  try {
    let mediaIds = [];
    if (imageUrl) {
      const imageBuffer = await downloadImageBuffer(imageUrl);
      if (imageBuffer) {
        mediaIds = [await uploadXMedia(imageBuffer, creds)];
      }
    }

    const first = await createXTweet({ text: mainText, mediaIds, credentials: creds });
    let tweetId = first.data?.id || null;
    let lastId = tweetId;

    const thread = Array.isArray(content.thread)
      ? content.thread.map((t) => String(t).trim()).filter(Boolean).slice(0, 4)
      : [];

    for (const replyText of thread) {
      const reply = await createXTweet({
        text: replyText.slice(0, 280),
        replyToTweetId: lastId,
        credentials: creds,
      });
      lastId = reply.data?.id || lastId;
    }

    const profile = env("SOCIAL_LINK_X") || "https://x.com/dewebam";
    const url = tweetId ? `https://x.com/i/web/status/${tweetId}` : profile;

    return { ok: true, platformId: tweetId, url };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/** Blog — mark pending_review post as approved in CMS (no public publish without admin) */
async function publishBlog(blogPostId) {
  if (!blogPostId) {
    return { ok: false, error: "No blog post linked" };
  }

  const { db, nowIso } = await import("../db.js");
  const row = db.prepare("SELECT id, status, slug FROM blog_posts WHERE id = ?").get(blogPostId);
  if (!row) return { ok: false, error: "Blog post not found in CMS" };

  db.prepare(
    "UPDATE blog_posts SET status = 'pending_review', updated_at = ? WHERE id = ?"
  ).run(nowIso(), blogPostId);

  const siteUrl = env("SITE_URL") || env("NEXT_PUBLIC_SITE_URL") || "https://dewebam.com";
  return {
    ok: true,
    platformId: blogPostId,
    url: `${siteUrl}/en/admin/blog/pending`,
    note: "Blog saved as pending review — approve in DeWeb admin to publish live",
  };
}

export function getPublishConfigStatus() {
  return {
    linkedin: !!(getLinkedInAccessToken() && getLinkedInAuthorUrn()),
    facebook: !!(env("FACEBOOK_PAGE_ID") && env("FACEBOOK_PAGE_ACCESS_TOKEN")),
    instagram: !!(env("INSTAGRAM_BUSINESS_ACCOUNT_ID") && env("FACEBOOK_PAGE_ACCESS_TOKEN")),
    x: isXConfigured(),
    blog: true,
  };
}

export async function publishToPlatform(platform, post) {
  const content = post.contentParsed || {};
  const text = buildPostText(platform, content);
  const imageUrl = post.image_url;

  switch (platform) {
    case "linkedin":
      return publishLinkedIn(text, absoluteImageUrl(imageUrl));
    case "facebook":
      return publishFacebook(text, imageUrl);
    case "instagram":
      return publishInstagram(text, imageUrl);
    case "x":
      return publishX(text, content, imageUrl);
    case "blog":
      return publishBlog(post.blog_post_id);
    default:
      return { ok: false, error: `Unknown platform: ${platform}` };
  }
}
