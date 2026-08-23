"use client";

import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import ProjectEditForm from "./project-edit-form";

interface ProjectEditProps {
  projectId: Id<"projects">;
}

const ProjectSettings = ({ projectId }: ProjectEditProps) => {
  const project = useQuery(api.project.getProjectById, { projectId });

  if (project === undefined) {
    return <div>Loading project...</div>;
  }

  if (project === null) {
    return <div>Project not found.</div>;
  }

  return <ProjectEditForm project={project} />;
};

export default ProjectSettings;
