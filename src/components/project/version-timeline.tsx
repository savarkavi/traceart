import Image from "next/image";

import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { SelectionTarget } from "./project-workspace";
import EditVersionButton from "./edit-version-button";
import { cn } from "@/lib/utils";

export type VersionWithImage = Doc<"versions"> & {
  imageUrl: string | null;
};

type VersionTimelineProps = {
  projectId: Id<"projects">;
  versions: VersionWithImage[];
  beforeId: Id<"versions">;
  afterId: Id<"versions">;
  selectionTarget: SelectionTarget;
  onChangeSelectionTarget: (selectionTarget: SelectionTarget) => void;
  onSelectVersion: (versionId: Id<"versions">) => void;
};

export default function VersionTimeline({
  projectId,
  versions,
  beforeId,
  afterId,
  selectionTarget,
  onChangeSelectionTarget,
  onSelectVersion,
}: VersionTimelineProps) {
  return (
    <section className="mt-20">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Artwork timeline
          </h2>
          <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
            {versions.length} {versions.length === 1 ? "version" : "versions"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 overflow-x-auto">
        <div className="bg-border h-px w-full" />

        <div className="flex gap-2">
          <Button
            onClick={() => onChangeSelectionTarget("before")}
            className={cn(
              selectionTarget === "before"
                ? "bg-primary"
                : "bg-background border-border text-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            Before
          </Button>
          <Button
            onClick={() => onChangeSelectionTarget("after")}
            className={cn(
              selectionTarget === "after"
                ? "bg-primary"
                : "bg-background border-border text-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            After
          </Button>
        </div>

        <div className="relative flex min-w-max snap-x snap-mandatory flex-col gap-4">
          {versions.map((version, index) => (
            <article
              key={version._id}
              className={cn(
                "relative w-full shrink-0 cursor-pointer snap-start",
                selectionTarget === "after"
                  ? afterId === version._id &&
                      "border-primary rounded-xl border-3"
                  : beforeId === version._id &&
                      "border-primary rounded-xl border-3",
                selectionTarget === "after" &&
                  version._id === beforeId &&
                  "cursor-not-allowed",
                selectionTarget === "before" &&
                  version._id === afterId &&
                  "cursor-not-allowed",
              )}
              onClick={() => onSelectVersion(version._id)}
            >
              <div className="border-border bg-card flex h-30 items-start gap-2 overflow-hidden rounded-lg border shadow-sm">
                {version.imageUrl ? (
                  <div className="bg-muted relative h-full w-40">
                    <Image
                      src={version.imageUrl}
                      alt={`Version ${index + 1}`}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-muted-foreground bg-muted relative flex aspect-4/3 items-center justify-center text-sm">
                    Image unavailable
                  </div>
                )}

                <div className="flex max-w-xl flex-col justify-between gap-1 p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{version.title}</h3>
                    <p className="text-muted-foreground text-xs">
                      {new Date(version._creationTime).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">
                    {version.description}
                  </p>
                </div>
              </div>
              <div
                className="absolute top-3 right-3"
                onClick={(e) => e.stopPropagation()}
              >
                <EditVersionButton version={version} projectId={projectId} />
              </div>
              <div className="text-muted-foreground absolute right-3 bottom-3 flex w-fit items-center justify-center text-xs">
                <p>V{versions.length - index}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
