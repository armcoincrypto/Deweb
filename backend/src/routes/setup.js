import { Router } from "express";

const router = Router();

/** Public setup info — no credentials or auto-login flags exposed. */
router.get("/config", (_req, res) => {
  res.json({ ok: true });
});

export default router;
