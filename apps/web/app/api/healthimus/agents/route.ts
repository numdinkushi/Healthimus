import { NextResponse } from "next/server";

import { listAgents } from "@/lib/server/eliza-server-client";

export async function GET() {
  try {
    const agents = await listAgents();
    return NextResponse.json({ ok: true as const, agents });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { ok: false as const, error: message },
      { status: 502 },
    );
  }
}
