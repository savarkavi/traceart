import Image from "next/image";
import EditVersionButton from "./edit-version-button";
import { VersionWithImage } from "./version-thumbnails";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface VersionTimelineItemProps {
  projectId: Id<"projects">;
  version: VersionWithImage;
  isRevision?: boolean;
  versionNumber: number | string;
  revisionCount: number;
}

const VersionTimelineItem = ({
  projectId,
  version,
  isRevision = false,
  versionNumber,
}: VersionTimelineItemProps) => {
  const createdAt = new Date(version._creationTime);

  return (
    <article
      className={cn(
        "border-border relative flex w-full gap-4 rounded-lg border p-3 shadow-sm",
        version.type === "milestone"
          ? "from-card via-card to-primary/10 bg-linear-to-br"
          : "bg-card",
      )}
    >
      {version.type === "milestone" ? (
        <span
          aria-hidden="true"
          className="bg-primary ring-background absolute top-4 -left-6.5 z-10 size-2.5 rotate-45 rounded-[2px] ring-4"
        />
      ) : null}
      <div
        className={cn(
          "bg-muted relative aspect-4/3 shrink-0 overflow-hidden",
          isRevision ? "w-14 rounded-sm" : "w-40 rounded-lg",
        )}
      >
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
            <h3
              className={cn(
                "truncate font-semibold",
                isRevision ? "text-xs" : "text-base",
              )}
            >
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

        <p
          className={cn(
            "text-muted-foreground mt-1 max-w-xl leading-6",
            isRevision ? "text-xs" : "text-sm",
          )}
        >
          {version.description}
        </p>
      </div>
    </article>
  );
};

export default VersionTimelineItem;
