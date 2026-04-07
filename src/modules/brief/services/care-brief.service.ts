import { CARE_BRIEF_SECTIONS } from "../../../constants/agent.constants";
import { SYMPTOM_DEFAULT_LIMIT } from "../../../constants/symptom.constants";
import type { SymptomService } from "../../symptom/services/symptom.service";

export class CareBriefService {
  public constructor(private readonly symptomService: SymptomService) {}

  async generate(contextText: string): Promise<string> {
    const recentSymptoms = await this.symptomService.getRecentSymptoms(SYMPTOM_DEFAULT_LIMIT);
    const symptomLines =
      recentSymptoms.length === 0
        ? ["- No symptom logs recorded yet."]
        : recentSymptoms.map(
            (event) => `- ${event.loggedAtIso} | ${event.severity.toUpperCase()} | ${event.symptom}`,
          );

    return [
      `Patient Update: ${contextText}`,
      "",
      "Recent Symptom Timeline:",
      ...symptomLines,
      "",
      ...CARE_BRIEF_SECTIONS.map((section) => `- ${section}:`),
    ].join("\n");
  }
}
