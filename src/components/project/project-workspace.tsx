"use client";

import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import ProjectEmptyUpload from "./project-empty-upload";
import { api } from "../../../convex/_generated/api";
import VersionComparison from "./version-comparison";
import VersionTimeline from "./version-timeline";

interface ProjectWorkspaceProps {
  projectId: Id<"projects">;
}

const ProjectWorkspace = ({ projectId }: ProjectWorkspaceProps) => {
  const versions = useQuery(api.version.getAllVersions, { projectId });

  if (versions === undefined) {
    return <div>Loading versions...</div>;
  }

  const hasVersions = versions.length > 0;

  return (
    <div>
      {hasVersions ? (
        <>
          <VersionComparison versions={versions} />
          <VersionTimeline versions={versions} />
        </>
      ) : (
        <ProjectEmptyUpload />
      )}
    </div>
  );
};

export default ProjectWorkspace;
