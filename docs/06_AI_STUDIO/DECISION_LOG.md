# PVPT Decision Log (ADR Register)

Use one dated entry per material architecture or business-rule decision. Status values: PROPOSED, ACCEPTED, SUPERSEDED, REJECTED. Do not convert a proposal to accepted without explicit evidence/approval.

## ADR-001 — PVPT prepares decisions; humans decide
- Status: ACCEPTED
- Context: Management must retain accountability, risk acceptance and approval.
- Decision: System supplies evidence, constraints, options, rationale and traceability; authorized human records the decision.
- Consequence: No autonomous decision, ERP transaction or silent action execution.

## ADR-002 — Public catalogue is not operational truth
- Status: ACCEPTED
- Decision: Public PARS catalogue supports product-family/model/specification facts only. It does not prove projects, backlog, commitments, margin, cash, capacity or exposure.
- Consequence: Unknown internal data remains unknown until a source owner validates it.

## ADR-003 — Six canonical top-level product families
- Status: ACCEPTED
- Decision: Preserve `THERMAL_GENERATORS`, `HYDRO_GENERATORS`, `WIND_TURBINES`, `INDUSTRIAL_GENERATORS`, `MOTORS`, `BUSDuct`.
- Consequence: Catalogue subcategories map beneath these categories; no silent family changes.

## ADR-004 — Provenance is part of the domain model
- Status: ACCEPTED
- Decision: Use PUBLIC_VERIFIED, INTERNAL_VERIFIED, USER_APPROVED_ASSUMPTION, DEMO_SYNTHETIC, UNKNOWN and retain source metadata.
- Consequence: UI must surface data class and source context; missing is not zero.

## ADR-005 — Feasibility before preference ranking
- Status: ACCEPTED
- Decision: Apply hard gates before scoring; time-phase and shared-resource checks are mandatory. If no feasible option remains, escalate the resource crisis/constraint change.
- Consequence: Weights and AI prose cannot override a failed hard gate.

## ADR-006 — PostgreSQL as durable application persistence
- Status: ACCEPTED AS TARGET; implementation not yet verified
- Decision: Use PostgreSQL for production source of truth; localStorage may only hold non-sensitive view preferences.
- Consequence: Schema/migrations, server-side API, transactions, audit and backup/restore must be implemented and tested.

## ADR-007 — Reference UI authority
- Status: ACCEPTED
- Decision: `demo/main.png` is mandatory visual reference for first screen.
- Consequence: Record image dimensions, viewport and side-by-side comparison; do not claim exact match without visual evidence.

## ADR-008 — Google AI Studio is the staged build environment
- Status: ACCEPTED AS WORKFLOW; actual import/build not yet verified
- Decision: Import the GitHub repository into Google AI Studio Build mode, provide repository contracts and Agent Skills explicitly, and implement one gate at a time.
- Consequence: The agent must not assume skill files are automatically loaded; prompt explicitly names required documents.
