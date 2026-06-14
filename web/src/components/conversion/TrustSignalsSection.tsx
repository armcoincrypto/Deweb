"use client";

import { trustSignals, techStack, dewebProcess } from "@/lib/conversion-data";
import { GlassCard } from "@/components/ui/GlassCard";

type Props = {
  showProcess?: boolean;
  showTech?: boolean;
  className?: string;
};

export function TrustSignalsSection({
  showProcess = true,
  showTech = true,
  className = "",
}: Props) {
  return (
    <div className={`space-y-12 ${className}`}>
      <section aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="text-2xl font-bold text-white sm:text-3xl">
          Why clients trust DeWeb
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((item) => (
            <div key={item} className="content-panel rounded-xl px-4 py-3 text-sm text-white/80">
              <span className="font-bold text-deweb-cyan">✓ </span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {showTech && (
        <section aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="text-2xl font-bold text-white sm:text-3xl">
            Technology stack
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {showProcess && (
        <section aria-labelledby="deweb-process-heading">
          <h2 id="deweb-process-heading" className="text-2xl font-bold text-white sm:text-3xl">
            Development process
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dewebProcess.map((step) => (
              <GlassCard key={step.step} className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 text-sm font-bold text-deweb-cyan">
                  {step.step}
                </div>
                <h3 className="mt-4 font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
