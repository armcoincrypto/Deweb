import { Router } from "express";
import { db, toUserRow } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const allowedFields = {
  name: "name",
  username: "username",
  phone: "phone",
  address: "address",
  company: "company",
  currency: "currency",
  role: "role",
  accountMode: "account_mode",
  emailVerified: "email_verified",
  phoneVerified: "phone_verified",
  kycStatus: "kyc_status",
  tfaEnabled: "tfa_enabled",
  skills: "skills",
  portfolio: "portfolio"
};

router.patch("/me", requireAuth, (req, res) => {
  const updates = [];
  const values = [];

  for (const [key, column] of Object.entries(allowedFields)) {
    if (req.body[key] !== undefined) {
      let value = req.body[key];
      if (key === "emailVerified" || key === "phoneVerified" || key === "tfaEnabled") {
        value = value ? 1 : 0;
      }
      if (key === "accountMode") {
        updates.push("account_mode = ?");
        values.push(value);
        if (value === "seller") {
          updates.push("role = 'dev'");
        }
        continue;
      }
      updates.push(`${column} = ?`);
      values.push(value);
    }
  }

  if (req.body.sellerInfo !== undefined) {
    updates.push("seller_info = ?");
    values.push(JSON.stringify(req.body.sellerInfo));
  }

  if (req.body.contactPrefs !== undefined) {
    updates.push("contact_prefs = ?");
    values.push(JSON.stringify(req.body.contactPrefs));
  }

  if (!updates.length) {
    return res.status(400).json({ error: "No valid fields to update." });
  }

  values.push(req.userId);
  db.prepare(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`).run(...values);

  const user = toUserRow(db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId));
  res.json({ user });
});

router.get("/developers", (_req, res) => {
  const rows = db.prepare(`
    SELECT * FROM users
    WHERE role = 'dev' OR account_mode = 'seller'
    ORDER BY created_at DESC
  `).all();
  res.json({ users: rows.map(toUserRow) });
});

export default router;
