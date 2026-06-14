import { db, uid, nowIso, parseJson } from "../db.js";

export const SOCIAL_STATUSES = ["draft", "pending", "approved", "published", "failed"];

export function createSocialPost({
  platform,
  topic,
  title,
  content,
  imagePrompt,
  imageUrl,
  status = "pending",
  blogPostId = null,
  telegramUserId = null,
  telegramChatId = null,
}) {
  const id = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO social_posts (
      id, platform, topic, title, content, image_prompt, image_url, status,
      blog_post_id, telegram_user_id, telegram_chat_id, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    platform,
    topic,
    title || null,
    typeof content === "string" ? content : JSON.stringify(content),
    imagePrompt || null,
    imageUrl || null,
    status,
    blogPostId,
    telegramUserId ? String(telegramUserId) : null,
    telegramChatId ? String(telegramChatId) : null,
    t,
    t
  );
  return getSocialPost(id);
}

export function getSocialPost(id) {
  const row = db.prepare("SELECT * FROM social_posts WHERE id = ?").get(id);
  if (!row) return null;
  return formatPost(row);
}

function formatPost(row) {
  return {
    ...row,
    contentParsed: parseJson(row.content, { postText: row.content }),
  };
}

export function updateSocialPost(id, fields) {
  const allowed = [
    "title",
    "content",
    "image_prompt",
    "image_url",
    "status",
    "blog_post_id",
    "error_message",
    "published_at",
  ];
  const sets = [];
  const values = [];
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      sets.push(`${key} = ?`);
      values.push(
        key === "content" && typeof fields[key] !== "string"
          ? JSON.stringify(fields[key])
          : fields[key]
      );
    }
  }
  if (!sets.length) return getSocialPost(id);
  sets.push("updated_at = ?");
  values.push(nowIso(), id);
  db.prepare(`UPDATE social_posts SET ${sets.join(", ")} WHERE id = ?`).run(...values);
  return getSocialPost(id);
}

export function listSocialPosts({ status, platform, limit = 20 } = {}) {
  let sql = "SELECT * FROM social_posts WHERE 1=1";
  const params = [];
  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }
  if (platform) {
    sql += " AND platform = ?";
    params.push(platform);
  }
  sql += " ORDER BY created_at DESC LIMIT ?";
  params.push(limit);
  return db.prepare(sql).all(...params).map(formatPost);
}

export function countByStatus() {
  const rows = db
    .prepare("SELECT status, COUNT(*) AS c FROM social_posts GROUP BY status")
    .all();
  return Object.fromEntries(rows.map((r) => [r.status, r.c]));
}

export function getSession(telegramUserId) {
  const row = db
    .prepare("SELECT * FROM telegram_bot_sessions WHERE telegram_user_id = ?")
    .get(String(telegramUserId));
  if (!row) {
    return {
      telegram_user_id: String(telegramUserId),
      state: "idle",
      platform: null,
      topic: null,
      current_post_id: null,
      session_data: null,
    };
  }
  return {
    ...row,
    sessionData: parseJson(row.session_data, {}),
  };
}

export function saveSession(telegramUserId, patch) {
  const id = String(telegramUserId);
  const existingRow = db
    .prepare("SELECT * FROM telegram_bot_sessions WHERE telegram_user_id = ?")
    .get(id);
  const existing = existingRow
    ? { ...existingRow, sessionData: parseJson(existingRow.session_data, {}) }
    : getSession(id);

  const next = {
    state: patch.state ?? existing.state ?? "idle",
    platform: patch.platform !== undefined ? patch.platform : existing.platform,
    topic: patch.topic !== undefined ? patch.topic : existing.topic,
    current_post_id:
      patch.current_post_id !== undefined ? patch.current_post_id : existing.current_post_id,
    session_data:
      patch.session_data !== undefined
        ? JSON.stringify(patch.session_data)
        : existingRow?.session_data ?? null,
    updated_at: nowIso(),
  };

  if (existingRow) {
    db.prepare(`
      UPDATE telegram_bot_sessions
      SET state = ?, platform = ?, topic = ?, current_post_id = ?, session_data = ?, updated_at = ?
      WHERE telegram_user_id = ?
    `).run(
      next.state,
      next.platform,
      next.topic,
      next.current_post_id,
      next.session_data,
      next.updated_at,
      id
    );
  } else {
    db.prepare(`
      INSERT INTO telegram_bot_sessions (
        telegram_user_id, state, platform, topic, current_post_id, session_data, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      next.state,
      next.platform,
      next.topic,
      next.current_post_id,
      next.session_data,
      next.updated_at
    );
  }
  return getSession(id);
}

export function clearSession(telegramUserId) {
  saveSession(telegramUserId, {
    state: "idle",
    platform: null,
    topic: null,
    current_post_id: null,
    session_data: {},
  });
}
