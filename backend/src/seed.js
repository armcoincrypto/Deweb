import bcrypt from "bcryptjs";
import { db, uid, nowIso, GUEST_USER_ID } from "./db.js";
import { ADMIN_USER_ID, getAdminEmail, getAdminEmails } from "./utils/admin.js";

const DEMO_PASSWORD = "demo1234";

function seedAdmin() {
  const email = getAdminEmail() || "admin@deweb.local";
  const password = process.env.ADMIN_PASSWORD || "change-me-admin";
  const initialDeweb = Number(process.env.ADMIN_INITIAL_DEWEB || 1000000);

  let row = db.prepare("SELECT id FROM users WHERE id = ?").get(ADMIN_USER_ID);
  if (!row) {
    row = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  }

  const hash = bcrypt.hashSync(password, 10);
  const createdAt = nowIso();

  if (!row) {
    db.prepare(`
      INSERT INTO users (
        id, role, account_mode, name, username, email, password_hash, email_verified, created_at
      ) VALUES (?, 'admin', 'customer', 'DEWEB Admin', 'dewebadmin', ?, ?, 1, ?)
    `).run(ADMIN_USER_ID, email, hash, createdAt);
  } else {
    db.prepare("UPDATE users SET role = 'admin', email = ? WHERE id = ?").run(email, row.id);
    if (process.env.ADMIN_PASSWORD) {
      db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, row.id);
    }
  }

  const adminId = row?.id || ADMIN_USER_ID;
  const wallet = db.prepare("SELECT user_id FROM wallets WHERE user_id = ?").get(adminId);
  if (!wallet) {
    db.prepare(`
      INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
      VALUES (?, 1, 0, ?, 0)
    `).run(adminId, initialDeweb);
  } else {
    const current = db.prepare("SELECT deweb FROM wallets WHERE user_id = ?").get(adminId);
    if ((current?.deweb || 0) < initialDeweb) {
      db.prepare("UPDATE wallets SET deweb = ?, created = 1 WHERE user_id = ?").run(initialDeweb, adminId);
    }
  }

  if (process.env.ADMIN_GMAIL || process.env.ADMIN_EMAIL) {
    const auto = process.env.ADMIN_AUTO_LOGIN === "true" ? "ON" : "off";
    console.log(`[DEWEB] Admin account: ${email} | auto-login: ${auto} | open http://localhost:8001/account.html`);
  }
}

export function runSeed() {
  const guest = db.prepare("SELECT id FROM users WHERE id = ?").get(GUEST_USER_ID);
  if (!guest) {
    db.prepare(`
      INSERT INTO users (id, role, account_mode, name, username, email, password_hash, created_at)
      VALUES (?, 'client', 'customer', 'Guest', 'guest', 'guest@deweb.local', ?, ?)
    `).run(GUEST_USER_ID, bcrypt.hashSync("guest-no-login", 10), nowIso());
    db.prepare(`
      INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
      VALUES (?, 0, 0, 0, 0)
    `).run(GUEST_USER_ID);
  }

  seedAdmin();

  const devCount = db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'dev'").get().c;
  if (devCount >= 3) return;

  const demos = [
    {
      name: "Aram H.",
      username: "aramh",
      email: "aram@deweb.demo",
      skills: "Frontend (React), UI, Landing pages",
      portfolio: "https://github.com/",
      accountMode: "seller"
    },
    {
      name: "Mariam S.",
      username: "mariams",
      email: "mariam@deweb.demo",
      skills: "Design (Figma), Branding, UI Kits",
      portfolio: "https://www.behance.net/",
      accountMode: "seller"
    },
    {
      name: "Gor K.",
      username: "gork",
      email: "gor@deweb.demo",
      skills: "Bots (Telegram), Node.js, Integrations",
      portfolio: "https://github.com/",
      accountMode: "seller"
    }
  ];

  const hash = bcrypt.hashSync(DEMO_PASSWORD, 10);
  const createdAt = nowIso();

  for (const d of demos) {
    const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(d.email);
    if (exists) continue;
    const id = uid();
    db.prepare(`
      INSERT INTO users (
        id, role, account_mode, name, username, email, password_hash, skills, portfolio, created_at
      ) VALUES (?, 'dev', ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, d.accountMode, d.name, d.username, d.email, hash, d.skills, d.portfolio, createdAt);
    db.prepare(`
      INSERT INTO wallets (user_id, created, connected, deweb, pending_withdraw)
      VALUES (?, 0, 0, 500, 0)
    `).run(id);
    db.prepare(`
      INSERT INTO marketplace_products (
        id, seller_id, seller_name, title, price, category, description,
        views, clicks, comments, reviews, rating, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 120, 24, 3, 1, 4.8, ?)
    `).run(
      uid(), id, d.name,
      `${d.name.split(" ")[0]} Starter Package`,
      299 + Math.floor(Math.random() * 400),
      "Web development",
      "Demo product from seeded seller profile.",
      createdAt
    );
  }
}
