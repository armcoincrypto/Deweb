"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import {
  defaultSocialLinks,
  fetchSocialLinks,
  socialPlatforms,
  type SocialPlatform,
} from "@/lib/social-links";

type SocialLinksProps = {
  size?: "lg" | "sm";
  className?: string;
};

function SocialIcon({
  platform,
  large,
  gradientId,
}: {
  platform: SocialPlatform;
  large: boolean;
  gradientId: string;
}) {
  const iconClass = large ? "h-10 w-10 sm:h-12 sm:w-12" : "h-3.5 w-3.5";

  switch (platform) {
    case "linkedin":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f09433" />
              <stop offset="0.25" stopColor="#e6683c" />
              <stop offset="0.5" stopColor="#dc2743" />
              <stop offset="0.75" stopColor="#cc2366" />
              <stop offset="1" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke={`url(#${gradientId})`} strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="4" stroke={`url(#${gradientId})`} strokeWidth="2" fill="none" />
          <circle cx="17.2" cy="6.8" r="1.2" fill={`url(#${gradientId})`} />
        </svg>
      );
    case "telegram":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#29B6F6" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      );
    case "x":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}

export function SocialLinks({ size = "lg", className }: SocialLinksProps) {
  const large = size === "lg";
  const gradientId = useId().replace(/:/g, "");
  const [links, setLinks] = useState(defaultSocialLinks);

  useEffect(() => {
    fetchSocialLinks().then(setLinks);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center",
        large ? "gap-6 sm:gap-8" : "gap-2.5",
        className
      )}
    >
      {socialPlatforms.map((platform) => {
        const { href, label } = links[platform];
        if (!href) return null;
        return (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className={cn(
              "group flex items-center justify-center rounded-full border transition-all duration-300",
              "border-deweb-cyan/40 bg-deweb-cyan/5 hover:border-deweb-cyan hover:bg-deweb-cyan/15 hover:shadow-glow-sm",
              large
                ? "h-28 w-28 sm:h-36 sm:w-36 hover:scale-105"
                : "h-8 w-8 border-white/15 hover:scale-105",
              platform === "linkedin" && "text-[#0a66c2]",
              platform === "x" && "text-white"
            )}
          >
            <SocialIcon platform={platform} large={large} gradientId={gradientId} />
          </a>
        );
      })}
    </div>
  );
}
