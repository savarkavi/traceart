import Image from "next/image";

import type { Doc } from "../../../convex/_generated/dataModel";

type VersionWithImage = Doc<"versions"> & {
  imageUrl: string | null;
};

type VersionTimelineProps = {
  versions: VersionWithImage[];
};

export default function VersionTimeline({ versions }: VersionTimelineProps) {
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

      <div className="overflow-x-auto pb-4">
        <div className="relative flex min-w-max snap-x snap-mandatory gap-4 px-2 pt-8">
          <div className="bg-border absolute top-3 right-6 left-6 h-px" />

          {versions.map((version, index) => (
            <article
              key={version._id}
              className="relative w-50 shrink-0 snap-start"
            >
              <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
                {version.imageUrl ? (
                  <div className="bg-muted relative aspect-4/3 w-full">
                    <Image
                      src={version.imageUrl}
                      alt={`Version ${index + 1}`}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-muted-foreground bg-muted flex aspect-4/3 items-center justify-center text-sm">
                    Image unavailable
                  </div>
                )}

                <div className="flex justify-between gap-4 p-2">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Version {index + 1}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Added {new Date(version._creationTime).toLocaleString()}
                    </p>
                  </div>

                  <span className="text-muted-foreground text-xs">Artwork</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
