import { Router } from "express";

const router = Router();

const SOCIAL_ENV = {
  linkedin: "SOCIAL_LINK_LINKEDIN",
  instagram: "SOCIAL_LINK_INSTAGRAM",
  telegram: "SOCIAL_LINK_TELEGRAM",
  x: "SOCIAL_LINK_X",
};

/** Public config — social URLs from backend .env (restart API after changes). */
router.get("/social-links", (_req, res) => {
  const links = {};
  for (const [key, envKey] of Object.entries(SOCIAL_ENV)) {
    links[key] = String(process.env[envKey] || "").trim();
  }
  res.json({ links });
});

export default router;
