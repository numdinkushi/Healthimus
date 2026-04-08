import { getConvexHttpActionsUrl, getConvexSyncSecret } from "@/lib/env/server";

type SyncUserInput = {
  provider: string;
  providerAccountId: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

export const syncUserToConvex = async (input: SyncUserInput): Promise<void> => {
  const baseUrl = getConvexHttpActionsUrl();
  if (!baseUrl) {
    return;
  }

  const syncSecret = getConvexSyncSecret();
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/auth/upsert-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(syncSecret ? { "x-healthimus-sync-secret": syncSecret } : {}),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Convex user sync failed (${res.status}): ${text}`);
  }
};
