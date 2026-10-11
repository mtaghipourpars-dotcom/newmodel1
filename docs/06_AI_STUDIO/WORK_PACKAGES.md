# PVPT Work Package Breakdown

Each work package must be small enough to review and test independently. AI Studio prompts should reference one WP at a time.

| WP | Depends on | Deliverable | Primary tests |
|---|---|---|---|
| WP-00 Discovery | none | verified inventory + current-state report | commands/paths verified |
| WP-01 Visual baseline | WP-00 | reference dimensions + same-viewport screenshots + mismatch log | screenshot artifact, no overflow |
| WP-02 Contracts | WP-00 | conflict decisions and updated contracts | schema/contract checks |
| WP-03 App shell | WP-01/02 | RTL shell, routes, design tokens | navigation, visual regression |
| WP-04 Database | WP-02/03 | PostgreSQL schema/migrations, provenance, seed separation | migrate empty DB, constraints |
| WP-05 API foundation | WP-04 | validated APIs, authz, audit, error model | API/integration tests |
| WP-06 Product portfolio | WP-03/05 | families/catalogue CRUD/read/filter/details | family invariants, source provenance |
| WP-07 Projects/commitments | WP-06 | project assignments, milestones, commitment chain | relational trace, empty state |
| WP-08 Resources | WP-04/05 | resources, capacities, demand, cash | time-bucket/shared-resource tests |
| WP-09 Risk/value/intervention | WP-07/08 | issue links, impact, exposure/window | calculation/provenance tests |
| WP-10 Feasibility/decisions | WP-08/09 | deterministic hard gates and human decision flow | each gate + no-feasible crisis |
| WP-11 Memory/outcomes | WP-10 | action/outcome/learning loop | immutable actuals, audit |
| WP-12 End-to-end | WP-06..11 | coherent cross-domain workflow | Playwright critical path |
| WP-13 Security/hardening | WP-05..12 | secure and resilient release candidate | security tests, dependency scan |
| WP-14 Final visual audit | WP-03..13 | per-page visual audit + accepted deviations | screenshots, diff report |
| WP-15 Release | WP-13/14 | deployment and operations runbook | production build, rollback evidence |

Avoid building many disconnected CRUD pages before one complete vertical slice proves the data and interaction model.
