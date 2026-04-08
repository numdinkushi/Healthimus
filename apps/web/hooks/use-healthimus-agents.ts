"use client";

import { useCallback, useEffect, useState } from "react";

import { API_PATHS } from "@/lib/constants/api-paths";
import type { AgentsApiResponse } from "@/lib/types/healthimus-api";

export const useHealthimusAgents = () => {
  const [agents, setAgents] = useState<{ id: string; name: string; status: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_PATHS.agents);
      const data = (await res.json()) as AgentsApiResponse;
      if (!data.ok) {
        setError(data.error);
        setAgents([]);
        return;
      }
      setAgents(data.agents);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load agents");
      setAgents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { agents, loading, error, refresh };
};
