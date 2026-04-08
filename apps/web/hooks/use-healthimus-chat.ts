"use client";

import { useCallback, useState } from "react";

import { API_PATHS } from "@/lib/constants/api-paths";
import type { ChatApiResponse } from "@/lib/types/healthimus-api";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export const useHealthimusChat = (options?: {
  agentId?: string;
}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      const userMsg: ChatMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setSending(true);
      setError(null);

      try {
        const res = await fetch(API_PATHS.chat, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId: sessionId ?? undefined,
            agentId: options?.agentId,
          }),
        });
        const data = (await res.json()) as ChatApiResponse;
        if (!data.ok) {
          setError(data.error);
          return;
        }
        setSessionId(data.sessionId);
        const assistantMsg: ChatMessage = {
          id: createId(),
          role: "assistant",
          content: data.reply || "(No response text)",
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Request failed");
      } finally {
        setSending(false);
      }
    },
    [options?.agentId, sessionId],
  );

  const resetConversation = useCallback(() => {
    setSessionId(null);
    setMessages([]);
    setError(null);
  }, []);

  return {
    sessionId,
    messages,
    sending,
    error,
    send,
    resetConversation,
  };
};
