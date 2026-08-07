import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return ctx.storage.generateUploadUrl();
  },
});

export const createVersion = mutation({
  args: { projectId: v.id("projects"), storageId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    return ctx.db.insert("versions", {
      projectId: args.projectId,
      storageId: args.storageId,
    });
  },
});
