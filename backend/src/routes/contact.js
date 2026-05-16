import { Router } from "express";
import { db, uid, nowIso } from "../db.js";

const router = Router();

router.post("/", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const message = String(req.body.message || "").trim();
  const name = String(req.body.name || "").trim();

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const id = uid();
  const createdAt = nowIso();
  db.prepare(`
    INSERT INTO contact_messages (id, email, message, name, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, email, message, name || null, createdAt);

  res.status(201).json({ ok: true, id, message: "Thank you! Your message has been received." });
});

export default router;
