import { NextResponse } from "next/server";

import { getAnonymousUserId, getConfiguredAgentId } from "@/lib/env/server";
import { extractAgentReplyText } from "@/lib/utils/agent-response";
import {
  createMessagingSession,
  listAgents,
  sendSessionMessage,
} from "@/lib/server/eliza-server-client";

type Body = {
  message?: string;
  sessionId?: string;
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
    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json(
        { ok: false as const, error: "message is required" },
        { status: 400 },
      );
    }

    const userId = body.userId?.trim() || getAnonymousUserId();
    let sessionId = body.sessionId?.trim();

    if (!sessionId) {
      const agentId = await resolveAgentId(body.agentId);
      const created = await createMessagingSession({ agentId, userId });
      sessionId = created.sessionId;
    }

    const chat = await sendSessionMessage({ sessionId, content: message });
    const replyText = extractAgentReplyText(chat.agentResponse);

    return NextResponse.json({
      ok: true as const,
      sessionId,
      reply: replyText,
      raw: chat,
    });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { ok: false as const, error: messageText },
      { status: 502 },
    );
  }
}
