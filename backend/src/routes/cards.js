import { Router } from "express";
import { db, uid } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function toCard(row) {
  return {
    id: row.id,
    userId: row.user_id,
    brand: row.brand || "Card",
    last4: row.last4,
    expiry: row.expiry,
    default: Boolean(row.is_default),
    mask: `•••• ${row.last4 || "****"}`
  };
}

router.get("/", requireAuth, (req, res) => {
  const rows = db.prepare(
    "SELECT * FROM saved_cards WHERE user_id = ? ORDER BY is_default DESC, rowid DESC"
  ).all(req.userId);
  res.json({ cards: rows.map(toCard) });
});

router.post("/", requireAuth, (req, res) => {
  const last4 = String(req.body.last4 || "").replace(/\D/g, "").slice(-4);
  if (last4.length < 4) {
    return res.status(400).json({ error: "Valid card last4 is required (demo: no full PAN stored)." });
  }

  const id = uid();
  const brand = req.body.brand || "Card";
  const expiry = req.body.expiry || "";
  const isDefault = req.body.default ? 1 : 0;

  if (isDefault) {
    db.prepare("UPDATE saved_cards SET is_default = 0 WHERE user_id = ?").run(req.userId);
  }

  db.prepare(`
    INSERT INTO saved_cards (id, user_id, brand, last4, expiry, is_default)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, req.userId, brand, last4, expiry, isDefault);

  const row = db.prepare("SELECT * FROM saved_cards WHERE id = ?").get(id);
  res.status(201).json({ card: toCard(row) });
});

router.delete("/:id", requireAuth, (req, res) => {
  const result = db.prepare(
    "DELETE FROM saved_cards WHERE id = ? AND user_id = ?"
  ).run(req.params.id, req.userId);
  if (!result.changes) return res.status(404).json({ error: "Card not found." });
  res.json({ ok: true });
});

export default router;
