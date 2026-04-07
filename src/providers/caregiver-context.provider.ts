import { APP_CONFIG, ENV_KEYS } from "../constants/app.constants";

const getConfigValue = (key: string, fallback: string): string => process.env[key] ?? fallback;

export const caregiverContextProvider = {
  name: "CAREGIVER_CONTEXT",
  description: "Provides baseline runtime context used across Healthimus interactions.",
  get: async () => {
    const appName = getConfigValue(ENV_KEYS.appName, APP_CONFIG.name);
    const timezone = getConfigValue(ENV_KEYS.timezone, APP_CONFIG.defaultTimezone);

    return {
      text: `Assistant=${appName}; Timezone=${timezone}; Mode=caregiver-support`,
      values: {
        appName,
        timezone,
      },
    };
  },
};
