export const APP_CONFIG = {
  name: "Healthimus",
  pluginName: "healthimus-plugin",
  pluginDescription:
    "Personal caregiver copilot plugin for health tracking and care coordination.",
  defaultTimezone: "UTC",
} as const;

export const ENV_KEYS = {
  appName: "HEALTHIMUS_APP_NAME",
  timezone: "HEALTHIMUS_TIMEZONE",
} as const;
