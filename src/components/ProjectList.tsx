"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";

const ProjectList = () => {
  const projects = useQuery(api.project.getMyProjects);
  return (
    <div>
      {projects?.map((project) => (
        <Link href={`/projects/${project._id}`} key={project._id}>
          {project.title}
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
