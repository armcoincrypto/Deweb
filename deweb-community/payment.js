// payment.js — Pay cart with internal DEWEB coins; top-up via external swap site

const CART_KEY = "deweb_services_cart";
const LS_LANG = "deweb_lang";

const LANGS = [
  { code: "hy", label: "HY" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" }
];

let currentLang = localStorage.getItem(LS_LANG) || "en";
let cart = [];
let cryptoConfig = null;
let walletBalance = 0;

const I18N = {
  en: {
    payTitle: "Pay with DEWEB",
    payWithDeweb: "Pay with DEWEB",
    topUp: "Buy crypto / Get DEWEB coins",
    orderSummary: "Order summary",
    items: "items",
    balance: "Your DEWEB balance",
    balanceHint: "Top up on the swap site, then pay here with DEWEB.",
    successSent: "Order paid with DEWEB. Thank you!",
    backToDeweb: "← Back to DEWEB",
    cart: "Cart",
    signInRequired: "Sign in to pay with DEWEB."
  },
  ru: {
    payTitle: "Оплата DEWEB",
    payWithDeweb: "Оплатить DEWEB",
    topUp: "Купить крипто / Получить DEWEB",
    orderSummary: "Заказ",
    items: "товаров",
    balance: "Баланс DEWEB",
    balanceHint: "Пополните на swap-сайте, затем оплатите DEWEB.",
    successSent: "Заказ оплачен DEWEB. Спасибо!",
    backToDeweb: "← Назад в DEWEB",
    cart: "Корзина",
    signInRequired: "Войдите, чтобы оплатить DEWEB."
  },
  hy: {
    payTitle: "Վճարել DEWEB-ով",
    payWithDeweb: "Վճարել DEWEB-ով",
    topUp: "Գնել կրիպտո / Ստանալ DEWEB",
    orderSummary: "Պատվեր",
    items: "ապրանք",
    balance: "DEWEB մնացորդ",
    balanceHint: "Լիցքավորեք swap կայքում, ապա վճարեք DEWEB-ով։",
    successSent: "Պատվերը վճարված է DEWEB-ով։ Շնորհակալություն։",
    backToDeweb: "← Հետ DEWEB",
    cart: "Զամբյուղ",
    signInRequired: "Մուտք գործեք DEWEB վճարման համար։"
  }
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function loadCart() {
  try {
    cart = JSON.parse(sessionStorage.getItem(CART_KEY) || "[]");
  } catch {
    cart = [];
  }
}

function cartTotalDeweb() {
  let total = 0;
  const promo = sessionStorage.getItem("deweb_promo");
  if (promo === "HAYUGEN") return 355;
  cart.forEach((it) => {
    const m = String(it.price || "").replace(/,/g, "").match(/[\d.]+/);
    total += (m ? Number(m[0]) : 0) * Number(it.qty || 1);
  });
  return Math.ceil(total);
}

async function loadCryptoConfig() {
  try {
    cryptoConfig = await window.DEWEB_API.Crypto.config();
  } catch {
    cryptoConfig = null;
  }
}

async function loadBalance() {
  if (!window.DEWEB_API?.isLoggedIn()) {
    walletBalance = 0;
    return;
  }
  try {
    const data = await window.DEWEB_API.Wallet.get();
    walletBalance = Number(data.wallet?.deweb || 0);
  } catch {
    walletBalance = 0;
  }
}

function applyI18n() {
  document.getElementById("paymentTitle").textContent = t("payTitle");
  document.getElementById("payWithDewebBtn").textContent = t("payWithDeweb");
  document.getElementById("topUpSwapBtn").textContent = t("topUp");
  document.getElementById("backToDeweb").textContent = t("backToDeweb");
  document.getElementById("backToCart").textContent = t("cart");
  document.querySelector("#balanceBox .wallet-balance-card__label").textContent = t("balance");
  document.getElementById("balanceHint").textContent = t("balanceHint");
}

function renderSummary() {
  const el = document.getElementById("paymentSummary");
  const total = cartTotalDeweb();
  el.innerHTML = `<p class="sub">${t("orderSummary")}: ${cart.length} ${t("items")} — <strong>${total} DEWEB</strong></p>`;
  document.getElementById("dewebBalance").textContent = walletBalance.toLocaleString() + " DEWEB";
  const need = cartTotalDeweb();
  document.getElementById("insufficientHint").style.display = walletBalance < need ? "block" : "none";
}

async function openSwapLink(mode) {
  if (!window.DEWEB_API?.isLoggedIn()) {
    alert(t("signInRequired"));
    window.location.href = "account.html";
    return;
  }
  try {
    const amount = mode === "buy" ? "" : String(document.getElementById("withdrawAmount")?.value || "");
    const data = await window.DEWEB_API.Crypto.swapLink(mode, { amount, coin: "USDT" });
    window.open(data.url, "_blank", "noopener");
  } catch (err) {
    const fallback = mode === "buy" ? cryptoConfig?.swapBuyUrl : cryptoConfig?.swapSellUrl;
    if (fallback) window.open(fallback, "_blank", "noopener");
    else alert(err.message || "Swap site URL not configured yet.");
  }
}

document.getElementById("topUpSwapBtn")?.addEventListener("click", () => openSwapLink("buy"));

document.getElementById("payWithDewebBtn")?.addEventListener("click", async () => {
  if (!window.DEWEB_API?.isLoggedIn()) {
    alert(t("signInRequired"));
    window.location.href = "account.html";
    return;
  }
  const total = cartTotalDeweb();
  if (walletBalance < total) {
    document.getElementById("insufficientHint").style.display = "block";
    if (confirm("Not enough DEWEB. Open swap site to top up?")) openSwapLink("buy");
    return;
  }
  try {
    const data = await window.DEWEB_API.Checkout.pay({
      items: cart,
      paymentMethod: "deweb",
      promoCode: sessionStorage.getItem("deweb_promo") || ""
    });
    alert(data.message || t("successSent"));
    sessionStorage.removeItem(CART_KEY);
    sessionStorage.removeItem("deweb_promo");
    window.location.href = "account-dashboard.html#order-history";
  } catch (err) {
    if (err.message?.includes("Not enough") || err.message?.includes("402")) {
      if (confirm("Not enough DEWEB. Open swap site to top up?")) openSwapLink("buy");
    } else {
      alert(err.message || "Payment failed.");
    }
  }
});

const langDD = document.getElementById("langDD");
const langBtn = document.getElementById("langBtn");
const langLabel = document.getElementById("langLabel");
const langMenu = document.getElementById("langMenu");

function renderLangUI() {
  const selected = LANGS.find((l) => l.code === currentLang) || LANGS[1];
  if (langLabel) langLabel.textContent = selected.label;
  if (!langMenu) return;
  langMenu.innerHTML = "";
  LANGS.filter((l) => l.code !== currentLang).forEach((l) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "lang-dd__item";
    item.textContent = l.label;
    item.onclick = () => {
      currentLang = l.code;
      localStorage.setItem(LS_LANG, currentLang);
      applyI18n();
      renderSummary();
      renderLangUI();
      if (langDD) langDD.classList.remove("open");
    };
    langMenu.appendChild(item);
  });
}

if (langBtn && langDD) {
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langDD.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (langDD && !langDD.contains(e.target)) langDD.classList.remove("open");
  });
}

loadCart();
if (cart.length === 0) {
  window.location.href = "cart.html";
} else {
  void (async () => {
    await loadCryptoConfig();
    await loadBalance();
    renderLangUI();
    applyI18n();
    renderSummary();
  })();
}
