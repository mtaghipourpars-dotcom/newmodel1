---
name: pvpt-reference-ui
description: Use when inspecting, rebuilding, styling, or validating PVPT pages, especially the required first-screen match to demo/main.png and Persian RTL responsive layout.
compatibility: Requires actual image access and browser screenshot capability for visual-match claims.
metadata:
  author: PVPT project
  version: "1.0.0"
---

# PVPT Reference UI Skill

## Non-negotiable process
1. Read `docs/06_AI_STUDIO/SCREEN_REFERENCE_CONTRACT.md` and the relevant page contract.
2. Open `demo/main.png` as pixels. If inaccessible, stop; do not infer its design from its name or prose.
3. Record image dimensions and target viewport. Capture the current page at the same viewport.
4. Describe visible regions and their relative dimensions before coding.
5. Make a small, targeted change; preserve text hierarchy, page composition, RTL alignment, spacing, card geometry, palette and chart treatment.
6. Capture a new screenshot at the same viewport. Compare side by side and, where available, run screenshot-diff tooling.
7. Test additional responsive viewports separately. Check overflow, clipped text, keyboard focus and touch usability.
8. Record remaining mismatches; do not claim “exact match” if a material mismatch remains.

## Design rules
- Persian-first and RTL, with explicit LTR handling for codes, IDs, URLs and numeric values where appropriate.
- Prefer the supplied reference over generic dashboard conventions or newly invented visual patterns.
- Preserve all required page information while using progressive disclosure for detail.
- Every visible control must work or clearly explain why it is disabled.
- Do not fabricate chart data to fill visual space. Empty-state styling must respect the design reference without inventing facts.

## Reference
See `docs/06_AI_STUDIO/SCREEN_REFERENCE_CONTRACT.md`.
