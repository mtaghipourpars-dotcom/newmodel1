---
name: pvpt-domain-engine
description: Use when implementing PVPT resource capacity, issue-impact chains, option feasibility, decision cases, outcomes, or learning logic.
compatibility: Requires access to PVPT canonical data contracts and automated test runner.
metadata:
  author: PVPT project
  version: "1.0.0"
---

# PVPT Domain Engine Skill

## Process
1. Read `docs/04_DATA/MVP_MASTER_DATA_MODEL.md`, `PVPT_CANONICAL_DATA_MODEL_V0.1.md`, `docs/01_PRODUCT/PVPT_PRODUCT_MODEL.md`, and `docs/06_AI_STUDIO/APP_ARCHITECTURE_AND_DATA.md`.
2. Implement domain logic as deterministic services separate from React and LLM-generated content.
3. Freeze baseline snapshot, engine version, policy version and seed for each simulation.
4. Validate input schema, units, referential integrity and time buckets.
5. Apply hard feasibility gates in order: dependencies, material, machine/work center, manpower/skill, method/qualification, cash, shared-resource conflicts and opportunity cost.
6. Rank only feasible options using an explicit versioned policy. Weights cannot override hard constraints.
7. If no option is feasible, return `NO_FEASIBLE_OPTION`, expose blockers and escalate resource crisis/constraint change.
8. Explain each result with blocker code, time period, quantity/unit, source evidence and engine version.
9. Never overwrite baseline or actual history with scenario values.
10. Require human approval for decisions and learned-rule activation.
11. Add deterministic tests for each gate, interactions between gates, edge cases, missing data and no-feasible outcomes.

## Required negative tests
- Missing capacity must not be interpreted as unlimited capacity.
- Missing cash must not be interpreted as zero cash or unlimited cash; return insufficient evidence/blocked feasibility.
- An infeasible option cannot be selected.
- A scenario cannot mutate actual history.
- A model-generated suggestion cannot bypass gates or self-approve.
