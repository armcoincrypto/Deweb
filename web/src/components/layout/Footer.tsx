import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/40 py-12">
      <div className="container-narrow flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-deweb-cyan text-sm font-black text-deweb-bg">
            D
          </span>
          <span className="font-bold text-white">DEWEB</span>
        </div>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} DEWEB — IT marketplace & competitive bidding
        </p>
        <div className="flex gap-6 text-sm text-white/50">
          <Link href="/account" className="hover:text-deweb-cyan">
            Account
          </Link>
          <Link href="/privacy" className="hover:text-deweb-cyan">
            Privacy
          </Link>
          <a href="https://dewebam.com" className="hover:text-deweb-cyan">
            dewebam.com
          </a>
        </div>
      </div>
    </footer>
  );
}
