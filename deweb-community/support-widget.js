(function () {
  const GUEST_KEY = "deweb_support_guest";
  const API_BASE =
    window.DEWEB_API_URL ||
    (["localhost", "127.0.0.1"].includes(location.hostname)
      ? "http://localhost:3000/api"
      : "/api");

  function getGuestKey() {
    let k = localStorage.getItem(GUEST_KEY);
    if (!k) {
      k = "guest-" + Math.random().toString(36).slice(2, 12);
      localStorage.setItem(GUEST_KEY, k);
    }
    return k;
  }

  function headers() {
    const h = { "Content-Type": "application/json", "X-Support-Guest": getGuestKey() };
    const token = window.DEWEB_API?.getToken?.();
    if (token) h.Authorization = "Bearer " + token;
    return h;
  }

  async function supportApi(path, options = {}) {
    const res = await fetch(API_BASE + path, {
      ...options,
      headers: { ...headers(), ...(options.headers || {}) }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Support request failed");
    return data;
  }

  const fab = document.createElement("button");
  fab.className = "deweb-support-fab";
  fab.type = "button";
  fab.title = "Support";
  fab.setAttribute("aria-label", "Open support chat");
  fab.textContent = "\u{1F4AC}";

  const panel = document.createElement("div");
  panel.className = "deweb-support-panel";
  panel.innerHTML = [
    '<div class="deweb-support-header">',
    "<h3>DEWEB Support</h3>",
    '<button type="button" class="deweb-support-close" aria-label="Close">\u00d7</button>',
    "</div>",
    '<div id="dewebSupportMessages" class="deweb-support-messages"></div>',
    '<div class="deweb-support-footer">',
    '<textarea id="dewebSupportInput" placeholder="Ask about DEWEB coins, wallet, orders\u2026" rows="2"></textarea>',
    '<div class="deweb-support-actions">',
    '<button type="button" class="deweb-support-human" id="dewebSupportHuman">Human agent</button>',
    '<button type="button" class="deweb-support-send" id="dewebSupportSend">Send</button>',
    "</div></div>"
  ].join("");

  const messagesEl = panel.querySelector("#dewebSupportMessages");
  const inputEl = panel.querySelector("#dewebSupportInput");

  function renderMessages(list) {
    messagesEl.innerHTML = "";
    const items =
      list && list.length
        ? list
        : [
            {
              sender: "ai",
              body:
                "Hi! I'm the DEWEB assistant. DEWEB coins are 1:1 with USD. Ask about wallet top-up, sellers, or orders. Tap Human agent for our team."
            }
          ];
    for (const m of items) {
      const el = document.createElement("div");
      el.className =
        "deweb-support-msg " +
        (m.sender === "user" ? "user" : m.sender === "admin" ? "admin" : "ai");
      el.textContent = m.body;
      messagesEl.appendChild(el);
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function loadThread() {
    try {
      const data = await supportApi("/support/thread");
      if (data.thread?.guestKey) localStorage.setItem(GUEST_KEY, data.thread.guestKey);
      renderMessages(data.messages);
    } catch {
      renderMessages([]);
    }
  }

  async function sendMessage(escalate) {
    const text = inputEl.value.trim();
    if (!text && !escalate) return;
    inputEl.value = "";
    try {
      await supportApi("/support/message", {
        method: "POST",
        body: JSON.stringify({
          message: text || "I need to speak with a human agent.",
          escalate: Boolean(escalate)
        })
      });
      const existing = await supportApi("/support/thread");
      renderMessages(existing.messages);
    } catch (err) {
      alert(err.message || "Could not send message");
    }
  }

  fab.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) loadThread();
  });
  panel.querySelector(".deweb-support-close").addEventListener("click", () => {
    panel.classList.remove("open");
  });
  panel.querySelector("#dewebSupportSend").addEventListener("click", () => sendMessage(false));
  panel.querySelector("#dewebSupportHuman").addEventListener("click", () => sendMessage(true));
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(false);
    }
  });

  document.getElementById("helpCenter")?.addEventListener("click", (e) => {
    e.preventDefault();
    panel.classList.add("open");
    loadThread();
  });

  document.body.appendChild(fab);
  document.body.appendChild(panel);
})();
