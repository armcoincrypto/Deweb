import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ size = 40, className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand-logo.png"
      alt="DEWEB"
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-xl object-cover shadow-glow-sm", className)}
    />
  );
}
