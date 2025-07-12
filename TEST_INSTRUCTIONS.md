# Test the Interview Bot

## 🚀 Quick Test
1. Visit http://localhost:3001
2. Try these test scenarios:

### Test 1: New Tool Discovery
**Say:** "I use a tool called Windsurf for debugging"
**Expected:** AI should ask follow-up questions and automatically update the worldview

### Test 2: Contradiction Detection  
**Say:** "I actually use Cursor for observability and monitoring"
**Expected:** AI should probe deeper (we currently think Cursor doesn't support observability)

### Test 3: Natural Conclusion
**Say:** "Thanks, that covers all my AI tool usage"
**Expected:** AI should wrap up and update worldview

## 🔍 What to Check
- **Console logs**: Look for "AI updating worldview" messages
- **preliminary-view.json**: Should be automatically updated with new tools
- **Conversation flow**: Natural, investigative interview style

## ✅ Assignment Success Criteria
- ✅ Chatbot conducts market research interviews
- ✅ Learns from industry participants  
- ✅ Updates "worldview" (preliminary-view.json) based on conversations
- ✅ Simple, clean implementation focused on core requirements

**The system demonstrates: conversation → AI analysis → worldview updates**