# Extra thoughts & Notes

This is a very small demo of what could be a world-view updating interview bot.
Since it's a chat interface i decided that it should save based on when it feels
the interview is finishing so i gave the AI the update world view tool.
Now in practice in an ai voice agent you'd call for the update once a call is done
and make an AI analyze if we should update the world view or not.

For development i used assistant-ui for chat libraries it's a yc startup (https://www.assistant-ui.com/)
ran gpt-4.1 for the underlying model and next for the framework to spin this up quickly.

Also as you test it out it edits the data/preliminary-view.json file with contradictions and new tools you mention. So if you want
to test it from scratch each time revert it to it's original state (the one in the repository).

Below is a little technical dive:

# AI Tools Interview Bot - Development Notes

## Project Overview

Built a clean, focused prototype that fulfills the assignment requirements: **a chatbot that conducts market research interviews and updates a "worldview" based on learnings**. Simple and effective implementation without unnecessary complexity.

## Technical Architecture

### Core Stack
- **Next.js 15.3.5** with TypeScript - Modern React framework with App Router
- **@assistant-ui/react** ecosystem - Professional ChatGPT-style interface components
- **OpenAI GPT-4.1** via @ai-sdk/openai - LLM integration with streaming responses
- **Tailwind CSS 4** with oklch color system - Modern styling approach
- **Vercel AI SDK** - Streamlined AI application development

### Key Dependencies
- `@assistant-ui/react-ai-sdk` - Bridge between assistant-ui and AI SDK
- `@assistant-ui/react-markdown` - Rich markdown rendering with GitHub Flavored Markdown
- `remark-gfm` - Enhanced markdown parsing for tables, strikethrough, etc.
- `tw-animate-css` - Smooth animations and transitions

## Core Features (Assignment Requirements)

### ✅ Market Research Interview Bot
- Professional ChatGPT-style interface using @assistant-ui/react
- Natural conversation flow about AI tools for software development
- Follows interview guide to validate preliminary view
- Asks good follow-up questions and investigates contradictions

### ✅ AI-Controlled Worldview Updating
- **Key Achievement**: AI autonomously decides when to update the preliminary view
- Uses OpenAI function calling with simple `updateWorldview` tool
- AI triggers updates when:
  - New tools mentioned (adds them to preliminary-view.json)
  - Contradictions discovered (logs for investigation)
  - Interview naturally concludes

### ✅ Learning System
- Simple but effective: `preliminary-view.json` gets updated automatically
- No complex metadata or storage - just focused learning
- ~50 lines of core logic vs 300+ lines we had before
- Demonstrates the key concept: conversation → insights → worldview updates

### Technical
- @assistant-ui/react provides excellent ChatGPT-like UX out of the box
- oklch color system offers superior color consistency across devices
- Next.js 15 with Turbopack significantly improves development experience
- Proper TypeScript interfaces prevent many runtime issues

### UX/Product
- Professional UI is crucial for user trust in interview scenarios
- Natural conversation flow more important than rigid question sequences
- Contradiction detection is key differentiator from simple chatbots
- Welcome suggestions help users get started quickly