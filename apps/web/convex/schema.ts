import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_token", ["tokenIdentifier"]),
  symptomLogs: defineTable({
    ownerToken: v.string(),
    careRecipientLabel: v.optional(v.string()),
    symptom: v.string(),
    severity: v.string(),
    note: v.optional(v.string()),
    loggedAt: v.number(),
  }).index("by_owner", ["ownerToken"]),
});
