import { db } from "../db.js";

export function requireEmailVerified(req, res, next) {
  const row = db.prepare("SELECT email_verified, role, id FROM users WHERE id = ?").get(req.userId);
  if (row?.role === "admin" || row?.id === "deweb-admin") return next();
  if (!row?.email_verified) {
    return res.status(403).json({
      error: "EMAIL_NOT_VERIFIED",
      message: "Verify your email before connecting a wallet or buying DEWEB."
    });
  }
  next();
}
