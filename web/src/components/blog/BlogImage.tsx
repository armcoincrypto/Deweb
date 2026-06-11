"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getCategoryCover,
  needsUnoptimizedImage,
  resolveBlogCover,
} from "@/lib/blog/images";

type BlogImageProps = {
  src?: string | null;
  alt: string;
  categorySlug?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  showFallbackLabel?: boolean;
};

export function BlogImage({
  src,
  alt,
  categorySlug,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
  showFallbackLabel = false,
}: BlogImageProps) {
  const fallback = getCategoryCover(categorySlug);
  const resolved = resolveBlogCover({ src, categorySlug });
  const [current, setCurrent] = useState(resolved);
  const [errored, setErrored] = useState(false);

  const usesFallback =
    errored || !src?.trim() || resolved === fallback;

  function handleError() {
    if (current !== fallback) {
      setCurrent(fallback);
      setErrored(true);
    }
  }

  const image = (
    <Image
      src={current}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      unoptimized={needsUnoptimizedImage(current)}
      onError={handleError}
      className={cn("object-cover", className)}
    />
  );

  if (!showFallbackLabel) return image;

  return (
    <div className={cn("relative", fill && "h-full w-full")}>
      {image}
      {usesFallback && (
        <span className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/70 backdrop-blur-sm">
          Default image used
        </span>
      )}
    </div>
  );
}
