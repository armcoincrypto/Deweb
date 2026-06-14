import { Router } from "express";
import { handleTelegramUpdate } from "../services/dewebamBot.js";

const router = Router();

router.post("/webhook", async (req, res) => {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  if (secret) {
    const header = req.headers["x-telegram-bot-api-secret-token"];
    if (header !== secret) {
      return res.status(403).json({ error: "Forbidden" });
    }
  }

  res.sendStatus(200);

  try {
    await handleTelegramUpdate(req.body);
  } catch (err) {
    console.error("[dewebam] Webhook error:", err.message);
  }
});

export default router;
