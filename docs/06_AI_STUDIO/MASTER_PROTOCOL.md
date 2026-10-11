# PVPT — Master Development Protocol for Google AI Studio

## Mission
Build a real, maintainable web application from the existing PVPT repository, not merely a static mockup. Work incrementally and preserve the reference UI and repository history.

## Authority order
When documents appear to conflict, resolve in this order:
1. Explicit user instruction in the active task.
2. `AGENTS.md` and this protocol.
3. `SCREEN_REFERENCE_CONTRACT.md` for visual decisions.
4. Canonical data and business contracts in `docs/04_DATA`.
5. Product and UI contracts in `docs/01_PRODUCT` and `docs/02_UI`.
6. Architecture and security contracts in `docs/03_ARCHITECTURE` and `docs/06_AI_STUDIO`.
7. Existing implementation as evidence of current behavior, not as authority over the contracts.
8. Agent-generated proposals, which are hypotheses until validated.

If a contradiction cannot be resolved, stop, document it, and ask for a human decision. Do not silently choose.

## Operating mode
- One phase/work package per prompt.
- First inspect; then report a file-level plan; then implement only after the phase is authorized.
- Keep current behavior until replacement passes tests.
- No large-scale rewrite, invented product scope, hidden mock values, or unreviewed dependency additions.
- Do not generate all screens in one step. Complete shared contracts and shell first, then domain slices.
- Treat Google AI Studio output as untrusted code until type-check, lint, unit, integration, security and browser tests pass.
- Record every completed step and evidence in the implementation ledger.

## Required architecture qualities
- React web frontend and Node.js server/API are acceptable implementation defaults in AI Studio Build mode; verify generated stack rather than assuming it.
- Persistent database: PostgreSQL. Define schema/migrations, constraints, indexes, transaction boundaries and seed policy. Never use localStorage as the source of truth for production data.
- Deterministic business engines are pure/testable services, separate from UI components and LLM output.
- Every mutation has server-side validation, authorization, audit event and explicit transaction semantics.
- AI may summarize evidence or explain calculations; it must not invent data, override hard constraints, determine feasibility without deterministic evidence, or commit a human decision.
- Keep source-system adapters behind interfaces; never claim SAP, P6, MES, PLM, SCADA or finance is connected until integration tests prove it.
- Add a visible connection/readiness state per source and per critical data domain.

## Data contract
Every decision-relevant record must preserve:
`data_class`, `source_system`, `source_reference`, `source_owner`, `as_of`, `confidence`, `quality_status`, `snapshot_id` where applicable.
Unknown values remain null/UNKNOWN, never zero by default. Version records and preserve prior state. Keep baseline and actual immutable; scenarios are overlays.

## Mandatory feasibility sequence
1. Validate input and referential integrity.
2. Freeze/identify baseline snapshot and policy/engine versions.
3. Resolve dependency and precedence constraints.
4. Evaluate material availability by time bucket.
5. Evaluate machine/work-center capacity by time bucket.
6. Evaluate manpower and skill capacity by time bucket.
7. Evaluate method/qualification constraints.
8. Evaluate cash by time bucket.
9. Evaluate cross-project/shared-resource conflicts and opportunity cost.
10. Only then rank feasible alternatives using explicit, versioned policy.
11. If no option passes hard gates, return `NO_FEASIBLE_OPTION` and escalate a resource crisis / constraint change.
12. Persist explainable blockers and result version; do not auto-select or execute.

## UI fidelity contract
`demo/main.png` is the mandatory first-screen visual reference. Before changing the home page, produce a baseline screenshot at the same viewport and compare layout, typography, color, spacing, content hierarchy, chart treatment, iconography and RTL. Record viewport and differences. No claim of exact match without side-by-side evidence. Keep responsive behavior as a separate acceptance test; do not distort the reference desktop composition to solve mobile layout.

## Definition of done for each work package
- Scope and files listed.
- No unresolved requirement conflict.
- Tests added/updated.
- Relevant tests run and actual results recorded.
- Browser console free of new errors.
- No horizontal overflow at required viewport widths.
- UI states tested: loading, empty, error, stale/disconnected, valid data, invalid form, authorization failure where relevant.
- Data provenance visible for decision-relevant facts.
- Docs and ledger updated.
- Commit/PR diff reviewed. Do not claim success based only on generated code or a preview screenshot.

## Final release gate
Do not label the app complete until all mandatory acceptance gates are passed, data integration boundaries are honest, database persistence is proven across reloads/sessions, migrations and recovery are documented, and reference UI audit is evidenced. A demo-only success is not production readiness.
