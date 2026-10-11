# Interactive PVPT Domain Engines

**Status:** Browser-interactive MVP workbench; no live enterprise integration is implied.

## Governing rules
- The UI is a projection of shared product/project/resource/issue/decision/outcome concepts, not a claim that disconnected source systems have been integrated.
- Six canonical product families remain fixed.
- Public product catalogue data is attributed to the official PARS catalogue. Product specifications never imply a current project, commitment, margin, capacity, cash position, delay or value at risk.
- All locally created projects, commitments, resources, issues, scenarios, decisions, outcomes, lessons and source records are marked or described as demo/local data.
- Missing internal facts remain UNKNOWN / NOT CONNECTED / NOT YET QUANTIFIED; unknown values are not treated as zero.
- Option feasibility in demo scenarios is a bounded example of hard-gate reasoning, not an operational release or permission to allocate resources.
- Human managers retain decision authority. A decision does not become a committed plan or an ERP transaction.

## Page mapping

| Primary area | Interactive subviews | Canonical concepts |
|---|---|---|
| Executive home | Overview, priority queue | Product catalogue, issue/impact readiness, decision/outcome summary |
| Decisions | Queue, cases/options, council, register | DecisionCase, Option, FeasibilityResult, Decision |
| Projects and production | Projects, commitments, milestones, chain, BOM/Cell, routing, orders/execution | Project, ProjectProduct, Commitment, Milestone, Activity, BOMComponent/Cell, ProductionOrder, Operation |
| Portfolio | Six families, product catalogue, product-project assignments | ProductFamily, Product, ProjectProduct |
| Value and risk | Exposure map, issues, impact chain, resource conflicts, evidence | Issue, IssueLink, Impact, Provenance |
| Intervention | Intervention windows, option comparison, constraint simulation | Scenario, Option, FeasibilityResult |
| Resources | Overview, materials, machines/work centres, labor/skills, capacity, suppliers, cash | Resource, ResourceCapacityPeriod, ResourceDemand, SupplyCommitment, Cash |
| Decision memory | Decisions, observed outcomes, lessons, indicators, exposure trend | Decision, ExecutionAction, OutcomeObservation, LearningRecord |
| Data governance | Readiness, provenance, assumptions, source registry, access, model config | DataProvenance, approvals, configuration |

## Local interaction behaviour
- Catalogue search supports model/name filtering, family filtering and source-class filtering.
- Forms can add demo projects, commitments, resources, issues, suppliers, sources, assumptions, decisions, outcomes and lessons.
- Records created through the workbench persist in browser local storage for that browser profile only.
- Feasibility controls explain time, capacity, budget and commitment hard-gate results for the two labelled demo cases.
- Infeasible demo options cannot be registered as feasible decisions; unresolved infeasibility is routed conceptually to constraint-change escalation.
- Decision Brief selections are copied into the local decision memory; observed outcomes and lessons can then be entered separately.
- Lessons have explicit PROPOSED → REVIEWED → APPROVED → RETIRED lifecycle. No rule is auto-approved.

## Not implemented / requires approved sources
- Live SAP/P6/MES/SCADA/PLM/procurement/finance connectors or authenticated APIs.
- Enterprise database, multi-user persistence, authorization enforcement, audit-grade immutable history, and server-side validation.
- Authoritative PARS projects, commitments, capacity calendars, BOMs, production orders, cash, cost/margin, exposure or realized/protected value.
- Production-grade resource scheduling, dependency graph validation, time-phased shared-resource optimization, and financial valuation.
- Real value-at-risk trend: it remains INSUFFICIENT HISTORY until dated, approved snapshots and a stable calculation method exist.

## Verification
```bash
npm install
npx playwright install chromium
npm run test:demo
```

The automated suite covers primary navigation, catalogue filtering, project-to-Cell/order/routing trace, demo hard gates, local issue/decision/outcome/lesson workflows, data readiness, and responsive layouts. Passing browser tests validate the prototype behaviour only, not operational truth or business value.
