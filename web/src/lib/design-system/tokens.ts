/** DeWeb 2026 design tokens — single source of truth for premium UI. */
export const dewebTokens = {
  colors: {
    bg: "#05070a",
    surface: "#0a0e14",
    card: "rgba(12, 18, 28, 0.72)",
    cyan: "#00f2ff",
    cyanDim: "#00b8c4",
    purple: "#7c3aed",
    magenta: "#c026d3",
    border: "rgba(255, 255, 255, 0.1)",
    borderGlow: "rgba(0, 242, 255, 0.18)",
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    full: "9999px",
  },
  motion: {
    easePremium: [0.22, 1, 0.36, 1] as const,
    durationFast: 0.35,
    durationBase: 0.55,
    durationSlow: 0.85,
    stagger: 0.08,
  },
  typography: {
    display: "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
    h1: "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
    h2: "text-2xl font-bold tracking-tight sm:text-3xl",
    h3: "text-xl font-semibold sm:text-2xl",
    body: "text-base leading-relaxed text-white/65",
    label: "text-xs font-bold uppercase tracking-[0.2em]",
    kicker: "text-xs font-bold uppercase tracking-[0.25em] text-deweb-cyan/80",
  },
  glass: {
    panel: "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl",
    panelGlow:
      "rounded-2xl border border-deweb-cyan/20 bg-white/[0.06] backdrop-blur-xl shadow-glow-sm",
  },
} as const;

export type DewebTokens = typeof dewebTokens;
