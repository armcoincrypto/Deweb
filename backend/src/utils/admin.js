import { db } from "../db.js";

export const ADMIN_USER_ID = "deweb-admin";
export const DEWEB_USD_RATE = Number(process.env.DEWEB_USD_RATE || 1);

export function getAdminEmail() {
  const primary =
    process.env.ADMIN_GMAIL ||
    process.env.ADMIN_EMAIL ||
    getAdminEmails()[0] ||
    "";
  return String(primary).trim().toLowerCase();
}

export function getAdminEmails() {
  const raw =
    process.env.ADMIN_EMAILS ||
    process.env.ADMIN_GMAIL ||
    process.env.ADMIN_EMAIL ||
    "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminAutoLoginEnabled() {
  return process.env.ADMIN_AUTO_LOGIN === "true";
}

export function isAdminEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  return getAdminEmails().includes(e);
}

export function isAdminUser(row) {
  if (!row) return false;
  return row.role === "admin" || row.id === ADMIN_USER_ID || isAdminEmail(row.email);
}

export function getAdminUserId() {
  const byId = db.prepare("SELECT id FROM users WHERE id = ?").get(ADMIN_USER_ID);
  if (byId) return ADMIN_USER_ID;
  const emails = getAdminEmails();
  if (emails.length) {
    const row = db.prepare("SELECT id FROM users WHERE email = ?").get(emails[0]);
    if (row) return row.id;
  }
  return ADMIN_USER_ID;
}
