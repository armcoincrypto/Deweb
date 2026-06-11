"use client";

import { useEffect, useState } from "react";
import { dewebApi } from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import type { BlogPostListItem } from "@/lib/api";

type PublishOption = "default" | "custom" | "immediate";

type ApproveScheduleModalProps = {
  open: boolean;
  post: BlogPostListItem | null;
  loading: boolean;
  onConfirm: (opts: {
    publishMode: "scheduled" | "immediate";
    scheduledPublishAt?: string;
  }) => void;
  onCancel: () => void;
};

function formatSlot(iso: string, timezone: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleString();
  }
}

export function ApproveScheduleModal({
  open,
  post,
  loading,
  onConfirm,
  onCancel,
}: ApproveScheduleModalProps) {
  const [option, setOption] = useState<PublishOption>("default");
  const [customAt, setCustomAt] = useState("");
  const [nextSlot, setNextSlot] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("Asia/Yerevan");

  useEffect(() => {
    if (!open) return;
    setOption("default");
    setCustomAt("");
    dewebApi.admin.blog
      .scheduleConfig()
      .then((cfg) => {
        setNextSlot(cfg.nextPublishSlot);
        setTimezone(cfg.timezone);
      })
      .catch(() => setNextSlot(null));
  }, [open]);

  if (!open || !post) return null;

  function handleConfirm() {
    if (option === "immediate") {
      onConfirm({ publishMode: "immediate" });
      return;
    }
    if (option === "custom") {
      if (!customAt) return;
      onConfirm({
        publishMode: "scheduled",
        scheduledPublishAt: new Date(customAt).toISOString(),
      });
      return;
    }
    onConfirm({ publishMode: "scheduled" });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <GlassCard className="w-full max-w-lg p-6">
        <h3 className="text-xl font-bold text-white">Approve & schedule</h3>
        <p className="mt-2 text-sm text-white/55">
          <span className="text-white">{post.title}</span> will not go live until the chosen
          publish time (unless you publish immediately).
        </p>

        <div className="mt-6 space-y-3">
          <label className="flex cursor-pointer gap-3 rounded-xl border border-white/10 p-4 hover:border-deweb-cyan/30">
            <input
              type="radio"
              name="publish-option"
              checked={option === "default"}
              onChange={() => setOption("default")}
              className="mt-1 accent-deweb-cyan"
            />
            <span>
              <span className="font-semibold text-white">Default — next 18:00 ({timezone})</span>
              {nextSlot && (
                <span className="mt-1 block text-sm text-deweb-cyan">
                  {formatSlot(nextSlot, timezone)}
                </span>
              )}
              <span className="mt-1 block text-xs text-white/40">Recommended for daily blog rhythm</span>
            </span>
          </label>

          <label className="flex cursor-pointer gap-3 rounded-xl border border-white/10 p-4 hover:border-deweb-cyan/30">
            <input
              type="radio"
              name="publish-option"
              checked={option === "custom"}
              onChange={() => setOption("custom")}
              className="mt-1 accent-deweb-cyan"
            />
            <span className="flex-1">
              <span className="font-semibold text-white">Custom date & time</span>
              <input
                type="datetime-local"
                value={customAt}
                onChange={(e) => setCustomAt(e.target.value)}
                disabled={option !== "custom"}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white disabled:opacity-40"
              />
            </span>
          </label>

          <label className="flex cursor-pointer gap-3 rounded-xl border border-white/10 p-4 hover:border-deweb-cyan/30">
            <input
              type="radio"
              name="publish-option"
              checked={option === "immediate"}
              onChange={() => setOption("immediate")}
              className="mt-1 accent-deweb-cyan"
            />
            <span>
              <span className="font-semibold text-white">Publish immediately</span>
              <span className="mt-1 block text-xs text-white/40">
                Goes live on /blog right after approval
              </span>
            </span>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading || (option === "custom" && !customAt)}
            className="rounded-full bg-deweb-cyan px-5 py-2.5 text-sm font-bold text-deweb-bg disabled:opacity-50"
          >
            {loading ? "Saving…" : option === "immediate" ? "Approve & publish" : "Approve & schedule"}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
