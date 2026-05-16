import { Router } from "express";
import { db, parseJson } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM activity WHERE user_id = ?
    ORDER BY created_at DESC LIMIT 30
  `).all(req.userId);

  res.json({
    activity: rows.map((r) => ({
      id: r.id,
      method: r.method,
      meta: parseJson(r.meta, null),
      at: r.created_at
    }))
  });
});

export default router;
