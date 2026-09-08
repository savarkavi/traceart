"use client";

import type { Doc } from "@convex/_generated/dataModel";
import { createContext, useContext } from "react";

export const ProjectContext = createContext<Doc<"projects"> | null>(null);

export function useProject() {
  const project = useContext(ProjectContext);

  if (!project) {
    throw new Error("useProject must be used inside ProjectLayoutClient");
  }

  return project;
}
