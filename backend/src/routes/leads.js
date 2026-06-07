import { Router } from "express";
import { db, uid, nowIso, logActivity } from "../db.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit, ipKey } from "../middleware/rateLimit.js";
import { cleanText, cleanEmail, cleanPhone, isValidEmail, parsePrice } from "../utils/sanitize.js";
import { sendAdminEmail, sendUserEmail } from "../services/mail.js";

const router = Router();

const TYPES = new Set(["contact", "price_offer", "request_details", "user_offer"]);
const STATUSES = new Set(["new", "contacted", "negotiating", "closed"]);

function toLead(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    submissionType: row.submission_type,
    status: row.status,
    adminNote: row.admin_note || "",
    name: row.name || "",
    email: row.email,
    phone: row.phone || "",
    title: row.title || "",
    productName: row.product_name || "",
    category: row.category || "",
    offeredPrice: row.offered_price,
    askingPrice: row.asking_price,
    message: row.message,
    meta: row.meta ? JSON.parse(row.meta) : {},
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function validateLeadBody(body, type) {
  const errors = [];
  const email = cleanEmail(body.email);
  const name = cleanText(body.name, 120);
  const phone = cleanPhone(body.phone || body.telegram || body.whatsapp);
  const message = cleanText(body.message || body.description || body.details, 8000);
  const title = cleanText(body.title, 200);
  const productName = cleanText(body.productName || body.product_name || body.listingName, 200);
  const category = cleanText(body.category, 120);
  const offeredPrice = parsePrice(body.offeredPrice ?? body.offered_price ?? body.budget);
  const askingPrice = parsePrice(body.askingPrice ?? body.asking_price ?? body.price);

  if (!email) errors.push("Email is required.");
  else if (!isValidEmail(email)) errors.push("Invalid email address.");
  if (!message && type !== "contact") errors.push("Message or description is required.");
  if (type === "contact" && !message) errors.push("Message is required.");
  if (type === "user_offer" && !title) errors.push("Title is required.");
  if (type === "price_offer" && !productName && !title) errors.push("Product or listing name is required.");

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    data: { email, name, phone, message, title, productName, category, offeredPrice, askingPrice }
  };
}

async function notifyLead(lead, type) {
  const priceLine = lead.offered_price != null
    ? `Offered price: $${lead.offered_price}`
    : lead.asking_price != null
      ? `Asking price: $${lead.asking_price}`
      : "";

  const adminText = [
    `New ${type.replace(/_/g, " ")} submission`,
    lead.name ? `Name: ${lead.name}` : "",
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.title ? `Title: ${lead.title}` : "",
    lead.product_name ? `Product: ${lead.product_name}` : "",
    lead.category ? `Category: ${lead.category}` : "",
    priceLine,
    "",
    lead.message
  ].filter(Boolean).join("\n");

  await sendAdminEmail({
    subject: `[DEWEB] New ${type.replace(/_/g, " ")} — ${lead.name || lead.email}`,
    text: adminText
  });

  await sendUserEmail({
    to: lead.email,
    subject: "[DEWEB] We received your request",
    text: `Hi${lead.name ? ` ${lead.name}` : ""},\n\nThank you for contacting DeWeb. Our team will review your submission and get back to you shortly.\n\n— DeWeb Team\nhttps://dewebam.com`
  });
}

const submitLimiter = rateLimit({ windowMs: 300000, max: 8, keyFn: ipKey });

router.post("/", submitLimiter, optionalAuth, async (req, res) => {
  const type = cleanText(req.body.submissionType || req.body.type || "contact", 40);
  if (!TYPES.has(type)) {
    return res.status(400).json({ error: "Invalid submission type." });
  }

  const body = { ...req.body };
  if (req.userId && !body.email) {
    const u = db.prepare("SELECT email, name FROM users WHERE id = ?").get(req.userId);
    if (u?.email) body.email = u.email;
    if (!body.name && u?.name) body.name = u.name;
  }

  const result = validateLeadBody(body, type);
  if (!result.ok) {
    return res.status(400).json({ error: result.errors[0], errors: result.errors });
  }

  const { email, name, phone, message, title, productName, category, offeredPrice, askingPrice } = result.data;
  const id = uid();
  const t = nowIso();

  db.prepare(`
    INSERT INTO lead_submissions (
      id, user_id, submission_type, status, name, email, phone, title, product_name,
      category, offered_price, asking_price, message, meta, created_at, updated_at
    ) VALUES (?, ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.userId || null,
    type,
    name || null,
    email,
    phone || null,
    title || null,
    productName || null,
    category || null,
    offeredPrice,
    askingPrice,
    message,
    JSON.stringify({ source: req.body.source || "web" }),
    t,
    t
  );

  const row = db.prepare("SELECT * FROM lead_submissions WHERE id = ?").get(id);
  notifyLead(row, type).catch((err) => console.error("[leads] notify", err.message));

  if (req.userId) {
    logActivity(req.userId, "lead_submission", { leadId: id, type });
  }

  res.status(201).json({
    ok: true,
    id,
    lead: toLead(row),
    message: "Thank you! Our team will contact you shortly to discuss details."
  });
});

router.get("/mine", requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM lead_submissions WHERE user_id = ? OR email = (
      SELECT email FROM users WHERE id = ?
    ) ORDER BY created_at DESC LIMIT 100
  `).all(req.userId, req.userId);
  res.json({ leads: rows.map(toLead) });
});

export { toLead, STATUSES };
export default router;
