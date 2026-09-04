import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    ownerTokenIdentifier: v.string(),
    title: v.string(),
    description: v.string(),
  }).index("by_ownerTokenIdentifier", ["ownerTokenIdentifier"]),

  versions: defineTable({
    projectId: v.id("projects"),
    storageId: v.id("_storage"),
    milestoneId: v.optional(v.id("versions")),
    title: v.string(),
    description: v.string(),
    type: v.union(v.literal("milestone"), v.literal("revision")),
  })
    .index("by_projectId", ["projectId"])
    .index("by_projectId_and_type", ["projectId", "type"])
    .index("by_milestoneId", ["milestoneId"]),
});
