import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { rateLimit, ipKey } from "../middleware/rateLimit.js";
import { enrichOffer } from "../lib/servicesIntelligence.js";
import { sendAdminEmail, sendUserEmail } from "../services/mail.js";
import { cleanPhone } from "../utils/sanitize.js";
import { saveBlogLeadAttribution } from "../services/blogLeadAttribution.js";

const router = Router();
const limiter = rateLimit({ windowMs: 300000, max: 8, keyFn: ipKey });

router.post("/", limiter, optionalAuth, async (req, res) => {
  const result = enrichOffer(req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.errors[0], errors: result.errors });
  }

  const {
    email, message, name, budget, deadline, category, detectedCategory, priority,
    budgetParsed, suggestedTimeline, meta
  } = result.data;
  const phone = cleanPhone(req.body.phone);

  const id = uid();
  const createdAt = nowIso();
  const offeredPrice = budgetParsed?.min ?? budgetParsed?.max ?? null;

  db.prepare(`
    INSERT INTO service_inquiries (
      id, user_id, email, name, message, budget, deadline, category,
      priority, detected_category, budget_min, budget_max, meta, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.userId || null,
    email,
    name || null,
    message,
    budget || "",
    deadline || "",
    category,
    priority,
    detectedCategory,
    budgetParsed.min,
    budgetParsed.max,
    JSON.stringify({ ...meta, suggestedTimeline, currency: budgetParsed.currency, phone }),
    createdAt
  );

  const leadId = uid();
  db.prepare(`
    INSERT INTO lead_submissions (
      id, user_id, submission_type, status, name, email, phone, title, category,
      offered_price, message, meta, created_at, updated_at
    ) VALUES (?, ?, 'price_offer', 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    leadId,
    req.userId || null,
    name || null,
    email,
    phone || null,
    category || detectedCategory,
    category || detectedCategory,
    offeredPrice,
    message,
    JSON.stringify({ inquiryId: id, deadline, priority, suggestedTimeline }),
    createdAt,
    createdAt
  );

  saveBlogLeadAttribution(leadId, req.body);

  sendAdminEmail({
    subject: `[DEWEB] Price offer — ${name || email}`,
    text: `From: ${name || "—"}\nEmail: ${email}\nCategory: ${detectedCategory}\nBudget: ${budget || "—"}\n\n${message}`
  }).catch(() => null);

  sendUserEmail({
    to: email,
    subject: "[DEWEB] Your offer was received",
    text: `Hi${name ? ` ${name}` : ""},\n\nThank you for your offer. Our team will review it and contact you within 24 hours.\n\n— DeWeb Team`
  }).catch(() => null);

  if (req.userId) {
    logActivity(req.userId, "service_inquiry", { inquiryId: id, category: detectedCategory, priority });
  }

  res.status(201).json({
    ok: true,
    id,
    detectedCategory,
    suggestedTimeline,
    priority,
    message: "Sent! Our team will review your project and respond within 24 hours."
  });
});

export default router;
