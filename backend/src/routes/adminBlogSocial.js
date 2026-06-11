import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  listSocialPosts,
  updateSocialPost,
  ensureSocialDraftsForPost,
} from "../services/blogSocialDistribution.js";
import { cleanText } from "../utils/sanitize.js";

const router = Router();
router.use(requireAdmin);

const STATUSES = new Set(["draft", "approved", "posted", "rejected"]);

router.get("/", (req, res) => {
  const platform = cleanText(req.query.platform, 20) || undefined;
  const status = cleanText(req.query.status, 20) || undefined;
  const postId = cleanText(req.query.postId, 80) || undefined;
  res.json({ posts: listSocialPosts({ platform, status, postId }) });
});

router.post("/generate/:postId", (req, res) => {
  const result = ensureSocialDraftsForPost(req.params.postId);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json({
    ...result,
    posts: listSocialPosts({ postId: req.params.postId }),
  });
});

router.patch("/:id", (req, res) => {
  const status = req.body.status !== undefined ? cleanText(req.body.status, 20) : undefined;
  if (status && !STATUSES.has(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }
  const updated = updateSocialPost(req.params.id, {
    content: req.body.content,
    status,
    scheduledAt: req.body.scheduledAt,
  });
  if (!updated) return res.status(404).json({ error: "Social post not found." });
  res.json({ post: updated });
});

export default router;
