"use client";

import { useEffect } from "react";

const RELOAD_KEY = "deweb_chunk_reload";

/** One-time hard reload when a stale JS chunk fails after deploy (ChunkLoadError). */
export function ChunkLoadRecovery() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const message = event.message ?? "";
      const isChunkError =
        message.includes("Loading chunk") ||
        message.includes("ChunkLoadError") ||
        message.includes("Failed to fetch dynamically imported module");

      if (!isChunkError || sessionStorage.getItem(RELOAD_KEY)) return;

      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    };

    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);

  return null;
}
