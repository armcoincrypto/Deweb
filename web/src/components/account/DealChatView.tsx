"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { dewebApi, type DealChatSummary, type DealMessage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { GlassCard } from "@/components/ui/GlassCard";

export function DealChatView() {
  const t = useTranslations("account");
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [chats, setChats] = useState<DealChatSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(searchParams.get("chat"));
  const [messages, setMessages] = useState<DealMessage[]>([]);
  const [text, setText] = useState("");
  const [warn, setWarn] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadChats = useCallback(() => {
    dewebApi.dealChat.mine().then((d) => setChats(d.chats || []));
  }, []);

  const loadMessages = useCallback((id: string) => {
    dewebApi.dealChat.messages(id).then((d) => setMessages(d.messages || []));
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    if (activeId) loadMessages(activeId);
  }, [activeId, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!activeId || !text.trim()) return;
    setWarn("");
    const r = await dewebApi.dealChat.send(activeId, text.trim());
    setText("");
    if (r.warning) setWarn(r.warning);
    loadMessages(activeId);
  }

  async function sendFile(file: File) {
    if (!activeId) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataBase64 = reader.result as string;
      await dewebApi.dealChat.attach(activeId, {
        filename: file.name,
        dataBase64,
        note: t("fileShared"),
      });
      loadMessages(activeId);
      setWarn(t("fileEmailed"));
    };
    reader.readAsDataURL(file);
  }

  const active = chats.find((c) => c.id === activeId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{t("projectChat")}</h1>
      <p className="mt-2 text-white/50">{t("chatSubtitle")}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-1">
          {chats.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`w-full rounded-xl border p-4 text-left text-sm ${
                activeId === c.id
                  ? "border-deweb-cyan/50 bg-deweb-cyan/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <p className="font-bold text-white">{c.listingTitle}</p>
              <p className="text-white/45">{c.partnerName}</p>
            </button>
          ))}
          {chats.length === 0 && <p className="text-white/40 text-sm">{t("noChats")}</p>}
        </div>

        <GlassCard className="lg:col-span-2 flex flex-col min-h-[420px] p-4">
          {active ? (
            <>
              <p className="text-sm font-bold text-deweb-cyan border-b border-white/10 pb-3">
                {active.listingTitle} — {active.partnerName}
              </p>
              <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-[320px]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${
                      m.senderId === user?.id
                        ? "ml-auto bg-deweb-cyan/20 text-white"
                        : "bg-white/10 text-white/85"
                    }`}
                  >
                    {m.body}
                    {m.moderated && (
                      <span className="block text-[10px] text-amber-400 mt-1">{t("moderated")}</span>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              {warn && <p className="text-xs text-amber-400 mb-2">{warn}</p>}
              <div className="flex gap-2 border-t border-white/10 pt-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder={t("typeMessage")}
                  className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white text-sm"
                />
                <label className="cursor-pointer rounded-xl border border-white/15 px-3 py-2 text-xs text-white/60">
                  📎
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && sendFile(e.target.files[0])}
                  />
                </label>
                <button
                  type="button"
                  onClick={send}
                  className="rounded-full bg-deweb-cyan px-4 py-2 text-xs font-bold text-deweb-bg"
                >
                  {t("send")}
                </button>
              </div>
            </>
          ) : (
            <p className="text-white/45 m-auto">{t("selectChat")}</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
