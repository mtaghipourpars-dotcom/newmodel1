# Sidebar & Core Product Engines — PARS Mission Control MVP

## Purpose

The MVP is a capability-demonstration product, not a complete simulation of MAPNA PARS. The sidebar is organized around the user's five operating domains. Each domain is both a navigation destination and a product-development engine.

## Primary Sidebar

1. **تعهدات (Commitments)**
   - سبد محصولات
   - محصولات
   - پروژه‌ها
   - تعهدات پروژه‌ای
   - وضعیت و پیشرفت
   - ریسک‌ها و تعهدات در معرض خطر
   - Support products with no active projects (legacy/installed-base products).

2. **منابع (Resources)**
   - متریال و قطعات
   - ماشین‌آلات و ایستگاه‌های کاری
   - نیروی انسانی و مهارت‌ها
   - منابع کلیدی
   - ظرفیت و دسترس‌پذیری زمان‌مند
   - وضعیت آخر منابع: quantity, capacity, availability, constraint
   - نقدینگی (Cash) is a first-class, high-impact resource and must not be hidden as a generic finance KPI.

3. **منافع و ارزش (Value & Benefits)**
   - PLAN vs ACTUAL
   - Value composition / mix
   - Value at Risk (clearly distinguished from realized loss)
   - Value-at-Risk trend, only where time-series data exists
   - Delivery, margin, cash/liquidity and capacity indicators
   - All monetary values must be sourced or explicitly labeled as approved assumptions/demo data.

4. **تصمیمات (Decisions)**
   - Executive decision queue
   - Decision cases and evidence
   - Options and consequence comparison
   - Feasibility and constraints
   - Decision history and rationale
   - Decision implementation and observed effects

5. **درس‌آموخته‌ها (Lessons Learned)**
   - Lesson history
   - Context and originating issue
   - Decision and observed outcome
   - Reusable learned rules
   - Rule status: proposed, reviewed, approved, retired
   - Lessons do not silently become binding rules; approval and scope must be explicit.

## Cross-cutting operating model

The domains are connected, not independent silos:

`Commitment / Issue ↔ Resource Constraint ↔ Value Exposure ↔ Decision ↔ Execution Outcome ↔ Lesson / Learned Rule`

- A serious issue can be traced forward to affected activities, projects, customer commitments, resources, cash and value.
- A threatened commitment can be traced backward to its dependent activities, required resources, constraints and root issue.
- Not every operational event creates an executive decision case. Escalation occurs when existing operating rules do not determine a single action and management must choose among alternatives.
- The system prepares and records decisions; humans retain approval, accountability and risk acceptance.

## Data truth and labels

Every record or displayed measure must be distinguishable as one of:
- `PUBLIC_VERIFIED`
- `INTERNAL_VERIFIED`
- `USER_APPROVED_ASSUMPTION`
- `DEMO_SYNTHETIC`
- `UNKNOWN`

No unapproved assumption is to be committed as approved master data. A demo value is not a PARS actual. PLAN, ACTUAL, forecast, assumption, exposure, realized loss and protected value must remain separate concepts.

## UI rules

- Preserve the six product families already selected in Image 2; do not replace, merge or rename them without explicit user direction.
- Each sidebar domain gets a coherent landing page and detail views, but the first implementation should prioritize navigation and clickable UI over premature process automation.
- Use explicit empty states such as `DATA REQUIRED`, `NOT YET QUANTIFIED`, `INSUFFICIENT HISTORY` and `INTERNAL SOURCE REQUIRED` instead of fabricated figures.
- The CEO Home page is the overview, not a substitute for the five domains.
- New UI-driven ideas should be captured as hypotheses and validated separately before they become architecture commitments.

## Demo acceptance criteria

1. A user can navigate to all five domains.
2. The user can understand the commitment/resource/value/decision/learning relationships.
3. Legacy products can exist with no active project.
4. Cash is visible as a first-class resource.
5. PLAN, ACTUAL and Value at Risk are visually distinct.
6. Decision history shows rationale and effects.
7. Lessons can produce proposed learned rules, but not silently auto-approve them.
8. No synthetic or assumed value is presented as verified PARS data.
