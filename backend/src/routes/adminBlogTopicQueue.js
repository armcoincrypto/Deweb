import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  listTopicQueue,
  getTopicQueueItem,
  createTopicQueueItem,
  updateTopicQueueItem,
  deleteTopicQueueItem,
  retryTopicQueueItem,
} from "../services/blogTopicQueue.js";

const router = Router();
router.use(requireAdmin);

router.get("/", (_req, res) => {
  res.json({ items: listTopicQueue() });
});

router.post("/", (req, res) => {
  const result = createTopicQueueItem({
    topic: req.body.topic,
    targetKeyword: req.body.targetKeyword,
    categoryId: req.body.categoryId,
    priority: req.body.priority,
    scheduledFor: req.body.scheduledFor,
  });
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json({ item: result.item });
});

router.put("/:id", (req, res) => {
  const result = updateTopicQueueItem(req.params.id, req.body);
  if (result.error) {
    const status = result.error === "Queue item not found." ? 404 : 400;
    return res.status(status).json({ error: result.error });
  }
  res.json({ item: result.item });
});

router.delete("/:id", (req, res) => {
  const result = deleteTopicQueueItem(req.params.id);
  if (result.error) {
    const status = result.error === "Queue item not found." ? 404 : 400;
    return res.status(status).json({ error: result.error });
  }
  res.json({ ok: true });
});

router.post("/:id/retry", (req, res) => {
  const result = retryTopicQueueItem(req.params.id);
  if (result.error) {
    const status = result.error === "Queue item not found." ? 404 : 400;
    return res.status(status).json({ error: result.error });
  }
  res.json({ item: result.item });
});

export default router;
