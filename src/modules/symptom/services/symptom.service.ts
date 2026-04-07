import { SYMPTOM_ESCALATION_BY_PRIORITY } from "../../../constants/symptom.constants";
import type { SymptomLog } from "../../../types/symptom.types";
import { parseSymptomMessage } from "../../../utils/symptom-parser.util";
import type { SymptomRepository } from "../repositories/symptom.repository";

export type LoggedSymptomResult = {
  symptomLog: SymptomLog;
  recommendation: string;
};

export class SymptomService {
  public constructor(private readonly repository: SymptomRepository) {}

  async logSymptom(rawMessage: string): Promise<LoggedSymptomResult> {
    const symptomLog = parseSymptomMessage(rawMessage);
    const recommendation = SYMPTOM_ESCALATION_BY_PRIORITY[symptomLog.severity];

    await this.repository.save(symptomLog);
    return { symptomLog, recommendation };
  }

  async getRecentSymptoms(limit: number): Promise<SymptomLog[]> {
    return this.repository.listRecent(limit);
  }
}
 