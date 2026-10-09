# Sidebar Navigation & Page/Data Contract — PVPT MVP

## Rule
Canonical data model comes first. Sidebar pages are projections of shared entities and derived views, never separate datasets. Financial values are never fake.

## Sidebar groups

### 1. مدیریت اجرایی
- نمای مدیرعامل — CEO Home
- صف تصمیم‌های ضروری — Decision Queue
- فرصت‌های مداخله — Intervention Windows
- ارزش در معرض خطر — Value Exposure

### 2. سبد محصول و تعهدات
- سبد محصولات — Product Portfolio
- خانواده‌های محصول — Product Families
- مشخصات محصول — Product Catalog
- پروژه‌ها — Projects
- تعهدات مشتری — Commitments
- نقاط عطف تحویل — Milestones
- زنجیره تعهدات — Commitment Chain

### 3. برنامه و تولید
- ساختار محصول و BOM — BOM / Components
- مسیر و فعالیت‌های تولید — Routing / Activities
- سفارش‌های تولید — Production Orders (data required until connected)
- پیشرفت و واقعیات اجرا — Execution / Actuals
- شبیه‌سازی زمان‌مند — Simulation
- سناریوها و مقایسه — Scenarios

### 4. منابع و ظرفیت
- نمای منابع — Resource Overview
- متریال و قطعات — Materials
- ماشین‌آلات و مراکز کاری — Machines / Work Centers
- نیروی انسانی و مهارت — Labor / Skills
- ظرفیت و بارگذاری — Capacity & Load
- تأمین‌کنندگان و سفارشات — Suppliers / Supply Commitments
- نقدینگی و محدودیت مالی — Cash Constraints (source required)

### 5. ایشو، ریسک و اثر
- فهرست ایشوها — Issues
- نقشه اثر و وابستگی — Impact Chain
- تعارض منابع — Resource Conflicts
- تعهدات متأثر — Affected Commitments
- یکپارچگی و کیفیت شواهد — Evidence & Integrity

### 6. شورای مدیران و تصمیم
- پرونده‌های تصمیم — Decision Cases
- گزینه‌ها و پیامدها — Options & Consequences
- امکان‌پذیری گزینه‌ها — Feasibility
- شورای مدیران — Management Council
- ثبت تصمیمات — Decision Register
- اقدامات و پیگیری — Actions & Follow-up

### 7. یادگیری و گزارش
- حافظه تصمیم — Decision Memory
- نتایج واقعی — Outcomes
- درس‌آموخته‌ها — Lessons Learned
- شاخص‌های مدیریتی — Executive Indicators
- روند ارزش در معرض خطر — Exposure Trend (dated valid snapshots only)
- منشأ داده و تأییدها — Data Provenance & Approvals

### 8. مدیریت داده و تنظیمات
- وضعیت داده‌ها — Data Readiness
- فرضیات تأییدشده — Approved Assumptions
- کاتالوگ منابع داده — Source Registry
- نقش‌ها و دسترسی‌ها — Roles & Permissions
- تنظیمات مدل — Model Configuration

## Page-to-model binding
- CEO Home: Product Portfolio, Project, Commitment, Impact, Decision Case, Outcome.
- Product Families/Catalog: PRODUCT_FAMILY, PRODUCT.
- Project detail: PROJECT, PROJECT_PRODUCT, COMMITMENT, MILESTONE, ACTIVITY.
- Commitment chain: COMMITMENT, MILESTONE, ACTIVITY_DEPENDENCY, ISSUE_LINK.
- BOM: BOM_REVISION, BOM_COMPONENT.
- Resource overview: RESOURCE, RESOURCE_CAPACITY_PERIOD.
- Capacity/load: ACTIVITY_RESOURCE_DEMAND + RESOURCE_CAPACITY_PERIOD.
- Suppliers: SUPPLIER, SUPPLY_COMMITMENT.
- Issues: ISSUE, ISSUE_LINK, provenance.
- Impact chain: ISSUE_LINK, IMPACT.
- Decision case: DECISION_CASE, OPTION, FEASIBILITY_RESULT, DATA_PROVENANCE.
- Decision register: DECISION, selected historical feasibility result, rationale.
- Outcomes/learning: EXECUTION_ACTION, OUTCOME_OBSERVATION, DECISION.
- Finance/exposure: IMPACT and OUTCOME with currency, period, method and provenance; otherwise NOT YET QUANTIFIED.
- Data readiness: missing required fields, provenance, source freshness and integrity.

## Finance and data safety
- Public product catalog facts may be shown with source attribution.
- Public specifications do not establish current projects, capacity, margin, cash, receivables, delays or exposure.
- Financial widgets display NOT YET QUANTIFIED / INTERNAL SOURCE REQUIRED unless backed by approved source data.
- Never show zero for missing information. No fake financial values, trend bars or project statuses.
- User-approved synthetic assumptions may be used only in isolated simulation views labelled DEMO_SYNTHETIC; never feed executive finance indicators.

## UI interaction contract
- Sidebar navigation highlights the active view.
- Product selection filters linked project records; absent project rows produce an empty state, not sample projects.
- Project selection filters commitments, milestones, activities, resource demand, issues and impacts through keys.
- Issue selection opens supported impact chains and linked commitments.
- Decision selection shows options, feasibility history, rationale, actions and observed outcomes.
- Missing source fields render data-readiness states, not placeholder numbers.
