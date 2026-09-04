"use client";

import Image from "next/image";
import { useQuery } from "convex/react";

import { api } from "../../../convex/_generated/api";
import { Skeleton } from "../ui/skeleton";
import EditVersionButton from "./edit-version-button";
import { useProject } from "./project-layout-client";
import type { VersionWithImage } from "./version-thumbnails";

const VersionTimeline = () => {
  const project = useProject();
  const versions = useQuery(api.version.getAllVersions, {
    projectId: project._id,
  });

  if (versions === undefined) {
    return <Skeleton className="mt-20 h-40 w-full rounded-xl" />;
  }

  const milestoneVersions = versions.filter(
    (version) => version.type === "milestone",
  );

  return (
    <section className="mt-12 w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Artwork timeline
          </h2>
          <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
            {milestoneVersions.length}{" "}
            {milestoneVersions.length === 1 ? "version" : "versions"}
          </span>
        </div>
      </div>

      {milestoneVersions.length === 0 ? (
        <div className="border-border bg-card text-muted-foreground rounded-xl border border-dashed px-6 py-12 text-center text-sm">
          No versions yet.
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4">
          {milestoneVersions.map((version, index) => (
            <VersionTimelineItem
              key={version._id}
              projectId={project._id}
              version={version}
              versionNumber={milestoneVersions.length - index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

type VersionTimelineItemProps = {
  projectId: VersionWithImage["projectId"];
  version: VersionWithImage;
  versionNumber: number;
};

function VersionTimelineItem({
  projectId,
  version,
  versionNumber,
}: VersionTimelineItemProps) {
  const createdAt = new Date(version._creationTime);

  return (
    <article className="border-border bg-card relative flex w-full gap-4 rounded-xl border p-3 shadow-sm sm:gap-6">
      <div className="bg-muted relative aspect-4/3 w-22 shrink-0 overflow-hidden rounded-lg sm:w-40">
        {version.imageUrl ? (
          <Image
            src={version.imageUrl}
            alt={`Artwork for version ${versionNumber}: ${version.title}`}
            fill
            sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 128px"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center px-2 text-center text-xs">
            Image unavailable
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
              V{versionNumber}
            </span>
            <h3 className="truncate text-sm font-semibold sm:text-base">
              {version.title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <time
              dateTime={createdAt.toISOString()}
              className="text-muted-foreground text-right text-xs"
            >
              {createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <EditVersionButton version={version} projectId={projectId} />
          </div>
        </div>

        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-6">
          {version.description || "No description added."}
        </p>
      </div>
    </article>
  );
}

export default VersionTimeline;
