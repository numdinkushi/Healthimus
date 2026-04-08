import { ENV_KEYS } from "@/lib/constants/env-keys";

const DEFAULT_AGENT_URL = "http://localhost:3000";
const DEFAULT_ANONYMOUS_USER =
  "00000000-0000-4000-8000-000000000001";

export const getAgentBaseUrl = (): string =>
  process.env[ENV_KEYS.agentBaseUrl]?.trim() || DEFAULT_AGENT_URL;

export const getConfiguredAgentId = (): string | undefined =>
  process.env[ENV_KEYS.agentId]?.trim() || undefined;

export const getAnonymousUserId = (): string =>
  process.env[ENV_KEYS.anonymousUserId]?.trim() || DEFAULT_ANONYMOUS_USER;

export const getConvexUrl = (): string | undefined =>
  process.env[ENV_KEYS.convexUrl]?.trim() || undefined;

export const getConvexHttpActionsUrl = (): string | undefined =>
  process.env[ENV_KEYS.convexHttpActionsUrl]?.trim() || undefined;

export const getConvexSyncSecret = (): string | undefined =>
  process.env[ENV_KEYS.convexSyncSecret]?.trim() || undefined;
