"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import ProjectDetails from "./project-details";
import ProjectHeader from "./project-header";
import ProjectWorkspace from "./project-workspace";

type ProjectViewProps = {
  projectId: Id<"projects">;
};

export default function ProjectView({ projectId }: ProjectViewProps) {
  const project = useQuery(api.project.getProjectById, { projectId });

  if (project === undefined) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <div className="mx-auto max-w-7xl px-3 py-10 lg:py-12">
          Loading project...
        </div>
      </main>
    );
  }

  if (project === null) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <div className="mx-auto max-w-7xl px-3 py-10 lg:py-12">
          Project not found.
        </div>
      </main>
    );
  }

  return (
    <main
      className="bg-background text-foreground min-h-screen"
      data-project-id={projectId}
    >
      <div className="mx-auto max-w-7xl px-3 py-10 lg:py-12">
        <ProjectHeader project={project} />
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
