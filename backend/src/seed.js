import bcrypt from "bcryptjs";
import { db, uid, nowIso, GUEST_USER_ID } from "./db.js";

const DEMO_PASSWORD = "demo1234";

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
