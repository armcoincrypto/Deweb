import { Router } from "express";
import {
  isLinkedInOAuthConfigured,
  createOAuthState,
  consumeOAuthState,
  buildAuthorizationUrl,
  exchangeCodeForToken,
  saveLinkedInCredentials,
  fetchLinkedInPersonUrn,
  getLinkedInConnectionStatus,
} from "../services/linkedinOAuth.js";

const router = Router();

function setupKeyRequired(req, res) {
  const expected = process.env.LINKEDIN_OAUTH_SETUP_KEY?.trim();
  if (!expected) return true;
  const key = String(req.query.key || "");
  if (key !== expected) {
    res.status(403).send("Forbidden — invalid or missing setup key.");
    return false;
  }
  return true;
}

function successHtml({ expiresAt, scope, postingNote }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LinkedIn Connected — DeWeb</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #050816; color: #fff; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0; }
    .card { background: #0d1224; border: 1px solid #00d4ff44; border-radius: 16px; padding: 32px; max-width: 480px; text-align: center; }
    h1 { color: #00d4ff; font-size: 1.5rem; margin: 0 0 12px; }
    p { color: #aab; line-height: 1.6; }
    .ok { font-size: 2.5rem; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="ok">✅</div>
    <h1>LinkedIn Connected</h1>
    <p>DeWeb is now authorized to post on LinkedIn via DeWebam.</p>
    ${postingNote ? `<p><small>${postingNote}</small></p>` : ""}
    ${expiresAt ? `<p><small>Token expires: ${expiresAt}</small></p>` : ""}
    ${scope ? `<p><small>Scopes: ${scope}</small></p>` : ""}
    <p><small>You can close this page and return to Telegram.</small></p>
  </div>
</body>
</html>`;
}

function errorHtml(message) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>LinkedIn Error — DeWeb</title>
<style>body{font-family:system-ui,sans-serif;background:#050816;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0}
.card{background:#0d1224;border:1px solid #ff444444;border-radius:16px;padding:32px;max-width:480px;text-align:center}
h1{color:#ff6666;font-size:1.25rem}</style></head>
<body><div class="card"><h1>LinkedIn Connection Failed</h1><p>${message}</p></div></body></html>`;
}

/** GET /api/linkedin/connect — start OAuth flow */
router.get("/connect", (req, res) => {
  if (!setupKeyRequired(req, res)) return;

  if (!isLinkedInOAuthConfigured()) {
    return res.status(500).send(
      errorHtml("Missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET in server .env")
    );
  }

  const state = createOAuthState();
  const url = buildAuthorizationUrl(state);
  res.redirect(url);
});

/** GET /api/linkedin/callback — OAuth redirect handler */
router.get("/callback", async (req, res) => {
  const { code, state, error, error_description: errorDesc } = req.query;

  if (error) {
    console.warn("[linkedin-oauth] Authorization denied:", error, errorDesc || "");
    return res.status(400).send(errorHtml(errorDesc || String(error)));
  }

  if (!code || !state) {
    return res.status(400).send(errorHtml("Missing authorization code or state."));
  }

  if (!consumeOAuthState(String(state))) {
    return res.status(400).send(errorHtml("Invalid or expired OAuth state. Start again from /api/linkedin/connect"));
  }

  try {
    const tokenData = await exchangeCodeForToken(String(code));
    const personUrn = await fetchLinkedInPersonUrn(tokenData.access_token);
    const saved = saveLinkedInCredentials(tokenData, personUrn);
    let postingNote = saved.scope?.includes("w_organization_social")
      ? "Posting as DeWeb company page (if org URN is set)."
      : "Posting as your personal LinkedIn profile.";
    if (!personUrn) {
      postingNote +=
        " Could not auto-detect profile URN — set LINKEDIN_PERSON_URN in .env if Post fails.";
    }
    res.send(successHtml({ ...saved, postingNote }));
  } catch (err) {
    console.error("[linkedin-oauth] Token exchange failed:", err.message);
    res.status(500).send(errorHtml(err.message));
  }
});

/** GET /api/linkedin/status — connection status (no secrets exposed) */
router.get("/status", (_req, res) => {
  res.json(getLinkedInConnectionStatus());
});

export default router;
