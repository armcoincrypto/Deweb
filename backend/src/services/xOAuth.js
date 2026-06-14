import crypto from "crypto";
import { ENV_FILE_PATH } from "../loadEnv.js";

function readEnv(name) {
  const raw = process.env[name]?.trim() || "";
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function percentEncode(value) {
  return encodeURIComponent(String(value))
    .replace(/!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
}

function signingKey(apiSecret, accessSecret) {
  return `${percentEncode(apiSecret)}&${percentEncode(accessSecret || "")}`;
}

function buildParamString(params) {
  return Object.keys(params)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");
}

function buildSignature({ method, url, params, apiSecret, accessSecret }) {
  const baseUrl = url.split("?")[0];
  const baseString = [
    method.toUpperCase(),
    percentEncode(baseUrl),
    percentEncode(buildParamString(params)),
  ].join("&");

  return crypto
    .createHmac("sha1", signingKey(apiSecret, accessSecret))
    .update(baseString)
    .digest("base64");
}

export function getXCredentials() {
  const apiKey = readEnv("X_API_KEY");
  const apiSecret = readEnv("X_API_SECRET");
  const accessToken = readEnv("X_ACCESS_TOKEN");
  const accessSecret = readEnv("X_ACCESS_TOKEN_SECRET");
  const bearerToken = readEnv("X_BEARER_TOKEN");

  if (apiKey && apiSecret && accessToken && accessSecret) {
    return { mode: "oauth1", apiKey, apiSecret, accessToken, accessSecret };
  }
  if (bearerToken) {
    return { mode: "bearer", bearerToken };
  }
  return null;
}

export function getXConnectionStatus() {
  const hasApiKey = !!readEnv("X_API_KEY");
  const hasApiSecret = !!readEnv("X_API_SECRET");
  const hasAccessToken = !!readEnv("X_ACCESS_TOKEN");
  const hasAccessTokenSecret = !!readEnv("X_ACCESS_TOKEN_SECRET");
  const hasBearerToken = !!readEnv("X_BEARER_TOKEN");
  const creds = getXCredentials();

  return {
    envFile: ENV_FILE_PATH,
    hasApiKey,
    hasApiSecret,
    hasAccessToken,
    hasAccessTokenSecret,
    hasBearerToken,
    canPost: !!creds,
    mode: creds?.mode || null,
    creditsNote:
      creds
        ? "Credentials OK. If publish returns 402, add credits at https://console.x.com → Billing"
        : "Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET in backend/.env",
  };
}

export function isXConfigured() {
  return !!getXCredentials();
}

function oauth1Header({ method, url, extraParams = {}, credentials }) {
  const oauthParams = {
    oauth_consumer_key: credentials.apiKey,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: credentials.accessToken,
    oauth_version: "1.0",
  };

  const allParams = { ...oauthParams, ...extraParams };
  const signature = buildSignature({
    method,
    url,
    params: allParams,
    apiSecret: credentials.apiSecret,
    accessSecret: credentials.accessSecret,
  });

  const headerParams = { ...oauthParams, oauth_signature: signature };
  return (
    "OAuth " +
    Object.keys(headerParams)
      .sort()
      .map((key) => `${percentEncode(key)}="${percentEncode(headerParams[key])}"`)
      .join(", ")
  );
}

export async function xOAuth1Request(method, url, { query, form, json, credentials }) {
  const creds = credentials || getXCredentials();
  if (!creds || creds.mode !== "oauth1") {
    throw new Error("OAuth 1.0a X credentials are not configured");
  }

  const queryString = query
    ? `?${new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)])).toString()}`
    : "";
  const fullUrl = `${url}${queryString}`;

  const extraParams = {};
  if (query) {
    for (const [key, value] of Object.entries(query)) extraParams[key] = String(value);
  }
  if (form) {
    for (const [key, value] of Object.entries(form)) extraParams[key] = String(value);
  }

  const headers = {
    Authorization: oauth1Header({
      method,
      url: fullUrl,
      extraParams,
      credentials: creds,
    }),
  };

  let body;
  if (json) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  } else if (form) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    body = new URLSearchParams(Object.entries(form).map(([k, v]) => [k, String(v)])).toString();
  }

  const res = await fetch(fullUrl, { method, headers, body });
  const text = await res.text().catch(() => "");
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const detail = data.detail || data.errors?.[0]?.message || data.error || text.slice(0, 300);
    throw new Error(`X API ${res.status}: ${detail}`);
  }

  return data;
}

export async function xBearerRequest(method, url, { json } = {}) {
  const creds = getXCredentials();
  if (!creds || creds.mode !== "bearer") {
    throw new Error("X_BEARER_TOKEN is not configured");
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${creds.bearerToken}`,
      "Content-Type": "application/json",
    },
    body: json ? JSON.stringify(json) : undefined,
  });

  const text = await res.text().catch(() => "");
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const detail = data.detail || data.errors?.[0]?.message || data.error || text.slice(0, 300);
    throw new Error(`X API ${res.status}: ${detail}`);
  }

  return data;
}

export async function uploadXMedia(imageBuffer, credentials) {
  const mediaData = imageBuffer.toString("base64");
  const data = await xOAuth1Request(
    "POST",
    "https://upload.twitter.com/1.1/media/upload.json",
    {
      form: { media_data: mediaData },
      credentials,
    }
  );
  const mediaId = data.media_id_string || String(data.media_id || "");
  if (!mediaId) throw new Error("X media upload did not return media_id");
  return mediaId;
}

export async function createXTweet({ text, mediaIds = [], replyToTweetId = null, credentials }) {
  const creds = credentials || getXCredentials();
  if (!creds) throw new Error("X API credentials are not configured");

  const body = { text: text.slice(0, 280) };
  if (mediaIds.length) body.media = { media_ids: mediaIds.slice(0, 4) };
  if (replyToTweetId) body.reply = { in_reply_to_tweet_id: replyToTweetId };

  if (creds.mode === "oauth1") {
    return xOAuth1Request("POST", "https://api.twitter.com/2/tweets", { json: body, credentials: creds });
  }

  return xBearerRequest("POST", "https://api.twitter.com/2/tweets", { json: body });
}

export async function getXMe() {
  const creds = getXCredentials();
  if (!creds) throw new Error("X API credentials are not configured");

  if (creds.mode === "oauth1") {
    return xOAuth1Request("GET", "https://api.twitter.com/2/users/me", {
      query: { "user.fields": "username,name" },
      credentials: creds,
    });
  }

  const data = await xBearerRequest(
    "GET",
    "https://api.twitter.com/2/users/me?user.fields=username,name"
  );
  return data;
}
