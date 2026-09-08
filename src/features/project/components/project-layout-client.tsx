"use client";

import type { ReactNode } from "react";
import type { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Loader } from "lucide-react";
import ProjectHeader from "./project-header";
import { ProjectContext } from "@/features/project/hooks/use-project";

interface ProjectLayoutClientProps {
  children: ReactNode;
  projectId: Id<"projects">;
}

const ProjectLayoutClient = ({
  children,
  projectId,
}: ProjectLayoutClientProps) => {
  const project = useQuery(api.project.getProjectById, { projectId });

  if (project === undefined) {
    return (
      <main className="bg-background text-foreground flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
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
    <ProjectContext.Provider value={project}>
      <main className="bg-background text-foreground min-h-screen">
        <div className="mx-auto max-w-7xl px-3 py-10 lg:py-12">
          <ProjectHeader project={project} />
          {children}
        </div>
      </main>
    </ProjectContext.Provider>
  );
};

export default ProjectLayoutClient;
