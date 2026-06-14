import { Router } from "express";
import { getXConnectionStatus } from "../services/xOAuth.js";

const router = Router();

/** GET /api/x/status — safe X credential check (no secrets exposed) */
router.get("/status", (_req, res) => {
  res.json(getXConnectionStatus());
});

export default router;
