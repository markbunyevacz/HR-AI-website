# DSPy Implementációs Roadmap - Q1 2025
## Neural-Core Projekt - AI Agensek Jövőbeli Programozása

**Verzió**: 2.0  
**Frissítve**: 2025-10-17  
**Fázis**: Tervezési/Specifikációs  
**Státusz**: AKTÍV FEJLESZTÉS - Specifikációs Fázisban

---

## 1. Projekt Áttekintés

### 1.1 Célkitűzés
DSPy (Declarative Self-improving Python) keretrendszer stratégiai integrálása az Neural-Core jogi rendszerbe, összehangítva az MTP (Meaning-Typed Programming) adopcióval. Ez a dokumentum a **tervezési és specifikációs szakasz** lezárultáig alkalmazandó specifikáció.

### 1.2 Jelenlegi Állapot - Specifikációs Fázis (Q1 2025)
- ✅ Alapvető DSPy agensek prototípusa létezik (`dspy_legal_agents.py`)
- 🔄 Multi-agent koordinátor rendszer specifikálása folyamatban
- 🔄 Jogi specializált signatures dokumentálása
- 🔄 MTP párhuzamos stratégia meghatározása
- ⏳ Integrációs pontok precízésítése

### 1.3 Stratégiai Döntési Pont
**MTP vs DSPy:** Ez a dokumentum a **DSPy hosszú-élettartamú** stratégiáját rögzíti, tekintettel arra, hogy az MTP még a **tervezési fázisban van** és bevizsgálás alatt áll. A DSPy **backup strategy** és **módszertani referencia** marad.

## 2. Specifikációs Fázis - Tervezési Dokumentáció

### 2.1 Rendszer Architektúra Specifikáció

#### 2.1.1 Komponens-szintű Architektúra

```
┌─────────────────────────────────────────────────────────────────┐
│ DSPy Legal AI System - Komponens Diagram (Q1 2025)             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  DSPy Agensek    │  │  MTP Integráció  │  │  FastAPI API │ │
│  │  ─────────────   │  │  ─────────────── │  │  ───────────  │ │
│  │ • LegalQA        │  │ • Prototípus     │  │ • Endpoints  │ │
│  │ • Contract       │  │ • Benchmark      │  │ • Auth       │ │
│  │ • Compliance     │  │ • Spec           │  │ • Health     │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│           ↓                    ↓                    ↓          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Configuration & State Management Layer                 │  │
│  │  • DSPyConfigManager                                     │  │
│  │  • Training Data Manager                                 │  │
│  │  • Performance Monitor                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│           ↓                                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  LLM & External Services                                │  │
│  │  • OpenAI API (GPT-4, GPT-3.5-turbo)                   │  │
│  │  • Local Models (Ollama fallback)                       │  │
│  │  • Vector DB (ChromaDB, Qdrant)                         │  │
│  │  • Cache Layer (Redis)                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.1.2 Adatáramlás és Interfészek

```
DSPy Pipeline Adatáramlás:

User Input
    ↓
[Signature Definition] - Deklaratív specifikáció
    ↓
[Module.forward()] - Feldolgozás
    ↓
[LLM API] - Prompt küldés
    ↓
[Output Validation] - Asszertok és Suggestion
    ↓
[Result] - Végeredmény
```

### 2.2 Funkcionális Követelmények

#### DSPy Signature Specifikáció

| Ágensek | Input Fields | Output Fields | Validáció |
|---------|-------------|---------------|-----------|
| **LegalQA** | question, legal_context | answer, confidence | Asszert: válasz hossz > 10 |
| **ContractAnalysis** | contract_text, analysis_focus | summary, risks, recommendations | Asszert: risk score ≤ 10 |
| **Compliance** | document_text, applicable_laws | status, violations, actions | Suggest: detailezettség |

#### Nem-funkcionális Követelmények

| Attribútum | Cél | Mérés |
|-----------|----|-------|
| **Válaszidő** | < 5s átlag | Performance Monitor |
| **Accuracy** | ≥ 85% | Legal Accuracy Metric |
| **Availability** | 99.5% uptime | Health Check |
| **Skálázhatóság** | 100+ req/s | Load Test |
| **Token Cost** | $0.70-1.00/req | Token Usage Monitor |

### 2.3 Integrációs Pontok - DSPy ↔ MTP

```
JELENLEGI ÁLLAPOT (Q1 2025 - Specifikációs Fázis)

┌─────────────────┐         ┌──────────────────┐
│   DSPy System   │◄───────►│  MTP Prototype   │
│  (Baseline)     │ Feedback│  (Pilot)         │
└─────────────────┘         └──────────────────┘
     (Prod-ready)          (Spec. Phase)
     └─────────────────────────────────────────┘
                   Parallel Study
```

**Specifikációs Kapcsolódási Pontok:**
1. **Prompt Templates** - Közös prompts mindkét rendszer részére
2. **Training Data** - Azonos adathalmazok értékeléshez
3. **Performance Metrics** - Közös mérési metodológia
4. **Error Handling** - Unified exception handling specifikáció

## 3. Tervezési Fázis - Megvalósítandó Komponensek

### 3.1 Specifikációban Meghatározandó Elemek

#### 3.1.1 Configuration System

**Specifikáció:**
- Environment-specific settings (dev/staging/prod)
- Model selection: GPT-4 (prod), GPT-3.5-turbo (dev)
- Temperature ranges: 0.3-0.7
- Token limits: dynamic allocation
- Caching strategy: Redis-based

#### 3.1.2 Monitoring & Observability

**Specifikáció:**
- Response time tracking (p50, p95, p99)
- Token usage analytics
- Accuracy metrics per agent type
- Error rate monitoring
- Alert thresholds definition

#### 3.1.3 Testing Framework

**Specifikáció:**
- Unit tests per Signature
- Integration tests (DSPy + FastAPI)
- Benchmark tests (DSPy vs MTP)
- Load tests (scalability)
- Security tests (prompt injection)

## 4. Specifikációs Fázis - Ütemterv

### Q1 2025 - SPEC PHASE (January - March)

```
JANUÁR (Weeks 1-4)
├─ Week 1: Architecture & Component Spec
├─ Week 2: Interface Specification
├─ Week 3: Data Flow & Integration Points
├─ Week 4: Testing Strategy Specification

FEBRUÁR (Weeks 5-8)
├─ Week 5: Configuration Management Spec
├─ Week 6: Monitoring & Observability Spec
├─ Week 7: Deployment & Infrastructure Spec
├─ Week 8: Security & Compliance Spec

MÁRCIUS (Weeks 9-12)
├─ Week 9: MTP Integration Strategy Spec
├─ Week 10: Risk & Mitigation Analysis
├─ Week 11: Training & Adoption Plan Spec
├─ Week 12: Spec Completion & Review
```

## 5. Kockázatok - Specifikációs Fázis

### Specifikációs Kockázatok

| Kockázat | Valószínűség | Hatás | Mitigálás |
|----------|---|---|--|
| MTP spec. alatt | Közepes | Magas | Párhuzamos DSPy spec |
| Team MTP ismeretek | Magas | Közepes | Training program |
| Integrációs pontok | Közepes | Magas | Detailed spec dokus |
| Költségvetés | Alacsony | Közepes | Token usage limit |

## 6. Tudományos Alapok - Hivatkozás

A projekt az alábbi kutatások alapján készül:

- **"Demonstrate-Search-Predict" (DSPy Framework)** - Stanford CRFM
- **In-Context Learning** - Reinforcement Learning with LLM prompts
- **Chain-of-Thought Prompting** - Wei et al., OpenAI Research
- **Program Synthesis & Neural Models** - Modern AI Research 2023-2024
- **Type System & Declarative Programming** - FP Foundation Research

Lásd: `RULE_AI_Research_Foundations.md`

---

**Status**: ✅ SPECIFYING  
**Next Review**: 2025-11-15  
**Approval Gateway**: SPEC COMPLETION 
