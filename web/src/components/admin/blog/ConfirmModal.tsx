"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <GlassCard className="w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm text-white/60">{message}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-white/30"
          >
            {cancelLabel}
          </button>
          {variant === "danger" ? (
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/20 disabled:opacity-50"
            >
              {loading ? "Working…" : confirmLabel}
            </button>
          ) : (
            <GlowButton onClick={onConfirm}>{loading ? "Working…" : confirmLabel}</GlowButton>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
