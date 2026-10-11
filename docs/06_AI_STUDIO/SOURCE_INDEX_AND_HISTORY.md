# Source Index, Decision History and Continuity Notes

## Why this exists
The app must survive context loss between AI Studio sessions. This file identifies authoritative repository artifacts and preserves the stable decisions already made. Use the implementation ledger for current gate status.

## Source-of-truth index
| Topic | Authoritative artifact | Rule |
|---|---|---|
| Product purpose/value chain | `docs/01_PRODUCT/PVPT_PRODUCT_MODEL.md` | Trace issue to value exposure, decision, outcome and learning |
| Demo scope | `docs/01_PRODUCT/DEMO_EXPERIENCE_BLUEPRINT.md` | Demo is not proof of a production engine |
| CEO home | `docs/02_UI/CEO_HOME_PAGE.md` | Executive decision cockpit; not generic KPI wall |
| Navigation/page entities | `docs/02_UI/PVPT_SIDEBAR_AND_PAGE_CONTRACT.md` | Pages are projections of shared canonical entities |
| Five-domain concept | `docs/02_UI/SIDEBAR_AND_PRODUCT_ENGINES.md` | Commitments, Resources, Value, Decisions, Lessons Learned |
| Interactive prototype behavior | `docs/02_UI/INTERACTIVE_DOMAIN_IMPLEMENTATION.md` | No live integration implied |
| MVP architecture | `docs/03_ARCHITECTURE/PVPT_MVP_ARCHITECTURE.md` | PVPT complements, does not replace, source systems |
| Master entities and simulation | `docs/04_DATA/MVP_MASTER_DATA_MODEL.md` | Time-phased hard gates before ranking |
| Canonical relationships | `docs/04_DATA/PVPT_CANONICAL_DATA_MODEL_V0.1.md` | One shared model, no page-specific duplicate datasets |
| Real-data boundary | `docs/04_DATA/PARS_REAL_DATA_BOUNDARY.md` | No fabricated operational/financial claims |
| Product baseline | `docs/04_DATA/PARS_PRODUCT_PORTFOLIO_BASELINE.md` | Public catalogue proves product categories/specs only |
| Product/project mapping | `docs/04_DATA/PRODUCT_PROJECT_OBJECT_MODEL.md` | Assignments require authoritative internal evidence |
| Reference screen | `demo/main.png` | Mandatory primary visual baseline |
| Current prototype | `demo/index.html`, `demo/app-engine.js`, `demo/app-engine.css` | Inspect before editing; not production backend |
| Existing tests | `tests/`, `playwright.config.js`, `package.json` | Extend and preserve; run actual tests |

## Stable decisions from project history
1. Product: PARS Value Protection Tower (PVPT); the internal reasoning/context concept MDCRL is not a separate user-facing product.
2. Value chain: portfolio → product → project → status/deviation → impact on commitments → cash/collection → value at risk → intervention → executive decision → execution → outcome → protected value/learning.
3. Human decision authority remains explicit. PVPT prepares evidence and alternatives; it does not autonomously decide.
4. Public product catalogue can be verified from the official PARS catalogue, but internal projects, project progress, customer commitments, capacity, margin, cash, receivables and value at risk are not established by that public catalogue.
5. Exactly six canonical top-level UI families are fixed: THERMAL_GENERATORS, HYDRO_GENERATORS, WIND_TURBINES, INDUSTRIAL_GENERATORS, MOTORS, BUSDuct. Public catalogue taxonomy can be mapped beneath these without silently changing the six UI categories.
6. Source labels are PUBLIC_VERIFIED, INTERNAL_VERIFIED, USER_APPROVED_ASSUMPTION, DEMO_SYNTHETIC and UNKNOWN.
7. Unknown is not zero. Use explicit data-readiness states.
8. Component/Cell is a critical operational object. The production model is discrete manufacturing, BOM lower levels to upper levels, routing operations, concurrent projects and shared resources.
9. Feasibility must be evaluated before ranking or selection. Hard constraints include dependencies, materials, machine/work center, manpower/skill, method/qualification and cash; shared-resource conflicts are time-phased. No feasible option triggers resource-crisis/constraint-change escalation.
10. Plan/baseline and actual history must not be overwritten by scenarios or AI. Expected vs actual outcome drives human-reviewed lessons.
11. The system must be dynamic and persistent, not a frozen dashboard or local-storage-only demo. PostgreSQL is the target persistent database.
12. User requested implementation step-by-step with Agent Skills and Google AI Studio. Small prompts, repository checkpoints, real test outputs and recovery after interrupted sessions are required.
13. `demo/main.png` must be the primary visual reference for the first screen. Exact match must be proven by visual comparison, not asserted from code.

## Provenance and data facts
- Official product catalog: https://mapnagenerator.com/Fa/Products
- Other public source links and scope are recorded in `docs/04_DATA/PARS_PRODUCT_PORTFOLIO_BASELINE.md`.
- `data/product-project-fixture.json` contains synthetic project assignments/commitments and must never be treated as live PARS data.
- Commit `0cf198e1a719e2cc950ad6594b442531c93cc706` records the interactive demo work merged by PR #4 on 2026-10-11.
- Earlier PR #1 created the product→project object model; consult Git history rather than treating fixture data as actual.
- Earlier PR #2 established initial homepage layout and hard-blocking of infeasible options; the later domain work supersedes some implementation details, not the governing truth/feasibility contracts.

## Recovery protocol after a context interruption
1. Read this file and `IMPLEMENTATION_LEDGER.md`.
2. Inspect current branch/commit and uncommitted changes.
3. Verify the last gate's evidence and rerun failed/unverified tests.
4. Continue only from the first gate not marked PASS.
5. Never infer success from a prior assistant message if repository evidence contradicts it.
