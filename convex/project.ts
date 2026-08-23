import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProject = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_ownerTokenIdentifier", (q) =>
        q.eq("ownerTokenIdentifier", identity.tokenIdentifier),
      )
      .collect();

    const untitledProjects = projects.filter((project) =>
      /^Untitled(-\d+)?$/.test(project.title),
    );

    const usedNumbers = untitledProjects.map((p) => {
      if (p.title === "Untitled") return 1;

      return Number(p.title.replace("Untitled-", ""));
    });

    let title = "Untitled";

    if (usedNumbers.includes(1)) {
      let next = 2;

      while (usedNumbers.includes(next)) {
        next++;
      }

      title = `Untitled-${next}`;
    }

    return ctx.db.insert("projects", {
      ownerTokenIdentifier: identity.tokenIdentifier,
      title,
      description: "",
    });
  },
});

export const getProjectById = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    return ctx.db.get("projects", args.projectId);
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerTokenIdentifier !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch("projects", args.projectId, {
      title: args.title,
      description: args.description,
    });

    return ctx.db.get("projects", args.projectId);
  },
});
