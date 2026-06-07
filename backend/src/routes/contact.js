import { Router } from "express";
import { db, uid, nowIso } from "../db.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { rateLimit, ipKey } from "../middleware/rateLimit.js";
import { cleanText, cleanEmail, cleanPhone, isValidEmail } from "../utils/sanitize.js";
import { sendAdminEmail, sendUserEmail } from "../services/mail.js";

const router = Router();
const limiter = rateLimit({ windowMs: 300000, max: 8, keyFn: ipKey });

router.post("/", limiter, optionalAuth, async (req, res) => {
  const email = cleanEmail(req.body.email);
  const message = cleanText(req.body.message, 8000);
  const name = cleanText(req.body.name, 120);
  const phone = cleanPhone(req.body.phone);

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const id = uid();
  const createdAt = nowIso();

  db.prepare(`
    INSERT INTO contact_messages (id, email, message, name, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, email, message, name || null, createdAt);

  db.prepare(`
    INSERT INTO lead_submissions (
      id, user_id, submission_type, status, name, email, phone, message, meta, created_at, updated_at
    ) VALUES (?, ?, 'contact', 'new', ?, ?, ?, ?, ?, ?, ?)
  `).run(
    uid(),
    req.userId || null,
    name || null,
    email,
    phone || null,
    message,
    JSON.stringify({ contactId: id }),
    createdAt,
    createdAt
  );

  sendAdminEmail({
    subject: `[DEWEB] Contact — ${name || email}`,
    text: `From: ${name || "—"}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message}`
  }).catch(() => null);

  sendUserEmail({
    to: email,
    subject: "[DEWEB] We received your message",
    text: `Hi${name ? ` ${name}` : ""},\n\nThank you for contacting DeWeb. We will respond as soon as possible.\n\n— DeWeb Team`
  }).catch(() => null);

  res.status(201).json({ ok: true, id, message: "Thank you! Your message has been received." });
});

export default router;
