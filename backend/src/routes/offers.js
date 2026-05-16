import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = Router();

router.post("/", optionalAuth, (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const message = String(req.body.message || "").trim();
  const name = String(req.body.name || "").trim();

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  const id = uid();
  const createdAt = nowIso();

  db.prepare(`
    INSERT INTO service_inquiries (id, user_id, email, name, message, budget, deadline, category, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.userId || null,
    email,
    name || null,
    message,
    req.body.budget || "",
    req.body.deadline || "",
    req.body.category || "",
    createdAt
  );

  if (req.userId) logActivity(req.userId, "service_inquiry", { inquiryId: id });

  res.status(201).json({
    ok: true,
    id,
    message: "Sent! We will contact you soon."
  });
});

export default router;
