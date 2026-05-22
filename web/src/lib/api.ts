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
  deweb?: number;
};

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
      newsletter?: boolean;
    }) =>
      api<{ token: string; user: User }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    me: () => api<{ user: User }>("/auth/me"),
  },
  products: {
    list: () => api<{ products: Product[] }>("/products"),
    mine: () => api<{ products: Product[] }>("/products/mine"),
  },
  users: {
    developers: () => api<{ developers: Developer[] }>("/users/developers"),
    updateMe: (body: Record<string, unknown>) =>
      api<{ user: User }>("/users/me", { method: "PATCH", body: JSON.stringify(body) }),
  },
  orders: {
    open: () => api<{ orders: Order[] }>("/orders/open"),
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
  views?: number;
};

export type Developer = {
  id: string;
  name: string;
  email?: string;
  portfolioTitle?: string;
  productName?: string;
  announcement?: string;
};

export type Order = {
  id: string;
  title: string;
  budget?: string;
  status?: string;
};
