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
`);

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
  return {
    id: row.id,
    role: row.role,
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
