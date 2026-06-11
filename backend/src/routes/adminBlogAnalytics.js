import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  getAnalyticsOverview,
  getPostAnalytics,
} from "../services/blogAnalytics.js";

const router = Router();
router.use(requireAdmin);

router.get("/", (_req, res) => {
  res.json(getAnalyticsOverview());
});

router.get("/:postId", (req, res) => {
  const data = getPostAnalytics(req.params.postId);
  if (!data) {
    return res.status(404).json({ error: "Post not found." });
  }
  res.json(data);
});

export default router;
