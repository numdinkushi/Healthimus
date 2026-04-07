import { PriorityLevel } from "../enums/priority.enum";

export const SYMPTOM_DEFAULT_LIMIT = 10;

export const SYMPTOM_ESCALATION_BY_PRIORITY: Record<PriorityLevel, string> = {
  [PriorityLevel.Low]: "Monitor and re-check later in the day.",
  [PriorityLevel.Medium]: "Track every few hours and include in the daily summary.",
  [PriorityLevel.High]: "Escalate to caregiver now and prepare doctor note.",
  [PriorityLevel.Critical]:
    "Immediate escalation recommended. Contact emergency care if urgent symptoms persist.",
};

export const SYMPTOM_PRIORITY_TOKENS: Record<string, PriorityLevel> = {
  low: PriorityLevel.Low,
  mild: PriorityLevel.Low,
  medium: PriorityLevel.Medium,
  moderate: PriorityLevel.Medium,
  high: PriorityLevel.High,
  severe: PriorityLevel.High,
  critical: PriorityLevel.Critical,
};
