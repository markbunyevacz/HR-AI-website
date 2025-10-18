# Documentation Cleanup Plan

## Current Issues
- **38 MD files** with significant overlap
- **7,000+ lines** of documentation (way too much)
- Multiple outdated status reports
- Confusing file naming (multiple "FINAL" and "COMPLETE" files)

## Proposed Structure

### 1. KEEP (Essential Documentation)
```
HR-AI-Portal/
├── README.md                    # Project overview
├── SETUP.md                     # Installation guide
├── docs/
│   ├── DEVELOPER_GUIDE.md      # Development standards
│   ├── DEPLOYMENT_GUIDE.md     # Deployment instructions
│   ├── TESTING_GUIDE.md        # Testing procedures
│   └── SECURITY_GUIDE.md       # Security best practices
```

### 2. ARCHIVE (Historical/Outdated)
```
HR-AI-Portal/archive/
├── status-reports/              # All phase summaries
│   ├── PHASE_1_SUMMARY.md
│   ├── PHASE_2_SUMMARY.md
│   ├── PHASE_4_COMPLETE.md
│   ├── FINAL_STATUS_UPDATE.md
│   ├── FINAL_PROJECT_STATUS.md
│   └── [other status files]
├── planning/                    # Original plans
│   ├── DEVELOPMENT_PLAN.md
│   ├── IMPLEMENTATION_ROADMAP.md
│   └── PROJECT_ANALYSIS.md
└── completion/                  # Completion reports
    ├── OPTION_D_COMPLETION_SUMMARY.md
    ├── ENTERPRISE_PACKAGE_COMPLETE.md
    └── [other completion files]
```

### 3. DELETE (Redundant)
- ALIGNMENT_COMPLETE.md (info merged into README)
- ANALYSIS_COMPLETE.md (outdated analysis)
- DEPLOYMENT_COMPLETE.md (redundant with deployment guide)
- Multiple production/deployment variants

## Consolidation Strategy

### Step 1: Create Master Documents
1. **README.md** - Current project status and features
2. **DEPLOYMENT_GUIDE.md** - Combine all deployment docs
3. **SECURITY_GUIDE.md** - Merge security checklists

### Step 2: Archive Historical Files
- Move all phase/status reports to archive/
- Keep for reference but remove from active docs

### Step 3: Update Dates & Status
- Fix all outdated dates (2024 → 2025)
- Remove conflicting completion percentages
- Single source of truth for project status

### Step 4: Remove Redundancy
- Eliminate duplicate feature lists
- Consolidate overlapping guides
- Merge similar content

## Expected Result
- **From:** 38 files, 7,000+ lines
- **To:** 6-8 essential files, ~2,000 lines
- **Archived:** 20+ historical files
- **Deleted:** 10+ redundant files

## Implementation Order
1. Create archive directory structure
2. Move historical files to archive
3. Consolidate essential documentation
4. Update README with current status
5. Delete redundant files
6. Update MCP configuration to exclude archive/
