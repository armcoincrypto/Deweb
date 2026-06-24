"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { SparkleField, CssGlobe } from "@/components/ui/SparkleField";
import { globeScrollState } from "@/lib/globe-scroll-state";
import { cn } from "@/lib/utils";
const DigitalGlobe = dynamic(
  () => import("@/components/3d/DigitalGlobe").then((m) => ({ default: m.DigitalGlobe })),
  { ssr: false, loading: () => <UniverseFallback mode="css" /> }
);

type UniverseMode = "full" | "lite" | "css";

function UniverseFallback({ mode = "css" }: { mode?: UniverseMode }) {
  return (
    <div className="absolute inset-0">
      <SparkleField density={mode === "css" ? "low" : "medium"} focal className="opacity-90" />
      <CssGlobe accent={globeScrollState.accent} />
    </div>
  );
}

type ScrollUniverseLayerProps = {
  /** full = desktop WebGL, lite = tablet WebGL reduced, css = mobile CSS globe */
  mode?: UniverseMode;
  /** @deprecated use mode */
  lite?: boolean;
  className?: string;
};

export const ScrollUniverseLayer = forwardRef<HTMLDivElement, ScrollUniverseLayerProps>(
  function ScrollUniverseLayer({ mode, lite = false, className }, ref) {
    const resolved: UniverseMode = mode ?? (lite ? "css" : "full");

    return (
      <div
        ref={ref}
        data-scroll-universe
        className={cn("pointer-events-none absolute inset-0 overflow-hidden preserve-3d", className)}
        style={{ transformOrigin: "50% 42%" }}
      >
        <div className="absolute inset-0 bg-hero-mesh opacity-90" />
        <SparkleField
          density={resolved === "full" ? "high" : resolved === "lite" ? "medium" : "low"}
          focal
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(0,242,255,0.14),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-deweb-bg via-deweb-bg/80 to-transparent" />

        {resolved === "full" && (
          <div className="absolute inset-0 opacity-95">
            <DigitalGlobe className="h-full w-full" variant="full" />
          </div>
        )}
        {resolved === "lite" && (
          <div className="absolute inset-0 opacity-90">
            <DigitalGlobe className="h-full w-full" variant="lite" />
          </div>
        )}
        {resolved === "css" && <UniverseFallback mode="css" />}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(11,20,36,0.45)_100%)]" />
      </div>
    );
  }
);
