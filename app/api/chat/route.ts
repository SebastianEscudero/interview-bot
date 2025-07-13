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
          description: 'Update the preliminary worldview with specific findings. Use when you discover new tools, contradictions, or the interview concludes.',
          parameters: z.object({
            new_tools: z.array(z.string()).describe('Names of new AI tools mentioned that are not in our current view'),
            contradictions: z.array(z.object({
              tool: z.string(),
              capability: z.string(),
              description: z.string()
            })).describe('Cases where user says a tool does something we think it doesn\'t support'),
            interview_complete: z.boolean().describe('True if the conversation has naturally concluded'),
            reason: z.string().describe('Brief explanation of why you are updating')
          }),
          execute: async ({ new_tools, contradictions, interview_complete, reason }) => {
            console.log(`AI updating worldview: ${reason}`);
            const result = await updateWorldview({ new_tools, contradictions, interview_complete });
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