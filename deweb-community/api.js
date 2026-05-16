// DEWEB API client (load before other scripts)
(function (global) {
  const API_BASE = global.DEWEB_API_URL || "http://localhost:3000/api";
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
      me: () => api("/auth/me")
    },
    Users: {
      updateMe: (body) => api("/users/me", { method: "PATCH", body: JSON.stringify(body) }),
      developers: () => api("/users/developers")
    },
    Products: {
      list: () => api("/products"),
      mine: () => api("/products/mine"),
      save: (body) => api("/products", { method: "POST", body: JSON.stringify(body) }),
      purchase: (id) => api(`/products/${id}/purchase`, { method: "POST", body: "{}" })
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
      pay: (body) => api("/checkout", { method: "POST", body: JSON.stringify(body) }),
      validatePromo: (code) => api("/checkout/promo", { method: "POST", body: JSON.stringify({ code }) })
    },
    Crypto: {
      config: () => api("/crypto/config"),
      swapLink: (mode, params = {}) => {
        const q = new URLSearchParams({ mode, ...params });
        return api(`/crypto/swap-link?${q}`);
      }
    },
    Wallet: {
      get: () => api("/wallet/me"),
      update: (body) => api("/wallet/me", { method: "PATCH", body: JSON.stringify(body) }),
      connect: (body) => api("/wallet/connect", { method: "POST", body: JSON.stringify(body) }),
      transfer: (body) => api("/wallet/transfer", { method: "POST", body: JSON.stringify(body) }),
      transactions: () => api("/wallet/transactions")
    },
    Activity: {
      mine: () => api("/activity/me")
    },
    Services: {
      catalog: () => api("/services/catalog")
    }
  };
})(window);
