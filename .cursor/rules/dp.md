# Development Principles for Cursor AI - Quick Reference
## Read this before every implementation task

**Location of detailed guidance:** See `/docs/DEVELOPMENT_STANDARDS.md` for comprehensive explanations and examples.

---

## PHASE 1: Planning & Requirements

### Context Management
- **MUST:** Read `/docs/ARCHITECTURE.md` before any implementation
- **MUST:** Create requirement document for complex features (max 500 words)
- **MUST:** Check `/docs/DECISIONS.md` to avoid rehashing old debates

### Design Before Code
- **MUST:** For features touching >3 files, write design document first
- **MUST:** Get design approval before implementation begins
- **MUST:** Include: data models, interface contracts, component interactions

---

## PHASE 2: Development

### Pattern Consistency
- **MUST:** Analyze existing patterns before implementing new features
- **MUST:** Follow code style guides: `/docs/CODE_STYLE.md`, `/docs/API_STYLE.md`, `/docs/DATABASE_STYLE.md`
- **MUST:** No patterns not documented in `/docs/patterns/`

### Type Safety
- **MUST:** Use TypeScript strict mode (all strict flags enabled)
- **MUST:** No `any` types - explicit types for all parameters, returns, data structures
- **MUST:** Define interfaces/types before implementation
- **MUST:** Create validation schemas (Zod/Yup/joi) for all external inputs

### Incremental Implementation
- **MUST:** Max 2 hours per increment (Pomodoro: 4 × 25min sessions)
- **MUST:** Touch max 5 files per increment
- **MUST:** Max 300 lines of code per increment (excluding tests)
- **MUST:** Write minimum 150 lines of tests per increment (1:0.5 ratio)

**After each increment:**
1. Run full regression tests (must pass, <5 minutes)
2. Run type checker (zero errors)
3. Run linter (zero errors, max 5 warnings)
4. Check code coverage (maintain or increase)

### Backward Compatibility
- **MUST:** Database changes are additive only (never delete columns)
- **MUST:** API versioning for breaking changes (`/api/v1/`, `/api/v2/`)
- **MUST:** API deprecation warnings 90 days before removal
- **MUST:** Run complete test suite before code merge

---

## PHASE 3: Quality Assurance

### Error Handling
- **MUST:** Every external call has explicit error handling
- **MUST:** Use centralized error class with structured error codes (AUTH_xxx, DB_xxx, VAL_xxx, etc.)
- **MUST:** Implement graceful degradation - system continues with reduced functionality
- **MUST:** Structured logging at component boundaries

### Performance
- **MUST:** Document performance requirements for each component
- **MUST:** Review database queries: explain analyze for >1000 records
- **MUST:** Ensure query execution <500ms (mark slow queries)
- **MUST:** Implement caching with documented TTL and invalidation rules

### Code Quality
- **MUST:** Functions max 50 lines
- **MUST:** Max 5 parameters per function (use config objects for more)
- **MUST:** Max 3 levels of nesting (if/loops/try-catch)
- **MUST:** Cyclomatic complexity <10 per function
- **MUST:** Document all public APIs with JSDoc/TSDoc

---

## PHASE 4: Testing

### Coverage Requirements
- **MUST:** Minimum 80% test coverage for all new code
  - Business logic: 95% (critical paths: 100%)
  - API endpoints: 85% (all status codes)
  - Database ops: 90% (including errors)
  - Utility functions: 80%

### Test Types
- **MUST:** Unit tests (70% of total)
- **MUST:** Integration tests (20% of total)
- **MUST:** E2E tests (10% of total)

### Test-Driven Development
- **FOR COMPLEX LOGIC (complexity >5):** Write failing test first
- **MUST:** Document expected behavior with Given-When-Then structure
- **MUST:** Test edge cases: empty values, nulls, boundaries, max/min inputs

---

## PHASE 5: Deployment & Operations

### Security
- **MUST:** Parameterized queries only (never string concatenation)
- **MUST:** All user inputs validated and sanitized
- **MUST:** JWT tokens: access (15 min), refresh (7 days)
- **MUST:** Passwords: bcrypt cost factor ≥12
- **MUST:** Two-factor auth for admin accounts (mandatory), users (optional)
- **MUST:** Run security scans before deployment (SAST, DAST, dependency scan, secret scan)

**Security acceptance:**
- Zero critical vulnerabilities
- Max 2 high-severity (with mitigation plan)
- Zero secrets detected in code

### Deployment
- **MUST:** Use blue-green or canary deployment (never direct to production)
- **MUST:** Generate deployment runbook (see `/docs/runbooks/`)
- **MUST:** Test rollback procedure in staging first
- **MUST:** Monitor for 30 minutes post-deployment

**Automated rollback triggers:**
- Error rate >1% for 5 minutes
- P95 response time >500ms for 10 minutes
- Health check failures >10% for 2 minutes

### Documentation
- **MUST:** Update `/docs/ARCHITECTURE.md` within 24 hours of changes
- **MUST:** Generate API docs from code annotations (auto-deploy with release)
- **MUST:** Create operational runbooks for critical procedures
- **MUST:** Document all security findings in `/docs/security/SECURITY_LOG.md`

---

## Success Validation

Before merge/deployment, verify:

### Functional Integrity ✅
- [ ] 100% test pass rate (zero failures)
- [ ] All regression tests pass (<10 min)
- [ ] Smoke tests pass (<5 min)
- [ ] All API contracts maintained

### Code Quality ✅
- [ ] 80%+ coverage (95% for critical paths)
- [ ] Cyclomatic complexity <10 per function
- [ ] Functions <50 lines
- [ ] Zero linter errors
- [ ] Zero type errors

### Performance ✅
- [ ] P50 response: 70-90ms (failure: >100ms)
- [ ] P95 response: 130-170ms (failure: >200ms)
- [ ] Error rate: <0.3% (failure: >0.5%)
- [ ] Query execution: <500ms

### Security ✅
- [ ] Zero critical vulnerabilities
- [ ] All auth/authz tests pass (100%)
- [ ] No secrets detected
- [ ] SAST scan: max 2 high-severity issues (documented)

### Operational Readiness ✅
- [ ] Deployment runbook created
- [ ] Rollback tested in staging
- [ ] Monitoring alerts configured
- [ ] Feature flags tested

---

## Decision Tree

**When uncertain → Ask the user first**

### If stuck on implementation:
1. Simplify scope (break into smaller pieces)
2. Check existing patterns (`/docs/patterns/`)
3. Review related code
4. Get user approval for workarounds

### If discovering new pattern needed:
1. Document it first (get approval)
2. Add to `/docs/patterns/`
3. Then implement

### If breaking compatibility:
1. Check DECISIONS.md (was this already considered?)
2. Use expand-contract pattern (3-phase migration)
3. Document migration path
4. Get user approval

### If performance degradation:
1. Analyze root cause
2. Optimize before proceeding
3. If <10% acceptable, document justification
4. Get user approval

---

## Key File Locations

| Purpose | Location |
|---------|----------|
| Architecture decisions | `/docs/ARCHITECTURE.md` |
| All development standards | `/docs/DEVELOPMENT_STANDARDS.md` |
| Established patterns | `/docs/patterns/` |
| Code style guide | `/docs/CODE_STYLE.md` |
| API style guide | `/docs/API_STYLE.md` |
| Database style guide | `/docs/DATABASE_STYLE.md` |
| Deployment procedures | `/docs/runbooks/` |
| Security checklist | `/docs/security/SECURITY_CHECKLIST.md` |
| Error codes | `/docs/ERROR_CODES.md` |
| Performance targets | `/docs/PERFORMANCE_REQUIREMENTS.md` |

---

## Escalation Contacts

**Clarification needed?** Ask user before proceeding.

**Design decision?** Consult `/docs/DECISIONS.md` first.

**New architecture?** Requires user approval.

**Backward compatibility concern?** Requires user approval.

---

## Remember

- **These are REQUIREMENTS, not suggestions**
- **Quality is non-negotiable** - shortcuts create technical debt
- **When in doubt, ask first** - prevention is cheaper than fixing
- **Document as you go** - don't save docs for the end
- **Verify continuously** - test after each small change, not at the end
