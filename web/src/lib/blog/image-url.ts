const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? "/api" : "http://127.0.0.1:3000/api");

/** Resolve featured image path from API uploads to a browser URL. */
export function resolveBlogImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/api/")) {
    const base = API_BASE.replace(/\/api\/?$/, "");
    return `${base}${path}`;
  }
  return path;
}
