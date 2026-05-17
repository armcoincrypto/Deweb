import { Router } from "express";
import { getAdminEmail, isAdminAutoLoginEnabled } from "../utils/admin.js";

const router = Router();

/** Public setup info for login page (never returns password). */
router.get("/config", (_req, res) => {
  const adminEmail = getAdminEmail();
  res.json({
    adminEmail,
    adminUsername: "dewebadmin",
    adminAutoLogin: isAdminAutoLoginEnabled() && Boolean(adminEmail && process.env.ADMIN_PASSWORD)
  });
});

export default router;
