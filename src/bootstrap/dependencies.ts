import { CareBriefService } from "../modules/brief/services/care-brief.service";
import { InMemorySymptomRepository } from "../modules/symptom/repositories/in-memory-symptom.repository";
import { SymptomService } from "../modules/symptom/services/symptom.service";

const symptomRepository = new InMemorySymptomRepository();
const symptomService = new SymptomService(symptomRepository);
const careBriefService = new CareBriefService(symptomService);

export const dependencies = {
  symptomRepository,
  symptomService,
  careBriefService,
} as const;
