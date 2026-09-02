"use client";

import type { Doc } from "../../../convex/_generated/dataModel";

import ProjectHeaderTabs from "./project-header-tabs";

type ProjectHeaderProps = {
  project: Doc<"projects">;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section>
      <div className="flex flex-col items-start justify-between gap-6 border-b py-6 md:flex-row md:items-end">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-semibold capitalize">
              {project.title}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-200">
              <span className="relative size-1.5">
                <span className="absolute size-1.5 animate-ping rounded-full bg-amber-400" />
                <span className="absolute size-1.5 rounded-full bg-amber-400" />
              </span>
              In progress
            </span>
          </div>
          {project.description && (
            <p className="text-muted-foreground">{project.description}</p>
          )}
        </div>
      </div>
      <ProjectHeaderTabs project={project} />
    </section>
  );
}
