import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, "../data/deweb.sqlite");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'client',
    account_mode TEXT NOT NULL DEFAULT 'customer',
    name TEXT,
    username TEXT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    newsletter INTEGER NOT NULL DEFAULT 0,
    phone TEXT,
    address TEXT,
    company TEXT,
    currency TEXT DEFAULT 'USD',
    email_verified INTEGER NOT NULL DEFAULT 0,
    phone_verified INTEGER NOT NULL DEFAULT 0,
    kyc_status TEXT DEFAULT 'not_submitted',
    tfa_enabled INTEGER NOT NULL DEFAULT 0,
    skills TEXT,
    portfolio TEXT,
    seller_info TEXT,
    contact_prefs TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    seller_id TEXT,
    items TEXT,
    total REAL,
    currency TEXT DEFAULT 'USD',
    status TEXT,
    stage TEXT DEFAULT 'Inquiry',
    service TEXT,
    budget TEXT,
    deadline TEXT,
    assigned_dev_id TEXT,
    order_date TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS marketplace_products (
    id TEXT PRIMARY KEY,
    seller_id TEXT NOT NULL,
    seller_name TEXT,
    title TEXT NOT NULL,
    price REAL NOT NULL DEFAULT 0,
    category TEXT,
    description TEXT,
    views INTEGER NOT NULL DEFAULT 0,
    clicks INTEGER NOT NULL DEFAULT 0,
    comments INTEGER NOT NULL DEFAULT 0,
    reviews INTEGER NOT NULL DEFAULT 0,
    rating REAL NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS wallets (
    user_id TEXT PRIMARY KEY,
    created INTEGER NOT NULL DEFAULT 0,
    connected INTEGER NOT NULL DEFAULT 0,
    provider TEXT,
    address TEXT,
    deweb REAL NOT NULL DEFAULT 0,
    pending_withdraw REAL NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS saved_cards (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    brand TEXT,
    last4 TEXT,
    expiry TEXT,
    is_default INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    method TEXT NOT NULL,
    meta TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    name TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS wallet_transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    counterparty_id TEXT,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    balance_after REAL NOT NULL,
    meta TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS service_inquiries (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    email TEXT NOT NULL,
    name TEXT,
    message TEXT NOT NULL,
    budget TEXT,
    deadline TEXT,
    category TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS support_threads (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    guest_key TEXT,
    status TEXT NOT NULL DEFAULT 'ai',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS support_messages (
    id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL,
    sender TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (thread_id) REFERENCES support_threads(id)
  );

  CREATE TABLE IF NOT EXISTS user_linked_wallets (
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    address TEXT NOT NULL,
    connected_at TEXT NOT NULL,
    PRIMARY KEY (user_id, provider),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS project_bids (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    seller_name TEXT,
    price REAL NOT NULL,
    timeline TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS crypto_topups (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    from_address TEXT NOT NULL,
    tx_hash TEXT,
    deweb_amount REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    admin_note TEXT,
    created_at TEXT NOT NULL,
    credited_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS escrow_holds (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    buyer_id TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'held',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    released_at TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS platform_stats (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    label TEXT,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS email_verification_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS marketplace_listings (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    listing_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    budget REAL,
    budget_label TEXT,
    deadline TEXT,
    category TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    author_name TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS listing_applications (
    id TEXT PRIMARY KEY,
    listing_id TEXT NOT NULL,
    applicant_id TEXT NOT NULL,
    applicant_name TEXT,
    message TEXT,
    price REAL,
    timeline TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES marketplace_listings(id),
    FOREIGN KEY (applicant_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS deal_chats (
    id TEXT PRIMARY KEY,
    listing_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    worker_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES marketplace_listings(id)
  );

  CREATE TABLE IF NOT EXISTS deal_messages (
    id TEXT PRIMARY KEY,
    chat_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    body TEXT NOT NULL,
    attachment_name TEXT,
    attachment_sent INTEGER NOT NULL DEFAULT 0,
    moderated INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (chat_id) REFERENCES deal_chats(id)
  );

  CREATE TABLE IF NOT EXISTS lead_submissions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    submission_type TEXT NOT NULL DEFAULT 'contact',
    status TEXT NOT NULL DEFAULT 'new',
    admin_note TEXT,
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    title TEXT,
    product_name TEXT,
    category TEXT,
    offered_price REAL,
    asking_price REAL,
    message TEXT NOT NULL,
    meta TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS blog_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blog_tags (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    seo_title TEXT,
    meta_description TEXT,
    featured_image TEXT,
    category_id TEXT NOT NULL,
    author_name TEXT NOT NULL DEFAULT 'DEWEB Editorial Team',
    status TEXT NOT NULL DEFAULT 'draft',
    reading_time TEXT,
    ai_meta TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    published_at TEXT,
    FOREIGN KEY (category_id) REFERENCES blog_categories(id)
  );

  CREATE TABLE IF NOT EXISTS blog_post_tags (
    post_id TEXT NOT NULL,
    tag_id TEXT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS blog_ai_generations (
    id TEXT PRIMARY KEY,
    post_id TEXT,
    topic TEXT NOT NULL,
    target_keyword TEXT,
    category_id TEXT,
    tone TEXT,
    word_count INTEGER,
    result_json TEXT,
    created_by TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS blog_topic_queue (
    id TEXT PRIMARY KEY,
    topic TEXT NOT NULL,
    target_keyword TEXT,
    category_id TEXT NOT NULL,
    priority INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'queued',
    scheduled_for TEXT NOT NULL,
    generated_post_id TEXT,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES blog_categories(id),
    FOREIGN KEY (generated_post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS blog_post_views (
    id TEXT PRIMARY KEY,
    post_id TEXT,
    slug TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    ip_hash TEXT,
    user_agent TEXT,
    referrer TEXT,
    path TEXT,
    locale TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_blog_post_views_slug ON blog_post_views(slug);
  CREATE INDEX IF NOT EXISTS idx_blog_post_views_visitor ON blog_post_views(visitor_id, slug, created_at);
  CREATE INDEX IF NOT EXISTS idx_blog_post_views_created ON blog_post_views(created_at);

  CREATE TABLE IF NOT EXISTS blog_post_events (
    id TEXT PRIMARY KEY,
    post_id TEXT,
    slug TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_data TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_blog_post_events_slug ON blog_post_events(slug);
  CREATE INDEX IF NOT EXISTS idx_blog_post_events_type ON blog_post_events(event_type);
  CREATE INDEX IF NOT EXISTS idx_blog_post_events_created ON blog_post_events(created_at);

  CREATE TABLE IF NOT EXISTS blog_lead_attribution (
    id TEXT PRIMARY KEY,
    lead_id TEXT NOT NULL,
    post_id TEXT,
    slug TEXT NOT NULL,
    visitor_id TEXT,
    source TEXT,
    medium TEXT,
    campaign TEXT,
    referrer TEXT,
    landing_page TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_blog_lead_attribution_slug ON blog_lead_attribution(slug);
  CREATE INDEX IF NOT EXISTS idx_blog_lead_attribution_post ON blog_lead_attribution(post_id);

  CREATE TABLE IF NOT EXISTS blog_social_posts (
    id TEXT PRIMARY KEY,
    blog_post_id TEXT NOT NULL,
    platform TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    scheduled_at TEXT,
    posted_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    UNIQUE (blog_post_id, platform)
  );

  CREATE INDEX IF NOT EXISTS idx_blog_social_posts_post ON blog_social_posts(blog_post_id);
  CREATE INDEX IF NOT EXISTS idx_blog_social_posts_status ON blog_social_posts(status);

  CREATE TABLE IF NOT EXISTS blog_search_console_daily (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    date TEXT NOT NULL,
    clicks INTEGER NOT NULL DEFAULT 0,
    impressions INTEGER NOT NULL DEFAULT 0,
    ctr REAL NOT NULL DEFAULT 0,
    position REAL NOT NULL DEFAULT 0,
    query TEXT,
    page TEXT,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_blog_gsc_slug ON blog_search_console_daily(slug);
  CREATE INDEX IF NOT EXISTS idx_blog_gsc_date ON blog_search_console_daily(date);

  CREATE TABLE IF NOT EXISTS blog_post_translations (
    id TEXT PRIMARY KEY,
    source_post_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    excerpt TEXT,
    content_json TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (source_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    UNIQUE (source_post_id, locale)
  );

  CREATE INDEX IF NOT EXISTS idx_blog_translations_post ON blog_post_translations(source_post_id);
  CREATE INDEX IF NOT EXISTS idx_blog_translations_locale ON blog_post_translations(locale);

  CREATE TABLE IF NOT EXISTS social_posts (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    topic TEXT NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    image_prompt TEXT,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    blog_post_id TEXT,
    telegram_user_id TEXT,
    telegram_chat_id TEXT,
    error_message TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    published_at TEXT,
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
  CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
  CREATE INDEX IF NOT EXISTS idx_social_posts_created ON social_posts(created_at);

  CREATE TABLE IF NOT EXISTS telegram_bot_sessions (
    telegram_user_id TEXT PRIMARY KEY,
    state TEXT NOT NULL DEFAULT 'idle',
    platform TEXT,
    topic TEXT,
    current_post_id TEXT,
    session_data TEXT,
    updated_at TEXT NOT NULL
  );
`);

const blogQueueColumns = [["blog_topic_queue", "topic_meta", "TEXT"]];
for (const [table, col, type] of blogQueueColumns) {
  try {
    db.prepare(`SELECT ${col} FROM ${table} LIMIT 1`).get();
  } catch {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${type}`);
  }
}

const blogPostColumns = [
  ["blog_posts", "scheduled_publish_at", "TEXT"],
  ["blog_posts", "approved_at", "TEXT"],
  ["blog_posts", "approved_by", "TEXT"],
  ["blog_posts", "publish_mode", "TEXT"],
];
for (const [table, col, type] of blogPostColumns) {
  try {
    db.prepare(`SELECT ${col} FROM ${table} LIMIT 1`).get();
  } catch {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${type}`);
  }
}

const migrateColumns = [
  ["orders", "escrow_amount", "REAL"],
  ["orders", "escrow_status", "TEXT"],
  ["marketplace_products", "image_url", "TEXT"],
  ["users", "avatar_url", "TEXT"],
  ["crypto_topups", "admin_note", "TEXT"],
  ["service_inquiries", "priority", "TEXT"],
  ["service_inquiries", "detected_category", "TEXT"],
  ["service_inquiries", "budget_min", "REAL"],
  ["service_inquiries", "budget_max", "REAL"],
  ["service_inquiries", "meta", "TEXT"]
];
for (const [table, col, type] of migrateColumns) {
  try {
    db.prepare(`SELECT ${col} FROM ${table} LIMIT 1`).get();
  } catch {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${type}`);
  }
}

const orderColumns = [
  ["client_email", "TEXT"],
  ["client_name", "TEXT"],
  ["client_phone", "TEXT"],
  ["pay_method", "TEXT"],
  ["details", "TEXT"],
  ["source", "TEXT"]
];
for (const [col, type] of orderColumns) {
  try {
    db.prepare(`SELECT ${col} FROM orders LIMIT 1`).get();
  } catch {
    db.exec(`ALTER TABLE orders ADD COLUMN ${col} ${type}`);
  }
}

export function logActivity(userId, method, meta = null) {
  db.prepare(
    "INSERT INTO activity (user_id, method, meta, created_at) VALUES (?, ?, ?, ?)"
  ).run(userId, method, meta ? JSON.stringify(meta) : null, nowIso());
}

export const GUEST_USER_ID = "deweb-guest";

export function uid() {
  return `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function parseJson(value, fallback = null) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function toUserRow(row) {
  if (!row) return null;
  const isAdmin = row.role === "admin" || row.id === "deweb-admin";
  return {
    id: row.id,
    role: row.role,
    isAdmin,
    accountMode: row.account_mode,
    name: row.name,
    username: row.username,
    email: row.email,
    newsletter: Boolean(row.newsletter),
    phone: row.phone,
    address: row.address,
    company: row.company,
    currency: row.currency,
    emailVerified: Boolean(row.email_verified),
    phoneVerified: Boolean(row.phone_verified),
    kycStatus: row.kyc_status,
    tfaEnabled: Boolean(row.tfa_enabled),
    skills: row.skills,
    portfolio: row.portfolio,
    sellerInfo: parseJson(row.seller_info, {}),
    contactPrefs: parseJson(row.contact_prefs, {}),
    avatarUrl: row.avatar_url || "",
    createdAt: row.created_at
  };
}

export function getPlatformStat(key, fallback = "") {
  const row = db.prepare("SELECT value FROM platform_stats WHERE key = ?").get(key);
  return row?.value ?? fallback;
}

export function setPlatformStat(key, value, label = "") {
  const t = nowIso();
  db.prepare(`
    INSERT INTO platform_stats (key, value, label, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, label = excluded.label, updated_at = excluded.updated_at
  `).run(key, String(value), label, t);
}
