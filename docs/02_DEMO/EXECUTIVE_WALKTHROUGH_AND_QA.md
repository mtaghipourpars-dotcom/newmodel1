# PVPT Demo v0.3 — Executive Walkthrough and QA

## Purpose and truth boundary

This is a guided concept demo, not a connected operational system. Project IDs, component IDs, capacities, budgets, dates, costs, and outcomes in DEMO-01 and DEMO-02 are fictional. The prototype has no live SAP/ERP integration, persistent database, validated general-purpose optimizer, or autonomous learning. Decisions and lessons recorded in the browser exist only for the current session.

## 7-minute executive walkthrough

### 0:00–0:45 — Start with the management question

Open `demo/index.html` and stay on **نمای مدیرعامل**.

Say: “The point is not to add another dashboard. The point is to connect an operational deviation to its binding constraint, compare only feasible interventions, make ownership explicit, and later compare the expected outcome with the actual outcome.”

Point to the DEMO MODE label and state that the financial and project figures are fictional.

### 0:45–2:45 — DEMO-01: critical component shortage

Open **تصمیم‌های ضروری** and open DEMO-01.

- Need: 2 components; available stock: 0.
- Required within: 3 days; ordinary lead time: 8 days.
- Expedite: 2 days, 180 million toman, against a fictional 200 million budget.
- Borrowing from another project shifts that project's commitment by 5 days.
- Substitute validation takes 6 days.

Run **ارزیابی امکان‌پذیری** for each option. Explain that the expedite option passes only the modeled time-and-budget checks; supplier confirmation and operational approval remain preconditions. The other two options violate a stated constraint in this scenario.

### 2:45–4:45 — DEMO-02: shared test-station capacity

Open DEMO-02.

- Project A demand: 12 hours; project B demand: 10 hours.
- Normal shared capacity: 16 hours.
- Deficit: 22 − 16 = 6 hours.
- Overtime: up to 8 extra hours for 90 million toman, within the fictional 150 million budget.
- External testing: 10 hours for 140 million toman and 3 days; qualification and booking must be confirmed.
- Deferring project A by 5 days violates its modeled commitment unless formally changed.

Ask the room: “Which resource or commitment is actually binding, and what evidence must be confirmed before the option is approved?”

### 4:45–5:45 — Trace the operational chain

Open **پروژه‌ها و تعهدات**. Follow:

Project / commitment → BOM Component / Cell → Production Order → Routing / Operation → machine capacity, material, and manpower → downstream milestone.

Emphasize that the identifiers and statuses in this screen are illustrative links, not records read from SAP.

### 5:45–6:45 — Record a decision and close the learning loop

Select a demo option and follow the link to **حافظه تصمیم و نتایج**. Enter a sample actual outcome, variance, and lesson. Refreshing or ending the session clears this in-memory record; it is not durable enterprise memory.

Say: “This demonstrates the intended PDCA interaction. It does not prove that the system learns automatically or that a financial benefit has been realized.”

### 6:45–7:00 — Close with a pilot proposal

Propose a bounded pilot using one product family and a small number of live project-component chains, subject to data-owner approval. Before using actual data, agree on:
- named owners and authoritative sources for commitments, BOM, orders, inventory, capacity, and costs;
- data timestamp, confidence, and missing-data treatment;
- hard constraints and who can authorize changes to them;
- baseline and outcome measures (e.g. earlier detection, decision lead time, commitment adherence), with no assumed savings;
- access control, audit trail, and approval responsibility.

## Browser QA coverage

The Playwright smoke suite is designed to verify:
1. Home page and explicit demo labeling.
2. Operations trace from BOM/Cell through production order and routing.
3. DEMO-01 arithmetic and the budget/time checks.
4. DEMO-02 6-hour deficit and budget/capacity checks.
5. Decision selection followed by session-only actual outcome and lesson registration.
6. Core navigation on desktop and mobile viewport.

Run locally after installing Node.js and project dependencies:

```bash
npm install
npx playwright install chromium
npm run test:demo
```

GitHub Actions runs the same suite on pushes to `main`, pull requests targeting `main`, and manual workflow dispatch. A successful workflow is evidence of these automated smoke checks only; it is not a substitute for stakeholder acceptance, cross-browser testing, visual review, security review, or validation against live PARS data.
