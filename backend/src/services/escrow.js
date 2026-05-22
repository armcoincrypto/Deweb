import { db, uid, nowIso } from "../db.js";
import { transferDeweb } from "../routes/crypto.js";
import { getAdminUserId } from "../utils/admin.js";

/** Move DEWEB from buyer into platform escrow (admin treasury holds until release). */
export function holdEscrowForOrder(orderId, buyerId, sellerId, amount, meta = {}) {
  if (amount <= 0) throw new Error("INVALID_AMOUNT");
  const adminId = getAdminUserId();
  const existing = db.prepare(`
    SELECT id FROM escrow_holds WHERE order_id = ? AND status = 'held'
  `).get(orderId);
  if (existing) throw new Error("ESCROW_EXISTS");

  transferDeweb(buyerId, adminId, amount, { type: "escrow_hold", orderId, sellerId, ...meta });

  const id = uid();
  const t = nowIso();
  db.prepare(`
    INSERT INTO escrow_holds (id, order_id, buyer_id, seller_id, amount, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'held', ?, ?)
  `).run(id, orderId, buyerId, sellerId, amount, t, t);

  db.prepare(`
    UPDATE orders SET escrow_amount = ?, escrow_status = 'held' WHERE id = ?
  `).run(amount, orderId);

  return db.prepare("SELECT * FROM escrow_holds WHERE id = ?").get(id);
}

export function releaseEscrow(escrowId, byAdminId, meta = {}) {
  const hold = db.prepare("SELECT * FROM escrow_holds WHERE id = ?").get(escrowId);
  if (!hold) throw new Error("NOT_FOUND");
  if (hold.status !== "held") throw new Error("INVALID_STATUS");

  const adminId = getAdminUserId();
  transferDeweb(adminId, hold.seller_id, hold.amount, {
    type: "escrow_release",
    orderId: hold.order_id,
    releasedBy: byAdminId,
    ...meta
  });

  const t = nowIso();
  db.prepare(`
    UPDATE escrow_holds SET status = 'released', updated_at = ?, released_at = ? WHERE id = ?
  `).run(t, t, escrowId);
  db.prepare(`
    UPDATE orders SET escrow_status = 'released', stage = 'Completed', status = 'completed' WHERE id = ?
  `).run(hold.order_id);

  return db.prepare("SELECT * FROM escrow_holds WHERE id = ?").get(escrowId);
}

export function refundEscrow(escrowId, byAdminId, meta = {}) {
  const hold = db.prepare("SELECT * FROM escrow_holds WHERE id = ?").get(escrowId);
  if (!hold) throw new Error("NOT_FOUND");
  if (hold.status !== "held") throw new Error("INVALID_STATUS");

  const adminId = getAdminUserId();
  transferDeweb(adminId, hold.buyer_id, hold.amount, {
    type: "escrow_refund",
    orderId: hold.order_id,
    refundedBy: byAdminId,
    ...meta
  });

  const t = nowIso();
  db.prepare(`
    UPDATE escrow_holds SET status = 'refunded', updated_at = ?, released_at = ? WHERE id = ?
  `).run(t, t, escrowId);
  db.prepare(`
    UPDATE orders SET escrow_status = 'refunded', status = 'cancelled' WHERE id = ?
  `).run(hold.order_id);

  return db.prepare("SELECT * FROM escrow_holds WHERE id = ?").get(escrowId);
}

export function toEscrowRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    orderId: row.order_id,
    buyerId: row.buyer_id,
    sellerId: row.seller_id,
    amount: row.amount,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    releasedAt: row.released_at
  };
}
