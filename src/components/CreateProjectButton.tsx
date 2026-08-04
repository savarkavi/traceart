"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/toast";

const CreateProjectButton = () => {
  const router = useRouter();
  const createProject = useMutation(api.project.createProject);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProject = async () => {
    if (isCreating) return;

    setIsCreating(true);

    try {
      const projectId = await createProject();
      toast.add({
        type: "success",
        description: "Project Created",
      });
      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        description: "Failed to create the project.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      onClick={handleCreateProject}
      disabled={isCreating}
      className="bg-primary rounded-md p-2 text-sm font-semibold text-black uppercase"
    >
      Create Project
    </button>
  );
};

export default CreateProjectButton;
