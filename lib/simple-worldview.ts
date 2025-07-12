import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const PRELIMINARY_VIEW_PATH = join(process.cwd(), 'data', 'preliminary-view.json');

const UpdateSchema = z.object({
  new_tools: z.array(z.string()).describe('Names of new AI tools mentioned that are not in our current view'),
  contradictions: z.array(z.object({
    tool: z.string(),
    capability: z.string(),
    description: z.string()
  })).describe('Cases where user says a tool does something we think it doesn\'t support'),
  interview_complete: z.boolean().describe('True if the conversation has naturally concluded')
});

export async function updateWorldview(messages: Array<{role: string, content: string}>) {
  try {
    const conversationText = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
    const currentView = JSON.parse(readFileSync(PRELIMINARY_VIEW_PATH, 'utf-8'));

    const { object } = await generateObject({
      model: openai('gpt-4.1'),
      system: `You are analyzing an interview about AI tools. Extract key findings that should update our preliminary view.

CURRENT VIEW: ${JSON.stringify(currentView, null, 2)}

Focus on:
1. New tools mentioned that aren't in our list
2. Contradictions (user says a tool does something we think it doesn't support)
3. Whether the interview is complete`,
      prompt: conversationText,
      schema: UpdateSchema,
    });

    // Update the view
    let updated = false;

    // Add new tools
    object.new_tools.forEach(toolName => {
      const toolKey = toolName.toLowerCase().replace(/\s+/g, '_');
      if (!currentView.tools[toolKey]) {
        currentView.tools[toolKey] = {
          name: toolName,
          supports: [],
          does_not_support: []
        };
        updated = true;
      }
    });

    // Track contradictions (for now just log them - could add to a separate file)
    if (object.contradictions.length > 0) {
      console.log('Contradictions found:', object.contradictions);
      updated = true;
    }

    if (updated) {
      writeFileSync(PRELIMINARY_VIEW_PATH, JSON.stringify(currentView, null, 2));
    }

    return {
      success: true,
      new_tools: object.new_tools,
      contradictions: object.contradictions,
      interview_complete: object.interview_complete,
      updated
    };

  } catch (error) {
    console.error('Error updating worldview:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}