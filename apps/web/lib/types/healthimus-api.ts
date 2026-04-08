export type AgentsApiResponse =
  | { ok: true; agents: { id: string; name: string; status: string }[] }
  | { ok: false; error: string };

export type ChatApiResponse =
  | {
      ok: true;
      sessionId: string;
      reply: string;
      raw: unknown;
    }
  | { ok: false; error: string };

export type SessionApiResponse =
  | {
      ok: true;
      session: {
        sessionId: string;
        channelId: string;
        agentId: string;
        userId: string;
      };
    }
  | { ok: false; error: string };
