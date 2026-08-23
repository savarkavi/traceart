import { Id } from "../../../../../../convex/_generated/dataModel";
import ProjectSettings from "@/components/project/settings/project-settings";

const ProjectSettingsPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  return (
    <main>
      <div className="mx-auto flex max-w-6xl items-center justify-center px-3 py-10 lg:py-14">
        <ProjectSettings projectId={projectId as Id<"projects">} />
      </div>
    </main>
  );
};

export default ProjectSettingsPage;
