"use client";

import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import ProjectEditForm from "./project-edit-form";
import { Loader } from "lucide-react";

interface ProjectEditProps {
  projectId: Id<"projects">;
}

const ProjectSettings = ({ projectId }: ProjectEditProps) => {
  const project = useQuery(api.project.getProjectById, { projectId });

  if (project === undefined) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (project === null) {
    return <div>Project not found.</div>;
  }

  return <ProjectEditForm project={project} />;
};

export default ProjectSettings;
