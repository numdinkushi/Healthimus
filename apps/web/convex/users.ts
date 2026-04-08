import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const upsertGoogleUser = mutation({
  args: {
    provider: v.string(),
    providerAccountId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_provider_account", (q) =>
        q.eq("provider", args.provider).eq("providerAccountId", args.providerAccountId),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        image: args.image,
        lastLoginAt: now,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      provider: args.provider,
      providerAccountId: args.providerAccountId,
      email: args.email,
      name: args.name,
      image: args.image,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    });
  },
});
