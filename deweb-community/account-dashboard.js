// account-dashboard.js — Account dashboard: My Profile, My Products, Renewals, Payment Methods, etc.

const LS = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};
const DB_KEYS = {
  users: "deweb_users",
  session: "deweb_session",
  orders: "deweb_orders",
  savedCards: "deweb_saved_cards",
  servicesCart: "deweb_services_cart",
  wallet: "deweb_wallet_demo",
  marketplaceProducts: "deweb_marketplace_products"
};
const LS_LANG = "deweb_lang";
const DASH_I18N = {
  en: {
    nav: ["Home", "Services", "Packages", "Order", "Marketplace", "About", "Contact"],
    help: "Help", account: "Account", settings: "Account Settings",
    sections: { profile: "My Profile", wallet: "Wallet", products: "My Products", orderHistory: "Order History", security: "Security" },
    profile: {
      fullName: "Full Name", address: "Address", organization: "Organization", email: "Email", phone: "Primary Mobile Phone",
      kyc: "KYC Verification", tfa: "Two-Factor Authentication", currency: "Default Currency",
      accountMode: "Account mode", customerSeller: "Customer or Seller",
      modeText: "Add profile information for more access to tools, then switch to seller mode when you are ready to publish work.",
      switchSeller: "Switch to Seller Account", switchCustomer: "Switch to Customer Account",
      sellerProfile: "Seller profile", edit: "Edit", saveSeller: "Save seller demo info",
      portfolioHeadline: "Portfolio headline", portfolioLink: "Portfolio link", productFocus: "Product / service focus", announcement: "Announcement",
      save: "Save", home: "Go to Home", logout: "Log out", verify: "Verify", pending: "PENDING", verified: "VERIFIED", enabled: "ENABLED"
    }
  },
  ru: {
    nav: ["Главная", "Услуги", "Пакеты", "Заказ", "Маркетплейс", "О нас", "Контакты"],
    help: "Помощь", account: "Аккаунт", settings: "Настройки аккаунта",
    sections: { profile: "Мой профиль", wallet: "Кошелек", products: "Мои продукты", orderHistory: "История заказов", security: "Безопасность" },
    profile: {
      fullName: "Полное имя", address: "Адрес", organization: "Организация", email: "Email", phone: "Основной телефон",
      kyc: "KYC-верификация", tfa: "Двухфакторная аутентификация", currency: "Валюта по умолчанию",
      accountMode: "Режим аккаунта", customerSeller: "Клиент или продавец",
      modeText: "Добавьте данные профиля для большего доступа к инструментам, затем переключитесь в режим продавца, когда будете готовы публиковать работы.",
      switchSeller: "Переключиться на продавца", switchCustomer: "Переключиться на клиента",
      sellerProfile: "Профиль продавца", edit: "Редактировать", saveSeller: "Сохранить данные продавца",
      portfolioHeadline: "Заголовок портфолио", portfolioLink: "Ссылка на портфолио", productFocus: "Продукт / направление услуги", announcement: "Объявление",
      save: "Сохранить", home: "На главную", logout: "Выйти", verify: "Подтвердить", pending: "В ОЖИДАНИИ", verified: "ПОДТВЕРЖДЕНО", enabled: "ВКЛЮЧЕНО"
    }
  },
  hy: {
    nav: ["Գլխավոր", "Ծառայություններ", "Փաթեթներ", "Պատվեր", "Մարկետփլեյս", "Մեր մասին", "Կապ"],
    help: "Օգնություն", account: "Հաշիվ", settings: "Հաշվի կարգավորումներ",
    sections: { profile: "Իմ պրոֆիլը", wallet: "Դրամապանակ", products: "Իմ ապրանքները", orderHistory: "Պատվերների պատմություն", security: "Անվտանգություն" },
    profile: {
      fullName: "Ամբողջական անուն", address: "Հասցե", organization: "Կազմակերպություն", email: "Email", phone: "Հիմնական հեռախոս",
      kyc: "KYC ստուգում", tfa: "Երկգործոն նույնականացում", currency: "Լռելյայն արժույթ",
      accountMode: "Հաշվի ռեժիմ", customerSeller: "Հաճախորդ կամ վաճառող",
      modeText: "Լրացրեք պրոֆիլի տվյալները՝ ավելի շատ գործիքների հասանելիության համար, ապա անցեք վաճառողի ռեժիմի, երբ պատրաստ եք հրապարակել աշխատանքներ։",
      switchSeller: "Անցնել վաճառողի հաշվին", switchCustomer: "Անցնել հաճախորդի հաշվին",
      sellerProfile: "Վաճառողի պրոֆիլ", edit: "Խմբագրել", saveSeller: "Պահպանել վաճառողի տվյալները",
      portfolioHeadline: "Պորտֆոլիոյի վերնագիր", portfolioLink: "Պորտֆոլիոյի հղում", productFocus: "Ապրանք / ծառայության ուղղություն", announcement: "Հայտարարություն",
      save: "Պահպանել", home: "Գլխավոր էջ", logout: "Դուրս գալ", verify: "Հաստատել", pending: "ՍՊԱՍՎՈՒՄ Է", verified: "ՀԱՍՏԱՏՎԱԾ Է", enabled: "ՄԻԱՑՎԱԾ Է"
    }
  }
};
let currentDashLang = localStorage.getItem(LS_LANG) || "en";
const sectionTitleKeys = { profile: "profile", wallet: "wallet", products: "products", "order-history": "orderHistory", security: "security" };
function dashDict() { return DASH_I18N[currentDashLang] || DASH_I18N.en; }
function dt(path) {
  return path.split(".").reduce((obj, key) => obj?.[key], dashDict()) || path;
}
function sectionTitle(id) {
  return dt("sections." + (sectionTitleKeys[id] || "profile"));
}

function getSession() { return LS.get(DB_KEYS.session, null); }
function clearSession() {
  localStorage.removeItem(DB_KEYS.session);
  window.DEWEB_API?.setToken(null);
}
function normalizeUser(u) {
  if (!u) return null;
  let sellerInfo = u.sellerInfo;
  if (typeof sellerInfo === "string") {
    try { sellerInfo = JSON.parse(sellerInfo); } catch { sellerInfo = {}; }
  }
  let contactPrefs = u.contactPrefs;
  if (typeof contactPrefs === "string") {
    try { contactPrefs = JSON.parse(contactPrefs); } catch { contactPrefs = {}; }
  }
  return {
    ...u,
    emailVerified: Boolean(u.emailVerified),
    phoneVerified: Boolean(u.phoneVerified),
    tfaEnabled: Boolean(u.tfaEnabled),
    sellerInfo: sellerInfo || {},
    contactPrefs: contactPrefs || {}
  };
}

let currentUser = null;
let cachedWallet = null;
let cachedLinkedWallets = [];
let cachedSellerProducts = null;
let cachedOrders = null;
let cryptoConfig = null;

function findMe() { return currentUser; }

async function loadCurrentUser() {
  const API = window.DEWEB_API;
  if (!API?.getToken()) return null;
  try {
    const data = await API.Auth.me();
    currentUser = normalizeUser(data.user);
    return currentUser;
  } catch {
    API.setToken(null);
    return null;
  }
}

async function updateMe(updates) {
  const API = window.DEWEB_API;
  if (!API?.getToken()) return;
  try {
    const data = await API.Users.updateMe(updates);
    currentUser = normalizeUser(data.user);
    fillProfile();
  } catch (err) {
    alert(err.message || "Could not save profile.");
  }
}

async function refreshWallet() {
  const API = window.DEWEB_API;
  if (!API?.getToken()) return;
  try {
    const data = await API.Wallet.get();
    cachedWallet = data.wallet;
    cachedLinkedWallets = data.linkedWallets || [];
  } catch {
    cachedWallet = cachedWallet || getWalletLocal().wallet;
    cachedLinkedWallets = cachedLinkedWallets || [];
  }
}

async function updateWallet(updates) {
  const API = window.DEWEB_API;
  if (!API?.getToken()) return;
  try {
    const data = await API.Wallet.update(updates);
    cachedWallet = data.wallet;
  } catch (err) {
    alert(err.message || "Wallet update failed.");
  }
}

function getWalletLocal() {
  const userId = findMe()?.id || "guest";
  const wallets = LS.get(DB_KEYS.wallet, {});
  const wallet = wallets[userId] || {
    created: false, connected: false, provider: "", address: "", deweb: 0, pendingWithdraw: 0
  };
  return { userId, wallet };
}

function getWallet() {
  return { userId: findMe()?.id, wallet: cachedWallet || getWalletLocal().wallet };
}

function getSellerProductsLocal() {
  const userId = findMe()?.id;
  const products = LS.get(DB_KEYS.marketplaceProducts, []);
  return Array.isArray(products) ? products.filter(p => p.sellerId === userId) : [];
}

async function refreshSellerProducts() {
  const API = window.DEWEB_API;
  if (!API?.getToken()) {
    cachedSellerProducts = getSellerProductsLocal();
    return;
  }
  try {
    const data = await API.Products.mine();
    cachedSellerProducts = data.products || [];
  } catch {
    cachedSellerProducts = getSellerProductsLocal();
  }
}

function getSellerProducts() {
  return cachedSellerProducts ?? [];
}

async function loadCryptoConfig() {
  try {
    cryptoConfig = await window.DEWEB_API.Crypto.config();
  } catch {
    cryptoConfig = null;
  }
}

async function openSwapSite(mode, amount = "") {
  try {
    const data = await window.DEWEB_API.Crypto.swapLink(mode, { amount, coin: "USDT" });
    window.open(data.url, "_blank", "noopener");
  } catch (err) {
    const url = mode === "sell" ? cryptoConfig?.swapSellUrl : cryptoConfig?.swapBuyUrl;
    if (url) window.open(url, "_blank", "noopener");
    else alert(err.message || "Swap site not configured. Add SWAP_SITE_BUY_URL to backend .env");
  }
}

async function refreshOrders() {
  const API = window.DEWEB_API;
  if (!API?.getToken()) {
    cachedOrders = (LS.get(DB_KEYS.orders, []) || []).filter(o => o.userId === findMe()?.id);
    return;
  }
  try {
    const data = await API.Orders.mine();
    cachedOrders = data.orders || [];
  } catch {
    cachedOrders = (LS.get(DB_KEYS.orders, []) || []).filter(o => o.userId === findMe()?.id);
  }
}
function makeProductStats(product, index) {
  return {
    views: product.views ?? 120 + (index * 37),
    clicks: product.clicks ?? 24 + (index * 9),
    comments: product.comments ?? 3 + index,
    reviews: product.reviews ?? 1 + index,
    rating: product.rating ?? 4.8
  };
}

function getInitials(name) {
  if (!name || !name.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
function formatPhone(str) {
  const d = (str || "").replace(/\D/g, "");
  if (d.length >= 10) return "+" + d.slice(0, 3) + "." + d.slice(3);
  return str || "—";
}

// ——— Section switching with browser history ———
const sections = [
  "profile", "wallet", "products", "order-history", "security"
];
const sectionTitles = {
  profile: "My Profile",
  wallet: "Wallet",
  products: "My Products",
  "order-history": "Order History",
  security: "Security"
};

let currentSection = "profile";
let sellerEditing = false;

function setActiveSection(id, pushHistory = true) {
  if (!sections.includes(id)) id = "profile";
  currentSection = id;
  
  sections.forEach(sid => {
    const el = document.getElementById("section-" + sid);
    if (el) el.classList.toggle("active", sid === id);
  });
  document.querySelectorAll(".sidebar-link[data-section]").forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-section") === id);
  });
  if (id !== "profile") void renderSectionContent(id);
  
  // Update browser history (pushState) so back button works
  if (pushHistory) {
    const url = new URL(window.location);
    url.hash = id;
    history.pushState({ section: id }, sectionTitle(id), url);
  }
}

// Handle browser back/forward buttons
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.section) {
    setActiveSection(e.state.section, false);
  } else {
    // Check hash as fallback
    const hash = window.location.hash.replace("#", "");
    if (hash && sections.includes(hash)) {
      setActiveSection(hash, false);
    } else {
      setActiveSection("profile", false);
    }
  }
});

// On page load, check hash for initial section
function initSectionFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash && sections.includes(hash)) {
    // Replace current state so first back goes to previous page
    history.replaceState({ section: hash }, sectionTitle(hash), window.location.href);
    setActiveSection(hash, false);
  } else {
    history.replaceState({ section: "profile" }, sectionTitle("profile"), window.location.href);
  }
}

async function renderSectionContent(id) {
  const container = document.getElementById("section-" + id);
  if (!container) return;
  if (id === "profile") return;
  if (id === "wallet") {
    await refreshWallet();
    await loadCryptoConfig();
  }
  if (id === "products") await refreshSellerProducts();
  if (id === "order-history") await refreshOrders();
  const title = sectionTitle(id);
  const renderers = {
    wallet: renderWallet,
    products: renderProducts,
    "order-history": renderOrderHistory,
    security: renderSecurity
  };
  const fn = renderers[id];
  const html = fn ? fn() : `<div class="section-empty"><p>Content for ${title} will be available here.</p></div>`;
  container.innerHTML = `<h1 class="dashboard-page-title">${title}</h1>${html}`;
}

function renderProducts() {
  const user = findMe() || {};
  if (user.accountMode !== "seller") {
    return `
      <div class="section-empty">
        <p>Switch to seller account from My Profile to add and manage products.</p>
        <button type="button" class="cta-btn primary" data-section-jump="profile">Go to My Profile</button>
      </div>
    `;
  }
  const products = getSellerProducts();
  return `
    <div class="seller-products-layout">
      <div class="section-block seller-product-form">
        <span class="section-kicker">Marketplace product</span>
        <h3 id="productFormTitle">Add Product</h3>
        <input type="hidden" id="sellerProductId" />
        <label>Product title<input type="text" id="sellerProductTitle" placeholder="Example: Web3 landing page" /></label>
        <label>Price in DEWEB<input type="number" id="sellerProductPrice" min="0" placeholder="Example: 500" /></label>
        <label>Category
          <select id="sellerProductCategory">
            <option>Web development</option>
            <option>Design</option>
            <option>Automation</option>
            <option>Marketing</option>
            <option>Smart contract</option>
          </select>
        </label>
        <label>Description<textarea id="sellerProductDescription" placeholder="Describe what customers receive."></textarea></label>
        <div class="seller-product-form__actions">
          <button type="button" class="cta-btn primary" id="saveSellerProductBtn">Add Product</button>
          <button type="button" class="cta-btn secondary" id="cancelSellerProductEditBtn" style="display:none">Cancel</button>
        </div>
      </div>
      <div class="seller-products-list">
        ${products.length === 0 ? '<div class="section-empty"><p>No products yet. Add your first seller product.</p></div>' : products.map((product, index) => {
          const stats = makeProductStats(product, index);
          return `
            <div class="seller-product-card">
              <div class="seller-product-card__head">
                <div>
                  <span class="section-kicker">${product.category || "Product"}</span>
                  <h3>${product.title || "Untitled product"}</h3>
                  <p>${product.description || "No description yet."}</p>
                </div>
                <strong>${product.price || 0} DEWEB</strong>
              </div>
              <div class="seller-product-stats">
                <span>${stats.views} views</span>
                <span>${stats.clicks} clicks</span>
                <span>${stats.comments} comments</span>
                <span>${stats.reviews} reviews</span>
                <span>${stats.rating} rating</span>
              </div>
              <button type="button" class="cta-btn secondary" data-edit-product="${product.id}">Edit</button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderRenewals() {
  const renewals = []; // could come from orders or a renewals store
  return `
    <div class="section-block">
      <h3>Upcoming renewals</h3>
      ${renewals.length === 0 ? '<div class="section-empty"><p>No upcoming renewals.</p><p>Domain and service renewals will appear here.</p></div>' : `
        <table class="section-table">
          <thead><tr><th>Item</th><th>Renewal date</th><th>Amount</th><th>Action</th></tr></thead>
          <tbody>${renewals.map(r => `<tr><td>${r.name}</td><td>${r.date}</td><td>${r.amount}</td><td><button class="cta-btn primary">Renew</button></td></tr>`).join("")}</tbody>
        </table>
      `}
    </div>
    <div class="section-block">
      <h3>Billing history</h3>
      <div class="section-empty"><p>Invoices and billing history will be listed here.</p></div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getLinkedByProvider(provider) {
  return (cachedLinkedWallets || []).find((w) => w.provider === provider);
}

function renderLinkedWalletCard(provider) {
  const linked = getLinkedByProvider(provider);
  if (linked) {
    return `
      <div class="wallet-linked-card wallet-linked-card--active">
        <div class="wallet-linked-card__head">
          <span class="wallet-linked-card__provider">${escapeHtml(provider)}</span>
          <span class="wallet-linked-card__badge">Connected</span>
        </div>
        <div class="wallet-linked-card__address" title="${escapeHtml(linked.address)}">${escapeHtml(linked.address)}</div>
        <button type="button" class="wallet-connect-btn cta-btn secondary" data-unlink="${escapeHtml(provider)}">Disconnect</button>
      </div>
    `;
  }
  const btnId = provider === "MetaMask" ? "connectMetaMaskBtn" : "connectRoninBtn";
  return `
    <div class="wallet-linked-card">
      <div class="wallet-linked-card__head">
        <span class="wallet-linked-card__provider">${escapeHtml(provider)}</span>
      </div>
      <p class="wallet-linked-card__empty">Not connected</p>
      <button type="button" class="wallet-connect-btn cta-btn secondary" id="${btnId}">Connect ${escapeHtml(provider)}</button>
    </div>
  `;
}

function renderWallet() {
  const { wallet } = getWallet();
  const linked = cachedLinkedWallets || [];
  const providerOptions = linked
    .map((w) => `<option value="${escapeHtml(w.provider)}">${escapeHtml(w.provider)} — ${escapeHtml(w.address.slice(0, 10))}…</option>`)
    .join("");
  const canTopUp = linked.length > 0;

  return `
    <div class="wallet-hero section-block">
      <div>
        <span class="section-kicker">DEWEB wallet</span>
        <h3>Internal DEWEB balance</h3>
        <p>1 DEWEB = 1 USD. Connect MetaMask and/or Ronin (one address each per account). Send crypto from your wallet to get DEWEB instantly after confirmation.</p>
      </div>
    </div>

    <div class="wallet-balance-card wallet-balance-card--wide">
      <span class="wallet-balance-card__label">DEWEB balance</span>
      <strong class="wallet-balance-card__amount">${Number(wallet.deweb || 0).toLocaleString()} DEWEB</strong>
      <p>Use DEWEB to buy services and pay marketplace sellers.</p>
    </div>

    <h3 class="wallet-section-title">Your connected wallets</h3>
    <p class="wallet-section-sub">You can connect both MetaMask and Ronin on one account.</p>
    <div class="wallet-linked-grid">
      ${renderLinkedWalletCard("MetaMask")}
      ${renderLinkedWalletCard("Ronin")}
    </div>

    <div class="wallet-grid wallet-grid--tools">
      <div class="section-block wallet-tool-card wallet-tool-card--topup">
        <h3>Get DEWEB coins</h3>
        <p>Enter how much DEWEB you want (1 DEWEB = $1). Press <strong>Get</strong> — your wallet opens to send crypto to DEWEB. After the transfer is confirmed, DEWEB is added to your balance.</p>
        <label class="wallet-field-label" for="dewebTopupAmount">Amount (DEWEB / USD)</label>
        <input type="number" id="dewebTopupAmount" min="1" step="1" placeholder="e.g. 100" class="account-page__input wallet-topup-input" />
        <label class="wallet-field-label" for="dewebTopupProvider">Pay from wallet</label>
        <select id="dewebTopupProvider" class="account-page__input wallet-topup-select" ${canTopUp ? "" : "disabled"}>
          ${canTopUp ? providerOptions : '<option value="">Connect a wallet first</option>'}
        </select>
        <button type="button" class="wallet-connect-btn cta-btn secondary" id="getDewebBtn" ${canTopUp ? "" : "disabled"}>Get DEWEB</button>
        <p class="wallet-note">Alternative: <button type="button" class="link-btn" id="buyOnSwapBtn">open partner swap site</button></p>
      </div>
      <div class="section-block wallet-tool-card">
        <h3>Withdraw DEWEB → crypto</h3>
        <p>Exchange DEWEB to crypto on the swap site.</p>
        <input type="number" id="walletWithdrawAmount" min="0" placeholder="DEWEB amount (optional)" class="account-page__input wallet-topup-input" />
        <button type="button" class="wallet-connect-btn cta-btn secondary" id="withdrawOnSwapBtn">Open swap site — Withdraw</button>
      </div>
    </div>
  `;
}

function renderPaymentMethods() {
  const cards = LS.get(DB_KEYS.savedCards, []);
  const myId = findMe()?.id;
  const myCards = Array.isArray(cards) ? cards.filter(c => c.userId === myId) : [];
  return `
    <div class="section-block">
      <h3>Saved payment methods</h3>
      ${myCards.length === 0 ? '<div class="section-empty"><p>No saved cards.</p><p>Add a card when checking out to see it here.</p></div>' : `
        <table class="section-table">
          <thead><tr><th>Type</th><th>Last 4</th><th>Expiry</th><th>Default</th></tr></thead>
          <tbody>
            ${myCards.map(c => `<tr><td>${c.brand || "Card"}</td><td>**** ${(c.last4 || "****")}</td><td>${c.expiry || "—"}</td><td>${c.default ? "Yes" : "—"}</td></tr>`).join("")}
          </tbody>
        </table>
      `}
    </div>
    <div class="section-block">
      <p><button class="cta-btn secondary" disabled>Add payment method</button> (available at checkout)</p>
    </div>
  `;
}

function renderOrderHistory() {
  const myOrders = cachedOrders || [];
  return `
    <div class="section-block">
      <h3>All orders</h3>
      ${myOrders.length === 0 ? '<div class="section-empty"><p>No orders yet.</p><a href="services.html" class="cta-btn primary">Browse services</a></div>' : `
        <table class="section-table">
          <thead><tr><th>Order</th><th>Service</th><th>Date</th><th>Total</th><th>Stage</th></tr></thead>
          <tbody>
            ${myOrders.slice(0, 30).map(o => `
              <tr>
                <td>#${(o.id || "—").toString().slice(0, 12)}</td>
                <td>${o.service || o.source || "—"}</td>
                <td>${(o.date || o.createdAt || "—").toString().slice(0, 10)}</td>
                <td>${o.total != null ? o.total + " " + (o.currency || "USD") : "—"}</td>
                <td>${o.stage || o.status || "—"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `}
    </div>
  `;
}

function renderSecurity() {
  return `
    <div class="section-block">
      <h3>Password</h3>
      <p>Change your password to keep your account secure.</p>
      <button type="button" class="cta-btn primary" id="changePasswordBtn">Change password</button>
    </div>
    <div class="section-block">
      <h3>Two-factor authentication</h3>
      <p>Add an extra layer of security with 2FA. (Coming soon)</p>
    </div>
    <div class="section-block">
      <h3>Active sessions</h3>
      <p>Current session: this device. Sign out elsewhere from this page.</p>
    </div>
  `;
}

function renderDelegate() {
  return `
    <div class="section-block">
      <h3>Delegate access</h3>
      <p>Grant other users limited access to manage your products and billing.</p>
      <div class="section-empty"><p>No delegates added.</p><button class="cta-btn secondary" disabled>Add delegate</button></p></div>
    </div>
  `;
}

function renderDomainDefaults() {
  return `
    <div class="section-block">
      <h3>Domain defaults</h3>
      <p>Set default nameservers, renewal preferences, and contact details for new domains.</p>
      <div class="section-empty"><p>Configure when you add your first domain.</p></div>
    </div>
  `;
}

function renderContactPrefs() {
  const user = findMe() || {};
  const prefs = user.contactPrefs || { renewalEmail: true, updatesEmail: true, marketingEmail: false, smsAlerts: false, pushNotifications: true };
  return `
    <div class="contact-prefs-grid">
      <div class="section-block prefs-card">
        <div class="prefs-card__icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h3>Email Notifications</h3>
        <p class="prefs-card__desc">Control what emails you receive from us</p>
        <div class="prefs-toggles">
          <label class="pref-toggle">
            <input type="checkbox" data-pref="renewalEmail" ${prefs.renewalEmail ? 'checked' : ''} />
            <span class="pref-toggle__slider"></span>
            <span class="pref-toggle__label">Renewal reminders</span>
          </label>
          <label class="pref-toggle">
            <input type="checkbox" data-pref="updatesEmail" ${prefs.updatesEmail ? 'checked' : ''} />
            <span class="pref-toggle__slider"></span>
            <span class="pref-toggle__label">Product updates & news</span>
          </label>
          <label class="pref-toggle">
            <input type="checkbox" data-pref="marketingEmail" ${prefs.marketingEmail ? 'checked' : ''} />
            <span class="pref-toggle__slider"></span>
            <span class="pref-toggle__label">Marketing & promotions</span>
          </label>
        </div>
      </div>
      <div class="section-block prefs-card">
        <div class="prefs-card__icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <h3>SMS Notifications</h3>
        <p class="prefs-card__desc">Receive important alerts via text message</p>
        <div class="prefs-toggles">
          <label class="pref-toggle">
            <input type="checkbox" data-pref="smsAlerts" ${prefs.smsAlerts ? 'checked' : ''} />
            <span class="pref-toggle__slider"></span>
            <span class="pref-toggle__label">Security alerts</span>
          </label>
          <label class="pref-toggle">
            <input type="checkbox" data-pref="smsRenewals" ${prefs.smsRenewals ? 'checked' : ''} />
            <span class="pref-toggle__slider"></span>
            <span class="pref-toggle__label">Payment & renewal alerts</span>
          </label>
        </div>
      </div>
      <div class="section-block prefs-card">
        <div class="prefs-card__icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        <h3>Push Notifications</h3>
        <p class="prefs-card__desc">Browser and app push notifications</p>
        <div class="prefs-toggles">
          <label class="pref-toggle">
            <input type="checkbox" data-pref="pushNotifications" ${prefs.pushNotifications ? 'checked' : ''} />
            <span class="pref-toggle__slider"></span>
            <span class="pref-toggle__label">Enable push notifications</span>
          </label>
          <label class="pref-toggle">
            <input type="checkbox" data-pref="pushOrders" ${prefs.pushOrders ? 'checked' : ''} />
            <span class="pref-toggle__slider"></span>
            <span class="pref-toggle__label">Order status updates</span>
          </label>
        </div>
      </div>
    </div>
    <div class="prefs-actions">
      <button type="button" class="cta-btn primary" id="saveContactPrefsBtn">Save preferences</button>
      <span class="prefs-saved-msg" id="prefsSavedMsg" style="display:none">Preferences saved!</span>
    </div>
  `;
}

function renderPayees() {
  return `
    <div class="section-block">
      <h3>Payees</h3>
      <p>Manage payees for wire transfers and other payment types.</p>
      <div class="section-empty"><p>No payees added.</p></div>
    </div>
  `;
}

document.querySelectorAll(".sidebar-link[data-section]").forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.getAttribute("data-section");
    if (id && id !== currentSection) {
      setActiveSection(id, true); // true = push to history
    }
  });
});

// ——— Profile: fill and edit ———
let profileDirty = false;
const fieldMap = {
  name: { valueEl: "profileName", inputId: "editName", key: "name" },
  address: { valueEl: "profileAddress", inputId: "editAddress", key: "address" },
  organization: { valueEl: "profileOrganization", inputId: "editOrganization", key: "company" },
  email: { valueEl: "profileEmail", inputId: "editEmail", key: "email" },
  phone: { valueEl: "profilePhone", inputId: "editPhone", key: "phone" },
  currency: { valueEl: "profileCurrency", inputId: "editCurrency", key: "currency" }
};

function fillProfile() {
  const user = findMe();
  if (!user) return;
  document.getElementById("profileName").textContent = user.name || "—";
  document.getElementById("profileAddress").textContent = user.address || "—";
  document.getElementById("profileOrganization").textContent = user.company || "—";
  document.getElementById("profileEmail").textContent = user.email || "—";
  document.getElementById("profilePhone").textContent = user.phone ? formatPhone(user.phone) : "—";
  const currencyEl = document.getElementById("profileCurrency");
  const editCurrency = document.getElementById("editCurrency");
  currencyEl.textContent = user.currency || "USD";
  if (editCurrency) editCurrency.value = user.currency || "USD";

  // Email & phone verification
  const emailVerified = user.emailVerified === true;
  const phoneVerified = user.phoneVerified === true;
  const emailBadge = document.getElementById("emailVerifiedBadge");
  const phoneBadge = document.getElementById("phoneVerifiedBadge");
  const verifyEmailBtn = document.getElementById("verifyEmailBtn");
  const verifyPhoneBtn = document.getElementById("verifyPhoneBtn");
  if (emailBadge) emailBadge.style.display = emailVerified ? "inline" : "none";
  if (verifyEmailBtn) verifyEmailBtn.style.display = user.email && !emailVerified ? "inline" : "none";
  if (phoneBadge) phoneBadge.style.display = phoneVerified ? "inline" : "none";
  if (verifyPhoneBtn) verifyPhoneBtn.style.display = user.phone && !phoneVerified ? "inline" : "none";

  // KYC status
  const kycStatus = user.kycStatus || "not_submitted"; // not_submitted, pending, verified
  const kycValue = document.getElementById("profileKyc");
  const kycVerifiedBadge = document.getElementById("kycVerifiedBadge");
  const kycPendingBadge = document.getElementById("kycPendingBadge");
  const startKycBtn = document.getElementById("startKycBtn");
  if (kycValue) {
    if (kycStatus === "verified") kycValue.textContent = "Identity verified";
    else if (kycStatus === "pending") kycValue.textContent = "Under review";
    else kycValue.textContent = "Not submitted";
  }
  if (kycVerifiedBadge) kycVerifiedBadge.style.display = kycStatus === "verified" ? "inline" : "none";
  if (kycPendingBadge) kycPendingBadge.style.display = kycStatus === "pending" ? "inline" : "none";
  if (startKycBtn) {
    if (kycStatus === "verified") { startKycBtn.textContent = "View"; startKycBtn.classList.add("secondary"); }
    else if (kycStatus === "pending") { startKycBtn.textContent = "Check status"; startKycBtn.classList.add("secondary"); }
    else { startKycBtn.textContent = "Start KYC"; startKycBtn.classList.remove("secondary"); }
  }

  // 2FA status
  const tfaEnabled = user.tfaEnabled === true;
  const tfaValue = document.getElementById("profile2fa");
  const tfaEnabledBadge = document.getElementById("tfaEnabledBadge");
  const setup2faBtn = document.getElementById("setup2faBtn");
  if (tfaValue) tfaValue.textContent = tfaEnabled ? "Enabled (Authenticator app)" : "Disabled";
  if (tfaEnabledBadge) tfaEnabledBadge.style.display = tfaEnabled ? "inline" : "none";
  if (setup2faBtn) {
    if (tfaEnabled) { setup2faBtn.textContent = "Manage"; setup2faBtn.classList.add("secondary"); }
    else { setup2faBtn.textContent = "Setup 2FA"; setup2faBtn.classList.remove("secondary"); }
  }

  // Seller mode and demo seller tools
  const sellerModeBtn = document.getElementById("sellerModeBtn");
  const sellerTools = document.getElementById("sellerTools");
  const sellerProductsNav = document.getElementById("sellerProductsNav");
  const isSeller = user.accountMode === "seller";
  if (sellerModeBtn) sellerModeBtn.textContent = isSeller ? dt("profile.switchCustomer") : dt("profile.switchSeller");
  if (sellerTools) sellerTools.style.display = isSeller ? "block" : "none";
  if (sellerProductsNav) sellerProductsNav.style.display = isSeller ? "" : "none";
  const sellerInfo = user.sellerInfo || {};
  const sellerHasInfo = Boolean(sellerInfo.portfolioTitle || sellerInfo.portfolioLink || sellerInfo.productName || sellerInfo.announcement);
  const sellerSavedCard = document.getElementById("sellerSavedCard");
  const sellerEditForm = document.getElementById("sellerEditForm");
  const sellerSavedTitle = document.getElementById("sellerSavedTitle");
  const sellerSavedLink = document.getElementById("sellerSavedLink");
  const sellerSavedProduct = document.getElementById("sellerSavedProduct");
  const sellerSavedAnnouncement = document.getElementById("sellerSavedAnnouncement");
  if (sellerSavedCard) sellerSavedCard.style.display = isSeller && sellerHasInfo && !sellerEditing ? "flex" : "none";
  if (sellerEditForm) sellerEditForm.style.display = isSeller && (!sellerHasInfo || sellerEditing) ? "block" : "none";
  if (sellerSavedTitle) sellerSavedTitle.textContent = sellerInfo.portfolioTitle || "Seller profile";
  if (sellerSavedLink) sellerSavedLink.textContent = sellerInfo.portfolioLink ? `Portfolio: ${sellerInfo.portfolioLink}` : "Portfolio: not added";
  if (sellerSavedProduct) sellerSavedProduct.textContent = sellerInfo.productName ? `Focus: ${sellerInfo.productName}` : "Focus: not added";
  if (sellerSavedAnnouncement) sellerSavedAnnouncement.textContent = sellerInfo.announcement ? `Announcement: ${sellerInfo.announcement}` : "Announcement: not added";
  const sellerPortfolioTitle = document.getElementById("sellerPortfolioTitle");
  const sellerPortfolioLink = document.getElementById("sellerPortfolioLink");
  const sellerProductName = document.getElementById("sellerProductName");
  const sellerAnnouncement = document.getElementById("sellerAnnouncement");
  if (sellerPortfolioTitle) sellerPortfolioTitle.value = sellerInfo.portfolioTitle || "";
  if (sellerPortfolioLink) sellerPortfolioLink.value = sellerInfo.portfolioLink || "";
  if (sellerProductName) sellerProductName.value = sellerInfo.productName || "";
  if (sellerAnnouncement) sellerAnnouncement.value = sellerInfo.announcement || "";
}

function setProfileDirty(dirty) {
  profileDirty = dirty;
  const saveBtn = document.getElementById("profileSaveBtn");
  if (saveBtn) saveBtn.style.display = dirty ? "inline-block" : "none";
}

document.querySelectorAll(".profile-row[data-field]").forEach(row => {
  row.addEventListener("click", () => {
    const field = row.getAttribute("data-field");
    const cfg = fieldMap[field];
    if (!cfg) return;
    const valueEl = document.getElementById(cfg.valueEl);
    const inputEl = document.getElementById(cfg.inputId);
    if (!valueEl || !inputEl) return;
    if (inputEl.style.display === "none") {
      valueEl.style.display = "none";
      inputEl.style.display = "block";
      if (inputEl.tagName === "SELECT") inputEl.value = (findMe() || {})[cfg.key] || "USD";
      else inputEl.value = (findMe() || {})[cfg.key] || "";
      inputEl.focus();
    }
  });
});

["editName", "editAddress", "editOrganization", "editEmail", "editPhone", "editCurrency"].forEach(id => {
  const input = document.getElementById(id);
  if (!input) return;
  function commit() {
    const field = Object.entries(fieldMap).find(([, c]) => c.inputId === id)?.[0];
    if (!field) return;
    const cfg = fieldMap[field];
    const user = findMe();
    if (!user) return;
    let val = input.value.trim();
    if (cfg.key === "currency") val = val || "USD";
    const prev = user[cfg.key];
    if (String(prev) === String(val)) {
      input.style.display = "none";
      document.getElementById(cfg.valueEl).style.display = "";
      return;
    }
    updateMe({ [cfg.key]: val });
    if (field === "name") document.getElementById("navAvatar").textContent = getInitials(val);
    if (field === "phone") val = val ? formatPhone(val) : "—";
    document.getElementById(cfg.valueEl).textContent = val || "—";
    input.style.display = "none";
    document.getElementById(cfg.valueEl).style.display = "";
    setProfileDirty(true);
  }
  input.addEventListener("blur", commit);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } });
});

document.getElementById("profileSaveBtn")?.addEventListener("click", () => {
  setProfileDirty(false);
  fillProfile();
});

// ——— Verification modal ———
const verifyModal = document.getElementById("verifyModal");
const verifyModalTitle = document.getElementById("verifyModalTitle");
const verifyModalDesc = document.getElementById("verifyModalDesc");
const verifyStepSend = document.getElementById("verifyStepSend");
const verifyStepEnter = document.getElementById("verifyStepEnter");
const verifyCodeInput = document.getElementById("verifyCodeInput");
const verifySendCodeBtn = document.getElementById("verifySendCodeBtn");
const verifyConfirmBtn = document.getElementById("verifyConfirmBtn");
const verifyModalClose = document.getElementById("verifyModalClose");

let verifyMode = "email"; // 'email' | 'phone'
const MOCK_CODE = "123456";

function openVerifyModal(mode) {
  verifyMode = mode;
  verifyModal.setAttribute("aria-hidden", "false");
  verifyStepSend.style.display = "";
  verifyStepEnter.style.display = "none";
  verifyCodeInput.value = "";
  if (mode === "email") {
    verifyModalTitle.textContent = "Verify Email";
    verifyModalDesc.textContent = "We'll send a 6-digit code to your email. Enter it below.";
  } else {
    verifyModalTitle.textContent = "Verify Phone";
    verifyModalDesc.textContent = "We'll send a 6-digit code via SMS. Enter it below.";
  }
}

function closeVerifyModal() {
  verifyModal.setAttribute("aria-hidden", "true");
}

verifyModalClose?.addEventListener("click", closeVerifyModal);
verifyModal?.addEventListener("click", (e) => { if (e.target === verifyModal) closeVerifyModal(); });

verifySendCodeBtn?.addEventListener("click", () => {
  // Mock: "sent"
  verifyStepSend.style.display = "none";
  verifyStepEnter.style.display = "block";
  verifyCodeInput.focus();
});

verifyConfirmBtn?.addEventListener("click", () => {
  const code = (verifyCodeInput.value || "").trim();
  if (code !== MOCK_CODE) {
    alert("Invalid code. Try 123456 for demo.");
    return;
  }
  if (verifyMode === "email") updateMe({ emailVerified: true });
  else updateMe({ phoneVerified: true });
  closeVerifyModal();
  fillProfile();
});

verifyCodeInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") verifyConfirmBtn?.click();
});

document.getElementById("verifyEmailBtn")?.addEventListener("click", (e) => { e.stopPropagation(); openVerifyModal("email"); });
document.getElementById("verifyPhoneBtn")?.addEventListener("click", (e) => { e.stopPropagation(); openVerifyModal("phone"); });

// ——— KYC & 2FA ———
document.getElementById("startKycBtn")?.addEventListener("click", (e) => {
  e.stopPropagation();
  const user = findMe();
  if (!user) return;
  if (user.kycStatus === "verified") {
    alert("Your identity is verified. View your KYC documents in the Security section.");
    return;
  }
  if (user.kycStatus === "pending") {
    alert("Your KYC is under review. We'll notify you once it's approved (usually 1-2 business days).");
    return;
  }
  // Mock: start KYC process
  if (confirm("Start KYC verification?\n\nYou'll need to provide:\n• Government-issued ID\n• Proof of address\n• Selfie for verification\n\nClick OK to submit (demo: auto-pending).")) {
    updateMe({ kycStatus: "pending" });
    fillProfile();
  }
});

document.getElementById("setup2faBtn")?.addEventListener("click", (e) => {
  e.stopPropagation();
  const user = findMe();
  if (!user) return;
  if (user.tfaEnabled) {
    if (confirm("Two-Factor Authentication is enabled.\n\nClick OK to disable 2FA (not recommended).")) {
      updateMe({ tfaEnabled: false });
      fillProfile();
    }
  } else {
    if (confirm("Enable Two-Factor Authentication?\n\nYou'll use an authenticator app (Google Authenticator, Authy, etc.) to generate codes.\n\nClick OK to enable (demo: instant enable).")) {
      updateMe({ tfaEnabled: true });
      fillProfile();
    }
  }
});

document.getElementById("sellerModeBtn")?.addEventListener("click", () => {
  const user = findMe();
  if (!user) return;
  const nextMode = user.accountMode === "seller" ? "customer" : "seller";
  sellerEditing = nextMode === "seller" && !user.sellerInfo;
  updateMe({ accountMode: nextMode, role: nextMode === "seller" ? "dev" : "customer" });
  fillProfile();
  if (nextMode === "customer" && currentSection === "products") setActiveSection("profile", true);
});

document.getElementById("saveSellerToolsBtn")?.addEventListener("click", () => {
  const portfolioTitle = document.getElementById("sellerPortfolioTitle")?.value || "";
  const portfolioLink = document.getElementById("sellerPortfolioLink")?.value || "";
  const productName = document.getElementById("sellerProductName")?.value || "";
  const announcement = document.getElementById("sellerAnnouncement")?.value || "";
  updateMe({
    accountMode: "seller",
    role: "dev",
    skills: `${portfolioTitle} ${productName}`.trim(),
    portfolio: portfolioLink,
    sellerInfo: {
      portfolioTitle,
      portfolioLink,
      productName,
      announcement
    }
  });
  sellerEditing = false;
  fillProfile();
  alert("Seller info saved and printed in your account section.");
});

document.getElementById("editSellerToolsBtn")?.addEventListener("click", () => {
  sellerEditing = true;
  fillProfile();
});

document.addEventListener("click", (e) => {
  const target = e.target;
  if (!target) return;
  if (target.id === "connectMetaMaskBtn") {
    void (async () => {
      try {
        const w = await window.DEWEB_WALLET.connectMetaMask();
        await window.DEWEB_API.Wallet.link(w);
        await refreshWallet();
        renderSectionContent("wallet");
      } catch (err) {
        alert(err.message);
      }
    })();
    return;
  }
  if (target.id === "connectRoninBtn") {
    void (async () => {
      try {
        const w = await window.DEWEB_WALLET.connectRonin();
        await window.DEWEB_API.Wallet.link(w);
        await refreshWallet();
        renderSectionContent("wallet");
      } catch (err) {
        alert(err.message);
      }
    })();
    return;
  }
  if (target.dataset.unlink) {
    void (async () => {
      if (!confirm(`Disconnect ${target.dataset.unlink}?`)) return;
      try {
        await window.DEWEB_API.Wallet.unlink(target.dataset.unlink);
        await refreshWallet();
        renderSectionContent("wallet");
      } catch (err) {
        alert(err.message);
      }
    })();
    return;
  }
  if (target.id === "getDewebBtn") {
    void (async () => {
      const amount = Number(document.getElementById("dewebTopupAmount")?.value || 0);
      const provider = document.getElementById("dewebTopupProvider")?.value || "";
      if (amount <= 0) return alert("Enter how much DEWEB you want (minimum 1).");
      if (!provider) return alert("Connect MetaMask or Ronin first.");
      try {
        const intent = await window.DEWEB_API.Wallet.topupIntent({ provider, dewebAmount: amount });
        const ok = confirm(
          `${intent.message}\n\nTreasury: ${intent.treasuryAddress}\n\nOpen ${provider} to confirm the transfer?`
        );
        if (!ok) return;
        const txHash = await window.DEWEB_WALLET.sendTopUp(provider, {
          fromAddress: intent.fromAddress,
          treasuryAddress: intent.treasuryAddress,
          valueWei: intent.valueWei
        });
        const result = await window.DEWEB_API.Wallet.topupConfirm({
          txHash,
          provider,
          dewebAmount: amount,
          fromAddress: intent.fromAddress
        });
        await refreshWallet();
        renderSectionContent("wallet");
        alert(`Success! ${result.credited} DEWEB added to your balance.`);
      } catch (err) {
        if (err?.code === 4001 || /user rejected|denied/i.test(String(err.message))) {
          alert("Transaction cancelled in your wallet.");
        } else {
          alert(err.message || "Top-up failed.");
        }
      }
    })();
    return;
  }
  if (target.id === "buyOnSwapBtn") {
    void openSwapSite("buy");
    return;
  }
  if (target.id === "withdrawOnSwapBtn") {
    const amount = document.getElementById("walletWithdrawAmount")?.value || "";
    void openSwapSite("sell", amount);
    return;
  }
  if (target.dataset.sectionJump) {
    setActiveSection(target.dataset.sectionJump, true);
    return;
  }
  if (target.id === "saveSellerProductBtn") {
    void saveSellerProduct();
    return;
  }
  if (target.id === "cancelSellerProductEditBtn") {
    renderSectionContent("products");
    return;
  }
  if (target.dataset.editProduct) {
    const product = getSellerProducts().find(p => p.id === target.dataset.editProduct);
    if (!product) return;
    document.getElementById("sellerProductId").value = product.id;
    document.getElementById("sellerProductTitle").value = product.title || "";
    document.getElementById("sellerProductPrice").value = product.price || "";
    document.getElementById("sellerProductCategory").value = product.category || "Web development";
    document.getElementById("sellerProductDescription").value = product.description || "";
    document.getElementById("productFormTitle").textContent = "Edit Product";
    document.getElementById("saveSellerProductBtn").textContent = "Save Product";
    document.getElementById("cancelSellerProductEditBtn").style.display = "inline-block";
  }
});

// ——— Contact Preferences save handler ———
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "saveContactPrefsBtn") {
    const prefs = {};
    document.querySelectorAll("[data-pref]").forEach(input => {
      prefs[input.dataset.pref] = input.checked;
    });
    updateMe({ contactPrefs: prefs });
    const msg = document.getElementById("prefsSavedMsg");
    if (msg) {
      msg.style.display = "inline";
      setTimeout(() => { msg.style.display = "none"; }, 2000);
    }
  }
});

function applyDashboardI18n() {
  const d = dashDict();
  document.documentElement.lang = currentDashLang;
  document.querySelectorAll(".navbar-dashboard .nav-links a").forEach((link, index) => {
    if (d.nav[index]) link.textContent = d.nav[index];
  });
  const helpSpan = document.querySelector("#helpCenter span");
  if (helpSpan) helpSpan.textContent = d.help;
  const accountBtn = document.getElementById("accountBtn");
  if (accountBtn) accountBtn.textContent = d.account;
  const sidebarTitle = document.querySelector(".sidebar-title");
  if (sidebarTitle) sidebarTitle.textContent = d.settings;
  document.querySelectorAll(".sidebar-link[data-section]").forEach(link => {
    link.textContent = sectionTitle(link.dataset.section);
  });
  const profileTitle = document.querySelector("#section-profile .dashboard-page-title");
  if (profileTitle) profileTitle.textContent = sectionTitle("profile");
  const profileLabels = {
    profileName: d.profile.fullName,
    profileAddress: d.profile.address,
    profileOrganization: d.profile.organization,
    profileEmail: d.profile.email,
    profilePhone: d.profile.phone,
    profileKyc: d.profile.kyc,
    profile2fa: d.profile.tfa,
    profileCurrency: d.profile.currency
  };
  Object.entries(profileLabels).forEach(([valueId, label]) => {
    const row = document.getElementById(valueId)?.closest(".profile-row");
    const labelEl = row?.querySelector(".profile-row__label");
    if (labelEl) labelEl.childNodes[0].textContent = label + " ";
  });
  const accountModeKicker = document.querySelector(".account-mode-card .section-kicker");
  if (accountModeKicker) accountModeKicker.textContent = d.profile.accountMode;
  const accountModeTitle = document.querySelector(".account-mode-card h3");
  if (accountModeTitle) accountModeTitle.textContent = d.profile.customerSeller;
  const accountModeText = document.querySelector(".account-mode-card__head p");
  if (accountModeText) accountModeText.textContent = d.profile.modeText;
  document.getElementById("sellerSavedCard")?.querySelector(".section-kicker") && (document.getElementById("sellerSavedCard").querySelector(".section-kicker").textContent = d.profile.sellerProfile);
  const editSellerBtn = document.getElementById("editSellerToolsBtn");
  if (editSellerBtn) editSellerBtn.textContent = d.profile.edit;
  const saveSellerBtn = document.getElementById("saveSellerToolsBtn");
  if (saveSellerBtn) saveSellerBtn.textContent = d.profile.saveSeller;
  const sellerLabels = document.querySelectorAll("#sellerEditForm label");
  [d.profile.portfolioHeadline, d.profile.portfolioLink, d.profile.productFocus, d.profile.announcement].forEach((text, index) => {
    if (sellerLabels[index]) sellerLabels[index].childNodes[0].textContent = text + " ";
  });
  const profileSave = document.getElementById("profileSaveBtn");
  if (profileSave) profileSave.textContent = d.profile.save;
  const homeLink = document.querySelector(".dashboard-actions--profile a");
  if (homeLink) homeLink.textContent = d.profile.home;
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.textContent = d.profile.logout;
  fillProfile();
  if (currentSection !== "profile") void renderSectionContent(currentSection);
}

async function saveSellerProduct() {
  const API = window.DEWEB_API;
  if (!API?.getToken()) return;
  const id = document.getElementById("sellerProductId")?.value || "";
  const existing = getSellerProducts().find(p => p.id === id);
  const body = {
    id: id || undefined,
    title: document.getElementById("sellerProductTitle")?.value || "Untitled product",
    price: Number(document.getElementById("sellerProductPrice")?.value || 0),
    category: document.getElementById("sellerProductCategory")?.value || "Web development",
    description: document.getElementById("sellerProductDescription")?.value || "",
    views: existing?.views,
    clicks: existing?.clicks,
    comments: existing?.comments,
    reviews: existing?.reviews,
    rating: existing?.rating
  };
  try {
    await API.Products.save(body);
    await refreshSellerProducts();
    await renderSectionContent("products");
  } catch (err) {
    alert(err.message || "Could not save product.");
  }
}

async function boot() {
  const me = await loadCurrentUser();
  const adminNav = document.getElementById("adminNavLink");
  if (adminNav && me?.isAdmin) adminNav.style.display = "";
  if (!me) {
    window.location.href = "account.html";
    return;
  }
  applyDashboardI18n();
  document.getElementById("navAvatar").textContent = getInitials(me.name);
  initSectionFromHash();
  renderLangUI();
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  clearSession();
  window.location.href = "account.html";
});

boot();

// Lang dropdown
const langDD = document.getElementById("langDD");
const langBtn = document.getElementById("langBtn");
const langLabel = document.getElementById("langLabel");
const langMenu = document.getElementById("langMenu");
const LANGS = [{ code: "hy", label: "HY" }, { code: "en", label: "EN" }, { code: "ru", label: "RU" }];

function renderLangUI() {
  const selected = LANGS.find(l => l.code === currentDashLang) || LANGS[1];
  if (langLabel) langLabel.textContent = selected.label;
  if (!langMenu) return;
  langMenu.innerHTML = "";
  LANGS.filter(l => l.code !== currentDashLang).forEach(l => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "lang-dd__item";
    item.textContent = l.label;
    item.onclick = () => {
      currentDashLang = l.code;
      localStorage.setItem(LS_LANG, currentDashLang);
      applyDashboardI18n();
      renderLangUI();
      if (langDD) langDD.classList.remove("open");
    };
    langMenu.appendChild(item);
  });
}
if (langBtn && langDD) {
  langBtn.addEventListener("click", (e) => { e.stopPropagation(); langDD.classList.toggle("open"); });
  document.addEventListener("click", (e) => { if (langDD && !langDD.contains(e.target)) langDD.classList.remove("open"); });
}