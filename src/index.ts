import { type Plugin } from "@elizaos/core";
import { APP_CONFIG } from "./constants/app.constants";
import { generateCareBriefAction } from "./modules/brief/actions/generate-care-brief.action";
import { logSymptomAction } from "./modules/symptom/actions/log-symptom.action";
import { caregiverContextProvider } from "./providers/caregiver-context.provider";

export const healthimusPlugin: Plugin = {
  name: APP_CONFIG.pluginName,
  description: APP_CONFIG.pluginDescription,
  actions: [logSymptomAction, generateCareBriefAction],
  providers: [caregiverContextProvider],
  evaluators: [],
};

export default healthimusPlugin;
