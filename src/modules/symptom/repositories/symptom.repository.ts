import type { SymptomLog } from "../../../types/symptom.types";

export interface SymptomRepository {
  save(entry: SymptomLog): Promise<void>;
  listRecent(limit: number): Promise<SymptomLog[]>;
}
