import { Router } from "express";

const router = Router();

const PROMPT = "Write a 100 word article about Shopify development.";

router.get("/", async (_req, res) => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({
      ok: false,
      error: "OPENAI_API_KEY is not configured. Add it to backend .env",
    });
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: PROMPT }],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return res.status(502).json({
        ok: false,
        error: `OpenAI API error (${response.status})`,
        detail: detail.slice(0, 300),
      });
    }

    const data = await response.json();
    const article = data.choices?.[0]?.message?.content?.trim();

    if (!article) {
      return res.status(502).json({
        ok: false,
        error: "OpenAI returned an empty response.",
      });
    }

    res.json({
      ok: true,
      prompt: PROMPT,
      model,
      article,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : "Request failed.",
    });
  }
});

export default router;
