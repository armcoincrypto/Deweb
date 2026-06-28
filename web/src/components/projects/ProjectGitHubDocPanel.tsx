import { githubDocUrl } from "@/lib/projects/github-docs";
import type { ProjectPage } from "@/lib/projects/types";

type ProjectGitHubDocPanelProps = {
  project: ProjectPage;
  labels: {
    title: string;
    description: string;
    link: string;
  };
};

export function ProjectGitHubDocPanel({ project, labels }: ProjectGitHubDocPanelProps) {
  if (!project.githubDocPath) {
    return null;
  }

  const href = githubDocUrl(project.githubDocPath);

  return (
    <div className="content-panel rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white">{labels.title}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-white/65">{labels.description}</p>
      <div className="mt-6">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-deweb-cyan/30 bg-deweb-cyan/10 px-5 py-3 text-sm font-semibold text-deweb-cyan transition-colors hover:border-deweb-cyan/50 hover:bg-deweb-cyan/15"
        >
          {labels.link}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
