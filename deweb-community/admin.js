(function () {
  const gate = document.getElementById("adminGate");
  const app = document.getElementById("adminApp");
  let selectedThreadId = null;

  async function init() {
    if (!window.DEWEB_API?.isLoggedIn?.()) {
      gate.textContent = "Please log in with an admin account.";
      return;
    }
    try {
      const { user } = await DEWEB_API.Auth.me();
      if (!user?.isAdmin) {
        gate.textContent = "Access denied. This page is for DEWEB admins only.";
        return;
      }
      gate.style.display = "none";
      app.style.display = "block";
      bindTabs();
      await loadStats();
      await loadSupport();
      await loadUsers();
      await loadOrders();
    } catch (e) {
      gate.textContent = e.message || "Could not load admin.";
    }
  }

  function bindTabs() {
    document.querySelectorAll(".admin-tabs button").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".admin-tabs button").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".admin-panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
      });
    });
    document.getElementById("refreshStatsBtn")?.addEventListener("click", loadStats);
    document.getElementById("creditBtn")?.addEventListener("click", creditUser);
    document.getElementById("supportReplyBtn")?.addEventListener("click", replySupport);
    document.getElementById("userSearch")?.addEventListener("input", debounce(loadUsers, 300));
  }

  function debounce(fn, ms) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  async function loadStats() {
    const s = await DEWEB_API.Admin.stats();
    document.getElementById("adminStats").innerHTML = [
      stat("Treasury DEWEB", formatNum(s.adminBalance)),
      stat("USD equivalent", "$" + formatNum(s.adminBalance * (s.dewebUsdRate || 1))),
      stat("Users", s.users),
      stat("Orders", s.orders),
      stat("Open support", s.openSupport)
    ].join("");
  }

  function stat(label, value) {
    return `<div class="admin-stat"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function formatNum(n) {
    return Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  async function loadUsers() {
    const q = document.getElementById("userSearch")?.value || "";
    const { users } = await DEWEB_API.Admin.users(q);
    document.getElementById("usersTable").innerHTML = users
      .map(
        (u) =>
          `<tr><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.role)}</td><td>${formatNum(u.dewebBalance)}</td></tr>`
      )
      .join("");
  }

  async function loadOrders() {
    const { orders } = await DEWEB_API.Admin.orders();
    document.getElementById("ordersTable").innerHTML = orders
      .slice(0, 50)
      .map(
        (o) =>
          `<tr><td>${escapeHtml(String(o.id).slice(0, 12))}…</td><td>${escapeHtml(o.status || "—")}</td><td>${formatNum(o.total)}</td></tr>`
      )
      .join("");
  }

  async function loadSupport() {
    const { threads } = await DEWEB_API.Admin.supportThreads();
    const list = document.getElementById("supportThreadList");
    list.innerHTML = threads
      .map((t) => {
        const pending = t.status === "human_pending";
        return `<div class="support-thread ${pending ? "pending" : ""}" data-id="${t.id}">
          <strong>${escapeHtml(t.email || t.guest_key || "Guest")}</strong>
          <span style="opacity:0.7"> — ${escapeHtml(t.status)}</span>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">${escapeHtml((t.last_message || "").slice(0, 80))}</div>
        </div>`;
      })
      .join("");
    list.querySelectorAll(".support-thread").forEach((el) => {
      el.addEventListener("click", () => openThread(el.dataset.id));
    });
  }

  async function openThread(id) {
    selectedThreadId = id;
    document.getElementById("supportThreadDetail").style.display = "block";
    const data = await DEWEB_API.Admin.supportMessages(id);
    document.getElementById("supportThreadTitle").textContent =
      (data.user?.email || "Guest") + " — " + data.thread.status;
    document.getElementById("supportChat").innerHTML = data.messages
      .map(
        (m) =>
          `<div class="deweb-support-msg ${m.sender}"><strong>${m.sender}:</strong> ${escapeHtml(m.body)}</div>`
      )
      .join("");
  }

  async function replySupport() {
    const text = document.getElementById("supportReplyInput").value.trim();
    if (!text || !selectedThreadId) return;
    await DEWEB_API.Admin.supportReply(selectedThreadId, text);
    document.getElementById("supportReplyInput").value = "";
    await openThread(selectedThreadId);
    await loadSupport();
  }

  async function creditUser() {
    const userId = document.getElementById("creditUserId").value.trim();
    const amount = Number(document.getElementById("creditAmount").value);
    if (!userId || amount <= 0) return alert("Enter user ID and amount.");
    try {
      const r = await DEWEB_API.Admin.creditUser(userId, amount);
      alert("Credited. User balance: " + formatNum(r.userBalance));
      await loadStats();
      await loadUsers();
    } catch (e) {
      alert(e.message);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  init();
})();
