import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, uid, nowIso, toUserRow, logActivity } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { isAdminEmail } from "../utils/admin.js";
import { sendUserEmail } from "../services/mail.js";
import { rateLimit, ipKey } from "../middleware/rateLimit.js";
import { cleanEmail } from "../utils/sanitize.js";

const router = Router();
const verifyLimiter = rateLimit({ windowMs: 300000, max: 5, keyFn: (req) => `verify:${req.userId || ipKey(req)}` });
const forgotLimiter = rateLimit({ windowMs: 300000, max: 5, keyFn: ipKey });

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

function webBase() {
  return process.env.PUBLIC_WEB_URL || process.env.CORS_ORIGIN || "https://dewebam.com";
}

async function queueVerificationEmail(userId, email) {
  db.prepare("UPDATE email_verification_tokens SET used = 1 WHERE user_id = ? AND used = 0").run(userId);
  const token = uid() + uid();
  const expiresAt = new Date(Date.now() + 86400000 * 2).toISOString();
  db.prepare(`
    INSERT INTO email_verification_tokens (id, user_id, token, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(uid(), userId, token, expiresAt, nowIso());

  const link = `${webBase()}/en/account/verify-email?token=${token}`;
  const mail = await sendUserEmail({
    to: email,
    subject: "[DEWEB] Verify your email address",
    text: `Welcome to DeWeb!\n\nPlease verify your email to access all platform features:\n\n${link}\n\nThis link expires in 48 hours.\n\nIf you did not create an account, ignore this email.`
  });
  return { link, sent: mail.sent, reason: mail.reason };
}

router.post("/register", async (req, res) => {
  const username = String(req.body.username || "").trim();
  const email = cleanEmail(req.body.email);
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

  logActivity(id, "signup");

  let emailResult = { sent: false };
  try {
    emailResult = await queueVerificationEmail(id, email);
  } catch (err) {
    console.error("[auth] verification email failed:", err.message);
  }

  const smtpOk = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  res.status(201).json({
    success: true,
    requireLogin: true,
    email,
    username,
    emailSent: emailResult.sent,
    message: emailResult.sent
      ? "Account created. Check your email to verify your address, then sign in."
      : smtpOk
        ? "Account created. Sign in, then resend verification from your profile."
        : "Account created. Sign in, then use the verification link from your profile.",
    verifyUrl: !emailResult.sent ? emailResult.link : undefined
  });
});

router.post("/forgot-password", forgotLimiter, async (req, res) => {
  const email = cleanEmail(req.body.email);
  if (!email) return res.status(400).json({ error: "Email is required." });

  const row = db.prepare("SELECT id, email FROM users WHERE email = ?").get(email);
  if (row) {
    const token = uid() + uid();
    const expiresAt = new Date(Date.now() + 3600000).toISOString();
    db.prepare(
      "INSERT INTO password_reset_tokens (id, user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?, ?)"
    ).run(uid(), row.id, token, expiresAt, nowIso());
    const resetUrl = `${webBase()}/en/account/reset-password?token=${token}`;
    const mail = await sendUserEmail({
      to: row.email,
      subject: "[DEWEB] Reset your password",
      text: `Reset your DeWeb password:\n\n${resetUrl}\n\nLink expires in 1 hour.`
    });
    res.json({
      success: true,
      message: mail.sent
        ? "If this email is registered, reset instructions were sent."
        : "If this email is registered, use the reset link below.",
      resetUrl: mail.sent ? undefined : resetUrl
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

  if (isAdminEmail(row.email) && row.role !== "admin") {
    db.prepare("UPDATE users SET role = 'admin', email_verified = 1 WHERE id = ?").run(row.id);
    row = db.prepare("SELECT * FROM users WHERE id = ?").get(row.id);
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

router.post("/send-verification", requireAuth, verifyLimiter, async (req, res) => {
  const row = db.prepare("SELECT id, email, email_verified FROM users WHERE id = ?").get(req.userId);
  if (!row) return res.status(404).json({ error: "User not found." });
  if (row.email_verified) {
    return res.json({ ok: true, message: "Email already verified." });
  }
  const result = await queueVerificationEmail(row.id, row.email);
  res.json({
    ok: true,
    message: result.sent
      ? "Verification email sent. Check your inbox."
      : "SMTP not configured. Use the verification link below.",
    verifyUrl: result.sent ? undefined : result.link
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

  res.json({ ok: true, message: "Email verified successfully. You now have full access to the platform." });
});

router.post("/auto-admin", (_req, res) => {
  res.status(403).json({
    error: "Admin auto-login is disabled for security. Sign in with your admin email and password.",
  });
});

export default router;
