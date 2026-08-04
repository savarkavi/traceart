import { mutation } from "./_generated/server";

export const createProject = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
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
    });
  },
});
