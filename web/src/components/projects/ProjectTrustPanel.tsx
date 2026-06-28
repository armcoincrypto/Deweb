import type { ProjectTrustMeta } from "@/lib/projects/types";

type ProjectTrustPanelProps = {
  trust: ProjectTrustMeta;
  labels: {
    projectType: string;
    industry: string;
    technology: string;
    deploymentModel: string;
  };
};

export function ProjectTrustPanel({ trust, labels }: ProjectTrustPanelProps) {
  const items = [
    { label: labels.projectType, value: trust.projectType },
    { label: labels.industry, value: trust.industry },
    { label: labels.technology, value: trust.technology },
    { label: labels.deploymentModel, value: trust.deploymentModel },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-white/40">{item.label}</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-white/85">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
