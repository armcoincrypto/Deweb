import { db, toUserRow } from "../db.js";
import { requireAuth } from "./auth.js";
import { isAdminUser } from "../utils/admin.js";

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
    if (!isAdminUser(row)) {
      return res.status(403).json({ error: "Admin access required." });
    }
    req.adminUser = toUserRow(row);
    next();
  });
}
