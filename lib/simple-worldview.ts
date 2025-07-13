import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PRELIMINARY_VIEW_PATH = join(process.cwd(), 'data', 'preliminary-view.json');

export async function updateWorldview(findings: {
  new_tools: string[];
  contradictions: Array<{tool: string; capability: string; description: string}>;
  interview_complete: boolean;
}) {
  try {
    console.log('🔍 Starting worldview update...');
    const currentView = JSON.parse(readFileSync(PRELIMINARY_VIEW_PATH, 'utf-8'));
    console.log('📖 Current view loaded, existing tools:', Object.keys(currentView.tools));
    console.log('🎯 Direct findings received:', JSON.stringify(findings, null, 2));

    // Update the view
    let updated = false;

    // Add new tools
    console.log('🔧 Processing new tools...');
    findings.new_tools.forEach(toolName => {
      const toolKey = toolName.toLowerCase().replace(/\s+/g, '_');
      console.log(`- Checking tool: "${toolName}" (key: "${toolKey}")`);
      if (!currentView.tools[toolKey]) {
        console.log(`✅ Adding new tool: ${toolName}`);
        currentView.tools[toolKey] = {
          name: toolName,
          supports: [],
          does_not_support: []
        };
        updated = true;
      } else {
        console.log(`⚠️ Tool already exists: ${toolName}`);
      }
    });

    // Track contradictions (for now just log them - could add to a separate file)
    if (findings.contradictions.length > 0) {
      console.log('⚡ Contradictions found:', findings.contradictions);
      updated = true;
    }

    if (updated) {
      console.log('💾 Writing updated view to file...');
      writeFileSync(PRELIMINARY_VIEW_PATH, JSON.stringify(currentView, null, 2));
      console.log('✅ File updated successfully!');
    } else {
      console.log('ℹ️ No updates needed.');
    }

    return {
      success: true,
      new_tools: findings.new_tools,
      contradictions: findings.contradictions,
      interview_complete: findings.interview_complete,
      updated
    };

  } catch (error) {
    console.error('Error updating worldview:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}