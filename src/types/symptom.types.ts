import { PriorityLevel } from "../enums/priority.enum";

export type SymptomLog = {
  id: string;
  symptom: string;
  severity: PriorityLevel;
  note: string;
  loggedAtIso: string;
};
