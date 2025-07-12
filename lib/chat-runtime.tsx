"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import type { ReactNode } from "react";

export function ChatRuntimeProvider({ 
  children, 
  sessionId 
}: { 
  children: ReactNode;
  sessionId: string;
}) {
  const runtime = useChatRuntime({
    api: "/api/chat",
    body: {
      sessionId,
    },
    onError: (error) => {
      console.error('Chat runtime error:', error);
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}