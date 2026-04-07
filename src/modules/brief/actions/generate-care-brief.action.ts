import { CARE_BRIEF_SECTIONS } from "../../../constants/agent.constants";

type ActionMessage = {
  content?: {
    text?: string;
  };
};

const getBriefTemplate = (contextText: string): string =>
  [
    `Patient Update: ${contextText}`,
    ...CARE_BRIEF_SECTIONS.map((section) => `- ${section}:`),
  ].join("\n");

export const generateCareBriefAction = {
  name: "GENERATE_CARE_BRIEF",
  description:
    "Generates a concise doctor-ready care brief from caregiver context and recent notes.",
  similes: ["DOCTOR_SUMMARY", "VISIT_PREP", "CARE_BRIEF"],
  validate: async (_runtime: unknown, message: ActionMessage) =>
    Boolean(message?.content?.text?.trim()),
  handler: async (_runtime: unknown, message: ActionMessage) => {
    const contextText = message?.content?.text ?? "No context provided";
    const brief = getBriefTemplate(contextText);
    console.log("[Healthimus] Care brief generated:\n", brief);
    return;
  },
  examples: [],
};
