---
title: MBBS Data Model
type: app-dev
sources: [raw/brain-v1/04_MBBS_DATA_MODEL.md]
created: 2026-06-24
updated: 2026-06-24
---

# MBBS Data Model

## v2.0 Deployed Tables (do-not-recreate)
mbbs_subjects, mbbs_cards, mbbs_items, mbbs_attendance, mbbs_formatives, mbbs_prof_schedule. Migrations mbbs_001–010.

## R3.0 Additive-Only Deltas
- **mbbs_R01** — card assessment nullable columns
- **mbbs_R02** — integrated teaching table (mbbs_it_sessions)
- **mbbs_R03** — term unique constraint + de-duplication
- **R04–R08** — deferred (clinical/internship)

## Migration Rules
1. Additive + idempotent only — never drop columns
2. New columns must be nullable
3. RLS: owner-only on all tables
4. Graceful degradation on missing columns (42703/PGRST204 errors)

## mbbs_config JSON
Per-user configuration stored as JSON. Shape defined post-R3.0.

## Key Decision
BMDC curriculum lives as a client-side constant (`mbbsBmdcCurriculum.js`), NOT a database table. See [[MBBS Decisions Log]] R1.
