import { Router } from "express";
import { db, uid, nowIso, toUserRow, logActivity } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = Router();

function toListing(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    listingType: row.listing_type,
    title: row.title,
    description: row.description,
    budget: row.budget,
    budgetLabel: row.budget_label,
    deadline: row.deadline,
    category: row.category,
    status: row.status,
    authorName: row.author_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

router.get("/", optionalAuth, (req, res) => {
  const type = String(req.query.type || "all");
  let sql = `
    SELECT l.*, u.username, u.email
    FROM marketplace_listings l
    JOIN users u ON u.id = l.user_id
    WHERE l.status = 'open'
  `;
  const params = [];
  if (type === "customer_request" || type === "worker_offer") {
    sql += " AND l.listing_type = ?";
    params.push(type);
  }
  sql += " ORDER BY l.created_at DESC LIMIT 200";
  const rows = db.prepare(sql).all(...params);
  res.json({
    listings: rows.map((r) => ({
      ...toListing(r),
      authorEmail: r.email
    }))
  });
});

router.get("/mine", requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM marketplace_listings WHERE user_id = ? ORDER BY created_at DESC
  `).all(req.userId);
  res.json({ listings: rows.map(toListing) });
});

router.post("/", requireAuth, (req, res) => {
  const listingType =
    req.body.listingType === "worker_offer" ? "worker_offer" : "customer_request";
  const user = toUserRow(db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId));
  if (listingType === "worker_offer" && user.accountMode !== "seller" && user.role !== "dev") {
    return res.status(403).json({ error: "Switch to supplier account to offer services." });
  }

  const title = String(req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "Title is required." });

  const id = uid();
  const t = nowIso();
  const budget = Number(req.body.budget || 0);
  db.prepare(`
    INSERT INTO marketplace_listings (
      id, user_id, listing_type, title, description, budget, budget_label,
      deadline, category, status, author_name, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?, ?)
  `).run(
    id,
    req.userId,
    listingType,
    title,
    req.body.description || "",
    budget,
    req.body.budgetLabel || (budget ? `$${budget}` : ""),
    req.body.deadline || "",
    req.body.category || "General",
    user.name || user.username || "Member",
    t,
    t
  );

  logActivity(req.userId, "listing_created", { listingType, id });
  res.status(201).json({ listing: toListing(db.prepare("SELECT * FROM marketplace_listings WHERE id = ?").get(id)) });
});

router.delete("/:id", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM marketplace_listings WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Not found." });
  if (row.user_id !== req.userId) return res.status(403).json({ error: "Not your listing." });
  db.prepare("UPDATE marketplace_listings SET status = 'closed', updated_at = ? WHERE id = ?").run(
    nowIso(),
    req.params.id
  );
  res.json({ ok: true });
});

router.get("/:id/applications", requireAuth, (req, res) => {
  const listing = db.prepare("SELECT * FROM marketplace_listings WHERE id = ?").get(req.params.id);
  if (!listing) return res.status(404).json({ error: "Not found." });
  if (listing.user_id !== req.userId) {
    return res.status(403).json({ error: "Only the listing owner can view applications." });
  }
  const rows = db.prepare(`
    SELECT a.*, u.email, u.username FROM listing_applications a
    JOIN users u ON u.id = a.applicant_id
    WHERE a.listing_id = ? ORDER BY a.created_at DESC
  `).all(req.params.id);
  res.json({
    applications: rows.map((a) => ({
      id: a.id,
      listingId: a.listing_id,
      applicantId: a.applicant_id,
      applicantName: a.applicant_name || a.username,
      applicantEmail: a.email,
      message: a.message,
      price: a.price,
      timeline: a.timeline,
      status: a.status,
      createdAt: a.created_at
    }))
  });
});

router.post("/:id/apply", requireAuth, (req, res) => {
  const listing = db.prepare("SELECT * FROM marketplace_listings WHERE id = ?").get(req.params.id);
  if (!listing || listing.status !== "open") {
    return res.status(404).json({ error: "Listing not available." });
  }
  if (listing.user_id === req.userId) {
    return res.status(400).json({ error: "You cannot apply to your own listing." });
  }

  const existing = db.prepare(`
    SELECT id FROM listing_applications WHERE listing_id = ? AND applicant_id = ? AND status = 'pending'
  `).get(req.params.id, req.userId);
  if (existing) return res.status(409).json({ error: "You already sent a request." });

  const user = db.prepare("SELECT username, name FROM users WHERE id = ?").get(req.userId);
  const id = uid();
  db.prepare(`
    INSERT INTO listing_applications (id, listing_id, applicant_id, applicant_name, message, price, timeline, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)
  `).run(
    id,
    req.params.id,
    req.userId,
    user?.name || user?.username || "Member",
    req.body.message || "",
    Number(req.body.price || listing.budget || 0),
    req.body.timeline || "",
    nowIso()
  );

  logActivity(req.userId, "listing_apply", { listingId: req.params.id });
  res.status(201).json({ ok: true, applicationId: id });
});

router.post("/applications/:appId/accept", requireAuth, (req, res) => {
  const app = db.prepare("SELECT * FROM listing_applications WHERE id = ?").get(req.params.appId);
  if (!app) return res.status(404).json({ error: "Application not found." });

  const listing = db.prepare("SELECT * FROM marketplace_listings WHERE id = ?").get(app.listing_id);
  if (!listing || listing.user_id !== req.userId) {
    return res.status(403).json({ error: "Only the listing owner can accept." });
  }

  let customerId;
  let workerId;
  if (listing.listing_type === "customer_request") {
    customerId = listing.user_id;
    workerId = app.applicant_id;
  } else {
    customerId = app.applicant_id;
    workerId = listing.user_id;
  }

  db.prepare("UPDATE listing_applications SET status = 'accepted' WHERE id = ?").run(app.id);
  db.prepare(`
    UPDATE listing_applications SET status = 'rejected'
    WHERE listing_id = ? AND id != ? AND status = 'pending'
  `).run(listing.id, app.id);
  db.prepare(`
    UPDATE marketplace_listings SET status = 'matched', updated_at = ? WHERE id = ?
  `).run(nowIso(), listing.id);

  const chatId = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO deal_chats (id, listing_id, customer_id, worker_id, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'active', ?, ?)
  `).run(chatId, listing.id, customerId, workerId, t, t);

  logActivity(req.userId, "deal_started", { chatId, listingId: listing.id });
  res.json({ ok: true, chatId, listingId: listing.id });
});

export default router;
