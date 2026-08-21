"use client";

import Image from "next/image";
import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";

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

const VersionComparison = ({ before, after }: VersionComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="bg-card border-border relative rounded-2xl border shadow-sm">
      {after.imageUrl ? (
        <div className="relative h-200 w-full bg-black/5">
          <Image
            src={after.imageUrl}
            alt="artwork version"
            fill
            className="h-auto w-full object-contain"
          />
        </div>
      ) : (
        <div className="text-muted-foreground flex h-200 w-full items-center justify-center">
          Image unavailable
        </div>
      )}
      {before.imageUrl ? (
        <div
          className="absolute inset-0 h-200 w-full bg-black/5"
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
        <div className="text-muted-foreground flex h-200 w-full items-center justify-center">
          Image unavailable
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-semibold text-black shadow-lg">
          ↔
        </div>
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
  );
};

export default VersionComparison;
