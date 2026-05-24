export type SocialPlatform = "linkedin" | "instagram" | "telegram" | "x";

export const socialPlatforms: SocialPlatform[] = ["linkedin", "instagram", "telegram", "x"];

export const defaultSocialLinks: Record<SocialPlatform, { href: string; label: string }> = {
  linkedin: {
    href: "https://www.linkedin.com/company/dewebam",
    label: "LinkedIn",
  },
  instagram: {
    href: "https://www.instagram.com/dewebam",
    label: "Instagram",
  },
  telegram: {
    href: "https://t.me/dewebam",
    label: "Telegram",
  },
  x: {
    href: "https://x.com/dewebam",
    label: "X",
  },
};

/** @deprecated use resolveSocialLinks */
export const socialLinks = defaultSocialLinks;

export function resolveSocialLinks(
  fromApi: Partial<Record<SocialPlatform, string>> = {}
): Record<SocialPlatform, { href: string; label: string }> {
  const resolved = {} as Record<SocialPlatform, { href: string; label: string }>;
  for (const platform of socialPlatforms) {
    const envHref = fromApi[platform]?.trim();
    resolved[platform] = {
      href: envHref || defaultSocialLinks[platform].href,
      label: defaultSocialLinks[platform].label,
    };
  }
  return resolved;
}

export async function fetchSocialLinks(): Promise<Record<SocialPlatform, { href: string; label: string }>> {
  const base =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_API_URL ||
        (window.location.hostname === "localhost"
          ? "http://localhost:3000/api"
          : "/api")
      : process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000/api";

  try {
    const res = await fetch(`${base}/config/social-links`, { cache: "no-store" });
    if (!res.ok) return defaultSocialLinks;
    const data = (await res.json()) as { links?: Partial<Record<SocialPlatform, string>> };
    return resolveSocialLinks(data.links);
  } catch {
    return defaultSocialLinks;
  }
}
