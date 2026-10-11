---
name: pvpt-data-integrity
description: Use when modelling, importing, displaying, calculating, or reviewing PVPT product, project, commitment, resource, financial, risk, or decision data.
compatibility: Applies to the PVPT repository and any connected data source.
metadata:
  author: PVPT project
  version: "1.0.0"
---

# PVPT Data Integrity Skill

## Rules
1. Read `docs/04_DATA/PARS_REAL_DATA_BOUNDARY.md`, `PARS_PRODUCT_PORTFOLIO_BASELINE.md`, `PRODUCT_PROJECT_OBJECT_MODEL.md`, and `PVPT_CANONICAL_DATA_MODEL_V0.1.md`.
2. Use only the five allowed data classes: `PUBLIC_VERIFIED`, `INTERNAL_VERIFIED`, `USER_APPROVED_ASSUMPTION`, `DEMO_SYNTHETIC`, `UNKNOWN`.
3. Preserve source system, source reference, owner, as-of/effective dates, confidence, quality and snapshot identifiers as applicable.
4. Public product specifications do not establish current projects, project assignments, commitments, capacity, margin, cash, receivables, schedule status or exposure.
5. Never fabricate a PARS actual. Missing values are null/UNKNOWN, not zero. Display `INTERNAL SOURCE REQUIRED`, `NOT YET QUANTIFIED`, `DATA REQUIRED`, or `INSUFFICIENT HISTORY`.
6. Keep synthetic fixtures isolated from executive actuals and label them prominently.
7. Keep PLAN, FORECAST, ACTUAL, ASSUMPTION, VALUE AT RISK, REALIZED LOSS and PROTECTED VALUE separate.
8. Promote a record to INTERNAL_VERIFIED only after a named accountable source owner validates it; preserve previous versions and reviewer evidence.
9. Validate imports for schema, IDs, references, units, dates, duplicates, source owner and as-of time.
10. Add tests that attempt to leak demo data into executive indicators and prove the leak is prevented.

## References
- `docs/06_AI_STUDIO/APP_ARCHITECTURE_AND_DATA.md`
- `docs/06_AI_STUDIO/ACCEPTANCE_GATES.md`
