import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, uid, nowIso, toUserRow, logActivity } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", (req, res) => {
  const username = String(req.body.username || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const newsletter = Boolean(req.body.newsletter);

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required." });
  }

  const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (exists) {
    return res.status(409).json({ error: "Email already exists." });
  }

  const id = uid();
  const passwordHash = bcrypt.hashSync(password, 10);
  const createdAt = nowIso();

  db.prepare(`
    INSERT INTO users (
      id, role, account_mode, name, username, email, password_hash, newsletter, created_at
    ) VALUES (?, 'client', 'customer', ?, ?, ?, ?, ?, ?)
  `).run(id, username, username, email, passwordHash, newsletter ? 1 : 0, createdAt);

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

export default router;
