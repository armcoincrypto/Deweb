(function () {
  const STORAGE_KEY = "deweb_cookie_consent";
  const VALID = ["required", "all"];

  function getConsent() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function setConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);
  }

  function wrapSiteContent() {
    if (document.querySelector(".deweb-site-content")) return;
    const wrap = document.createElement("div");
    wrap.className = "deweb-site-content";
    while (document.body.firstChild) {
      wrap.appendChild(document.body.firstChild);
    }
    document.body.appendChild(wrap);
  }

  function injectFooter() {
    if (document.querySelector(".deweb-site-footer")) return;
    const footer = document.createElement("footer");
    footer.className = "deweb-site-footer";
    footer.innerHTML =
      '<a href="privacy-policy.html">Privacy Policy</a>' +
      '<a href="privacy-policy.html#terms">Terms of Use</a>' +
      '<a href="privacy-policy.html#cookies">Cookie Policy</a>' +
      '<span style="opacity:0.5"> · </span>© DEWEB';
    const content = document.querySelector(".deweb-site-content");
    if (content) content.appendChild(footer);
    else document.body.appendChild(footer);
  }

  function showDeclineBlock() {
    document.body.classList.remove("deweb-cookies-pending");
    document.body.classList.add("deweb-cookies-declined");
    if (document.getElementById("dewebCookieBlock")) return;
    const block = document.createElement("div");
    block.id = "dewebCookieBlock";
    block.className = "deweb-cookie-block";
    block.innerHTML =
      '<div class="deweb-cookie-block__box">' +
      "<h2>Cookies required</h2>" +
      "<p>DEWEB uses essential cookies to keep you signed in, protect your account, and run payments securely. " +
      "Without accepting required cookies, this site cannot be used.</p>" +
      '<button type="button" class="deweb-cookie-btn deweb-cookie-btn--primary" id="dewebCookieRetry">Accept required cookies</button>' +
      "</div>";
    document.body.appendChild(block);
    document.getElementById("dewebCookieRetry").addEventListener("click", () => {
      setConsent("required");
      block.remove();
      document.body.classList.remove("deweb-cookies-declined");
      location.reload();
    });
  }

  function hideBanner() {
    const b = document.getElementById("dewebCookieBanner");
    if (b) b.remove();
    document.body.classList.remove("deweb-cookies-pending");
  }

  function showBanner() {
    if (document.getElementById("dewebCookieBanner")) return;
    document.body.classList.add("deweb-cookies-pending");

    const banner = document.createElement("div");
    banner.id = "dewebCookieBanner";
    banner.className = "deweb-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<div class="deweb-cookie-banner__inner">' +
      "<h3>We value your privacy</h3>" +
      "<p>DEWEB uses <strong>required cookies</strong> for security, login, and core features. " +
      "Optional cookies help us improve the experience. Read our " +
      '<a href="privacy-policy.html">Privacy Policy</a> and ' +
      '<a href="privacy-policy.html#cookies">Cookie Policy</a>.</p>' +
      '<div class="deweb-cookie-banner__actions">' +
      '<button type="button" class="deweb-cookie-btn deweb-cookie-btn--primary" id="dewebAcceptRequired">Accept required cookies</button>' +
      '<button type="button" class="deweb-cookie-btn deweb-cookie-btn--secondary" id="dewebAcceptAll">Accept all cookies</button>' +
      '<button type="button" class="deweb-cookie-btn deweb-cookie-btn--decline" id="dewebDecline">Decline</button>' +
      "</div></div>";

    document.body.appendChild(banner);

    document.getElementById("dewebAcceptRequired").addEventListener("click", () => {
      setConsent("required");
      hideBanner();
    });
    document.getElementById("dewebAcceptAll").addEventListener("click", () => {
      setConsent("all");
      hideBanner();
    });
    document.getElementById("dewebDecline").addEventListener("click", () => {
      setConsent("declined");
      hideBanner();
      showDeclineBlock();
    });
  }

  function init() {
    wrapSiteContent();
    injectFooter();

    const consent = getConsent();
    if (consent === "declined") {
      showDeclineBlock();
      return;
    }
    if (VALID.includes(consent)) {
      return;
    }
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.DEWEB_COOKIES = { getConsent, setConsent };
})();
