import ProjectLayoutClient from "@/features/project/components/project-layout-client";
import type { ReactNode } from "react";
import type { Id } from "@convex/_generated/dataModel";

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
