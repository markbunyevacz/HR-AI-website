# Enforcement Protocol - Loop/Circuit Breaker/DP Integration
## Neural-Core Development Standards

**Document Type**: 🚦 RULE - Enforcement & Compliance  
**Version**: 1.0  
**Created**: 2025-10-17  
**Status**: ✅ ACTIVE - Mandatory for all coding tasks

---

## 🎯 Purpose

This document ensures that **Loop Prevention Strategy**, **Circuit Breaker Checklist**, and **Development Principles (DP)** are enforced during all coding work in the Neural-Core project.

**Binding**: These rules apply to EVERY coding task, AI agent action, and development decision.

---

## 📋 The Three Core Rules (Always Active)

### Rule Set A: Loop Prevention Strategy
**File**: `LOOP_PREVENTION_STRATEGY.md`  
**Enforcer**: Every 5 tool calls  
**Triggers**: Repetitive actions, error chains, time thresholds

### Rule Set B: Circuit Breaker Checklist
**File**: `CIRCUIT_BREAKER_CHECKLIST.md`  
**Enforcer**: Before major action  
**Triggers**: Goal alignment, metric thresholds, automatic stops

### Rule Set C: Development Principles
**File**: `dp.md`  
**Enforcer**: During code writing  
**Triggers**: Pattern consistency, backward compatibility, performance

---

## 🔄 How They Work Together

```
BEFORE ACTION START
    ↓
Circuit Breaker Check: Serves user goal? Have backup plan?
    ↓ (If YES → Continue)
EXECUTING TASK
    ↓
Every 5 Tool Calls: Loop Prevention Check - repeating? error chain? progress?
    ↓ (If OK → Continue)
Every 15 Minutes: Progress Checkpoint - measurable advancement?
    ↓ (If Stuck → Circuit Breaker Triggered)
CODE WRITING
    ↓
Applying DP: Existing patterns? Type safe? Backward compatible?
    ↓
TASK COMPLETE
    ↓
Verification: Success criteria met? Test coverage? Performance?
```

---

## 🚦 Enforcement Checkpoints

### Checkpoint 1: Pre-Action (Circuit Breaker)
**When**: Before every major code action, refactor, or build  
**Check**:
- [ ] Does this directly serve user's stated goal?
- [ ] Have I tried this approach in last 10 actions?
- [ ] Do I have a backup plan if this fails?

**If ANY NO**: PAUSE, reassess, propose alternatives

---

### Checkpoint 2: Every 5 Tool Calls (Loop Detection)
**When**: After every 5 sequential tool calls  
**Track**:
- [ ] Repeating same action type?
- [ ] Error chain forming (A→B→C)?
- [ ] Measurable progress toward user goal?
- [ ] Is there a faster path I'm ignoring?
- [ ] Should I ask user for direction?

**If 3+ NO**: STOP, document, propose alternatives

---

### Checkpoint 3: Every 15 Minutes (Progress Checkpoint)
**When**: Every 15 minutes of continuous work  
**Verify**:
- [ ] Have I made measurable progress toward user's goal?
- [ ] Is this progress in the right direction?
- [ ] Would user consider this "useful"?

**Measurable = YES to any**:
- ✅ API endpoint responds successfully
- ✅ Test passes
- ✅ Feature works end-to-end
- ✅ One less dependency blocking progress

**NOT Measurable**:
- ❌ "One less error than before" if new errors appeared
- ❌ "Getting closer" without concrete evidence
- ❌ "Almost working" without working endpoint

**If NO Progress**: Trigger Circuit Breaker

---

### Checkpoint 4: During Coding (Development Principles)
**When**: While writing code  
**Verify**:
- [ ] Examined existing patterns in codebase first?
- [ ] Maintains backward compatibility?
- [ ] No neural-core specific assumptions in core logic?
- [ ] Performance conscious (indexing, caching, batch)?
- [ ] Type safe (proper TS/Python types)?

**If ANY NO**: Review existing code patterns first, then proceed

---

### Checkpoint 5: Completion (Success Criteria)
**When**: Task appears complete  
**Verify**:
- [ ] Functional completeness - existing features still work?
- [ ] Domain independence - no hardcoded neural-core specifics?
- [ ] Performance maintained - benchmarks OK?
- [ ] Code quality - consistent style, documented?
- [ ] Test coverage - minimum 80%?

---

## 🛑 Automatic Stop Conditions (No Exceptions)

| Condition | Limit | Action |
|-----------|-------|--------|
| **Same command runs** | 3x | STOP, analyze, propose alternatives |
| **Minutes on sub-task** | 15 min | STOP, checkpoint progress |
| **Files edited without test** | 5 files | STOP, test before more edits |
| **Docker/build rebuilds** | 5x | STOP, test locally or skip Docker |
| **New errors introduced** | 3 new | STOP, error chain detected |
| **Failed attempts** | 10x same approach | STOP, try different approach |
| **Total time no progress** | 30 min | STOP, trigger circuit breaker |
| **Error chains** | 3+ sequential | STOP, root cause not symptoms |

---

## 📝 Decision Template (When Circuit Breaker Triggers)

```markdown
🛑 **Circuit Breaker Triggered**

**What I was attempting**:
[Description of action]

**What went wrong**:
[Root cause analysis - NOT symptoms]

**Time invested**: X minutes  
**Attempts made**: Y

**Why it failed**:
[Technical reason, not "just needs one more try"]

**Alternative approaches**:

**Option A: [Fast workaround]**
- Time: ~X minutes
- Pros: [Quick benefit]
- Cons: [Trade-offs]

**Option B: [Proper solution]**
- Time: ~X hours
- Pros: [Long-term benefit]
- Cons: [Time investment]

**Option C: [Scope reduction]**
- Time: ~X minutes
- Pros: [Get partial working]
- Cons: [Incomplete feature]

**My recommendation**: Option [X] because [reason]

**What would you prefer?**
```

---

## 🎯 Integration with Memory

These rules are stored in AI memory:
- **Loop Prevention Strategy** (ID: 10038247)
- **Circuit Breaker Checklist** (ID: 10038248)
- **Development Principles** (ID: 10038251)

Memory will be referenced BEFORE every coding task.

---

## 🔍 How to Stay Compliant

### For Every Coding Session:

1. **Start**: Review Circuit Breaker checklist
2. **During**: Count tool calls, trigger checkpoint every 5
3. **Every 15min**: Progress check - if stuck, trigger circuit breaker
4. **While coding**: Apply DP principles
5. **End**: Verify success criteria

### Red Flags (STOP Immediately):

- 🚩 "Just one more fix..."
- 🚩 "This should work..."
- 🚩 "Let me try something else..."
- 🚩 "Maybe if I..."
- 🚩 User says "what are you doing?"

---

## 📊 Compliance Metrics

Track these weekly:
- Average time to Circuit Breaker trigger
- Loop detection accuracy
- Progress checkpoint effectiveness
- DP principle violations
- Test coverage maintenance

---

## ✅ Checklist Before Every Task

- [ ] Read Circuit Breaker checklist
- [ ] Identify user goal clearly
- [ ] Plan backup approach (Plan B, C, D)
- [ ] Set time limits (5/15/30 min)
- [ ] Note existing code patterns to follow
- [ ] Prepare for checkpoint every 15 min
- [ ] Ready with decision template if stuck

---

## 🚀 Implementation

These rules are NOW active and BINDING:

**When**: Every coding task from this point forward  
**Where**: Neural-Core project (all branches)  
**Who**: AI agent + team members  
**How**: Memory integration + this document reference  
**Compliance**: Mandatory - no exceptions

---

**Status**: ✅ ENFORCED  
**Last Updated**: 2025-10-17  
**Reviewed**: Integrated with Loop Prevention, Circuit Breaker, DP  
**Next Review**: Weekly during sprint retrospectives
