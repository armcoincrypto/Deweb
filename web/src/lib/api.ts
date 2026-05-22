const API_BASE =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ||
      (window.location.hostname === "localhost"
        ? "http://localhost:3000/api"
        : "/api")
    : process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000/api";

const TOKEN_KEY = "deweb_token";

export type User = {
  id: string;
  name?: string;
  email: string;
  username?: string;
  role?: string;
  accountMode?: string;
  account_mode?: string;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
  company?: string;
  currency?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  kycStatus?: string;
  sellerInfo?: Record<string, unknown>;
};

export type Wallet = {
  deweb: number;
  connected?: boolean;
  provider?: string;
  address?: string;
  pendingWithdraw?: number;
};

export type LinkedWallet = { provider: string; address: string };

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return data as T;
}

export const dewebApi = {
  auth: {
    login: (body: { email: string; password: string }) =>
      api<{ token: string; user: User }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    register: (body: {
      username: string;
      email: string;
      password: string;
      accountMode?: string;
      newsletter?: boolean;
    }) =>
      api<{ success: boolean; requireLogin: boolean; email: string; message: string }>(
        "/auth/register",
        { method: "POST", body: JSON.stringify(body) }
      ),
    me: () => api<{ user: User }>("/auth/me"),
    forgotPassword: (email: string) =>
      api<{ success: boolean; message: string; resetUrl?: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    resetPassword: (token: string, password: string) =>
      api<{ success: boolean; message: string }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      }),
  },
  users: {
    updateMe: (body: Record<string, unknown>) =>
      api<{ user: User }>("/users/me", { method: "PATCH", body: JSON.stringify(body) }),
    developers: () => api<{ users: User[] }>("/users/developers"),
  },
  products: {
    list: () => api<{ products: Product[] }>("/products"),
    mine: () => api<{ products: Product[] }>("/products/mine"),
    save: (body: Record<string, unknown>) =>
      api<{ product: Product }>("/products", { method: "POST", body: JSON.stringify(body) }),
  },
  orders: {
    mine: () => api<{ orders: ProjectOrder[] }>("/orders/mine"),
    open: () => api<{ orders: ProjectOrder[] }>("/orders/open"),
    create: (body: Record<string, unknown>) =>
      api<{ order: ProjectOrder }>("/orders", { method: "POST", body: JSON.stringify(body) }),
  },
  bids: {
    list: (orderId: string) => api<{ bids: Bid[] }>(`/bids/order/${orderId}`),
    submit: (orderId: string, body: { price: number; timeline?: string; message?: string }) =>
      api<{ bid: Bid }>(`/bids/order/${orderId}`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    accept: (bidId: string) =>
      api<{ order: ProjectOrder; bid: Bid }>(`/bids/${bidId}/accept`, { method: "POST", body: "{}" }),
    reject: (bidId: string) =>
      api<{ bid: Bid }>(`/bids/${bidId}/reject`, { method: "POST", body: "{}" }),
  },
  wallet: {
    me: () => api<{ wallet: Wallet }>("/wallet/me"),
    linked: () => api<{ linkedWallets: LinkedWallet[] }>("/wallet/linked"),
    link: (body: { provider: string; address: string }) =>
      api("/wallet/linked", { method: "POST", body: JSON.stringify(body) }),
    unlink: (provider: string) =>
      api(`/wallet/linked/${encodeURIComponent(provider)}`, { method: "DELETE" }),
    topupIntent: (body: { dewebAmount: number; provider: string }) =>
      api("/wallet/topup/intent", { method: "POST", body: JSON.stringify(body) }),
    topupConfirm: (body: {
      provider: string;
      dewebAmount: number;
      txHash: string;
      fromAddress?: string;
    }) => api("/wallet/topup/confirm", { method: "POST", body: JSON.stringify(body) }),
    transactions: () => api<{ transactions: WalletTx[] }>("/wallet/transactions"),
    cryptoConfig: () =>
      api<{
        treasuryUsdt: string;
        dewebUsdRate: number;
        swapBuyUrl: string;
        swapSellUrl: string;
      }>("/crypto/config"),
  },
  admin: {
    stats: () => api<AdminStats>("/admin/stats"),
    users: (q?: string) => api<{ users: AdminUser[] }>(`/admin/users${q ? `?q=${encodeURIComponent(q)}` : ""}`),
    user: (id: string) => api<{ user: AdminUser; linkedWallets: LinkedWallet[] }>(`/admin/users/${id}`),
    updateUser: (id: string, body: Record<string, unknown>) =>
      api(`/admin/users/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    orders: () => api<{ orders: AdminOrder[] }>("/admin/orders"),
    order: (id: string) => api<{ order: AdminOrder; bids: Bid[]; escrow: EscrowHold | null }>(`/admin/orders/${id}`),
    updateOrder: (id: string, body: Record<string, unknown>) =>
      api(`/admin/orders/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    bids: () => api<{ bids: Record<string, unknown>[] }>("/admin/bids"),
    topups: (status?: string) =>
      api<{ topups: CryptoTopup[] }>(`/admin/topups${status ? `?status=${status}` : ""}`),
    approveTopup: (id: string, note?: string) =>
      api(`/admin/topups/${id}/approve`, { method: "POST", body: JSON.stringify({ note }) }),
    rejectTopup: (id: string, note?: string) =>
      api(`/admin/topups/${id}/reject`, { method: "POST", body: JSON.stringify({ note }) }),
    escrow: (status = "held") => api<{ escrow: EscrowHold[] }>(`/admin/escrow?status=${status}`),
    releaseEscrow: (id: string) =>
      api(`/admin/escrow/${id}/release`, { method: "POST", body: "{}" }),
    refundEscrow: (id: string) =>
      api(`/admin/escrow/${id}/refund`, { method: "POST", body: "{}" }),
    transactions: () => api<{ transactions: WalletTx[] }>("/admin/transactions"),
    linkedWallets: () => api<{ connections: Record<string, unknown>[] }>("/admin/wallets/linked"),
    products: () => api<{ products: Product[] }>("/admin/products"),
    updateProduct: (id: string, body: Record<string, unknown>) =>
      api(`/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    deleteProduct: (id: string) =>
      api(`/admin/products/${id}`, { method: "DELETE" }),
    creditUser: (userId: string, amount: number) =>
      api("/admin/wallet/credit", { method: "POST", body: JSON.stringify({ userId, amount }) }),
    debitUser: (userId: string, amount: number) =>
      api("/admin/wallet/debit", { method: "POST", body: JSON.stringify({ userId, amount }) }),
    mint: (amount: number) =>
      api("/admin/wallet/mint", { method: "POST", body: JSON.stringify({ amount }) }),
    platformStats: () => api<{ stats: { key: string; value: string }[] }>("/admin/platform-stats"),
    savePlatformStats: (stats: Record<string, string>) =>
      api("/admin/platform-stats", { method: "PUT", body: JSON.stringify({ stats }) }),
    supportThreads: () => api<{ threads: SupportThread[] }>("/admin/support/threads"),
    supportMessages: (id: string) =>
      api<{ thread: SupportThread; messages: { sender: string; body: string }[] }>(
        `/admin/support/threads/${id}/messages`
      ),
    supportReply: (id: string, message: string) =>
      api(`/admin/support/threads/${id}/reply`, {
        method: "POST",
        body: JSON.stringify({ message }),
      }),
    supportStatus: (id: string, status: string) =>
      api(`/admin/support/threads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
  },
};

export type AdminStats = {
  adminBalance: number;
  dewebUsdRate: number;
  users: number;
  orders: number;
  openSupport: number;
  pendingTopups: number;
  heldEscrow: number;
  linkedWallets: number;
  transactionVolume: number;
  displayStats: Record<string, string>;
};

export type AdminUser = User & { dewebBalance?: number };
export type AdminOrder = ProjectOrder & { raw?: Record<string, unknown> };
export type EscrowHold = {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: string;
};
export type CryptoTopup = {
  id: string;
  user_id: string;
  email?: string;
  tx_hash: string;
  deweb_amount: number;
  status: string;
  provider: string;
  created_at: string;
};
export type SupportThread = {
  id: string;
  status: string;
  email?: string;
  last_message?: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
  sellerName?: string;
  rating?: number;
};

export type ProjectOrder = {
  id: string;
  userId?: string;
  service?: string;
  budget?: string;
  details?: string;
  deadline?: string;
  total?: number;
  stage?: string;
  status?: string;
  assignedDevId?: string;
  createdAt?: string;
};

export type Bid = {
  id: string;
  orderId: string;
  sellerId: string;
  sellerName?: string;
  price: number;
  timeline?: string;
  message?: string;
  status: string;
};

export type WalletTx = {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
};
