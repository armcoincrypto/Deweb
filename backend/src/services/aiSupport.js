const FAQ = [
  {
    keys: ["deweb", "coin", "balance", "top up", "buy"],
    answer:
      "DEWEB is our internal coin (1 DEWEB = 1 USD). Top up via Wallet → Open swap site, or send crypto to our treasury addresses. After confirmation, DEWEB is added to your account."
  },
  {
    keys: ["withdraw", "sell", "cash out"],
    answer:
      "Sellers can withdraw DEWEB to crypto from Wallet → Open swap site — Withdraw. Complete the flow on our partner swap site."
  },
  {
    keys: ["seller", "sell", "product", "marketplace"],
    answer:
      "Switch to Seller in My Profile, save seller info, then use My Products to list items. Buyers pay you in DEWEB coins."
  },
  {
    keys: ["order", "inquiry", "project"],
    answer:
      "Use the Order slide on the home page to send a custom inquiry, or browse Services / Marketplace to buy with DEWEB."
  },
  {
    keys: ["metamask", "ronin", "wallet", "connect"],
    answer:
      "Go to Account → Wallet and click Connect MetaMask or Connect Ronin. This links your address; DEWEB balance is separate and topped up via crypto or the swap site."
  },
  {
    keys: ["human", "agent", "person", "support", "help me"],
    answer: null
  }
];

export function wantsHumanAgent(text) {
  const t = String(text || "").toLowerCase();
  return /\b(human|agent|person|real person|operator|live support|talk to someone)\b/.test(t)
    || t.includes("speak to human")
    || t.includes("need human");
}

export async function generateAiReply(userMessage) {
  const text = String(userMessage || "").trim();
  if (!text) return "How can I help you today?";

  if (wantsHumanAgent(text)) {
    return null;
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are DEWEB support assistant. DEWEB uses internal DEWEB coins (1 DEWEB = 1 USD). Payments are crypto-only. Be brief and helpful. If user needs a human, tell them to type 'talk to human agent'."
            },
            { role: "user", content: text }
          ],
          max_tokens: 300
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) return reply;
    } catch {
      // fallback below
    }
  }

  const lower = text.toLowerCase();
  for (const item of FAQ) {
    if (item.keys.some((k) => lower.includes(k)) && item.answer) {
      return item.answer;
    }
  }

  return (
    "Thanks for your message. DEWEB is crypto-only: use Wallet to top up DEWEB (1 coin = 1 USD), pay sellers with DEWEB, and use the swap site to withdraw. " +
    "Type **talk to a human agent** if you need our team."
  );
}
