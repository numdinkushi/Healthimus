import { PriorityLevel } from "../enums/priority.enum";

export type SymptomLog = {
  symptom: string;
  severity: PriorityLevel;
  note: string;
  loggedAtIso: string;
};
