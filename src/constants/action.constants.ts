export const ACTION_NAMES = {
  logSymptom: "LOG_SYMPTOM",
  generateCareBrief: "GENERATE_CARE_BRIEF",
} as const;

export const ACTION_SIMILES = {
  logSymptom: ["TRACK_SYMPTOM", "SYMPTOM_CHECKIN", "HEALTH_LOG"],
  generateCareBrief: ["DOCTOR_SUMMARY", "VISIT_PREP", "CARE_BRIEF"],
} as const;
