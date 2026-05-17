// account.js — Sign in / sign up via DEWEB API

const LS_LANG = "deweb_lang";
const API = () => window.DEWEB_API;

const LANGS = [{ code: "hy", label: "HY" }, { code: "en", label: "EN" }, { code: "ru", label: "RU" }];
let currentLang = localStorage.getItem(LS_LANG) || "en";

const I18N = {
  en: { signin: "Sign In", signup: "Sign Up" },
  ru: { signin: "Вход", signup: "Регистрация" },
  hy: { signin: "Մուտք", signup: "Գրանցում" }
};
function t(key) { return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key; }

function goToDashboard() {
  window.location.href = "account-dashboard.html";
}

function isLoggedIn() {
  return Boolean(API()?.getToken());
}

const panels = document.querySelectorAll(".account-page__panel");
const heroSignIn = document.getElementById("heroSignIn");
const heroSignUp = document.getElementById("heroSignUp");
const accountFormTitle = document.getElementById("accountFormTitle");

function setPanel(name) {
  panels.forEach(p => {
    const on = p.dataset.panel === name;
    p.classList.toggle("active", on);
    p.hidden = !on;
  });
  if (accountFormTitle) accountFormTitle.textContent = name === "signup" ? t("signup") : t("signin");
  if (heroSignIn) heroSignIn.style.display = name === "signin" ? "block" : "none";
  if (heroSignUp) heroSignUp.style.display = name === "signup" ? "block" : "none";
}

document.getElementById("goSignUp")?.addEventListener("click", () => setPanel("signup"));
document.getElementById("goSignIn")?.addEventListener("click", () => setPanel("signin"));

document.getElementById("signInBtn")?.addEventListener("click", async () => {
  const username = (document.getElementById("siUsername")?.value || "").trim();
  const pass = document.getElementById("siPass")?.value || "";
  if (!username || !pass) return alert("Enter username/email and password.");

  try {
    const data = await API().Auth.login({ username, password: pass });
    API().setToken(data.token);
    goToDashboard();
  } catch (err) {
    alert(err.message || "Login failed. Is the backend running on port 3000?");
  }
});

document.getElementById("signUpBtn")?.addEventListener("click", async () => {
  const username = (document.getElementById("suUsername")?.value || "").trim();
  const email = (document.getElementById("suEmail")?.value || "").trim().toLowerCase();
  const pass = document.getElementById("suPass")?.value || "";
  const newsletter = document.getElementById("suNewsletter")?.checked || false;

  if (!username || !email || !pass) return alert("Fill required fields.");

  try {
    const data = await API().Auth.register({ username, email, password: pass, newsletter });
    API().setToken(data.token);
    goToDashboard();
  } catch (err) {
    alert(err.message || "Registration failed.");
  }
});

const langDD = document.getElementById("langDD");
const langBtn = document.getElementById("langBtn");
const langLabel = document.getElementById("langLabel");
const langMenu = document.getElementById("langMenu");

function renderLangUI() {
  const selected = LANGS.find(l => l.code === currentLang) || LANGS[1];
  if (langLabel) langLabel.textContent = selected.label;
  if (!langMenu) return;
  langMenu.innerHTML = "";
  LANGS.filter(l => l.code !== currentLang).forEach(l => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "lang-dd__item";
    item.textContent = l.label;
    item.onclick = () => {
      currentLang = l.code;
      localStorage.setItem(LS_LANG, currentLang);
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

document.getElementById("toggleSiPass")?.addEventListener("click", () => {
  const el = document.getElementById("siPass");
  if (el) el.type = el.type === "password" ? "text" : "password";
});
document.getElementById("toggleSuPass")?.addEventListener("click", () => {
  const el = document.getElementById("suPass");
  if (el) el.type = el.type === "password" ? "text" : "password";
});

document.getElementById("forgotPass")?.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Password reset will be available soon.");
});

async function tryAdminAutoLogin() {
  const API = window.DEWEB_API;
  if (!API || isLoggedIn()) return false;
  try {
    const cfg = await API.Setup.config();
    const siUser = document.getElementById("siUsername");
    const siPass = document.getElementById("siPass");
    if (siUser && cfg.adminEmail) siUser.value = cfg.adminEmail;
    if (siPass && cfg.adminAutoLogin) siPass.placeholder = "Auto sign-in from .env…";

    if (!cfg.adminAutoLogin) {
      renderLangUI();
      return false;
    }

    const data = await API.Auth.autoAdmin();
    API.setToken(data.token);
    window.location.href = data.redirect || (data.user?.isAdmin ? "admin.html" : "account-dashboard.html");
    return true;
  } catch (err) {
    console.warn("[DEWEB] Admin auto-login:", err.message);
    renderLangUI();
    return false;
  }
}

(async function boot() {
  if (isLoggedIn()) {
    try {
      const { user } = await API().Auth.me();
      window.location.href = user?.isAdmin ? "admin.html" : "account-dashboard.html";
    } catch {
      goToDashboard();
    }
    return;
  }
  const auto = await tryAdminAutoLogin();
  if (!auto) renderLangUI();
})();
