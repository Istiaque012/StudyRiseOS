---
title: MBBS Decisions Log
type: app-dev
sources: [raw/brain-v1/05_MBBS_DECISIONS.md]
created: 2026-06-24
updated: 2026-06-24
---

# MBBS Decisions Log

Binding decisions. No session re-litigates these.

| # | Decision | Key Detail |
|---|---|---|
| R1 | Single canonical BMDC constant | `mbbsBmdcCurriculum.js`, not a DB table |
| R2 | Honours = 75% | Not 85% — per BMDC Table 13 |
| R3 | Worst-category attendance gate | Fail any class type → fail gate |
| R4 | Onboarding pre-loads real BMDC cards | 193 items at QA |
| R5 | Digital twin of paper card | Exact mirror, no embellishments |
| R6 | Formative embedded 10% | Not separate — part of total |
| R7 | Two-board oral | Board topics defined per subject |
| R8 | Phase-1 full lockout | Must pass before Phase 2 starts |
| R9 | Integrated teaching read-only signal | Display only, no user input |
| R10 | Field placements distinct type | Not mixed with regular attendance |
| R11 | Projection recalibration | Based on actual mark distribution |
| R12 | Clinical deferred | Not in R3.0 scope |
| R13 | Internship three BMDC time rules | 1-mo join, UHC, 2-yr window |

These are append-only. To change a decision, add a superseding entry — never overwrite.
