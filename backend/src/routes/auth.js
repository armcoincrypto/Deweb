import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, uid, nowIso, toUserRow, logActivity } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { isAdminEmail, getAdminEmail, isAdminAutoLoginEnabled } from "../utils/admin.js";
import { runSeed } from "../seed.js";

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
  const role = isAdminEmail(email) ? "admin" : "client";

  db.prepare(`
    INSERT INTO users (
      id, role, account_mode, name, username, email, password_hash, newsletter, created_at
    ) VALUES (?, ?, 'customer', ?, ?, ?, ?, ?, ?)
  `).run(id, role, username, username, email, passwordHash, newsletter ? 1 : 0, createdAt);

  db.prepare(`
    INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
    VALUES (?, 0, 0, 0, 0)
  `).run(id);

  logActivity(id, "signup");

  const token = signToken(id);
  const user = toUserRow(db.prepare("SELECT * FROM users WHERE id = ?").get(id));
  res.status(201).json({ token, user });
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
