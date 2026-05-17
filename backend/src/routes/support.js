import { Router } from "express";
import { db, uid, nowIso } from "../db.js";
import { optionalAuth } from "../middleware/auth.js";
import { generateAiReply, wantsHumanAgent } from "../services/aiSupport.js";
import { sendAdminEmail } from "../services/mail.js";

const router = Router();

function guestKey(req) {
  return String(req.headers["x-support-guest"] || req.body.guestKey || "").trim().slice(0, 64);
}

function getOrCreateThread(userId, guest) {
  if (userId) {
    let row = db.prepare(`
      SELECT * FROM support_threads WHERE user_id = ? AND status != 'closed' ORDER BY updated_at DESC LIMIT 1
    `).get(userId);
    if (row) return row;
    const id = uid();
    const t = nowIso();
    db.prepare(`
      INSERT INTO support_threads (id, user_id, guest_key, status, created_at, updated_at)
      VALUES (?, ?, NULL, 'ai', ?, ?)
    `).run(id, userId, t, t);
    return db.prepare("SELECT * FROM support_threads WHERE id = ?").get(id);
  }

  const gk = guest || `anon-${uid()}`;
  let row = db.prepare(`
    SELECT * FROM support_threads WHERE guest_key = ? AND status != 'closed' ORDER BY updated_at DESC LIMIT 1
  `).get(gk);
  if (row) return row;
  const id = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO support_threads (id, user_id, guest_key, status, created_at, updated_at)
    VALUES (?, NULL, ?, 'ai', ?, ?)
  `).run(id, gk, t, t);
  return { ...db.prepare("SELECT * FROM support_threads WHERE id = ?").get(id), _newGuestKey: gk };
}

function addMessage(threadId, sender, body) {
  const id = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO support_messages (id, thread_id, sender, body, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, threadId, sender, body, t);
  db.prepare("UPDATE support_threads SET updated_at = ? WHERE id = ?").run(t, threadId);
  return { id, threadId, sender, body, createdAt: t };
}

router.get("/thread", optionalAuth, (req, res) => {
  const gk = guestKey(req);
  const thread = getOrCreateThread(req.userId || null, gk || null);
  const messages = db.prepare(`
    SELECT id, sender, body, created_at AS createdAt
    FROM support_messages WHERE thread_id = ? ORDER BY created_at ASC
  `).all(thread.id);

  res.json({
    thread: {
      id: thread.id,
      status: thread.status,
      guestKey: thread.guest_key || thread._newGuestKey || null
    },
    messages
  });
});

router.post("/message", optionalAuth, async (req, res) => {
  const text = String(req.body.message || "").trim();
  if (!text) return res.status(400).json({ error: "Message required." });

  const gk = guestKey(req);
  const thread = getOrCreateThread(req.userId || null, gk || null);
  const userMsg = addMessage(thread.id, "user", text);

  let status = thread.status;
  const escalate = wantsHumanAgent(text) || req.body.escalate === true;

  if (escalate && status === "ai") {
    status = "human_pending";
    db.prepare("UPDATE support_threads SET status = ? WHERE id = ?").run(status, thread.id);

    const userRow = req.userId
      ? db.prepare("SELECT email, name FROM users WHERE id = ?").get(req.userId)
      : null;
    const email = userRow?.email || "guest";
    const name = userRow?.name || thread.guest_key || "Guest";

    await sendAdminEmail({
      subject: "[DEWEB] Urgent — support needs human reply",
      text:
        `A user requested a human agent.\n\n` +
        `Name: ${name}\nEmail: ${email}\nThread: ${thread.id}\n\n` +
        `Message:\n${text}\n\n` +
        `Reply in Admin panel → Support.`
    });

    const reply = addMessage(
      thread.id,
      "ai",
      "I've connected you with our team. An admin will reply here shortly. You'll also get a reply by email if your account has one on file."
    );
    return res.json({
      thread: { id: thread.id, status },
      userMessage: userMsg,
      reply,
      escalated: true
    });
  }

  if (status !== "ai") {
    const ack = addMessage(
      thread.id,
      "ai",
      "Your message was sent to our team. We'll reply here as soon as possible."
    );
    return res.json({ thread: { id: thread.id, status }, userMessage: userMsg, reply: ack });
  }

  const aiText = await generateAiReply(text);
  if (aiText === null) {
    db.prepare("UPDATE support_threads SET status = ? WHERE id = ?").run("human_pending", thread.id);
    await sendAdminEmail({
      subject: "[DEWEB] Support — human requested",
      text: `Thread ${thread.id}\n\n${text}`
    });
    const reply = addMessage(thread.id, "ai", "Connecting you with a human agent now…");
    return res.json({
      thread: { id: thread.id, status: "human_pending" },
      userMessage: userMsg,
      reply,
      escalated: true
    });
  }

  const reply = addMessage(thread.id, "ai", aiText);
  res.json({
    thread: { id: thread.id, status: "ai", guestKey: thread.guest_key || thread._newGuestKey },
    userMessage: userMsg,
    reply
  });
});

export default router;
