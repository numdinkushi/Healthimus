import { CareChatPanel } from "@/components/healthimus/care-chat-panel";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">AI assistant</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Chat with your Eliza agent through the secure API bridge. Start the
          agent locally (port 3000) and run Next on another port (e.g. 3001).
        </p>
      </header>
      <CareChatPanel />
    </div>
  );
}
