# ⚠️ COMPREHENSIVE DEVELOPMENT STANDARDS REFERENCE

**For quick Cursor AI rules, see:** `.cursor/rules/dp.md` (Recommended for daily use)

This document provides detailed guidance for all development phases, code examples, and comprehensive explanations.

---

This (DEVELOPMENT_STANDARDS.md) is a comprehensive reference file - use as needed for detailed guidance!

# Strict Development Principles for Cursor AI
## Addressing AI-Assisted Development Challenges Through Professional SDLC

### Overview
This document establishes mandatory development principles for projects utilizing Cursor AI. These rules directly address common weaknesses in AI-assisted development and enforce professional software development lifecycle standards.

---

## Phase 1: Planning & Requirements

### Context Management Rules
**Problem:** Cursor AI has limited context window and frequently loses track of project structure and requirements.

**Mandatory Practices:**

- Maintain a living architecture document (ARCHITECTURE.md) at project root with maximum three thousand words that Cursor AI must read before any implementation task. This document must contain system component diagram, data flow diagrams, technology stack decisions, and critical constraints. Update within twenty-four hours of any architectural change.
  
- Create explicit requirement documents for each feature with maximum five hundred words per document. Each requirements document must include three sections: functional requirements with at least three acceptance criteria, technical constraints with performance budgets, and integration requirements listing all affected components and APIs. Store in /docs/requirements/ directory with naming convention REQ-[FEATURE-NAME]-[DATE].md.

- Establish a decision log (DECISIONS.md) capturing architectural and technical decisions using the following template for each entry:
  ```
  ## Decision [NUMBER]: [Title]
  **Date:** YYYY-MM-DD
  **Status:** [Proposed|Accepted|Deprecated|Superseded]
  **Context:** [2-3 sentences describing the problem]
  **Decision:** [The approach chosen in 2-3 sentences]
  **Consequences:** [Expected positive and negative outcomes]
  **Alternatives Considered:** [List of rejected approaches with brief rationale]
  ```
  Review this log before any architectural discussion with Cursor AI to prevent circular debates.

### Design Before Implementation
**Problem:** Cursor AI tends to jump directly to code generation without adequate design consideration.

**Mandatory Practices:**

- Require explicit design approval before allowing Cursor AI to generate implementation code. Design documents must be stored in /docs/design/ with naming convention DESIGN-[FEATURE-NAME]-[DATE].md and include:
  - Data model definitions with field types, constraints, and relationships (use tools like dbdiagram.io or draw.io)
  - Interface contracts with request/response schemas in JSON Schema or OpenAPI format
  - Component interaction diagrams showing data flow between at least three components
  - Performance budgets: API response times (target: under two hundred milliseconds for 95th percentile), database query limits (maximum five queries per operation), and memory constraints
  
- For any feature touching more than three files or impacting more than five hundred lines of existing code, mandate a written implementation plan with the following structure:
  ```
  ## Implementation Plan: [Feature Name]
  **Estimated Effort:** [X hours, maximum eight hours per increment]
  **Dependencies:** [List of prerequisites and blocking items]
  
  ### Phase 1: [Name] (Estimated: X hours)
  - File changes: [List specific files]
  - New components: [List new files/modules]
  - Testing requirements: [Specific test cases]
  
  [Repeat for each phase, maximum five phases per plan]
  ```

---

**For detailed implementation practices and code examples, see `/rules/dp-full.md` or the comprehensive version in this directory.**
