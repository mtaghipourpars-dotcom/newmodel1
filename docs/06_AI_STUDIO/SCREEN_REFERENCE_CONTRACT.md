# Mandatory UI Reference Contract — `demo/main.png`

## Authority
`demo/main.png` is the primary visual authority for the first screen. It is not merely inspiration. Do not redesign the reference screen into a generic admin template or substitute a model-invented layout.

Reference: [demo/main.png](../../demo/main.png)

## Required preflight
Before implementing or regenerating UI:
1. Open the actual PNG from the repository or attach it directly in Google AI Studio.
2. Record native image width/height, aspect ratio and visible desktop composition.
3. Record the intended comparison viewport. If the reference is a screenshot, match its viewport and device scale as closely as possible.
4. Capture the current implementation at the same viewport.
5. Create a side-by-side comparison; list deviations in macro-layout, RTL alignment, sidebar, header, card dimensions, typography, colors, whitespace, chart/map, icons and density.
6. Only then propose a minimum-change implementation plan.

If the agent cannot access image pixels, stop G1 and request/attach the actual image. A URL, file name, alt text, or prior statement is not proof of visual inspection.

## What must match on the primary viewport
- Page composition, content order and hierarchy.
- Main/sidebar widths and placement, RTL direction, alignment and visual weight.
- Header/hero position, height, typography and treatment.
- Card geometry, spacing, border/radius/shadow, palette and density.
- Charts/maps and status indicators: geometry and hierarchy, not just labels.
- Font scale, line heights, icon size/placement and separators.
- Visible text hierarchy and major labels present in the reference.

No pixel-level match claim is allowed unless the output screenshot has actually been compared. Where exact pixel identity is impossible because fonts/renderers differ, record the concrete difference and obtain human acceptance.

## Responsive contract
Treat responsive layouts as additional states, not a license to change the primary desktop composition. At minimum inspect desktop reference viewport, 1280×800, 1024×768, 768×1024 and 390×844. Record viewport dimensions and overflow checks. If the reference dimensions differ, add that exact size to the matrix.

## Visual acceptance
- Reference file verified and dimensions recorded.
- Same viewport screenshots saved as CI artifacts.
- Manual side-by-side review plus automated screenshot comparison performed.
- Major structural mismatches = fail, even if tests pass.
- Any accepted deviation is documented with reason and approval.
- Each major page gets its own approved visual contract; main.png does not authorize inventing visual designs for other pages. Use the reference design system as the shared baseline and define per-page layouts from repository page contracts.

## Prompt rule
Ask the coding agent to inspect the image and describe concrete regions/measurements before generating JSX/CSS. Reject generic statements such as “modern, beautiful dashboard” without a measured region map.
