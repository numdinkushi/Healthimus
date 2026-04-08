export const extractAgentReplyText = (agentResponse: unknown): string => {
  if (agentResponse === null || agentResponse === undefined) {
    return "";
  }
  if (typeof agentResponse === "string") {
    return agentResponse;
  }
  if (typeof agentResponse === "object" && "text" in agentResponse) {
    const text = (agentResponse as { text?: unknown }).text;
    if (typeof text === "string") {
      return text;
    }
  }
  try {
    return JSON.stringify(agentResponse);
  } catch {
    return String(agentResponse);
  }
};
