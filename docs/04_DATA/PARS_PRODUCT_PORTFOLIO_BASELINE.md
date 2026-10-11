# PARS Product Portfolio — Verified Baseline

**Purpose:** Step 2 of the PVPT MVP build order: establish a source-backed product-family baseline before connecting products to projects.

**Primary source:** [Official MAPNA Generator Engineering & Manufacturing Co. PARS product catalogue](https://mapnagenerator.com/Fa/Products) (accessed 2026-10-11).

## Verified product families

The official catalogue groups products into these families:

| Family | Evidence in official catalogue | PVPT portfolio treatment |
|---|---|---|
| Thermal power-plant generators | Models and specifications are listed under «ژنراتور نیروگاه حرارتی» | Product family |
| Industrial generators | Models and specifications are listed under «ژنراتورهای صنعتی» | Product family |
| Hydro generators | Models and specifications are listed under «ژنراتورهای نیروگاه آبی» | Product family |
| Wind generators | Models and specifications are listed under «ژنراتور بادی» | Product family |
| Wind turbines and blades | Turbine and blade models/specifications are listed separately | Related product families; do not merge turbine and generator into one technical object in a future data model |
| Induction motors | Models and technical specifications are listed under «الکتروموتورهای القایی» | Product family |
| Permanent-magnet motors | Models and technical specifications are listed under «الکترو موتورهای مغناطیس دائم» | Product family |
| Busduct | NSPBD and IPBD types/specifications are listed | Product family |

The current homepage also includes **Services & Overhaul** as a business-area card. Keep it labelled as a service/business area, not a manufactured product family, unless a source-backed service catalogue is added.

## Data integrity rules

1. Product-family presence is source-backed; it does **not** prove current sales, backlog, capacity, profitability, market attractiveness, or strategic priority.
2. Do not attach projects, customers, financial amounts, delivery risks, capacity figures, or forecasts to a product family without an internal PARS source and a timestamp.
3. Do not copy model-level technical specifications into the homepage family cards. If model-level details are added later, preserve the exact model identifier, field, unit, source URL, and retrieval/update date.
4. A catalogue image may illustrate a product family. An image is not evidence of project status or operational condition.
5. Demo scenarios remain explicitly labelled DEMO; their synthetic IDs and values must never be interpreted as PARS actuals.
6. For the next step, establish an explicit Product Family → Product/Model → Project relationship using internal identifiers; do not infer project assignments from the public catalogue.

## Source limitations

The public catalogue is evidence of published product families and published model specifications only. It is not a substitute for internal master data, current product lifecycle status, order book, project/WBS assignments, or operational and financial records.

## Next acceptance gate

Before Step 3 (Product → Project Object Model) is treated as complete, obtain and validate:
- the internal authoritative product-family/product identifiers;
- the rule for products with multiple models or variants;
- the authoritative project identifier and relationship cardinality;
- a source owner and update timestamp for each relationship;
- a rule for unknown/unmapped relationships that does not silently assign a project.
