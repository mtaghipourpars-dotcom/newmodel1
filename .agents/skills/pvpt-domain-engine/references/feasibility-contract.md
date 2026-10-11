# Feasibility Contract

A result should include:
- result ID, case/scenario/option ID;
- baseline snapshot ID, engine version, policy version, run time and seed;
- status: FEASIBLE, NOT_FEASIBLE, INSUFFICIENT_EVIDENCE, or NO_FEASIBLE_OPTION at case level;
- gate-by-gate status and blocker code;
- affected resource, unit, quantity and time bucket;
- source evidence and confidence/quality;
- displaced feasible commitments/opportunity cost when calculable;
- explanation and next constraint-change/escalation;
- immutable reference to the exact input snapshot.

Do not collapse NOT_FEASIBLE and INSUFFICIENT_EVIDENCE. Unknown capacity cannot prove either feasibility or physical infeasibility; mark evidence insufficient and prevent selection until resolved.
