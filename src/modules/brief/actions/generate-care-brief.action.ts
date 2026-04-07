import { dependencies } from "../../../bootstrap/dependencies";
import { ACTION_NAMES, ACTION_SIMILES } from "../../../constants/action.constants";
import type { ActionMessage } from "../../../types/action.types";

export const generateCareBriefAction = {
  name: ACTION_NAMES.generateCareBrief,
  description:
    "Generates a concise doctor-ready care brief from caregiver context and recent notes.",
  similes: [...ACTION_SIMILES.generateCareBrief],
  validate: async (_runtime: unknown, message: ActionMessage) =>
    Boolean(message?.content?.text?.trim()),
  handler: async (_runtime: unknown, message: ActionMessage) => {
    const contextText = message?.content?.text ?? "No context provided";
    const brief = await dependencies.careBriefService.generate(contextText);

    return {
      success: true,
      text: brief,
      data: {
        contextText,
      },
    };
  },
  examples: [],
};
