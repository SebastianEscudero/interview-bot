'use client';

import { Thread } from "@/components/assistant-ui/thread";
import { ChatRuntimeProvider } from "@/lib/chat-runtime";

export default function Home() {
  // Generate sessionId on client side to prevent hydration issues
  const sessionId = `interview_${Date.now()}`;

  return (
    <ChatRuntimeProvider sessionId={sessionId}>
      <div className="grid h-dvh gap-x-2 px-4 py-4">
          <div className="flex-1 min-h-0">
            <Thread />
          </div>
      </div>
    </ChatRuntimeProvider>
  );
}
