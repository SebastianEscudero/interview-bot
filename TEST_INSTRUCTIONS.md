# Test the Simplified Interview Bot

## 🚀 Quick Test  
1. Visit http://localhost:3001
2. Try these test scenarios:

### Test 1: New Tool Discovery
**Say:** "I use Claude Code for most of my development work"
**Expected:** AI should call updateWorldview with new_tools: ["Claude Code"]

### Test 2: Contradiction Detection  
**Say:** "I actually use Cursor for observability and monitoring"
**Expected:** AI should call updateWorldview with contradiction about Cursor supporting observability

### Test 3: Multiple Tools
**Say:** "I also use Windsurf for debugging and V0 for UI generation"
**Expected:** AI should add both tools to worldview