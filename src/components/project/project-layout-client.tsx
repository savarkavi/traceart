"use client";

import { createContext, ReactNode, useContext } from "react";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader } from "lucide-react";
import ProjectHeader from "./project-header";

interface ProjectLayoutClientProps {
  children: ReactNode;
  projectId: Id<"projects">;
}

const ProjectContext = createContext<Doc<"projects"> | null>(null);

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

export function useProject() {
  const project = useContext(ProjectContext);

  if (!project) {
    throw new Error("useProject must be used inside ProjectLayoutClient");
  }

  return project;
}

export default ProjectLayoutClient;
