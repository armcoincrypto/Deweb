import { parseJson } from "../db.js";

export function toOrder(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    sellerId: row.seller_id,
    items: parseJson(row.items, []),
    total: row.total,
    currency: row.currency,
    status: row.status,
    stage: row.stage,
    service: row.service,
    budget: row.budget,
    deadline: row.deadline,
    assignedDevId: row.assigned_dev_id,
    clientEmail: row.client_email,
    clientName: row.client_name,
    clientPhone: row.client_phone,
    payMethod: row.pay_method,
    details: row.details,
    source: row.source,
    date: row.order_date,
    createdAt: row.created_at,
    escrowAmount: row.escrow_amount,
    escrowStatus: row.escrow_status
  };
}

export function parsePriceNumber(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  const m = String(priceStr || "").replace(/,/g, "").match(/[\d.]+/);
  return m ? Number(m[0]) : 0;
}

export function sumCartItems(items) {
  return (items || []).reduce((sum, it) => {
    const unit = parsePriceNumber(it.price);
    const qty = Number(it.qty || 1);
    return sum + unit * qty;
  }, 0);
}
