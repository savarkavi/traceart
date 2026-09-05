"use client";

import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import ProjectEmptyUpload from "./project-empty-upload";
import { api } from "../../../convex/_generated/api";
import VersionComparison from "./version-comparison";
import VersionThumbnails from "./version-thumbnails";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ProjectWorkspaceProps {
  projectId: Id<"projects">;
}

export type SelectionTarget = "before" | "after";

const ProjectWorkspace = ({ projectId }: ProjectWorkspaceProps) => {
  const versions = useQuery(api.version.getAllVersions, { projectId });
  const [beforeId, setBeforeId] = useState<Id<"versions"> | null>(null);
  const [afterId, setAfterId] = useState<Id<"versions"> | null>(null);
  const [selectionTarget, setSelectionTarget] =
    useState<SelectionTarget>("after");

  if (versions === undefined) {
    return <Skeleton className="h-150 w-full rounded-xl" />;
  }

  const milestoneVersions = versions.filter(
    (version) => version.type === "milestone",
  );

  const defaultBefore = milestoneVersions[Math.max(1, 0)];
  const defaultAfter = milestoneVersions[0];

  const before =
    milestoneVersions.find((version) => version._id === beforeId) ??
    defaultBefore;
  const after =
    milestoneVersions.find((version) => version._id === afterId) ??
    defaultAfter;

  const handleVersionSelection = (versionId: Id<"versions">) => {
    if (selectionTarget === "before") {
      if (versionId !== after._id) {
        setBeforeId(versionId);
      }
    } else {
      if (versionId !== before._id) {
        setAfterId(versionId);
      }
    }
  };

  const hasVersions = versions.length > 0;

  return (
    <div className="w-full">
      {hasVersions ? (
        <>
          <VersionComparison
            versions={versions}
            before={before}
            after={after}
          />
          <VersionThumbnails
            projectId={projectId}
            versions={versions}
            beforeId={before._id}
            afterId={after._id}
            selectionTarget={selectionTarget}
            onChangeSelectionTarget={setSelectionTarget}
            onSelectVersion={handleVersionSelection}
          />
        </>
      ) : (
        <ProjectEmptyUpload />
      )}
    </div>
  );
};

export default ProjectWorkspace;
