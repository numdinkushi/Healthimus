import { PriorityLevel } from "../../../enums/priority.enum";
import { parseSymptomMessage } from "../../../utils/symptom-parser.util";

type ActionMessage = {
  content?: {
    text?: string;
  };
};

const escalationBySeverity: Record<PriorityLevel, string> = {
  [PriorityLevel.Low]: "Monitor and re-check later in the day.",
  [PriorityLevel.Medium]: "Track every few hours and include in the daily summary.",
  [PriorityLevel.High]: "Escalate to caregiver now and prepare doctor note.",
  [PriorityLevel.Critical]:
    "Immediate escalation recommended. Contact emergency care if urgent symptoms persist.",
};

export const logSymptomAction = {
  name: "LOG_SYMPTOM",
  description:
    "Logs a symptom report from caregiver input and returns a structured triage recommendation.",
  similes: ["TRACK_SYMPTOM", "SYMPTOM_CHECKIN", "HEALTH_LOG"],
  validate: async (_runtime: unknown, message: ActionMessage) =>
    Boolean(message?.content?.text?.trim()),
  handler: async (_runtime: unknown, message: ActionMessage) => {
    const sourceText = message?.content?.text ?? "";
    const symptomLog = parseSymptomMessage(sourceText);
    const recommendation = escalationBySeverity[symptomLog.severity];

    console.log("[Healthimus] Symptom log:", symptomLog);
    console.log("[Healthimus] Recommendation:", recommendation);
    return;
  },
  examples: [],
};
