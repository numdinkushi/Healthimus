import { NextResponse } from "next/server";

import { getAnonymousUserId, getConfiguredAgentId } from "@/lib/env/server";
import { createMessagingSession, listAgents } from "@/lib/server/eliza-server-client";

type Body = {
  agentId?: string;
  userId?: string;
};

const resolveAgentId = async (requested?: string): Promise<string> => {
  if (requested?.trim()) {
    return requested.trim();
  }
  const fromEnv = getConfiguredAgentId();
  if (fromEnv) {
    return fromEnv;
  }
  const agents = await listAgents();
  const active = agents.find((a) => a.status === "active") ?? agents[0];
  if (!active?.id) {
    throw new Error("No agent available. Set HEALTHIMUS_AGENT_ID or start the Eliza runtime.");
  }
  return active.id;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const agentId = await resolveAgentId(body.agentId);
    const userId = body.userId?.trim() || getAnonymousUserId();
    const session = await createMessagingSession({ agentId, userId });
    return NextResponse.json({ ok: true as const, session });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { ok: false as const, error: message },
      { status: 502 },
    );
  }
}
