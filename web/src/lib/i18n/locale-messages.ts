import type { Locale } from "@/i18n/routing";

type MessagePack = Record<string, unknown>;

const cache = new Map<Locale, MessagePack>();

export async function getMessages(locale: Locale): Promise<MessagePack> {
  if (cache.has(locale)) return cache.get(locale)!;
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  cache.set(locale, messages);
  return messages;
}

export function getNested(messages: MessagePack, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = messages;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}
