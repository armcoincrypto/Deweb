import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, uid, nowIso, toUserRow, logActivity } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { isAdminEmail, getAdminEmail, isAdminAutoLoginEnabled } from "../utils/admin.js";
import { runSeed } from "../seed.js";
import { sendUserEmail } from "../services/mail.js";

const router = Router();

function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must include at least one number.";
  }
  if (!/[!@#$%^&*()]/.test(password)) {
    return "Password must include at least one symbol: ! @ # $ % ^ & * ( )";
  }
  return null;
}

router.post("/register", (req, res) => {
  const username = String(req.body.username || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const newsletter = Boolean(req.body.newsletter);

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required." });
  }

  const passErr = validatePassword(password);
  if (passErr) {
    return res.status(400).json({ error: passErr });
  }

  const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (exists) {
    return res.status(409).json({ error: "Email already exists." });
  }

  const id = uid();
  const passwordHash = bcrypt.hashSync(password, 10);
  const createdAt = nowIso();
  const accountMode = req.body.accountMode === "seller" ? "seller" : "customer";
  const role = isAdminEmail(email) ? "admin" : accountMode === "seller" ? "dev" : "client";

  db.prepare(`
    INSERT INTO users (
      id, role, account_mode, name, username, email, password_hash, newsletter, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, role, accountMode, username, username, email, passwordHash, newsletter ? 1 : 0, createdAt);

  db.prepare(`
    INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
    VALUES (?, 0, 0, 0, 0)
  `).run(id);

  logActivity(id, "signup");
  queueVerificationEmail(id, email).catch(() => null);

  res.status(201).json({
    success: true,
    requireLogin: true,
    email,
    username,
    message: "Account created. Please sign in with your email and password."
  });
});

router.post("/forgot-password", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  if (!email) return res.status(400).json({ error: "Email is required." });

  const row = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (row) {
    const token = uid() + uid();
    const expiresAt = new Date(Date.now() + 3600000).toISOString();
    db.prepare(
      "INSERT INTO password_reset_tokens (id, user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?, ?)"
    ).run(uid(), row.id, token, expiresAt, nowIso());
    const base = process.env.PUBLIC_WEB_URL || process.env.CORS_ORIGIN || "https://dewebam.com";
    res.json({
      success: true,
      message: "If this email is registered, reset instructions were sent.",
      resetUrl: `${base}/en/account/reset-password?token=${token}`
    });
    return;
  }
  res.json({ success: true, message: "If this email is registered, reset instructions were sent." });
});

router.post("/reset-password", (req, res) => {
  const token = String(req.body.token || "").trim();
  const password = String(req.body.password || "");
  if (!token || !password) {
    return res.status(400).json({ error: "Token and new password are required." });
  }
  const passErr = validatePassword(password);
  if (passErr) return res.status(400).json({ error: passErr });

  const row = db.prepare(`
    SELECT * FROM password_reset_tokens WHERE token = ? AND used = 0
  `).get(token);
  if (!row || new Date(row.expires_at) < new Date()) {
    return res.status(400).json({ error: "Invalid or expired reset link." });
  }

  const hash = bcrypt.hashSync(password, 10);
  db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, row.user_id);
  db.prepare("UPDATE password_reset_tokens SET used = 1 WHERE id = ?").run(row.id);

  res.json({ success: true, message: "Password updated. You can sign in now." });
});

router.post("/login", (req, res) => {
  const login = String(req.body.username || req.body.email || "").trim();
  const password = String(req.body.password || "");

  if (!login || !password) {
    return res.status(400).json({ error: "Username/email and password are required." });
  }

  const row = db.prepare(`
    SELECT * FROM users
    WHERE email = ? OR username = ?
  `).get(login.toLowerCase(), login);

  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return res.status(401).json({ error: "Wrong username or password." });
  }

  logActivity(row.id, "signin");
  const token = signToken(row.id);
  res.json({ token, user: toUserRow(row) });
});

router.get("/me", requireAuth, (req, res) => {
  const user = toUserRow(db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId));
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json({ user });
});

async function queueVerificationEmail(userId, email) {
  db.prepare("UPDATE email_verification_tokens SET used = 1 WHERE user_id = ? AND used = 0").run(userId);
  const token = uid() + uid();
  const expiresAt = new Date(Date.now() + 86400000 * 2).toISOString();
  db.prepare(`
    INSERT INTO email_verification_tokens (id, user_id, token, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(uid(), userId, token, expiresAt, nowIso());

  const base = process.env.PUBLIC_WEB_URL || process.env.CORS_ORIGIN || "https://dewebam.com";
  const link = `${base}/en/account/verify-email?token=${token}`;
  await sendUserEmail({
    to: email,
    subject: "[DEWEB] Verify your email",
    text: `Verify your email to connect MetaMask/Ronin and get DEWEB coins:\n\n${link}\n\nLink expires in 48 hours.`
  });
  return link;
}

router.post("/send-verification", requireAuth, async (req, res) => {
  const row = db.prepare("SELECT id, email, email_verified FROM users WHERE id = ?").get(req.userId);
  if (!row) return res.status(404).json({ error: "User not found." });
  if (row.email_verified) {
    return res.json({ ok: true, message: "Email already verified." });
  }
  const link = await queueVerificationEmail(row.id, row.email);
  const smtpOk = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  res.json({
    ok: true,
    message: smtpOk
      ? "Verification email sent. Check your inbox."
      : "SMTP not configured. Use the verification link below.",
    verifyUrl: smtpOk ? undefined : link
  });
});

router.get("/verify-email", (req, res) => {
  const token = String(req.query.token || "").trim();
  if (!token) return res.status(400).json({ error: "Token required." });

  const row = db.prepare(`
    SELECT * FROM email_verification_tokens WHERE token = ? AND used = 0
  `).get(token);
  if (!row || new Date(row.expires_at) < new Date()) {
    return res.status(400).json({ error: "Invalid or expired verification link." });
  }

  db.prepare("UPDATE users SET email_verified = 1 WHERE id = ?").run(row.user_id);
  db.prepare("UPDATE email_verification_tokens SET used = 1 WHERE id = ?").run(row.id);
  logActivity(row.user_id, "email_verified");

  res.json({ ok: true, message: "Email verified. You can connect your wallet now." });
});

/**
 * Sign in admin using ADMIN_GMAIL + ADMIN_PASSWORD from .env (no password sent from browser).
 * Enable with ADMIN_AUTO_LOGIN=true — disable on public production server.
 */
router.post("/auto-admin", (req, res) => {
  if (!isAdminAutoLoginEnabled()) {
    return res.status(403).json({ error: "Admin auto-login is disabled. Set ADMIN_AUTO_LOGIN=true in .env" });
  }

  const email = getAdminEmail();
  const password = String(process.env.ADMIN_PASSWORD || "");
  if (!email || !password) {
    return res.status(503).json({
      error: "Set ADMIN_GMAIL (or ADMIN_EMAIL) and ADMIN_PASSWORD in backend/.env, then restart the server."
    });
  }

  let row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!row) {
    runSeed();
    row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  }
  if (!row) {
    return res.status(404).json({ error: "Admin account not found. Check ADMIN_GMAIL in .env and restart backend." });
  }

  if (!bcrypt.compareSync(password, row.password_hash)) {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare("UPDATE users SET password_hash = ?, role = 'admin' WHERE id = ?").run(hash, row.id);
    row = db.prepare("SELECT * FROM users WHERE id = ?").get(row.id);
  }

  if (row.role !== "admin") {
    db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(row.id);
    row = db.prepare("SELECT * FROM users WHERE id = ?").get(row.id);
  }

  logActivity(row.id, "signin", { method: "auto-admin" });
  const token = signToken(row.id);
  const user = toUserRow(row);
  res.json({ token, user, redirect: user.isAdmin ? "admin.html" : "account-dashboard.html" });
});

export default router;
