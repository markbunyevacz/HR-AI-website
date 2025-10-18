# Neural-Core .rules Directory - Complete Index
## Development Standards, Enforcement Protocols, and Learning Resources

**Last Updated**: 2025-10-17  
**Project**: Neural-Core (Master Agent + Cursor AI Integration)  
**Status**: ✅ ACTIVE - All documents binding

---

## 📋 Quick Navigation

### 🚦 **ENFORCEMENT RULES** (Read These First!)
| Document | Purpose | When to Use |
|----------|---------|------------|
| **QUICK_REFERENCE_CARD.md** | One-page checklist for coding sessions | Before every coding task |
| **RULE_Enforcement_Protocol.md** | Complete enforcement guide with checkpoints | Planning phase, onboarding |
| **CIRCUIT_BREAKER_CHECKLIST.md** | Safety stops and automatic limits | When stuck or after 15 min |
| **LOOP_PREVENTION_STRATEGY.md** | How to detect and break infinite loops | Every 5 tool calls |

### 📚 **DEVELOPMENT STANDARDS**
| Document | Purpose | When to Use |
|----------|---------|------------|
| **dp.md** | Development principles (backward compat, type safety, perf) | During code writing |
| **RULE_AI_Research_Foundations.md** | Scientific basis for DSPy, MTP, multi-agent systems | Architecture decisions |
| **RULE_Jac_Language_Specification.md** | Team learning path for Jac/MTP (12-week program) | Team onboarding |
| **RULE_Specification_Integration_Guide.md** | Master navigator for specs (Q1 2025 timeline) | Strategic planning |

### 🎯 **IMPLEMENTATION ROADMAPS**
| Document | Purpose | When to Use |
|----------|---------|------------|
| **dspy_implementation_roadmap.md** | DSPy specification & baseline architecture | DSPy development |
| **mtp_executive_summary.md** | MTP strategy & planning phase overview | MTP decisions |

### 📚 **RESEARCH & REFERENCES**
| Document | Purpose | When to Use |
|----------|---------|------------|
| **2112.01488v3.pdf** | Research paper (reference) | Technical deep dives |

---

## 🎯 By Use Case

### "I'm Starting a Coding Task"
1. Read: **QUICK_REFERENCE_CARD.md** (2 min)
2. Review: **Circuit Breaker** section in **RULE_Enforcement_Protocol.md**
3. Check: User goal alignment

### "I'm Stuck After 15 Minutes"
1. Read: **CIRCUIT_BREAKER_CHECKLIST.md**
2. Use: Decision Template
3. Propose: 2-3 alternatives to user

### "I'm Writing Code"
1. Check: **dp.md** - existing patterns, type safety, backward compat
2. Verify: Performance-conscious approach (index/cache/batch)
3. Ensure: 80% test coverage minimum

### "I've Found an Infinite Loop"
1. Read: **LOOP_PREVENTION_STRATEGY.md** - Detection Signals
2. Stop: Current approach
3. Document: What was attempted
4. Propose: Root cause fix options

### "I'm Planning Architecture"
1. Read: **RULE_AI_Research_Foundations.md** - Scientific basis
2. Review: **dspy_implementation_roadmap.md** or **mtp_executive_summary.md**
3. Align: With **dp.md** principles

### "I'm Onboarding the Team"
1. Distribute: **QUICK_REFERENCE_CARD.md**
2. Present: **RULE_Enforcement_Protocol.md**
3. Train: **RULE_Jac_Language_Specification.md** (12-week path)
4. Reference: **RULE_AI_Research_Foundations.md** (Why we do this)

---

## 🔄 Document Relationships

```
┌─────────────────────────────────────────────────────────┐
│        ENFORCEMENT RULES (Binding - Every Session)      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌──────────────────┐  ┌──────────────────────┐        │
│ │ QUICK REFERENCE  │  │ ENFORCEMENT PROTOCOL │        │
│ │ (Daily use)      │  │ (Deep dive)          │        │
│ └────────┬─────────┘  └──────────┬───────────┘        │
│          │                        │                    │
│          └────────────┬───────────┘                    │
│                       │                                │
│          ┌────────────┴────────────┐                   │
│          ↓                         ↓                   │
│    [CIRCUIT BREAKER]       [LOOP PREVENTION]         │
│    (Before action)         (Every 5 calls)           │
│                                                       │
└───────────────────────────┬───────────────────────────┘
                            │
                            ↓
              DURING CODE WRITING: dp.md
              (Patterns, Type Safety, Perf)
```

---

## 📊 Enforcement Checklist

**Before Every Coding Task:**
- [ ] Read QUICK_REFERENCE_CARD.md (2 min)
- [ ] Identify user goal (specific!)
- [ ] Plan backup (Plan B, C, D)
- [ ] Set time limits (5/15/30 min)
- [ ] Check existing code patterns (dp.md)

**During Coding:**
- [ ] Count tool calls (checkpoint every 5)
- [ ] Check progress every 15 min
- [ ] Apply dp.md principles
- [ ] Track metrics (same command, time, files, errors)

**If Stuck:**
- [ ] Trigger CIRCUIT_BREAKER_CHECKLIST.md
- [ ] Use decision template
- [ ] Propose 2-3 options to user

---

## 🚀 Success Criteria

For every task to be considered DONE:

```
✅ Functional completeness (existing features work)
✅ Backward compatible (no breaking changes)
✅ Type safe (proper TS/Python types)
✅ Performance conscious (indexed, cached, batched where needed)
✅ Test coverage ≥80%
✅ Code documented
✅ No neural-core hardcoding in core components
✅ User goal fully met
```

---

## 🎓 Memory Integration

These rules are stored in AI memory for automatic reference:

| Memory | ID | Content |
|--------|---|---------|
| **Loop Prevention Strategy** | 10038247 | Detection signals, time-boxing, 3-strike rule |
| **Circuit Breaker Checklist** | 10038248 | Mandatory stops, metrics, loop patterns |
| **Development Principles** | 10038251 | Existing patterns, backward compat, type safety |

**How to trigger**: "Check my enforcement rules" or mention Loop/Circuit Breaker/DP

---

## 📋 Document Inventory

| File | Type | Size | Purpose |
|------|------|------|---------|
| README.md | INDEX | This file | Navigation guide |
| QUICK_REFERENCE_CARD.md | RULE | 1 page | Quick checklist |
| RULE_Enforcement_Protocol.md | RULE | 5 checkpoints | Detailed enforcement |
| CIRCUIT_BREAKER_CHECKLIST.md | RULE | Standards | Safety protocol |
| LOOP_PREVENTION_STRATEGY.md | RULE | Strategies | Loop detection |
| dp.md | STANDARD | Principles | Development rules |
| RULE_AI_Research_Foundations.md | RULE | 400 lines | Scientific basis |
| RULE_Jac_Language_Specification.md | RULE | 480 lines | Team learning path |
| RULE_Specification_Integration_Guide.md | RULE | 465 lines | Spec coordination |
| dspy_implementation_roadmap.md | SPEC | 200 lines | DSPy baseline |
| mtp_executive_summary.md | SPEC | 330 lines | MTP strategy |
| 2112.01488v3.pdf | RESEARCH | Reference | AI research paper |

---

## 🔗 External References

These documents reference:
- **Master Agent Integration**: `master_agent_cursor_ai.md` (root)
- **Strategic Direction**: `ai_agents_future_strategy.md` (context)
- **Project Context**: Neural-Core workspace structure

---

## ✅ Implementation Status

| Rule Set | Status | Active? | Compliance |
|----------|--------|---------|-----------|
| **Loop Prevention** | ✅ Implemented | YES | Mandatory |
| **Circuit Breaker** | ✅ Implemented | YES | Mandatory |
| **Development Principles** | ✅ Integrated | YES | Mandatory |
| **Enforcement Protocol** | ✅ Active | YES | Mandatory |
| **Memory Integration** | ✅ Complete | YES | Automatic |
| **Quick Reference** | ✅ Available | YES | Before each task |

---

## 🚀 Getting Started

### For AI Agent:
1. Before any coding task: Reference **QUICK_REFERENCE_CARD.md**
2. Every 5 tool calls: Check **LOOP_PREVENTION_STRATEGY.md**
3. Every 15 minutes: Use **CIRCUIT_BREAKER_CHECKLIST.md**
4. While coding: Apply **dp.md** principles

### For Team Members:
1. Read: **QUICK_REFERENCE_CARD.md**
2. Understand: **RULE_Enforcement_Protocol.md**
3. Reference: Specific docs by use case (see sections above)

### For Leadership:
1. Review: **RULE_Specification_Integration_Guide.md** (strategy)
2. Understand: **RULE_AI_Research_Foundations.md** (why we do this)
3. Monitor: **Enforcement Checklist** weekly

---

## 📞 Questions?

- **"How do I start a task?"** → QUICK_REFERENCE_CARD.md
- **"I'm stuck"** → CIRCUIT_BREAKER_CHECKLIST.md
- **"Why loop detection?"** → LOOP_PREVENTION_STRATEGY.md
- **"Code patterns?"** → dp.md
- **"Strategic direction?"** → RULE_Specification_Integration_Guide.md
- **"Scientific basis?"** → RULE_AI_Research_Foundations.md
- **"Team learning?"** → RULE_Jac_Language_Specification.md

---

## 🎯 Summary

**These rules ensure:**
- ✅ No infinite loops or wasted time
- ✅ Safety stops at key thresholds
- ✅ Code quality and consistency
- ✅ User goals always prioritized
- ✅ Measurable progress tracked
- ✅ Professional development standards

**Status**: ✅ ACTIVE AND BINDING  
**Enforcement**: Automatic + Manual  
**Compliance**: Mandatory - no exceptions

---

**Last Updated**: 2025-10-17  
**By**: Neural-Core Development Framework  
**Valid**: All coding sessions starting from this date forward
