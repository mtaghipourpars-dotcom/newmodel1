# Provenance Contract

Required classification: `PUBLIC_VERIFIED | INTERNAL_VERIFIED | USER_APPROVED_ASSUMPTION | DEMO_SYNTHETIC | UNKNOWN`.

For decision-relevant facts store where applicable: source system, source reference/record ID, accountable owner, observed/as-of time, valid interval, confidence, quality status, snapshot ID, reviewer and promotion history.

Do not use a single generic source label to hide differences between raw source, transformation, calculation and approval. Derived values should preserve calculation version, inputs, units and source references.

Null means unavailable/not supplied; it is not equivalent to numeric zero. A calculated zero is allowed only when sufficient evidence proves zero.
