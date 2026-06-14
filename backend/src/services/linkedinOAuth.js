import crypto from "crypto";
import { db, nowIso } from "../db.js";

const PROVIDER = "linkedin";
const CREDENTIALS_ID = "default";
const STATE_TTL_MS = 10 * 60 * 1000;

function env(name) {
  return process.env[name]?.trim() || "";
}

export function getLinkedInOAuthConfig() {
  return {
    clientId: env("LINKEDIN_CLIENT_ID"),
    clientSecret: env("LINKEDIN_CLIENT_SECRET"),
    redirectUri:
      env("LINKEDIN_REDIRECT_URI") || "https://dewebam.com/api/linkedin/callback",
    scopes: ["w_member_social", "w_organization_social", "r_organization_social"],
  };
}

export function isLinkedInOAuthConfigured() {
  const { clientId, clientSecret } = getLinkedInOAuthConfig();
  return !!(clientId && clientSecret);
}

function purgeExpiredStates() {
  db.prepare("DELETE FROM oauth_states WHERE expires_at < ?").run(nowIso());
}

export function createOAuthState() {
  purgeExpiredStates();
  const state = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + STATE_TTL_MS).toISOString();
  db.prepare(
    "INSERT INTO oauth_states (state, provider, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).run(state, PROVIDER, expiresAt, nowIso());
  return state;
}

export function consumeOAuthState(state) {
  if (!state) return false;
  purgeExpiredStates();
  const row = db
    .prepare("SELECT * FROM oauth_states WHERE state = ? AND provider = ?")
    .get(state, PROVIDER);
  if (!row) return false;
  if (row.expires_at < nowIso()) {
    db.prepare("DELETE FROM oauth_states WHERE state = ?").run(state);
    return false;
  }
  db.prepare("DELETE FROM oauth_states WHERE state = ?").run(state);
  return true;
}

export function buildAuthorizationUrl(state) {
  const { clientId, redirectUri, scopes } = getLinkedInOAuthConfig();
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    state,
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

export async function exchangeCodeForToken(code) {
  const { clientId, clientSecret, redirectUri } = getLinkedInOAuthConfig();

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  });

  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error_description || data.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  if (!data.access_token) {
    throw new Error("LinkedIn did not return an access_token");
  }

  return data;
}

export function saveLinkedInCredentials(tokenData) {
  const t = nowIso();
  const expiresAt = tokenData.expires_in
    ? new Date(Date.now() + Number(tokenData.expires_in) * 1000).toISOString()
    : null;

  const existing = db
    .prepare("SELECT id FROM linkedin_credentials WHERE id = ?")
    .get(CREDENTIALS_ID);

  if (existing) {
    db.prepare(`
      UPDATE linkedin_credentials
      SET access_token = ?, refresh_token = ?, expires_at = ?, scope = ?, updated_at = ?
      WHERE id = ?
    `).run(
      tokenData.access_token,
      tokenData.refresh_token || null,
      expiresAt,
      tokenData.scope || null,
      t,
      CREDENTIALS_ID
    );
  } else {
    db.prepare(`
      INSERT INTO linkedin_credentials (id, access_token, refresh_token, expires_at, scope, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      CREDENTIALS_ID,
      tokenData.access_token,
      tokenData.refresh_token || null,
      expiresAt,
      tokenData.scope || null,
      t,
      t
    );
  }

  // Never log the token — only metadata
  console.log("[linkedin-oauth] Access token saved securely.", {
    expiresAt,
    scope: tokenData.scope || null,
    hasRefreshToken: !!tokenData.refresh_token,
  });

  return { expiresAt, scope: tokenData.scope || null };
}

/** Returns active access token — DB first, then env fallback */
export function getLinkedInAccessToken() {
  const row = db
    .prepare("SELECT access_token, expires_at FROM linkedin_credentials WHERE id = ?")
    .get(CREDENTIALS_ID);

  if (row?.access_token) {
    if (row.expires_at && row.expires_at < nowIso()) {
      console.warn("[linkedin-oauth] Stored token expired — reconnect via /api/linkedin/connect");
      return env("LINKEDIN_ACCESS_TOKEN") || null;
    }
    return row.access_token;
  }

  return env("LINKEDIN_ACCESS_TOKEN") || null;
}

export function getLinkedInConnectionStatus() {
  const row = db
    .prepare("SELECT expires_at, scope, updated_at FROM linkedin_credentials WHERE id = ?")
    .get(CREDENTIALS_ID);

  const token = getLinkedInAccessToken();
  return {
    connected: !!token,
    source: row ? "oauth" : env("LINKEDIN_ACCESS_TOKEN") ? "env" : null,
    expiresAt: row?.expires_at || null,
    scope: row?.scope || null,
    updatedAt: row?.updated_at || null,
  };
}
