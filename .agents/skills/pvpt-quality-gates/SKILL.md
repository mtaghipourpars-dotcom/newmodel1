---
name: pvpt-quality-gates
description: Use before closing a PVPT work package, claiming completion, merging changes, or preparing a release; verifies tests, visual evidence, provenance, security and ledger updates.
compatibility: Requires repository test/build commands and access to logs or CI results.
metadata:
  author: PVPT project
  version: "1.0.0"
---

# PVPT Quality Gates Skill

## Mandatory checklist
1. Read `docs/06_AI_STUDIO/ACCEPTANCE_GATES.md` and current `IMPLEMENTATION_LEDGER.md`.
2. Inspect changed-file diff and confirm changes are within approved scope.
3. Run available typecheck/lint/unit/integration/browser/build/security commands. If a command is not configured or cannot run, state NOT RUN and why.
4. Verify actual output; never infer success from a generated test or preview.
5. Check browser console, network errors, navigation, every visible control and loading/empty/error states.
6. Check reference screenshot at the approved viewport for UI changes.
7. Verify provenance and synthetic-data isolation for data changes.
8. Verify hard-gate order and no-feasible escalation for engine changes.
9. Update the ledger with command, result, test count, screenshot artifact, limitations and commit.
10. Block completion if any critical test fails or evidence is missing.

## Status semantics
- PASS: evidence observed.
- FAIL: test or acceptance criterion failed.
- BLOCKED: cannot be tested because a dependency/reference/permission is missing.
- NOT RUN: not attempted.
- RETEST REQUIRED: later change may invalidate prior evidence.

Do not mark a whole release PASS when only one test suite passes.
