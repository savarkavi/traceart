import ProjectLayoutClient from "@/components/project/project-layout-client";
import { ReactNode } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

interface ProjectLayoutProps {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { projectId } = await params;

  return (
    <ProjectLayoutClient projectId={projectId as Id<"projects">}>
      {children}
    </ProjectLayoutClient>
  );
}
