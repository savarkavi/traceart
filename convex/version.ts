import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get("projects", args.projectId);

    if (!project || project.ownerTokenIdentifier !== identity.tokenIdentifier) {
      throw new Error("Project not found");
    }

    return ctx.storage.generateUploadUrl();
  },
});

export const createVersion = mutation({
  args: {
    projectId: v.id("projects"),
    storageId: v.id("_storage"),
    type: v.union(v.literal("milestone"), v.literal("revision")),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get("projects", args.projectId);

    if (!project || project.ownerTokenIdentifier !== identity.tokenIdentifier) {
      throw new Error("Project not found");
    }

    return ctx.db.insert("versions", {
      projectId: args.projectId,
      storageId: args.storageId,
      type: args.type,
      title: args.title,
      description: args.description,
    });
  },
});

export const getAllVersions = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    const versions = await ctx.db
      .query("versions")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();

    return Promise.all(
      versions.map(async (version) => ({
        ...version,
        imageUrl: await ctx.storage.getUrl(version.storageId),
      })),
    );
  },
});

export const updateVersion = mutation({
  args: {
    versionId: v.id("versions"),
    projectId: v.id("projects"),
    title: v.string(),
    description: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get("projects", args.projectId);

    if (!project || project.ownerTokenIdentifier !== identity.tokenIdentifier) {
      throw new Error("Project not found");
    }

    const version = await ctx.db.get("versions", args.versionId);

    if (!version) {
      throw new Error("Version not found");
    }

    await ctx.db.patch("versions", args.versionId, {
      title: args.title,
      description: args.description,
      storageId: args.storageId,
    });
  },
});
