"use client";

import Image from "next/image";
import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { ArrowUpRight, MoreHorizontal, Sparkles } from "lucide-react";

type VersionWithImage = {
  imageUrl: string | null;
  _id: Id<"versions">;
  _creationTime: number;
  projectId: Id<"projects">;
  storageId: Id<"_storage">;
};

interface VersionComparisonProps {
  versions: VersionWithImage[];
  before: VersionWithImage;
  after: VersionWithImage;
}

const VersionComparison = ({
  versions,
  before,
  after,
}: VersionComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const beforeVersionNumber =
    versions.findIndex((version) => version._id === before._id) + 1;
  const afterVersionNumber =
    versions.findIndex((version) => version._id === after._id) + 1;

  return (
    <div className="bg-card border-border relative rounded-2xl border shadow-sm">
      <div className="flex w-full items-center justify-between border-b-2 p-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Compare versions</h2>
            <span className="text-muted-foreground text-xs">{`V${beforeVersionNumber} → V${afterVersionNumber}`}</span>
          </div>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Drag the divider to see what changed.
          </p>
        </div>
        <MoreHorizontal className="size-4" />
      </div>
      <div className="relative bg-[#ded8ca] py-4">
        <div className="relative">
          {after.imageUrl ? (
            <div className="relative h-150 w-full">
              <Image
                src={after.imageUrl}
                alt="artwork version"
                fill
                className="h-auto w-full object-contain"
              />
            </div>
          ) : (
            <div className="text-muted-foreground flex h-150 w-full items-center justify-center">
              Image unavailable
            </div>
          )}
          {before.imageUrl ? (
            <div
              className="absolute inset-0 h-150 w-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={before.imageUrl}
                alt="artwork version"
                fill
                className="h-auto w-full object-contain"
              />
            </div>
          ) : (
            <div className="text-muted-foreground flex h-150 w-full items-center justify-center">
              Image unavailable
            </div>
          )}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-semibold text-black shadow-lg">
            ↔
          </div>
        </div>

        <div className="pointer-events-none absolute top-4 left-4 z-30 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
          V {beforeVersionNumber}
        </div>
        <div className="pointer-events-none absolute top-4 right-4 z-30 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
          V {afterVersionNumber}
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(event) => setSliderPosition(Number(event.target.value))}
          aria-label="Move comparison divider"
          className="absolute inset-0 z-20 h-full w-full cursor-col-resize opacity-0"
        />
      </div>
      <div className="flex w-full items-center justify-between p-4">
        <div></div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <Sparkles className="size-3.5" />
          Open full compare view
          <ArrowUpRight className="size-3.5" />
        </div>
      </div>
    </div>
  );
};

export default VersionComparison;
