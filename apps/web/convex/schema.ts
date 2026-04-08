import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    provider: v.string(),
    providerAccountId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    lastLoginAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_provider_account", ["provider", "providerAccountId"])
    .index("by_email", ["email"]),
  symptomLogs: defineTable({
    ownerToken: v.string(),
    careRecipientLabel: v.optional(v.string()),
    symptom: v.string(),
    severity: v.string(),
    note: v.optional(v.string()),
    loggedAt: v.number(),
  }).index("by_owner", ["ownerToken"]),
});
