// Shared API client for DEWEB backend
const API_BASE = window.DEWEB_API_URL || "http://localhost:3000/api";
const TOKEN_KEY = "deweb_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const AuthAPI = {
  register: (body) => api("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => api("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => api("/auth/me")
};

export const UsersAPI = {
  updateMe: (body) => api("/users/me", { method: "PATCH", body: JSON.stringify(body) }),
  developers: () => api("/users/developers")
};

export const ProductsAPI = {
  list: () => api("/products"),
  mine: () => api("/products/mine"),
  save: (body) => api("/products", { method: "POST", body: JSON.stringify(body) })
};

export const OrdersAPI = {
  mine: () => api("/orders/mine"),
  open: () => api("/orders/open"),
  create: (body) => api("/orders", { method: "POST", body: JSON.stringify(body) })
};

export const WalletAPI = {
  get: () => api("/wallet/me"),
  update: (body) => api("/wallet/me", { method: "PATCH", body: JSON.stringify(body) })
};
