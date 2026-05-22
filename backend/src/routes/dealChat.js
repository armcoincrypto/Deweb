import { Router } from "express";
import { db, uid, nowIso } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { sanitizeChatMessage } from "../services/chatModeration.js";
import { sendUserEmail } from "../services/mail.js";

const router = Router();

function getChatForUser(chatId, userId) {
  const chat = db.prepare("SELECT * FROM deal_chats WHERE id = ?").get(chatId);
  if (!chat) return null;
  if (chat.customer_id !== userId && chat.worker_id !== userId) return null;
  return chat;
}

router.get("/mine", requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT c.*, l.title, l.listing_type,
      uc.email AS customer_email, uc.username AS customer_name,
      uw.email AS worker_email, uw.username AS worker_name
    FROM deal_chats c
    JOIN marketplace_listings l ON l.id = c.listing_id
    JOIN users uc ON uc.id = c.customer_id
    JOIN users uw ON uw.id = c.worker_id
    WHERE c.customer_id = ? OR c.worker_id = ?
    ORDER BY c.updated_at DESC
  `).all(req.userId, req.userId);

  res.json({
    chats: rows.map((c) => ({
      id: c.id,
      listingId: c.listing_id,
      listingTitle: c.title,
      listingType: c.listing_type,
      customerId: c.customer_id,
      workerId: c.worker_id,
      partnerName:
        c.customer_id === req.userId
          ? c.worker_name || c.worker_email
          : c.customer_name || c.customer_email,
      status: c.status,
      updatedAt: c.updated_at
    }))
  });
});

router.get("/:id/messages", requireAuth, (req, res) => {
  const chat = getChatForUser(req.params.id, req.userId);
  if (!chat) return res.status(404).json({ error: "Chat not found." });

  const messages = db.prepare(`
    SELECT id, sender_id AS senderId, body, attachment_name AS attachmentName,
           moderated, created_at AS createdAt
    FROM deal_messages WHERE chat_id = ? ORDER BY created_at ASC
  `).all(chat.id);

  res.json({ chat: { id: chat.id, listingId: chat.listing_id }, messages });
});

router.post("/:id/messages", requireAuth, (req, res) => {
  const chat = getChatForUser(req.params.id, req.userId);
  if (!chat) return res.status(404).json({ error: "Chat not found." });

  const raw = String(req.body.body || "").trim();
  if (!raw) return res.status(400).json({ error: "Message required." });

  const { body, removed } = sanitizeChatMessage(raw);
  const id = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO deal_messages (id, chat_id, sender_id, body, moderated, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, chat.id, req.userId, body, removed ? 1 : 0, t);
  db.prepare("UPDATE deal_chats SET updated_at = ? WHERE id = ?").run(t, chat.id);

  res.json({
    message: { id, senderId: req.userId, body, moderated: removed, createdAt: t },
    warning: removed ? "Contact details were removed. Keep all communication on DEWEB." : undefined
  });
});

router.post("/:id/attachment", requireAuth, async (req, res) => {
  const chat = getChatForUser(req.params.id, req.userId);
  if (!chat) return res.status(404).json({ error: "Chat not found." });

  const filename = String(req.body.filename || "file").trim();
  const dataUrl = String(req.body.dataBase64 || "");
  const note = String(req.body.note || "").trim();

  if (!dataUrl) return res.status(400).json({ error: "File data required (base64)." });

  const customer = db.prepare("SELECT email, name FROM users WHERE id = ?").get(chat.customer_id);
  const worker = db.prepare("SELECT email, name FROM users WHERE id = ?").get(chat.worker_id);
  const sender = db.prepare("SELECT email, name FROM users WHERE id = ?").get(req.userId);

  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  const content = match ? match[2] : dataUrl;
  const mime = match ? match[1] : "application/octet-stream";

  const recipients = [customer?.email, worker?.email].filter(Boolean).join(",");
  await sendUserEmail({
    to: recipients,
    subject: `[DEWEB] File shared in project chat`,
    text: `${sender?.name || sender?.email} shared "${filename}" in your DEWEB project chat.\n\n${note}\n\n— Sent via DEWEB (do not share contact details off-platform).`,
    attachments: [{ filename, content: Buffer.from(content, "base64"), contentType: mime }]
  });

  const id = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO deal_messages (id, chat_id, sender_id, body, attachment_name, attachment_sent, created_at)
    VALUES (?, ?, ?, ?, ?, 1, ?)
  `).run(
    id,
    chat.id,
    req.userId,
    note || `[File sent: ${filename}]`,
    filename,
    t
  );
  db.prepare("UPDATE deal_chats SET updated_at = ? WHERE id = ?").run(t, chat.id);

  res.json({ ok: true, message: "File sent to both parties by email." });
});

export default router;
