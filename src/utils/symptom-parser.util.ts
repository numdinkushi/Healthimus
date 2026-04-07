import { PriorityLevel } from "../enums/priority.enum";
import type { SymptomLog } from "../types/symptom.types";
import { getIsoNow } from "../helpers/date.helper";
import { normalizeText, toLower } from "./text.util";

const severityTokenMap: Record<string, PriorityLevel> = {
  low: PriorityLevel.Low,
  mild: PriorityLevel.Low,
  medium: PriorityLevel.Medium,
  moderate: PriorityLevel.Medium,
  high: PriorityLevel.High,
  severe: PriorityLevel.High,
  critical: PriorityLevel.Critical,
};

export const parseSymptomMessage = (rawText: string): SymptomLog => {
  const normalized = normalizeText(rawText);
  const lowered = toLower(normalized);
  const severity =
    Object.entries(severityTokenMap).find(([token]) => lowered.includes(token))?.[1] ??
    PriorityLevel.Medium;

  return {
    symptom: normalized,
    severity,
    note: `Captured from user message: "${normalized}"`,
    loggedAtIso: getIsoNow(),
  };
};
