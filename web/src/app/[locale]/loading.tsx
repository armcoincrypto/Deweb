export default function Loading() {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4"
      role="status"
      aria-label="Loading"
    >
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-deweb-cyan/30 border-t-deweb-cyan" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-deweb-cyan/10" />
      </div>
      <p className="text-sm text-white/40">Loading…</p>
    </div>
  );
}
