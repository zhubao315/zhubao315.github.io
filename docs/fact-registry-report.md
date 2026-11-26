# Fact Registry Report

- Generated: 2026-11-26T10:52:00Z
- Last verified: 2026-11-26
- Schema: `schemas/portfolio-facts.schema.json` (valid)
- Facts: 16 (2 derived)
- Conflicts: 0

## Derived values
- total_sessions = 8196 (running_sessions + cycling_sessions + hiking_sessions), as of 2026-11-26
- total_km = 72903 (running_km + cycling_km + hiking_km), as of 2026-11-26

## Rules

- API facts must equal `src/data/generated/github-stats.json`; never recompute non-Fork from `original + modified`.
- Derived facts must carry `derived_from` and `as_of`.
- Every displayed snapshot must carry a verification date; manual edits require evidence.
