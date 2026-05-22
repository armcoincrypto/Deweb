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
    linked: () => api<{ wallets: LinkedWallet[] }>("/wallet/linked"),
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
  },
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
