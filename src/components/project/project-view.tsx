"use client";

import ProjectDetails from "./project-details";
import { useProject } from "./project-layout-client";
import ProjectWorkspace from "./project-workspace";

export default function ProjectView() {
  const project = useProject();
  const projectId = project._id;

  return (
    <main
      className="bg-background text-foreground min-h-screen"
      data-project-id={projectId}
    >
      <div className="mx-auto max-w-7xl px-3 py-10 lg:py-12">
        <div className="mt-8 flex justify-between gap-8">
          <ProjectWorkspace projectId={projectId} />
          <div className="w-full max-w-xs">
            <ProjectDetails project={project} />
          </div>
        </div>
      </div>
    </main>
  );
}
