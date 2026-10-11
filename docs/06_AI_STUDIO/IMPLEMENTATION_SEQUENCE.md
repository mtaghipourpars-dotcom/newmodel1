# PVPT Implementation Sequence and Stop Gates

A gate is complete only when its evidence is recorded in `IMPLEMENTATION_LEDGER.md`. A failed or unverified gate blocks all later phases.

| Gate | Work package | Required output | Stop condition |
|---|---|---|---|
| G0 | Repository discovery | file inventory, stack, routes/pages, tests, current gaps, proposed plan | any key source not inspected |
| G1 | Visual baseline | reference image verified, baseline screenshot, viewport and difference log | reference image inaccessible or dimensions/composition unknown |
| G2 | Contract reconciliation | conflict list and approved decisions | unresolved canonical-family/data/business-rule conflict |
| G3 | App architecture | route map, component boundaries, API boundary, DB plan, threat model | architecture depends on fake/live integrations |
| G4 | Canonical data + migrations | schema, migrations, constraints, provenance, seed separation | unknown fields silently become zero or fixture data becomes actual |
| G5 | Design system + shell | RTL typography, spacing, color, tokens, sidebar, top bar, responsive grid | home differs from reference without approval |
| G6 | Data access foundation | server validation, repositories, API contracts, errors, audit | client writes directly to production database |
| G7 | Product portfolio | six canonical families, sourced product catalogue, search/filter/detail | unsupported family changes or false project links |
| G8 | Projects & commitments | project, commitment, milestone, impact relationships and truthful empty states | any synthetic project presented as real |
| G9 | Resources & capacity | machine/material/manpower/method/cash, time buckets, shared-resource checks | aggregate-only capacity ignores period conflicts |
| G10 | Value/risk & intervention | impact graph, exposure formula and evidence, windows, options | unsupported money or LRM displayed as facts |
| G11 | Decision cases & feasibility | deterministic hard gates, explainable blockers, crisis escalation, human decision | ranking before feasibility or auto-decision |
| G12 | Decision memory & outcomes | immutable decision snapshot, actions, observed outcome, learning proposal | actual outcome overwritten or lessons auto-approved |
| G13 | Cross-domain integration | one end-to-end trace from issue → constraint → commitment → option → decision → outcome | broken references or separate duplicate datasets |
| G14 | Security & resilience | authz/authn, secret management, audit, backup/recovery, error handling | secret in client, missing authorization, destructive mutation without audit |
| G15 | Automated regression | unit/integration/e2e/accessibility tests; deterministic CI | any critical test fails or test results unknown |
| G16 | Visual reference audit | side-by-side screenshot and agreed visual diff report for home and each page | claim of exact match without actual comparison |
| G17 | Data readiness pilot | approved internal extract and reconciliation, or explicit not-connected state | synthetic records feed executive actuals |
| G18 | Release readiness | deployment, migrations, monitoring, rollback, operating guide | no rollback or DB recovery evidence |

## Prompt discipline
- Execute one gate at a time.
- A phase may have sub-prompts, but each must be a small, testable change.
- Do not skip gates because AI Studio reports “done.”
- At the end of each gate, ask the agent to provide exact commands, outputs, test counts, changed files, screenshots, blockers and ledger update.
- If the platform cannot run a command, state that the test is unexecuted; do not substitute a promise.

## Sequence relation
G0-G3 are discovery/design gates. G4-G6 create the durable foundation. G7-G13 implement connected product domains. G14-G18 harden and release. A UI preview can exist earlier but is not evidence of a complete app.
