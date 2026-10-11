# Product → Project Object Model (PPOM)

**Status:** Implementable contract for the next PVPT MVP increment. The included fixture is illustrative only; it is not PARS operational data.

## Boundary and identifiers

- `ProductFamily` has one of the six canonical PVPT family IDs. The list is fixed; catalogue subcategories do not create new top-level UI families.
- `Product` is a catalogued model/variant and references exactly one family. Product identifiers in this contract are stable internal PVPT keys; they are not represented as PARS SAP material numbers.
- `ProjectProductAssignment` is a separate, source-governed relationship. Do not infer it from a public product catalogue, family membership, model similarity, or a demo scenario.
- `Project` is an execution instance and must use an authoritative internal project/WBS identifier before it can be classified `INTERNAL_VERIFIED`. Fixture project IDs are deliberately prefixed `DEMO-` and labelled `DEMO_SYNTHETIC`.
- A project may include multiple products and a product may be used by multiple projects; the relationship is many-to-many and each assignment is independently evidenced.
- Unknown or unvalidated assignments remain explicit `UNKNOWN` with `project_id: null` and a reason. Never silently map an unknown relationship to a plausible project.

## Required provenance on assignments

Each assignment carries:
- `assignment_id`, `product_id`, `project_id`, `relationship_status`.
- `data_class`: `PUBLIC_VERIFIED | INTERNAL_VERIFIED | USER_APPROVED_ASSUMPTION | DEMO_SYNTHETIC | UNKNOWN`.
- `source_system`, `source_reference`, `source_owner`, `as_of`, `confidence`, `quality_status`.
- Unknown relationships must have null project ID and no claimed verified source. Demo assignments must be visibly labelled and cannot be promoted to internal facts without evidence review.

## Commitment traceability

Commitments belong to projects, not directly to product-family cards. Each commitment requires a unique ID, type, due date, status, provenance, and at least one related milestone. An official catalogue page is not evidence of a customer, backlog, commitment, due date, cost, margin, or capacity.

## Promotion rule

A record may be promoted from `DEMO_SYNTHETIC` / `USER_APPROVED_ASSUMPTION` / `UNKNOWN` to `INTERNAL_VERIFIED` only after an accountable source owner validates the internal identifier, relationship cardinality, source reference, effective date, and update timestamp. Preserve prior versions and record the reviewer. No automated inference or model suggestion is sufficient evidence.

## Acceptance gate

The automated fixture tests must verify:
1. Exactly six canonical families; each product maps to one valid family.
2. Every project-product assignment has a valid product, explicit classification and provenance fields.
3. Synthetic project IDs/assignments remain labelled synthetic.
4. Unknown assignments have null project IDs and cannot masquerade as verified.
5. Every project has at least one commitment and each commitment has at least one milestone.
6. Duplicate IDs, orphan references, and invalid relationship statuses fail validation.
7. Catalogue evidence is never treated as evidence of a project assignment.
8. The fixture remains deterministic and contains no claims of actual PARS backlog or operational status.

The fixture is a contract/test sample, not a source of actual project data. Real data loading remains blocked until the authoritative internal product, project/WBS, assignment and commitment extracts have owners and as-of dates.
