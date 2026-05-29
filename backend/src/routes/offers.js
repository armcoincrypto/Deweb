import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { enrichOffer } from "../lib/servicesIntelligence.js";

const router = Router();

router.post("/", optionalAuth, (req, res) => {
  const result = enrichOffer(req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.errors[0], errors: result.errors });
  }

  const { email, message, name, budget, deadline, category, detectedCategory, priority, budgetParsed, suggestedTimeline, meta } =
    result.data;

  const id = uid();
  const createdAt = nowIso();

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
    JSON.stringify({ ...meta, suggestedTimeline, currency: budgetParsed.currency }),
    createdAt
  );

  if (req.userId) {
    logActivity(req.userId, "service_inquiry", {
      inquiryId: id,
      category: detectedCategory,
      priority
    });
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
