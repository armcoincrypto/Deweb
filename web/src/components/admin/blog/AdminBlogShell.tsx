"use client";

import { useEffect } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/blog", label: "Dashboard" },
  { href: "/admin/blog/pending", label: "Pending review" },
  { href: "/admin/blog/topic-queue", label: "Topic queue" },
  { href: "/admin/blog/ai-generator", label: "AI generator" },
  { href: "/admin/blog/new", label: "New post" },
];

type AdminBlogShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AdminBlogShell({ title, subtitle, children }: AdminBlogShellProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user?.isAdmin) router.replace("/account/login");
  }, [user, loading, router]);

  if (loading || !user?.isAdmin) {
    return <p className="py-32 text-center text-white/50">Loading…</p>;
  }

  return (
    <div className="min-h-screen bg-deweb-bg px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-sm text-deweb-cyan hover:underline">
              ← Admin dashboard
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>
            {subtitle && <p className="mt-1 text-white/50">{subtitle}</p>}
          </div>
        </div>

        <nav className="mt-8 flex flex-wrap gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                "border-white/10 text-white/70 hover:border-deweb-cyan/40 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
