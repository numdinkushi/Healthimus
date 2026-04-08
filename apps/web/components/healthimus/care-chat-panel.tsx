"use client";

import { Loader2, MessageSquare, RotateCcw, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHealthimusAgents } from "@/hooks/use-healthimus-agents";
import { useHealthimusChat } from "@/hooks/use-healthimus-chat";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const CareChatPanel = ({ className }: Props) => {
  const { agents, loading: agentsLoading, error: agentsError } =
    useHealthimusAgents();
  const [agentId, setAgentId] = useState<string>("");
  const { messages, sending, error, send, resetConversation, sessionId } =
    useHealthimusChat({
      agentId: agentId || undefined,
    });
  const [draft, setDraft] = useState("");

  const onSend = async () => {
    await send(draft);
    setDraft("");
  };

  return (
    <Card className={cn("healthimus-glass overflow-hidden", className)}>
      <CardHeader className="border-b bg-muted/20">
        <div className="flex items-start gap-3">
          <div className="bg-primary/15 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
            <MessageSquare className="size-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-lg">AI assistant</CardTitle>
            <CardDescription>
              Routed via Next.js API → Eliza session (
              <span className="font-mono text-[11px]">
                {sessionId ?? "new on first send"}
              </span>
              )
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        <div className="space-y-2">
          <Label htmlFor="agent" className="text-xs font-medium">
            Agent ID
          </Label>
          <Input
            id="agent"
            list="healthimus-agent-options"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={
              agentsLoading ? "Loading agents…" : "Paste UUID or pick below"
            }
            disabled={agentsLoading}
            className="font-mono text-xs"
          />
          <datalist id="healthimus-agent-options">
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name || a.id} ({a.status})
              </option>
            ))}
          </datalist>
          {agentsError ? (
            <p className="text-destructive text-xs">{agentsError}</p>
          ) : null}
        </div>

        <div className="bg-muted/30 max-h-[min(420px,50vh)] space-y-3 overflow-y-auto rounded-xl border p-4">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ask for a <strong>care brief</strong>, log a <strong>symptom</strong>
              , or request medication reminders. Responses come from your
              Healthimus agent runtime.
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-card border mr-auto",
                )}
              >
                <div
                  className={cn(
                    "mb-1 text-[10px] font-semibold uppercase tracking-wide opacity-80",
                    m.role === "user" ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {m.role === "user" ? "You" : "Healthimus"}
                </div>
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            ))
          )}
        </div>

        {error ? (
          <p className="text-destructive text-sm">{error}</p>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="msg">Message</Label>
          <Textarea
            id="msg"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="e.g. Generate a doctor brief from the last 48 hours of symptoms."
            rows={4}
            disabled={sending}
            className="resize-none rounded-xl"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              className="rounded-xl"
              onClick={() => void onSend()}
              disabled={sending || !draft.trim()}
            >
              {sending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Send className="mr-2 size-4" />
              )}
              Send
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={resetConversation}
              disabled={sending}
            >
              <RotateCcw className="mr-2 size-4" />
              New session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
