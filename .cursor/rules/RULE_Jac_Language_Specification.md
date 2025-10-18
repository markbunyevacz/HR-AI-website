# Jac Language & MTP - Team Learning RULE
## Neural-Core Project Implementation Standard

**Document Type**: 📚 RULE - Team Development Standard  
**Version**: 1.0  
**Created**: 2025-10-17  
**Status**: ✅ ACTIVE - Learning Path Standard

---

## 🎯 Purpose

This RULE document provides the **standardized learning path** for the Neural-Core team to acquire Jac language skills and MTP (Meaning-Typed Programming) concepts required for Q1 2025 implementation phase.

**Target**: Team readiness at 60% proficiency by end of Q1 2025

---

## 📚 Part 1: Jac Language Fundamentals

### 1.1 What is Jac?

**Definition**: Jac is a **statically-typed, declarative language** designed specifically for AI/ML applications with built-in semantic understanding.

**Key Characteristics**:
- 🎯 **Type-safe**: Compile-time checking prevents runtime errors
- 🧠 **Semantic awareness**: Types carry meaning (not just structure)
- 🤖 **LLM-native**: Direct integration with language models
- 🔄 **Composable**: Build complex AI systems from simple types
- ⚡ **Performant**: Optimized for AI workloads

### 1.2 Jac vs Python Comparison

```
┌──────────────────┬────────────────┬────────────────┐
│ Aspect           │ Python         │ Jac            │
├──────────────────┼────────────────┼────────────────┤
│ Type System      │ Dynamic        │ Static/Semantic│
│ LLM Integration  │ Via libraries   │ Native         │
│ Error Detection  │ Runtime        │ Compile-time   │
│ Code Brevity     │ Good           │ Excellent      │
│ Learning Curve   │ Gentle         │ Moderate       │
│ AI Features      │ External       │ Built-in       │
└──────────────────┴────────────────┴────────────────┘
```

### 1.3 Basic Jac Syntax

```jac
# Module and imports
module legal_ai {
    # Type definitions with semantic meaning
    type LegalContext = {
        statute: str,           # Legal reference
        domain: str             # Legal domain
    }
    
    type LegalAnswer = {
        answer: str,            # The legal answer
        reasoning: str,         # Step-by-step reasoning
        confidence: float       # Confidence 0-1
    }
    
    # Function signature with 'by' operator
    func legal_qa(
        question: str,
        context: LegalContext
    ) -> LegalAnswer by llm() {
        # Implementation handled by MTP runtime
        # MT-IR automatically generates prompts
    }
}
```

### 1.4 Key Jac Concepts for MTP

**1. Type Annotations - Semantic Richness**
```jac
# Types carry semantic meaning for MT-IR
type ContractRisk = float range[0, 10]  # Risk score 0-10
type JuristicPerson = str pattern["[A-Z].*"]  # Capitalized
type StatuteReference = str pattern["[A-Z][a-z]+\. \d+\. §"]
```

**2. The 'by' Operator - LLM Integration**
```jac
# 'by llm()' tells MTP runtime to use AI for execution
func analyze_contract(doc: str) -> str by llm() {
    # No implementation needed - MTP handles it
    # Prompt generated from type signature automatically
}

# Alternative: use specific model
func legal_reasoning(q: str) -> tuple[str, float] by llm(model="gpt-4") {
    # Specifies which model to use
}
```

**3. Type Constraints - Automatic Validation**
```jac
type RiskAssessment = {
    score: float range[1, 10],      # Enforced constraint
    explanation: str length[50, 500] # Length validation
}
```

### 1.5 Jac Learning Resources

**Official Documentation**:
- Jac Language Specification: https://docs.jac.ai/language
- MTP Framework Guide: https://docs.jac.ai/mtp

**Interactive Learning**:
- Jac Playground: https://playground.jac.ai
- MTP Tutorial Hub: https://tutorials.jac.ai

**Community**:
- Jac GitHub: https://github.com/Jaseci-Labs/jaclang
- Discussion Forum: https://forum.jac.ai

---

## 🧠 Part 2: Meaning-Typed Programming (MTP) Concepts

### 2.1 MTP Philosophy

**Core Idea**: Types carry **semantic meaning** beyond structure.

**Traditional Programming**:
```python
def process(x: float) -> float:
    # Type only says "float to float"
    # No semantic understanding
    return x * 2
```

**Meaning-Typed Programming**:
```jac
type ContractValue = float currency["HUF"]
type RiskScore = float range[0, 10]

func assess_risk(value: ContractValue) -> RiskScore by llm() {
    # Type signature carries semantic information:
    # - Input is currency in Hungarian Forints
    # - Output is bounded risk score
    # MTP runtime uses this for automatic prompt generation
}
```

### 2.2 MT-IR (Meaning-Typed Intermediate Representation)

**What is MT-IR?**

MT-IR is the **internal representation** that extracts semantic information from type signatures and generates optimized prompts automatically.

```
┌─────────────────┐
│  Jac Source     │
│  (with types)   │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Parser        │
└────────┬────────┘
         ↓
┌─────────────────────────────────┐
│   MT-IR Extraction              │
│   ├─ Type semantics             │
│   ├─ Constraints                │
│   ├─ Range/pattern info         │
│   └─ Domain hints               │
└────────┬────────────────────────┘
         ↓
┌──────────────────────┐
│  Automatic Prompt    │
│  Generation          │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│  LLM API Call        │
│  (Optimized)         │
└──────────────────────┘
```

### 2.3 Automatic Prompt Optimization

**Example**: MT-IR generates different prompts based on type semantics

```jac
# Source code
func extract_risk_factors(contract: str) -> list[str] by llm() {
    # Just one function definition
}

# Generated prompt (automatically)
SYSTEM: """
You are a legal risk analysis expert.
Extract key risk factors from the contract.
Return a list of risk factors.
Each factor should be specific and actionable.
"""

USER: """
Contract text: [contract content]

Expected output format: List of strings
Each item should be a specific risk factor.
"""
```

### 2.4 MTP Runtime Features

**1. Error Recovery**
```jac
# MTP runtime automatically validates outputs against types
func validate_statute(ref: str) -> StatuteReference by llm() {
    # If LLM output doesn't match pattern, retry with feedback
    # Automatic error recovery built-in
}
```

**2. Type-Driven Optimization**
```jac
type ConfidenceScore = float range[0.0, 1.0]

func estimate_confidence(answer: str) -> ConfidenceScore by llm() {
    # MTP knows output must be 0-1
    # Generates prompts with appropriate constraints
    # Validates and re-generates if invalid
}
```

**3. Multi-step Reasoning (CoT Integration)**
```jac
type LegalReasoning = {
    step1: str,      # Identify concepts
    step2: str,      # Locate statutes
    step3: str,      # Apply reasoning
    conclusion: str  # Final answer
}

func complex_legal_analysis(case: str) -> LegalReasoning by llm() {
    # Type structure guides MTP to generate multi-step prompts
    # Automatically follows Chain-of-Thought pattern
}
```

---

## 🛠️ Part 3: Team Learning Path

### Phase 1: Foundation (Weeks 1-2)

**Goal**: Understand basic Jac syntax and MTP concepts

| Day | Topic | Resources | Hands-on |
|-----|-------|-----------|----------|
| 1-2 | Jac basics & syntax | Official docs, tutorials | Hello world in Jac |
| 3-4 | Type system fundamentals | Type theory intro | Write basic types |
| 5-6 | 'by' operator & LLM integration | MTP guide | Create first 'by' function |
| 7-10 | Type constraints & validation | Specification docs | Build type-safe functions |

**Deliverable**: Each team member has working Jac environment

### Phase 2: Application (Weeks 3-6)

**Goal**: Apply MTP to legal AI domain

| Week | Topic | Project |
|------|-------|---------|
| 3 | Domain-specific types | Create legal domain types |
| 4 | LLM integration patterns | Build legal QA function |
| 5 | Error handling & validation | Add validation logic |
| 6 | Optimization techniques | Optimize prompts via types |

**Deliverable**: Prototype legal AI agent in Jac

### Phase 3: Advanced (Weeks 7-12)

**Goal**: Production-ready MTP implementation

| Week | Topic | Objective |
|------|-------|-----------|
| 7-8 | Multi-agent systems | Build coordinator agent |
| 9-10 | Integration with DSPy baseline | Hybrid system implementation |
| 11-12 | Performance optimization | Benchmarking & tuning |

**Deliverable**: Full specification for implementation phase

---

## 📊 Part 4: Skills Matrix & Competency Levels

### Competency Framework

| Level | Jac Skills | MTP Understanding | Application |
|-------|-----------|-------------------|-------------|
| **Beginner** | Basic syntax, types | Understands 'by' operator | Can read MTP code |
| **Intermediate** | Type constraints, patterns | Grasps MT-IR concept | Can write simple MTP functions |
| **Advanced** | Complex types, composition | Understands optimization | Can architect MTP systems |
| **Expert** | Semantic type design | Full MTP mastery | Can optimize production systems |

### Team Progression Target

```
┌─────────────────────────────────────┐
│ Q1 2025 End Target: 60% Intermediate│
├─────────────────────────────────────┤
│                                     │
│ Team distribution:                  │
│ • 20% Beginner (ongoing learning)  │
│ • 60% Intermediate (productive)    │
│ • 20% Advanced (mentors)           │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔍 Part 5: Common Jac/MTP Patterns for Legal AI

### Pattern 1: Classification Task

```jac
type DocumentType = str enum["contract", "regulation", "case_law"]

func classify_document(content: str) -> DocumentType by llm() {
    # MTP knows it's classification task from enum type
    # Generates classification-specific prompt
}
```

### Pattern 2: Structured Extraction

```jac
type ContractClause = {
    type: str,              # Clause type
    content: str,           # Clause text
    implications: str       # Legal implications
}

func extract_clauses(contract: str) -> list[ContractClause] by llm() {
    # Type structure guides extraction format
}
```

### Pattern 3: Reasoning Chain

```jac
type LegalAnalysis = {
    legal_concept: str,
    applicable_statute: str,
    case_facts: str,
    reasoning: str,
    conclusion: str
}

func analyze_case(facts: str) -> LegalAnalysis by llm() {
    # Multi-step structure enforces chain-of-thought
}
```

### Pattern 4: Risk Assessment

```jac
type RiskCategory = str enum["low", "medium", "high", "critical"]
type RiskScore = float range[0.0, 1.0]

type RiskAssessment = {
    category: RiskCategory,
    score: RiskScore,
    explanation: str length[100, 1000],
    mitigation: str
}

func assess_contract_risk(contract: str) -> RiskAssessment by llm() {
    # Constrained outputs ensure valid risk scores
}
```

---

## ✅ Part 6: Success Criteria & Milestones

### Week 4 Milestone (Foundation Complete)
- ✅ All team members have Jac installed & working
- ✅ Can write basic type definitions
- ✅ Understand 'by' operator and LLM integration
- ✅ First legal domain prototype runs

### Week 8 Milestone (Specification Ready)
- ✅ Full legal AI type system designed
- ✅ 3-5 MTP functions for legal domain implemented
- ✅ MT-IR behavior validated
- ✅ Integration points with DSPy identified

### Week 12 Milestone (Implementation Ready)
- ✅ Complete MTP specification document
- ✅ Architectural decisions documented
- ✅ Team at 60% intermediate competency
- ✅ Go/No-Go decision made for implementation phase

---

## 🚀 Part 7: Best Practices & Guidelines

### Type Design Principles

1. **Be Semantic**: Types should carry domain meaning
   ```jac
   ✅ type StatuteNumber = str pattern["[A-Z][a-z]+\. \d+\. §"]
   ❌ type Code = str  # Too generic
   ```

2. **Constrain Appropriately**: Add bounds for robustness
   ```jac
   ✅ type Confidence = float range[0.0, 1.0]
   ❌ type Score = float  # Unbounded
   ```

3. **Document Semantic**: Explain type meaning
   ```jac
   type LegalAnswer = {
       answer: str,      # Concise legal answer (5-50 words)
       confidence: float # 0.0 = uncertain, 1.0 = certain
   }
   ```

### Function Design Principles

1. **Clear Intent**: Function name should convey semantic
   ```jac
   ✅ func identify_contract_risks() by llm()
   ❌ func process_text() by llm()
   ```

2. **Type Completeness**: Input/output types fully specified
   ```jac
   ✅ func analyze(c: Contract) -> RiskAssessment by llm()
   ❌ func analyze(c: str) -> str by llm()
   ```

3. **Validation First**: Ensure types validate outputs
   ```jac
   ✅ func get_score() -> float range[0, 10] by llm()
   ❌ func get_score() -> float by llm()
   ```

---

## 📞 Support & Resources

### Internal Resources

**Within Neural-Core**:
- AI Architecture Team - Technical guidance
- Master Agent system - Project coordination
- Documentation repository - Specs and examples

### External Resources

**Jac Community**:
- Official Docs: https://docs.jac.ai
- GitHub Issues: https://github.com/Jaseci-Labs/jaclang/issues
- Community Forum: https://forum.jac.ai

**MTP Research**:
- Type Theory: "Types and Programming Languages" - Pierce (2002)
- Neuro-symbolic: Recent arXiv papers on semantic programming
- LLM Integration: OpenAI & Stanford CRFM research

---

## 🔄 Continuous Improvement

This RULE document will be updated:

- **Weekly**: Add team learnings and common patterns
- **Monthly**: Incorporate Jac/MTP framework updates
- **Quarterly**: Comprehensive review and curriculum updates

**Ownership**: AI Architecture Team + Team Lead

---

**Document Owner**: AI Architecture Team  
**Learning Coordinator**: TBD  
**Last Updated**: 2025-10-17  
**Next Review**: 2025-10-24
