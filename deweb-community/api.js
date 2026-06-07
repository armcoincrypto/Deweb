// DEWEB API client (load before other scripts)
(function (global) {
  function defaultApiBase() {
    if (global.DEWEB_API_URL) return global.DEWEB_API_URL;
    const h = global.location?.hostname || "";
    if (h === "localhost" || h === "127.0.0.1") return "http://localhost:3000/api";
    return "/api";
  }
  const API_BASE = defaultApiBase();
  const TOKEN_KEY = "deweb_token";

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }

  function isLoggedIn() {
    return Boolean(getToken());
  }

  function wrapNetworkError(err) {
    const msg = String(err?.message || err);
    if (err instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(msg)) {
      throw new Error(
        "Cannot reach the API at " + API_BASE + ".\n\n" +
        "Start the backend:\n  cd backend && npm install && npm run dev"
      );
    }
    throw err;
  }

  async function api(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    let res;
    try {
      res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    } catch (err) {
      wrapNetworkError(err);
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `Request failed (${res.status})`);
    }
    return data;
  }

  global.DEWEB_API = {
    getToken,
    setToken,
    isLoggedIn,
    api,
    Auth: {
      register: (body) => api("/auth/register", { method: "POST", body: JSON.stringify(body) }),
      login: (body) => api("/auth/login", { method: "POST", body: JSON.stringify(body) }),
      me: () => api("/auth/me"),
      autoAdmin: () => api("/auth/auto-admin", { method: "POST", body: "{}" })
    },
    Setup: {
      config: () => api("/setup/config")
    },
    Users: {
      updateMe: (body) => api("/users/me", { method: "PATCH", body: JSON.stringify(body) }),
      developers: () => api("/users/developers")
    },
    Products: {
      list: () => api("/products"),
      mine: () => api("/products/mine"),
      save: (body) => api("/products", { method: "POST", body: JSON.stringify(body) }),
    },
    Leads: {
      create: (body) => api("/leads", { method: "POST", body: JSON.stringify(body) })
    },
    Orders: {
      mine: () => api("/orders/mine"),
      open: () => api("/orders/open"),
      create: (body) => api("/orders", { method: "POST", body: JSON.stringify(body) }),
      claim: (id) => api(`/orders/${id}/claim`, { method: "PATCH", body: "{}" }),
      update: (id, body) => api(`/orders/${id}`, { method: "PATCH", body: JSON.stringify(body) })
    },
    Inquiries: {
      create: (body) => api("/inquiries", { method: "POST", body: JSON.stringify(body) })
    },
    Offers: {
      create: (body) => api("/offers", { method: "POST", body: JSON.stringify(body) })
    },
    Contact: {
      send: (body) => api("/contact", { method: "POST", body: JSON.stringify(body) })
    },
    Checkout: {
      pay: () => Promise.reject(new Error("Online checkout is disabled. Contact us at /en/contact")),
      validatePromo: () => Promise.reject(new Error("Promo checkout is disabled."))
    },
    Crypto: {
      config: () => Promise.resolve({ disabled: true }),
      swapLink: () => Promise.reject(new Error("Crypto payments are disabled."))
    },
    Wallet: {
      get: () => Promise.resolve({ wallet: { deweb: 0 }, disabled: true }),
      update: () => Promise.reject(new Error("Wallet is disabled.")),
      connect: () => Promise.reject(new Error("Wallet is disabled.")),
      linked: () => Promise.resolve({ linkedWallets: [] }),
      link: () => Promise.reject(new Error("Wallet is disabled.")),
      unlink: () => Promise.reject(new Error("Wallet is disabled.")),
      topupIntent: () => Promise.reject(new Error("Wallet is disabled.")),
      topupConfirm: () => Promise.reject(new Error("Wallet is disabled.")),
      transfer: () => Promise.reject(new Error("Wallet is disabled.")),
      transactions: () => Promise.resolve({ transactions: [] })
    },
    Activity: {
      mine: () => api("/activity/me")
    },
    Services: {
      catalog: () => api("/services/catalog")
    },
    Support: {
      thread: () => api("/support/thread"),
      message: (body) => api("/support/message", { method: "POST", body: JSON.stringify(body) })
    },
    Admin: {
      stats: () => api("/admin/stats"),
      users: (q) => api(`/admin/users${q ? "?q=" + encodeURIComponent(q) : ""}`),
      user: (id) => api(`/admin/users/${id}`),
      updateUser: (id, body) =>
        api(`/admin/users/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
      orders: () => api("/admin/orders"),
      order: (id) => api(`/admin/orders/${id}`),
      updateOrder: (id, body) =>
        api(`/admin/orders/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
      bids: () => api("/admin/bids"),
      topups: (status) => api(`/admin/topups${status ? "?status=" + status : ""}`),
      approveTopup: (id, note) =>
        api(`/admin/topups/${id}/approve`, { method: "POST", body: JSON.stringify({ note }) }),
      rejectTopup: (id, note) =>
        api(`/admin/topups/${id}/reject`, { method: "POST", body: JSON.stringify({ note }) }),
      escrow: (status) => api(`/admin/escrow?status=${status || "held"}`),
      releaseEscrow: (id) => api(`/admin/escrow/${id}/release`, { method: "POST", body: "{}" }),
      refundEscrow: (id) => api(`/admin/escrow/${id}/refund`, { method: "POST", body: "{}" }),
      transactions: () => api("/admin/transactions"),
      linkedWallets: () => api("/admin/wallets/linked"),
      products: () => api("/admin/products"),
      updateProduct: (id, body) =>
        api(`/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
      creditUser: (userId, amount) =>
        api("/admin/wallet/credit", { method: "POST", body: JSON.stringify({ userId, amount }) }),
      debitUser: (userId, amount) =>
        api("/admin/wallet/debit", { method: "POST", body: JSON.stringify({ userId, amount }) }),
      mint: (amount) =>
        api("/admin/wallet/mint", { method: "POST", body: JSON.stringify({ amount }) }),
      platformStats: () => api("/admin/platform-stats"),
      savePlatformStats: (stats) =>
        api("/admin/platform-stats", { method: "PUT", body: JSON.stringify({ stats }) }),
      supportThreads: () => api("/admin/support/threads"),
      supportMessages: (id) => api(`/admin/support/threads/${id}/messages`),
      supportReply: (id, message) =>
        api(`/admin/support/threads/${id}/reply`, { method: "POST", body: JSON.stringify({ message }) }),
      supportStatus: (id, status) =>
        api(`/admin/support/threads/${id}`, { method: "PATCH", body: JSON.stringify({ status }) })
    }
  };
})(window);
