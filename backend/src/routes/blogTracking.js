import { Router } from "express";
import { rateLimit, ipKey } from "../middleware/rateLimit.js";
import { trackBlogView, trackBlogEvent } from "../services/blogAnalytics.js";

const router = Router();

const limiter = rateLimit({ windowMs: 60_000, max: 120, keyFn: ipKey });

router.post("/track-view", limiter, (req, res) => {
  const result = trackBlogView(req, req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.error });
  }
  res.json(result);
});

router.post("/track-event", limiter, (req, res) => {
  const result = trackBlogEvent(req, req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.error });
  }
  res.json(result);
});

export default router;
