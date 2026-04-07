import type { SymptomLog } from "./symptom.types";

export type CareEvent = {
  id: string;
  createdAtIso: string;
  symptom: SymptomLog;
};
