---
title: Migration & Schema History
type: app-dev
sources: [raw/app-dev-sources/StudyRise-CLAUDE-md-2026-06-24.md]
created: 2026-06-25
updated: 2026-06-25
---

# Migration & Schema History

All migrations are additive and idempotent, run manually in Supabase SQL Editor (no CI runner). One exception: `mbbs_R03_term_unique.sql` (one-time de-dup DELETE).

## Core Schema (supabase/)

| File | Purpose |
|---|---|
| `full_schema.sql` | Complete schema (12+ tables + RLS + triggers) |
| `schema.sql` | Legacy minimal (study_log + sr_records) |
| `phase0_infrastructure.sql` | Infrastructure layer |
| `layer1_plan_engine.sql` | Plan engine |
| `ai_advisor_function.sql` | `get_ai_advisor_data` RPC |
| `app_settings_migration.sql` | App-wide settings (subscription, feature flags) |
| `session1_registration_subscription.sql` | Registration + subscription infra |
| `examos_migration_01.sql` | Topics layer (between subjects and tasks) |
| `customization_migration.sql` | Phases, subjects, tasks, schedules |

## USM Migrations (migrations/)

| File | Session | What it adds |
|---|---|---|
| `usm_001_foundation.sql` | S1 | `app_mode` column + 8 uni tables (terms, units, assessments, classes, attendance, study_sessions, planned_sessions, review_reminders) |
| `usm_002_assessments.sql` | S4 | `assessments.checklist` jsonb |
| `usm_003_timetable.sql` | S5 | `user_settings.rotation_anchor` |
| `usm_004_dashboard.sql` | S7 | `user_settings.checkin_state` jsonb |
| `usm_005_grades.sql` | S10 | `assessments.target_score` numeric |
| `usm_006_ical.sql` | S11 | `user_settings.ical_feeds` jsonb + `assessments.last_lms_change` jsonb |

## MBBS Migrations (migrations/)

| File | Purpose |
|---|---|
| `mbbs_001_foundation.sql` | MBBS foundation tables |
| `mbbs_002_exam_prep.sql` | Exam prep tables |
| `mbbs_003_card_exams.sql` | Card exam tracking |
| `mbbs_005_questions.sql` | Question bank |
| `mbbs_005_terms.sql` | Term structure |
| `mbbs_006_topic_completion.sql` | Topic completion tracking |
| `mbbs_007_viva_bank.sql` | Viva question bank |
| `mbbs_008_question_bank.sql` | Extended question bank |
| `mbbs_009_exam_period.sql` | Exam period config |
| `mbbs_010_holidays.sql` | Holiday calendar |
| `mbbs_R01_card_assessment.sql` | R3.0: card assessment |
| `mbbs_R02_integrated_teaching.sql` | R3.0: integrated teaching |
| `mbbs_R03_term_unique.sql` | R3.0: one-time de-dup (⚠️ destructive) |

## Exam Prep Migrations

| File | Purpose |
|---|---|
| `exam_improvements_001.sql` | Mistake review loop, qbank pool, exam logistics, SR source types |

## Admin / Auth Migrations

| File | Purpose |
|---|---|
| `admin_001_roles.sql` | Admin roles |
| `admin_002_feature_flags.sql` | Feature flag admin |
| `auth_security_001_columns.sql` | Auth security columns |
| `core_feature_flags.sql` | Core feature flag registry (DELETE-cleans stale rows) |

## Key Tables

All tables use RLS with `auth.uid() = user_id`. Key tables:

- **user_settings** — per-user config (exam type, dates, prayer times, qbank pool, etc.)
- **phases / subjects / tasks** — exam study plan structure
- **sr_records** — spaced repetition tracking (3-hit system with ratings)
- **study_log** — daily study status + DayPlanner blocks
- **question_logs / mock_exams / mock_exam_breakdown** — exam practice tracking
- **mistake_logs** — mistake review loop with SR graduation

See the StudyRise CLAUDE.md raw source for full column-level schema.

## Related Pages

- [[Unified App Architecture]] — overall system design
- [[MBBS Data Model]] — MBBS-specific schema details
