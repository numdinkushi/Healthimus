import { fetchJson } from "@/lib/http/fetch-json";
import { getAgentBaseUrl } from "@/lib/env/server";

const joinUrl = (path: string): string => {
  const base = getAgentBaseUrl().replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

export type ElizaAgentSummary = {
  id: string;
  name: string;
  characterName: string;
  bio: string;
  status: string;
};

export type ElizaAgentsResponse = {
  success: boolean;
  data: { agents: ElizaAgentSummary[] };
};

export type ElizaSessionCreateResponse = {
  sessionId: string;
  channelId: string;
  agentId: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

export type ElizaChatResponse = {
  success: boolean;
  userMessage?: unknown;
  agentResponse?: unknown;
  sessionStatus?: unknown;
  error?: string;
};

export async function listAgents(): Promise<ElizaAgentSummary[]> {
  const result = await fetchJson<ElizaAgentsResponse>(joinUrl("/api/agents"), {
    method: "GET",
  });
  if (!result.ok) {
    throw new Error(`Failed to list agents: ${result.status}`);
  }
  if (!result.data.success || !result.data.data?.agents) {
    throw new Error("Unexpected agents response shape");
  }
  return result.data.data.agents;
}

export async function createMessagingSession(input: {
  agentId: string;
  userId: string;
}): Promise<ElizaSessionCreateResponse> {
  const result = await fetchJson<ElizaSessionCreateResponse>(
    joinUrl("/api/messaging/sessions"),
    {
      method: "POST",
      body: JSON.stringify({
        agentId: input.agentId,
        userId: input.userId,
      }),
    },
  );
  if (!result.ok) {
    throw new Error(
      `Failed to create session: ${result.status} ${JSON.stringify(result.body)}`,
    );
  }
  return result.data;
}

export async function sendSessionMessage(input: {
  sessionId: string;
  content: string;
}): Promise<ElizaChatResponse> {
  const result = await fetchJson<ElizaChatResponse>(
    joinUrl(`/api/messaging/sessions/${input.sessionId}/messages`),
    {
      method: "POST",
      body: JSON.stringify({
        content: input.content,
        transport: "http",
      }),
    },
  );
  if (!result.ok) {
    throw new Error(
      `Failed to send message: ${result.status} ${JSON.stringify(result.body)}`,
    );
  }
  return result.data;
}
