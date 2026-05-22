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
    created_at TEXT NOT NULL,
    credited_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

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
    createdAt: row.created_at
  };
}
