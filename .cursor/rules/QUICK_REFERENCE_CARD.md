# ⚡ Quick Reference Card - Neural-Core Coding Protocol
**Print or Pin This** - Use during EVERY coding session

---

## 🚦 BEFORE YOU START

```
[ ] What is user's actual goal? (Be specific!)
[ ] Does my plan serve that goal DIRECTLY?
[ ] What's my Plan B if this fails?
[ ] What's my max time? (5/15/30/60 min?)
```

**If ANY blank**: Ask user before proceeding

---

## 🔄 EVERY 5 TOOL CALLS

```
[ ] Am I repeating same action?
[ ] Are errors forming a chain (A→B→C)?
[ ] Have I made measurable progress?
[ ] Is there a faster way?
[ ] Should I ask user?
```

**3+ NO = STOP AND REASSESS**

---

## ⏰ EVERY 15 MINUTES

```
🚨 PROGRESS CHECK 🚨

[ ] Can I show user something working?
[ ] Is this progress they'd call "useful"?
[ ] Or am I just "one less error"?
```

**No progress = Trigger Circuit Breaker**

---

## 🛑 AUTOMATIC STOPS (NO EXCEPTIONS)

```
STOP if:
• Same command 3x → Analyze, propose alternatives
• 15 min on one task → Progress checkpoint
• 5 files edited, no test → STOP, test first
• 5 Docker rebuilds → STOP, test locally
• 3 new errors appear → Error chain detected
• 10 failed attempts → Different approach needed
• 30 min no progress → Circuit breaker triggered
• 3 sequential errors → Fix root cause, not symptoms
```

---

## 💻 WHILE CODING

```
[ ] Looked at existing code patterns first?
[ ] Backward compatible? (Don't break what works)
[ ] Type safe? (Proper TS/Python types)
[ ] Performance conscious? (Index/cache/batch)
[ ] No neural-core hardcoding?

[ ] Tests written? (80% coverage min)
[ ] Documented?
```

---

## 🚨 RED FLAGS (STOP IMMEDIATELY)

```
🚩 "Just one more fix..."
🚩 "This should work..."
🚩 "Let me try something else..."
🚩 "Maybe if I..."
🚩 User says "what are you doing?"
🚩 Can't explain what you're doing in 1 sentence
```

---

## 🛑 CIRCUIT BREAKER TEMPLATE

```
🛑 CIRCUIT BREAKER TRIGGERED

What: [action]
Failed: [root cause]
Time: X min
Attempts: Y

Option A (Fast):
Time: 5 min | Pros: quick | Cons: incomplete

Option B (Proper):
Time: 1 hour | Pros: works | Cons: slow

Option C (Reduced):
Time: 10 min | Pros: partial | Cons: limited

Recommendation: Option X

What would you prefer?
```

---

## 📋 SUCCESS CRITERIA CHECKLIST

```
Before marking task DONE:

[ ] Existing features still work? (backward compat)
[ ] No hardcoded project specifics in core?
[ ] Performance maintained/improved?
[ ] Code style consistent?
[ ] Tests pass + 80% coverage?
[ ] User goal fully met?
```

---

## 🎯 MEMORY ACCESS

These are stored in AI memory (use before coding):
- **Loop Prevention** (ID: 10038247)
- **Circuit Breaker** (ID: 10038248)
- **Development Principles** (ID: 10038251)

Trigger them with: "Check my enforcement rules"

---

## ⚡ QUICK DECISION FLOW

```
User says: "Do X"
        ↓
Circuit Breaker: "Serves their goal?"
    YES ↓           NO
        ↓            ↓
    Start        Ask for clarification
        ↓
   Do work
        ↓
 Every 5 calls: "Progress?"
    YES ↓           NO
        ↓           ↓
  Continue      Reassess
        ↓
 Every 15 min: "Measurable result?"
    YES ↓           NO
        ↓            ↓
  Continue    CIRCUIT BREAKER
        ↓
  Task Done
        ↓
Verify success criteria
```

---

## 💡 WHAT TO DO IF STUCK

```
1. STOP (literally stop typing)
2. DOCUMENT (what you tried)
3. ANALYZE (root cause - not symptoms)
4. PROPOSE (2-3 alternatives with time/pros/cons)
5. ASK (user picks direction)
6. COMMIT (execute chosen path, no hedging)
```

---

**Last Updated**: 2025-10-17  
**Status**: ACTIVE - Use every session  
**Binding**: YES - Mandatory compliance
