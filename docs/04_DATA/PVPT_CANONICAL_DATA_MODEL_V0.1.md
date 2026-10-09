# PVPT / Mission Control — Canonical Data Model v0.1

## Governing rules
- All UI pages are views over canonical entities, never independent mock datasets.
- Financial values are never fabricated. If source, currency, period, calculation basis or approval is absent, store NULL and show NOT YET QUANTIFIED / INTERNAL SOURCE REQUIRED.
- Product families/specifications may be loaded only from the official PARS catalog with source URL and retrieval date.
- Project instances, commitments, resource capacities, progress, margins, cash, collection and exposure remain absent until approved data is supplied.
- Data labels: PUBLIC_VERIFIED, INTERNAL_VERIFIED, USER_APPROVED_ASSUMPTION, DEMO_SYNTHETIC, UNKNOWN. Synthetic data never feeds executive financial indicators.

## Relationships

PRODUCT_FAMILY 1:N PRODUCT
PRODUCT N:M PROJECT through PROJECT_PRODUCT
PROJECT 1:N COMMITMENT
COMMITMENT 1:N MILESTONE
PROJECT 1:N ACTIVITY
MILESTONE N:M ACTIVITY through MILESTONE_ACTIVITY
PRODUCT 1:N BOM_REVISION; BOM_REVISION 1:N BOM_COMPONENT
BOM_COMPONENT N:M RESOURCE through COMPONENT_RESOURCE_REQUIREMENT
ACTIVITY N:M RESOURCE through ACTIVITY_RESOURCE_DEMAND
RESOURCE 1:N RESOURCE_CAPACITY_PERIOD
SUPPLIER 1:N SUPPLY_COMMITMENT; SUPPLY_COMMITMENT references MATERIAL/BOM_COMPONENT
ISSUE N:M affected objects through ISSUE_LINK
ISSUE 1:N IMPACT
DECISION_CASE 1:N OPTION; OPTION 1:N FEASIBILITY_RESULT
DECISION_CASE 0..1:1 DECISION
DECISION 1:N EXECUTION_ACTION and OUTCOME_OBSERVATION
All decision-relevant records N:1 DATA_PROVENANCE

## Canonical entities

### PRODUCT_FAMILY
family_id PK, code unique, name_fa, name_en, description, source_status, source_url, source_retrieved_at. Preserve exactly the six families shown in Image 2; do not infer replacements. If the reference labels cannot be verified, mark them awaiting reference verification rather than silently changing them.

### PRODUCT
product_id PK, family_id FK, product_code, name_fa, name_en, rated_output_value nullable, rated_output_unit nullable, rating_type nullable, specification_source_url, data_status, valid_from, valid_to. Unique family_id + product_code. Catalog ratings are product specifications, not project performance.

### PROJECT / PROJECT_PRODUCT
PROJECT: project_id PK, project_code, project_name, customer_id nullable, project_type, lifecycle_status, source_system, source_record_id, data_status. Do not create project rows without approved real or clearly synthetic data.
PROJECT_PRODUCT: project_product_id PK, project_id FK, product_id FK, quantity nullable, unit nullable.

### COMMITMENT / MILESTONE
COMMITMENT: commitment_id PK, project_id FK, commitment_type, description, committed_at nullable, due_at nullable, owner_role nullable, status, source reference, data_status.
MILESTONE: milestone_id PK, project_id FK, commitment_id FK nullable, milestone_code, name, baseline_date nullable, forecast_date nullable, actual_date nullable, status, source reference, data_status. Baseline, forecast and actual are separate.

### ACTIVITY / ACTIVITY_DEPENDENCY
ACTIVITY: activity_id PK, project_id FK, activity_code, name, planned_start/end nullable, forecast_start/end nullable, actual_start/end nullable, status, source, data_status.
ACTIVITY_DEPENDENCY: predecessor_activity_id FK, successor_activity_id FK, dependency_type, lag nullable, source. Prevent cycles unless explicitly supported by the scheduling model.

### BOM_REVISION / BOM_COMPONENT
BOM_REVISION: bom_revision_id PK, product_id FK, revision, validity, approval_status, source.
BOM_COMPONENT: bom_component_id PK, bom_revision_id FK, parent_component_id nullable self-FK, component_code, description, quantity_per nullable, unit, criticality, source, data_status. A BOM is not complete unless the approved source confirms it.

### RESOURCE / RESOURCE_CAPACITY_PERIOD / ACTIVITY_RESOURCE_DEMAND
RESOURCE: resource_id PK, resource_type (MATERIAL, MACHINE, SKILL/LABOR, WORKCENTER, TEST_STATION, CASH, SUPPLIER), code, name, unit, location, source, data_status.
RESOURCE_CAPACITY_PERIOD: capacity_period_id PK, resource_id FK, period_start/end, gross_capacity nullable, unavailable_capacity nullable, committed_capacity nullable, available_capacity nullable, unit, source, data_status. Calculate available capacity only from sufficient sourced fields.
ACTIVITY_RESOURCE_DEMAND: demand_id PK, activity_id FK, resource_id FK, required_quantity nullable, required_unit, demand_start/end nullable, allocation_status, source, data_status. Detect overlapping shared-resource demand across projects.
COMPONENT_RESOURCE_REQUIREMENT: requirement_id PK, bom_component_id FK, resource_id FK, quantity_per nullable, unit, lead_time nullable, source, data_status.

### SUPPLIER / SUPPLY_COMMITMENT
SUPPLIER: supplier_id PK, supplier_code, name, source, data_status.
SUPPLY_COMMITMENT: supply_commitment_id PK, supplier_id FK, bom_component_id FK nullable, quantity nullable, order_date nullable, committed_date nullable, forecast_date nullable, receipt_date nullable, status, source, data_status. Calculate delay only against an approved baseline and valid dates.

### ISSUE / ISSUE_LINK / IMPACT
ISSUE: issue_id PK, title, description, detected_at, severity nullable, owner nullable, status, evidence_status, source, data_status.
ISSUE_LINK: issue_link_id PK, issue_id FK, object_type, object_id, relationship_type, evidence_id FK nullable. Production implementation should use referentially validated link tables by object type, not unchecked polymorphic IDs.
IMPACT: impact_id PK, issue_id FK, affected_object_type, affected_object_id, impact_type (TIME, CUSTOMER, CAPACITY, COST, CASH, MARGIN, RISK), amount nullable, currency nullable, period nullable, method nullable, confidence nullable, source, data_status. Financial amount stays NULL without a sourced calculation. Unknown is not zero.

### DECISION_CASE / OPTION / FEASIBILITY_RESULT / DECISION
DECISION_CASE: decision_case_id PK, issue_id FK nullable, title, decision_required_by nullable, integrity_status, status, owner, created_at.
OPTION: option_id PK, decision_case_id FK, option_code, description, proposer, created_at, status, data_status.
FEASIBILITY_RESULT: feasibility_result_id PK, option_id FK, result (FEASIBLE, PARTIALLY_FEASIBLE, NOT_FEASIBLE, UNKNOWN), constraint details, evidence references, assessed_at, assessor. Immutable history; current result is a pointer.
DECISION: decision_id PK, decision_case_id FK unique, selected_option_id FK nullable, selected_feasibility_result_id FK nullable, decision_maker, decided_at, rationale, risk_acceptance, status. Preserve the exact historical feasibility result used.

### EXECUTION_ACTION / OUTCOME_OBSERVATION / DATA_PROVENANCE
EXECUTION_ACTION: action_id PK, decision_id FK, action, owner, due_at nullable, status, completed_at nullable, evidence.
OUTCOME_OBSERVATION: outcome_id PK, decision_id FK, observed_at, outcome_type, actual_value nullable, currency nullable, unit nullable, method, source, data_status. Avoided/protected value becomes a fact only after evidenced outcome observation.
DATA_PROVENANCE: provenance_id PK, source_class, source_name, source_url nullable, source_record_id nullable, retrieved_at, observed_at nullable, valid_from/to nullable, approved_by nullable, approval_at nullable, integrity_status, notes.

## Derived views, not duplicated input
- Product Portfolio = PRODUCT_FAMILY + PRODUCT.
- Product Detail = PRODUCT + sourced specs + linked PROJECT_PRODUCT rows.
- Project Detail = PROJECT + PROJECT_PRODUCT + commitments + milestones + activities.
- Resource Load = ACTIVITY_RESOURCE_DEMAND joined to RESOURCE_CAPACITY_PERIOD by resource/time.
- Commitment Exposure = issue-impact links to commitments/milestones supported by evidence.
- Executive Exposure = sourced impacts split into quantified financial, non-financial and unquantified.
- Value-at-Risk trend = dated sourced snapshots and calculation method; otherwise INSUFFICIENT HISTORY.
- Decision Queue = open DECISION_CASE rows meeting managerial-decision rules.
- Learning = rationale + execution + observed outcome; no causal claim without method.

## Validation rules
1. Enforce foreign keys and unique business keys.
2. Avoid persisting totals that should be derived.
3. Every UI element reads canonical entities or derived views.
4. NULL is not zero; missing evidence is not a healthy status.
5. Financial values require amount, currency, period, method, provenance and approval state.
6. Public product specs cannot be used to infer project exposure.
7. Synthetic records are isolated by dataset/environment and excluded from executive finance views.
8. Date comparisons require approved baseline and timezone convention.
9. Feasibility is time-phased and considers shared capacity.
10. Every decision preserves selected option, historical feasibility, evidence and rationale.
