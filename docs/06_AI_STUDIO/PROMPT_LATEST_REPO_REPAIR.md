# Google AI Studio Repair Prompt — PVPT latest main

**Repository:** https://github.com/mtaghipourpars-dotcom/newmodel1  
**Reference UI:** https://github.com/mtaghipourpars-dotcom/newmodel1/blob/main/demo/main.png  
**Observed HEAD:** `865f44ba30c1d0393cfdbb6983b619b9eb8e4b69`  
**Observed latest CI:** https://github.com/mtaghipourpars-dotcom/newmodel1/actions/runs/38686722759  
**Current result:** Agent Skills validation PASS; Playwright demo smoke tests FAIL. Do not claim the latest commit is green.

## Mandatory rules
1. Read `AGENTS.md`, all `docs/06_AI_STUDIO/` contracts, `.agents/skills/`, and current tests before editing.
2. Keep the six canonical product families unchanged and in the approved order: thermal generators, hydro generators, wind turbines, industrial generators, motors, busduct.
3. `demo/main.png` is the authority for the first page. Preserve the current reference composition; do not redesign it.
4. Never present synthetic projects, commitments, dates, progress, financial values, resource capacities, risk values, or decisions as real PARS facts. Unknown is not zero.
5. Do not infer project-to-product assignment from the public product catalogue.
6. Keep simulation deterministic. Human/Executive is the authority; engine calculates, AI explains. No autonomous managerial decision or live SAP write.
7. Do not claim Google AI Studio import/build, PostgreSQL persistence, live integrations, or pixel fidelity unless actually executed and evidenced.
8. Work in small, reviewable steps. Update `docs/06_AI_STUDIO/IMPLEMENTATION_LEDGER.md` only with actual evidence. Do not mark a gate PASS without evidence.

## Step 1 — Diagnose the current CI failure (no code changes yet)
- Inspect workflow run above and retrieve full Playwright failure output/artifacts.
- Inspect `tests/`, Playwright config, `demo/index.html`, `demo/app-engine.js`, `server.js`, `package.json`.
- Run the exact failing test locally in a clean environment.
- Report the failing test name, assertion, browser console/network errors, root cause, and minimal files to change.
- Stop and report if the failure is caused by a missing/ambiguous requirement. Do not guess.

## Step 2 — Repair only verified causes
- Make the smallest safe fix.
- Preserve existing behaviors and the six product families.
- Verify every visible control either works or is disabled with an explanation.
- Ensure no unsupported live/business values leak into executive indicators.
- Add/adjust regression tests for the discovered failure.

## Step 3 — Run validation
Run and report actual output for:
- `npm run validate:skills`
- `npm run test:demo`
- `npm run build`
- any additional tests required by the changed behavior.
Capture browser console errors and screenshots. Do not report success if a command failed or was skipped.

## Step 4 — Visual reference check
- Open the actual pixels of `demo/main.png`; reference is documented as 1536×1024, verify independently.
- Capture the current homepage at the same viewport and device scale.
- Provide side-by-side screenshot and concrete deviations by region: header, sidebar, hero, five KPI cards, risk/value map, six product families, macro indicators, decision cards, attention projects and timeline.
- Do not make a pixel-perfect claim without actual screenshot comparison. Fix only verified deviations and preserve the approved reference composition.
- Check responsive viewports in `SCREEN_REFERENCE_CONTRACT.md`; document failures.

## Step 5 — Data and domain regression
Validate `data/product-project-fixture.json` and app state:
- exactly six canonical product families, stable IDs and display order;
- public verified product facts separated from DEMO_SYNTHETIC project links;
- unknown/unverified relationships remain UNKNOWN/null;
- synthetic fixtures cannot be represented as actual PARS exposure or finance;
- commitment → product/project → BOM/component → production order → operation → resource demand traceability is not broken;
- constraints include Material, Machine, Manpower/Skill, Method, Money/Cash, Dependency and time;
- feasibility hard gates run before ranking; all results explain blockers and displaced feasible alternatives;
- scenario baseline and actual history remain immutable; future scenario is an overlay;
- pause/cancel/resume resource-release rules remain intact;
- no option generation/LLM is allowed to invent numeric calculations.

## Step 6 — Update evidence and stop
Append an entry to the implementation ledger with commit, commands, results, screenshots/artifacts, known limitations and next gate. Keep G1 blocked until actual visual comparison is evidenced. Keep database/full-stack/live-integration gates pending until actually implemented and tested.

Return only:
1. changed files and commit SHA;
2. each command's real PASS/FAIL result;
3. link to CI run and artifacts;
4. screenshot comparison evidence;
5. unresolved blockers;
6. explicit next step.
Do not proceed to a new feature until the current failure is resolved and verified.
