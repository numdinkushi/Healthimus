import { PriorityLevel } from "../enums/priority.enum";
import type { SymptomLog } from "../types/symptom.types";
import { getIsoNow } from "../helpers/date.helper";
import { createId } from "../helpers/id.helper";
import { normalizeText, toLower } from "./text.util";
import { SYMPTOM_PRIORITY_TOKENS } from "../constants/symptom.constants";

export const parseSymptomMessage = (rawText: string): SymptomLog => {
  const normalized = normalizeText(rawText);
  const lowered = toLower(normalized);
  const severity =
    Object.entries(SYMPTOM_PRIORITY_TOKENS).find(([token]) => lowered.includes(token))?.[1] ??
    PriorityLevel.Medium;

  return {
    id: createId(),
    symptom: normalized,
    severity,
    note: `Captured from user message: "${normalized}"`,
    loggedAtIso: getIsoNow(),
  };
};
