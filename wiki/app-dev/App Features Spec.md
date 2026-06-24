---
title: App Features Spec
type: app-dev
sources: [raw/brain-v1/FEATURES.md, raw/app-dev-sources/StudyRise-CLAUDE-md-2026-06-24.md]
created: 2026-06-24
updated: 2026-06-25
---

# App Features Spec

Comprehensive feature specification for all three modes. See [[Unified App Architecture]] for system design and [[Component Architecture]] for source tree.

## Exam Mode (app_mode = null / 'exam')

Supports AMC MCQ, PLAB 1, USMLE Step 1, and custom medical-licensing prep.

| Screen | Key features |
|---|---|
| Dashboard | Readiness projection, Go/No-Go indicator |
| Today + DayPlanner | Daily study view, drag-drop blocks, Pomodoro timer |
| Plan | List/timeline/sprint/kanban views, task reflow |
| SR Module | 3-hit spaced repetition (easy/medium/hard/blackout ratings) |
| Questions | Q-bank tracking, first-pass progress, second-pass recommendation |
| Mock Exams | Per-subject breakdown, percentage tracking |
| Analytics | 13+ charts (area, forgetting curves, retention map, heatmap, etc.) |
| Mistakes | Review loop with SR graduation |
| Rapid-Review Sheet | Printable correction_notes grouped by subject |
| Exam Progress Report | 8-section printable report (window.print() = PDF) |
| Settings | Daily schedule, notifications (7 types), exports |
| Admin Panel | 12 screens at admin.studyrise.app |

Additional: AI Study Advisor (OpenAI gpt-4o-mini via serverless proxy), deterministic plan generator, Q-bank import parser, revision planner (final-month engine).

## University Student Mode (app_mode = 'university')

MVP complete across Sessions 1–14.

| Screen | Key features |
|---|---|
| UniDashboard | KPI row, deadline strip, heavy-week radar, unit cards, coach, Wrapped banner |
| UniToday | Classes timeline, focus card, uni DayPlanner, quick add, day log |
| SemesterPlan | List/timeline/kanban, filter bar (unit/category/status/week), drawer |
| Grades | Grade tracker, "What do I need?", what-if simulator, GPA/WAM panel |
| Timetable | Weekly grid (desktop) / day agenda (mobile), attendance, rotation |
| UniAnalytics | 7 charts (3 free / 4 Pro behind full_analytics) |
| GradeReport | Transcript-style printable page (Pro gate) |
| UnitDetail | Per-unit: grades, assessments, classes, attendance, study hours, notes |
| Settings | Term setup, units, grading (6 scales), timetable, LMS sync, notifications, import/export, danger zone |

Additional: LMS iCal import + re-sync (Canvas/Moodle/Blackboard/Brightspace), AI planner (deterministic — demand/draft/review tray), planning fallacy estimator, QuickAdd FAB with NL parsing, Semester Wrapped end-of-term card, SR Lite reminders.

## MBBS Bangladesh Mode (app_mode = 'mbbs')

BMDC 2021 faithful. R3.0 redesign shipped R0–R9. See [[MBBS Bangladesh Module]] for full details.

Key features: curriculum spine, per-class-type attendance, BMDC-seeded onboarding, Continuous Assessment Card, embedded-formative/term/GPA model, two-board oral, IT tracker, field placements, pass-projection recalibration.

## Cross-Module Infrastructure

- Auth/security stack (reCAPTCHA, email verify, rate limit, cookie consent, versioned legal)
- Subscriptions/trials (master switch currently OFF — everything free). See [[Feature Flags Registry]]
- Profiles + avatars
- Dark mode (Exam + USM; MBBS deferred)
- SEO native-HTML homepage (separate from SPA)
- Design system (`src/components/ui/`)

## Data Flow

Each mode has isolated tables with shared auth (`user_settings.app_mode` determines routing). All tables use RLS `auth.uid() = user_id`. See [[Migration & Schema History]] for full schema.
