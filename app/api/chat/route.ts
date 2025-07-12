import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/interview-prompts';
import { updateWorldview } from '@/lib/simple-worldview';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4.1'),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
      tools: {
        updateWorldview: tool({
          description: 'Update the preliminary worldview based on interview insights. Use when you discover contradictions, new tools, or the interview concludes.',
          parameters: z.object({
            reason: z.string().describe('Why you are updating the worldview')
          }),
          execute: async ({ reason }) => {
            console.log(`AI updating worldview: ${reason}`);
            const result = await updateWorldview(messages);
            return result;
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}