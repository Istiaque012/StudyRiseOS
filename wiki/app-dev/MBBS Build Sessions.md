---
title: MBBS Build Sessions
type: app-dev
sources: [raw/brain-v1/06_MBBS_BUILD_SESSIONS.md]
created: 2026-06-24
updated: 2026-06-24
---

# MBBS Build Sessions

Self-contained Claude Code build prompts R0–R9 in dependency order.

## Standing Protocol (every session)
- No hardcoded hex — use tokens
- Use animations.js registry
- 375px mobile floor
- Nullable migrations only

## Sessions
| Session | What It Builds | Dependencies |
|---|---|---|
| R0 | BMDC curriculum constants | None |
| R1 | Honours/GPA/lockout/12yr fixes | R0 |
| R2 | Per-class-type attendance | R0 |
| R3 | BMDC-seeded onboarding | R0, R1 |
| R4 | Continuous Assessment Card view | R0, R1, R3 |
| R5 | Embedded formative + term gates | R0, R4 |
| R6 | Two-board oral | R0, R5 |
| R7 | Integrated teaching tracker | R0, mbbs_R02 migration |
| R8 | Field placements + Phase-1 branch | R0, R7 |
| R9 | Projection recalibration | R0–R8 |

## Close-Out Protocol
Each session ends with: build verification, QA, CLAUDE.md update, [[MBBS Build Log]] append, commit, deploy.
