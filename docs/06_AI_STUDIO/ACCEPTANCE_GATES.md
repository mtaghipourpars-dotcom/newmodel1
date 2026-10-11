# PVPT Acceptance Gates and Quality Contract

## A. Visual/UI
- [ ] Actual `demo/main.png` opened and dimensions recorded.
- [ ] Main screen captured at same viewport; side-by-side comparison attached.
- [ ] RTL and Persian text are correct; no clipped text, broken glyphs or unintended LTR components.
- [ ] Desktop composition follows reference; responsive views tested separately.
- [ ] Every visible control works or is visibly disabled with a reason; no dead buttons.
- [ ] Every page has loading, empty, error, disconnected/stale and populated states as applicable.
- [ ] No horizontal overflow at approved viewport matrix.
- [ ] Keyboard navigation, focus indicators, labels and contrast checked.

## B. Data integrity
- [ ] Six canonical families unchanged.
- [ ] No fabricated real projects/commitments/capacity/financials.
- [ ] Unknown values remain null/UNKNOWN and never silently become zero.
- [ ] Data provenance is visible and traceable from executive summary to source record.
- [ ] Demo fixtures cannot feed executive actual/finance indicators.
- [ ] PLAN, FORECAST, ACTUAL, ASSUMPTION, VALUE AT RISK, REALIZED LOSS and PROTECTED VALUE remain distinct.
- [ ] Data import validates IDs, relationships, units, dates, duplicate records and source owner.
- [ ] No unsupported inference from public product catalog to project assignment.

## C. Domain engine
- [ ] Same inputs + same baseline/engine/policy version + same seed produce deterministic output.
- [ ] Baseline snapshots and actual history are immutable.
- [ ] All hard gates run before alternative ranking.
- [ ] Time-phased material, machine, manpower/skill, method, cash and dependency constraints tested.
- [ ] Shared-resource conflicts across projects tested.
- [ ] Opportunity cost/displaced alternatives shown where calculable.
- [ ] No feasible option returns explicit resource crisis and constraint-change escalation.
- [ ] Feasibility result includes blockers, period, evidence, units and engine version.
- [ ] Human decision is explicit and separately auditable; no autonomous execution.

## D. Persistence/backend
- [ ] Database migrations run from an empty database.
- [ ] CRUD/read paths use server API and persistent DB.
- [ ] Data survives reload, new browser context and app/server restart.
- [ ] Referential integrity and transactions tested.
- [ ] Server-side validation and object-level authorization tested.
- [ ] Audit history captures changes and source provenance.
- [ ] DB failure and unavailable source yield graceful states.
- [ ] Backup/restore and migration strategy tested before production.

## E. Security
- [ ] Secrets only in server environment/secret manager.
- [ ] No private data in logs, public fixture or screenshots.
- [ ] Authn/authz and least privilege verified.
- [ ] CSRF/CORS/session/cookie policy appropriate to deployment.
- [ ] XSS, injection, unsafe URL, file upload/import limits and rate limiting reviewed.
- [ ] Dependency audit and production build reviewed.
- [ ] No source-system write operation without explicit approval and audited authorization.

## F. Testing/release
- [ ] Unit tests for deterministic domain logic.
- [ ] API/integration tests against a test database.
- [ ] Browser end-to-end tests for complete critical paths.
- [ ] Regression tests for existing prototype behavior or documented replacement.
- [ ] Accessibility checks.
- [ ] CI results are green and linked.
- [ ] Actual test commands/output recorded; no unsupported claims.
- [ ] Deployment, monitoring, rollback, backup/restore runbook documented.
- [ ] Human approval recorded before release.

**Fail rule:** any unchecked mandatory item means the corresponding readiness claim is not passed. A working preview alone is not a completed Web App.
