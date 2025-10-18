This (dp.md) is a read only file, never modify without permission!

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
  
- Establish clear bounded contexts between system components. Document these boundaries in ARCHITECTURE.md with explicit rules about allowed dependencies. Use dependency management tools (TypeScript path mappings, module boundaries in NX or similar) to enforce these boundaries. Cursor AI must verify no circular dependencies exist before suggesting cross-component changes.

---

## Phase 2: Development

### Pattern Consistency Enforcement
**Problem:** Cursor AI generates inconsistent code patterns that deviate from established project conventions.

**Mandatory Practices:**
- Before implementing any new functionality, Cursor AI must analyze and document existing patterns for similar features. Maintain a pattern library in /docs/patterns/ with the following structure:
  ```
  /docs/patterns/
  ├── database-access.md (standard ORMs, query builders, transaction handling)
  ├── api-endpoints.md (REST/GraphQL patterns, error responses, validation)
  ├── error-handling.md (exception types, logging, user-facing messages)
  ├── authentication.md (middleware, session management, token handling)
  └── testing.md (test structure, mocking strategies, fixtures)
  ```
  Each pattern document must include at least three concrete code examples with comments explaining when to use each variant.

- Implement mandatory code review checkpoints using automated tools:
  - **ESLint/TSLint:** Configure with project-specific rules (minimum fifty rules enabled), run on pre-commit hooks
  - **Prettier:** Enforce consistent formatting (line length: one hundred characters, single quotes, two-space indentation)
  - **SonarQube or CodeClimate:** Set quality gates requiring minimum B grade rating, zero critical issues
  - **Custom linting rules:** Create project-specific rules for pattern enforcement using ESLint plugin development
  
  Reject any pull request that fails automated checks or introduces patterns not documented in pattern library.

- Maintain comprehensive style guides at project root:
  - **CODE_STYLE.md:** Naming conventions (camelCase for variables, PascalCase for classes, UPPER_SNAKE_CASE for constants), file organization rules, comment requirements
  - **API_STYLE.md:** Endpoint naming (plural nouns, version prefixes like /api/v1/), HTTP verb usage, status code standards
  - **DATABASE_STYLE.md:** Table naming (plural, lowercase with underscores), column naming, index naming conventions
  
  All documents must be under one thousand words each for readability. Review and update quarterly.

### Type Safety and Contract Definition
**Problem:** Cursor AI sometimes generates loosely typed code that introduces runtime errors.

**Mandatory Practices:**
- Leverage TypeScript with strict configuration. Enable all strict flags in tsconfig.json:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noImplicitThis": true,
      "alwaysStrict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true
    }
  }
  ```
  Set TypeScript compiler to fail builds on any errors. Target zero compiler warnings.

- Define all interfaces and types in dedicated type definition files (/src/types/) before implementation. Each type file should contain no more than three hundred lines. Use the following structure:
  ```typescript
  // src/types/user.types.ts
  /**
   * Represents authenticated user in the system
   * @property id - Unique identifier (UUID v4)
   * @property email - Valid email address (RFC 5322)
   * @property createdAt - ISO 8601 timestamp
   */
  export interface User {
    id: string;
    email: string;
    createdAt: string;
  }
  ```
  Document complex types with JSDoc comments including validation rules and examples.

- Generate runtime validation schemas using Zod, Yup, or joi for all external data inputs (API requests, file uploads, environment variables). Store schemas in /src/schemas/ directory. Example mandatory validation points:
  - **API endpoints:** Validate request body, query parameters, and path parameters
  - **Database inputs:** Validate before insert/update operations
  - **Configuration:** Validate environment variables on application startup
  - **File processing:** Validate file format, size (maximum ten megabytes default), and content structure
  
  Maintain one-to-one mapping between TypeScript interfaces and validation schemas. Use code generation tools (like ts-to-zod) to keep them synchronized.

### Incremental Implementation
**Problem:** Cursor AI can generate large code changes that are difficult to review and debug.

**Mandatory Practices:**
- Break every feature into minimal viable increments following these strict size constraints:
  - **Time box:** Maximum two hours of development effort per increment (use Pomodoro technique: four twenty-five minute sessions)
  - **File limit:** Touch maximum five files per increment
  - **Line changes:** Add or modify maximum three hundred lines of code per increment (excluding tests)
  - **Test ratio:** Write minimum one hundred fifty lines of test code per increment (1:0.5 test-to-code ratio minimum)
  
  Track increment progress in /docs/increments/SPRINT-[NUMBER]-[FEATURE].md:
  ```markdown
  ## Increment 1: Database Schema (Status: Complete)
  **Started:** 2024-01-15 09:00
  **Completed:** 2024-01-15 11:00
  **Files Changed:** 3
  **Lines Added:** 245
  **Tests Added:** 156
  **Verification:** All regression tests passing (247/247)
  ```

- After each increment, run comprehensive verification before proceeding:
  1. Execute full regression test suite (must complete within five minutes)
  2. Run type checker with zero errors
  3. Execute linter with zero errors and maximum five warnings
  4. Perform smoke test of affected features (document test steps in increment log)
  5. Check code coverage (must maintain or increase existing coverage percentage)
  
  If any verification step fails, halt all new development and fix issues before proceeding.

- Implement feature flags using a structured approach (LaunchDarkly, Unleash, or custom implementation):
  ```typescript
  // src/config/feature-flags.ts
  export const FeatureFlags = {
    NEW_USER_DASHBOARD: process.env.FEATURE_NEW_DASHBOARD === 'true',
    EXPERIMENTAL_CACHING: process.env.FEATURE_EXP_CACHE === 'true',
  } as const;
  
  // Usage in code
  if (FeatureFlags.NEW_USER_DASHBOARD) {
    return newDashboardComponent();
  }
  return legacyDashboardComponent();
  ```
  Maintain feature flag registry in /docs/FEATURE_FLAGS.md listing all active flags, their purpose, creation date, and planned removal date (maximum ninety days lifetime per flag).

### Backward Compatibility Protection
**Problem:** Cursor AI can inadvertently break existing functionality when implementing new features.

**Mandatory Practices:**
- All database schema changes must follow the expand-contract pattern with these specific phases:
  
  **Phase 1 - Expand (Duration: one sprint minimum):**
  - Add new columns/tables without removing existing ones
  - Create database migration files in /migrations/ with naming: `[TIMESTAMP]_[description].sql`
  - Include rollback scripts for every migration
  - Document migration in /docs/MIGRATION_LOG.md with affected tables, estimated duration, and data volume impact
  
  **Phase 2 - Dual Write (Duration: one sprint minimum):**
  - Update application code to write to both old and new structures
  - Implement data synchronization for existing records (batch size: one thousand records per operation)
  - Monitor for data consistency issues (set up alerts for mismatches exceeding one percent)
  
  **Phase 3 - Contract (After validation period of minimum two weeks):**
  - Deprecate old columns/tables (add DEPRECATED_ prefix, don't delete immediately)
  - Remove dual-write logic after confirming zero dependencies
  - Schedule deletion of deprecated structures after minimum thirty days
  
  Example migration template:
  ```sql
  -- Migration: 2024-01-15-add-user-preferences
  -- Estimated duration: 2 minutes for 100k records
  
  BEGIN;
  
  -- Add new column
  ALTER TABLE users ADD COLUMN preferences JSONB DEFAULT '{}'::jsonb;
  CREATE INDEX idx_users_preferences ON users USING gin(preferences);
  
  -- Add migration tracking
  INSERT INTO schema_migrations (version, applied_at) VALUES ('2024-01-15-001', NOW());
  
  COMMIT;
  
  -- Rollback script (stored in migrations/rollback/)
  -- BEGIN;
  -- ALTER TABLE users DROP COLUMN preferences;
  -- DELETE FROM schema_migrations WHERE version = '2024-01-15-001';
  -- COMMIT;
  ```

- API changes must maintain backward compatibility through explicit versioning:
  - Use URL versioning: `/api/v1/`, `/api/v2/` (never exceed v5 without consolidation)
  - Maintain each version for minimum six months after introducing next version
  - Document breaking changes in /docs/API_CHANGELOG.md with migration guides
  - Provide deprecation warnings in API responses minimum ninety days before removal:
    ```json
    {
      "data": {...},
      "meta": {
        "deprecation": {
          "message": "This endpoint will be removed on 2024-06-01",
          "alternative": "/api/v2/users",
          "docs": "https://docs.example.com/migration/v1-to-v2"
        }
      }
    }
    ```

- Before accepting any code changes:
  1. Run complete test suite (minimum execution time: two minutes, maximum: ten minutes)
  2. Execute smoke tests for critical user journeys (document in /tests/smoke/)
  3. Review git diff to verify no unexpected deletions
  4. Check API contract tests pass (maintain OpenAPI/Swagger specs in /api-specs/)
  5. Verify database migrations are reversible (test rollback in staging environment)
  
  If tests don't exist for potentially affected functionality, block the change until tests are written. Minimum requirement: one integration test per affected API endpoint.

---

## Phase 3: Monitoring & Quality Assurance

### Comprehensive Error Handling
**Problem:** Cursor AI often generates happy-path code that fails ungracefully under error conditions.

**Mandatory Practices:**
- Every external call must have explicit error handling with structured error objects. Implement a centralized error handling system using this pattern:
  
  ```typescript
  // src/errors/AppError.ts
  export class AppError extends Error {
    constructor(
      public code: string,           // e.g., 'AUTH_001', 'DB_CONNECTION_FAILED'
      public message: string,         // User-friendly message
      public statusCode: number,      // HTTP status code (400, 500, etc.)
      public isOperational: boolean,  // true for expected errors, false for bugs
      public details?: Record<string, unknown>  // Additional context
    ) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Usage
  try {
    await database.query(sql);
  } catch (error) {
    throw new AppError(
      'DB_QUERY_FAILED',
      'Unable to retrieve user data',
      500,
      true,
      { query: sql, originalError: error.message }
    );
  }
  ```
  
  Maintain error code registry in /docs/ERROR_CODES.md with minimum one hundred predefined error codes across categories: authentication (AUTH_xxx), database (DB_xxx), validation (VAL_xxx), external services (EXT_xxx), business logic (BIZ_xxx).

- Implement graceful degradation strategies with documented fallback behaviors:
  
  | Component | Primary Service | Fallback Behavior | Timeout | Retry Strategy |
  |-----------|----------------|-------------------|---------|----------------|
  | User Search | Elasticsearch | PostgreSQL LIKE query | 5 seconds | 3 retries with exponential backoff |
  | Image CDN | CloudFront | Local storage cache | 10 seconds | 2 retries with 2-second delay |
  | Email Service | SendGrid | Queue for later delivery | 15 seconds | No retry, queue persistence |
  | Cache Layer | Redis | Direct database query | 2 seconds | Single retry immediate |
  
  Document fallback decision tree in /docs/DEGRADATION_STRATEGY.md with clear conditions for triggering each fallback.

- Implement structured logging using Winston, Pino, or Bunyan with consistent log levels:
  
  ```typescript
  // src/utils/logger.ts
  import winston from 'winston';
  
  export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    defaultMeta: { service: 'api-server', environment: process.env.NODE_ENV },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error', maxsize: 10485760, maxFiles: 5 }),
      new winston.transports.File({ filename: 'logs/combined.log', maxsize: 10485760, maxFiles: 10 }),
    ],
  });
  
  // Log at component boundaries
  logger.info('User authentication attempt', { userId, ipAddress, timestamp });
  logger.error('Database connection failed', { error: error.message, stack: error.stack, context });
  ```
  
  Required logging points:
  - **Every API request:** Log method, path, status code, duration, user ID (response time target: under two hundred milliseconds)
  - **All database queries:** Log query type, table, duration, record count (slow query threshold: five hundred milliseconds)
  - **External API calls:** Log service name, endpoint, duration, response status (timeout threshold: ten seconds)
  - **Authentication events:** Log success/failure, user identifier, IP address
  - **Business logic errors:** Log error code, user context, relevant data (sanitize sensitive information)
  
  Implement log aggregation with ELK Stack (Elasticsearch, Logstash, Kibana) or equivalent. Set up alerts for error rates exceeding one percent of total requests.

### Performance Consciousness
**Problem:** Cursor AI may generate functionally correct code with poor performance characteristics.

**Mandatory Practices:**
- Document explicit performance requirements for each component in /docs/PERFORMANCE_REQUIREMENTS.md using this template:
  
  ```markdown
  ## Component: User Authentication Service
  
  ### Response Time Requirements
  - 50th percentile: < 100ms
  - 95th percentile: < 200ms
  - 99th percentile: < 500ms
  - Maximum acceptable: 2000ms
  
  ### Throughput Requirements
  - Minimum: 100 requests/second per instance
  - Target: 500 requests/second per instance
  - Peak capacity: 1000 requests/second per instance
  
  ### Resource Constraints
  - Memory: Maximum 512MB per process
  - CPU: Average < 30% utilization, peak < 80%
  - Database connections: Maximum 10 concurrent per instance
  
  ### Data Volume Constraints
  - Records per page: Maximum 100 items
  - Maximum request payload: 5MB
  - Maximum response payload: 10MB
  ```

- Review all database queries using these mandatory optimization rules:
  
  **Index Requirements:**
  - Every foreign key column must have an index
  - Columns used in WHERE clauses (frequency > ten queries/minute) must be indexed
  - Composite indexes for queries filtering on multiple columns (maximum five columns per index)
  - Document all indexes in /docs/DATABASE_INDEXES.md with creation rationale
  
  **Query Optimization Checklist:**
  - [ ] Use EXPLAIN ANALYZE for queries touching more than one thousand records
  - [ ] Ensure query execution time under five hundred milliseconds (mark slow queries for optimization)
  - [ ] Verify indexes are being used (check index scan vs sequential scan in query plan)
  - [ ] Limit result sets to necessary columns only (avoid SELECT *)
  - [ ] Implement pagination for list endpoints (default page size: fifty items, maximum: one hundred items)
  - [ ] Use database connection pooling (pool size: minimum ten connections, maximum fifty connections)
  
  **Optimization Tools:**
  - Run pg_stat_statements (PostgreSQL) or slow query log (MySQL) weekly
  - Set slow query threshold to five hundred milliseconds
  - Create performance dashboard tracking query response times, connection pool utilization, cache hit rates
  - Use query optimization tools: pgAdmin, DataGrip, or Metabase for query analysis

- Implement comprehensive caching strategies with documented TTL (time-to-live) policies:
  
  ```typescript
  // src/cache/cache-config.ts
  export const CacheConfig = {
    // Static content - rarely changes
    STATIC_CONTENT: { ttl: 86400, provider: 'Redis' },      // 24 hours
    
    // User sessions - frequent access
    USER_SESSION: { ttl: 3600, provider: 'Redis' },         // 1 hour
    
    // API responses - balance freshness and performance
    API_RESPONSE: { ttl: 300, provider: 'Redis' },          // 5 minutes
    
    // Database queries - short TTL for data consistency
    DB_QUERY_RESULT: { ttl: 60, provider: 'Memory' },       // 1 minute
    
    // Computed results - expensive operations
    COMPUTED_ANALYTICS: { ttl: 1800, provider: 'Redis' },   // 30 minutes
  } as const;
  ```
  
  **Cache Invalidation Rules:**
  - Implement cache-aside pattern (lazy loading) for most use cases
  - Use write-through caching for critical data requiring consistency
  - Set up cache warming for predictable high-traffic periods
  - Monitor cache hit ratio (target: minimum seventy percent)
  - Implement circuit breaker pattern when cache service unavailable (timeout: five seconds, error threshold: five consecutive failures)
  
  Document all cached entities in /docs/CACHING_STRATEGY.md with invalidation triggers and fallback behaviors. Review and update caching strategy monthly.

### Code Quality Metrics
**Problem:** Cursor AI can generate code that works but is difficult to maintain.

**Mandatory Practices:**
- Enforce strict function complexity limits using automated tools (ESLint, SonarQube):
  
  **Function Size Limits:**
  - Maximum fifty lines per function (excluding comments and blank lines)
  - Maximum five parameters per function (use configuration objects for more)
  - Maximum three levels of nesting (if/loops/try-catch)
  - Maximum ten local variables per function
  
  For functions exceeding limits, refactor using these patterns:
  ```typescript
  // Before: Complex function with 80 lines
  function processUserData(user, options, context) {
    // 80 lines of mixed logic
  }
  
  // After: Composed from smaller functions
  function processUserData(user: User, options: ProcessOptions): ProcessedUser {
    const validated = validateUserInput(user);
    const enriched = enrichUserData(validated, options);
    const transformed = transformUserFormat(enriched);
    return finalizeUserRecord(transformed);
  }
  
  // Each sub-function is under 15 lines
  ```

- Maintain cyclomatic complexity below defined thresholds using complexity analysis tools:
  
  **Complexity Thresholds:**
  - Functions: Maximum complexity of 10 (measure with ESLint complexity rule)
  - Modules: Maximum complexity of 50
  - Classes: Maximum complexity of 75
  
  **Complexity Reduction Patterns:**
  - Replace complex conditionals with lookup tables or strategy pattern
  - Extract nested conditions into well-named guard clauses
  - Use early returns to reduce nesting depth
  - Replace switch statements with polymorphism or configuration objects
  
  Example refactoring:
  ```typescript
  // High complexity (complexity: 12)
  function calculateDiscount(user, product, date) {
    if (user.isPremium) {
      if (product.category === 'electronics') {
        if (date.isHoliday) {
          return product.price * 0.25;
        } else if (date.isWeekend) {
          return product.price * 0.20;
        }
        return product.price * 0.15;
      }
      // More nested conditions...
    }
  }
  
  // Low complexity (complexity: 3) - Strategy pattern
  const discountStrategies = {
    'premium-electronics-holiday': (price) => price * 0.25,
    'premium-electronics-weekend': (price) => price * 0.20,
    'premium-electronics-weekday': (price) => price * 0.15,
    // ...more strategies in configuration
  };
  
  function calculateDiscount(user: User, product: Product, date: Date): number {
    const key = buildDiscountKey(user, product, date);
    const strategy = discountStrategies[key] || defaultDiscount;
    return strategy(product.price);
  }
  ```

- Generate comprehensive documentation for all public interfaces using JSDoc/TSDoc:
  
  **Required Documentation Elements:**
  ```typescript
  /**
   * Retrieves user profile with associated preferences and activity history.
   * 
   * This function performs a complex join across three tables and applies
   * privacy filters based on user permissions. Results are cached for 5 minutes.
   * 
   * @param userId - Unique user identifier (UUID v4 format)
   * @param options - Configuration options for data retrieval
   * @param options.includeActivity - Whether to include activity history (default: false)
   * @param options.maxActivityItems - Maximum activity items to return (default: 50, max: 100)
   * 
   * @returns Promise resolving to UserProfile object with associated data
   * 
   * @throws {AppError} AUTH_001 if user lacks permission to view profile
   * @throws {AppError} DB_QUERY_FAILED if database operation fails
   * 
   * @example
   * ```typescript
   * const profile = await getUserProfile('uuid-123', { includeActivity: true });
   * console.log(profile.preferences); // User preferences object
   * ```
   * 
   * @see {@link UserProfile} for return type structure
   * @see {@link AppError} for error handling details
   * 
   * @since 2.1.0
   */
  export async function getUserProfile(
    userId: string,
    options: ProfileOptions = {}
  ): Promise<UserProfile> {
    // Implementation
  }
  ```
  
  **Documentation Coverage Requirements:**
  - One hundred percent of public API functions must have JSDoc comments
  - All complex algorithms (complexity > 5) must include explanation comments
  - Every module must have a file-level comment describing its purpose
  - Update documentation within twenty-four hours of code changes
  
  **Automated Documentation Tools:**
  - Use TypeDoc or JSDoc to generate API documentation automatically
  - Configure CI/CD to build docs on every commit to main branch
  - Host generated documentation (update on deploy, maintain last three versions)
  - Set up doc-coverage reporting (target: ninety-five percent coverage)

---

## Phase 4: Testing

### Test Coverage Requirements
**Problem:** Cursor AI rarely generates comprehensive test suites without explicit direction.

**Mandatory Practices:**
- Achieve minimum eighty percent test coverage for all new code with these specific breakdowns:
  
  **Coverage Targets by Component Type:**
  - Business logic functions: ninety-five percent coverage (critical paths must be one hundred percent)
  - API endpoints: eighty-five percent coverage (all status codes tested)
  - Database operations: ninety percent coverage (error cases included)
  - Utility functions: eighty percent coverage
  - UI components: seventy percent coverage (focus on user interactions)
  
  **Required Coverage Metrics (measure with Jest, Istanbul, or NYC):**
  - Statement coverage: minimum eighty percent
  - Branch coverage: minimum seventy-five percent (all if/else paths)
  - Function coverage: minimum eighty-five percent
  - Line coverage: minimum eighty percent
  
  Configure coverage thresholds in test configuration:
  ```json
  // jest.config.js
  {
    "coverageThreshold": {
      "global": {
        "branches": 75,
        "functions": 85,
        "lines": 80,
        "statements": 80
      },
      "./src/core/": {
        "branches": 90,
        "functions": 95,
        "lines": 90,
        "statements": 90
      }
    }
  }
  ```

- Implement test-first development using this structured approach:
  
  **Testing Framework Stack:**
  - Unit testing: Jest (JavaScript/TypeScript) or pytest (Python)
  - Integration testing: Supertest (API) or Testing Library (UI)
  - End-to-end testing: Playwright or Cypress
  - Mocking: jest.mock() or Sinon.js
  - Fixtures: Factory pattern with libraries like Fishery or Factory Bot
  
  **Test File Organization:**
  ```
  src/
  ├── components/
  │   ├── UserProfile.ts
  │   └── __tests__/
  │       ├── UserProfile.test.ts        (unit tests)
  │       └── UserProfile.integration.ts (integration tests)
  ├── services/
  │   ├── AuthService.ts
  │   └── __tests__/
  │       └── AuthService.test.ts
  └── __e2e__/
      └── user-authentication.e2e.ts
  ```

- Write integration tests following the testing pyramid principle:
  
  **Test Distribution (by quantity):**
  - Unit tests: seventy percent of total tests (fast, isolated, many)
  - Integration tests: twenty percent of total tests (test component interaction)
  - End-to-end tests: ten percent of total tests (test critical user journeys)
  
  **Integration Test Requirements:**
  - Use real database instances (Docker containers for test isolation)
  - Test actual HTTP requests (no mocking of external boundaries)
  - Verify database state changes after operations
  - Clean up test data after each test (use transactions or database reset)
  - Maximum execution time: thirty seconds per integration test
  
  **Example Integration Test Structure:**
  ```typescript
  describe('User Registration Flow', () => {
    let testDb: Database;
    let testServer: Server;
    
    beforeAll(async () => {
      testDb = await setupTestDatabase();
      testServer = await startTestServer({ db: testDb });
    });
    
    afterAll(async () => {
      await testServer.close();
      await testDb.teardown();
    });
    
    afterEach(async () => {
      await testDb.cleanupTestData();
    });
    
    it('should create user and send welcome email', async () => {
      // Arrange: Setup test data
      const userData = createTestUser({ email: 'test@example.com' });
      
      // Act: Execute operation
      const response = await request(testServer)
        .post('/api/v1/users')
        .send(userData);
      
      // Assert: Verify outcomes
      expect(response.status).toBe(201);
      expect(response.body.user.email).toBe(userData.email);
      
      const dbUser = await testDb.findUserByEmail(userData.email);
      expect(dbUser).toBeDefined();
      expect(dbUser.status).toBe('active');
      
      const emailJobs = await testDb.getEmailQueue();
      expect(emailJobs).toHaveLength(1);
      expect(emailJobs[0].template).toBe('welcome');
    });
  });
  ```

- Maintain separate test categories with clear execution strategies:
  
  **Test Execution Configuration:**
  | Test Type | Execution Trigger | Max Duration | Isolation Level | CI/CD Stage |
  |-----------|------------------|--------------|-----------------|-------------|
  | Unit | Pre-commit hook | 2 minutes | Per-function | Every commit |
  | Integration | Pre-push hook | 5 minutes | Per-component | Every PR |
  | E2E | Scheduled + Deploy | 15 minutes | Full system | Before deploy |
  | Performance | Nightly | 30 minutes | Production-like | Daily |
  | Security | Weekly | 60 minutes | Full scan | Weekly + Release |
  
  Configure test scripts in package.json:
  ```json
  {
    "scripts": {
      "test": "jest --coverage",
      "test:unit": "jest --testPathPattern=\\.test\\.ts$",
      "test:integration": "jest --testPathPattern=\\.integration\\.ts$",
      "test:e2e": "playwright test",
      "test:watch": "jest --watch",
      "test:ci": "jest --ci --coverage --maxWorkers=2"
    }
  }
  ```

### Test-Driven Development
**Problem:** Cursor AI tends to write implementation first, making tests an afterthought.

**Mandatory Practices:**
- For complex logic (cyclomatic complexity > 5), implement strict red-green-refactor TDD cycle:
  
  **TDD Workflow (total cycle time: maximum thirty minutes):**
  1. **Red Phase (5 minutes):** Write failing test that describes expected behavior
  2. **Green Phase (15 minutes):** Write minimum code to make test pass
  3. **Refactor Phase (10 minutes):** Improve code structure while keeping tests green
  
  Document TDD sessions in /docs/tdd-log/[FEATURE]-[DATE].md:
  ```markdown
  ## TDD Session: User Authentication Validation
  **Date:** 2024-01-15
  **Complexity:** 7
  
  ### Cycle 1: Email Validation
  - **Red:** Test expects rejection of invalid email format
  - **Green:** Implemented regex validation
  - **Refactor:** Extracted validation to reusable function
  - **Duration:** 22 minutes
  
  ### Cycle 2: Password Strength Check
  - **Red:** Test expects minimum 8 characters, 1 number, 1 special char
  - **Green:** Implemented character validation logic
  - **Refactor:** Created PasswordValidator class
  - **Duration:** 28 minutes
  ```

- Generate tests that document expected behavior through concrete examples using Given-When-Then structure:
  
  ```typescript
  describe('Order Processing Service', () => {
    describe('when processing a valid order', () => {
      it('should create order record, reduce inventory, and send confirmation email', async () => {
        // Given: A customer with valid payment method and products in stock
        const customer = createTestCustomer({ verified: true, balance: 1000 });
        const product = createTestProduct({ stock: 50, price: 100 });
        const order = { customerId: customer.id, items: [{ productId: product.id, quantity: 2 }] };
        
        // When: Order is processed
        const result = await orderService.processOrder(order);
        
        // Then: Order is created, inventory reduced, email queued
        expect(result.status).toBe('confirmed');
        expect(result.orderId).toBeDefined();
        
        const updatedProduct = await db.getProduct(product.id);
        expect(updatedProduct.stock).toBe(48); // 50 - 2
        
        const emails = await db.getEmailQueue({ customerId: customer.id });
        expect(emails).toHaveLength(1);
        expect(emails[0].type).toBe('order_confirmation');
      });
    });
    
    describe('when processing order with insufficient stock', () => {
      it('should reject order and notify customer of unavailability', async () => {
        // Given: Product with limited stock
        const product = createTestProduct({ stock: 1, price: 100 });
        const order = { items: [{ productId: product.id, quantity: 5 }] };
        
        // When: Order exceeds available stock
        const result = await orderService.processOrder(order);
        
        // Then: Order rejected with clear error
        expect(result.status).toBe('rejected');
        expect(result.error.code).toBe('INSUFFICIENT_STOCK');
        expect(result.error.details.requested).toBe(5);
        expect(result.error.details.available).toBe(1);
      });
    });
  });
  ```

- Maintain separate test categories with clear naming conventions:
  
  **Test File Naming Standards:**
  ```
  [ComponentName].test.ts          // Unit tests
  [ComponentName].integration.ts   // Integration tests
  [ComponentName].e2e.ts          // End-to-end tests
  [ComponentName].perf.ts         // Performance tests
  [ComponentName].security.ts     // Security tests
  ```
  
  **Test Organization by Concern:**
  ```
  tests/
  ├── unit/                        // Fast, isolated tests
  │   ├── services/
  │   ├── utils/
  │   └── models/
  ├── integration/                 // Component interaction tests
  │   ├── api/
  │   ├── database/
  │   └── external-services/
  ├── e2e/                        // Full system tests
  │   ├── user-journeys/
  │   └── critical-paths/
  ├── performance/                 // Load and stress tests
  └── security/                    // Security validation tests
  ```

### Edge Case Validation
**Problem:** Cursor AI focuses on typical use cases and misses boundary conditions.

**Mandatory Practices:**
- Explicitly enumerate edge cases during planning phase using this checklist template stored in /docs/edge-cases/[FEATURE].md:
  
  ```markdown
  ## Edge Case Analysis: User Input Validation
  
  ### Boundary Values
  - [ ] Empty string ('')
  - [ ] Single character ('a')
  - [ ] Maximum length (test at limit, limit+1)
  - [ ] Minimum value (test at minimum, minimum-1)
  - [ ] Maximum value (test at maximum, maximum+1)
  - [ ] Zero (0)
  - [ ] Negative numbers (-1, -100)
  - [ ] Very large numbers (Number.MAX_SAFE_INTEGER)
  
  ### Null/Undefined Cases
  - [ ] null value
  - [ ] undefined value
  - [ ] Missing required parameter
  - [ ] Optional parameter omitted
  
  ### Collection Edge Cases
  - [ ] Empty array ([])
  - [ ] Single-item array ([item])
  - [ ] Large array (1000+ items)
  - [ ] Empty object ({})
  - [ ] Nested empty structures
  
  ### Format Variations
  - [ ] Leading/trailing whitespace
  - [ ] Special characters (!@#$%^&*)
  - [ ] Unicode characters (emoji, accents)
  - [ ] Different date formats
  - [ ] Different number formats (scientific notation)
  
  ### Error Conditions
  - [ ] Network timeout
  - [ ] Database connection failure
  - [ ] File not found
  - [ ] Permission denied
  - [ ] Rate limit exceeded
  ```

- Test with maximum and minimum input values systematically:
  
  **Boundary Testing Framework:**
  ```typescript
  // Test helper for boundary validation
  function testBoundaries<T>(
    functionUnderTest: (input: T) => any,
    boundaries: {
      valid: T[];        // Values that should work
      invalid: T[];      // Values that should fail gracefully
      edge: T[];         // Boundary values requiring special handling
    }
  ) {
    describe('boundary value testing', () => {
      boundaries.valid.forEach(value => {
        it(`should handle valid input: ${JSON.stringify(value)}`, () => {
          expect(() => functionUnderTest(value)).not.toThrow();
        });
      });
      
      boundaries.invalid.forEach(value => {
        it(`should reject invalid input: ${JSON.stringify(value)}`, () => {
          expect(() => functionUnderTest(value)).toThrow();
        });
      });
      
      boundaries.edge.forEach(value => {
        it(`should handle edge case: ${JSON.stringify(value)}`, () => {
          const result = functionUnderTest(value);
          expect(result).toBeDefined();
        });
      });
    });
  }
  
  // Usage example
  testBoundaries(validateAge, {
    valid: [18, 25, 65, 100],
    invalid: [-1, 0, 151, 'abc', null, undefined],
    edge: [1, 17, 150]
  });
  ```

- Create chaos testing scenarios using fault injection:
  
  **Chaos Testing Requirements:**
  - Run chaos tests weekly in staging environment (duration: one hour)
  - Inject random failures: database disconnections (ten percent of requests), API timeouts (five percent of requests), memory pressure (spike to ninety percent utilization)
  - Verify system graceful degradation and recovery
  - Maximum acceptable downtime: five minutes during chaos test
  - Document chaos test results in /docs/chaos-testing/YYYY-MM-DD-results.md
  
  **Chaos Testing Tools:**
  - Use Chaos Monkey, Gremlin, or Chaos Toolkit
  - Configure failure injection scenarios:
    ```yaml
    # chaos-config.yaml
    scenarios:
      - name: database_failure
        probability: 0.1
        duration: 60s
        recovery_time: 30s
        
      - name: api_timeout
        probability: 0.05
        response_delay: 10s
        affected_endpoints: ['/api/v1/users', '/api/v1/orders']
        
      - name: memory_pressure
        probability: 0.02
        memory_usage: 90%
        duration: 120s
    ```

---

## Phase 5: Deployment & Operations

### Security Verification
**Problem:** Cursor AI may introduce security vulnerabilities through insecure coding practices.

**Mandatory Practices:**
- Review all user inputs for injection vulnerabilities using the OWASP Top 10 as a checklist:
  
  **Input Validation Requirements:**
  ```typescript
  // Mandatory validation for all user inputs
  import { z } from 'zod';
  
  const UserInputSchema = z.object({
    email: z.string().email().max(255),
    username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/),
    age: z.number().int().min(0).max(150),
    bio: z.string().max(1000),
  });
  
  // Sanitization for output
  import DOMPurify from 'isomorphic-dompurify';
  
  function sanitizeHTML(input: string): string {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
      ALLOWED_ATTR: ['href']
    });
  }
  ```
  
  **SQL Injection Prevention (mandatory for all database queries):**
  - Use parameterized queries exclusively (never string concatenation)
  - Employ ORM query builders (TypeORM, Prisma, Sequelize)
  - Validate and sanitize all dynamic query parameters
  - Limit database user permissions (application user cannot DROP, ALTER)
  
  **Example Safe Query Pattern:**
  ```typescript
  // ✅ CORRECT: Parameterized query
  const user = await db.query(
    'SELECT * FROM users WHERE email = $1 AND status = $2',
    [email, 'active']
  );
  
  // ❌ INCORRECT: String concatenation (vulnerable to SQL injection)
  const user = await db.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  ```

- Implement authentication and authorization checks at every entry point:
  
  **Authentication Requirements:**
  - Use industry-standard protocols: OAuth 2.0, OpenID Connect, or SAML
  - Implement JWT tokens with short expiration (access token: fifteen minutes, refresh token: seven days)
  - Store passwords using bcrypt with minimum cost factor of twelve
  - Enforce password requirements: minimum eight characters, one uppercase, one lowercase, one number, one special character
  - Implement account lockout after five failed login attempts (lockout duration: thirty minutes)
  - Enable two-factor authentication for admin accounts (mandatory) and regular users (optional)
  
  **Authorization Middleware Template:**
  ```typescript
  // src/middleware/authorization.ts
  export function requirePermission(permission: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      // 1. Verify JWT token presence and validity
      const token = extractToken(req);
      if (!token) {
        return res.status(401).json({ error: 'AUTH_001', message: 'No authentication token' });
      }
      
      // 2. Decode and verify token
      try {
        const decoded = await verifyJWT(token);
        req.user = decoded;
      } catch (error) {
        return res.status(401).json({ error: 'AUTH_002', message: 'Invalid token' });
      }
      
      // 3. Check user has required permission
      const hasPermission = await checkUserPermission(req.user.id, permission);
      if (!hasPermission) {
        logger.warn('Authorization failed', {
          userId: req.user.id,
          permission,
          endpoint: req.path
        });
        return res.status(403).json({ error: 'AUTH_003', message: 'Insufficient permissions' });
      }
      
      // 4. Proceed to route handler
      next();
    };
  }
  
  // Usage in routes
  app.post('/api/v1/admin/users', 
    requirePermission('users.create'),
    createUserHandler
  );
  ```
  
  **Role-Based Access Control Matrix (maintain in /docs/RBAC_MATRIX.md):**
  | Role | users.read | users.create | users.update | users.delete | admin.access |
  |------|-----------|--------------|--------------|--------------|--------------|
  | Guest | ❌ | ❌ | ❌ | ❌ | ❌ |
  | User | Own Only | ❌ | Own Only | ❌ | ❌ |
  | Moderator | ✅ | ❌ | ✅ | ❌ | ❌ |
  | Admin | ✅ | ✅ | ✅ | ✅ | ✅ |

- Conduct comprehensive security reviews using this mandatory checklist:
  
  **Pre-Deployment Security Checklist (/docs/security/SECURITY_CHECKLIST.md):**
  ```markdown
  ## Authentication & Authorization
  - [ ] All endpoints require authentication (except public APIs)
  - [ ] Authorization checks implemented for all sensitive operations
  - [ ] JWT tokens have appropriate expiration times
  - [ ] Refresh token rotation implemented
  - [ ] Password policies enforced (complexity, length, history)
  
  ## Input Validation & Sanitization
  - [ ] All user inputs validated using schemas
  - [ ] SQL queries use parameterized statements
  - [ ] HTML output sanitized to prevent XSS
  - [ ] File uploads restricted by type and size
  - [ ] Rate limiting implemented (100 requests per minute per IP)
  
  ## Data Protection
  - [ ] Sensitive data encrypted at rest (AES-256)
  - [ ] TLS 1.3 enforced for all connections
  - [ ] API keys stored in environment variables (never in code)
  - [ ] Database credentials rotated quarterly
  - [ ] Secrets managed through vault service (AWS Secrets Manager, HashiCorp Vault)
  
  ## Session Management
  - [ ] Session tokens generated cryptographically (minimum 32 bytes entropy)
  - [ ] Sessions expire after thirty minutes of inactivity
  - [ ] Logout invalidates all user sessions
  - [ ] Session fixation attacks prevented
  
  ## Error Handling & Logging
  - [ ] Error messages don't expose sensitive information
  - [ ] Stack traces disabled in production
  - [ ] Security events logged (failed logins, permission denials)
  - [ ] Logs don't contain passwords or tokens
  
  ## Dependencies & Infrastructure
  - [ ] All dependencies scanned for vulnerabilities (npm audit, Snyk)
  - [ ] Dependencies updated monthly (security patches immediately)
  - [ ] CORS configured restrictively (specific origins only)
  - [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
  - [ ] Database backups encrypted and tested monthly
  ```
  
  **Automated Security Scanning Tools (run weekly):**
  - **SAST (Static Application Security Testing):** SonarQube, Checkmarx, or Semgrep
  - **DAST (Dynamic Application Security Testing):** OWASP ZAP, Burp Suite
  - **Dependency Scanning:** npm audit, Snyk, or Dependabot
  - **Secret Scanning:** GitGuardian, TruffleHog
  - **Container Scanning:** Trivy, Clair (if using Docker)
  
  **Security Scan Thresholds (build fails if exceeded):**
  - Critical vulnerabilities: zero allowed
  - High vulnerabilities: maximum two (with mitigation plan within forty-eight hours)
  - Medium vulnerabilities: maximum ten
  - Secrets detected in code: zero allowed
  
  Document all security findings and remediation in /docs/security/SECURITY_LOG.md with tracking numbers, severity, discovery date, and resolution date.

### Deployment Safety
**Problem:** AI-generated code may work in development but fail in production environments.

**Mandatory Practices:**
- Implement progressive deployment strategies with automated rollback capabilities:
  
  **Deployment Strategy Selection Matrix:**
  | Change Type | Strategy | Traffic Split | Validation Period | Rollback Threshold |
  |-------------|----------|--------------|-------------------|-------------------|
  | Bug fix | Blue-Green | 100% switch | 30 minutes | Error rate > 1% |
  | Minor feature | Canary | 5% → 25% → 100% | 2 hours per stage | Error rate > 0.5% |
  | Major feature | Canary | 1% → 10% → 50% → 100% | 4 hours per stage | Error rate > 0.3% |
  | Database migration | Blue-Green | 100% switch | 1 hour | Any schema error |
  | Infrastructure | Rolling | 25% increments | 30 minutes per wave | Service down |
  
  **Blue-Green Deployment Procedure:**
  ```bash
  # 1. Deploy to green environment (idle)
  ./deploy.sh --environment=green --version=v2.5.0
  
  # 2. Run health checks on green
  ./health-check.sh --environment=green --timeout=300
  # Expected: All health endpoints return 200, database connectivity OK, cache connected
  
  # 3. Run smoke tests on green
  ./smoke-tests.sh --environment=green --critical-paths-only
  # Expected: Login flow, checkout flow, API authentication all pass
  
  # 4. Switch traffic to green (immediate cutover)
  ./switch-traffic.sh --from=blue --to=green
  
  # 5. Monitor for 30 minutes
  ./monitor.sh --duration=1800 --alert-threshold=1%
  
  # 6. If monitoring passes, decommission blue
  ./decommission.sh --environment=blue
  
  # 7. If monitoring fails, rollback
  ./switch-traffic.sh --from=green --to=blue --immediate
  ```
  
  **Canary Deployment Procedure:**
  ```bash
  # 1. Deploy canary instances (1% of traffic)
  ./deploy-canary.sh --version=v2.5.0 --traffic=1 --instances=2
  
  # 2. Monitor canary for 4 hours
  ./monitor-canary.sh --duration=14400 --compare=baseline
  # Monitoring: Error rate, response time (p50, p95, p99), CPU/memory usage
  
  # 3. If canary healthy, increase to 10%
  ./scale-canary.sh --traffic=10 --instances=5
  ./monitor-canary.sh --duration=14400
  
  # 4. Progressive rollout: 10% → 50% → 100%
  ./scale-canary.sh --traffic=50 --instances=20
  ./monitor-canary.sh --duration=14400
  
  ./scale-canary.sh --traffic=100
  ./decommission-baseline.sh
  
  # At any stage, if monitoring fails:
  ./rollback-canary.sh --immediate --preserve-logs
  ```

- Generate comprehensive deployment runbooks stored in /docs/runbooks/:
  
  **Standard Deployment Runbook Template (/docs/runbooks/DEPLOY_[SERVICE]_[VERSION].md):**
  ```markdown
  # Deployment Runbook: API Service v2.5.0
  
  **Deployment Date:** 2024-01-20
  **Deployment Window:** 02:00-04:00 UTC (Saturday)
  **Estimated Duration:** 90 minutes
  **Risk Level:** Medium
  **Rollback Complexity:** Low (automated)
  
  ## Pre-Deployment Checklist (T-24 hours)
  - [ ] All tests passing in CI/CD (2,547 tests, 0 failures)
  - [ ] Security scan completed (0 critical, 1 high - documented)
  - [ ] Performance testing completed (meets SLA requirements)
  - [ ] Database migrations tested in staging
  - [ ] Rollback procedure tested in staging
  - [ ] On-call engineer confirmed available
  - [ ] Stakeholders notified of deployment window
  - [ ] Feature flags configured and tested
  
  ## Environment Preparation (T-2 hours)
  ### Database Preparation
  ```bash
  # Backup production database
  pg_dump production > backups/pre-deploy-2024-01-20.sql
  # Expected size: ~5GB, Duration: 15 minutes
  
  # Verify backup integrity
  pg_restore --list backups/pre-deploy-2024-01-20.sql | wc -l
  # Expected: ~150,000 objects
  ```
  
  ### Infrastructure Scaling
  ```bash
  # Temporarily increase capacity for deployment
  kubectl scale deployment api-server --replicas=20
  # Normal: 15 replicas, Deployment: 20 replicas
  
  # Verify all pods ready
  kubectl get pods | grep api-server | grep Running | wc -l
  # Expected: 20
  ```
  
  ## Deployment Steps
  ### Step 1: Database Migration (Duration: 10 minutes)
  ```bash
  # Run migrations in transaction
  npm run migrate:up -- --environment=production
  
  # Verify migration success
  npm run migrate:status
  # Expected output: "All migrations completed successfully"
  
  # Check table schemas
  psql production -c "\d users"
  # Expected: New column 'preferences' exists with type JSONB
  ```
  
  **Validation Criteria:**
  - Migration completes without errors
  - All tables accessible
  - No locked tables (check pg_locks)
  - Application connections still functioning
  
  **If Migration Fails:**
  ```bash
  npm run migrate:down -- --steps=1 --environment=production
  # Halt deployment, investigate, reschedule
  ```
  
  ### Step 2: Application Deployment (Duration: 30 minutes)
  ```bash
  # Deploy using blue-green strategy
  ./deploy-blue-green.sh \
    --version=v2.5.0 \
    --environment=production \
    --strategy=blue-green \
    --validation-time=1800
  ```
  
  **Deployment Progress Monitoring:**
  - T+0: Green environment deployment starts
  - T+10: Health checks running on green
  - T+15: Smoke tests executing on green
  - T+20: Traffic switch to green
  - T+50: Monitoring period complete
  - T+60: Blue environment decommissioned
  
  ### Step 3: Post-Deployment Validation (Duration: 30 minutes)
  ```bash
  # Run comprehensive smoke tests
  npm run test:smoke -- --environment=production
  # Expected: All 45 smoke tests pass
  
  # Verify critical user journeys
  ./test-user-journeys.sh
  # Tests: Login, Registration, Checkout, Profile Update
  
  # Check error rates
  curl https://monitoring.example.com/api/error-rate?window=30m
  # Expected: < 0.5% (baseline: 0.2%)
  
  # Check response times
  curl https://monitoring.example.com/api/response-time?p=95&window=30m
  # Expected: < 200ms (baseline: 150ms)
  ```
  
  **Success Criteria:**
  - All smoke tests passing
  - Error rate below 0.5%
  - P95 response time under 200ms
  - No customer complaints reported
  - Database connection pool healthy
  - Cache hit rate above 70%
  
  ## Rollback Procedure (Maximum Execution Time: 15 minutes)
  
  ### Automatic Rollback Triggers
  - Error rate exceeds 1% for more than 5 minutes
  - P95 response time exceeds 500ms for more than 5 minutes
  - More than 10% of health checks failing
  - Database connection errors exceeding 5% of requests
  - Any critical service dependency unavailable
  
  ### Manual Rollback Steps
  ```bash
  # 1. Immediate traffic switch to blue (old version)
  ./switch-traffic.sh --from=green --to=blue --immediate --reason="[reason]"
  # Expected: Traffic switches within 30 seconds
  
  # 2. Verify blue environment healthy
  ./health-check.sh --environment=blue --comprehensive
  
  # 3. Roll back database migrations if necessary
  npm run migrate:down -- --steps=3 --environment=production
  # Only if schema changes are incompatible
  
  # 4. Restore database from backup if critical data corruption
  pg_restore --clean --if-exists -d production backups/pre-deploy-2024-01-20.sql
  # Expected duration: 20 minutes for 5GB database
  # WARNING: This causes ~5 minutes of downtime
  
  # 5. Decommission green environment
  ./decommission.sh --environment=green --preserve-logs
  
  # 6. Notify stakeholders
  ./notify.sh --channel=incidents --message="Deployment rolled back: [reason]"
  ```
  
  **Post-Rollback Verification:**
  - [ ] Traffic fully on blue environment
  - [ ] Error rate back to baseline
  - [ ] Response times normal
  - [ ] All critical features functional
  - [ ] No customer-reported issues
  - [ ] Incident report created (within 2 hours)
  
  ## Post-Deployment Tasks (T+24 hours)
  - [ ] Remove feature flags for stable features
  - [ ] Update documentation with any API changes
  - [ ] Review deployment metrics and document lessons learned
  - [ ] Schedule retrospective meeting
  - [ ] Update runbook with any discovered issues
  - [ ] Scale infrastructure back to normal capacity
  
  ## Contact Information
  - Primary On-Call: [Engineer Name] - [Phone] - [Slack]
  - Secondary On-Call: [Engineer Name] - [Phone] - [Slack]
  - Database Admin: [DBA Name] - [Phone] - [Slack]
  - DevOps Team: #devops-team (Slack)
  - Incident Commander: [Manager Name] - [Phone]
  ```
  
  **Runbook Storage and Maintenance:**
  - Store all runbooks in version control (/docs/runbooks/)
  - Review and update runbooks after every deployment
  - Test runbooks quarterly in staging environment
  - Maintain runbook templates for common deployment patterns
  - Include exact commands, expected outputs, and timing estimates
  
- Implement comprehensive monitoring and alerting with automated rollback:
  
  **Monitoring Stack Requirements:**
  - **Metrics:** Prometheus + Grafana (retention: thirty days)
  - **Logs:** ELK Stack or DataDog (retention: ninety days)
  - **APM:** New Relic, DataDog, or Dynatrace
  - **Uptime:** Pingdom or UptimeRobot (five minute intervals)
  - **Real User Monitoring:** LogRocket or Sentry
  
  **Critical Metrics Dashboard Configuration:**
  ```yaml
  # monitoring/dashboards/deployment-metrics.yaml
  dashboard:
    name: "Deployment Health"
    refresh_rate: 30s
    
    panels:
      - title: "Error Rate"
        query: "rate(http_requests_total{status=~'5..'}[5m])"
        threshold_warning: 0.5%
        threshold_critical: 1.0%
        alert_channel: "#alerts-critical"
        
      - title: "Response Time P95"
        query: "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
        threshold_warning: 200ms
        threshold_critical: 500ms
        alert_channel: "#alerts-performance"
        
      - title: "Database Connection Pool"
        query: "pg_stat_activity_count / pg_max_connections"
        threshold_warning: 70%
        threshold_critical: 85%
        alert_channel: "#alerts-database"
        
      - title: "Cache Hit Rate"
        query: "rate(redis_keyspace_hits_total[5m]) / rate(redis_keyspace_misses_total[5m] + redis_keyspace_hits_total[5m])"
        threshold_warning: 70%
        threshold_critical: 50%
        alert_channel: "#alerts-infrastructure"
        
      - title: "Request Rate"
        query: "rate(http_requests_total[1m])"
        threshold_warning: null  # Informational only
        threshold_critical: null
        
      - title: "Active Users"
        query: "active_user_sessions"
        threshold_warning: null
        threshold_critical: null
  ```
  
  **Automated Rollback Configuration:**
  ```javascript
  // monitoring/auto-rollback-config.js
  const rollbackRules = [
    {
      name: 'high_error_rate',
      condition: 'error_rate > 1% for 5 minutes',
      action: 'immediate_rollback',
      notification: ['#incidents', 'on-call-engineer'],
    },
    {
      name: 'response_time_degradation',
      condition: 'p95_response_time > 500ms for 10 minutes',
      action: 'immediate_rollback',
      notification: ['#incidents', 'on-call-engineer'],
    },
    {
      name: 'database_connection_failure',
      condition: 'db_connection_errors > 5% for 3 minutes',
      action: 'immediate_rollback',
      notification: ['#incidents-critical', 'on-call-engineer', 'dba-team'],
    },
    {
      name: 'service_availability',
      condition: 'health_check_failure_rate > 10% for 2 minutes',
      action: 'immediate_rollback',
      notification: ['#incidents-critical', 'on-call-engineer'],
    },
  ];
  
  // Rollback cool-down period: 15 minutes
  // Maximum automatic rollbacks per day: 3
  // After 3 automatic rollbacks, require manual intervention
  ```

### Documentation Completeness
**Problem:** Cursor AI generates code but rarely maintains comprehensive documentation.

**Mandatory Practices:**
- Maintain architecture documentation with quarterly review cycle:
  
  **Required Architecture Documents (/docs/architecture/):**
  
  **1. ARCHITECTURE.md (Maximum 3,000 words, updated within 24 hours of architectural changes):**
  ```markdown
  # System Architecture Overview
  **Last Updated:** 2024-01-15
  **Version:** 3.2
  **Next Review:** 2024-04-15
  
  ## System Components
  ### Frontend Layer
  - **Technology:** React 18.2, TypeScript 5.0
  - **Deployment:** CloudFront CDN, S3 static hosting
  - **Responsibilities:** User interface, client-side validation, API consumption
  - **Performance Target:** First Contentful Paint < 1.5s, Time to Interactive < 3s
  
  ### API Layer
  - **Technology:** Node.js 20 LTS, Express 4.18
  - **Deployment:** ECS Fargate, Application Load Balancer
  - **Scaling:** Auto-scaling 5-50 instances based on CPU (target: 60%)
  - **Responsibilities:** Business logic, authentication, data validation
  - **Performance Target:** P95 response time < 200ms
  
  ### Data Layer
  - **Primary Database:** PostgreSQL 15 (RDS Multi-AZ)
  - **Cache:** Redis 7.0 (ElastiCache cluster mode enabled)
  - **Search:** Elasticsearch 8.0 (OpenSearch managed)
  - **Storage:** S3 Standard (documents), S3 Glacier (archives)
  
  ## Data Flow Diagrams
  [Include diagrams showing request flow, data transformations, external integrations]
  
  ## Key Design Decisions
  ### Decision 001: Database Choice
  - **Context:** Needed transactional consistency with complex queries
  - **Decision:** PostgreSQL with JSONB for flexible schema
  - **Alternatives:** MongoDB (rejected: weak transactions), MySQL (rejected: limited JSON support)
  - **Consequences:** Strong consistency, complex schema migrations
  
  ## System Boundaries
  - Frontend must not directly access database (API gateway enforced)
  - Services communicate via REST APIs (no direct database access between services)
  - External integrations use circuit breaker pattern (timeout: 10s, failure threshold: 5)
  
  ## Technology Constraints
  - Node.js version: 20 LTS (upgrade annually)
  - TypeScript: Latest stable (upgrade quarterly)
  - Database: PostgreSQL 15+ (upgrade when AWS RDS supports)
  - Minimum browser support: Last 2 versions of Chrome, Firefox, Safari, Edge
  ```
  
  **2. TECHNICAL_DEBT.md (Reviewed monthly, prioritized quarterly):**
  ```markdown
  # Technical Debt Registry
  
  ## High Priority (Address within 1 quarter)
  ### TD-001: Legacy Authentication System
  - **Issue:** Using deprecated OAuth 1.0 library
  - **Impact:** Security vulnerabilities, no 2FA support
  - **Effort:** 40 hours
  - **Blocker For:** New security features
  - **Created:** 2023-08-15
  - **Target Resolution:** 2024-Q1
  
  ## Medium Priority (Address within 2 quarters)
  ### TD-002: Inconsistent Error Handling
  - **Issue:** Mix of throw statements and error callbacks
  - **Impact:** Difficult debugging, inconsistent user experience
  - **Effort:** 60 hours
  - **Affects:** 25 modules
  - **Created:** 2023-10-20
  - **Target Resolution:** 2024-Q2
  
  [Continue for all tracked technical debt items]
  ```
  
  **3. API_DOCUMENTATION.md (Auto-generated from code annotations, deployed with each release):**
  - Use OpenAPI 3.0 specification with complete schema definitions
  - Generate using Swagger/OpenAPI tools integrated into CI/CD
  - Include request/response examples for every endpoint
  - Document all error codes with recovery suggestions
  - Maintain versioned documentation (support last three API versions)
  - Host on dedicated documentation site (docs.example.com)
  - Include authentication flows with example code in 5+ languages
  
  **4. DEPENDENCY_MANIFEST.md (Updated automatically by Renovate/Dependabot):**
  ```markdown
  # Dependency Inventory
  
  ## Production Dependencies (47 packages)
  | Package | Version | Last Updated | License | Security Audit | Purpose |
  |---------|---------|--------------|---------|----------------|---------|
  | express | 4.18.2 | 2024-01-10 | MIT | ✅ Pass | Web framework |
  | pg | 8.11.3 | 2024-01-05 | MIT | ✅ Pass | PostgreSQL client |
  | jsonwebtoken | 9.0.2 | 2023-12-15 | MIT | ⚠️ 1 Medium | JWT handling |
  
  ## Dev Dependencies (83 packages)
  [Similar table for development dependencies]
  
  ## Outdated Dependencies (Action Required)
  - jsonwebtoken: Update to 9.0.3 (fixes medium security issue)
  - moment: Replace with date-fns (moment is deprecated)
  
  ## Update Schedule
  - Security patches: Immediate (within 24 hours)
  - Minor updates: Weekly automated PRs
  - Major updates: Quarterly review and manual upgrade
  ```

- Generate and maintain API documentation automatically:
  
  **API Documentation Pipeline:**
  ```yaml
  # .github/workflows/docs-generation.yml
  name: Generate API Documentation
  
  on:
    push:
      branches: [main, develop]
  
  jobs:
    generate-docs:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        
        - name: Generate OpenAPI Spec
          run: npm run generate:openapi
          # Generates openapi.yaml from code annotations
          
        - name: Validate OpenAPI Spec
          run: npx @redocly/cli lint openapi.yaml --format=stylish
          
        - name: Generate API Documentation
          run: npx @redocly/cli build-docs openapi.yaml --output=dist/docs
          
        - name: Generate SDK Documentation
          run: |
            npm run generate:sdk-docs:typescript
            npm run generate:sdk-docs:python
            npm run generate:sdk-docs:java
          
        - name: Deploy Documentation
          run: aws s3 sync dist/docs s3://docs.example.com/ --delete
          
        - name: Invalidate CDN Cache
          run: aws cloudfront create-invalidation --distribution-id $CDN_ID --paths "/*"
  ```
  
  **OpenAPI Annotation Example:**
  ```typescript
  /**
   * @openapi
   * /api/v1/users/{userId}:
   *   get:
   *     summary: Retrieve user profile
   *     description: Fetches complete user profile including preferences and activity
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: Unique user identifier
   *       - in: query
   *         name: include
   *         schema:
   *           type: array
   *           items:
   *             type: string
   *             enum: [preferences, activity, settings]
   *         description: Additional data to include in response
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserProfile'
   *             example:
   *               id: "123e4567-e89b-12d3-a456-426614174000"
   *               email: "user@example.com"
   *               name: "John Doe"
   *               createdAt: "2024-01-15T10:30:00Z"
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  export async function getUserProfile(req: Request, res: Response) {
    // Implementation
  }
  ```

- Create and maintain operational runbooks for all critical procedures:
  
  **Required Operational Runbooks (/docs/runbooks/):**
  
  **1. SYSTEM_STARTUP.md:**
  - Complete startup sequence with dependency ordering
  - Database connection verification steps
  - Cache warming procedures
  - Health check validation
  - Expected startup time: under five minutes
  
  **2. CONFIGURATION_CHANGES.md:**
  - Environment variable modification procedures
  - Feature flag management steps
  - Configuration validation scripts
  - Rollback procedures for bad configurations
  - Change approval process (requires two reviewer sign-offs)
  
  **3. DATA_MIGRATION.md:**
  - Pre-migration backup procedures (full database backup required)
  - Migration execution steps with transaction wrapping
  - Data validation queries post-migration
  - Rollback procedures with timing estimates
  - Notification requirements (stakeholders informed 48 hours prior)
  
  **4. INCIDENT_RESPONSE.md:**
  ```markdown
  # Incident Response Runbook
  
  ## Severity Definitions
  ### SEV-1: Critical (Response time: 15 minutes)
  - Complete service outage affecting all users
  - Data loss or corruption
  - Security breach
  - Payment system failure
  
  ### SEV-2: High (Response time: 1 hour)
  - Major feature unavailable
  - Performance degradation > 50%
  - Affecting > 25% of users
  
  ### SEV-3: Medium (Response time: 4 hours)
  - Minor feature degradation
  - Affecting < 25% of users
  - Non-critical functionality impaired
  
  ## Incident Response Steps
  1. **Detection** (0-5 minutes)
     - Alert received via monitoring system
     - On-call engineer acknowledges within 5 minutes
     - Initial assessment of severity
  
  2. **Triage** (5-15 minutes)
     - Gather relevant logs and metrics
     - Identify affected systems and user impact
     - Escalate if severity >= SEV-2
     - Create incident channel: #incident-YYYY-MM-DD-NNN
  
  3. **Investigation** (15-60 minutes)
     - Review recent deployments (last 24 hours)
     - Check error logs for patterns
     - Review metrics dashboards
     - Test affected functionality
  
  4. **Resolution** (varies by severity)
     - Apply fix or rollback deployment
     - Verify resolution with smoke tests
     - Monitor for 30 minutes post-resolution
  
  5. **Post-Incident** (within 48 hours)
     - Document timeline and root cause
     - Create action items for prevention
     - Schedule blameless postmortem
     - Update runbooks with lessons learned
  
  ## Common Incident Scenarios
  ### Scenario: Database Connection Pool Exhausted
  **Symptoms:** API returning 500 errors, logs showing connection timeouts
  **Quick Fix:** Scale up database connection pool temporarily
  ```bash
  kubectl set env deployment/api-server DB_POOL_SIZE=100
  # Normal: 50, Temporary: 100
  ```
  **Root Cause Investigation:** Check for connection leaks, slow queries
  **Long-term Fix:** Implement connection pooling best practices
  
  [Continue with 10+ common scenarios]
  ```
  
  **5. MONITORING_PLAYBOOK.md:**
  - Alert definitions and thresholds
  - Investigation procedures for each alert type
  - Escalation paths and contact information
  - Common false positives and how to identify them
  - Runbook links for each alert (50+ predefined scenarios)

- **Documentation Quality Standards:**
  - Maximum document age: three months without review
  - Minimum two reviewers for technical documentation
  - All code examples must be tested and working
  - Screenshots must be updated within one month of UI changes
  - Broken links checked weekly with automated tools
  - Spelling and grammar checked with automated tools (Grammarly, LanguageTool)
  - Documentation coverage metrics tracked (target: all public APIs documented)
  
- **Documentation Maintenance Schedule:**
  - **Daily:** Auto-generate API docs from code
  - **Weekly:** Review and update technical debt registry
  - **Monthly:** Review operational runbooks for accuracy
  - **Quarterly:** Comprehensive architecture documentation review
  - **Annually:** Complete documentation audit and reorganization

---

## Success Validation Criteria

Every development cycle must demonstrate measurable success across these five critical dimensions. Each criterion includes specific thresholds that must be met before considering any development phase complete.

### Functional Integrity
**Requirement:** All existing functionality continues to operate correctly without degradation.

**Validation Procedures:**
- Execute complete regression test suite with zero failures (minimum two thousand five hundred tests for medium-sized applications)
- Run automated smoke tests covering all critical user journeys (minimum ten user flows: authentication, core features, payment processing, data operations)
- Perform manual exploratory testing for complex user interactions (minimum two hours per major feature)
- Validate all API endpoints return expected status codes and response structures (use contract testing with Pact or similar)
- Verify database integrity constraints maintained (check foreign keys, unique constraints, not-null constraints)

**Acceptance Thresholds:**
- Test pass rate: one hundred percent (zero tolerance for failures)
- Regression test execution time: under ten minutes for full suite
- Smoke test execution time: under five minutes
- API response format compatibility: one hundred percent backward compatible
- Database constraint violations: zero

**Evidence Required:**
- Test execution reports with timestamps and results
- Screen recordings of manual testing sessions
- API contract validation reports
- Database integrity check logs

### Code Quality Standards
**Requirement:** All code meets defined quality metrics for complexity, coverage, and documentation.

**Automated Quality Gate Requirements:**
- **Code Coverage:** Minimum eighty percent overall, ninety-five percent for critical paths
- **Cyclomatic Complexity:** Maximum ten per function, fifty per module
- **Function Length:** Maximum fifty lines per function (excluding tests)
- **Duplication:** Less than three percent code duplication across codebase
- **Technical Debt Ratio:** Less than five percent (measured by SonarQube or equivalent)
- **Maintainability Index:** Minimum seventy (on scale of zero to one hundred)
- **Documentation Coverage:** Minimum ninety-five percent of public APIs documented

**Validation Tools Configuration:**
```javascript
// sonarqube-config.js
module.exports = {
  qualityGate: {
    name: 'Strict Quality Gate',
    conditions: [
      { metric: 'coverage', operator: 'LESS_THAN', value: '80.0', error: true },
      { metric: 'duplicated_lines_density', operator: 'GREATER_THAN', value: '3.0', error: true },
      { metric: 'sqale_rating', operator: 'GREATER_THAN', value: '1', error: true }, // A rating required
      { metric: 'reliability_rating', operator: 'GREATER_THAN', value: '1', error: true },
      { metric: 'security_rating', operator: 'GREATER_THAN', value: '1', error: true },
      { metric: 'new_bugs', operator: 'GREATER_THAN', value: '0', error: true },
      { metric: 'new_vulnerabilities', operator: 'GREATER_THAN', value: '0', error: true },
    ]
  }
};
```

**Code Review Requirements:**
- Minimum two approvals required for merge (one senior engineer, one peer)
- Maximum pull request size: five hundred lines of code changes (excluding tests)
- Review completion time: within twenty-four hours of submission
- All comments addressed before merge

### Performance Benchmarks
**Requirement:** System performance maintains or improves existing baselines with no degradation exceeding ten percent.

**Performance Metrics Tracking:**

**API Performance Targets:**
| Metric | Current Baseline | Acceptable Range | Failure Threshold |
|--------|------------------|------------------|-------------------|
| P50 Response Time | 80ms | 70-90ms | > 100ms |
| P95 Response Time | 150ms | 130-170ms | > 200ms |
| P99 Response Time | 300ms | 270-330ms | > 400ms |
| Throughput | 500 req/s | 450-550 req/s | < 400 req/s |
| Error Rate | 0.2% | < 0.3% | > 0.5% |

**Database Performance Targets:**
| Metric | Current Baseline | Acceptable Range | Failure Threshold |
|--------|------------------|------------------|-------------------|
| Query P95 Time | 100ms | 90-110ms | > 150ms |
| Connection Pool Utilization | 45% | 40-60% | > 75% |
| Slow Query Rate | 0.1% | < 0.2% | > 0.5% |
| Index Hit Rate | 99.5% | > 99% | < 98% |

**Frontend Performance Targets:**
| Metric | Current Baseline | Acceptable Range | Failure Threshold |
|--------|------------------|------------------|-------------------|
| First Contentful Paint | 1.2s | 1.0-1.4s | > 1.8s |
| Time to Interactive | 2.5s | 2.0-3.0s | > 3.5s |
| Largest Contentful Paint | 2.0s | 1.8-2.2s | > 2.8s |
| Cumulative Layout Shift | 0.05 | < 0.1 | > 0.15 |

**Performance Testing Procedure:**
```bash
# Run load tests before deployment
artillery run load-test.yaml --output results.json

# Performance test configuration (load-test.yaml)
# - Duration: 10 minutes
# - Ramp-up: 0 to 500 users over 2 minutes
# - Sustained load: 500 concurrent users for 6 minutes
# - Ramp-down: 500 to 0 users over 2 minutes

# Analyze results
artillery report results.json --output report.html

# Automated threshold validation
node scripts/validate-performance.js results.json
# Fails build if any metric exceeds failure threshold
```

### Security Compliance
**Requirement:** Security scans identify no new vulnerabilities; all authentication and authorization paths function correctly.

**Security Validation Checklist:**

**Automated Security Scans (run before every deployment):**
- **SAST Scan:** Zero critical vulnerabilities, maximum two high-severity issues with documented mitigation plans
- **DAST Scan:** Zero high-risk vulnerabilities in live application
- **Dependency Scan:** All dependencies pass security audit (npm audit, Snyk)
- **Secret Scan:** Zero secrets detected in code repository
- **Container Scan:** Base images have zero critical CVEs

**Security Testing Execution:**
```bash
# Static Application Security Testing
sonarqube-scanner -Dsonar.security.enable=true

# Dynamic Application Security Testing
zap-cli --quick-scan --self-contained --start-options '-config api.disablekey=true' \
  --spider https://staging.example.com \
  --ajax-spider https://staging.example.com

# Dependency vulnerability scan
npm audit --audit-level=moderate
snyk test --severity-threshold=high

# Secret scanning
trufflehog git file://. --since-commit HEAD~1 --fail

# Container scanning (if applicable)
trivy image myapp:latest --severity HIGH,CRITICAL --exit-code 1
```

**Authentication & Authorization Testing:**
- Test all API endpoints require valid authentication (expect four hundred one for unauthenticated requests)
- Verify role-based access control works correctly (minimum fifty test cases covering permission matrix)
- Test token expiration and refresh mechanisms
- Verify session timeout after thirty minutes of inactivity
- Test account lockout after five failed authentication attempts
- Validate two-factor authentication flow for admin accounts

**Security Acceptance Criteria:**
- Zero critical security vulnerabilities
- Maximum two high-severity vulnerabilities with mitigation in place
- All authentication tests pass (one hundred percent success rate)
- All authorization tests pass (one hundred percent success rate)
- Penetration testing completed quarterly (if applicable)

### Operational Readiness
**Requirement:** Deployment procedures are documented and tested; monitoring systems capture relevant metrics and generate appropriate alerts.

**Deployment Readiness Checklist:**
```markdown
## Pre-Deployment Validation (Complete 24 hours before deployment)

### Documentation
- [ ] Deployment runbook created and reviewed by two engineers
- [ ] Rollback procedure documented with step-by-step commands
- [ ] Architecture documentation updated to reflect changes
- [ ] API documentation regenerated and deployed
- [ ] Change log updated with user-facing changes

### Infrastructure
- [ ] Staging environment mirrors production configuration
- [ ] Database migrations tested in staging (including rollback)
- [ ] Feature flags configured and tested
- [ ] Auto-scaling policies reviewed and adjusted if needed
- [ ] Backup systems verified operational
- [ ] Load balancers and CDN configuration reviewed

### Monitoring & Alerting
- [ ] New metrics added to monitoring dashboards
- [ ] Alert thresholds configured for new features
- [ ] On-call engineer confirmed and available
- [ ] Incident communication channels tested
- [ ] Rollback automation tested and verified

### Testing
- [ ] All tests passing in CI/CD (zero failures)
- [ ] Load testing completed with satisfactory results
- [ ] Security scans completed with zero critical issues
- [ ] Smoke tests verified in staging environment
- [ ] Rollback tested in staging environment

### Communication
- [ ] Stakeholders notified of deployment window
- [ ] Customer support team briefed on new features
- [ ] Known issues documented and shared
- [ ] Downtime window communicated (if applicable)
```

**Monitoring Coverage Requirements:**
- All critical API endpoints have response time monitoring (target: one hundred percent coverage)
- Error rates monitored across all services with alerts configured
- Database performance metrics tracked (query times, connection pool, slow queries)
- Infrastructure metrics monitored (CPU, memory, disk, network)
- Business metrics tracked (user signups, transactions, key feature usage)

**Alert Configuration Validation:**
```yaml
# Example alert validation
alerts:
  - name: high_error_rate
    condition: error_rate > 1% for 5 minutes
    severity: critical
    notification_channels: [pagerduty, slack_critical]
    verified: true
    last_tested: 2024-01-15
    
  - name: slow_api_response
    condition: p95_response_time > 500ms for 10 minutes
    severity: warning
    notification_channels: [slack_alerts]
    verified: true
    last_tested: 2024-01-15
    
  - name: database_connection_pool_exhaustion
    condition: db_pool_utilization > 85% for 5 minutes
    severity: critical
    notification_channels: [pagerduty, slack_critical]
    verified: true
    last_tested: 2024-01-15
```

**Operational Readiness Score:**
Calculate readiness score based on checklist completion:
- All items checked: one hundred percent ready (proceed with deployment)
- Ninety to ninety-nine percent: Conditional approval (address missing items or document exceptions)
- Below ninety percent: Deployment blocked (complete remaining items before proceeding)

---

## Final Validation Gate

Before declaring a development phase complete, conduct a final validation meeting with the following agenda:

**Validation Meeting Participants:**
- Technical Lead (required)
- Product Owner (required)
- Quality Assurance Lead (required)
- Operations Lead (required)
- Security Representative (for major changes)

**Validation Meeting Agenda (Duration: sixty minutes):**
1. Review functional integrity evidence (ten minutes)
2. Examine code quality reports (ten minutes)
3. Analyze performance benchmarks (ten minutes)
4. Review security compliance status (ten minutes)
5. Assess operational readiness (fifteen minutes)
6. Go/No-Go decision with documented rationale (five minutes)

**Sign-Off Requirements:**
All four validation criteria dimensions must achieve minimum scores:
- Functional Integrity: one hundred percent (no failures tolerated)
- Code Quality Standards: eighty-five percent or higher
- Performance Benchmarks: ninety percent or higher (all metrics within acceptable range)
- Security Compliance: one hundred percent (zero critical issues)
- Operational Readiness: ninety percent or higher

Document the validation outcome in /docs/validations/VALIDATION-[FEATURE]-[DATE].md with specific evidence and sign-offs from all participants.

---

## Conclusion

These principles address the systematic weaknesses inherent in AI-assisted development. Cursor AI excels at code generation but lacks project continuity awareness, pattern consistency, and holistic quality consideration. By enforcing these strict development lifecycle practices, teams can leverage Cursor AI's strengths while mitigating its limitations.

Success requires discipline: every shortcut avoided, every test written, and every document maintained compounds into a robust, maintainable system. The investment in process rigor pays dividends through reduced defects, easier maintenance, and confident deployments.

These are not suggestions. These are requirements. Violating these principles introduces technical debt that will eventually require repayment with significant interest.