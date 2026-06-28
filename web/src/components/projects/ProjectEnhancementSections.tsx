import type { ProjectPage } from "@/lib/projects/types";

type ProjectEnhancementSectionsProps = {
  project: ProjectPage;
  labels: {
    systemArchitecture: string;
    supportedNetworks: string;
    coreCapabilities: string;
    securityReliability: string;
    developmentStack: string;
    exchangeWorkflow: string;
    platformComponents: string;
    seoEngineering: string;
    operations: string;
    challengesSolved: string;
    engineeringLessons: string;
  };
};

function FlowSteps({ steps }: { steps: { label: string; description?: string }[] }) {
  return (
    <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-stretch">
      {steps.map((step, index) => (
        <div key={step.label} className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm font-bold text-deweb-cyan">{step.label}</p>
            {step.description && (
              <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
            )}
          </div>
          {index < steps.length - 1 && (
            <span
              className="hidden px-2 text-lg text-white/25 lg:inline"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProjectEnhancementSections({ project, labels }: ProjectEnhancementSectionsProps) {
  return (
    <>
      {project.architectureFlow && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.systemArchitecture}</h2>
          <p className="mt-3 text-sm text-white/45">{project.architectureFlow.title}</p>
          <FlowSteps steps={project.architectureFlow.steps} />
        </div>
      )}

      {project.networks && project.networks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.supportedNetworks}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.networks.map((network) => (
              <span
                key={network}
                className="rounded-full border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-2 text-sm font-semibold text-deweb-cyan"
              >
                {network}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.capabilities && project.capabilities.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.coreCapabilities}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.capabilities.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.exchangeWorkflow && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.exchangeWorkflow}</h2>
          <p className="mt-3 text-sm text-white/45">{project.exchangeWorkflow.title}</p>
          <FlowSteps steps={project.exchangeWorkflow.steps} />
        </div>
      )}

      {project.platformComponentCards && project.platformComponentCards.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.platformComponents}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.platformComponentCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.securityHighlights && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.securityReliability}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {project.securityHighlights.items.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {project.seoEngineeringDetail && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.seoEngineering}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {project.seoEngineeringDetail.items.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {project.operationsDetail && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.operations}</h2>
          {project.operationsDetail.paragraphs?.map((p) => (
            <p key={p.slice(0, 48)} className="mt-4 leading-relaxed text-white/65">
              {p}
            </p>
          ))}
          {project.operationsDetail.items && (
            <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
              {project.operationsDetail.items.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {project.techStackGrid && project.techStackGrid.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.developmentStack}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {project.techStackGrid.map((tech) => (
              <div
                key={tech}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium text-white/75"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      )}

      {project.challengesSolved && project.challengesSolved.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.challengesSolved}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {project.challengesSolved.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {project.engineeringLessons && project.engineeringLessons.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white">{labels.engineeringLessons}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
            {project.engineeringLessons.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
