import { Link } from "@/i18n/routing";

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-white/40">404</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-white/55">
        The page you requested does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-deweb-cyan px-8 py-3 text-sm font-bold text-deweb-bg"
      >
        Go to homepage
      </Link>
    </div>
  );
}
