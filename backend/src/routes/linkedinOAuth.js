import express, { Router } from "express";
import {
  isLinkedInOAuthConfigured,
  createOAuthState,
  consumeOAuthState,
  buildAuthorizationUrl,
  exchangeCodeForToken,
  saveLinkedInCredentials,
  fetchLinkedInPersonUrn,
  getLinkedInConnectionStatus,
  saveLinkedInPersonUrn,
} from "../services/linkedinOAuth.js";

const router = Router();

function setupKeyRequired(req, res) {
  const expected = process.env.LINKEDIN_OAUTH_SETUP_KEY?.trim();
  if (!expected) return true;
  const key = String(req.query.key || req.body?.key || "");
  if (key !== expected) {
    res.status(403).send("Forbidden — invalid or missing setup key.");
    return false;
  }
  return true;
}

function setupKeyQuery() {
  const key = process.env.LINKEDIN_OAUTH_SETUP_KEY?.trim();
  return key ? `?key=${encodeURIComponent(key)}` : "";
}

function pageShell({ title, accent, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — DeWeb</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #050816; color: #fff; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0; padding: 24px; box-sizing: border-box; }
    .card { background: #0d1224; border: 1px solid ${accent}44; border-radius: 16px; padding: 32px; max-width: 520px; width: 100%; text-align: center; }
    h1 { color: ${accent}; font-size: 1.5rem; margin: 0 0 12px; }
    p, li { color: #aab; line-height: 1.6; text-align: left; }
    .ok { font-size: 2.5rem; margin-bottom: 8px; text-align: center; }
    input[type=text] { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #334; background: #050816; color: #fff; font-size: 1rem; box-sizing: border-box; margin: 12px 0; }
    button { background: #00d4ff; color: #050816; border: none; border-radius: 8px; padding: 12px 24px; font-weight: 600; cursor: pointer; width: 100%; font-size: 1rem; }
    a { color: #00d4ff; }
    ol { padding-left: 1.25rem; }
    .center { text-align: center; }
  </style>
</head>
<body>
  <div class="card">${bodyHtml}</div>
</body>
</html>`;
}

function successHtml({ expiresAt, scope, postingNote, setupUrl }) {
  const setupLink = setupUrl ? `<p class="center"><a href="${setupUrl}">Set up LinkedIn profile ID →</a></p>` : "";
  return pageShell({
    title: "LinkedIn Connected",
    accent: "#00d4ff",
    bodyHtml: `
    <div class="ok">✅</div>
    <h1>LinkedIn Connected</h1>
    <p class="center">DeWeb is now authorized to post on LinkedIn via DeWebam.</p>
    ${postingNote ? `<p><small>${postingNote}</small></p>` : ""}
    ${setupLink}
    ${expiresAt ? `<p class="center"><small>Token expires: ${expiresAt}</small></p>` : ""}
    ${scope ? `<p class="center"><small>Scopes: ${scope}</small></p>` : ""}
    <p class="center"><small>You can close this page and return to Telegram.</small></p>`,
  });
}

function errorHtml(message) {
  return pageShell({
    title: "LinkedIn Error",
    accent: "#ff6666",
    bodyHtml: `<h1>LinkedIn Connection Failed</h1><p>${message}</p>`,
  });
}

function setupHtml({ status, saved, error }) {
  const keyField = process.env.LINKEDIN_OAUTH_SETUP_KEY?.trim()
    ? `<input type="hidden" name="key" value="${process.env.LINKEDIN_OAUTH_SETUP_KEY.trim()}">`
    : "";

  return pageShell({
    title: "LinkedIn Profile Setup",
    accent: "#00d4ff",
    bodyHtml: `
    <h1>LinkedIn Profile Setup</h1>
    ${saved ? `<p class="center" style="color:#6f6">Profile ID saved. Try posting from Telegram.</p>` : ""}
    ${error ? `<p class="center" style="color:#f66">${error}</p>` : ""}
    <p>OAuth is connected${status.expiresAt ? ` (token expires ${status.expiresAt})` : ""}, but LinkedIn did not return your profile ID with scope <code>w_member_social</code> alone.</p>
    <p><strong>Recommended — auto-detect on reconnect:</strong></p>
    <ol>
      <li>Open <a href="https://www.linkedin.com/developers/apps" target="_blank" rel="noopener">LinkedIn Developer Portal</a> → your app → <strong>Products</strong>.</li>
      <li>Add <strong>Sign In with LinkedIn using OpenID Connect</strong> (usually instant).</li>
      <li>On the server, set <code>LINKEDIN_OAUTH_SCOPES=openid profile w_member_social</code> and restart the API.</li>
      <li><a href="/api/linkedin/connect${setupKeyQuery()}">Reconnect LinkedIn</a> — profile ID should auto-fill.</li>
    </ol>
    <p><strong>Or enter your person ID manually:</strong></p>
    <form method="POST" action="/api/linkedin/setup">
      ${keyField}
      <input type="text" name="person_id" placeholder="e.g. AbCdEf12 or urn:li:person:AbCdEf12" required>
      <button type="submit">Save profile ID</button>
    </form>
    <p><small>Status: connected=${status.connected}, hasPersonUrn=${status.hasPersonUrn}, needsSetup=${status.needsProfileSetup}</small></p>`,
  });
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
    const setupUrl = personUrn ? null : `/api/linkedin/setup${setupKeyQuery()}`;
    if (!personUrn) {
      postingNote +=
        " Profile ID not detected — complete setup below before posting from Telegram.";
    }
    res.send(successHtml({ ...saved, postingNote, setupUrl }));
  } catch (err) {
    console.error("[linkedin-oauth] Token exchange failed:", err.message);
    res.status(500).send(errorHtml(err.message));
  }
});

/** GET/POST /api/linkedin/setup — save person URN when auto-detect fails */
router.get("/setup", (req, res) => {
  if (!setupKeyRequired(req, res)) return;
  res.send(setupHtml({ status: getLinkedInConnectionStatus(), saved: false, error: null }));
});

router.post("/setup", express.urlencoded({ extended: false }), (req, res) => {
  if (!setupKeyRequired(req, res)) return;

  try {
    saveLinkedInPersonUrn(req.body.person_id);
    res.send(setupHtml({ status: getLinkedInConnectionStatus(), saved: true, error: null }));
  } catch (err) {
    res.status(400).send(
      setupHtml({ status: getLinkedInConnectionStatus(), saved: false, error: err.message })
    );
  }
});

/** GET /api/linkedin/status — connection status (no secrets exposed) */
router.get("/status", (_req, res) => {
  res.json(getLinkedInConnectionStatus());
});

export default router;
