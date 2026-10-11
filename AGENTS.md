# Repository Agent Instructions — PVPT

These rules apply to every coding agent, including Google AI Studio Build mode when this repository is imported.

## Before editing
1. Read `docs/06_AI_STUDIO/README.md`, `MASTER_PROTOCOL.md`, `IMPLEMENTATION_SEQUENCE.md`, `SCREEN_REFERENCE_CONTRACT.md`, `APP_ARCHITECTURE_AND_DATA.md`, and `ACCEPTANCE_GATES.md`.
2. Read the relevant existing domain contract in `docs/01_PRODUCT`, `docs/02_UI`, `docs/03_ARCHITECTURE`, and `docs/04_DATA`.
3. Open and inspect `demo/main.png` as the mandatory visual reference. Do not claim pixel match unless a rendered screenshot has been compared against it.
4. Inspect the current code and tests before proposing edits. Preserve prior work; do not regenerate the whole application blindly.

## Non-negotiable product rules
- Product name: PARS Value Protection Tower (PVPT). It prepares traceable managerial decisions; it does not autonomously decide.
- Keep exactly the six canonical UI families: `THERMAL_GENERATORS`, `HYDRO_GENERATORS`, `WIND_TURBINES`, `INDUSTRIAL_GENERATORS`, `MOTORS`, `BUSDuct`. Do not infer alternate categories.
- Truth labels: `PUBLIC_VERIFIED`, `INTERNAL_VERIFIED`, `USER_APPROVED_ASSUMPTION`, `DEMO_SYNTHETIC`, `UNKNOWN`. Preserve source, owner, as-of date, confidence and quality where relevant.
- Never fabricate PARS projects, customers, progress, commitments, margin, cash, receivables, capacities, shortages, deadlines, risk exposure or protected value. Missing is not zero. Use `INTERNAL SOURCE REQUIRED`, `NOT YET QUANTIFIED`, `DATA REQUIRED`, or `INSUFFICIENT HISTORY`.
- Public product catalogue data does not prove project assignment, backlog, capacity or financial facts.
- Separate PLAN, FORECAST, ACTUAL, ASSUMPTION, VALUE AT RISK, REALIZED LOSS and PROTECTED VALUE. Protected value is not actual until supported by reviewed outcome evidence.
- Feasibility precedes ranking/selection. Hard gates include dependency, material, machine/work-center, manpower/skill, method/qualification and cash. Check time-phased and shared-resource constraints. If no option is feasible, raise resource-crisis/constraint-change escalation.
- A human manager owns decision approval and risk acceptance. No silent execution, ERP posting or auto-approval.
- PostgreSQL is the planned persistent source of application state; browser local storage is not a production database. Keep deterministic domain logic separate from AI-generated prose.
- Existing demo data remains clearly synthetic and isolated from executive actuals.
- Persian-first, right-to-left, responsive UI; do not replace the supplied main-screen design with a generic dashboard.

## Execution discipline
- Work only on the requested work package. One logical increment per prompt.
- Inspect → plan → implement → run tests → inspect browser rendering → record evidence → update the ledger.
- Never claim tests passed unless the command output proves it.
- If a gate fails, stop progression, fix it, rerun affected and regression tests, and update the ledger.
- Keep changes small and reviewable. Preserve history. Never delete the reference screenshot.
- Do not commit credentials, API keys, private data, production extracts or secrets.
- Update `docs/06_AI_STUDIO/IMPLEMENTATION_LEDGER.md` after each completed gate.
- Do not merge/deploy to production without human approval.

## Agent Skills
Portable Agent Skills live under `.agents/skills/`. Google AI Studio may not automatically activate every skill from this folder; explicitly load the applicable `SKILL.md` and its linked references in the prompt when needed. These files are instructions, not proof that a platform executed them.
