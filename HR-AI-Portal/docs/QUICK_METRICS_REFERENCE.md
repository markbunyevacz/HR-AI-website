# Development Metrics - At a Glance

**Print this or bookmark it for quick reference during development**

---

## Test Coverage Requirements

| Component Type | Minimum | Critical Path |
|---|---|---|
| Business Logic | 95% | 100% |
| API Endpoints | 85% | — |
| Database Operations | 90% | — |
| Utility Functions | 80% | — |
| UI Components | 70% | — |

---

## Response Time Targets

| Metric | Target | Warning | Failure |
|---|---|---|---|
| P50 | 70-90ms | >100ms | >120ms |
| P95 | 130-170ms | >200ms | >250ms |
| P99 | 270-330ms | >400ms | >500ms |

---

## Code Quality Standards

| Metric | Maximum |
|---|---|
| Function Length | 50 lines |
| Cyclomatic Complexity | 10 per function |
| Nesting Depth | 3 levels |
| Function Parameters | 5 |
| Local Variables | 10 |
| Code Duplication | <3% |

---

## Incremental Implementation Limits

| Constraint | Maximum |
|---|---|
| Time per increment | 2 hours |
| Files touched | 5 |
| Code lines (excluding tests) | 300 |
| Test lines (minimum) | 150 |
| Test-to-code ratio | 1:0.5 |

---

## Error Rate Thresholds

| Metric | Acceptable | Warning | Failure |
|---|---|---|---|
| Overall Error Rate | <0.2% | 0.3-0.5% | >0.5% |
| 5xx Errors | <0.1% | 0.2-0.3% | >0.3% |
| Database Errors | <0.05% | 0.1-0.2% | >0.2% |

---

## Security Requirements

| Item | Requirement |
|---|---|
| Critical Vulnerabilities | 0 allowed |
| High-Severity Issues | Max 2 (with mitigation) |
| Medium-Severity Issues | Max 10 |
| Secrets in Code | 0 allowed |
| JWT Access Token TTL | 15 minutes |
| JWT Refresh Token TTL | 7 days |
| Bcrypt Cost Factor | ≥12 |
| Password Min Length | 8 characters |
| Failed Login Lockout | 5 attempts → 30 min |

---

## Database Query Standards

| Metric | Threshold |
|---|---|
| Query Execution Time | <500ms (mark slow queries) |
| Queries per Operation | Max 5 |
| Records Analyzed | Explain/analyze if >1,000 |
| Connection Pool Size | 10-50 connections |
| Slow Query Threshold | 500ms |

---

## Caching Configuration

| Type | TTL | Use Case |
|---|---|---|
| Static Content | 24 hours | Rarely changes |
| User Session | 1 hour | Frequent access |
| API Response | 5 minutes | Balance freshness |
| DB Query Result | 1 minute | Data consistency |
| Computed Analytics | 30 minutes | Expensive operations |

---

## Deployment Metrics

| Scenario | Strategy | Rollback Threshold |
|---|---|---|
| Bug Fix | Blue-Green | Error rate >1% for 5 min |
| Minor Feature | Canary (5%→25%→100%) | Error rate >0.5% for 5 min |
| Major Feature | Canary (1%→10%→50%→100%) | Error rate >0.3% for 5 min |
| Database Migration | Blue-Green | Any schema error |

---

## Performance Budgets

| Component | P95 Response | P99 Response | Error Rate | Uptime |
|---|---|---|---|---|
| API Server | <200ms | <400ms | <0.5% | 99.5% |
| Database | <100ms | <300ms | <0.05% | 99.9% |
| Cache | <2ms | <10ms | <1% | 99.9% |
| Frontend | <1.5s FCP* | <3s TTI** | N/A | 99% |

*FCP = First Contentful Paint
**TTI = Time to Interactive

---

## Testing Distribution

```
Unit Tests:        ████████████████████░░░ (70%)
Integration Tests: █████░░░░░░░░░░░░░░░░░░ (20%)
E2E Tests:         ███░░░░░░░░░░░░░░░░░░░░ (10%)
```

---

## File Size Limits

| Item | Maximum |
|---|---|
| Increment Time | 2 hours |
| Function Length | 50 lines |
| PR/MR Size | 500 lines (excluding tests) |
| Architecture Doc | 3,000 words |
| Requirements Doc | 500 words |
| API Payload | 10MB |
| Request Payload | 5MB |

---

## Monitoring Checklist

Before Deployment:
- [ ] All tests passing (100%)
- [ ] Coverage ≥80% (95% for critical)
- [ ] Zero linter errors
- [ ] Zero TypeScript errors
- [ ] Security scan completed (0 critical)
- [ ] Performance tests passed
- [ ] Rollback tested in staging
- [ ] Monitoring alerts configured

---

## Key Contacts & Escalation

| Scenario | Action |
|---|---|
| **Uncertain about requirement** | Ask user before proceeding |
| **Breaking backward compatibility** | Require user approval |
| **Performance degradation >10%** | Document & get approval |
| **New architectural pattern** | Requires design review |
| **Security vulnerability found** | Immediate escalation |

---

**Last Updated:** October 18, 2025  
**Reference:** See `.cursor/rules/dp.md` for full requirements
