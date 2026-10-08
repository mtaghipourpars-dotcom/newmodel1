# PVPT MVP Architecture

## 1. Product Boundary

```text
SOURCE SYSTEMS
SAP | P6 | APS | MES | PLM | Procurement | Finance | Contract/CRM
                         ↓
                 Evidence / Context
                         ↓
                VALUE EXPOSURE ENGINE
                         ↓
                 IMPACT CHAIN ENGINE
                         ↓
             INTERVENTION WINDOW ENGINE
                         ↓
                        MDCRL
        ┌─────────────────────────────────────┐
        │ Rule Evaluation                     │
        │ Decision Case                       │
        │ Dependency / Traceability Graph     │
        │ Integrity Engine                    │
        │ Feasibility Reference               │
        │ Decision Memory / Reasoning         │
        └─────────────────────────────────────┘
                         ↓
              Executive Decision Brief
                         ↓
                   Human Decision
                         ↓
                      Outcome
                         ↓
              Protected Value / Learning
```

## 2. Ownership Boundary

### Source systems own

- Operational transactions
- Production actuals
- Project schedules
- Procurement transactions
- Financial transactions
- Engineering records

### PVPT owns

- Executive value exposure context
- Decision case
- Decision package
- Decision rationale
- Decision memory
- Outcome linkage
- Reasoning reconstruction

PVPT does not replace ERP, P6, APS, MES or Finance.

## 3. MDCRL Role

MDCRL is an internal reasoning/context engine, not the customer-facing product.

Its core responsibilities:

- Rule evaluation
- Decision-case formation
- Traceability
- Integrity
- Feasibility reference
- Decision memory
- Reasoning reconstruction

## 4. Non-goals for MVP

- ERP replacement
- MRP/APS replacement
- Scheduler
- Generic BI
- Workflow platform
- AI chatbot
- Automatic option generation
- Automatic decision making

## 5. MVP Build Order

### Step 1 — UI / Information Architecture
Freeze CEO home page and navigation.

### Step 2 — Product Portfolio
Load only verified PARS product data and images.

### Step 3 — Product → Project Object Model
Define the relationship without inventing project instances.

### Step 4 — Real Project Pilot
Obtain 1–3 real PARS projects and real milestone/commitment data.

### Step 5 — Risk → Impact Chain
Map one real risk through project, commitment, cash/collection and value exposure.

### Step 6 — Decision Brief
Implement one real executive decision case.

### Step 7 — Outcome
Capture actual outcome and compare with pre-decision exposure.

### Step 8 — Value Proof
Measure whether the intervention produced measurable preservation/reduction of loss.

Only after these steps should broader integration and technical hardening begin.
