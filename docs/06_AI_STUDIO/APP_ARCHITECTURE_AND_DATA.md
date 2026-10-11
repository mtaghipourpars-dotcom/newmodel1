# Target Web App Architecture and Data Boundaries

## Target
A full-stack PVPT Web App, not the current static prototype. AI Studio Build mode may generate React client and Node.js server runtime; inspect actual generated files before locking framework details.

## Logical layers
1. **Presentation:** React routes/pages, shared design system, Persian-first RTL, accessible forms and tables.
2. **Application/API:** server-side route handlers, request validation, authorization, command orchestration, consistent error envelopes.
3. **Domain:** pure deterministic services for provenance, impact chains, capacity, feasibility, decision case lifecycle and outcome comparison.
4. **Persistence:** PostgreSQL with versioned migrations, foreign keys, unique constraints, transaction boundaries and indexes.
5. **Integration adapters:** interfaces for SAP, Primavera P6, MES/APS/PLM/SCADA, procurement and finance; initially disconnected until credentials, mappings, source owners and tests are provided.
6. **AI assistance:** optional explanation/summarization over already validated records, with citations to record IDs; never the source of numeric truth or the feasibility engine.

## PostgreSQL rules
- Production data must survive browser reload, new session and application restart.
- Never use localStorage as the canonical database. It may store non-sensitive UI preferences only.
- Do not place DB connection strings or secrets in client bundles, source control, prompts or screenshots.
- Use migrations checked into source control. Avoid manual production schema edits.
- Keep immutable actuals, baseline snapshots, decisions and audit history; scenario edits must not mutate a frozen baseline.
- Use transactions for multi-record decisions and source imports.
- Seed data must be explicitly tagged and isolated. Default production seed must not insert fake PARS project/finance records.
- Include backup/restore, migration rollback/forward strategy and retention policy before production.
- Choose ORM/query layer only after inspecting generated stack; record decision and trade-offs.

## Core entity families
Use existing canonical contracts as the authority; at minimum cover:
- ProductFamily, Product, Project, ProjectProductAssignment
- Commitment, Milestone, Activity, ActivityDependency
- BOMRevision, BOMComponent/Cell, ProductionOrder, Routing/Operation
- Resource, ResourceCapacityPeriod, ActivityResourceDemand, ComponentResourceRequirement
- Supplier, SupplyCommitment, MaterialLedger/Receipt/Reservation/Consumption
- Scenario, BaselineSnapshot, PolicyVersion, SimulationRun
- Issue, IssueLink, Impact
- DecisionCase, Option, FeasibilityResult, Decision, ExecutionAction
- OutcomeObservation, LearningRecord, DataProvenance, SourceRegistry, AuditEvent
- User, Role, Permission, Session (or equivalent identity-provider model)

Do not create a parallel table per UI page. Every page must read/write canonical shared entities through the application layer.

## Resource feasibility
Capacity is time-phased. Check cross-project shared resource demand and opportunity cost. Hard gates run before ranking: dependencies → material → machine/work center → manpower/skill → method/qualification → cash. Keep blocker codes, source evidence, period and calculation explanation. If no feasible option, return a crisis escalation; do not select the least impossible option.

## Data truth contract
Allowed data classes:
- `PUBLIC_VERIFIED`
- `INTERNAL_VERIFIED`
- `USER_APPROVED_ASSUMPTION`
- `DEMO_SYNTHETIC`
- `UNKNOWN`

Every consequential fact should preserve applicable source system/reference/owner/as-of/confidence/quality/snapshot. Unknown numeric fields are null; the UI shows an explicit state. Never derive project or financial facts from public catalogue data.

## UI areas
The current repository contracts cover:
- Executive home
- Portfolio/families/catalogue
- Projects/commitments/milestones/commitment chain
- BOM/Cells, routing/activities, production orders, simulation/scenarios
- Resources, materials, machines/work centers, labor/skills, capacity, suppliers, cash constraints
- Issues/risks/impact chain/evidence integrity
- Decision cases/options/feasibility/management council/decision register/actions
- Decision memory/outcomes/lessons/executive indicators/provenance
- Data readiness/assumptions/source registry/roles/settings

Implement in slices, starting with shared shell and one end-to-end vertical slice. Do not scaffold dozens of empty routes and call the app complete.

## API quality
- Validate every input server-side with explicit schema.
- Return consistent status codes and error messages; never expose stack traces or secrets.
- Apply object-level authorization to reads and writes.
- Audit who changed what, when, from which source, and why.
- Add idempotency for retryable imports/commands.
- Paginate large lists; add server-side search/filter where appropriate.
- Prevent untrusted HTML injection and unsafe URL rendering.
