import { ACTION_NAMES, ACTION_SIMILES } from "../../../constants/action.constants";
import { dependencies } from "../../../bootstrap/dependencies";
import type { ActionMessage } from "../../../types/action.types";

export const logSymptomAction = {
  name: ACTION_NAMES.logSymptom,
  description:
    "Logs a symptom report from caregiver input and returns a structured triage recommendation.",
  similes: [...ACTION_SIMILES.logSymptom],
  validate: async (_runtime: unknown, message: ActionMessage) =>
    Boolean(message?.content?.text?.trim()),
  handler: async (_runtime: unknown, message: ActionMessage) => {
    const sourceText = message?.content?.text ?? "";
    const { symptomLog, recommendation } = await dependencies.symptomService.logSymptom(sourceText);

    return {
      success: true,
      text: `Logged symptom "${symptomLog.symptom}" with ${symptomLog.severity} priority. ${recommendation}`,
      data: {
        symptomLog,
        recommendation,
      },
    };
  },
  examples: [],
};
