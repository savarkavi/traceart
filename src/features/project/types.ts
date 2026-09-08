import type { Doc } from "@convex/_generated/dataModel";

export type SelectionTarget = "before" | "after";

export type VersionWithImage = Doc<"versions"> & {
  imageUrl: string | null;
};
