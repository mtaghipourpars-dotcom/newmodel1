---
name: pvpt-build-orchestrator
description: Use when planning or continuing PVPT implementation in Google AI Studio or another coding agent. Enforces repository discovery, gated prompts, checkpoint recovery, human approval, and evidence-backed completion.
compatibility: Requires access to the PVPT repository and its docs; Google AI Studio Build mode may require explicit prompt inclusion of this skill.
metadata:
  author: PVPT project
  version: "1.0.0"
---

# PVPT Build Orchestrator

## Required workflow
1. Read root `AGENTS.md`, `docs/06_AI_STUDIO/MASTER_PROTOCOL.md`, `IMPLEMENTATION_SEQUENCE.md`, `IMPLEMENTATION_LEDGER.md`, and `SOURCE_INDEX_AND_HISTORY.md`.
2. Identify current branch, commit, uncommitted changes, last passed gate and its evidence.
3. Do not assume prior chat statements are true if repository/test evidence disagrees.
4. Execute only the next unblocked gate. One bounded work package per turn.
5. For implementation, list intended files and tests before editing; preserve existing behavior until replacement passes.
6. Run tests and inspect actual results. Report skipped/unavailable commands honestly.
7. Update ledger with commit, commands, results, screenshots, known limitations and next authorized gate.
8. Stop when a gate fails, a requirement conflicts, the reference image is unavailable, or a human decision is required.

## Completion language
Use distinct states: NOT STARTED, IN PROGRESS, BLOCKED, PASS, FAIL, RETEST REQUIRED. Never call a preview production-ready. Never claim pixel match without same-viewport visual evidence.

## References
- `../../../../docs/06_AI_STUDIO/IMPLEMENTATION_SEQUENCE.md`
- `../../../../docs/06_AI_STUDIO/PROMPT_PACK.md`
- `../../../../docs/06_AI_STUDIO/IMPLEMENTATION_LEDGER.md`
