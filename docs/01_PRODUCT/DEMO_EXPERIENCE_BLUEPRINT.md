# PVPT Demo Experience Blueprint

## 1. Purpose

Build a polished, sales-oriented demonstration of PARS Value Protection Tower (PVPT). The demo must make the product's business value understandable within a short executive walkthrough. It is not a claim that a complete enterprise decision engine has already been implemented.

The demo should show a coherent story:
**operational signal → deviation → binding constraint → feasible options → executive decision → execution → actual outcome → learning.**

## 2. Four product areas

### A. Executive Home / Main Dashboard

**Audience:** CEO and senior management.

**Primary question:** What value or commitment is at risk, why does it matter, and what decision needs attention now?

Show:
- Portfolio and project exposure, with data status visible.
- Material commitments and intervention windows.
- The most important executive decision briefs.
- Risk/value map only where its plotted values have a clear basis.
- Recent material changes and follow-up status.
- Links from every executive indicator to the underlying project, component, resource or evidence.

The home page is a decision cockpit, not a generic KPI wall.

### B. Operations / Operational Reality

**Audience:** project owners, planning, production, procurement, engineering, finance and HR/resource owners.

Represent the operating chain:
Product / Project → BOM Component (Cell) → Production Order → Routing / Operation → Machine & Capacity → Material → Manpower / Skill → Planned dates → Customer commitment

A Cell is the smallest operational object in the demo's component-centric model. A component-level state change should be traceable to affected production orders, operations, projects and commitments.

Demo screens:
1. Project and commitment timeline.
2. BOM tree and component readiness.
3. Production orders and operation progress.
4. Routing and shared-machine calendar.
5. Material availability, shortages and expected arrival.
6. Manpower/skill availability by time bucket.
7. Constraint impact: which downstream operations and commitments are affected.

Do not imply a live SAP/ERP integration unless it exists. Use a visible source/status label such as DEMO SCENARIO, CONNECTED SOURCE, MANUAL INPUT, ASSUMPTION, or UNKNOWN.

### C. Challenges / Decision Preparation

**Audience:** project owners, functional managers and the executive steering committee.

The experience should make these steps visible:
1. Detect a deviation from a stated baseline.
2. Trace its impact through dependent components, operations, projects and commitments.
3. Identify the binding constraint(s), rather than merely flagging a symptom.
4. Register candidate options supplied by a named owner or specialist.
5. Check each option's time-phased feasibility against machines, materials, manpower, cash and other shared commitments.
6. Calculate comparable consequences where evidence permits: schedule, cost, margin/cash, risk and opportunity cost.
7. Present feasible options and trade-offs in an Executive Decision Brief.
8. If no option is feasible, raise a resource-crisis / constraint-change escalation instead of recommending an impossible choice.

**Important MVP boundary:** the demo can use scripted, clearly labelled scenarios and illustrative calculations. It must not imply that a full optimizer, validated feasibility engine, or autonomous option-generation engine exists unless implemented and tested. The manager retains decision authority.

Each Decision Brief should show:
- Problem statement and affected commitment.
- Evidence, source and last-updated time.
- Assumptions and unknowns.
- Binding constraints.
- Options and feasibility by time period.
- Cost, schedule, opportunity-cost and risk comparison.
- Decision required, accountable owner and deadline.
- Confidence / data-integrity status.

### D. Lessons Learned / Decision Memory

**Audience:** decision owners, action owners and future reviewers.

Each record links:
- The original challenge and evidence snapshot.
- Decision selected and options rejected.
- Decision owner and execution owner.
- Assumptions, confidence and expected outcome.
- Target date and expected cost/schedule/value impact.
- Actual execution and outcome.
- Variance between expected and actual.
- Explanation of variance and follow-up action.
- Reusable lesson, with limits on where it applies.

The demo should show the feedback loop without claiming that the system has already learned automatically from data. Improvement may initially be a human-reviewed update to assumptions, estimates or rules.

## 3. Suggested demo narrative (5–7 minutes)

1. **Executive Home:** show a customer commitment at risk.
2. **Operations:** open the affected project, trace it to a BOM component and the production operation that depends on it.
3. **Constraint:** reveal the actual limiting resource in the scripted case (for example, a critical component shortage or shared test-station capacity).
4. **Challenges:** compare candidate options and show why an infeasible option is excluded.
5. **Executive decision:** select a decision in the demo and assign an owner; make clear that this is a demonstration action, not a real company approval.
6. **Lessons Learned:** open the decision record and compare expected versus actual outcome using a completed sample case.
7. **Return to dashboard:** show how the unresolved risk or follow-up status would be reflected after an outcome is recorded.

## 4. Data truth and demo policy

The demo may contain a fictional end-to-end scenario for marketing, but it must be unmistakably labelled as fictional. Do not present fictional project IDs, progress percentages, financial values, dates, risks or outcomes as actual PARS data.

Use:
- OFFICIAL PRODUCT DATA for sourced product-family information.
- CONNECTED SOURCE only when a source is genuinely connected and refreshed.
- DEMO SCENARIO for fictional cases and their values.
- ASSUMPTION for an explicit modelling assumption.
- UNKNOWN / NOT YET QUANTIFIED when evidence is absent.
- STALE or CONFLICTING when freshness or integrity is inadequate.

Every consequential number should have a source, unit, time context and status. Potentially protected value must not be reported as actual protected value before the outcome is observed and reviewed.

## 5. UI principles

- Persian-first, RTL, responsive and visually polished.
- Strong executive hierarchy: decision and commitment first, operational detail on demand.
- Use progressive disclosure: summary → cause → evidence → options → decision record.
- Use status colour as a supplement, never as a substitute for labels and evidence.
- Keep every major screen navigable back to the affected project and decision.
- Build a compelling guided demo path; avoid dead-end navigation and placeholder controls that look functional.
- Prefer a few complete, coherent demo flows over many shallow screens.

## 6. Scope guardrails

### In scope for the marketing demo
- High-fidelity UI and realistic interaction.
- One or two end-to-end scripted cases.
- Mock data with clear DEMO labels.
- Visual constraint tracing and option comparison.
- Decision record and sample expected-vs-actual feedback.

### Not implied by the demo
- Production-ready integration with SAP or other systems.
- Complete enterprise-wide data model or master-data governance.
- Validated optimization across all resources.
- Autonomous decision-making or self-learning without human review.
- Actual savings, protected value or operational performance without evidence.

## 7. Definition of demo success

A target executive should be able to explain after the walkthrough:
1. What is at risk?
2. Why is it at risk?
3. What is the binding constraint?
4. Which options are actually feasible in the shown scenario?
5. What decision is required from management?
6. How will the company know whether the decision worked?
