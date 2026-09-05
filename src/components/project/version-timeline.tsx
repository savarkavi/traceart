"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Skeleton } from "../ui/skeleton";
import { useProject } from "./project-layout-client";
import VersionTimelineItem from "./version-timeline-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const VersionTimeline = () => {
  const project = useProject();
  const versions = useQuery(api.version.getAllVersions, {
    projectId: project._id,
  });

  if (versions === undefined) {
    return <Skeleton className="mt-20 h-40 w-full rounded-xl" />;
  }
  // console.log(versions);

  const milestoneVersions = versions.filter(
    (version) => version.type === "milestone",
  );
  const revisionCounts: number[] = [];
  let revisionsSinceLastMilestone = 0;

  for (const version of versions) {
    if (version.type === "revision") {
      revisionsSinceLastMilestone += 1;
      continue;
    }

    revisionCounts.push(revisionsSinceLastMilestone);
    revisionsSinceLastMilestone = 0;
  }

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
          {milestoneVersions.map((version, index) => {
            const revisions = versions.filter(
              (v) => v.milestoneId === version._id,
            );
            const milestoneVersionNumber = milestoneVersions.length - index;

            return (
              <Accordion key={version._id}>
                <VersionTimelineItem
                  projectId={project._id}
                  version={version}
                  versionNumber={milestoneVersionNumber}
                  revisionCount={revisionCounts[index]}
                />
                <AccordionItem
                  value={version._id}
                  className="before:border-muted-foreground/40 relative w-full before:pointer-events-none before:absolute before:top-6 before:bottom-0 before:left-2 before:hidden before:border-l-2 before:border-dotted data-open:before:block"
                >
                  {revisionCounts[index] > 0 ? (
                    <AccordionTrigger className="w-fit py-0 pt-4">
                      <span className="text-muted-foreground flex w-fit shrink-0 cursor-pointer items-center gap-1 text-xs hover:text-white">
                        {revisionCounts[index]}{" "}
                        {revisionCounts[index] === 1 ? "revision" : "revisions"}{" "}
                        from this milestone
                      </span>
                    </AccordionTrigger>
                  ) : null}
                  <AccordionContent className="mt-4 flex w-full flex-col gap-2 pl-6">
                    {revisions.map((revision, revisionIndex) => (
                      <div
                        key={revision._id}
                        className="before:border-muted-foreground/40 relative before:pointer-events-none before:absolute before:top-1/2 before:-left-4 before:w-4 before:border-t-2 before:border-dotted"
                      >
                        <VersionTimelineItem
                          projectId={project._id}
                          version={revision}
                          isRevision={true}
                          versionNumber={`${milestoneVersionNumber}.${revisions.length - revisionIndex}`}
                          revisionCount={revisionCounts[index]}
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default VersionTimeline;
