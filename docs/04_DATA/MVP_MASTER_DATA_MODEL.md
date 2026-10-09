# MVP Master Data Model — PARS Mission Control

**Status:** Initial simulation baseline; six product families preserved from Image 2.  
**Purpose:** Define the connected master data needed for a deterministic, resource-constrained commitment simulation.  
**Truth boundary:** Public product names/specifications are only used where sourced. Project, BOM, routing, capacity, calendar, cost and commitment records in the demo dataset are synthetic and must remain visibly labelled `DEMO_SYNTHETIC`; they are not claims about current PARS operations.

## 1. Six product families — canonical list

Do not merge, split, rename or remove these six Image 2 families:

1. `THERMAL_GENERATORS` — ژنراتورهای حرارتی
2. `HYDRO_GENERATORS` — ژنراتورهای برق‌آبی
3. `WIND_TURBINES` — توربین‌های بادی
4. `INDUSTRIAL_GENERATORS` — ژنراتورهای صنعتی
5. `MOTORS` — موتورها
6. `BUSDuct` — باس‌داکت

These are UI/product-portfolio categories. The official catalog may classify some products more granularly (e.g. wind generators, induction motors, permanent-magnet motors); map those to the six UI families without adding extra top-level families.

## 2. Entity relationship chain

```text
Organization / Plant
  ├─ Product Family
  │    └─ Product
  │         ├─ Product BOM
  │         │    └─ Component / Cell (one component = one production order)
  │         │          └─ Production Order
  │         │                └─ Operation / Routing Step
  │         │                     ├─ Machine / Work Center demand
  │         │                     ├─ Skill / Manpower demand
  │         │                     ├─ Material demand
  │         │                     └─ Method / qualification constraint
  │         └─ Project instances
  │              └─ Commitments / Milestones
  │                    └─ Required components and operations
  ├─ Resource bank (Machine, Manpower, Material, Method, Money)
  ├─ Calendar / Shift / Capacity
  └─ Supplier / Lead-time / Receipt
       ↓
Baseline Snapshot → Time-phased Simulation → Blockers → Scenario → Feasibility
       → Decision Case → Council/Human Decision → Committed Plan
       → Execution/Actual → Outcome → Learning
```

## 3. Master-data entities and mandatory relationships

| Entity | Key fields | Relationship / rule |
|---|---|---|
| ProductFamily | family_id, label_fa, label_en, display_order, active | Exactly six families listed above |
| Product | product_id, family_id, name, model_code, unit, source_status | N:1 family; public specs need source URL |
| Project | project_id, project_name, product_id, project_status, priority | Project is an instance; synthetic demo only unless verified |
| Customer | customer_id, name, source_status | Project may reference one customer |
| Commitment | commitment_id, project_id, type, due_date, priority, criticality, status | Types: contractual, customer delivery, project milestone, strategic, internal |
| Milestone | milestone_id, project_id, commitment_id, planned_date, forecast_date, actual_date | A project has ordered milestones |
| BOM | bom_id, product_id, revision, valid_from, status | Versioned product/component structure |
| Component / Cell | component_id, product_id, parent_component_id, qty_per, unit, cell_status | A Cell represents one component and maps 1:1 to a production order |
| ProductionOrder | po_id, component_id, project_id, planned_start, planned_finish, status | One component/Cell per PO |
| Routing / Operation | operation_id, po_id, sequence_no, work_center_id, standard_hours, status | Operations inside a PO are serial; POs are dependency-driven, not globally serial |
| Precedence | predecessor_id, successor_id, dependency_type, lag | No downstream operation before predecessors satisfy gate |
| Resource | resource_id, resource_type, name, unit, location, status | Resource types include MACHINE, MANPOWER, MATERIAL, METHOD, MONEY |
| WorkCenter / Machine | resource_id, capability, calendar_id, effective_capacity | Machine is locked only while current operation runs |
| Skill / OperatorPool | skill_id, resource_id, quantity, calendar_id | Skill and quantity are hard gates unless explicit substitution policy exists |
| Material | material_id, description, unit, source_status | Stock, reserved, in-transit, and consumed quantities must reconcile |
| Supplier | supplier_id, name, lead_time_days, confidence, source_status | Lead time is sourced or explicitly synthetic |
| MaterialDemand | operation_id, material_id, qty_required, qty_consumed | At PO start reserve all PO materials; consume by operation |
| ResourceDemand | operation_id, resource_id/resource_type, qty, hours, demand_date | Time-phased demand against available capacity |
| Calendar / Shift | calendar_id, date, shift, available_hours, outage_hours | Effective capacity must exclude non-working/outage periods |
| CashPosition / CashEvent | date, opening_cash, inflow, outflow, approved_injection | Cash is a hard resource gate; simulation cannot spend/approve money |
| Scenario | scenario_id, baseline_snapshot_id, policy_version, actions, seed | Future overlay on immutable baseline snapshot |
| FeasibilityResult | result_id, scenario_id, option_id, status, blockers, calculated_at | Immutable; status FEASIBLE/PARTIALLY_FEASIBLE/NOT_FEASIBLE |
| Issue / Blocker | issue_id, blocker_type, first_impact_date, affected_demand_ids | MATERIAL/MACHINE/MANPOWER/DEPENDENCY/CASH/MULTI_CONSTRAINT |
| DecisionCase | case_id, issue_id, affected_commitments, options, integrity_status | Create only when a managerial choice is needed |
| Decision | decision_id, case_id, chosen_option_id, rationale, owner, decided_at | Human authority; preserve historical feasibility result |
| Actual / Outcome | actual_id, operation_id, actual_dates, consumed_qty, actual_cost, outcome_status | Append-only actual history |
| LearningRecord | learning_id, decision_id, expected_outcome, observed_outcome, lesson | Learning compares forecast/scenario with actual outcome |

## 4. Resource and commitment balancing rules

1. All demands and capacities are time-phased; total monthly capacity alone is insufficient.
2. A resource cannot be allocated above effective capacity for the same time bucket.
3. Material availability = opening free stock + receipts by date − reservations − consumption, using a ledger.
4. Cash injection does not create material instantly; procurement lead time and receipt remain in the chain.
5. Machine, manpower/skill, material, dependency, cash and method constraints are hard gates before policy ranking.
6. Priority policy is scenario data, not hard-coded engine behavior. Candidate modes: LEXICOGRAPHIC, WEIGHTED, RULESET, HYBRID.
7. Commitment priority categories: HARD_CONTRACTUAL, CUSTOMER_DELIVERY, PROJECT_MILESTONE, STRATEGIC, INTERNAL. None bypasses hard gates automatically.
8. Simulation is deterministic for identical baseline snapshot, input data, engine version, policy version and seed.
9. Actual history is immutable. Scenario changes affect future state only.
10. Every allocation explains selected candidate, feasibility, blocker and displaced feasible candidates.
11. No feasible option is a valid result; surface a constraint-change/escalation requirement rather than fabricating feasibility.
12. Executive-facing UI rolls up Commitment → Project → Milestone → Resource. Drill-down can continue to WBS → Activity → Operation → Cell/PO.

## 5. Core simulation sequence

```text
Load Baseline Snapshot
→ Validate master data and referential integrity
→ Expand project commitments into milestones
→ Expand BOM into component Cells / production orders
→ Expand routing into serial operations
→ Calculate time-phased material, machine, manpower, method and cash demand
→ Apply dependency gate
→ Apply material gate
→ Apply machine gate
→ Apply manpower/skill gate
→ Apply method/qualification gate
→ Apply cash gate
→ Rank feasible candidates using scenario policy
→ Allocate / reserve resources
→ Calculate forecast, blockers, commitment impact and resource displacement
→ Create Decision Case only when human choice is required
→ Human decision / committed plan
→ Execution actuals
→ Outcome and learning
```

## 6. Data provenance contract

Every decision-relevant value must carry:
- `data_class`: PUBLIC_VERIFIED | INTERNAL_VERIFIED | USER_APPROVED_ASSUMPTION | DEMO_SYNTHETIC | UNKNOWN
- `source_system` and `source_reference`
- `as_of` / `valid_from` / `valid_to` where applicable
- `confidence`
- `quality_status`
- `snapshot_id`

Unknown values remain UNKNOWN. Do not infer a live PARS project, real due date, margin, supplier delay, stock, capacity, cash position, or value-at-risk from public product-catalog data.

## 7. Six-family product catalogue baseline

Use official product data only as product master examples; do not infer project assignment or resource capacity from product specifications.

| family_id | UI family | Example catalogue models / mapping |
|---|---|---|
| THERMAL_GENERATORS | ژنراتورهای حرارتی | MGG72-SH2 / MGS72-SH2; MGG63-SA2; MGS58-SA2; MGS54-SA2 |
| HYDRO_GENERATORS | ژنراتورهای برق‌آبی | MGH61-SA32 |
| WIND_TURBINES | توربین‌های بادی | MWT2.5-103-G-I / G-II; MWT4.5-126-G-I |
| INDUSTRIAL_GENERATORS | ژنراتورهای صنعتی | Use catalogue-listed industrial generator models only when explicitly classified in the official source |
| MOTORS | موتورها | Induction and permanent-magnet motor families; model records only when source verified |
| BUSDuct | باس‌داکت | Busduct / isolated-phase busduct product family |

Official source: https://mapnagenerator.com/Fa/Products  
Parent company context: https://mapnagroup.com/mapnacompanies/mapna-pars/?lang=en

## 8. MVP boundary

In scope:
- Six product families
- Product/project/commitment/milestone model
- BOM/component/Cell/production order/operation model
- Shared resource bank across projects
- Time-phased deterministic simulation
- Hard feasibility gates
- Scenarios and resource reallocation
- Issue-to-commitment and commitment-to-issue traceability
- Decision Council/decision record
- Actual outcome and learning
- Explicit demo/public/internal data classification

Out of scope for first MVP:
- Full digital twin of PARS
- Live write-back to SAP
- Autonomous managerial decisions or procurement/cash spending
- Minute-level APS replacement
- Full quality and maintenance implementation
- Claiming ROI/protected value before actual outcomes exist

## 9. Acceptance checks

- All six product families exist and remain visible in the UI.
- Every product maps to exactly one family.
- Every project has a product and at least one commitment/milestone.
- Every production Cell maps to exactly one production order.
- Every production order has at least one operation; operation sequence is unique within PO.
- Every operation's resource/material demand references a valid master record.
- Shared resources can be demanded by more than one project in the same time bucket.
- Simulation identifies overload/shortage and lists affected commitments.
- A cash injection does not instantly increase material stock.
- No option passing a hard gate may be ranked above an infeasible option.
- Same inputs and versions yield identical results.
- Synthetic values are never displayed as actual PARS values.
- Decision records reference the exact historical feasibility result used at decision time.
