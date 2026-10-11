# Google AI Studio Prompt Pack — PVPT

**Use in order.** Run one prompt at a time. Never paste all prompts as one request. Before each phase, attach/read the named files. Ask the agent to stop after the stated scope.

## Prompt 0 — Discovery only (G0)
```text
You are the implementation agent for PARS Value Protection Tower (PVPT). Read AGENTS.md and docs/06_AI_STUDIO/{MASTER_PROTOCOL.md,IMPLEMENTATION_SEQUENCE.md,SCREEN_REFERENCE_CONTRACT.md,APP_ARCHITECTURE_AND_DATA.md,ACCEPTANCE_GATES.md,IMPLEMENTATION_LEDGER.md}. Inspect the entire current repository, current generated stack, routes, data flow, tests and Git status. Do not edit any files, install packages, or generate code. Inspect demo/main.png as actual image pixels; if you cannot access it, say BLOCKED and ask for the image to be attached. Return: (1) inventory, (2) current architecture, (3) tests and how to run them, (4) factual gaps, (5) conflicting requirements, (6) visual-reference access and dimensions, (7) proposed file-level work packages, (8) risks. Mark unknowns as unknown. Stop.
```

## Prompt 1 — Visual baseline (G1)
```text
Read SCREEN_REFERENCE_CONTRACT.md and inspect demo/main.png. Do not change UI. Record image dimensions and intended viewport. Run the current app and capture a screenshot at the same viewport. Produce a side-by-side visual comparison and a measured region map: shell/sidebar/header/hero/cards/charts/spacing/type/color/RTL. List deviations by severity and attach screenshot evidence. If the reference image cannot be opened, stop as BLOCKED. Update the ledger only with work actually performed. Stop.
```

## Prompt 2 — Contract reconciliation (G2)
```text
Read the existing product, UI, architecture and data contracts. Compare them with the current code and list conflicts/ambiguities, especially six product families, project data boundary, page navigation, source provenance, feasibility gates and human decision authority. Do not edit code. Propose explicit resolutions and list questions requiring human approval. Stop before implementation.
```

## Prompt 3 — Architecture proposal (G3)
```text
Inspect the actual AI Studio-generated stack and propose a full-stack architecture consistent with APP_ARCHITECTURE_AND_DATA.md. Include routes, component hierarchy, server APIs, PostgreSQL schema/migrations, authorization, audit, deterministic engines, source adapters and test layers. Do not claim any external integration is connected. Identify dependencies and deployment constraints. Do not implement until architecture decisions are accepted.
```

## Prompt 4 — Database foundation (G4)
```text
Implement only the approved PostgreSQL schema and migrations for the first vertical slice. Follow canonical data contracts. Include provenance, foreign keys, uniqueness, indexes, validation, migration-from-empty test and explicitly isolated demo fixtures. No production fake projects or financials. Add schema and repository tests, run them and report actual output. Do not build UI in this step.
```

## Prompt 5 — Shared shell and design system (G5)
```text
Read SCREEN_REFERENCE_CONTRACT.md and the approved screenshot comparison. Implement the shared app shell and design tokens only. Match demo/main.png on the approved desktop viewport: exact region hierarchy, RTL, spacing, typography, colors and card geometry. Do not invent a new design. Add responsive layouts without changing the desktop reference composition. Capture a new screenshot at the same viewport and compare before moving on. Run browser tests and stop if major mismatch remains.
```

## Prompt 6 — Server/API and provenance (G6)
```text
Implement server-side API/repository boundaries for the approved first slice. Validate every request on the server, enforce authorization, emit audit events for mutations, preserve provenance and return consistent errors. Do not let React components access PostgreSQL directly. Add unit/integration tests and prove persistence across reload/new browser context. Do not connect live enterprise systems without supplied credentials, mappings and owner approval.
```

## Prompt 7 — Portfolio vertical slice (G7)
```text
Implement the complete Product Portfolio vertical slice: six canonical families, source-backed product records, search/filter/detail, source provenance, loading/empty/error states and server persistence. Do not infer project assignments from product catalog. Use demo/main.png design tokens and existing UI contracts. Add tests for all visible controls and provenance. Stop after this slice passes.
```

## Prompt 8 — Project/commitment vertical slice (G8)
```text
Implement projects, product-project assignment, commitments and milestones using authoritative IDs only. If no internal dataset is supplied, show empty states and INTERNAL SOURCE REQUIRED; keep synthetic examples clearly isolated. Add traceability, import validation, tests and UI links. Do not invent real project records or due dates.
```

## Prompt 9 — Resources/capacity (G9)
```text
Implement resources including material, machine/work center, manpower/skills, method/qualification and cash. Capacity and demand must be time-phased and shared across projects. Include source/period/unit for every capacity number, explicit unknown states, conflicts and opportunity cost where supported. Add deterministic tests including overlapping demand and missing data. No capacity assumptions may appear as actual.
```

## Prompt 10 — Risk/value/intervention (G10)
```text
Implement issue/risk, impact links, value exposure and intervention windows only from approved evidence and explicit calculation rules. LRM must be UNKNOWN when evidence is insufficient. Never invent currency values or trends. Distinguish exposure from realized loss and protected value. Add traceability and formula/evidence tests.
```

## Prompt 11 — Feasibility/decision (G11)
```text
Implement deterministic feasibility gates in this order: dependencies, materials, machine/work center, manpower/skill, method/qualification, cash, then shared-resource conflicts/opportunity cost; only afterward rank feasible options with versioned policy. If none is feasible, return NO_FEASIBLE_OPTION and escalate resource crisis/constraint change. Keep human decision authority and audit all selection/rejection rationale. Add tests for each gate and compound failures.
```

## Prompt 12 — Memory/outcomes (G12)
```text
Implement immutable decision snapshots, selected/rejected alternatives, owner/rationale, actions, expected outcomes, actual observations, variance explanation and proposed lessons. Never overwrite actual history or automatically approve learned rules. Add tests proving the expected→actual loop and audit trail.
```

## Prompt 13 — End-to-end integration (G13)
```text
Connect the approved vertical slices through canonical IDs. Demonstrate one end-to-end case from issue → affected component/activity → resource constraint → commitment impact → feasible alternatives → human decision → execution action → observed outcome → learning proposal. If real PARS evidence is absent, use an unmistakably DEMO_SYNTHETIC fixture. Run the complete suite and report exact outputs.
```

## Prompt 14 — Security (G14)
```text
Perform a security review of server, API, auth, authorization, session/cookies, CORS/CSRF, XSS/injection, URL handling, imports/uploads, logging, secrets and dependency versions. Fix only evidence-backed issues in this scope. Never print secrets. Add regression tests and a threat-model summary.
```

## Prompt 15 — Regression (G15)
```text
Run all unit, integration, browser, accessibility, migration and build checks. Inspect console/network errors and all visible controls. Do not claim a test passed unless its actual result is shown. Fix failures and rerun the affected tests plus full regression. Update the ledger with exact command, result and artifacts. Stop if any critical test fails.
```

## Prompt 16 — Visual audit (G16)
```text
Capture every implemented page at approved viewports. Compare the first screen to demo/main.png using side-by-side evidence and pixel/screenshot diff where feasible. Verify layout, typography, RTL, chart/card geometry and density. Check all pages against their documented contracts. List each remaining mismatch, severity and correction. Do not call it exact or complete if a major mismatch remains. Update ledger and stop.
```

## Prompt 17 — Data readiness (G17)
```text
Audit source registry, provenance, freshness and internal-data readiness. Verify that public product data is sourced and that no synthetic project/financial/resource data feeds actual executive indicators. If no approved internal extract exists, keep source disconnected and show explicit empty states. Do not invent or synthesize internal facts. Produce a data-readiness report and reconciliation tests.
```

## Prompt 18 — Release readiness (G18)
```text
Prepare a release candidate only after G0-G17 pass. Verify migrations, backup/restore, monitoring, secrets, CI, deployment configuration, rollback and operations runbook. Run production build and end-to-end critical paths. Report any blockers honestly. Do not deploy to production or merge without human approval.
```
