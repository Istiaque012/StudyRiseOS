---
title: MBBS Current State
type: app-dev
sources: [raw/brain-v1/03_MBBS_CURRENT_STATE.md]
created: 2026-06-24
updated: 2026-06-24
---

# MBBS Current State

What is deployed on main after v2.0 (Sessions 0–14).

## Tag System
Every shipped component tagged:
- **KEEP** — works correctly, no changes needed
- **CHANGE** — works but needs R3.0 updates
- **NEW** — doesn't exist yet, R3.0 will add
- **GONE** — will be removed in R3.0

## Shipped Components
- Foundation: routing, mode detection, constants ✓
- Onboarding ✓ (needs CHANGE for BMDC-seeded cards)
- Gate engine + dashboard ✓
- Items/cards/attendance/formatives ✓
- Timetable and today view ✓
- Spaced repetition ✓
- Exam events ✓
- Question banks ✓
- Supplementary screen ✓

## Database
Migrations mbbs_001–010 deployed. Do-not-recreate list maintained.
Key tables: mbbs_subjects, mbbs_cards, mbbs_items, mbbs_attendance, mbbs_formatives.

## Related
[[MBBS Data Model]], [[MBBS Build Log]], [[MBBS Bangladesh Module]]
