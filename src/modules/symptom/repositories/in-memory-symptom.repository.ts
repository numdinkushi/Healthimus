import type { SymptomRepository } from "./symptom.repository";
import type { SymptomLog } from "../../../types/symptom.types";

export class InMemorySymptomRepository implements SymptomRepository {
  private readonly events: SymptomLog[] = [];

  async save(entry: SymptomLog): Promise<void> {
    this.events.unshift(entry);
  }

  async listRecent(limit: number): Promise<SymptomLog[]> {
    return this.events.slice(0, Math.max(0, limit));
  }
}
