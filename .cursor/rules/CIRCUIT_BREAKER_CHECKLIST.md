# Circuit Breaker Checklist for AI Agent

## 🚦 Use This Before Every Major Action

### Quick Check (5 seconds):
- [ ] Does this action **directly** contribute to user's stated goal?
- [ ] Have I tried this exact approach before in last 10 actions?
- [ ] Do I have a backup plan if this fails?

**If ANY answer is NO → PAUSE and reassess**

---

## 📊 Progress Metrics

### After Every 5 Tool Calls:
Track these metrics:

| Metric | Current | Threshold | Status |
|--------|---------|-----------|---------|
| Same command runs | ___ / 3 | Max 3 | ⚠️ |
| Minutes on sub-task | ___ / 15 | Max 15 | ⚠️ |
| Files edited without test | ___ / 5 | Max 5 | ⚠️ |
| Docker rebuilds | ___ / 5 | Max 5 | 🛑 |
| New errors introduced | ___ / 3 | Max 3 | 🛑 |

**If ANY threshold exceeded → STOP and present options to user**

---

## 🎯 Goal Alignment Matrix

### User Goal vs Current Action

User said: **"api teszt, valós/prod apik tesztje, majd utána a frontend"**

Translation: **Test APIs, then frontend**

| Action | Aligned? | Priority |
|--------|----------|----------|
| Test /api/search endpoint | ✅ YES | 🔥 HIGH |
| Test /api/documents/:id | ✅ YES | 🔥 HIGH |
| Test /api/system/status | ✅ YES | 🔥 HIGH |
| Fix Docker build | ⚠️ MAYBE | 🔵 MEDIUM |
| Fix GDPR imports | ❌ NO | 🟢 LOW |
| Fix auth endpoints | ❌ NO | 🟢 LOW |
| Test frontend | ✅ YES | 🔥 HIGH |

**Rule**: Only do HIGH priority actions unless user explicitly requests otherwise

---

## 🔄 Loop Detection Patterns

### Pattern 1: Import Error Chain
```
Fix import in A → Error in B → Fix B → Error in C → ...
```
**Detection**: 3+ files edited for import errors
**Action**: STOP, propose creating minimal entry point instead

### Pattern 2: Build-Fix-Build Cycle
```
Build fails → Fix code → Build fails → Fix code → ...
```
**Detection**: 5+ builds without successful startup
**Action**: STOP, test locally first or propose alternative environment

### Pattern 3: Dependency Addition Spiral
```
Add package X → Import error Y → Add package Y → Error Z → ...
```
**Detection**: 3+ dependencies added in sequence
**Action**: STOP, review actual requirements vs available packages

### Pattern 4: Configuration Tweaking
```
Change config A → No change → Tweak A more → No change → ...
```
**Detection**: 3+ edits to same config without measurable effect
**Action**: STOP, the config isn't the problem

---

## 🛑 Mandatory STOP Conditions

### Automatic Stop (No Exceptions):
1. **10 failed attempts** at same general approach
2. **30 minutes** without measurable progress toward user goal
3. **3 error chains** (fixing A causes B causes C)
4. **User confusion signals** ("what are you doing?", "why?", "overview?")

### When STOP Triggered:

#### Template Response:
```markdown
🛑 **Circuit Breaker Triggered**

**What I was trying to do:**
[Brief description]

**What went wrong:**
[Root cause, not symptoms]

**Time spent:** X minutes
**Attempts made:** Y

**Alternative approaches:**

**Option A: [Fast workaround]**
- Time: ~X minutes
- Pros: Quick, gets us to testing
- Cons: Not production-ready
- Status: Ready to implement

**Option B: [Proper fix]**
- Time: ~X hours
- Pros: Solves root cause
- Cons: Takes longer
- Status: Ready to implement

**Option C: [Scope reduction]**
- Time: ~X minutes
- Pros: Focus on what's working
- Cons: Some features won't work
- Status: Ready to implement

**Which approach would you prefer?**
```

---

## ✅ Success Criteria

### For "API Testing" Task:

Must achieve:
- [ ] Can call `/api/search` and get 200 response
- [ ] Can call `/api/documents/:id` and get 200 response
- [ ] Can call `/api/system/status` and get 200 response
- [ ] Response format matches frontend expectations

Nice to have:
- [ ] APIs return real data
- [ ] All services integrated
- [ ] Production-ready error handling

**Rule**: Focus on "Must achieve" first, then "Nice to have"

---

## 🎓 Learning Patterns

### Good Patterns:
✅ Test locally before Docker
✅ Create minimal test case first
✅ Ask user for direction when stuck
✅ Document what doesn't work and WHY
✅ Propose multiple options with trade-offs
✅ Time-box attempts (5, 15, 30 min limits)

### Bad Patterns:
❌ "Just one more fix and it'll work"
❌ Fixing symptoms instead of root cause
❌ Adding dependencies without understanding why
❌ Commenting out code to "make it work"
❌ Building on top of failed attempts
❌ Assuming "it should work" without testing

---

## 📝 Decision Log Template

When choosing approach, document:

```markdown
## Decision: [Approach Name]
**Date**: [Date]
**Context**: [What problem we're solving]
**User Goal**: [Original user request]

**Approaches Considered**:
1. [Approach A]: [Brief description]
2. [Approach B]: [Brief description]
3. [Approach C]: [Brief description]

**Chosen**: [Approach X]
**Reason**: [Why this one]
**Expected Time**: [Estimate]
**Success Criteria**: [How we know it worked]

**If This Fails**:
- Fallback: [Alternative approach]
- Time limit: [Max time before pivoting]
```

---

## 🚀 Quick Reference Card

### Before ANY Action:
1. **Why?** - Does this serve user's goal?
2. **What?** - What exactly am I doing?
3. **Risk?** - Could this cause a loop?
4. **Time?** - How long if it fails?
5. **Plan B?** - What if this doesn't work?

### Every 15 Minutes:
- Checkpoint progress
- Review alignment with user goal
- Check loop detection metrics

### When Stuck:
1. STOP current approach
2. Document what was tried
3. Analyze root cause
4. Propose 2-3 alternatives
5. ASK user for direction

---

## 🎯 Current Session Application

**User Goal**: Test APIs, then frontend

**Next Actions** (in order):
1. ✅ Document loop prevention (DONE)
2. 🎯 Test search APIs directly (bypass Docker)
3. 🎯 Test frontend integration
4. 📝 Report results

**NOT Doing** (unless user asks):
- ❌ Fixing Docker build issues
- ❌ Fixing import chains
- ❌ Setting up full production environment
- ❌ Fixing auth/GDPR systems

**Circuit Breaker Settings**:
- Max attempts: 3 per approach
- Time limit: 15 minutes per sub-task
- Success metric: API responds with 200 status

