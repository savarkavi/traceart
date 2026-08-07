import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    ownerTokenIdentifier: v.string(),
    title: v.string(),
  }).index("by_ownerTokenIdentifier", ["ownerTokenIdentifier"]),

  versions: defineTable({
    projectId: v.id("project"),
    storageId: v.string(),
  }).index("by_projectId", ["projectId"]),
});
