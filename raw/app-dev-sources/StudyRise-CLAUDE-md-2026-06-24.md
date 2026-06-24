<!-- ============================================================ -->
<!-- CURRENT STATE — living snapshot. OVERWRITE this block in place. -->
<!-- This is the single source of "what is true today." NOT append-only. -->
<!-- Everything below the divider is the durable reference + append-only build log. -->
<!-- Last updated: 2026-06-20 -->
<!-- ============================================================ -->

## Current State (overwrite in place)

**Three app modes, lazy-chunk isolated (Exam is sacred):**
- **Exam Mode** (app_mode=`null`/`'exam'`) — AMC MCQ / PLAB 1 / USMLE Step 1 / custom medical-licensing prep. Complete: Dashboard (readiness projection + Go/No-Go), Today + DayPlanner, Plan (list/timeline/sprint), unified SR queue, Questions, Mock Exams, Analytics (13+ charts), Mistakes, Rapid-Review Sheet, Exam Progress Report.
- **University Student Mode** (app_mode=`'university'`) — terms/units/assessments/classes/grades. MVP complete (Sessions 1–14): UniDashboard, UniToday cockpit, SemesterPlan, grade engine, Timetable, UniAnalytics, deterministic AI planner, LMS iCal import + re-sync, exports, Semester Wrapped.
- **MBBS Bangladesh** (app_mode=`'mbbs_bd'`→`'mbbs'`, BMDC 2021) — items/cards/attendance/formatives/prof-eligibility. R3.0 BMDC-faithful redesign R0–R9 shipped (curriculum spine, per-class-type attendance, BMDC-seeded onboarding, Continuous Assessment Card, embedded-formative/term/GPA model, two-board oral, IT tracker, field placements, pass-projection recalibration).

**Shipped & stable:** all three modes' core screens · `mbbsBmdcCurriculum.js` BMDC spine + `eligibility.js` engine · `app_feature_flags` registry (ethical-floor rows locked free in code + DB trigger) · standalone admin app (12 screens) · subscriptions/trials infra · auth/security stack (versioned legal + consent audit, password UX, reset flow, reCAPTCHA, phone OTP mock-mode, email verification, failed-login rate limit, cookie consent) · profiles + avatars · dark mode (Exam/USM) · SEO native-HTML homepage.

**Actively changing now:** documentation reconciliation (this 2026-06-20 doc-accuracy pass; `docs/_audit/`) · brand/logo identity rollout (`/assets/brand/` paths, brand-voice + tagline system) · MBBS R3.0 just landed R0–R9 on `main`.

**Deferred / parked:** MBBS R10+ pillar — clinical posting cards + privacy/case log + OSPE + resources + internship (`mbbs_R04…R08`, all flag-gated) · payments bKash/Nagad (+ Stripe), blocked on pricing (UpgradeModal shows "coming soon") · remaining Auth/Security session deliverables · USM dark-mode pass · server-side notification cron + native push (FCM/APNs) · hosted outbound iCal feed URL · Canvas REST grades sync-back · syllabus-PDF AI parsing · OTP Twilio swap (mock mode now) · admin panel pagination · 2FA authenticator apps.

**Infra one-liners:** React 18 + Vite · Tailwind CSS-var tokens (no hardcoded hex) · Supabase (RLS owner-only) · two Vercel projects from a single `main` (studyrise + studyrise-admin) · migrations additive + idempotent, run manually in the Supabase SQL Editor (no CI runner; the one exception is `mbbs_R03_term_unique.sql` — a one-time de-dup DELETE) · `subscription_activated` master switch OFF (everything free) · feature registry in `app_feature_flags`.

**Admin:** ias.ndc@gmail.com = `super_admin`, always-Pro · 12 admin screens at admin.studyrise.app (Dashboard/Users/Subscriptions/FeatureFlags/Announcements/QuestionBankAdmin/VivaAdmin/HolidayAdmin/Security + Login/AccessDenied/Layout).

**Known gaps / watch:**
- **Flags (2026-06-20):** the analytics pass-projection gate is `mbbs.pass_projection`; `mbbs.analytics_full` has **no live consumer** (reserved). `MbbsMistakes.jsx` was deleted in Redesign S0 → `mbbs.mistakes_full` has **no current consumer** (reserved). `mbbs.mocks` / `mbbs.mistakes` / `mbbs.viva` rows are DELETE-cleaned in `core_feature_flags.sql`.
- **Admin auth-security toggles:** `studyrise-admin/src/screens/Security.jsx` is built + routed with `get_auth_security`/`update_auth_security` endpoints (shipped-but-unlogged — predates a logged session); older Auth/Security "admin toggle never built" notes are stale for this screen. Other Auth/Security session deliverables remain pending.
- **MBBS curriculum facts** must be verified with the user before publishing (BMDC mark tables / card-item lists transcribed in R0).
- **Orphan files** (on disk, not wired — documented, not deleted): `src/screens/LandingPage.jsx`, `src/screens/Onboarding/AIPlanChat.jsx`, `src/screens/Onboarding/PlanPreview.jsx`.

<!-- ============================================================ -->
<!-- END CURRENT STATE — durable reference + append-only build log follows -->
<!-- ============================================================ -->

# AMC Study Tracker — Project Intelligence

**Production:** https://studyrise.app | **branch:** `main` (single branch — `emp`, `USM`, and `mbbs` all merged; all branches consolidated 2026-06-15)
**Admin panel:** standalone app at `studyrise-admin/` → https://admin.studyrise.app | Vercel project must point to `main` branch, root dir `studyrise-admin/` | **Admin:** ias.ndc@gmail.com

## Deployment Architecture (Summary)

> **For full details, read [`docs/deployment/deployment-architecture.md`](docs/deployment/deployment-architecture.md) before changing Vercel settings, domains, env vars, deployment commands, root directories, or admin app configuration.**

| App | URL | Vercel Project | Repo Root |
|---|---|---|---|
| Main student app | https://studyrise.app | `studyrise` | `/` (repo root) |
| Admin panel | https://admin.studyrise.app | `studyrise-admin` | `studyrise-admin/` |

- **One GitHub repo, one branch (`main`), two Vercel projects.** Pushing to `main` triggers both simultaneously.
- Each Vercel project has its own `vercel.json`, `package.json`, and env vars — they are fully isolated.
- The admin Vercel cloud project has `Root Directory: studyrise-admin` set in the cloud. Do not change this.
- **Secrets must never use the `VITE_` prefix.** Any `VITE_*` variable is bundled into client JS and visible in the browser. `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `RECAPTCHA_SECRET_KEY`, and `OTP_HASH_SALT` must remain server-only (no `VITE_` prefix).

### Admin deploy command (must be run from repo root)

```bash
VERCEL_PROJECT_ID=prj_IDGEh1AkamPQhb654NdaDHXyrBc6 \
VERCEL_ORG_ID=team_V8AGP149vmOLOfxBVLXUf6a4 \
npx vercel --prod --yes
```

Do NOT run `npx vercel --prod` from repo root without these IDs (deploys the main app instead). Do NOT run from inside `studyrise-admin/` (the cloud `rootDirectory` setting causes a double-nesting build failure).

### Main app deploy command

```bash
npx vercel --prod --yes    # run from repo root; reads /.vercel/project.json automatically
```

## Test Account

| Field | Value |
|---|---|
| Email | test@gmail.com |
| Password | Asd123-. |
| Mode | University (USM) |
| Grade scale | gpa7_wam (Australian WAM) |
| Term | Semester 1 2026 (Feb 24 – Jun 28) |
| Student name | Alex Chen |

**Units:** ANAT2201 Human Anatomy · PHYS2202 Physiology · BIOC2203 Biochemistry · CLIN2101 Clinical Skills · PATH2301 Pathology Foundations

**Current state (as of 2026-06-13):** Week 16 / exam study week. Most assessments graded; 3 final exams upcoming (BIOC Jun 17, ANAT Jun 18, PHYS Jun 20, PATH Jun 25). Running averages: PHYS 80.6% · CLIN 76.7% · PATH 73.3% · ANAT 68.2% · BIOC 65.4%.

Seed script: `scripts/seed-test-user.mjs` — run `node scripts/seed-test-user.mjs` to reset all mock data.

## BBA Test Account (USM — all features)

| Field | Value |
|---|---|
| Email | testbba@gmail.com |
| Password | testbba |
| Mode | University (USM) |
| Grade scale | gpa4 (US GPA system) |
| Term | Semester 1 2026 (Feb 24 – Jun 28) |
| Student name | Jamie Morgan |
| Program | Bachelor of Business Administration, Year 2 |

**Units:** MKTG1101 Marketing Fundamentals · ACCT1201 Financial Accounting · BSTA2301 Business Statistics · MGMT2101 Organisational Behaviour · ECON1101 Principles of Economics

**Current state (as of 2026-06-13):** Week 16 / exam period. All mid-term assessments graded; 5 final exams upcoming. Running averages: MGMT ~85% (A) · MKTG ~81% (B+) · BSTA ~72% (B-) · ECON ~66% (B-) · ACCT ~59% (C) — student struggling in Accounting.

**Unique features seeded (vs test@gmail.com):**
- `gpa4` scale display (B+/A/C/B- GPA bands)
- `planning_control: 'auto'` — PlannerTray auto-accepts AI planner sessions
- Full SR for ACCT1201: 3 sr_records (SR3 overdue · SR2 overdue · SR1 due today)
- SR Lite reminders for MKTG/MGMT/ECON (due/overdue/future/done states)
- iCal Canvas feed in settings (tests LMS Sync tab)
- `last_lms_change` on MKTG Final Exam → "Updated by your LMS" drawer badge
- Late submission with penalty note (ECON Problem Set 2, is_late: true)
- Group assessment with `group_members` (MGMT Group Org Design Report)
- Online Zoom tutorial (BSTA Fri — `location_is_url: true`)
- `word_count` on essays and reports
- `target_score` on all 5 final exams (what-if simulator pre-fill)
- `checkin_state`: week3 = slightly_behind, week6 = on_track (both answered)
- `support_services_url` set (tests struggling check-in branch)
- Planned sessions with ALL 5 statuses: done · accepted · moved (user_locked) · proposed · rejected
- ACCT1201 hurdle Final Exam
- Varied attendance: ACCT ~68% vs other units ~86%

Seed script: `scripts/seed-test-bba-user.mjs` — run `node scripts/seed-test-bba-user.mjs` to reset.

## What This Project Is

A comprehensive study tracker for medical licensing exams (AMC MCQ, PLAB 1, USMLE Step 1, and custom). Supports multi-exam onboarding, manages study plans across 3 phases, tracks spaced repetition (SR) reviews using Ebbinghaus forgetting curves, generates smart daily schedules with Pomodoro timers, and provides analytics dashboards with AI-powered study advice. Includes an admin panel for user management.

## Tech Stack

- **Frontend**: React 18.3, React Router 6.30, Vite 5.4
- **Styling**: Tailwind CSS 3.4, inline styles (no CSS modules)
- **Charts**: Recharts 2.15
- **Icons**: Lucide React 0.511
- **Dates**: date-fns 3.6
- **Backend/DB**: Supabase (PostgreSQL + Auth + RLS)
- **AI**: OpenAI gpt-4o-mini via Vercel serverless proxy
- **Hosting**: Vercel (static SPA + /api serverless functions)
- **Audio**: Web Audio API (programmatic oscillator-based chimes)
- **Persistence**: Supabase for all data, localStorage for timer state and AI cache

## Project Structure

```
AMC Tracker/
├── .env.local                          # Environment variables
├── .gitignore
├── app.html                            # Vite entry HTML (renamed from index.html 2026-06-19 — see SEO note below)
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite config (react plugin)
├── tailwind.config.js                  # Tailwind config (extended with design tokens)
├── postcss.config.js                   # PostCSS (tailwind + autoprefixer)
├── eslint.config.js                    # ESLint config
├── migrations/
│   ├── usm_001_foundation.sql          # USM foundation: app_mode + 8 uni tables (run manually in Supabase)
│   ├── usm_002_assessments.sql         # USM Session 4: assessments.checklist jsonb column
│   ├── usm_003_timetable.sql           # USM Session 5: user_settings.rotation_anchor ('a_first'|'b_first')
│   ├── usm_004_dashboard.sql           # USM Session 7: user_settings.checkin_state jsonb (check-in card dismissals)
│   ├── usm_005_grades.sql              # USM Session 10: assessments.target_score numeric (what-if "Set as my targets")
│   ├── usm_006_ical.sql                # USM Session 11: user_settings.ical_feeds jsonb + assessments.last_lms_change jsonb
│   └── exam_improvements_001.sql       # EMP Session 3: mistake review loop (mistake_logs.next_review/review_count/resolved/last_rating) + columns reserved for later EMP sessions (question_logs.confidence/attempt_type, user_settings.qbank_pool/work_schedule/exam_logistics/target_seconds_per_question/checkin_state, sr_records.source_type/source_id/topic_label) — run manually in Supabase SQL editor; EMP Session 9 added `user_settings.checkin_state jsonb` (onboarding banner + sprint state — re-run, idempotent)
├── api/
│   ├── ai-advisor.js                   # Vercel serverless: OpenAI proxy
│   ├── admin.js                        # Vercel serverless: admin user management (service role key)
│   └── ical-fetch.js                   # USM Session 11: iCal feed CORS proxy (auth required, SSRF guard, 15s timeout, 2MB cap)
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.jsx                        # React entry point (BrowserRouter)
│   ├── App.jsx                         # Root component (auth, routing, data fetching)
│   ├── App.css                         # Unused legacy CSS
│   ├── index.css                       # Base CSS imports
│   ├── styles/
│   │   ├── globals.css                 # Tailwind directives + base reset + dark mode Tailwind overrides
│   │   └── tokens.css                  # ALL CSS custom properties (colors, shadows, radii, fonts) + :root.dark block
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── contexts/
│   │   └── TimerContext.jsx            # Global Pomodoro timer state
│   ├── screens/
│   │   ├── Auth.jsx                    # Login / Register
│   │   ├── Dashboard.jsx               # Main dashboard
│   │   ├── Today.jsx                   # Daily study view + DayPlanner
│   │   ├── Plan.jsx                    # Study plan task list
│   │   ├── SRModule.jsx                # Spaced repetition module
│   │   ├── Analytics.jsx               # Charts and analytics
│   │   ├── ReviewSheet.jsx             # EMP Session 13: /review-sheet — printable Rapid-Review Sheet (correction_notes grouped by subject, scoped print CSS, window.print())
│   │   ├── ExamReport.jsx              # EMP Session 18: /report — printable progress report (8 sections: overview/readiness/subjects/mocks/qbank/weak-areas/consistency; @media print forces light + hides chrome; window.print() = PDF; FREE)
│   │   ├── Settings.jsx                # All settings tabs
│   │   ├── Admin/
│   │   │   └── AdminPanel.jsx          # User management (ias.ndc@gmail.com only)
│   │   ├── uni/
│   │   │   ├── UniPlaceholder.jsx      # DEAD since Session 14 (every uni route is real) — kept on disk, not imported anywhere
│   │   │   ├── SemesterPlan.jsx        # USM Session 8: full semester command view — list/timeline/kanban, filter bar, drawer, navigate-state contract
│   │   │   ├── Timetable.jsx           # USM Session 5: weekly grid (desktop) / day agenda (mobile), week nav, attendance
│   │   │   ├── UniToday.jsx            # USM Session 6: daily cockpit — classes timeline, focus card, uni DayPlanner, quick add, day log
│   │   │   ├── UniDashboard.jsx        # USM Session 7: semester at a glance — KPI row, deadline strip, heavy-week radar card, unit cards, coach; S14: Wrapped banner when term over
│   │   │   ├── Grades.jsx              # USM Session 9+10: grade tracker, "What do I need?", what-if simulator, GPA/WAM panel — all four §2.5 sections
│   │   │   ├── UniAnalytics.jsx        # USM Session 14: 7-chart analytics suite (3 free / 4 Pro behind full_analytics) — see "Uni analytics chart map"
│   │   │   ├── GradeReport.jsx         # USM Session 14: /grades/report — transcript-style print page (window.print() = the PDF; Pro gate grades_pdf)
│   │   │   └── UnitDetail.jsx          # USM Session 10: one unit's full picture — grade progress, assessments, classes+attendance dots, study hours chart, notes
│   │   └── Onboarding/
│   │       ├── OnboardingFlow.jsx      # 4-step state machine + progress bar
│   │       ├── OnboardingShell.jsx     # Reusable exam/USM wizard frame (step/totalSteps/brandLabel/progressHint; BrandBar + GlassCard + footer actions)
│   │       ├── OnboardingExamPicker.jsx # Step 1: exam selection
│   │       ├── OnboardingDates.jsx     # Step 2: exam/start dates, hours, days/week
│   │       ├── OnboardingPlanMethod.jsx # Step 3: template / AI import / manual
│   │       ├── ModeSelect.jsx          # USM Session 2: Step 0 mode fork (Exam Prep / University) for all new users
│   │       ├── UniOnboarding.jsx       # USM Session 2: real 6-step university wizard (shell + save routine)
│   │       ├── uni/                    # USM Session 2: uni wizard step components
│   │       │   ├── wizardUi.jsx        # Shared style helpers + FocusInput/FocusSelect/Chip
│   │       │   ├── UniStepTerm.jsx     # Step 1: term type/name/dates + optional break/study/exam ranges
│   │       │   ├── UniStepTerminology.jsx # Step 2: subject term + grade scale + week start
│   │       │   ├── UniStepUnits.jsx    # Step 3: fast-entry unit list (12-color picker, soft cap 5)
│   │       │   ├── UniStepDeadlines.jsx # Step 4: import (stub) / manual assessments — skippable
│   │       │   ├── UniStepWeek.jsx     # Step 5: classes quick entry + daily hours + rest day
│   │       │   └── UniStepValue.jsx    # Step 6: moment of value + Open my dashboard
│   │       └── OnboardingPreview.jsx   # Step 4: plan preview + save + complete
│   ├── components/
│   │   ├── AIAdvisor/
│   │   │   └── AIAdvisor.jsx           # AI study advisor card
│   │   ├── Charts/
│   │   │   ├── EMediciAreaChart.jsx     # Cumulative questions chart
│   │   │   ├── ForgettingCurves.jsx    # Ebbinghaus retention curves
│   │   │   ├── RetentionMap.jsx        # Subject retention heatmap grid
│   │   │   ├── SRDonut.jsx             # SR compliance donut chart
│   │   │   ├── SRTimeline.jsx          # Gantt-style SR timeline
│   │   │   └── StudyHeatmap.jsx        # GitHub-style activity heatmap
│   │   ├── Common/                     # Legacy components (kept for Modal, used by SR/AI)
│   │   │   ├── Badge.jsx               # Old badge (still used by SRSubjectCard)
│   │   │   ├── Button.jsx              # Old button (still used by SRSubjectCard, AIAdvisor)
│   │   │   ├── Card.jsx                # Old card (still used by SRSubjectCard, AIAdvisor)
│   │   │   ├── LoadingSpinner.jsx      # Fullscreen loading spinner
│   │   │   ├── Modal.jsx               # Dialog modal with backdrop (used everywhere)
│   │   │   └── ProgressBar.jsx         # Old progress bar
│   │   ├── ui/                         # Design system components
│   │   │   ├── index.js                # Barrel export
│   │   │   ├── Card2.jsx               # Card (variant: default/flat/highlight, padding)
│   │   │   ├── Button2.jsx             # Button (variant: primary/secondary/ghost/danger/success/amber)
│   │   │   ├── Badge2.jsx              # Badge (variant: gray/green/amber/red/blue/purple/navy/outline)
│   │   │   ├── Bar.jsx                 # Progress bar (value/max, color, size) — color defaults to var(--navy)
│   │   │   ├── Ring.jsx                # SVG circular progress ring
│   │   │   ├── Tabs2.jsx               # Pill-style segmented tabs
│   │   │   ├── Toggle.jsx              # On/off switch
│   │   │   ├── Field.jsx               # Form field with label
│   │   │   ├── KPITile.jsx             # Metric tile (label/value/sub/icon/color) — value at 32px
│   │   │   ├── SectionHeader.jsx       # Uppercase section title + optional action
│   │   │   ├── SectionHd.jsx           # Lightweight section header (used in screens directly)
│   │   │   ├── Card.jsx                # Simple white card (bg-white border rounded-[16px] shadow-sm)
│   │   │   ├── Badge.jsx               # Pill badge (green/amber/red/blue/purple/navy/outline)
│   │   │   ├── Button.jsx              # Simple button (primary/secondary/ghost variants)
│   │   │   ├── EmptyState.jsx          # Placeholder for empty sections
│   │   │   └── LoadingState.jsx        # Spinner + optional message
│   │   ├── uni/
│   │   │   ├── IcalImportPanel.jsx     # USM Session 11 FULL: 3-step iCal import (URL+detect → course/unit preview → summary); parent persists via onImported
│   │   │   ├── AssessmentDrawer.jsx    # USM Session 4: full assessment editor drawer (status flow, extension, checklist; S8: focusGrade prop; S12: PlanningFallacyChip + "Plan study sessions" → embedded PlannerTray)
│   │   │   ├── PlannerTray.jsx         # USM Session 12: AI planner review tray — proposal cards (label/time/reason), Accept/Move/Resize/Reject, Replan my week, autodraft, self-fetching
│   │   │   ├── PlanningFallacyChip.jsx # USM Session 12: estimated-hours nudge (learned multiplier / 1.5× research default; tap applies, never silent)
│   │   │   ├── AddAssessmentModal.jsx  # USM Session 4: slim add modal + weekly recurring series with break-skipping preview
│   │   │   ├── ClassFormModal.jsx      # USM Session 5: shared add/edit class modal (Settings tab + Timetable screen)
│   │   │   ├── SemesterListView.jsx    # USM Session 8: list view grouped by unit, completed collapsed per group (+ exported AssessmentRow)
│   │   │   ├── SemesterTimeline.jsx    # USM Session 8: weeks-axis timeline — unit lanes, weight-tier dots, heavy-week glow, today line, zoom
│   │   │   ├── SemesterKanban.jsx      # USM Session 8: status kanban (Pro) — dnd-kit drag, submission moment, backwards-move confirm
│   │   │   ├── SemesterFilterBar.jsx   # USM Session 8: composable filter chips (unit/category/status/week range) + applyFilters/EMPTY_FILTERS
│   │   │   ├── ProGate.jsx             # USM Session 8: Pro feature wrapper — canUse() stub; locked = blurred preview + pitch card
│   │   │   ├── QuickAddFab.jsx         # USM Session 8: global uni FAB — NL quick add with editable confirm chips; S10: pre-fills unit on /semester/unit/:id
│   │   │   ├── WhatDoINeedCard.jsx     # USM Session 10: §2.5 B calculator extracted from Grades.jsx — presetUnitId + compact props (UnitDetail embed)
│   │   │   ├── WhatIfSimulator.jsx     # USM Session 10: §2.5 C sliders on ungraded items, live projected final — ephemeral; only target_score persists
│   │   │   ├── GpaPanel.jsx            # USM Session 10: §2.5 D cumulative GPA/WAM across terms (own all-units/all-assessments fetch, ProGate multi_term_gpa)
│   │   │   └── SemesterWrapped.jsx     # USM Session 14: end-of-term full-screen card (Part 5) — hours/completed/average/busiest week/attendance, save-as-image; Dashboard banner + Term Setup preview
│   │   ├── Settings/uni/               # USM Session 3: university Settings tabs (all self-fetching via USM hooks)
│   │   │   ├── uniShared.jsx           # Chip, ColorDotPicker (used-colors marked), shared TermFormFields + term form helpers
│   │   │   ├── TermSetupTab.jsx        # Active term editor, archived list + reactivate, "Start a new term" modal
│   │   │   ├── UnitsTab.jsx            # Unit card grid + add/edit modal (all §1.2 fields) + cascade-count delete
│   │   │   ├── GradingTab.jsx          # subject_term / grade_scale / week_start / date_format chip pickers (save-on-tap); S12: support_services_url field (save on blur)
│   │   │   ├── PlanningControlCard.jsx # USM Session 12: planning_control dial (Full Auto / Suggest / Manual) — mounted above DailyScheduleSettings in the uni Daily Routine tab
│   │   │   ├── TimetableTab.jsx        # USM Session 5: class CRUD list grouped by day + rotation anchor control
│   │   │   ├── LmsSyncTab.jsx          # USM Session 11: feed list + Sync now (silent/propose/conflict/missing) + import panel host
│   │   │   ├── NotificationsTab.jsx    # USM Session 14: master/per-type toggles, quiet hours, permission request, 5/day cap note (prefs in localStorage)
│   │   │   ├── UniPlaceholderTab.jsx   # DEAD since Session 14 — kept on disk, not imported anywhere
│   │   │   ├── UniImportExportTab.jsx  # USM Session 14 FULL: JSON/CSV/timetable-PNG exports (free) + .ics + PDF report links (Pro)
│   │   │   └── UniDangerZoneTab.jsx    # Delete active term (type term name to confirm) + shared account DangerZoneTab
│   │   ├── DayPlanner/
│   │   │   ├── DayPlanner.jsx          # Smart day planner with drag-and-drop
│   │   │   └── blockGenerator.js       # Block generation algorithm
│   │   ├── Layout/
│   │   │   ├── Layout.jsx              # Main layout wrapper
│   │   │   ├── Sidebar.jsx             # Navigation sidebar + mini timer
│   │   │   └── TopBar.jsx              # Top bar (unused/minimal)
│   │   ├── SR/
│   │   │   ├── SRModal.jsx             # SR review modal (rating + questions)
│   │   │   └── SRSubjectCard.jsx       # Subject SR status card
│   │   ├── Settings/
│   │   │   ├── DailyScheduleSettings.jsx # Prayer times + CD Path + Gym settings
│   │   │   └── ExamNotificationsTab.jsx  # EMP Session 11: exam-mode Notifications settings tab (7 types, quiet hours, permission, in-app fallback)
│   │   ├── today/
│   │   │   └── TaskChecklist.jsx       # Per-task step checklist with progress bar, inline edit, reorder
│   │   └── Timer/
│   │       └── PomodoroTimer.jsx       # Circular Pomodoro timer
│   ├── hooks/
│   │   ├── useAuth.js                  # Supabase auth state
│   │   ├── useAssessments.js           # USM: CRUD for assessments + recurring series, scoped updates, extensions, checklist (S4)
│   │   ├── useAttendance.js            # USM: attendance_log upserts + attendancePctByUnit selector
│   │   ├── useClasses.js               # USM: CRUD for classes (timetable, day_of_week 0=Mon)
│   │   ├── useStudySessions.js         # USM: study_sessions CRUD + minutesThisWeek selector
│   │   ├── usePlannedSessions.js       # USM Session 12: planned_sessions CRUD — accept/move(+lock)/resize(+lock)/reject/markDone + replaceProposals (deletes only unlocked proposed rows)
│   │   ├── useTerminology.js           # USM: subject_term → {singular, plural, add} labels
│   │   ├── useTerms.js                 # USM: terms CRUD, activeTerm, activate/archive
│   │   ├── useUnits.js                 # USM: units CRUD scoped by term_id + canAddUnit/nextUnitColor
│   │   ├── useSemesterView.js          # USM Session 8: 'list'|'timeline'|'kanban' persisted to localStorage:studyrise:semester:view
│   │   ├── useDailySchedule.js         # Derives daily commitments from settings
│   │   ├── useMistakeLogs.js           # CRUD for mistake_logs table
│   │   ├── useMockExams.js             # CRUD for mock_exams table
│   │   ├── usePhases.js                # CRUD for phases table
│   │   ├── useQuestionLogs.js          # CRUD for question_logs table
│   │   ├── useSRRecords.js             # CRUD for sr_records table
│   │   ├── useScheduleTemplates.js     # CRUD for schedule_templates + assignments
│   │   ├── useStudyLog.js              # CRUD for study_log table
│   │   ├── useSubjects.js              # CRUD for subjects table (auto-generates tasks)
│   │   ├── useTaskSteps.js             # Exports DEFAULT_STEPS (seed checklist templates — consumed by lib/services/TaskService) + a userId-scoped useTaskSteps() hook (the hook fn itself is currently unused; DEFAULT_STEPS is the live export). The active per-task steps hook is useStepsForTask.js (below)
│   │   ├── useTasks.js                 # CRUD for tasks table
│   │   ├── useStepsForTask.js          # CRUD for task_steps scoped to ONE task id (toggle/add/edit/delete/reorder/move) — the ACTIVE per-task steps hook (TaskDrawer, TaskDetailDrawer, TaskChecklist)
│   │   ├── useTaskActions.js           # Task add/reflow actions via lib/services/TaskService + scheduler.reflowTasks
│   │   ├── useTopics.js                # CRUD for the topics table (examos_migration_01.sql — between subjects and tasks)
│   │   ├── useSchedules.js             # CRUD for schedule rows (own fetch by user_id)
│   │   ├── useRealtimeRefetch.js       # Subscribes to Supabase Realtime on a table for the user; calls refetch on INSERT/UPDATE/DELETE (no-ops if Realtime not enabled)
│   │   ├── useToast.js                 # Thin accessor → useToastContext().toast (the toast/suspend-guard helper)
│   │   ├── useStudyHistory.js          # Month/day calendar data for History (cached getMonthData/getDayDetail)
│   │   ├── useReviewReminders.js       # USM S13 SR Lite CRUD — addReminder/completeReminder (7→14→30)/snooze/dismiss, dueReminders
│   │   ├── usePlanView.js              # Plan-screen view toggle persisted to localStorage (VALID: list/kanban/timeline/sprint)
│   │   ├── useSubscription.js          # Derives tier/isPro/isTrial/trialDaysLeft/activated (user + settings + appSettings)
│   │   ├── useAppSettings.js           # Reads app_settings (subscription + feature_flags rows) → { appSettings, globalFeatureFlags }
│   │   ├── useCookieConsent.js         # GDPR cookie consent (localStorage + user_settings sync)
│   │   ├── useAuthSecuritySettings.js  # Reads app_settings key='auth_security' (captcha/otp/email-verify/rate-limit flags + current legal versions)
│   │   ├── useFeatureFlags.js          # Legacy in-app flags from the feature_flags table (dark-mode/demo panel) — distinct from useUserFeatureFlags
│   │   ├── useFeatureRegistry.js       # Reads app_feature_flags registry; isEnabled/tierOf (default-ON)
│   │   ├── useUserFeatureFlags.js      # Per-user overrides from user_feature_flags
│   │   ├── useTheme.js                 # Dark/light theme state + toggle (applies .dark to <html>)
│   │   └── useUserSettings.js          # CRUD for user_settings table
│   └── lib/
│       ├── aiAdvisor.js                # AI advisor client (cache + RPC + fetch)
│       ├── adminApi.js                 # Admin API client (listUsers, deleteUser, getAdminStats)
│       ├── appMode.js                  # USM: getAppMode(settings) — THE one mode derivation point
│       ├── uniConstants.js             # USM: TERM_TYPES, SUBJECT_TERMS, UNIT_COLORS, ASSESSMENT_TYPES, etc.
│       ├── uniPriority.js              # USM Session 6: focus engine — scoreAssessment, getFocusQueue, getDeferralStreak (pure)
│       ├── gradeScales.js              # USM Session 9: pluggable scale registry (% / GPA4 / GPA7+WAM / CGPA10 / UK Honours / passfail) + approxConvert + formatAverageDisplay
│       ├── gradeEngine.js              # USM Session 9 FULL: unitGradeBreakdown, credit-weighted currentWeightedAverage, whatDoINeed solver (7 worked examples in header)
│       ├── bunchingRadar.js            # USM Session 7: detectHeavyWeeks + weeklyHoursTarget (real detection math; one-tap replan wired in S12)
│       ├── uniPlanner.js               # USM Session 12: AI planner draft generator — buildDemand/draftWeek/draftRange/weekStartISO (deterministic; reuses scheduler.js packItemsByHours)
│       ├── planningFallacy.js          # USM Session 12: personalMultiplier (median est-vs-actual ratio, category→overall→1.5 default, clamp 1.0–3.0) + suggestedHours
│       ├── scheduler.js                # Exam plan generator + reflowTasks; S12: exports packItemsByHours — THE shared hours-first packing core (exam wrapper packTasksByHours behavior unchanged)
│       ├── termWeeks.js                # USM Session 3: getTeachingWeeks/getCurrentWeek/getTotalTeachingWeeks (breaks pause week count)
│       ├── timetableHelpers.js         # USM Session 5: rotation letters, class occurrence, grid layout, attendance math (pure)
│       ├── assessmentHelpers.js        # USM Session 4: type meta/icons, due chips, urgency, weight labels, default checklists, series dates
│       ├── quickAddParser.js           # USM Session 8: parseQuickAdd — NL line → {title, unitId, typeId, dueDate, weight, estimatedHours}
│       ├── qbankImport.js              # EMP Session 1: parseQbankReport (tab/CSV, "Subj: 45/60 (75%)", totals lines) + matchSubjectByName + toBreakdownRows — 8 traced fixtures in header
│       ├── qbankProgress.js            # EMP Session 4: getFirstPassProgress/getFirstPassProjection (14-day rolling avg daily, daysBeforeExam, hasTimeForSecondPass) + getSecondPassRecommendation (weak subjects <70% once ≥90% pool done) — 5 traced fixtures in header
│       ├── examRevisionPlanner.js      # EMP Session 10: Final-Month / Revision Sprint engine (port of revisionPlanner.js for exam mode) — buildRevisionPlan (inverse-weakness weighting via rankWeakAreas + ≤2-consecutive interleave + final-3-day taper + exam-eve rest), getMockCadence (sprint mock every ~4d, none in taper), getNewMaterialCutoff (exam−14d); deterministic, today injectable
│       ├── uniGates.js                 # USM Session 8, LIVE Session 14: UNI_GATES + FEATURE_MATRIX + configureGates/canUse + plannerWeeklyCap + GATE_COPY
│       ├── uniExport.js                # USM Session 14: JSON/CSV exports, SVG timetable → PNG (svgToPngBlob shared with Wrapped), outbound .ics builder
│       ├── examExport.js               # EMP Session 15: exam-mode exports — exportExamPlanICS / exportProgressCardPNG / exportQuestionLogsCSV / exportMockExamsCSV / exportMistakeRulesCSV / exportStudyLogCSV / exportFullSnapshot + svgToPngBlob helper
│       ├── notify/                     # USM Session 14 / EMP Session 11: notifications — FREE forever
│       │   ├── notifier.js             # Delivery layer: provider interface (FCM/APNs slot in later), webNotificationProvider, in-app toast fallback event
│       │   ├── uniNotifications.js     # NOTIFY_TYPES, localStorage prefs, computeUpcomingNotifications (24h window, quiet hours, 5/day cap), self-fetching scheduleUniNotifications
│       │   └── examNotifications.js    # EMP Session 11: EXAM_NOTIFY_TYPES (7 types), computeExamNotifications, scheduleExamNotifications — mirrors uniNotifications pattern
│       ├── ical/                       # USM Session 11: LMS iCal import + re-sync
│       │   ├── parseIcal.js            # Dependency-free RFC 5545 VEVENT parser (5 traced fixtures in header)
│       │   ├── lmsProviders.js         # Provider interface (canvas/moodle/blackboard/brightspace_d2l/generic) + type inference + course→unit matching
│       │   └── syncEngine.js           # fetchFeedText (proxy client), mapFeedEvents, diffFeedEvents, applySilentUpdates, resolveConflict, insertImportedAssessments (23505-safe), runBackgroundSync
│       ├── constants.js                # Hardcoded 77 tasks + 18 subjects fallback
│       ├── dateUtils.js                # Date formatting and calculation helpers
│       ├── defaultSeedData.js          # Default settings, phases, subjects, tasks
│       ├── planGenerator.js            # createPlanFromOnboarding, parsePlanMarkdown, savePlanToSupabase
│       ├── seedUserData.js             # First-login seeding logic
│       ├── studyUtils.js               # Core study logic (SR, readiness, deficit)
│       ├── services/                   # Service layer — DB access + orchestration (consumed by hooks/screens)
│       │   ├── index.js                # Barrel: TaskService, TaskCompletionService, SRService, StudyLogService, SubjectService, PhaseService, PlanService (AnalyticsService not barrel-exported)
│       │   ├── TaskService.js          # tasks CRUD (imports DEFAULT_STEPS from hooks/useTaskSteps + readField from fieldNormalizer)
│       │   ├── TaskCompletionService.js # Orchestrates task-completion side-effects (status → milestone SR → study_log; via TaskService/SRService/StudyLogService/audit)
│       │   ├── SRService.js            # sr_records CRUD + createTopicSR (imports completesSRHit from studyUtils, logEvent from audit) — consumed by useSRRecords
│       │   ├── StudyLogService.js      # study_log CRUD (audit-logged)
│       │   ├── SubjectService.js       # subjects CRUD
│       │   ├── PhaseService.js         # phases CRUD
│       │   ├── PlanService.js          # STUB — task reflow / schedule generation (TODO)
│       │   └── AnalyticsService.js     # STUB — readiness/SR/accuracy calc (TODO)
│       ├── audit.js                    # logEvent → writes audit_log events; non-critical (logs to console on failure, never throws)
│       ├── bulkParser.js               # parseBulk — bulk task-paste text (CSV / multi-format) → structured plan data
│       ├── calculations.js             # Pure calc fns (readiness, SR intervals); date-fns only, no supabase/hooks
│       ├── captcha.js                  # verifyCaptchaToken(token) client (POST /api/verify-captcha; fails closed)
│       ├── chartTheme.js               # Single source of truth for all Recharts styling (Brand Kit §8): CHART_COLORS + axis/grid theme — always import here, never hardcode
│       ├── feasibility.js              # Pure plan-feasibility calculator (imports RECIPE_HOURS from recipeHours.js)
│       ├── fieldNormalizer.js          # Maps camelCase/alias field names → canonical snake_case DB columns (used by services/TaskService)
│       ├── legalVersions.js            # CURRENT_TERMS_VERSION / CURRENT_PRIVACY_VERSION + content paths (consent flow)
│       ├── passwordStrength.js         # Pure scorePassword(pw) → { score 0–4, label, checks }
│       ├── quickPlanGenerator.js       # Exam onboarding plan generator (buildDefaultConfigsForExam) + recipe-hours authority
│       ├── recipeHours.js              # Single source of truth for estimated hours per task recipe (mirrors quickPlanGenerator)
│       ├── scheduleEngine.js           # Computes task due dates from study prefs (startDate/examDate/daysPerWeek/restDay/…)
│       ├── taskHelpers.js              # Exam-mode task helpers (due chips, urgency, type meta) — the assessmentHelpers.js counterpart
│       ├── index.js                    # lib barrel (re-exports services + logEvent)
│       ├── mbbs/itemHelpers.js         # MBBS pure item/card pace math (getItemPace) — the rest of src/lib/mbbs/ is documented in the MBBS sections
│       └── supabase.js                 # Supabase client init
├── supabase/
│   ├── full_schema.sql                 # Complete schema (12 tables + RLS + triggers)
│   ├── schema.sql                      # Legacy minimal schema (study_log + sr_records)
│   ├── customization_migration.sql     # Added phases, subjects, tasks, schedules
│   ├── add_sr_questions_columns.sql    # sr1/sr2/sr3_questions columns
│   ├── add_schedule_columns.sql        # prayer_times, cdpath_schedule, gym_schedule
│   └── ai_advisor_function.sql         # get_ai_advisor_data RPC function
```

### Orphaned / unimported source files (on disk, not wired — documented, not deleted)

Confirmed at the 2026-06-20 doc audit (zero import sites in `src/`). Kept on disk intentionally — deletion is a separate hygiene decision, out of scope here.
- `src/screens/LandingPage.jsx` — superseded by `LandingPageStatic.jsx` (the only landing screen `App.jsx` imports). Not imported anywhere.
- `src/screens/Onboarding/AIPlanChat.jsx` — abandoned interactive plan-import draft. Not imported anywhere.
- `src/screens/Onboarding/PlanPreview.jsx` — a 7th exam-onboarding orphan (alongside the "Old screens" list in §Onboarding). Not imported anywhere.

(The exam-onboarding "Old screens" list in the §Onboarding section enumerates the other onboarding orphans: `OnboardingExamPicker/Dates/PlanMethod/Preview`, `QuickTaskBuilder`, `BulkPaste`, plus `AIPlanChat` + `PlanPreview` above.)

## Database Schema

All tables use RLS with `auth.uid() = user_id` policies. All have `created_at` and `updated_at` timestamps with auto-update triggers.

### 1. user_settings
| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid | gen_random_uuid() | PK |
| user_id | uuid | | FK auth.users, UNIQUE |
| exam_name | text | 'AMC MCQ' | |
| exam_date | date | '2026-08-17' | |
| study_start_date | date | '2026-05-04' | |
| question_bank_name | text | 'eMedici' | |
| sr1_interval | integer | 7 | Days until SR1 |
| sr2_multiplier | numeric | 1.5 | Multiplied by SR1 rating interval |
| sr3_multiplier | numeric | 2.0 | Multiplied by SR2 rating interval |
| grace_period_days | integer | 2 | Before overdue flag |
| rest_days_per_month | integer | 6 | |
| tier1_sr_hits | integer | 3 | |
| tier2_sr_hits | integer | 2 | |
| tier3_sr_hits | integer | 1 | |
| daily_question_target | integer | 40 | |
| prayer_times | jsonb | [...5 prayers...] | Added via migration |
| cdpath_schedule | jsonb | {enabled, days, departure, return, label} | Added via migration |
| gym_schedule | jsonb | {enabled, days, departure, return, label} | Added via migration |
| exam_type | text | null | 'amc_mcq', 'plab1', 'usmle_step1', 'custom' — null = legacy AMC user |
| exam_display_name | text | null | Human-readable exam name set during onboarding |
| onboarding_complete | boolean | null | null=legacy user (skip onboarding), false=new user (show onboarding), true=done |
| qbank_pool | jsonb | null | EMP Session 4: `[{source:'UWorld', total:3400}, …]` — per-source pool sizes for first-pass progress tracking; null = not configured (falls back to the prompt card in Dashboard/Plan) |
| exam_logistics | jsonb | null | EMP Session 13: `{ registration_deadline, test_center, test_center_confirmed, id_ready, items_notes, tminus_checklist:{sleep,printed,consolidate} }` — exam-day logistics + T-minus checklist state; null = no logistics card shown anywhere (reserved in `exam_improvements_001.sql`) |

### 2. phases
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| name | text | e.g. "Phase 1 -- Subject Coverage" |
| description | text | |
| sort_order | integer | |
| target_completion_date | date | |

### 3. subjects
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| name | text | UNIQUE per user |
| blueprint_category | text | AMC blueprint category |
| class_count | integer | Number of video classes |
| emedici_target | integer | Question target per subject |
| tier | integer | 1, 2, or 3 |
| sr_hits | integer | 1, 2, or 3 |
| milestone_task_id | uuid | FK tasks (circular ref) |
| is_active | boolean | |
| sort_order | integer | |

### 4. tasks
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| subject_id | uuid | FK subjects |
| phase_id | uuid | FK phases |
| title | text | |
| subject | text | Denormalized subject name |
| phase | integer | 1, 2, or 3 |
| emedici_qty | integer | Question target for this task |
| is_milestone | boolean | Triggers SR record creation when completed |
| is_mock | boolean | Mock exam task |
| is_custom | boolean | User-created vs seeded |
| sort_order | integer | Sequential task number |

### 5. schedule_templates
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| name | text | Template name |
| is_default | boolean | |

### 6. schedule_blocks
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| template_id | uuid | FK schedule_templates |
| user_id | uuid | FK |
| label | text | Block name |
| start_time | text | HH:MM |
| end_time | text | HH:MM |
| sort_order | integer | |

### 7. schedule_template_assignments
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| day_of_week | integer | 0-6 (Sun-Sat) |
| template_id | uuid | FK schedule_templates |

### 8. study_log
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| date | date | UNIQUE per user |
| status | text | complete, partial, missed, rest, pending |
| task_num | integer | Legacy task number |
| task_id | uuid | FK tasks |
| e_medici | integer | Questions done that day |
| partial_pct | integer | 0-100 for partial status |
| blocks | jsonb | DayPlanner block state |
| note | text | |

### 9. sr_records
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| subject_id | uuid | FK subjects |
| subject_name | text | UNIQUE per user |
| max_hits | integer | 1, 2, or 3 |
| completed_date | date | When milestone task completed |
| sr1_due / sr1_done / sr1_done_date / sr1_rating | date/bool/date/text | |
| sr2_due / sr2_done / sr2_done_date / sr2_rating | date/bool/date/text | |
| sr3_due / sr3_done / sr3_done_date / sr3_rating | date/bool/date/text | |
| sr1_questions / sr2_questions / sr3_questions | integer | Added via migration |
| source_type | text | EMP S17 (exam_improvements_001.sql) — `subject_milestone` (or NULL = milestone) \| `topic` \| `mistake`; drives the unified Review Queue badge + flow |
| source_id | uuid | EMP S17 — the mistake_logs id for a graduated mistake (NULL for subject/topic) |
| topic_label | text | EMP S17 — human-readable topic for topic/mistake SR; subject_name mirrors it so SRModal/completeSRHit resolve the record |

Ratings: easy, medium, hard, blackout

### 10. question_logs
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| date | date | |
| subject_id | uuid | FK subjects |
| task_id | uuid | FK tasks |
| question_bank_name | text | Default 'eMedici' |
| questions_done | integer | |
| correct_count | integer | |
| incorrect_count | integer | |
| mode | text | timed, untimed, mixed |
| note | text | |

### 11. mock_exams
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| title | text | |
| date | date | |
| total_questions | integer | Default 150 |
| correct_count | integer | |
| incorrect_count | integer | |
| percentage | numeric | Auto-calculated |
| time_minutes | integer | Default 210 |
| notes | text | |

### 12. mock_exam_breakdown
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| mock_exam_id | uuid | FK mock_exams (CASCADE) |
| subject_id | uuid | FK subjects |
| blueprint_category | text | |
| total_questions / correct_count / incorrect_count | integer | |

### 13. mistake_logs
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK |
| date | date | |
| subject_id | uuid | FK subjects |
| task_id | uuid | FK tasks |
| question_bank_name | text | |
| mistake_type | text | diagnosis_gap, investigation_error, management_error, red_flag_missed, guideline_confusion, misread_question, time_pressure, ethics_legal, other |
| clinical_area | text | |
| short_note / correction_note | text | |
| next_review | date | EMP S3 (exam_improvements_001.sql) — next review date; NULL = not in the review queue |
| review_count | integer | EMP S3 — how many reviews done (drives the 1→3→7→14-day ladder) |
| resolved | boolean | EMP S3 — true once rated "Got it"; leaves the queue |
| last_rating | text | EMP S3 — 'shaky' \| 'resolved' |

### RPC Function: get_ai_advisor_data
Defined in `supabase/ai_advisor_function.sql`. Takes `p_user_id uuid`, returns JSON with: tasks_total, tasks_completed, current_task, days_to_exam, study_start, recent_logs (last 14 days), sr_summary (per subject), question_stats, streak.

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_SUPABASE_URL | Supabase project URL (exposed to client) |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous/public key (exposed to client) |
| OPENAI_API_KEY | OpenAI API key (server-side only, used by api/ai-advisor.js) |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service role key (server-side only, used by api/admin.js) — required for admin panel |
| SUPABASE_URL | Supabase project URL server-side alias (api/admin.js falls back to VITE_SUPABASE_URL if unset) |

## Screens

### Auth (`src/screens/Auth.jsx`)
Login/register screen with email+password. On signup, calls `ensureUserSetup()` which creates a settings row with `onboarding_complete: false` for new users. Toggle between login and register modes.

### LandingPageStatic (`src/screens/LandingPageStatic.jsx`)
**SEO note (2026-06-19):** The homepage is now served as **native HTML** — Vercel maps `/` → `public/landing.html` directly (no iframe, no JS required for crawlers). `LandingPageStatic.jsx` is kept as a React-side fallback rendered by the SPA when unauthenticated users navigate within the app (e.g. hitting `/` after the React shell loads). It still renders `public/landing.html` inside a full-screen iframe.

**Root cause of the prior iframe-only approach**: `index.html` at repo root physically shadowed the `/ → /landing.html` Vercel rewrite. Renaming `index.html` → `app.html` (and setting `rollupOptions.input: 'app.html'` in Vite) removed the shadow file, so the rewrite now fires for all unauthenticated visits before any JS loads.

**Auth redirect in `public/landing.html`**: a synchronous inline script at the top of `<head>` checks `localStorage` and `sessionStorage` for any key matching `/^sb-.+-auth-token$/`. If a valid Supabase token is found, it calls `window.location.replace('/settings')` — sending the user into the app before any content paints. `/settings` is the redirect target because it exists in all three app modes (exam, university, MBBS).

**`target="_top"` — removed 2026-06-19**: All nav and footer links in `landing.html` previously carried `target="_top"` as an iframe-escape workaround. These were stripped in the follow-up cleanup commit — standard `<a href="/features">` is correct now that the page is top-level. Auth CTA links (`/?auth=login`, `/?auth=register`) never had `target="_top"` and remain unchanged. **Do not re-add `target="_top"` to any link in `landing.html`** — the iframe path is `LandingPageStatic.jsx` only, and users reaching the page via that iframe should navigate within the SPA, not break out.

**`<meta name="robots">` — added 2026-06-19**: `<meta name="robots" content="index, follow, max-image-preview:large" />` added to `<head>`. Required for Google to use the full 1200×630 OG image as a search result thumbnail. Was absent from the initial SEO build.

### Legal Documents — Terms & Privacy (Auth/Security Session 1)
Public, brand-styled, versioned legal docs. **Content lives in markdown** at `src/content/legal/terms-v1.0.0.md` and `src/content/legal/privacy-v1.0.0.md` (each opens with an `<!-- AI-DRAFTED LEGAL DOCUMENT — REVIEW BY QUALIFIED COUNSEL -->` comment; each ends with a `## Changelog` section + `Last updated · Version` line — the Changelog anchor is what Session 4's re-prompt links to). The docs cover the full StudyRise legal context (medical-exam + university product, third parties Supabase/Vercel/Google/OpenAI/Resend + future SMS/bKash/Nagad, jurisdictions BD/GDPR-UK/CCPA/AU, 13+ age with parental consent, educational-not-medical disclaimers, subscription/refund model).
- **Versioning**: `src/lib/legalVersions.js` exports `CURRENT_TERMS_VERSION` / `CURRENT_PRIVACY_VERSION` (both `'1.0.0'`), `LEGAL_EFFECTIVE_DATE` (`'2026-06-13'`), and `TERMS_CONTENT_PATH` / `PRIVACY_CONTENT_PATH` (canonical doc names). These constants feed Session 4's consent flow — bump them when a doc changes to trigger re-acceptance.
- **Rendering**: `src/screens/Legal/LegalDoc.jsx` is the shared renderer — imports the `.md` via Vite `?raw`, renders with `react-markdown` + `remark-gfm` (added deps), maps every element to brand-token inline styles (max-width 720px, logo bar linking `/`, title + "Effective <date> · Version <x>", an amber "not a substitute for legal advice" disclaimer callout, footer cross-link + `hello@studyrise.app` contact). It strips HTML comments + the leading `# H1` so the chrome title isn't duplicated. `Legal/TermsOfService.jsx` and `Legal/PrivacyPolicy.jsx` are thin wrappers passing the right content/version.
- **Routes**: `/terms` and `/privacy` in `App.jsx` (lazy `Suspense`), reachable both unauthenticated and authenticated; accessible without auth.
- **Footer links**: Auth screen (`src/screens/Auth.jsx`) has a persistent "Terms · Privacy · Contact" row below the card; `LandingPage.jsx` footer already links both. Contact email throughout: **hello@studyrise.app**.

### Consent Audit Trail + Version Re-Prompt (Auth/Security Session 4)
Acceptance of the Terms + Privacy Policy is a hard requirement with a recorded audit trail, and existing users are re-prompted whenever the version is bumped.
- **Columns (user_settings)** — added by the manual Session 0 Part D migration (`migrations/auth_security_001_columns.sql`): `terms_accepted_at` / `terms_version_accepted` / `privacy_accepted_at` / `privacy_version_accepted` (TIMESTAMPTZ + TEXT) and `marketing_consent` (BOOLEAN). **These columns are NOT yet present on the live DB until that SQL is run in Supabase** — the code below degrades gracefully without them (see the guard).
- **Shared helper** `src/lib/consent.js`: `buildConsentPayload({ marketingConsent })` → the five consent fields stamped at the CURRENT versions (from `legalVersions.js`); `upsertUserSettings(payload)` upserts and, if the DB rejects the consent columns (`PGRST204` / `42703` / "column … does not exist"), retries WITHOUT the `CONSENT_KEYS` so registration never breaks on a not-yet-applied migration.
- **Checkbox block** on the Register tab of `Auth.jsx` (required "I agree to Terms + Privacy" `*` + optional "product updates" marketing) — submit disabled until agree is checked; consent written into the existing trial/phone upsert via `buildConsentPayload`. Same block + same writes in `CompleteProfileModal.jsx` (Google OAuth phone-capture; Save disabled until agree).
- **Re-prompt** `src/components/ConsentReprompModal.jsx`: non-dismissable, "We've updated our Terms and Privacy Policy" + links to `/terms#changelog` and `/privacy#changelog`, required agree checkbox, Accept (writes current versions via `upsertUserSettings` then refetch) or "Sign out instead". Mounted in `App.jsx` inside `Layout` next to `CompleteProfileModal`.
- **Guard (`App.jsx`)** `needsConsentUpdate` fires when `authSecurity.currentTermsVersion/currentPrivacyVersion` (from `useAuthSecuritySettings`) differs from `settings.terms_version_accepted/privacy_version_accepted`. Gates: only after settings + authSecurity loaded; **only if `'terms_version_accepted' in settings`** (column present) so a DB without the migration never fires and never infinite-loops; not while `needsPhone` (CompleteProfileModal captures consent at the current version); not on `/terms` or `/privacy` (let users read first). NULL accepted-version counts as older, so pre-Session-4 users get the modal once, then it clears.
- **Profile** (`src/screens/Profile.jsx`): a "Compliance" card shows "Terms accepted: <date> · v<ver>" / "Privacy accepted: …" (red "Not accepted" when null) + a live `marketing_consent` Toggle (optimistic; reverts + toast on a failed/ missing-column write).
- **Data export**: `exportFullSnapshot` dumps the whole `settings` row (selected `*`), so consent fields are included automatically once the columns exist — no separate wiring needed.
- **LegalDoc anchors**: `LegalDoc.jsx` h2 headings now get a slug `id` (e.g. `## Changelog` → `id="changelog"`), so the re-prompt's `/terms#changelog` deep links scroll correctly.

### Password UX — Strength Meter, Visibility Toggle, Remember Me (Auth/Security Session 5)
Client-side password hygiene improvements on the Auth screen; no DB migrations needed.
- **`src/lib/passwordStrength.js`** (NEW): pure `scorePassword(pw)` → `{ score: 0–4, label: 'Weak'|'Fair'|'Good'|'Strong'|'Excellent', checks }`. Checks: `length` (≥8), `longEnough` (≥12), `uppercase`, `number`, `symbol`. Score = number of checks passing, capped at 4. Used by the meter, Auth.jsx submit gate, and ResetPassword.jsx.
- **`src/components/ui/PasswordStrengthMeter.jsx`** (NEW): 4-segment animated bar (Framer Motion `initial={width:0}` → `animate` fill by score) + color-coded label (red ≤1, amber 2, lime 3, green 4) + checklist row for each criterion. Exported from `src/components/ui/index.js`. Renders nothing when `!password`.
- **`src/screens/Auth.jsx`**: `EyeToggle` inline component (Eye/EyeOff, `aria-label` flips) wraps the password `<input>` in a `position:relative` div — present on both Login and Register tabs. Strength meter mounts below the password field on the Register tab when non-empty. Register submit gated on `agree && pwScore >= 2` (score ≥ 2 = "Good" — prevents trivially weak passwords).
- **`src/lib/supabase.js`**: `hybridStorage` custom adapter passed to `createClient({ auth: { storage: hybridStorage } })`. `getItem` reads sessionStorage first, falls back to localStorage. `setItem` writes to sessionStorage when the `'studyrise:no_persist'` flag is set in sessionStorage, otherwise localStorage. `removeItem` clears both stores. This allows per-session (tab-scoped) vs persistent token routing without forking the Supabase client.
- **`src/hooks/useAuth.js`**: `signIn(email, password, rememberMe=true)` — sets `sessionStorage['studyrise:no_persist']='1'` before `signInWithPassword` when `rememberMe` is false (routes session token to sessionStorage); removes the flag otherwise (routes to localStorage). Flag cleared on sign-in error so subsequent attempts default to persistent.
- **Remember Me checkbox** on Login tab (default checked, stored in `rememberMe` state) passes the value to `signIn`. When unchecked: session ends on browser/tab close. When checked: session token persists in localStorage across browser restarts.

### Forgot Password Flow + Reset Password Page (Auth/Security Session 6)
Full email-based password reset without leaking whether an address is registered.
- **`src/screens/Auth.jsx`**: added third `mode` value `'forgot'`. Forgot mode hides the tab switcher (Login/Register) and Google OAuth section; shows a "Reset your password" heading + email field + "Send reset link" submit. "Forgot password?" link right-aligned next to the PASSWORD label on Login tab → `setMode('forgot')`. "← Back to login" link in forgot mode. `activeTab = mode === 'forgot' ? 'login' : mode` keeps the Login tab visually active. Submit in forgot mode calls `resetPasswordForEmail(email, siteUrl + '/reset-password')` — siteUrl resolves to `window.location.origin` in production or `http://localhost:5173` on dev. **Always shows success copy regardless of whether the email exists** ("Check your email… link expires in 1 hour") — no email enumeration.
- **`src/hooks/useAuth.js`**: `resetPasswordForEmail(email, redirectTo)` wraps `supabase.auth.resetPasswordForEmail(email, { redirectTo })`. Returned from hook.
- **`src/screens/ResetPassword.jsx`** (NEW): public route `/reset-password`. Listens for Supabase `PASSWORD_RECOVERY` auth event via `onAuthStateChange` (triggered when the user follows the email link with the recovery token in the URL hash); also checks `getSession()` on mount in case a session already exists. While waiting: "Verifying your reset link…". When ready: form with New Password + Confirm Password fields (both with Eye toggles + `PasswordStrengthMeter`), submit disabled until `score >= 2 && password === confirm`. Calls `supabase.auth.updateUser({ password })`. On success: green confirmation → `navigate('/')` after 2s. "Back to login" → `/auth`.
- **`src/App.jsx`**: `ResetPassword` lazy-imported as its own chunk. Mounted on `/reset-password` in both the unauthenticated path (direct link from the email) and authenticated Routes (user may already be logged in via recovery token). Wrapped in `<Suspense fallback={<ScreenSkeleton />}>`.

### reCAPTCHA v2 (Auth/Security Session 7)
Google reCAPTCHA v2 ("I'm not a robot" checkbox) on the Auth screen, gated by the admin flag `auth_security.captcha_enabled` (read via `useAuthSecuritySettings`). Default OFF → the auth screen is byte-identical to before. Library: `react-google-recaptcha` (^3.1.0 — supports the v2 checkbox widget).
- **`src/components/ui/Captcha.jsx`** (NEW, barrel-exported with named `captchaConfigured`): `forwardRef` wrapper around `<ReCAPTCHA>` using `import.meta.env.VITE_RECAPTCHA_SITE_KEY`. **Renders `null` when the site key is missing** (graceful dev fallback). `captchaConfigured` = `!!VITE_RECAPTCHA_SITE_KEY`. Props: `onChange(token)`, `onExpired()`, `theme`; the forwarded ref exposes `.reset()` (v2 tokens are single-use).
- **`src/lib/captcha.js`** (NEW): `verifyCaptchaToken(token)` → POSTs to `/api/verify-captcha`, returns `{ success, error }`. **Fails closed** on network error (a bot can't bypass the gate by killing the request).
- **`api/verify-captcha.js`** (NEW, Vercel serverless): POST `{ token }` → calls Google `siteverify` with `RECAPTCHA_SECRET_KEY` (server-only env, never `VITE_`-prefixed) → `{ success }`. 400 no token, 401 verify fail, 500 if secret missing, 502 on Google unreachable. CORS-locked to the studyrise.app origins + Vercel previews. No auth header (runs pre-sign-in).
- **`src/screens/Auth.jsx`**: `captchaActive = authSecurity.captchaEnabled && captchaConfigured`. When active: `<Captcha ref>` mounts above submit on **all three modes** (Login / Register / Forgot); submit is disabled until a token is set; `handleSubmit` runs `ensureCaptcha()` (server-verify the token) right BEFORE the auth network call in each branch — placed AFTER the cheap client-side validations so a failed validation never burns the single-use token. Token + widget are reset (`resetCaptcha`) on any auth error and on tab/mode switch (`resetForm`).
- **Env vars**: `VITE_RECAPTCHA_SITE_KEY` (client) + `RECAPTCHA_SECRET_KEY` (server) — set in Vercel per Session 0 Part C. **Admin toggle (`captcha_enabled`) flip is a Session 2 deliverable that was never built** — flip it via the `auth_security` row in `app_settings` (SQL) until the admin panel toggle ships. Since `captchaConfigured` short-circuits, enabling the flag without the env key safely shows no widget (never blocks submit on an unobtainable token).

### Phone OTP — mock-mode infrastructure (Auth/Security Session 8)
Provider-agnostic phone OTP verification, gated by `auth_security.otp_required` (default OFF). Runs in **mock mode** (no SMS provider wired) — the code is read from the server/Vercel function logs. Swapping in Twilio later is a one-file change (`api/send-otp.js`). Keyed off the `phone_otp_attempts` table + `user_settings.phone_verified` (both from `auth_security_001_columns.sql`).
- **`src/lib/otpProvider.js`** (NEW): thin client — `otpProvider.sendOtp(phoneE164, userId)` / `verifyOtp(phoneE164, code, userId)` POST to the two serverless endpoints with the user's Bearer token. `OTP_PROVIDER` (`VITE_OTP_PROVIDER` || 'mock') + `isMockOtp` are UI hints only (the mock callout); the real provider decision is server-side.
- **`api/send-otp.js`** (NEW, serverless): POST `{ phone_e164, user_id }`, Bearer-JWT auth (body `user_id` must match the token user). Generates a 6-digit code, stores `sha256(salt:phone:code)` in `phone_otp_attempts` with a 10-min expiry, **logs the plain code to server logs ONLY** (never in the response). Rate limit: **3 sends per (user, phone) / rolling hour** → 429. `OTP_PROVIDER='twilio'` returns 501 until wired (`hashOtp` exported; salt = `OTP_HASH_SALT` env).
- **`api/verify-otp.js`** (NEW, serverless): POST `{ phone_e164, code, user_id }`. Looks up the most recent unverified, unexpired row for (user, phone), compares the SHA-256 hash; on success stamps `verified_at` + flips `user_settings.phone_verified = true`. 401 on expired/missing/wrong code. (Per-code failed-verify locking is best-effort/not enforced — documented deviation; the 3/hour send cap is the operative protection.)
- **`src/components/OtpInput.jsx`** (NEW): 6 separate boxes, auto-advance on keystroke, backspace-back, arrow nav, paste-to-fill, autofocus first box. `value`/`onChange(next)`/`onComplete(code)`/`error`.
- **`src/components/PhoneOtpModal.jsx`** (NEW): sends a code on mount, 30s resend cooldown, `<OtpInput>`, mock-mode amber callout, Verify. **Two contexts share it**: non-dismissable (registration/required — escape is "Sign out", mirrors ConsentReprompModal) vs dismissable (`dismissable` prop — "Skip for now"). Optional `onChangeNumber`.
- **Registration / required gate (`src/App.jsx`)**: `needsPhoneVerification = authSecurity.otpRequired && settings.phone_number && phone_verified !== true` (same load/column/legal-route guards as `needsConsentUpdate`, not stacked on the phone-capture or consent modals). Renders the non-dismissable `<PhoneOtpModal>` inside `Layout` (app behind, like CompleteProfileModal). **Deliberate deviation from the session spec**: enforced via this App-level gate rather than inside Auth.jsx, because Supabase fires `onAuthStateChange` the instant a session exists and unmounts Auth before any post-signup modal could hold — same pattern (and post-onboarding timing) as the existing CompleteProfileModal/ConsentReprompModal gates.
- **Profile phone change (`src/screens/Profile.jsx`)**: changing the phone already sets `phone_verified = false` (Session 3); now, if `otpRequired`, save opens a **dismissable** `<PhoneOtpModal>`. A green "Verified" / amber "Unverified" badge sits under the phone field; when unverified AND `otpRequired`, a "Verify now" link reopens the modal (verifies the saved `phone_number`).
- **`phone_verified` is now actually used** (was reserved/unused). **Admin toggle (`otp_required`) is the unbuilt Session 2 deliverable** — flip via the `auth_security` row until it ships. To switch to a real SMS provider: implement the `OTP_PROVIDER='twilio'` branch in `api/send-otp.js` and set `VITE_OTP_PROVIDER='twilio'` — no form/component changes.

### Email Verification (Auth/Security Session 9)
`src/components/EmailVerificationBanner.jsx` — gated by `authSecurity.emailVerificationRequired`. Two modes: (1) soft banner (amber, dismissable per session) when `email_verification_required = false` — shown above the app but doesn't block; (2) full-screen blocking overlay when `email_verification_required = true`. Both modes offer a "Resend verification email" button (calls `supabase.auth.resend({type:'signup'}`). Google OAuth users have `email_confirmed_at` set automatically — never blocked. `needsEmailVerification` guard in `App.jsx` uses `!user.email_confirmed_at` as source of truth (no DB column needed). Profile shows a green "Email verified" / amber "Email not verified" badge next to the email field with a "Resend verification email" link. Supabase Dashboard → Authentication → Settings → "Enable email confirmations" must be set ON for emails to fire (currently may be disabled for dev convenience).

### Failed Login Rate Limiting (Auth/Security Session 10)
`src/lib/loginRateLimit.js` — localStorage-based tracking. Key format: `studyrise:rl:<btoa(email)>`. `recordFailure(email, maxAttempts, cooldownMinutes)` pushes a timestamp; when attempts in the rolling window ≥ maxAttempts, sets `lockedUntil = now + window`. `getLockState(email, max, cooldown)` returns `{locked, secondsRemaining, attemptsRemaining}`. `clearOnSuccess(email)` wipes on successful login. `src/components/LoginCooldownNotice.jsx` — red/amber card with live countdown (1s tick) that calls `onUnlock()` when it hits zero. Wired into `Auth.jsx` login submit: checks `getLockState` before calling `signIn`; calls `recordFailure` on invalid-credentials errors; logs to `/api/log-failed-login` (serverless, inserts into `auth_failed_attempts` table) for audit. Admin-tunable via `authSecurity.rateLimitMaxAttempts` / `authSecurity.rateLimitCooldownMinutes` (from `auth_security` app_settings row; defaults 5 attempts / 15 minutes).

### Cookie Consent Banner (Auth/Security Session 11)
GDPR-style cookie consent. **FREE forever** — no gate.
- **`src/hooks/useCookieConsent.js`**: `useCookieConsent(user, settings)` — reads from localStorage key `studyrise:cookie-consent` first (works for unauthenticated visitors), syncs from `user_settings` when authenticated. Returns `{consentGiven, preferences, accept, reject, savePreferences}`. `accept()` sets all three categories to true; `reject()` keeps only essential; `savePreferences(prefs)` writes the caller's choice. Any choice writes BOTH localStorage AND `user_settings.cookie_consent_given_at` + `cookie_preferences` (if user is authenticated). Preferences object: `{ essential: true, analytics: bool, marketing: bool }`.
- **`src/components/CookieConsentBanner.jsx`**: bottom-fixed banner with Framer Motion slide-up entrance. Shows only when `consentGiven === false`. Layout: Cookie icon + explanatory text + Privacy Policy link + action buttons ("Accept all" / "Reject non-essential" / "Customize" link). "Customize" expands an inline panel with three Toggle rows (Essential = always on / Analytics / Marketing). `SKIP_PATHS = ['/terms', '/privacy']` — banner never shows on legal pages (let users read first). Mounted inside `<AnimatePresence>` in `App.jsx` for authenticated users, and also in the `/auth` path early-return for unauthenticated users.
- **Profile screen** (`src/screens/Profile.jsx`): "Cookie preferences" card (Cookie icon in header, three rows with same toggle layout, "Save preferences" button + saved flash). Allows users to revisit and update their choice at any time.
- **user_settings columns** (from `auth_security_001_columns.sql`): `cookie_consent_given_at` (TIMESTAMPTZ) + `cookie_preferences` (JSONB default `{"essential": true, "analytics": false, "marketing": false}`).

### Onboarding (`src/screens/Onboarding/`)
**Immersive brand-first design system** (redesigned 2026-06-13) shared by Mode Select (Step 0), all three wizards (exam 3-step, USM 6-step, MBBS 6-step), and the cinematic BuildingPlan hand-off screen. Shown only to new users (`onboarding_complete === false`). Legacy users (`onboarding_complete = null`) are never redirected. Rendered directly by App.jsx (no Layout/sidebar).

**Design components** (`src/screens/Onboarding/onboardingUi.jsx`):
- **ImmersiveBackdrop**: Full-bleed navy (`#0D1B3E`, hardcoded not var-based) canvas with (1) brand-gradient wash (purple→cyan→blue radial overlay at 135°), (2) masked grid texture (white 1px grid, 48px spacing, radial fade-out), (3) two slowly drifting glow orbs (purple top-right, cyan bottom-left, 24s/26s cycle periods). All decorative elements aria-hidden. Padding-aware via spread `...style`. The navy hardcoding bypasses dark-mode token flipping — `var(--navy)` in `:root.dark` is light blue (for text), but the immersive canvas must always be dark. Same applied to the wrapper divs in OnboardingFlow, UniOnboarding, MbbsOnboarding, and the Resend Email button in Auth.jsx.
- **GlassCard**: Frosted-glass white card (rgba(255,255,255,0.97)) with backdrop-filter blur, semi-transparent white border, 24px shadow. **Dark-mode CSS variable contract**: the card pins light-mode tokens via inline styles (`--ink: #0D1B3E`, `--ink-4: #64748B`, `--surface-2: #F8FAFC`, etc.). This ensures text always renders dark-on-white regardless of app-wide `.dark` mode. Solves the contrast problem where `var(--ink)` = near-white in dark mode, unreadable on a white card.
- **OnboardingShell**: Reusable frame for exam and USM wizards (prop-driven `step`, `totalSteps`, `brandLabel`, `progressHint`). Top: BrandBar (logo + label + logout button). Center: GlassCard containing a centered motion.div with the step content. Footer: action buttons (Back / Continue / Custom). Progress bar + step counter. Slide-in animations via Framer Motion variants.
- **BrandBar**: Logo + section label + optional logout button. Used by Mode Select, OnboardingShell, and the cinematic BuildingPlan. Renders over the immersive backdrop.

**Three separate wizards** (mode-aware routing in App.jsx):
- **Mode Select (Step 0)** (`ModeSelect.jsx`): New users without an `app_mode` see three large white cards (Exam Prep / University / MBBS). Choice card buttons also pin the CSS token overrides (`--ink: #0D1B3E`, `--ink-4: #64748B`) to ensure dark text on white backgrounds. Picking a mode writes `app_mode`, triggering the correct wizard on next render. Mid-setup refresh never loops — `app_mode` already set skips Step 0 and resumes the correct wizard at Step 1.
- **Exam onboarding** (3-step, EMP Session 9): Step 1 = exam type select + dates. Step 2 = study hours/days budget. Step 3 = generate preview → Generate button → DB save + cinematic screen → `/plan`.
- **USM onboarding** (6-step, Session 2): Steps 1–5 = term / terminology / units / deadlines (skippable) / timetable. Step 6 = save + cinematic screen → `/`.
- **MBBS onboarding** (6-step, Session 2): Phase / college / subjects / timetable / supplementary options / finishing. Save + cinematic screen → `/mbbs`.

**Cinematic BuildingPlan** (`BuildingPlan.jsx`): Shown after a successful save while the DB write is in flight. Full-screen overlay (mode-specific branding, user name greeting, animated progress ticker, step-by-step animation loop: "Mapping subjects" → "Pacing study" → "Scheduling reviews" → "Finishing dashboard"). Plays ~3s, then calls `onDone` callback to navigate to the dashboard. Zero interaction — pure handoff.

**Flow for new users**: (1) Auth signup → `ensureUserSetup` seeds default data + sets `onboarding_complete: false`. (2) App.jsx detects `needsModeSelect = onboarding_complete===false && app_mode===null`. (3) ModeSelect picker → writes `app_mode` + refetch. (4) App.jsx routes to the correct wizard (`needsOnboarding` for exam, `needsUniOnboarding` for USM, `needsMbbsOnboarding` for MBBS). (5) Wizard Step N → user data accumulates in local state (never writes until the final save). (6) Final save writes all tables → upserts `onboarding_complete: true`. (7) BuildingPlan cinematic plays. (8) Navigate to dashboard.

**Old screens** (kept on disk, unimported): `OnboardingExamPicker.jsx`, `OnboardingDates.jsx`, `OnboardingPlanMethod.jsx`, `OnboardingPreview.jsx`, `PlanPreview.jsx`, `AIPlanChat.jsx`, `QuickTaskBuilder.jsx`, `BulkPaste.jsx` (see also the consolidated "Orphaned / unimported source files" list in §Project Structure). Power users rebuild/customize from Settings → Exam Setup "Start a new plan" after onboarding.

**Post-onboarding**: Dashboard "Finish setting up" banner (soft-blue, top of left column) links Settings tabs and dismissal persists in `user_settings.checkin_state.onboarding_banner_dismissed`.

### Feature Tour (`src/components/FeatureTour/`)
**Product walkthrough for newly-onboarded users** — a guided tour of key features shown automatically once after the 3-step onboarding, with manual re-open from Settings. Lazy-loaded, never shown during auth/onboarding/blocking modals.
- **`src/components/FeatureTour/FeatureTour.jsx`**: Self-contained modal/drawer (responsive: `lg:` side panel / mobile bottom sheet) with a sequence of step cards. Props: `open`, `mode` (exam/university to customize content), `userName` (for personalization), `onClose`. Each step has a title, description, spotlight box (optional — highlights a relevant UI area with a semi-transparent overlay), and action buttons (Next / Done / Skip). Steps branch by mode (exam: Dashboard readiness + Plan + Today DayPlanner + SR Module + Analytics; USM: UniDashboard + Semester + Timetable + Grades + Analytics). Exit via X button or "Done" — both call `onClose`.
- **`src/lib/featureTour.js`**: `OPEN_TOUR_EVENT = 'studyrise:tour:open'` constant + `TOUR_STEPS` array (step definition objects with title/description/actionButtons) indexed by mode. Pure data.
- **Auto-show on-mount**: `App.jsx` manages `tourOpen` state with a `useRef` guard (`tourAutoRef`) — fires once when `settings.onboarding_complete === true` AND `!settings.checkin_state?.feature_tour_seen`, then sets `tourOpen = true`. Closing the tour calls `updateSettings({ checkin_state: { ...checkin_state, feature_tour_seen: true } })` — persists the dismissal so it never auto-shows again. Legacy users (`onboarding_complete = null`) never get the auto-popup.
- **Manual re-open**: Settings button "Take the tour" (Compass icon, top-right of header) dispatches a `CustomEvent(OPEN_TOUR_EVENT)`. App.jsx listens for it via `window.addEventListener(OPEN_TOUR_EVENT, () => setTourOpen(true))`, allowing users to replay the tour at any time from a single persistent component instance.
- **Non-blocking**: `tourOpen` render is gated by `!needsPhone && !needsConsentUpdate && !needsPhoneVerification && !needsEmailVerification` so blocking modals always stay on top. Lazy Suspense chunk, own import.

**Dark-mode CSS variable contract** — `onboardingUi.jsx` exports shared immersive design components (ImmersiveBackdrop, GlassCard, BrandBar, StepProgress, FocusInput, FocusSelect, ChoiceCard, labelStyle, inputStyle, btnPrimary, btnSecondary). All dark surfaces hardcode `#0D1B3E` instead of `var(--navy)` to avoid dark-mode color flips. All white-background cards (GlassCard, ChoiceCard) pin light-mode ink/border/surface tokens so children always render with dark text on white, never relying on the app-wide token flips. Wizard step components in `uni/wizardUi.jsx` and `mbbs/` follow the same pattern.

### Feature Tour (`src/components/FeatureTour/`)
**Product walkthrough for newly-onboarded users** — a guided tour of key features shown automatically once after the 3-step onboarding, with manual re-open from Settings. Lazy-loaded, never shown during auth/onboarding/blocking modals.
- **`src/components/FeatureTour/FeatureTour.jsx`**: Self-contained modal/drawer (responsive: `lg:` side panel / mobile bottom sheet) with a sequence of step cards. Props: `open`, `mode` (exam/university to customize content), `userName` (for personalization), `onClose`. Each step has a title, description, spotlight box (optional — highlights a relevant UI area with a semi-transparent overlay), and action buttons (Next / Done / Skip). Steps branch by mode (exam: Dashboard readiness + Plan + Today DayPlanner + SR Module + Analytics; USM: UniDashboard + Semester + Timetable + Grades + Analytics). Exit via X button or "Done" — both call `onClose`.
- **`src/lib/featureTour.js`**: `OPEN_TOUR_EVENT = 'studyrise:tour:open'` constant + `TOUR_STEPS` array (step definition objects with title/description/actionButtons) indexed by mode. Pure data.
- **Auto-show on-mount**: `App.jsx` manages `tourOpen` state with a `useRef` guard (`tourAutoRef`) — fires once when `settings.onboarding_complete === true` AND `!settings.checkin_state?.feature_tour_seen`, then sets `tourOpen = true`. Closing the tour calls `updateSettings({ checkin_state: { ...checkin_state, feature_tour_seen: true } })` — persists the dismissal so it never auto-shows again. Legacy users (`onboarding_complete = null`) never get the auto-popup.
- **Manual re-open**: Settings button "Take the tour" (Compass icon, top-right of header) dispatches a `CustomEvent(OPEN_TOUR_EVENT)`. App.jsx listens for it via `window.addEventListener(OPEN_TOUR_EVENT, () => setTourOpen(true))`, allowing users to replay the tour at any time from a single persistent component instance.
- **Non-blocking**: `tourOpen` render is gated by `!needsPhone && !needsConsentUpdate && !needsPhoneVerification && !needsEmailVerification` so blocking modals always stay on top. Lazy Suspense chunk, own import.

### Admin — REMOVED from the main app (Admin v2 Session 6)
The old in-app admin panel (`src/screens/Admin/AdminPanel.jsx`, the `/admin` route, the Sidebar Admin link) was deleted in Admin v2 Session 6. Admin is now the standalone app at **admin.studyrise.app** (`studyrise-admin/`). `/admin` in the main app now falls through to the `*` catch-all → redirect to `/`. NOTE: `api/admin.js` + `src/lib/adminApi.js` were intentionally KEPT — they still back the Settings → **Audit Log** / **Feature Flags** tabs (`AuditLogViewer`/`FeatureFlagsPanel`), DangerZoneTab (reset/delete), and `isAdmin`/`ADMIN_EMAIL` (useSubscription/Sidebar/Settings).

### Dashboard (`src/screens/Dashboard.jsx`)
Main landing page. Uses ui/ components (Card2, Badge2, Button2, Bar, Ring, KPITile, SectionHeader). Layout: hero readiness card (Ring + status sentence + breakdown bars) alongside navy countdown card in 3/2 grid. 4-col KPI row. SR overdue banner with icon + action button. Today's task card, phase progress bars, AI Study Advisor in left column. Phase rings, quick numbers, SR due list in right column. Responsive: 1-col on mobile, 5-col grid on lg.

### Today (`src/screens/Today.jsx`)
Daily command centre. Hero clock at top: centered big clock (72px desktop/56px mobile, font-mono, font-weight 500, tracking -0.04em) with live HH:MM:SS updating every second via useNowMinutes(). Date line (font-serif, 16px, ink-4). Below clock: current block name + total study time. Mobile prayer strip (horizontal scroll) above clock shows all prayers with status (✓ done / ● now / countdown). Uses ui/ components. Prominent task card with phase badge header and progress strip. 2-column responsive grid: DayPlanner+prayer-panel card (left), sticky sidebar with Pomodoro timer, Log button, Quick Stats (right). SR alert banner. Log modal with status grid (complete/partial/missed/rest), eMedici input, optional question logging. Block state managed with hasGeneratedRef guard to prevent template overwrite. Debounced block saves (500ms) with "Saved" flash indicator. Toast notification (top-right, 3s) for prayer time changes. Prayer panel (desktop, 256px fixed right inside DayPlanner card): each prayer row shows name, location icon, time, duration, countdown, inline edit (pencil → time+duration inputs → save). Prayer edit calls `onPrayerTimeChange` → updates Supabase settings + cascades prayer block times in blocks array. Props: +`updateSettings` (from App.jsx via useUserSettings).

### Plan (`src/screens/Plan.jsx`)
Study plan with phase summary cards (clickable to filter), row-based task list with status dots, inline badges. Tabs2 filter bar + search input. Each task row shows: number, status dot (green=done, blue=next, gray=pending), title with milestone star, phase badge, eMedici target, status badge, completion/projected date. Edit modal for completed tasks. Uses fallback constants if DB tasks empty.

### SRModule (`src/screens/SRModule.jsx`)
Spaced repetition management. Uses ui/ components including Ring for compliance display. Overdue banner with AlertTriangle icon + action button. Protocol card (blue variant). Subject cards with hit status. Right sidebar: compliance Ring (not just number) + SRDonut, clickable due-today list, retention heatmap (prefers DB subjects over fallback), upcoming 7 days with outline badges. SRModal for rating reviews.

### Analytics (`src/screens/Analytics.jsx`)
10 chart sections in 2-column grid layout. Uses Card2 + SectionHeader + subtitle pattern. Paired charts: Question Bank Progress + SR Compliance (top row), SR Questions + Blueprint Balance, Mock Trend + Mistake Analysis, Retention Map + Study Heatmap. Full-width: Forgetting Curves, SR Timeline. Centered donut chart.

### Questions (`src/screens/Questions.jsx`)
Question session logging screen. **Embedded log form in left column** (not modal) with source segment tabs (eMedici/AMC Recall/MplusX/Other), mode segment tabs (Timed/Untimed/Tutor), subject picker, attempted/correct inputs, note, live accuracy preview with vs-subject-avg comparison badge. Right column: Recharts LineChart accuracy trend (30d) with best/worst subject stats below. Bottom row: session history list with filter-by-subject, subject accuracy Bar chart. 4 KPI tiles (this week, accuracy 7d, today, total). Props: `questionLogs, subjects, settings, addQuestionLog`.

### Mistakes (`src/screens/Mistakes.jsx`)
Mistake review screen. **Add modal** with what-I-got-wrong textarea, subject picker, mistake_type selector (9 types from MISTAKE_TYPES), clinical_area, rule/correction_note textarea, date. **Mistake cards** show type+subject badges, serif topic text, then 2-column colored panels: clinical-area in red-soft, rule in green-soft, plus a bold Rule row below divider. Right sidebar: type distribution colored bars, subject breakdown bars, weekly learning rules list (from recent correction_notes). Filter by subject and type. Props: `mistakes, subjects, addMistake, updateMistake, deleteMistake`.

### MockExams (`src/screens/MockExams.jsx`)
Mock exam tracking screen. Add modal with title, date, total_questions, correct_count, time_minutes, notes, live score preview. **Readiness thresholds**: Unsafe (<55%), Improving (55–62%), Borderline (63–70%), Exam-ready (>70%). Latest mock hero card with **Recharts LineChart** score trend + green 70% reference line + date labels, stats grid. Readiness interpretation panel with active band highlighted. Mock history list. Props: `mockExams, subjects, addMockExam`.

### History (`src/screens/History.jsx`)
Study history calendar screen. Desktop: 340px fixed left calendar + flex right detail panel. Calendar: color-coded cells (green=complete, amber=partial, red=missed, blue=rest), today's cell has navy ring outline, SR-done days show purple dot below date, cell hover shadow lift, future days dimmed. Month navigation (prev/next). Day detail: empty state (calendar icon + "Select a day"), serif date heading, status badge, 4-stat row (Task, Questions, Study time as blocks×50min, SR hits), study blocks with green CheckCircle2 for done / strikethrough + 40% opacity for cancelled, SR completed section. Mobile: full-width calendar, tapping day opens bottom sheet (90vh max, scrollable, drag handle, close X). Month summary stats row. Uses useStudyHistory hook with cached month data. Props: `logs, srRecords`.

### Settings (`src/screens/Settings.jsx`)
9 tabs (+ Danger Zone) with scrollable tab bar on mobile. Uses ui/ components (Card2, Button2, Badge2, Tabs2, SectionHeader). Max-width container. All tab sub-components use token classes. Settings.jsx fetches its own data internally via hooks (useAuth, useUserSettings, useSubjects, useTasks, usePhases, useScheduleTemplates, useAppSettings, useSubscription). Manages `upgradeOpen` state to show `UpgradeModal` from the Billing tab.

**Mode-aware tabs (USM Session 3)**: `mode = getAppMode(settings)` decides the tab list.
- Exam (unchanged, byte-identical): Exam Setup · Subjects · Tasks · SR Settings · Daily Routine · Study Plans · Phases · Import/Export · Billing · Danger Zone
- University: Term Setup (S14: + Semester Wrapped preview card) · {plural from useTerminology — re-labels live} · Timetable (`TimetableTab`, S5: class CRUD + rotation anchor) · Grading (S12: + support_services_url field) · Daily Routine (S12: `PlanningControlCard` dial above the reused `DailyScheduleSettings`) · LMS Sync (`LmsSyncTab`, S11: feed list + Sync now + import flow) · Notifications (`NotificationsTab`, S14: toggles + quiet hours + permission) · Import/Export (`UniImportExportTab`, S14: JSON/CSV/PNG free + .ics/PDF Pro) · Danger Zone (`UniDangerZoneTab`: delete-active-term with type-term-name-to-confirm + shared account cards)
- Admin tabs (Audit Log, Feature Flags) append in both modes. Heading swaps to "Customise your semester" in uni mode. Uni tab components live in `src/components/Settings/uni/` and self-fetch via the USM hooks (only the active tab mounts, so exam users never run uni queries and vice versa — the exam-mode hooks at the top of Settings.jsx still run in uni mode, returning empty data; accepted).

## Components

### AIAdvisor (`src/components/AIAdvisor/AIAdvisor.jsx`)
Props: `userId`. Fetches AI advice via `getStudyAdvice()`. Shows assessment, achievable badge, priority list with urgency colors, 7-day weekly plan, smart reschedule suggestion. 4-hour localStorage cache. Refresh button.

### Charts (6 components in `src/components/Charts/`)
- **EMediciAreaChart**: Cumulative eMedici questions over time (area chart)
- **ForgettingCurves**: Ebbinghaus retention decay per subject with SR review sawtooth jumps
- **RetentionMap**: Grid of colored squares per subject showing current retention %
- **SRDonut**: Donut chart of done/pending/overdue SR reviews
- **SRTimeline**: Horizontal Gantt chart of SR review dates
- **StudyHeatmap**: GitHub-style calendar heatmap from study start to exam

### ui/ (design system components in `src/components/ui/`)
Primary component library used by all screens. Barrel-exported from `index.js`.
- **Card2**: `variant` (default/flat/highlight), `padding` (sm/md/lg/none). Rounded card with shadow.
- **Button2**: `variant` (primary/secondary/ghost/danger/success/amber), `size` (sm/md/lg), `block`. Rounded button.
- **Badge2**: `variant` (gray/green/amber/red/blue/purple/navy/outline), `dot` flag. Pill badge.
- **Bar**: `value`/`max`, `color` (default `var(--navy)`), `size` (thin/default/thick). Horizontal progress bar.
- **Ring**: SVG circular progress. `value`/`size`/`stroke`/`color`, `children` for center content.
- **Tabs2**: Pill-style segmented tabs. `tabs` array, `active`, `onChange`.
- **Toggle**: On/off switch. `checked`/`onChange`/`label`.
- **Field**: Form field with label + input/select/textarea, focus ring.
- **KPITile**: `label`/`value`/`sub`/`icon`/`color`/`children`. Value at 32px mono.
- **SectionHeader**: Uppercase title + optional `action` ({ label, onClick }) link.
- **SectionHd**: Lightweight section header. `children` + optional `action`/`actionOnClick`.
- **Card**: Simple white card. `className`/`style` passthrough. `bg-white border border-[#E5E8EE] rounded-[16px] shadow-sm`.
- **Badge**: Pill badge. `variant` (green/amber/red/blue/purple/navy/outline). Direct import only (not in barrel).
- **Button**: Simple button. `variant` (primary/secondary/ghost). Direct import only (not in barrel).
- **EmptyState**: `icon`/`title`/`message`/`action`. Placeholder for empty sections.
- **LoadingState**: Spinner + optional message, `inline` mode.

### Common (6 legacy components in `src/components/Common/`)
Kept for backward compatibility. Modal is still used by all screens. Badge/Button/Card still used by SRSubjectCard, AIAdvisor, DailyScheduleSettings.
- **Badge**: `variant` prop (blue, green, amber, red, purple, gray)
- **Button**: `variant` (primary, secondary, danger, amber), `size` (sm, md, lg)
- **Card**: `className` passthrough, rounded-[14px] white card
- **LoadingSpinner**: Fullscreen centered spinner
- **Modal**: `open`, `onClose`, `title`, `width` props, backdrop click to close
- **ProgressBar**: `value`, `max`, `color` props

### DayPlanner (`src/components/DayPlanner/`)
- **DayPlanner.jsx**: Smart daily schedule builder. Per-block Start/Pause timer with visual states: active (red bg/border, "● ACTIVE" + countdown), paused (amber, "⏸ Paused"), ready (amber, "▶ Ready"), done (green, "✓ Done"). After 50min: block auto-marked done, break auto-starts (toggle()). Break rows gray + non-interactive, show "Break · 10 min" / "Long Break · 30 min" with countdown when active. Last 60s warning beep every 10s. Pause cascade: adjusts block end = nowMin + remaining, calls recalculateBlockTimes from that idx, amber flash on shifted blocks. Single "+ Add Break" button at bottom (manualBreak: true). Drag-and-drop reorder, editable labels/times. Schedule-changed banner. `recalculateBlockTimes(blocks, anchorIndex)` imported from blockGenerator — fixed blocks (prayer/gym/cdpath) are barriers in cascade.
  Props: `blocks`, `setBlocks`, `saveBlocksDebounced`, `saveBlocksNow`, `todayStr`, `settings`, `nowMin`
  Timer state: `activeBlockIdx`, `breakingAfterIdx`, `readyBlockIdx` tracked locally; syncs with TimerContext.
  **Block timer persistence**: On Start → writes `{isActive:true, activatedAt:ISO}` to block object + calls `saveBlocksNow` immediately (no debounce). On Pause → writes `{isPaused:true, pausedAt, pausedSecondsRemaining}` + `saveBlocksNow`. On block complete → `{isActive:false, done:true}` + `saveBlocksNow`. Mount effect + `visibilitychange` listener both call `restoreActiveBlock()`: finds block with `isActive:true`, calculates remaining = `50*60 - elapsed(activatedAt)` or `pausedSecondsRemaining`, sets `activeBlockIdx`, calls `resumeForBlock` to restart timer at correct remaining time.
- **blockGenerator.js**: `generateBlocks(startTime, endTime, dayType, commitments, prayerBlocks)`. 50-min study + 10-min break pattern. 30-min long break every 3 blocks. Fixed blocks (prayers, gym, CD path) as immovable barriers. Merges overlapping fixed blocks. Also exports `recalculateBlockTimes(blocks, anchorIndex=0)` (new — cascades from anchor, skips fixed-type blocks), `getBlockStats()`, `getDayType()`, `timeToMin()`, `minToTime()`.

### Layout (`src/components/Layout/`)
- **Layout.jsx**: `100vw/100vh` flex shell. Navy sidebar hidden below `lg:`. Main content area: white, flex-1, `overflowY: auto`, `pb-[72px] lg:pb-0` for mobile tab bar clearance.
- **Sidebar.jsx**: 240px navy (`var(--navy)`) sidebar. Logo lockup (30px icon + "AMC Tracker" / "Command Centre"). 10 nav items + optional Admin link (ShieldCheck icon, shown only when `user.email === ADMIN_EMAIL`). Active state: white text, `rgba(255,255,255,0.12)` bg, 3px solid white left border; idle: 55% opacity. Mini timer row (MM:SS + mode label + sound toggle button). User email + Sign Out button. All inline styles using CSS vars. Imports `ADMIN_EMAIL` from `src/lib/adminApi.js`.
- **TopBar.jsx**: No-op (returns null). Kept so existing imports don't break.

### SR (`src/components/SR/`)
- **SRModal.jsx**: Rating selection (blackout/hard/medium/easy), question count input with target display, warning when below target. Props: `open`, `onClose`, `subjectName`, `hitLabel`, `onSave`, `loading`
- **SRSubjectCard.jsx**: Shows subject name, completion date, SR1/SR2/SR3 hit rows with status, due dates, ratings, question counts. "Mark Done" button for due hits.

### Settings (`src/components/Settings/`)
- **DailyScheduleSettings.jsx**: Three sections: Prayer Times (5 rows with name, mosque/home toggle, start time, duration, end time calc, include checkbox), CD Path schedule (enable toggle, 7-day selector, departure/return times, label), Gym schedule (same). Week preview grid. Single save button.

### Timer (`src/components/Timer/`)
- **PomodoroTimer.jsx**: Circular SVG timer. Shows mode (Focus/Break/Long Break), MM:SS, current block label. Start/Pause, Reset, Sound toggle (mute/unmute) buttons. Block count display.

## Hooks

### useAuth (`src/hooks/useAuth.js`)
Returns: `{ user, loading, signIn, signUp, signOut }`. Wraps Supabase auth with session listener.

### useDailySchedule (`src/hooks/useDailySchedule.js`)
Params: `settings` object. Parses `prayer_times`, `cdpath_schedule`, `gym_schedule` from settings.
Returns: `{ prayers, cdpath, gym, getCommitmentsForDate(dateStr) }`. `getCommitmentsForDate` returns `{ dayType, commitments, prayerBlocks }`.

### useStudyLog (`src/hooks/useStudyLog.js`)
Returns: `{ logs, loading, upsertLog, deleteLog, updateBlocks }`. Upserts by user_id+date unique constraint.

### useSRRecords (`src/hooks/useSRRecords.js`)
Returns: `{ srRecords, loading, createSRRecord, createTopicSR, getReviewQueue, completeSRHit, deleteSRRecord, rescheduleSRFromToday }`. `completeSRHit(subjectName, hit, rating, questions)` calculates next due dates. **EMP Session 17 (unified review engine)**: `createTopicSR(subjectId, topicLabel, sourceType='topic', sourceId, sr1Interval)` creates a standalone topic-/mistake-level SR record (delegates to `SRService.createTopicSR`, which no-ops on a duplicate subject_name and degrades when the source columns are missing); `getReviewQueue({mistakes, subjects})` returns the unified due-review queue sorted overdue-mistakes → due-subject-SR → due-topic-SR (enforces SR hit order; `source_type` NULL = `subject_milestone`).

### useUserSettings (`src/hooks/useUserSettings.js`)
Returns: `{ settings, loading, error, updateSettings, refetch }`. Falls back to DEFAULT_SETTINGS if table missing.

### useSubjects (`src/hooks/useSubjects.js`)
Returns: `{ subjects, loading, addSubject, updateSubject, deleteSubject, reorderSubject }`. `addSubject` auto-generates class tasks + milestone consolidation task, links milestone_task_id back to subject.

### useTasks (`src/hooks/useTasks.js`)
Returns: `{ tasks, loading, addTask, updateTask, deleteTask, reorderTask }`.

### usePhases (`src/hooks/usePhases.js`)
Returns: `{ phases, loading, addPhase, updatePhase, deletePhase, reorderPhase }`.

### useScheduleTemplates (`src/hooks/useScheduleTemplates.js`)
Returns: `{ templates, assignments, loading, getTodayTemplate, getTodayBlocks, createTemplate, updateTemplate, deleteTemplate, assignTemplate }`.

### useQuestionLogs (`src/hooks/useQuestionLogs.js`)
Returns: `{ questionLogs, loading, addQuestionLog, updateQuestionLog, deleteQuestionLog, totalQuestions, totalCorrect, overallAccuracy }`.

### useMistakeLogs (`src/hooks/useMistakeLogs.js`)
Returns: `{ mistakes, loading, addMistake, updateMistake, deleteMistake, getByType, getBySubject, scheduleMistakeReview, getDueMistakeReviews, getOverdueMistakeReviews, getMistakeReviewStats }`. Exports `MISTAKE_TYPES` constant (9 types) and `nextReviewInterval(reviewCount)`.

**Mistake review loop (EMP Session 3)**: `addMistake` auto-sets `next_review = today + 1` (falls back to a plain insert if the `exam_improvements_001.sql` migration hasn't been run). `scheduleMistakeReview(id, 'shaky'|'resolved')` — resolved sets `resolved=true, next_review=null`; shaky reschedules on the 1→3→7→14-day ladder keyed by `review_count` (then increments it). `getDueMistakeReviews()` = `next_review ≤ today AND NOT resolved`, ascending; legacy rows with `next_review` NULL are never due. `getMistakeReviewStats()` → `{ total, resolved, pending, overdue, dueToday }`.

**Mistake → SR graduation (EMP Session 17)**: `scheduleMistakeReview` returns `{error, graduated}`. When a mistake is marked shaky for the 3rd time (`review_count >= 3` after increment, still unresolved) it auto-creates a topic-level SR record (`SRService.createTopicSR`, source_type 'mistake', source_id = mistake id, topic_label = short_note ≤60ch) and sets `graduated:true` — surfaced as a toast in SRModule and Today. Idempotent (createTopicSR no-ops on the duplicate subject_name).

### useMockExams (`src/hooks/useMockExams.js`)
Returns: `{ mockExams, breakdowns, loading, addMockExam, updateMockExam, deleteMockExam, saveBreakdown, getBreakdown, getAllBreakdowns, latestMock, avgPercentage, refetch }`. Auto-calculates percentage on insert/update. `breakdowns` is an object keyed by mock_exam_id → array of breakdown rows, fetched once at init. `addMockExam` returns `{ error, id }`. `saveBreakdown(mockExamId, rows)` deletes existing breakdown then inserts new rows.

### useStudyHistory (`src/hooks/useStudyHistory.js`)
Params: `logs`, `srRecords`. Returns: `{ getMonthData, getDayDetail }`. `getMonthData(year, month)` returns array of day objects with date, day, dow, status, eMedici, hasSR (purple dot indicator), blocks. Cached in useRef Map keyed by year-month-lengths to avoid recomputation on re-renders. `getDayDetail(dateStr)` returns log, blocks, srCompleted array, studyMinutes (doneBlocks × 50), doneBlocks, totalStudyBlocks.

## Contexts

### TimerContext (`src/contexts/TimerContext.jsx`)
Global Pomodoro timer state using wall-clock timestamp approach (startedAt + totalDuration refs) for accurate countdown even across tab switches. Persisted to localStorage (`amc_timer_state`) with start timestamp for refresh recovery. Uses `visibilitychange` listener to resync on tab focus. Bootstraps old localStorage state format (isRunning but no startedAt) for backward compatibility.

**State**: mode (work/break/long), secondsRemaining, isRunning, blockCount, currentBlockLabel, soundEnabled

**Constants**: WORK_SECS=3000 (50min), BREAK_SECS=600 (10min), LONG_BREAK_SECS=1800 (30min)

**Sounds** (Web Audio API):
- Start chime: 523Hz (C5), 0.5s
- End chime: 523-659-784Hz (C5-E5-G5), ~1.5s ascending
- Break-end chime: 659-523Hz (E5-C5), ~1.0s descending

**Provides**: mode, secondsRemaining, isRunning, blockCount, currentBlockLabel, totalSecs, soundEnabled, toggle, reset, startForBlock, resumeForBlock, toggleSound, WORK_SECS, BREAK_SECS, LONG_BREAK_SECS
- `startForBlock(label)`: resets to WORK_SECS, plays start chime, starts timer
- `resumeForBlock(label, remainingSeconds)`: starts timer at custom duration (no chime) — used to restore mid-block state after tab/device switch

## Utility Libraries

### supabase.js
Exports: `supabase` client instance from `@supabase/supabase-js`.

### constants.js
Exports: `EXAM_DATE` ('2026-08-17'), `CHART_START` ('2026-05-04'), `TASKS` (77 hardcoded task objects with id/phase/title/subject/eQty/isMilestone), `SUBJECTS` (18 subjects with name/tier/srHits/milestoneId).

### dateUtils.js
Exports: `formatDate(date)` -> 'yyyy-MM-dd', `formatDisplay(date)` -> 'EEEE, d MMMM yyyy', `formatShort(date)` -> 'd MMM', `today()` -> today's date string, `todayDate()` -> Date object, `daysBetween(a, b)`, `addDaysToDate(dateStr, n)`, `isCDPathDay(date)` -> bool (Mon/Wed), `daysUntilExam(examDate)`.

### studyUtils.js
Exports:
- `getNextTask(logs, tasks)` — First incomplete task by sort_order
- `getNextTaskNum(logs, tasks)` — Sort order of next task
- `getDeficit(logs, tasks)` — Sum of (target - done) eMedici questions
- `getTotalEMedici(logs)` — Sum of all e_medici values
- `getStreak(logs)` — Consecutive complete days ending today
- `getPhaseProgress(logs, tasks)` — { phase1: {done, total}, phase2, phase3 }
- `getProjectedDates(logs, tasks, settings)` — Projected completion dates for undone tasks based on pace + rest days
- `calcRetention(lastReviewDate, stability)` — Ebbinghaus formula: 100 * e^(-t / (stability * 14))
- `getStability(srRecord)` — Returns stability multiplier based on SR hit progress
- `getSRDue(srRecords, settings)` — Array of due/overdue SR reviews with labels
- `completesSRHit(srRecord, hit, rating, settings)` — Calculates next SR due date based on rating intervals (blackout=3, hard=7, medium=14, easy=21 days) and multipliers
- `getReadiness(logs, srRecords, tasks, questionLogs?, mockExams?)` — Composite readiness score (0-100): Tasks×40 + SR×30 + eMedici×30. Zero records = zero score (not inflated). Returns `{ score, taskScore, srScore, eMediciScore, questionScore:0, mockScore:0, explanation }`
- `getDailyRecommendation({...})` — Generates today's recommendation message with priorities and warnings
- `getBlueprintBalance(subjects, tasks, logs, questionLogs)` — Completion and accuracy per AMC blueprint category
- `getPassLine(examType)` — EMP S5: pass reference score per exam (amc_mcq 65, plab1 65, usmle_step1 60 ≈ pass-equivalent, custom/legacy 65)
- `projectReadinessToExamDate(mockExams, questionLogs, subjects, tasks, settings, logs)` — EMP S5: trajectory-based "will I pass?" projection. Least-squares regression on dated mock percentages extrapolated to `exam_date`; ±1 SD residual confidence band (min ±3 pts); 14-day question accuracy blended at 0.2 weight when ≥30 Qs logged; coverage <50% applies a (50−coverage)×0.15 headline penalty (blend + penalty adjust the headline only — `trendLine` stays pure regression for charting). Returns `{ projectedScore, confidenceLow/High, passLine, margin, trend, trendSlope (pts/wk, ±0.5 thresholds), coverage, dataPoints, verdict: 'comfortable'\|'borderline'\|'at_risk'\|'insufficient_data', verdictMessage, examPassed, mockTrend, trendLine [{date, projected, low, high}] }`. Verdicts: comfortable = ≥passLine+10 AND confidenceLow ≥ passLine; borderline = ≥passLine; at_risk = below. <2 mocks / no exam date / exam passed → insufficient_data with honest message. Fixtures traced: 50/60/70 weekly → 80 (77–83)
- `rankWeakAreas(subjects, questionLogs, mockBreakdowns, mistakeLogs)` — EMP S6: per-subject composite weakness score (0-100, higher = weaker) from accuracy (40%) + coverage (25%) + mock accuracy (25%) + mistake share (10%); components with no data drop out and their weight redistributes across the rest. `mockBreakdowns` accepts the `useMockExams.breakdowns` keyed object OR a flat array. Returns subjects with ≥1 signal, weakest first: `[{ subjectId, subjectName, blueprintCategory, weaknessScore, accuracy, coverage, mockAccuracy, mistakeCount, hasData, actionSuggestion }]`. `actionSuggestion` ∈ {Do a focused qbank session, Cover more of the syllabus first, Review your mistakes in this area, Take a timed practice block} — drives the Analytics Focus Areas panel navigation (qbank→/questions, coverage→/plan, mistakes→/mistakes).
- `getConsistency(studyLogs, window=7)` — EMP S6 (Improvement #17, streak reframe): counts active days (status complete, OR partial with partial_pct ≥ 50) in the last `window` days. Returns `{ activeDays, windowDays, pct, message, isHealthy (≥4), days: [{date, kind: 'active'|'rest'|'none'}] (oldest→newest) }`. Rest days are a calm signal, never failures — `kind:'rest'` renders blue, `none` neutral gray, never red. Messages: 6-7 strong / 4-5 good rhythm / 2-3 getting back / 0-1 time to restart.

### timerSounds.js
Extracted from TimerContext. Exports: `playStartChime()` (523Hz, 0.5s), `playEndChime()` (C5→E5→G5 ascending), `playBreakEndChime()` (E5→C5 descending), `playWarningBeep()` (440Hz, 0.1s, vol 0.15), `getSoundEnabled()` (reads `amc_timer_sound` from localStorage). All play functions check `getSoundEnabled()` before playing. TimerContext imports `getSoundEnabled` + all three chime functions; DayPlanner imports `playWarningBeep`.

### aiAdvisor.js
Exports: `getStudyAdvice(userId, { forceRefresh })`, `clearAdvisorCache()`. 4-hour localStorage cache. Calls Supabase RPC `get_ai_advisor_data`, then POSTs to `/api/ai-advisor`.

### defaultSeedData.js
Exports: `DEFAULT_SETTINGS`, `DEFAULT_PHASES` (3), `DEFAULT_SUBJECTS` (18), `DEFAULT_TASKS` (77), `DEFAULT_SCHEDULE_TEMPLATES`, `DEFAULT_SCHEDULE_ASSIGNMENTS`.
`DEFAULT_SETTINGS` includes `onboarding_complete: false` — new users get this value when their settings row is first created.

### seedUserData.js
Exports: `ensureUserSetup(userId)`, `forceReseed(userId)`.
**Behavior for new users** (`onboarding_complete === false`): Step 1 inserts the settings row with `onboarding_complete: false`, then returns early. Steps 2–11 (phases, subjects, tasks, study_log, SR, schedule templates) are skipped — the onboarding wizard handles plan creation.
**Behavior for existing/legacy users** (`onboarding_complete = null` or `true`): Full idempotent seeding of all tables as before.
`forceReseed(userId)` clears all tables and re-runs full seeding.

### planGenerator.js
Exports:
- `createPlanFromOnboarding({ examType, examDate, startDate, dailyHours, daysPerWeek, subjectList, importedPlan })` → `{ phases[], subjects[], tasks[] }` — pure function, no network calls. If `importedPlan` is provided, returns it directly. Otherwise generates: Phase 1 (foundation tasks, 50% question target), Phase 2 (consolidation+milestone tasks, full target), Phase 3 (mock exam tasks, count = bufferDays/14).
- `parsePlanMarkdown(text, examType)` → `{ plan, error }` — parses ChatGPT JSON output. Validates phases array, maps subjects/topics to DB-ready rows. Returns `error` string on failure.
- `savePlanToSupabase(supabaseClient, userId, { phases, subjects, tasks })` → `{ error }` — inserts phases → subjects → tasks in order (batched 20). Backfills `milestone_task_id` on subjects after task insert.

### adminApi.js
Exports: `ADMIN_EMAIL` ('ias.ndc@gmail.com'), `isAdmin(user)`, `listUsers()`, `deleteUser(userId)`, `getAdminStats()`.
All functions call `POST /api/admin` with the caller's Supabase session token. The server verifies the token and checks the email matches `ADMIN_EMAIL` before executing.

## API Routes (Vercel Serverless)

### POST /api/ai-advisor
File: `api/ai-advisor.js`

Proxies requests to OpenAI Chat Completions API using gpt-4o-mini with `response_format: { type: 'json_object' }`. Receives `{ studyData }` body from client (output of `get_ai_advisor_data` RPC). Returns `{ advice }` with structured JSON: assessment, achievable (bool), priorities (3-5 items), weeklyPlan (7 days), reschedule suggestion.

Env: `OPENAI_API_KEY` (server-side only).

### POST /api/admin
File: `api/admin.js`

Admin-only endpoint. All actions require a valid Supabase JWT in `{ token }` body field — server verifies via `GET /auth/v1/user` and checks email matches `ADMIN_EMAIL = 'ias.ndc@gmail.com'`.

Actions:
- `list_users` — returns all auth users sorted by last_sign_in_at desc (id, email, created_at, last_sign_in_at, email_confirmed_at)
- `delete_user` — deletes user by `{ userId }` from auth.users (ON DELETE CASCADE cleans all 12 data tables automatically). Cannot delete own account.
- `get_stats` — returns `{ total, activeThisWeek, activeThisMonth, newThisWeek }` counts

Env: `SUPABASE_SERVICE_ROLE_KEY` (secret service role key, never exposed to client), `SUPABASE_URL` (falls back to `VITE_SUPABASE_URL`).

### POST /api/log-failed-login
File: `api/log-failed-login.js`

Receives `{ email }`; inserts a row into `auth_failed_attempts` via the service role key for audit (Auth/Security Session 10 failed-login rate limiting). No auth header (runs pre-sign-in). Returns `{ ok: true }` even when the service key is missing — client-side rate limiting (`loginRateLimit.js`) is the primary protection; this endpoint is the audit trail only.

Env: `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL` (falls back to `VITE_SUPABASE_URL`).

> Other serverless functions on disk (documented in prose, not repeated here): `api/ical-fetch.js` (USM iCal CORS proxy), `api/send-otp.js` + `api/verify-otp.js` (phone OTP), `api/verify-captcha.js` (reCAPTCHA v2 siteverify).

## Key Business Logic

### SR Calculation (Ebbinghaus-based)
Rating intervals: blackout=3d, hard=7d, medium=14d, easy=21d.
- SR1 due: `completed_date + sr1_interval` (default 7 days)
- SR2 due: `sr1_done_date + (rating_interval * sr2_multiplier)` (default 1.5x)
- SR3 due: `sr2_done_date + (rating_interval * sr3_multiplier)` (default 2.0x)
- Retention: `100 * e^(-days_since_review / (stability * 14))` where stability = 1 (no SR), 2 (SR1 done), 3.5 (SR2 done), 6 (SR3 done)

### Readiness Score (0-100)
- Tasks: 35 points (% completed * 35)
- SR: 25 points (compliance % * 25)
- Questions: 25 points (total done / expected * 25)
- Mocks: 15 points (count + average score weighted)

### Task Deficit
Sum over completed tasks: `(task.emedici_qty - log.e_medici)` when positive. Represents how many questions behind target.

### Block Generation Algorithm
`generateBlocks(startTime, endTime, dayType, commitments, prayerBlocks)`:
1. Build fixed blocks array (prayers from settings or defaults + commitments from settings or dayType fallback)
2. Merge overlapping fixed blocks
3. Walk from startTime to endTime:
   - 50-min study blocks with 10-min breaks
   - Long 30-min break every 3 study blocks
   - Skip around fixed blocks, split study blocks if needed
   - Minimum 20-min for partial study block, skip if <20min gap
4. Sort all blocks by start time, renumber study blocks sequentially

### Prayer Time Integration
Prayer times from user_settings.prayer_times jsonb array. Each prayer has: name, start time, duration, location (mosque/home), include flag. Home prayers are cancellable in the block generator. Included prayers become fixed blocks that study blocks must schedule around.

## Study Logic Rules

- Tasks must be completed in sort_order sequence (one per day)
- SR records auto-created when a milestone task is completed
- SR hits must be completed in order: SR1 -> SR2 -> SR3
- SR ratings determine next review interval via RATING_INTERVALS
- Pomodoro: 50min work -> 10min break -> repeat, 30min long break every 3 blocks
- A day can only have one study_log entry (UNIQUE user_id, date)
- Completing a milestone task triggers SR tracking for that subject
- Study blocks must schedule around fixed blocks (prayers, gym, CD path)

## Feature Completion Status

**Exam Mode** — complete. All screens shipped: Dashboard (readiness projection, Go/No-Go card, sprint panel, burnout radar, T-minus checklist, qbank progress), Today (DayPlanner + mistake review loop + pomodoro), Plan (list/timeline/sprint views + exam timeline), SR Module (unified review queue across mistakes + topic SR + subject milestones), Questions (confidence tagging, first-pass accuracy), Mock Exams (subject breakdown, pace tracking), History, Analytics (13+ charts including pass probability trajectory, exam pace, weak-area focus areas), Mistakes, Settings (all tabs + Notifications + Billing + Danger Zone), Rapid-Review Sheet (`/review-sheet`), Exam Progress Report (`/report`).

**University Mode** — MVP complete (Sessions 1–14). All 8 routes real: UniDashboard, UniToday, SemesterPlan (list/timeline/kanban), UnitDetail, Grades (all 4 sections), Timetable, UniAnalytics (7 charts), GradeReport. Intelligence layer: deterministic AI planner (lock rule — AI never overrides human), deadline bunching radar, Week 3-4/6 check-in state machine, planning fallacy correction, SR Lite + Full SR bridge, exam revision planner. LMS iCal import + daily re-sync (Canvas/Moodle/Blackboard/D2L + generic). Exports (JSON/CSV/PNG/ICS). Semester Wrapped. Free/Pro gates wired to admin `subscription_activated` switch (everything free until flipped).

**Infrastructure**: dark mode (sidebar toggle, CSS vars, Tailwind overrides), subscriptions + trials + admin controls, Google OAuth + phone requirement, profile + avatars (Supabase Storage), mobile bottom tab bar, Vercel deployment + security hardening (CSP/HSTS/RLS/rate-limits/source-maps), bundle split (~269 KB main chunk), SEO marketing pages + sitemap.

**Active notes (not bugs):**
- `supabase/schema.sql` is a legacy file predating `full_schema.sql` — use `full_schema.sql` for DB reference
- OpenAI billing required for AI advisor (`gpt-4o-mini`)
- Unused Vite boilerplate: `src/App.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`
- Schedule Templates table exists in DB and Settings UI but Today uses the DayPlanner block generator directly — templates are not wired for actual daily scheduling

- **EMP Session 1 — LogSessionFab + Qbank import parser (2026-06-13, `emp` branch)**: `src/components/LogSessionFab.jsx` (exam-mode FAB, the QuickAddFab counterpart — same position/hidden-prefixes; mobile bottom sheet with swipe-down dismiss / desktop popover above the FAB; source Tabs2 from `question_bank_name` + Other free-text, attempted/correct with auto-cap, live accuracy badge ≥70 green / 55–69 amber / <55 red, optional subject ("General / Mixed" = null subject_id) + backdated date + note; saves `mode:'mixed'` rows via its own `useQuestionLogs` instance — the panel mounts only on open so the fetch is deferred; after save: toast + green flash + fields reset but source remembered for rapid re-entry). Lazy-mounted in App.jsx for `mode === 'exam'` only (own chunk; never on landing/auth/onboarding/USM/admin). `src/lib/qbankImport.js` (`parseQbankReport` — 3 formats: tab/comma rows, "Subject: 45/60 (75%)" correct/total, "Total: 120 questions, 84 correct" emitted only when no per-subject rows; `matchSubjectByName` fuzzy matcher, `toQuestionLogPayload` strips the preview-only `_subjectName`, `toBreakdownRows` for EMP Session 2; 8 fixtures traced in Node). `src/components/QbankImportModal.jsx` (presentational — parent passes subjects/settings/addQuestionLog; paste → Parse → editable preview table with unmatched-subject fallback + red correct>attempted flag that disables import → loop-insert with success-count toast) mounted from Questions.jsx ("Paste results" ghost button on the log-form header) and Settings → Import/Export ("Paste Qbank Results" card; the tab calls `useQuestionLogs` itself). Verified live in preview as an exam user: FAB on Dashboard/Today/Questions, hidden on /settings, auto-cap 25→20, save → row in Recent sessions, 3-row mixed-format paste imported with fuzzy subject match; test rows cleaned up after. Exam screens otherwise untouched; legacy/USM users unaffected.
- **EMP Session 2 — Mock Exam Subject-Level Breakdown UI (2026-06-13, `emp` branch)**: `useMockExams.js` gains `breakdowns` state (object keyed by mock_exam_id → breakdown rows array), `fetchAllBreakdowns()` (groups all user's breakdown rows at init), `saveBreakdown(mockExamId, rows)` (delete-then-insert), `getBreakdown(mockExamId)`, `getAllBreakdowns()`; `addMockExam` now returns `{error, id}` via `.select('id').single()`. `MockExams.jsx` rewritten: (A) Add mock modal gains a collapsible "Per-subject breakdown" section — zebra-striped rows from `useSubjects`, total/correct inputs with `inputMode="numeric"`, live accuracy % per row (green ≥70 / amber 55–69 / red <55), mismatch warning Badge when breakdown total ≠ mock total; saves breakdown via returned mock ID after insert. Separate "Edit Breakdown" modal (opened from latest-mock card button or history row click when no breakdown exists) with same form + pre-population from `getBreakdown`. Mock history rows show "· breakdown" in blue when data exists. (B) `SubjectPerformanceSection` component: computes per-subject avg accuracy, trend (improving/declining/flat ±3%), mock count from all breakdowns; renders a Recharts `BarChart` (accuracy by subject, last 3 mocks with breakdown data, 70% reference line, up to 8 subjects) + a "Weakest subjects" list sorted by avg accuracy ascending (TrendingUp/TrendingDown/Minus icons, accuracy Badge2, "across N mocks" caption). Returns null when no breakdown data. (C) `Analytics.jsx` gains `MockSubjectTrend` component: Recharts `LineChart` with one line per subject (top 5 most-tested), X-axis mock dates, Y-axis 0–100%, 70% green dashed pass reference line, `connectNulls` enabled; uses `SUBJECT_LINE_COLORS` array; card only renders when `breakdowns` has data. Placed after Mock Trend / Mistake Analysis row. QA verified: all 4 seed mocks show breakdown indicator, Subject Performance section renders with 5 subjects, Analytics chart renders with correct data, zero console errors from Session 2 code.
- **EMP Session 3 — Mistake → Review → Re-test loop (2026-06-13, `emp` branch)**: `migrations/exam_improvements_001.sql` (mistake_logs review columns + columns reserved for EMP Sessions 4/7/8+; idempotent, run manually in Supabase SQL editor). `useMistakeLogs` gains the review loop (see hook section): auto next_review on add, `scheduleMistakeReview` 1→3→7→14-day ladder, due/overdue/stats selectors, missing-column fallback so the Mistakes screen keeps working pre-migration. `src/components/today/MistakeReviewSection.jsx` — Today-screen review queue (left column, below Study Blocks; hidden when nothing is due): per-card subject + type badges, the `short_note`, correction_note hidden behind "Recall the rule, then tap to check" (the test-yourself moment), Still shaky (amber, reschedules) / Got it (green, resolves + card animates out). `blockGenerator.generateBlocks` accepts a 7th param `dueMistakeCount` — when > 0 a 15-min draggable/tickable/removable `'mistake_review'` block (purple accent, REVIEW badge, NOT in FIXED_TYPES) is inserted after the first study block on generate; wired Today → StudyBlocksSection → DayPlanner (`dueMistakeCount` prop). Legacy users: next_review NULL on all rows → no section, no block, byte-identical Today screen.
- **EMP Session 4 — Qbank pool settings, first-pass progress lib, Dashboard card, Plan strip (2026-06-13, `emp` branch)**: `user_settings.qbank_pool` jsonb column (reserved in `exam_improvements_001.sql` — no new migration needed). `src/lib/qbankProgress.js` — pure lib with 5 traced fixtures: `getFirstPassProgress(questionLogs, qbankPool)` sums `questions_done` per source into `{source, done, total, pct, remaining}`; `getFirstPassProjection(…, examDate)` adds 14-day rolling `avgDaily`, `projectedCompletionDate`, `daysBeforeExam`, `hasTimeForSecondPass` (≥21 days buffer), and a prose `message` (pace-to-finish / no-second-pass / after-exam warning variants); `getSecondPassRecommendation(…, subjects)` returns `weakSubjects` (<70% accuracy, sorted asc, top 5) once ≥90% of every pool is done. `src/components/Settings/ExamSetupTab.jsx` gains a **Question Bank Pools** card: rows of source name + total Qs inputs with Add/Remove, auto-seeded from `question_bank_name` on first open, saves `qbank_pool` via the existing `updateSettings` call. `src/screens/Dashboard.jsx` gains a **"Qbank First-Pass Progress"** card (left column, below AI Advisor): Ring (% done, color green/amber/blue by hasTimeForSecondPass/pace), `done/total` mono headline, secondary qbanks as small rows, prose message in a soft-color chip; when no pool is configured shows a Settings-link prompt card. `src/screens/Plan.jsx` gains a **qbank progress strip** pinned below the filter bar (only when a pool with total > 0 is set): `Bar` in green/amber/red by pace + `source: N% first pass` + `done/total` + 1-line projection message. USM users and legacy exam users without a pool configured see zero change.
- **EMP Session 5 — Calibrated readiness / pass probability projection (2026-06-13, `emp` branch)**: `studyUtils.js` gains `getPassLine(examType)` + `projectReadinessToExamDate(...)` (see studyUtils section — pure regression engine, fixtures traced in Node: 50/60/70 weekly mocks → 80 (77–83) comfortable +10 pts/wk; same-date mocks, 1 mock, flat scores, past exam, missing exam date all handled). `src/components/PassProjectionGate.jsx` — exam-mode ProGate counterpart (isPro prop from `useSubscription`; blurred inert preview + "Upgrade to see your pass projection" pitch card; invisible while `subscription_activated` is off). `Dashboard.jsx` gains a **Readiness Projection card** at the top of the right column (verdict-colored left border + badge green/amber/red/gray, projected score with confidence band "68% (62–75%)" in mono, pass line + signed margin line, trend icon + pts/week + mock count — all inside the gate; verdict message and "Syllabus coverage: N%" note always visible below it; insufficient_data → message + "Log a mock" CTA to /mocks, suppressed when exam date passed); the existing composite ring card stays below it relabelled "Today's study compliance". `Analytics.jsx` gains a **"Pass Probability Trajectory"** full-width card (renders only with ≥2 dated mocks + future exam date): Recharts `ComposedChart` — navy `Scatter` actual mock scores, dashed `CHART_COLORS[0]` regression `Line` extended to exam day, range `Area` confidence band (fillOpacity 0.12, array dataKey [low, high]), green dashed pass-line `ReferenceLine` + red dashed exam-date vertical, numeric time X-axis; chart wrapped in `PassProjectionGate`. Legacy users with 0–1 mocks see the insufficient-data card, never a crash; USM users unaffected (exam screens only).
- **EMP Session 6 — Weak-area engine + consistency reframe (2026-06-13, `emp` branch)**: `studyUtils.js` gains `rankWeakAreas(...)` (composite weakness score; see studyUtils section) and `getConsistency(...)` (streak reframe, Improvement #17). `Analytics.jsx` Blueprint Balance card gains a **"Focus Areas"** panel below the chart (top-5 weakest subjects from `rankWeakAreas`, each: name + blueprint `Badge2`, inverted weakness `WeaknessBar` red≥60/amber≥35/green, one-line diagnosis "45% accuracy · 12% covered · 3 mistakes", `actionSuggestion` `Button2` ghost → navigates to /questions /plan or /mistakes; empty-state copy when no signal). `Dashboard.jsx` gains a **consistency headline strip** at the top of the left column ("{n} of last 7 days" + `getConsistency.message` colored green when healthy + a 7-dot row — active=green, planned rest=blue, missed/none=neutral gray, never red — + "Current streak: N days" secondary line); the **Streak KPI tile is replaced by a "Consistency" tile** ({activeDays}/{windowDays}, → /history). Pure additive — legacy users with no recent study_log get an all-neutral 0/7 strip and "Time to restart" message, no crash. `npm run build` clean.
- **EMP Session 7 — Confidence tagging + first-pass accuracy (2026-06-13, `emp` branch)**: `useQuestionLogs` gains `getFirstPassAccuracy(subjectId?)` + `getShakyCorrects(subjectId?)`. `Questions.jsx` log form adds optional confidence (`confident|unsure|guessed`) + attempt_type (`first|review`) `NullableSegmentBtn` selectors + a first-pass-accuracy KPI tile (5-col grid). `LogSessionFab.jsx` gains compact confidence/attempt selectors saving to DB. `Analytics.jsx` adds `ShakyCorrectsChart` (stacked green/amber/red AreaChart, shown only when ≥5 confidence-tagged logs). Columns from `exam_improvements_001.sql` (`question_logs.confidence/attempt_type`).
- **EMP Session 8 — Shift-aware scheduling (2026-06-13, `emp` branch)**: `blockGenerator.js` adds `'shift'` to `FIXED_TYPES` (shift blocks immovable in `recalculateBlockTimes`). `useDailySchedule.js` parses `work` from `work_schedule` jsonb; `getCommitmentsForDate` emits the shift commitment + an optional morning recovery block after night shifts (shift_end ≥ 22:00 or shift_start ≥ 14:00). `DailyScheduleSettings.jsx` gains a `WorkScheduleSection` + DEFAULT_WORK, saves `work_schedule`, week preview marks shift days. Column from `exam_improvements_001.sql` (`user_settings.work_schedule`).
- **EMP Session 9 — Onboarding restructure (3-step) + Finish-setup banner + Start-a-new-plan (2026-06-13, `emp` branch)**: `OnboardingFlow.jsx` rewritten 5→3 steps (Exam+Date · Study Budget · one-tap Generate with ~2s animation — see the Onboarding section). `quickPlanGenerator.js` gains `buildDefaultConfigsForExam(examType)` (AMC → DEFAULT_AMC_SUBJECTS; PLAB/USMLE → exam-module `subjects`; custom → AMC fallback). `Dashboard.jsx` gains the **"Finish setting up"** soft-blue banner (links to Settings Subjects/Tasks/Daily-Routine + Import-from-AI for AMC; dismissal persists in `checkin_state.onboarding_banner_dismissed`). `Settings.jsx` honors `location.state.settingsTab` (deep-link a tab by label) + passes `user` to `ExamSetupTab`. `ExamSetupTab.jsx` gains a **"Start a new plan"** card + confirm modal → deletes tasks/subjects/phases/task_steps (study_log/question_logs/mock_exams/sr_records/mistake_logs preserved), upserts `{exam_type:null, app_mode:'exam', onboarding_complete:false}`, then `window.location.assign('/')` so App re-reads settings and re-triggers the 3-step wizard. `migrations/exam_improvements_001.sql` adds `user_settings.checkin_state jsonb` (idempotent — re-run it). The old onboarding step files (`OnboardingExamPicker/Dates/PlanMethod/Preview`, `QuickTaskBuilder`, `BulkPaste`, `PlanPreview`) remain on disk, unimported.
- **EMP Session 10 — Final-Month / Revision Sprint mode (2026-06-13, `emp` branch)**: `src/lib/examRevisionPlanner.js` (port of USM `revisionPlanner.js`) — `buildRevisionPlan(subjects, tasks, questionLogs, mockBreakdowns, mistakeLogs, settings, today?)` (per-subject weight = `rankWeakAreas` weakness score, untested subjects get a moderate baseline; weighted round-robin interleave never >2 consecutive blocks; mock blocks on cadence days; final-3-day taper → light_review ≤2 blocks; exam-eve = rest; deterministic — 7 traced cases verified in Node), `getMockCadence(daysRemaining, existingMocks, today?)` (a sprint mock every ~4d, none in the last 3 days), `getNewMaterialCutoff(examDate)` (exam−14d + message). Sprint state lives in `user_settings.checkin_state`: `sprint_active`, `sprint_nudge_dismissed`. `Dashboard.jsx`: a **Sprint Activation** nudge when `daysToExam ≤ 28` (Activate / Not yet) → when active, a **Sprint panel** (days-remaining countdown, next mock, new-material cutoff, top-3 weak-area priorities, final-3-day taper note, Exit sprint, "View revision schedule" → `/plan` state `{planView:'sprint'}`). `Plan.jsx`: a **Sprint** view in the toggle (only when active; `usePlanView` VALID gains `'sprint'`; `effectiveView` falls back to list if sprint turned off) rendering the day-by-day schedule (subject chips, mock-day cards, the cutoff divider, taper styling). `MockExams.jsx`: a **Sprint mocks** section (scheduled mocks + "Log this mock" prefilling the add modal). Opt-in, deactivatable, never auto-activates; hidden when no/expired exam date. QA'd live end-to-end in preview (registered a new user → 3-step onboarding → 82-task plan → banner deep-link → activate sprint → sprint panel/plan view/mock section). `npm run build` clean.
- **EMP Session 11 — Notifications port (exam-specific) (2026-06-13, `emp` branch)**: `src/lib/notify/examNotifications.js` (port of `uniNotifications.js` for exam mode) — `EXAM_PREFS_KEY = 'studyrise:exam:notify:prefs'`, `DAILY_CAP = 5`, `EXAM_NOTIFY_TYPES` (7 types: `morning_digest` priority-3 / `sr_overdue` priority-2 / `mock_reminder` priority-1 / `re_engagement` priority-5 / `weekly_recap` priority-4 / `mistake_review_due` priority-2 / `sprint_taper` priority-3), `getExamNotifyPrefs()` / `saveExamNotifyPrefs()` (localStorage read/write), `applyQuietHours(when, prefs)` (shifts notifications out of quiet window), `computeExamNotifications({ tasks, srRecords, questionLogs, mockExams, mistakeLogs, studyLogs, settings, now })` (pure, hard cap 5/day by priority), `scheduleExamNotifications(userId, settings)` (self-fetching, calls `notifier.cancelAll()` then reschedules). `src/components/Settings/ExamNotificationsTab.jsx` (port of `uni/NotificationsTab.jsx`) — master enable/disable toggle, per-type toggles, quiet hours inputs, browser permission request, in-app fallback notice when blocked. `Settings.jsx` gains `'Notifications'` between Import/Export and Billing in `BASE_TABS` + `<ExamNotificationsTab key="examnotif" settings={settings} />` in `tabContent`. `App.jsx` `notifyRanRef` useEffect now branches on mode: uni → `scheduleUniNotifications`, exam → `scheduleExamNotifications` (same once-per-load guard). QA'd in preview: Notifications tab renders with all 7 types + quiet hours; browser-blocked state shows amber fallback notice.
- **EMP Session 12 — Burnout radar + exam pace tracking (2026-06-13, `emp` branch)**: `studyUtils.js` gains `detectOverloadSignal(studyLogs, questionLogs, srRecords)` — 3 signals over a 7-day window: (1) accuracy slope < −2 pts AND hours slope > 0 with ≥4 data points (severity mild/moderate/severe), (2) SR compliance drop > 30% between early/late halves, (3) adherence collapse (≥3 missed/pending days); returns `{ isOverloaded, signal, severity, suggestion }` with coach-toned suggestions (no alarm language). `Dashboard.jsx` gains an amber **overload banner** (AnimatePresence + motion.div, per-session-dismissible via `overloadDismissed` state — returns next day if signal persists) in the left column above the consistency strip. `ExamSetupTab.jsx` gains a **`target_seconds_per_question`** field (label live-updates "1m 12s" etc.; default 72s = AMC; per-exam defaults: AMC=72, PLAB=60, USMLE=90 — settable by user). `MockExams.jsx` gains: (a) `paceBadge(avgSec, targetSec)` helper (green ≤100% / amber ≤120% / red >120% of target); (b) **AVG PACE** stat in the latest mock hero stats grid replacing the "Goal 65%" tile (color-coded against target); (c) per-row **pace badge** below each readiness badge in Mock History (only when time_minutes and total_questions present). `Analytics.jsx` gains `ExamPaceCard` component (avg pace across last 3 mocks with time data, target line, colored status chip, Recharts trend line with green target `ReferenceLine`) in a full-width **"Exam Pace"** card between Mock Trend and Pass Probability sections (only rendered when ≥1 mock has time data). `exam_improvements_001.sql` already reserved `user_settings.target_seconds_per_question` — no new migration needed. QA'd in preview: overload banner logic verified, pace badges show on all 4 seed mocks, Analytics Exam Pace card renders with trend. `npm run build` clean.
- **EMP Session 13 — Exam-day logistics + T-minus checklist + Rapid-Review Sheet (2026-06-13, `emp` branch)**: all keyed off `user_settings.exam_logistics` jsonb (reserved in `exam_improvements_001.sql` — no new migration). **Part A** — `ExamSetupTab.jsx` gains an **"Exam Day Logistics"** card: registration deadline (date), test center name/address (text), test-center-confirmed + ID-ready checkboxes, permitted-items textarea. Text/date/textarea persist via a container `onBlur` (`saveLogistics` merges over the existing jsonb so it never clobbers the Dashboard-written `tminus_checklist`); checkboxes persist immediately on change. **Part B** — `Dashboard.jsx` shows a navy **T-minus checklist** card (top of left column) when `examDate && daysLeft 0–7`: "T-minus N days" / "Exam day", `Bar`-style progress "N of 6 ready", 6 items — 3 auto (Confirm test center route ← `test_center_confirmed`; ID & documents ready ← `id_ready`; Last full mock completed ← a mock within 5 days; shown with an "auto" tag, non-interactive) and 3 manual stored in `exam_logistics.tminus_checklist` (No new material — auto-checked in final 3 days else manual; Sleep schedule adjusted; Rapid-review sheet printed → "Open" button to `/review-sheet`), plus a "View your rapid-review sheet →" link. **Part C** — `Dashboard.jsx` shows a lighter **"Exam logistics"** nudge when `daysLeft 8–60` and (registration deadline within 14 days, OR test center not confirmed): the relevant one-liner(s) + "Sort it in Settings →" → `goToSettingsTab('Exam Setup')`. **Part D** — new `src/screens/ReviewSheet.jsx` at `/review-sheet` (lazy, own chunk, exam routes; FREE not Pro-gated): self-fetching (`useMistakeLogs`/`useSubjects`/`useUserSettings`), compiles every non-empty `correction_note` grouped by subject (alphabetical) into a dense numbered serif list under a "Rapid-Review Sheet — {exam}" header with generated-date + rule/subject counts; scoped `@media print` CSS hides app chrome (`aside, nav, [data-mobile-tabbar], .no-print`) and sets A4 margins so `window.print()` = the PDF; graceful 0-rule empty state pointing at the Mistakes screen. QA'd live in preview as the exam test user: logistics card saves (text via onBlur, checkbox immediate, merge preserves other keys); T-minus card at +5d shows "T-minus 4 days · 2 of 6 ready" with correct auto-checks, manual toggle persists `tminus_checklist.sleep`; Part C nudge at +30d; ReviewSheet renders 10 rules across 10 subjects; no new console errors; state restored after. `npm run build` clean.
- **EMP Session 15 — `.ics + PNG Exports` (port of uniExport.js) (2026-06-13, `emp` branch)**: `src/lib/examExport.js` NEW — exam-mode export utility ported from `uniExport.js`. All exports are FREE. Key exports: `exportExamPlanICS(tasks, mockExams, srRecords, settings)` (RFC 5545 .ics with milestone tasks as VEVENTs + mock exams + SR-due dates, floating local times); `exportProgressCardPNG(stats)` (600×320 navy SVG card — exam name, days counter in mono, SVG readiness ring, qbank progress bar, verdict message, branding → `svgToPngBlob` → canvas offscreen render → download; shared helper `svgToPngBlob(svgString, w, h, scale=2)` same approach as SemesterWrapped); `exportQuestionLogsCSV(questionLogs, subjects)` (date/subject/source/done/correct/accuracy/confidence/attempt_type); `exportMockExamsCSV(mockExams)` (date/title/score/%/time/readiness); `exportMistakeRulesCSV(mistakeLogs, subjects)` (subject/type/area/rule — Anki-friendly); `exportStudyLogCSV(studyLogs)` (date/status/eMedici/note); `exportFullSnapshot({settings, tasks, subjects, phases, questionLogs, mockExams, mistakeLogs, srRecords})` (versioned JSON bundle). `src/components/Settings/ImportExportTab.jsx` REBUILT — replaces the old single-export-button card: `ExportRow` component (icon/title/sub/Download button + busy state), `run(key, fn)` busy wrapper, 6 export rows (Study Plan .ics / Progress Card PNG / Question Sessions CSV / Mock Exams CSV / Mistake Rules CSV / Full Backup JSON); self-fetches via `useQuestionLogs`, `useMockExams`, `useMistakeLogs`, `useSRRecords`, `useStudyLog`; computes `progressStats` (readiness, qbank progress from `getFirstPassProgress`, projection verdict) inline; QbankImportModal and Reset-to-Default-Data cards preserved unchanged. QA'd: all 6 export rows render with Download buttons, only pre-existing AI Advisor 404 in console. `npm run build` clean.
- **EMP Session 17 — Unified Review Engine (topic-level SR) (2026-06-13, `emp` branch)**: One queue across all review sources (Improvement #8 — unify mistake reviews and SR). Keyed off the `sr_records.source_type/source_id/topic_label` columns (already in `exam_improvements_001.sql`). **Part A** — `SRService.createTopicSR(userId, {subjectId, topicLabel, sourceType, sourceId, sr1Interval, sr1Due})` (shared insert helper: sets sr1_due = today + interval, degrades gracefully on missing columns `42703/PGRST204` → retry without source cols, and on duplicate subject_name `23505` → no-op so re-flagging/re-graduating is idempotent); `useSRRecords` exposes `createTopicSR(subjectId, topicLabel, sourceType='topic', sourceId, sr1Interval)` (wraps SRService + refetch) and `getReviewQueue({mistakes, subjects})` → ALL due items sorted by priority (overdue mistakes → due subject SR → due topic SR, overdue-first within each tier; enforces SR hit order so sr3 only surfaces once sr2_done; `source_type` NULL = `subject_milestone`). Existing `createSRRecord`/`completeSRHit` unchanged. **Part B** — `SRModule.jsx` gains a **Review Queue** section above the subject cards: `ReviewQueue`/`ReviewQueueCard`/`MistakeReviewInline` components — each card badged by type (Subject=blue, Topic=purple, Mistake=amber), overdue/due chip + date, red-tinted bg when overdue; subject/topic "Review" → existing `SRModal` (topic SR works because subject_name = topic_label, so `completeSRHit` finds it); mistake "Review" expands inline (reveal-the-rule then Still shaky / Got it → `scheduleMistakeReview`). Count badge "{n} due". The per-subject cards/history below are unchanged. **Part C** — Mistake → SR graduation bridge in `useMistakeLogs.scheduleMistakeReview`: when a mistake is marked shaky for the 3rd time (`review_count >= GRADUATE_AFTER_SHAKY=3` after increment, still unresolved) it auto-creates a topic SR (source_type 'mistake', source_id = mistake id, topic_label = short_note ≤60ch) via `SRService.createTopicSR`; returns `{error, graduated}` — SRModule shows a fixed bottom toast, Today's MistakeReviewSection onRate shows "Added to your spaced repetition queue…". **Part D** — `Questions.jsx` gains a subtle `BookmarkPlus` "Flag for review" icon button (next to "Paste results") → `Modal` with topic free-text (pre-filled from the note) + optional subject (pre-filled from the form) → `createTopicSR(...,'topic',...)`. QA'd live (exam test user, migration columns present): queue rendered 2 mistakes + 4 subject SR correctly prioritised; mistake reveal + resolve persisted (`resolved/next_review`); subject "Review" opened SRModal "Cardiology — SR3"; graduation verified end-to-end (primed review_count=2 → shaky → topic SR row with source_type='mistake'/source_id linked + toast); flag-from-Questions created a source_type='topic' row; all QA mutations restored; `npm run build` clean.
- **EMP Session 20 — Analytics dashboard layout reorg (2026-06-13, `emp` branch)**: Pure layout pass on `src/screens/Analytics.jsx` — no chart logic, data calculations, or props touched; all 13 listed cards preserved (Performance Overview, SR Compliance, Forgetting Curves, Review Timeline, Review Questions, Subject Balance, Focus Areas, Mock Exam Trend, Mistake Analysis, Exam Pace, Pass Probability Trajectory, Mock Performance by Subject, Retention Map, Study Heatmap) plus the conditional Confidence vs Accuracy and admin SR Insights. **Structure**: (1) Top row 2-col `grid grid-cols-1 lg:grid-cols-2 gap-5 lg:auto-rows-fr` — Performance Overview ‖ SR Compliance — each Card gets `h-full flex flex-col` with the chart in a `flex-1` wrapper so the two boxes verify equal height (297px both at 1280×800). (2) Full-width Forgetting Curves, then full-width Review Timeline (`overflow-x-auto` preserved). (3) Middle two-column structured stack `grid items-start` — left column `flex flex-col gap-5` = Review Questions → Mock Exam Trend → Exam Pace (conditional); right column = **Subject Balance and Focus Areas split into two separate cards** (was one combined card pre-S20) → Mistake Analysis. (4) Lower full-width: Pass Probability Trajectory (gated via `PassProjectionGate`) → Mock Performance by Subject → Confidence vs Accuracy (each conditional on its existing data check). (5) Bottom row 2-col with `lg:auto-rows-fr` + `h-full` — Retention Map ‖ Study Heatmap (both verified equal at 336px). (6) Admin-flag SR Insights still at the very end. Consistent gap-5 (20px) across every grid + flex column; `motion.div` `fadeUp` / `stagger` variants preserved on every card (with explicit `phase`-style separation between the stack parent and the column flex children so the stack `stagger` still cascades). Mobile (375px) verified single-column with no horizontal overflow. `npm run build` clean (Analytics chunk 31.63 kB / 8.76 kB gz, unchanged).
- **EMP Session 19 — Final Polish + Bug Fixes (2026-06-13, `emp` branch)**: **Part A quick wins**: (1) `src/components/Settings/ImportExportTab.jsx` gains a **"Restore from Backup"** card — file upload (`<input type="file" accept=".json">`), JSON parse+validate against the exportFullSnapshot format, preview (phase/subject/task counts), confirm → deletes existing tasks/subjects/phases then re-inserts from backup (study_log/mock_exams/question_logs/sr_records/mistake_logs never touched); success/error inline feedback. (2) PLAB 1 and USMLE Step 1 `importPromptTemplate` are now fully written in `src/lib/examModules/plab1.js` and `usmle_step1.js` (no longer TODO) — UK-specific NICE guidelines/drug names for PLAB, UWorld/First Aid/mechanisms focus for Step 1. (3) `studyUtils.js` `getReadiness`: `|| 77` hardcoded fallback → `|| 0` (was listed as fixed in Sprint D but was still present). **Part B layout/bug fixes**: SR Module visual distortion fixed — `SRSubjectCard.jsx`: `showBackdatedBanner` moved inside the `{open && ...}` expand block so it only shows when the card is open; collapsed cards show a compact amber pill "SR1 overdue" instead; `SRModule.jsx`: duplicate "Due Today" tabs+list removed from left column (Review Queue above already shows all due items), Protocol card moved from left to right column for balanced layout, unused `srTab/setSrTab/filteredDue/SR_TABS` state and `Tabs2` import removed. `Mistakes.jsx`: `AnimatePresence` wrapper removed from around the card list — it blocked Framer Motion's variant-state propagation from the stagger parent, leaving all cards stuck at `opacity: 0` in dark mode; `layout` prop removed from child motion.div for the same reason. `npm run build` clean.
- **EMP Session 18 — Print Progress Report + Study Log CSV + Dark Mode (2026-06-13, `emp` branch)**: Improvements #21/#22. **Part A** — `src/screens/ExamReport.jsx` NEW at `/report` (lazy, own chunk, exam routes, FREE — not Pro-gated; modeled on USM `GradeReport.jsx`). Self-fetching (settings/subjects/tasks/study_log/questionLogs/mockExams+breakdowns/mistakes/srRecords). 8 sections: header (exam name · candidate from display_name · readiness score) → Overview (days studied/remaining, questions, accuracy, mock avg, mocks taken) → Readiness summary (`projectReadinessToExamDate` projected±band, pass line, margin, verdict, coverage; honest fallback when <2 mocks / no date) → Subject performance table (done/accuracy/coverage/mock-accuracy/SR-status per subject) → Mock exam history (date/score/▲▼ trend) → Qbank first-pass bars (`getFirstPassProgress`, rounded %) → Focus areas (top-5 `rankWeakAreas` with diagnosis + action) → 30-day consistency bars (`getConsistency(logs,30)`, active=green/rest=blue/none-gray + legend). Scoped `@media print` CSS hides app chrome AND **forces light tokens on `.exam-report`** so it always prints black-on-white even in dark mode; `window.print()` = the PDF; `break-inside: avoid` on sections. Entry points: `/report` route in App.jsx, a "Print report" button in the `Analytics.jsx` header, and a "Progress Report" card in the Import/Export tab. **Part B** — `exportStudyLogCSV` already existed in `examExport.js` (Session 15); wired a new **Study Log (CSV)** `ExportRow` into `ImportExportTab.jsx` (`exportMistakeRulesCSV` row was already present). **Part C** — Dark mode was ALREADY fully built (pre-existing: `useTheme` hook, Sidebar moon/sun toggle via `useFeatureFlags`, full `:root.dark` token block in tokens.css, `applyStoredTheme()` in main.jsx, 58 `.dark` overrides in globals.css) — NOT rebuilt; the only dark-mode work this session is the print-report's forced-light `@media print` block. QA'd live (exam test user, dark mode): report renders all 8 sections (projected 91.6% (88.6–94.6%), pass line 65%, margin +26.6; 17-subject table; 4 mocks; qbank "1,288/3,400 · 38%" after rounding fix; 5 focus areas; "15 active of 30 days"); Analytics "Print report" → /report (SPA nav); Study Log CSV exports header `Date,Status,Task,Questions Done,Blocks,Note`; only pre-existing AIAdvisor 404 in console; `npm run build` clean (ExamReport own lazy chunk).
- **EMP Session 16 — Go/No-Go surface + Settings save-on-tap polish (2026-06-13, `emp` branch)**: Two parts. **Part A — Go/No-Go card in Dashboard** (`Dashboard.jsx`): `MiniSparkline` pure SVG component added (polyline trend + dashed pass-line, no Recharts) reusing `projection.trendLine` data. `showGoNoGo = daysLeft ≥ 0 && daysLeft ≤ 14`. `goNoGoWeakAreas = rankWeakAreas(...).slice(0,3)` (only when showGoNoGo). `goNoGoMsg` IIFE derives a verdict-specific one-liner: comfortable → "you clear the line with a solid margin"; borderline → projected near line + top weak spots; at_risk → "short deferral would change the math" or "focused push on X could shift the projection"; insufficient_data → "Log a mock to get your projection." Card uses neutral `borderLeft: '3px solid var(--border-2)'` (never alarming), shows MiniSparkline when ≥2 trendLine points, weak-area subject badges when verdict ≠ insufficient_data, caveat line "This projection is based on your logged data. It's a trend, not a guarantee." — only visible the final 14 days. **Part B — ExamSetupTab save-on-tap refactor** (`ExamSetupTab.jsx`): replaces the old single-save-button pattern with per-field saves. State: `savingKey`/`setSavingKey` (replaces `saving`/`saved`) + `saveError` + `dateConfirmOpen`/`pendingDatePatch` modal state. `save(key, value)` helper sets savingKey, calls `updateSettings({[key]:value})`, clears savingKey. Fields: `question_bank_name` saves on `onBlur`; `daily_question_target` and `target_seconds_per_question` save on `onChange`; `exam_date`/`study_start_date`/`exam_display_name` save via explicit "Save Dates & Name" button → `handleDateSave()` → if dates changed opens date confirmation modal ("Changing your exam date will recalculate projected completion dates. Continue?") → `confirmDateSave()`; qbank pool name/size save on `onBlur` (`savePoolsNow(pools)` passes current state directly to avoid stale closures); `removePool` saves immediately. Feasibility card replaces old Preview card: derives `weeksLeft`, `tasksPerWeek`, and a 4-tier label (Comfortable margin ≤4/wk · Achievable ≤7/wk · Tight but doable ≤10/wk · "increase hours or reduce scope" >10/wk) with correct color (`--green-ink` / `--amber-ink` / `--red-ink`); shows Days to Exam + Total Tasks + Tasks/Week + feasibility label + pace summary line. QA'd: feasibility card shows "64 days · 77 tasks · 8.5/week · Tight but doable"; save-on-tap fields render correctly; date confirmation modal wired. `npm run build` clean.
- **EMP Session 14 — Exam Timeline (port of USM SemesterTimeline) (2026-06-13, `emp` branch)**: `src/components/ExamTimeline.jsx` NEW (lazy, own chunk) — the "gasp view" port of `SemesterTimeline.jsx` with exam-data mapping. Exported `buildExamTimelineData(tasks, mockExams, srRecords, subjects, phases, settings, opts)` is the data adapter: `buildExamWeeks(study_start_date → exam_date, week_start aligned)` (Week 1 from study_start, later weeks boundary-aligned, last clamps to exam — mirrors `termWeeks`; study_start falls back to earliest task date → today); lanes = a dedicated **Mocks** lane (navy) + top-8 subjects by task count (each a rotating `--blue/--green/--amber/--purple/--red/--cyan/--uni-indigo/--uni-pink` token; falls back to task-name-derived subjects if no `subjects` rows); markers = mock exams (16px navy ring dots = readiness checkpoints, filled), milestone tasks (12px), regular tasks (7px @ 0.7 opacity, completed faded to 0.4), SR-due dates (9px hollow dots from undone sr1/2/3_due in range); heavy weeks (scheduled `estimated_hours` sum > `daily_hours × days_per_week`) glow amber + "{h}h" badge; new-material **cutoff line** (exam −14d, amber dashed "Stop new topics"); **sprint zone** shading on the final 4 weeks when `checkin_state.sprint_active`; qbank **first-pass overlay** bar (from `getFirstPassProgress`); today line + red **exam terminal line** (the emotional anchor). Component keeps the SemesterTimeline interaction shell — drag/swipe horizontal scroll, auto-scroll to current week, tap-a-dot mini-card (date/subject/done badge + "Open" → `onOpenTask` for task/milestone dots) — plus a 3-level zoom (Fit / Comfort 108px / Detailed 168px) and a `fadeUp` entry (`useReducedMotion` respected). `usePlanView.js` VALID gains `'timeline'`. `Plan.jsx`: "Timeline" added to the view toggle (between Board and Sprint), `useSRRecords()` added for SR-due markers, lazy `<ExamTimeline>` rendered in its own full-height branch (phase strip hidden in timeline like sprint), `onOpenTask` → `setDetailTask` opens the existing TaskDrawer. All exam screens otherwise untouched; USM/legacy users unaffected. QA'd live in preview as the exam test user (AMC MCQ, 64 days to exam): timeline renders 26 weeks auto-scrolled to the current week, Mocks + 8 subject lanes, 39 markers (4 mocks / 32 tasks+milestones / 3 SR), today line, qbank 38% overlay, exam terminal line; Fit/Comfort/Detailed zoom (grid 100% / 4368px at 168×26) all work; mock mini-card "Mock Exam 1 — Mixed · Tue Apr 28 · 56%", task mini-card with Done badge + Open → TaskDrawer; view persists across reload; mobile (375px) renders with sticky lane labels; only the pre-existing AIAdvisor 404 in console. `npm run build` clean (ExamTimeline its own lazy chunk).

## Exam Module System

Exam configs live in `src/lib/examModules/`.
- `index.js` — registry + `getExamModule(examType)` helper; uses static imports (Vite-safe, no top-level await)
- `amc_mcq.js` — AMC config (phases, subjects, taskRecipes, SR weights, importPromptTemplate)
- `plab1.js` — PLAB 1 config (18 subjects, 4 task recipes, importPromptTemplate — UK-specific NICE guidelines/drug names/NHS referral pathways/GMC ethics)
- `usmle_step1.js` — USMLE Step 1 config (20 subjects, 5 task recipes, importPromptTemplate — UWorld/First Aid/mechanisms/biochemistry/biostatistics focus)

### getExamModule(examType)
Returns the module object for the given exam type string. Falls back to `custom` if unknown.

### Onboarding guard (App.jsx) — triple-path since USM Session 2 (Mode Select Step 0)
```js
const isNewUserOnboarding =
  !settingsLoading && settings?.onboarding_complete === false; // null = legacy user → skip

// Step 0 — MODE SELECT: new user, no exam chosen, no mode chosen yet
const needsModeSelect =
  isNewUserOnboarding &&
  (settings?.exam_type === null || settings?.exam_type === undefined) &&
  (settings?.app_mode === null || settings?.app_mode === undefined);

// EXAM onboarding: new user who picked Exam Prep on Step 0
const needsOnboarding =
  isNewUserOnboarding &&
  (settings?.exam_type === null || settings?.exam_type === undefined) &&
  settings?.app_mode === 'exam';

// UNIVERSITY onboarding: new user who picked University on Step 0
const needsUniOnboarding =
  isNewUserOnboarding &&
  settings?.app_mode === 'university';
```
`needsModeSelect` → `<ModeSelect onSelect={mode => updateSettings({ app_mode: mode }) + refetch} />` (`src/screens/Onboarding/ModeSelect.jsx`): full-screen "What are you studying for?" with two cards (Exam Prep / University). Writing `app_mode` and refetching flips one of the other two guards. A mid-setup refresh (app_mode already set) skips Step 0 and resumes the correct wizard. Existing/legacy users never see Step 0.
`needsOnboarding` → `<OnboardingFlow userId={user.id} onComplete={handleOnboardingComplete} />` — the existing 5-step exam wizard, untouched. On completion, `refetchSettings` → `onboarding_complete` true → user lands on Dashboard.
`needsUniOnboarding` → `<UniOnboarding userId onComplete onBackToModeSelect />` — the real 6-step university wizard (Session 2). `onBackToModeSelect` (Back on Step 1) sets `app_mode = null` → returns to Step 0. Mid-wizard refresh restarts the uni wizard at Step 1 (local state only — accepted MVP behavior).
The legacy rule is unchanged: `exam_type = null` + `onboarding_complete = true` skips everything.

### University onboarding wizard (USM Session 2)
Files: `src/screens/Onboarding/UniOnboarding.jsx` (orchestrator: Shell, progress bar, step dots, slide transitions, save routine) + step components in `src/screens/Onboarding/uni/`:
- `wizardUi.jsx` — shared style helpers (labelStyle/inputStyle/btnPrimary/btnSecondary) + `FocusInput` (forwardRef), `FocusSelect`, `Chip`
- `UniStepTerm.jsx` — Step 1: term type chips, name, start/end, collapsible "More dates" (break/study week/exam period ranges). Smart defaults: name from type+date (`defaultTermName` — "Semester 2 YYYY" when month ≥ June), end = start + teaching weeks (TERM_TYPES). Exports `termStepValid`.
- `UniStepTerminology.jsx` — Step 2: subject_term chips (wizard copy re-labels live), grade_scale chips with region hints, week_start toggle.
- `UniStepUnits.jsx` — Step 3: fast-entry unit rows (name/code/12-color dot picker/remove, expandable credits+target+priority). `emptyUnit`/`nextUnusedColor`/`unitsStepValid`; soft cap note at 5 (`FREE_UNIT_SOFT_CAP`, non-blocking).
- `UniStepDeadlines.jsx` — Step 4 (skippable fork): "Import from your university" renders the full `IcalImportPanel` (Session 11; passes `terminology`, `term`, `onIcalImported`; after a completed import the step shows an "{n} ready to import / Start over" card instead of remounting the panel); "Enter manually" renders quick rows (title, unit, grouped type select, due date, weight %).
- `UniStepWeek.jsx` — Step 5: class quick-entry rows (unit/type/day 0=Mon/start/end/location) + daily hours stepper + rest day dropdown (same `daily_hours`/`rest_day` user_settings columns as DailyScheduleSettings). Exports `weeklyHoursTarget(dailyHours, restDay) = daily_hours × (7 − restDays)`.
- `UniStepValue.jsx` — Step 6: saving/error/success states; "Here is your semester." with term name, week count, unit chips, first-deadline line, "Open my dashboard" CTA → `navigate('/')`.

**Save sequence** (one async function in UniOnboarding, sequential): insert `terms` (is_active true) → `units` (capture id map by row index) → `assessments` (manual entries only; `estimated_hours` defaulted from ASSESSMENT_TYPES; category from type meta) → `classes` (`location_is_url` auto-set by `/^https?:\/\//`) → upsert `user_settings { app_mode:'university', subject_term, grade_scale, week_start, daily_hours, rest_day, weekly_hours_target, onboarding_complete:true }`. Settings flip LAST so a failed insert leaves the user in the wizard; retry creates a fresh term (orphan rows harmless, deletable via Session-3 Danger Zone).

**IcalImportPanel contract** (`src/components/uni/IcalImportPanel.jsx`, FULL since Session 11 — see the "LMS iCal import" section): props `mode: 'onboarding'|'settings'`, `units`, `terminology`, `term`, `existingUids` (Set, settings re-import dedupe), `onImported({rows, newUnits, feed}) → {imported, skipped}`. The panel never writes to the DB — the parent persists. In onboarding, `UniOnboarding.handleIcalImported` appends created units to wizard state, resolves every row to a namedUnits index, and stores rows in `deadlines.imported` + the feed in `deadlines.feed`; the save routine inserts them like manual entries (plus `ical_uid`/`ical_synced_at`/`due_time`) and writes `ical_feeds` into the settings upsert.

### Legacy compatibility
Users with `user_settings.exam_type = NULL` are treated as `amc_mcq`.
They are NOT redirected to onboarding (`onboarding_complete = null`, not `false`). Their 77 tasks and all study data remain intact.
App.jsx derives `effectiveExamType = settings?.exam_type ?? 'amc_mcq'` after settings load.

### New columns added (migration 01)
Run `supabase/examos_migration_01.sql` in Supabase SQL Editor (additive only — no existing data touched):
- `user_settings`: `exam_type` (TEXT), `onboarding_complete` (BOOLEAN), `exam_display_name` (TEXT)
- `tasks`: `topic_id` (UUID FK → topics), `task_order` (INTEGER), `recipe_id` (TEXT), `display_order` (INTEGER)
- New tables: `task_steps` (checklist items per task), `topics` (between subjects and tasks), `exam_import_logs`

### Custom exam module
`EXAM_MODULES.custom` is a blank-slate config — empty phases, subjects, taskRecipes. Used when exam_type is unknown or user selects "Build my own".

## MBBS Bangladesh Mode (Tier 1 — COMPLETE, `main`)

A third app mode for Bangladeshi MBBS students (items, cards, attendance, formatives, prof eligibility), built additively alongside Exam + USM. Spec: `docs/mbbs/01_MBBS_PRODUCT_SPEC.md`. Build sessions: `docs/mbbs/05_MBBS_BUILD_SESSIONS.md` (Tier 1 = 10 sessions). Implementation log: `docs/mbbs/06_MBBS_BUILD_LOG.md`. **Database = Option B**: same Supabase project, new tables in `public` with the `mbbs_` prefix, RLS `auth.uid() = user_id`. Merged into `main` 2026-06-15.

**app_mode value:** stored `'mbbs_bd'`, derived by `getAppMode` → `'mbbs'`. Activated only when `app_mode = 'mbbs_bd'`.

### Migration (`migrations/mbbs_001_foundation.sql` — run MANUALLY in Supabase, idempotent)
Adds `user_settings.mbbs_config` jsonb + 10 tables, all with RLS owner-only (`owner_all`) policies + `set_updated_at` triggers via the project's existing `public.update_updated_at()` (`mbbs_study_log` has no `updated_at`, so it gets RLS but no trigger):
`mbbs_subjects` (name, total_marks, color, sort_order) · `mbbs_cards` (subject_id, name, status `in_progress|ready_for_exam|exam_passed|complete`, card_exam_date/result) · `mbbs_items` (subject_id, card_id, item_number, topic_name, status `pending|scheduled|cleared|failed`, date_cleared, examiner, marks/max, notes) · `mbbs_attendance` (subject_id, class_type, classes_held/attended, est_total_for_phase; UNIQUE(user,subject,class_type)) · `mbbs_formatives` (subject_id, type, date, marks_obtained/max, weight) · `mbbs_classes` (subject_id, class_type, **day_of_week 0=Mon…6=Sun**, start/end_time, location, location_is_url) · `mbbs_readiness` (subject_id, component `written|viva|practical|clinical`, state `not_started|weak|average|safe|exam_ready`; UNIQUE(user,subject,component)) · `mbbs_study_log` (subject_id, item_id, duration_minutes, session_type, date) · `mbbs_daily_tasks` (subject_id, date, title, est_minutes, status `pending|done|skipped`, source `generated|manual`).
`mbbs_config` shape: `{ phase, college, university, exam_window:{month,year}, phase_start_date, exam_status, supplementary:{active, subject_ids, window}, holiday_prefs }`.

### Routes / nav (Session 1)
MBBS screens live under `/mbbs` (the onboarding + nav target; `/` redirects to `/mbbs`). App.jsx route selector: `university ? uni : mbbs ? mbbs : exam`. `needsMbbsOnboarding` guard (new user + `app_mode='mbbs_bd'`) → `MbbsOnboarding`. Lazy chunks: `src/screens/Onboarding/MbbsOnboarding.jsx` (real wizard since Session 2), `src/screens/mbbs/MbbsDashboard.jsx` (real Phase Eligibility Dashboard since Session 6). Sidebar `MBBS_NAV` + BottomTabBar `MBBS_TABS`/`MBBS_MORE_ITEMS` (Dashboard `/mbbs`, Items & Cards `/mbbs/items`, Attendance, Formatives, Timetable, Today, Settings). New dirs/barrels: `src/screens/mbbs/`, `src/hooks/mbbs/`. ModeSelect has a 3rd card "MBBS Bangladesh". Exam/USM users are unaffected (mbbs runs no exam/uni fetches or notifications).

### Onboarding wizard (Session 2)
`MbbsOnboarding.jsx` is the real **6-step wizard** (no longer a placeholder), mirroring `UniOnboarding.jsx` (slide transitions, `OnboardingShell`, one sequential save with the `user_settings` flip LAST, then the shared `BuildingPlan` cinematic → `/mbbs`). Step components in `src/screens/Onboarding/mbbs/` (`MbbsStepPhase`/`MbbsStepCollege`/`MbbsStepSubjects`/`MbbsStepTimetable`/`MbbsStepSupplementary`), reusing `uni/wizardUi.jsx` + `onboardingUi.jsx` primitives. Steps: Phase → College & prof window → Subjects+items/cards (skippable "set up later") → Timetable (skippable) → Supplementary (conditional) → Finishing.
- **`src/lib/mbbs/mbbsConstants.js`** is the source of truth for phase defaults: `MBBS_PHASES` (per professional phase: subjects with `total_marks`, default item counts, card-name lists — derived from the standard BMDC curriculum since `docs/mbbs/01_MBBS_PRODUCT_SPEC.md` is still a stub; all editable in Step 3), `MBBS_COMPONENTS` (written/viva/practical/clinical), `MBBS_UNIVERSITIES`, `MONTHS`, and `subjectsForPhase`/`componentsForPhase`/`getPhase`.
- **Save order:** `mbbs_subjects` (id map) → `mbbs_cards` (batch, regrouped per subject by subject_id+sort_order) → `mbbs_items` (1…count, round-robin onto the subject's cards, first N `cleared`) → `mbbs_readiness` (subject × component; clinical only for Final Prof) → `mbbs_classes` → `user_settings` upsert (`app_mode:'mbbs_bd'`, `onboarding_complete:true`, full `mbbs_config`). Failure before the upsert leaves the student in the wizard.
- **`mbbs_subjects.color` stores the UNIT_COLORS palette KEY** (e.g. `'red'`), not a hex — resolved via `getUnitColor` → `var(--uni-*)` (matches USM, keeps the no-hex rule). `mbbs_config.supplementary` = `{ active, subjects:[names], window:{month,year}|null }` (failed prof subjects have no row IDs).

### Phase Eligibility Dashboard + eligibility engine (Session 6)
- **`src/lib/mbbs/eligibility.js` is THE eligibility engine** (pure, testable — no network/React). `computeEligibility({subjects, attendance, formatives, items, cards, config, today?})` → `{ status:'eligible'|'at_risk'|'not_eligible', hasData, gates:{attendance,formative,items,cards}, blockers:[], atRisk:[] }`. Per-gate result `{ state:'ok'|'caution'|'breach'|'incomplete', subjects:[{subjectId,name,detail,…}] }`. Gate rules: attendance breach <75% / caution 75–80% (worst class-type wins); formative breach <60% / caution 60–<65% (`FORMATIVE_NEAR`) via `weightedAvg`; **items + cards are caution-only** (item pace 'behind'/'critical'; a card whose exam is within `CARD_NEAR_DAYS=14` with items left) — only the official 75%/60% gates plus an unpassed previous prof (`config.supplementary.active`) ever make a student `not_eligible`. `hasData=false` → all gates 'incomplete' (dashboard shows a neutral "getting started" hero, not green). Also exports `eligibilityVerdict(result)`, `STATUS_STYLE`, `GATE_STYLE`. Re-exported via `src/lib/mbbs/index.js`.
- **`src/screens/mbbs/MbbsDashboard.jsx`** is the real `/mbbs` command centre (self-fetching via useUserSettings + the 5 MBBS hooks): eligibility status hero (green/amber/red, neutral soft-blue when no data; blockers/at-risk list; compact supplementary strip) → four gate widgets (`GateWidget`, colored by `GATE_STYLE`: Attendance→/mbbs/attendance, Formatives→/mbbs/formatives, Items & Cards (Ring + weekly pace)→/mbbs/items, Prof Window (countdown + exam_status, readiness grid — see Session 9)) → "Today's Gate Protection Summary" (`buildSummary` — attendance worst-subject + days-can-miss, item weekly pace, formative standing). Subject colours via `getUnitColor(subject.color).token`.

### Timetable + attendance checklist (Session 7)
- **`src/hooks/mbbs/useMbbsClasses.js`** — CRUD for `mbbs_classes`; `classesForDay(dayOfWeek)` selector; auto-sets `location_is_url`.
- **`src/lib/mbbs/bdHolidays.js`** — `BD_HOLIDAYS_2026` (15 public holidays; Islamic calendar dates approximate), `getHoliday(dateISO, extraHolidays)`, `isHoliday`. Overridable via `mbbs_config.holiday_prefs`.
- **`src/screens/mbbs/Timetable.jsx`** — calendar-week navigation (no terms; prev/next/today); 7-column grid with navy header on today; holiday badge from `bdHolidays`; class blocks (subject color, type, time, location); **today's cells show Attended/Missed buttons** calling `logAttended`/`logMissed`; attendance % per class; Attendance Overview below the grid. Add/edit class form modal.

### Daily study plan + session logging (Session 8)
- **`src/hooks/mbbs/useMbbsStudyLog.js`** — `logSession`, `deleteLog`, `todaySessions`, `minutesToday`.
- **`src/hooks/mbbs/useMbbsDailyTasks.js`** — today-scoped CRUD; `markDone`, `markSkipped`, `pendingTasks`, `doneTasks`.
- **`src/lib/mbbs/dailyPlan.js`** — `generateDailyPlan({subjects, items, attendance, formatives, config, today})` → gate-priority task list (attendance risk → formative risk → item-pace critical/behind → general revision → past-Q). Up to 6 tasks.
- **`src/screens/mbbs/MbbsToday.jsx`** — date header + holiday badge; KPI row (minutes / sessions / tasks); today's timetable strip; daily task list with progress bar + auto-generated gate-priority plan (generatedRef guard prevents duplicate); Log session modal; study sessions list with delete.

### Prof readiness checklist + exam window (Session 9)
- **`src/hooks/mbbs/useMbbsReadiness.js`** — `READINESS_STATES` (5 states: not_started/weak/average/safe/exam_ready with token colors); `nextReadinessState`; `getReadinessStyle`; `useMbbsReadiness()` with `getState(subjectId, component)`, `setState`, `cycleState` (upserts `mbbs_readiness`).
- **`src/lib/mbbs/examWindow.js`** — `EXAM_STATUSES` (6 with token colors); `windowToDate`, `daysToWindow`, `countdownLabel`, `getExamWindowInfo(config)`, `windowUrgency(daysLeft)`. **`windowToDate` is defensive**: coerces string months (e.g. `'August'`) to numeric via `.indexOf()` before arithmetic — the wizard always stores numeric months but this guards against any old DB rows or seed data that stored strings.
- **`src/screens/mbbs/MbbsDashboard.jsx`** — readiness seam filled with `ReadinessGrid` component: subject rows × applicable components (from `componentsForPhase`), each cell a tap-to-cycle button in its state's token color. Module-level `coerceMonth(m)` helper (reuses imported `MONTHS` array) used by local `daysToWindow` and `windowLabel` — same string-month defence as `examWindow.js`.

## MBBS Bangladesh Mode (Tier 2 — in progress, `main`)

### T2-0 — Curriculum fix + 1st Prof QA account (`mbbsConstants.js` + seed script)
- **`src/lib/mbbs/mbbsConstants.js`** corrected to the real BMDC mark distribution: 1st Prof 1,300 (Anatomy 500 / Physiology 400 / Biochemistry 400); 2nd Prof 600 (Community Medicine 300 / Forensic Medicine 300); 3rd Prof 900 (Pharmacology 300, `default_items:20` BMDC-mandated / Pathology 300 / Microbiology 300); Final Prof 1,500 (Medicine & Allied 500 / Surgery & Allied 500 / O&G 500). **Paediatrics is NOT a 4th Final Prof subject** — examined under Medicine & Allied or Surgery & Allied at college discretion.
- `MONTHS` exported as `['January', …, 'December']` (0-indexed strings). `exam_window.month` **must be stored as a 1-indexed number** — the wizard uses `Number(e.target.value)` from a select with `value={i+1}`. String months in old data are handled defensively in `examWindow.js` and `MbbsDashboard.jsx`.
- **`scripts/seed-istiaqmcp-mbbs.mjs`** — seeds `istiaqmcp@gmail.com` as a 1st Prof student (`exam_window: { month: 8, year: 2026 }`). Run once: `node scripts/seed-istiaqmcp-mbbs.mjs`. Expected eligibility: NOT_ELIGIBLE (Physiology lecture <75% + Anatomy formative <60%).

### T2-1 — Exam-prep migration (`migrations/mbbs_002_exam_prep.sql`)
**Run manually in Supabase SQL Editor before T2-3+ screens can read these tables.** Idempotent. Adds 6 tables:
- `mbbs_exam_events` — prep-event spine (item_exam|card_exam|term_test|model_test|prof|other; upcoming|done|missed)
- `mbbs_sr_records` — topic/item SR (sr1/2/3_due + sr1/2/3_done + sr_hits + last_rating; `source_type` item|topic|mistake; `source_id` UUID no-FK cross-table ref)
- `mbbs_question_logs` — MCQ/SBA logs (source free-text, mode first|review|mixed; append-only, no updated_at trigger)
- `mbbs_mistakes` — mistake log + 1→3→7→14 review ladder (next_review, review_count, resolved, last_rating shaky|got_it)
- `mbbs_mocks` — model tests (total_questions, correct_count, time_minutes)
- `mbbs_mock_breakdown` — per-subject per-component detail (component written|viva|practical|clinical; append-only)
All 6 have RLS `owner_all`. `updated_at` triggers on 4 (mbbs_exam_events, mbbs_sr_records, mbbs_mistakes, mbbs_mocks). 3 indexes: `idx_mbbs_sr_due`, `idx_mbbs_mistakes_review` (partial, `where resolved = false`), `idx_mbbs_events_date`.

### T2-3 — Daily Study Cockpit (`MbbsToday` rebuild) `[OPUS]`
The real daily command centre, on the SAME engine as exam Today / UniToday (Gap A).
- **`generateMbbsBlocks(...)`** in `src/components/DayPlanner/blockGenerator.js` — third caller of the shared engine alongside `generateBlocks`/`generateUniBlocks` (reuses `getFixedBlocks`/`mergeFixed`/`recalculateBlockTimes`, no fork). Signature `{ classes, commitments, prayerBlocks, studyQueue, srBlockCount, settings, date, startTime, endTime }`. Prayer/gym/cdpath/work commitments (from `useDailySchedule.getCommitmentsForDate`) + today's `mbbs_classes` (shaped `{id,label,start_time,end_time,subject_id,colorToken,location,location_is_url}`) are fixed barriers (`'class'` already in `FIXED_TYPES`). Study blocks (50/10 + long-break-every-3) fill to the `daily_hours` budget, each carries `mbbs:true` + subject info from the gate-priority `studyQueue` (from `generateDailyPlan`, attendance-type tasks filtered out, annotated with colour). **Review-first seam:** `srBlockCount > 0` inserts a 15-min `'mistake_review'`-typed block before the first study block (count is 0 until T2-4 fills it). Rest-day → fixed blocks only.
- **DayPlanner `mbbsMode` + `onMbbsProgress(block, minutes)` props** (mirror `uniMode`/`onUniProgress`) — a completed `mbbs:true` study block shows the MBBS "Log this session?" prompt (Log session / Skip) instead of exam Done/Continue. Additive: exam/uni byte-identical (new props default false; the exam prompt condition gained `&& !pendingPromptIsMbbs`).
- **`src/lib/mbbs/gateSummary.js`** (barrel-exported) — `buildGateSummary({subjects, attendance, formatives, elig, itemTotals})` + `computeItemTotals({items, subjects, weeks})`, extracted from `MbbsDashboard` so Today + Dashboard share one gate-protection voice. `MbbsDashboard` now imports both (its local `buildSummary` + inline itemTotals removed — behaviourally identical).
- **`src/screens/mbbs/MbbsToday.jsx`** (route `/mbbs/today`, already in nav) — hero clock (live HH:MM:SS) + current-block badge + total study time + mobile prayer strip → classes strip (subject colour, isNow/Next, one-tap attendance via `useMbbsAttendance.logAttended`/`logMissed`) → "Plan your day" (start/end) → DayPlanner (`generateMbbsBlocks` + `TimerContext`, `mbbsMode`, `onMbbsProgress` opens a pre-filled log modal) → gate-protection line → study sessions (rich log modal: subject / session_type / duration / linked item / topic → `mbbs_study_log`).
- **Deviations:** blocks persist to `localStorage:studyrise:mbbs:blocks:<date>` (NOT `mbbs_study_log.blocks` — that table is per-session with no blocks column; adding one needs an unauthorised migration); the SR review block reuses the `'mistake_review'` type (no DayPlanner render change); attendance double-log is guarded by `localStorage:studyrise:mbbs:att:<date>` (the `mbbs_attendance` schema is counter-based with no per-date row).

### T2-4 — Spaced-repetition engine + Review screen `[OPUS]`
Topic/item-level SR on `mbbs_sr_records` (the Gap-B spine the cockpit + dashboard hang off). Ported from the exam SR stack; never re-derives Ebbinghaus.
- **`src/hooks/mbbs/useMbbsSR.js`** is THE MBBS SR engine. `createSR({subjectId, topicLabel, sourceType='topic', sourceId, itemId, sr1Interval=7})` — idempotent (a matching `item_id` / `source_id` / `subject_id+topic_label` is a no-op; degrades to the minimal NOT-NULL insert on `42703`/`PGRST204`). `completeSRHit(record, rating)` — advances sr1→sr2→sr3 **in order**, next due = `RATING_INTERVALS[rating] × {sr2:1.5 | sr3:2.0}` rounded (constants mirror `studyUtils`, which doesn't export them), bumps `sr_hits` + `last_rating`. `getReviewQueue({subjects})` → current-hit-due records, **overdue-first then by date**, each shaped `{key, recordId, type:'item'|'topic'|'mistake', hit, label, dueDate, overdue, subjectId, subjectName, subjectColor, topicLabel, record}`. `getCompliance()` → `{done, total, pct}`. Exports the pure `currentHit(rec)` resolver. **`mbbs_sr_records` is leaner than `sr_records`** (single `last_rating` + `sr_hits`; no per-hit `*_rating`/`*_done_date`/`max_hits`/`completed_date`) — the completion logic is adapted, not copied.
- **`src/screens/mbbs/MbbsReview.jsx`** at **`/mbbs/review`** (lazy, own chunk; added to `MBBS_NAV` + `MBBS_MORE_ITEMS` as "Review", RefreshCw icon) — review queue (cards badged Item/Topic/Mistake by `source_type`, overdue/due chip, subject-colour bar, red-tinted when overdue, "Review" → ported `SRModal`) + compliance `Ring` + Next-7-days + a manual **"Add topic"** affordance (free-text label + subject → `createSR` sourceType 'topic', mirrors the exam Questions "flag for review"). `EmptyState` when nothing due. Modelled on `SRModule.jsx`.
- **Cockpit fill:** `MbbsToday` now feeds `srBlockCount = reviewQueue.length` into `generateMbbsBlocks` (the T2-3 seam, previously 0). The SR-first block keeps its single aggregated form ("Spaced repetition (N due)"); a new `onMbbsReview` DayPlanner prop renders a purple **"Review"** button on that block (`block.srReview`, when not done) that opens a **sequential** `SRModal` over the live queue (rate → `completeSRHit` → next due item auto-surfaces; the last rating closes the modal and ticks the block done). `DayPlanner`'s `onMbbsReview` is additive/optional — exam/USM byte-identical.
- **Item-clear seam:** `ItemsCards` marking an item **cleared** shows a non-forced bottom-toast offer ("schedule a review?" Add / Not now) → `createSR` sourceType 'item' (idempotent).
- **Dashboard signal:** `MbbsDashboard` shows an amber **overdue-reviews banner** above the gate widgets when the queue has overdue items ("{n} review(s) overdue" + "Review now" → `/mbbs/review`). SR is preparation, **not** an eligibility gate — the verdict is untouched.
- **Reuse note:** `SRModal` is reused as-is; its "Questions Solved" field shows but the count is ignored for MBBS (topic/item review isn't question-based). Topic SR works because the modal's `subjectName` is the record's `topic_label`.

### T2-2 — Daily Routine settings tab for MBBS mode
- **`src/screens/Settings.jsx`**: `MBBS_TABS = ['Daily Routine', 'Danger Zone']`. `baseTabs` dispatch: `mode === 'university' ? UNI_TABS : mode === 'mbbs' ? MBBS_TABS : BASE_TABS`. `mbbsTabContent`: tab 0 = `<DailyScheduleSettings>` (prayer/CD-path/gym/work-schedule — already mode-agnostic), tab 1 = `<DangerZoneTab>`. Heading: `mode === 'mbbs' → 'Customise your study routine'`.
- `useDailySchedule` is fully mode-agnostic — reads prayer_times/cdpath_schedule/gym_schedule/work_schedule from `user_settings` regardless of app mode.

### T2-5 — Upcoming Exams spine (`mbbs_exam_events`)
- **`migrations/mbbs_002_exam_prep.sql` (run, M2)** holds `mbbs_exam_events` (id, user_id, subject_id, card_id, type `item_exam|card_exam|term_test|model_test|prof|other`, title, date, scope_note, status `upcoming|done|missed`, +T2-6 result/marks/max_marks).
- **`src/lib/mbbs/upcomingExams.js`** — pure `getUpcomingExams({ items, cards, formatives, events, config, today, horizonDays=30 })` → date-sorted `[{id,type,title,date,daysAway,subjectId,scopeNote,source}]` from card `card_exam_date` + future-dated formatives + ad-hoc/card events + the prof window (always appended even beyond horizon). **Items are NOT a date source** (no future-scheduled column). Also `examTypeMeta`, `countdown`.
- **`src/hooks/mbbs/useMbbsExamEvents.js`** — CRUD for `mbbs_exam_events` (addEvent/updateEvent/deleteEvent) + the T2-6 card layer (examCards keyed by exam_event_id, getExamCards, setExamCardsFor, createCardExam, recordResult). Missing newer columns/join table degrade via `42703/PGRST204/42P01/PGRST205`.
- **`src/components/mbbs/NextExamsWidget.jsx`** — dashboard "Next exams" card (next 4 + "See all" modal with add-ad-hoc-event form). "Revise for this" writes `localStorage:studyrise:mbbs:focus:<date>` = `{subjectId,label,daysAway}` → `/mbbs/today`. "Add to review" → `useMbbsSR.createSR` topic.
- **`src/lib/mbbs/dailyPlan.js`** — `generateDailyPlan` gains optional `focusSubjectId` (focused subject → priority 0 + a guaranteed revision task). **Bugfix**: formative-risk branch now reads `f.max_marks` (was `f.marks_max`, always undefined). `MbbsToday` reads the focus key → passes `focusSubjectId` + shows a "Preparing for: {event} — in N days" line.

### T2-6 — Card Exam Builder (`mbbs_exam_event_cards` + result columns)
- **`migrations/mbbs_003_card_exams.sql` — FILE ONLY, run via M6.** Adds `mbbs_exam_event_cards` (user_id, exam_event_id FK cascade, card_id FK cascade; RLS owner_all; idx on event + card), `result`/`marks`/`max_marks` on `mbbs_exam_events`. ~~Originally dropped `mbbs_question_logs`~~ — **DROP TABLE removed in Redesign Session 0** (Decision D2: table preserved; `mbbs_005_questions.sql` recreates it). Until run, card-exam create/result/join degrade gracefully.
- **`src/screens/mbbs/MbbsCardExams.jsx`** at **`/mbbs/card-exams`** (lazy) — build a card-compilation exam from a multi-select card picker grouped by subject (cross-subject allowed), name + date it; record result modal (pass/fail + marks) with **opt-in** log-as-formative (type `card_exam`) + advance-cards-status + manual add-items-to-review (`createSR` 'item'). Card layer lives in `useMbbsExamEvents` (createCardExam/setExamCardsFor/recordResult). Each card exam is an `mbbs_exam_events` row → flows into the T2-5 widget + cockpit prep line (no second list).

### T2-7 — Mistake log + review loop + rapid-review sheet (`mbbs_mistakes`) (⚠️ removed in Redesign Session 0)
- **`src/lib/mbbs/srService.js`** — stateless `createMbbsTopicSR(userId, {...})` (idempotent DB-dedup insert + `42703/PGRST204` fallback). Still present — used by `useMbbsSR.js` for topic SR; the mistake→SR graduation path lived only in `useMbbsMistakes.js` (deleted).
- **`src/hooks/mbbs/useMbbsMistakes.js`** — DELETED in Session 0. Orphan DB table `mbbs_mistakes` left physically untouched.
- **`src/screens/mbbs/MbbsMistakes.jsx`** — DELETED in Session 0; `/mbbs/mistakes` route removed. **`src/screens/mbbs/MbbsReviewSheet.jsx`** re-sourced from `mbbs_items.notes` in Session 0 (see Redesign Session 0 below). `MbbsToday` mistake-review section removed.

### T2-8 — Model tests / mocks (`mbbs_mocks` + `mbbs_mock_breakdown`) (⚠️ removed in Redesign Session 0)
- **`src/hooks/mbbs/useMbbsMocks.js`** — DELETED in Session 0. Orphan DB tables `mbbs_mocks`/`mbbs_mock_breakdown` left physically untouched.
- **`src/screens/mbbs/MbbsMocks.jsx`** — DELETED in Session 0; `/mbbs/mocks` route removed.

### T2 nav / routes (since T2-5–T2-8; mistakes + mocks removed in Redesign Session 0)
- **Sidebar `MBBS_NAV`** + **BottomTabBar `MBBS_TABS`/`MBBS_MORE_ITEMS`** include Card Exams (Award), Review Sheet (Printer), Review (T2-4). Model Tests (Target) and Mistakes (AlertTriangle) entries were present through T2-8 but **removed in Redesign Session 0**. App.jsx `mbbsRoutes` has `/mbbs/card-exams`, `/mbbs/review-sheet`. All new screens are own lazy chunks (exam/USM users never download them).
- **Correction (2026-06-20 doc audit):** `/mbbs/field-placements` is also routed (`mbbsRouteDefs` in App.jsx) but is **contextual — no persistent nav entry** (reached from the Attendance screen), the same pattern as `/mbbs/exam-prep` and `/mbbs/supplementary`.

### T2 QA — Bug fixes (2026-06-15, `main`)
- **`holiday_prefs` stored as `{}` in DB** — `mbbs_config.holiday_prefs` defaults to an empty jsonb object `{}` (not `[]` or null) when not explicitly set. The `??` null-coalescing guard passes `{}` through to `bdHolidays.getHoliday(date, extras)` which calls `extras.includes(date)` and crashes with "not a function". Fix: replaced `?? []` with `Array.isArray(config?.holiday_prefs) ? config.holiday_prefs : []` in `MbbsToday.jsx` (line 199) and `Timetable.jsx` (line 35). **Rule: any jsonb field that could be `{}` or `[]` must use `Array.isArray()` guard, not `??`.**
- **`ItemsCards.jsx` TABS constant** — `TABS` was defined as `[{ id: 'items', … }, { id: 'cards', … }]` but `Tabs2` reads `tab.key`. Fix: renamed `id` → `key` in the two `TABS` entries. This fixed: (1) React missing-key warning, (2) no tab showing as active (since `active === tab.key` was always `active === undefined`), (3) tab switching calling `onChange(undefined)` instead of `onChange('items'|'cards')`. **Rule: MBBS TABS constants must use `key` not `id` when passed to `Tabs2`.**

### Redesign Session 1 — Curriculum correctness + confidence labels + topic defaults + final-year classes (2026-06-16, `main`)
Four tasks correcting the BMDC curriculum and adding content-quality signals.
- **Task A — BMDC 2021 curriculum fix**: 2nd Prof corrected to Pharmacology & Therapeutics + Forensic Medicine & Toxicology (was Community Medicine + Forensic Medicine); 3rd Prof corrected to Community Medicine & Public Health + Pathology + Microbiology (was Pharmacology + Pathology + Microbiology). Anatomy expanded from 6 dissection cards to 10 cards (added Histology I/II/III + Embryology; item count 28→39). `_CARD_TOPICS_MAP` in `mbbsConstants.js` carries curated `item_topics: string[]` per card for datalist suggestions.
- **Task B — Confidence vocabulary**: `CONFIDENCE_VOCAB` (6 levels: national_confirmed / university_confirmed / college_confirmed / probable / student_shared_low_confidence / needs_primary_research) and `CONFIDENCE_COPY` (short onboarding copy per level) added to `mbbsConstants.js`. Every subject in `MBBS_PHASES` carries `items_confidence` and `cards_confidence`. `MbbsStepSubjects.jsx` surfaces these as color-coded labels (green for national_confirmed, amber for others) below the item count stepper and card list.
- **Task C — Topic datalist in ItemsCards**: `getSubjectTopics(subjectName)` searches all phases for a subject name, collects all `item_topics` across its cards, deduplicates, and returns a flat `string[]`. `AddItemForm` renders a `<datalist>` when suggestions exist; input gets `list={listId}`. All topic names remain freely editable.
- **Task C2 — Extended class types**: Added `ward_posting`, `integrated_teaching`, `generic_topic` (label "Other / Custom") to `MBBS_CLASS_TYPES` in `MbbsStepTimetable.jsx`; added "Ward posting", "Integrated teaching", "Generic topic", "Other" to `CLASS_TYPES` in `Timetable.jsx`. No migration needed (`mbbs_classes.class_type` is free-text).
- **Seed script** (`scripts/seed-istiaqmcp-mbbs.mjs`): 4 new Anatomy card rows + 11 new pending items; totals now 10 cards / 39 Anatomy items. Eligibility verdict unchanged (NOT_ELIGIBLE, same attendance/formative blockers). Build clean.

### Redesign Session 2 — MCQ/SBA practice logging + Analytics suite v1 (2026-06-16, `main`)
MCQ/SBA logging (the Written component is SAQ ≈70% + MCQ ≈20%) plus the analytics parity surface — reading existing tables, reusing the exam heatmap and porting the exam regression. Two own lazy chunks (exam/USM users never download them).
- **Migration `migrations/mbbs_005_questions.sql` (FILE ONLY — run manually in Supabase SQL Editor; idempotent).** Recreates `mbbs_question_logs (subject_id fk?, source, attempted, correct, time_minutes?, mode [first|review|mixed], date, note)` append-only (it was created in `mbbs_002`, dropped in `mbbs_003`), RLS owner-only, no `updated_at` trigger (mirrors `mbbs_study_log`), + `idx_mbbs_qlogs_date`/`_subject`. **The client degrades gracefully until it runs** (the hook catches `42P01/PGRST205/42703/PGRST204` → `available:false`, empty data, a banner on the Questions screen; saving works once applied).
- **`src/hooks/mbbs/useMbbsQuestionLogs.js`** — append-only CRUD on `mbbs_question_logs`: `logs`, `available`, `addLog`, `deleteLog`, `accuracyFor(subjectId?)` (per-subject or overall), `totalAttempted/totalCorrect/overallAccuracy`. Subject `null` = General / Mixed.
- **`src/screens/mbbs/MbbsQuestions.jsx` at `/mbbs/questions`** — port of the exam Questions screen onto the mbbs schema: log form (mode segmented control · subject incl. General/Mixed · free-text source · attempted/correct auto-capped · minutes · date · note · live accuracy badge), 4 KPIs (this week / accuracy 7d / today / overall), 30-day accuracy LineChart, by-subject accuracy bars (weakest first, subject-colour tokens via `getUnitColor`), recent-sets list with delete, and a "Flag for review" modal → `useMbbsSR.createSR` (sourceType 'topic'). Own lazy chunk.
- **`src/lib/mbbs/analytics.js`** (pure, barrel-exported) — two engines: `projectMbbsReadiness({ mocks, questionLogs, config, today })` ports the exam least-squares regression (`studyUtils.projectReadinessToExamDate`) to model-test scores against the prof window date (`windowToDate(config.exam_window)`), 60% pass line, ±1 SD band (floor ±3), 14-day MCQ-accuracy blend (weight 0.2 at ≥30 attempted), verdict `comfortable|borderline|at_risk|insufficient_data` (honest empty state with <2 dated mocks / no window / past window) + `PROJECTION_STYLE`; `rankMbbsWeakAreas({ subjects, questionLogs, formatives, mockBreakdowns, srRecords })` — composite weakness 0–100 (weakest first) from MCQ accuracy (40%) + formative avg (25%) + mock accuracy (25%, accepts `useMbbsMocks.breakdowns` keyed object or flat array) + SR overdue load (10%); components with no data drop out and reweight.
- **`src/screens/mbbs/MbbsAnalytics.jsx` at `/mbbs/analytics`** — self-fetching, own lazy chunk. Sections: pass-probability projection card (verdict-coloured left border, projected ± band, pass line + margin + trend, Recharts `ComposedChart` of mock scatter + dashed regression + band Area + 60% ReferenceLine; honest "Not enough data" state otherwise) → study heatmap (REUSES the exam `StudyHeatmap` with the Session-14 override props — minutes-by-date from `mbbs_study_log`, thresholds `[60,120]`, labels `0 min/<1h/<2h/2h+`; window = `config.phase_start_date`→prof window) → study balance (minutes by subject, horizontal `BarChart` with per-subject `Cell` colours) → item/card/posting pace (cumulative cleared-items line + per-subject `getItemPace` bars + cards complete count; **postings are nullable-tolerant** — a guarded `mbbs_clinical_postings` fetch arrives in Session 5, absent now → section omitted) → attendance-by-subject bars + formative-trend line → weak-area engine list. All charts Recharts + token colours; attendance % rounded at the call site (`attendancePct` returns raw).
- **Wiring:** `App.jsx` lazy imports `MbbsQuestions`/`MbbsAnalytics` + routes `/mbbs/questions` and `/mbbs/analytics`; Sidebar `MBBS_NAV` gains Questions (`PenLine`) + Analytics (`BarChart2`); BottomTabBar `MBBS_MORE_ITEMS` gains both. Hook + lib barrels updated.
- **QA'd live** (preview, seeded `istiaqmcp@gmail.com` 1st-Prof account): `/mbbs/analytics` renders all sections — projection "Not enough data" (no mocks), heatmap, study balance, item pace (Anatomy 14/28 OK etc · 0/16 cards), attendance by subject (rounded 74%/82%/83%), formative trend, weak areas (Anatomy 52 / Physiology 38 / Biochemistry 22); `/mbbs/questions` renders form + KPIs + the migration-not-run amber banner (correct — `mbbs_005` unrun) + empty states. No new console errors from Session 2 code (only a pre-existing `ReadinessGrid` key warning in `MbbsDashboard`). `npm run build` clean (MbbsAnalytics + MbbsQuestions each own lazy chunk).

### Redesign Session 3 — Admin control plane part 1: per-feature flag registry (core infra) (2026-06-16, `main`)
The Free/Pro split + on/off state becomes **configuration, not code** — a per-feature flag registry every later MBBS feature gates against, with the ethical floor (master doc §7.2) enforced in code AND the DB. Cross-cutting infra (main app + admin app); engines **extended, not forked**. Zero user impact today (registry seeds free/all-on; `subscription_activated` master switch is OFF so everything is free regardless).
- **Migration `migrations/core_feature_flags.sql` (FILE ONLY — run manually in Supabase SQL Editor; idempotent).** A CORE (not `mbbs_`-prefixed) shared-infra migration. `app_feature_flags (flag_key pk, module ['mbbs'|'exam'|'usm'|'core'], label, enabled bool default true, tier ['free'|'pro'] default 'free', is_floor bool default false, sort_order, updated_by, updated_at)`. **RLS = documented shared-read exception: SELECT all authenticated; INSERT/UPDATE/DELETE admin only** (`user_settings.admin_role IN ('super_admin','support')`; real writes use the service role). `reject_floor_flag_mutation()` BEFORE-UPDATE trigger blocks any change to a floor row's `enabled`/`tier`/`is_floor`. Seeds the 13 current MBBS rows `ON CONFLICT DO NOTHING` — **floor** (locked free+on): `mbbs.dashboard`/`today`/`timetable`/`attendance`/`review_sheet`; **non-floor free**: `mbbs.items`/`card_exams`/`formatives`/`questions`/`mocks`/`analytics`/`review`/`mistakes`. The client degrades gracefully until run (missing table → all-enabled/free → byte-identical to today).
- **`src/lib/mbbsFeatures.js`** — client catalogue: `MBBS_FEATURE_FLAGS` (key/label/route/tier/is_floor, mirrors the seed), `MBBS_FEATURE_DEFAULTS` (key→def), `MBBS_ROUTE_FLAG` (route path → flag key, used by both guards). Keep in sync with the migration seed.
- **`src/hooks/useFeatureRegistry.js`** — reads `app_feature_flags` (anon key + RLS). Returns `{ flags (keyed by flag_key), isEnabled(key) (default-ON: only an explicit enabled=false hides), tierOf(key), loading, refetch }`. Session-scoped missing-table marker `studyrise:registry:unavailable` (one 404, self-heals after migration).
- **`uniGates.js` extended (backward-compatible):** `GATE_CTX`/`configureGates` gain an optional `registry` map `{ flag_key: { tier, is_floor } }`. `canUse(feature)` resolution order: **floor → always open** (ethical-floor lock) → per-user override wins → master switch OFF → free → pro plan → open → **registry tier wins over the static `FEATURE_MATRIX`** → matrix fallback (existing uni gates). Omitting `registry` leaves all uni gate behaviour unchanged. `ProGate` resolves tier through `canUse` with no change.
- **`App.jsx`:** calls `useFeatureRegistry()`, passes `registry: registryFlags` into the existing `configureGates(...)`, builds `mbbsRoutes` from a `mbbsRouteDefs` array filtered by `isFeatureEnabled(MBBS_ROUTE_FLAG[path])` (disabled route omitted → `*` catch-all → `/` → `/mbbs`; floor routes never hidden), threads `isFeatureEnabled` into `Layout`.
- **Route + nav guard:** `Layout` → `Sidebar` + `BottomTabBar` take an `isFeatureEnabled` prop; Sidebar `MBBS_NAV` and BottomTabBar `MBBS_TABS`/`MBBS_MORE_ITEMS` filter MBBS entries whose `MBBS_ROUTE_FLAG` is disabled (non-MBBS modes + flagless entries always shown).
- **Admin app (`studyrise-admin/`):** `api/admin-actions.js` gains `get_feature_registry` (any admin, read) + `update_feature_flag` (super_admin only — in `SUPER_ADMIN_ONLY`; validates tier free|pro, **rejects enabled/tier changes on floor rows server-side**). `src/lib/adminApi.js` gains `fetchFeatureRegistry()` + `updateFeatureFlag(flagKey, { enabled?, tier? })`. The admin **UI** lands in Session 4; this session ships the data path + guard.
- **QA'd** (preview, seeded 1st-Prof, migration unrun): `/mbbs` renders normally; all 14 MBBS nav items present (registry unrun → all-enabled → byte-identical). Clean reload, no new steady-state console errors (only the pre-existing `ReadinessGrid` key warning). Route/nav guard + ProGate-tier + admin write path verifiable once `core_feature_flags.sql` runs (admin write path is post-deploy). Both `npm run build` (root + `studyrise-admin`) clean; infra only, no new lazy chunk.

### Redesign Session 4 — Admin control plane part 2: Feature Registry UI + MBBS gate wiring (2026-06-16, `main`)
Completed the admin control plane: built the Feature Registry admin UI and wired `<ProGate>` around the two Pro-gated MBBS sub-features. `subscription_activated` is still OFF so all ProGates render children normally — zero user impact.
- **Feature Registry admin panel** (`studyrise-admin/src/screens/FeatureFlags.jsx`): new **Feature Registry** Card added at the TOP (above existing Global flags + User Overrides). State: `registryFlags`, `registryLoading`, `registryError`, `busyRegKey`. `loadRegistry` useCallback using `fetchFeatureRegistry()` fires on mount. `registryByModule` useMemo groups flags by module in order: mbbs → usm → exam → core. Each group renders a column-header row (Feature / Enabled / Tier) then per-flag rows: `label` + monospace `flag_key` subtitle · `ToggleSwitch` (disabled when `is_floor || !isSuperAdmin || busy`) · `TierControl` "Free | Pro" segmented control (navy bg for Pro, soft-green for Free; same disabled conditions) · amber 🔒 `Lock` icon on floor rows. `handleRegistryToggle(flag, key, value)` calls `updateFeatureFlag` + updates local state + shows a toast. Empty state when table missing points at `migrations/core_feature_flags.sql`. New `TierControl` inline component (module-level). `useMemo` + `fetchFeatureRegistry`/`updateFeatureFlag` added to imports.
- **Migration `migrations/core_feature_flags.sql`** — Session 4 INSERT block (idempotent, `ON CONFLICT DO NOTHING`) adds 12 new rows: Pro sub-features `mbbs.analytics_full` (sort 115) / `mbbs.review_full` (125) / `mbbs.mistakes_full` (135); future free screens `mbbs.postings` (140) / `mbbs.case_log` (200) / `mbbs.resources` (210) / `mbbs.internship` (220); future Pro screens `mbbs.viva` (150) / `mbbs.ospe` (160) / `mbbs.custom_exams` (170) / `mbbs.question_bank` (180) / `mbbs.supplementary_planning` (190).
- **`src/lib/mbbsFeatures.js`** — 12 new entries matching the seed (correct `route`/`tier`/`is_floor` per feature; Pro sub-features have `route: null`).
- **`src/lib/uniGates.js` `GATE_COPY`** — 8 MBBS Pro gate entries added (keyed by `flag_key`, resolved via `canUse + registry`): `mbbs.analytics_full` / `mbbs.mistakes_full` / `mbbs.review_full` / `mbbs.viva` / `mbbs.ospe` / `mbbs.custom_exams` / `mbbs.question_bank` / `mbbs.supplementary_planning`.
- **`src/screens/mbbs/MbbsAnalytics.jsx`** — pass-projection section wrapped `<ProGate feature="mbbs.analytics_full">`. `ProGate` import added.
- **`src/screens/mbbs/MbbsMistakes.jsx`** — review queue section was wrapped `<ProGate feature="mbbs.mistakes_full">`. (⚠️ file deleted in Redesign Session 0 — ProGate no longer present; `mbbs.mistakes_full` key remains registered in the feature registry for a future rebuild.)
- **`MbbsReview.jsx` NOT gated:** `mbbs.review` (the whole screen) stays free; `mbbs.review_full` is registered for a future Lite vs Full SR split but no ProGate wired yet.
- **QA:** Both `npm run build` (root) and `cd studyrise-admin && npm run build` clean. ProGate wrappers transparent while `subscription_activated=false`. Admin UI data path (toggle/tier) is post-deploy only (serverless).

### Redesign Session 0 — Cleanup: remove mistakes + mocks, re-source review sheet (2026-06-16, `main`)
Code-only cleanup pass (no migration). Orphan DB tables `mbbs_mistakes`, `mbbs_mocks`, `mbbs_mock_breakdown` left physically in the DB untouched.
- **Deleted:** `src/screens/mbbs/MbbsMistakes.jsx`, `src/hooks/mbbs/useMbbsMistakes.js`, `src/screens/mbbs/MbbsMocks.jsx`, `src/hooks/mbbs/useMbbsMocks.js`.
- **`src/App.jsx`:** removed lazy imports + routes for `/mbbs/mistakes` and `/mbbs/mocks`; comment updated. Route `/mbbs/review-sheet` kept.
- **`src/components/Layout/Sidebar.jsx`:** removed "Model Tests" (Target icon) and "Mistakes" (AlertTriangle) from `MBBS_NAV`; removed `Target` import (now unused); `AlertTriangle` kept (still used by exam `/mistakes` entry on line 22).
- **`src/components/Layout/BottomTabBar.jsx`:** same removals as Sidebar; same icon-import reasoning.
- **`src/screens/mbbs/MbbsToday.jsx`:** removed `useMbbsMistakes` import, `getDueMistakeReviews` hook call, `dueMistakes` memo, the "4b — Mistake reviews due" JSX block, and the `MistakeReviewRow` component.
- **`src/screens/mbbs/MbbsAnalytics.jsx`:** removed `useMbbsMocks` import + `{mocks, breakdowns}` hook call; `projectMbbsReadiness` now called with `mocks: []`; `rankMbbsWeakAreas` called with `mockBreakdowns: []`; `mocks.length` removed from `noData` guard. Both engine functions degrade gracefully on empty inputs.
- **`src/screens/mbbs/MbbsReviewSheet.jsx`:** complete rewrite — data source changed from `useMbbsMistakes().mistakes[].correction_note` to `useMbbsItems().items[].notes`; notes grouped by subject (alphabetical); "Back" now navigates to `/mbbs`; empty state points to Items & Cards; heading/count copy updated ("notes" not "rules"). Print CSS + `window.print()` unchanged.
- **`src/hooks/mbbs/index.js`:** removed barrel exports for `useMbbsMistakes`/`MBBS_MISTAKE_TYPES`/`nextReviewInterval` and `useMbbsMocks`/`pctOf`.
- **`migrations/mbbs_003_card_exams.sql`:** removed `drop table if exists public.mbbs_question_logs cascade;` (Decision D2 — table preserved; Redesign Session 2's `mbbs_005_questions.sql` recreates it properly).
- **`docs/mbbs/06_MBBS_BUILD_LOG.md`:** Session 0 entry appended.
- **Build:** `npm run build` clean (4187 modules, 27s). `MbbsMistakes` and `MbbsMocks` chunks absent from dist. `MbbsReviewSheet` 4.67 kB / 1.99 kB gz own lazy chunk.

### Redesign Session 2 (v2.0) — MCQ flag default off + admin Feature Registry UI close-out (2026-06-16, `main`)
Decision D2 enforcement + stale catalogue cleanup. Admin UI was already complete (Redesign Session 4).
- **`migrations/core_feature_flags.sql`:** `mbbs.questions` seed row changed from `enabled:TRUE` to `enabled:FALSE`; idempotent `UPDATE` appended at end of file (`SET enabled = FALSE WHERE flag_key = 'mbbs.questions' AND enabled = TRUE`) so re-running corrects existing installations. No new rows or schema changes.
- **`src/lib/mbbsFeatures.js`:** removed stale `mbbs.mocks` (route `/mbbs/mocks`) and `mbbs.mistakes` (route `/mbbs/mistakes`) entries — screens were deleted in Redesign Session 0; keeping them in `MBBS_ROUTE_FLAG` would have caused dangling route checks. `mbbs.questions` entry retained (`tier:'free'`, `is_floor:false`); the DB holds `enabled:false`.
- **`studyrise-admin/src/screens/FeatureFlags.jsx`:** already complete — Feature Registry Card with module grouping, `ToggleSwitch`/`TierControl` per row, amber Lock icon on floor rows, empty-state pointing at the migration. No code changes this session.
- **Build:** both `npm run build` (root + `studyrise-admin`) clean. No new chunks.

### Redesign Session 3 (v2.0) — Inline item CRUD inside Cards tab (2026-06-16, `main`)
Cards tab now expands each card inline to show its items with add/edit (opens existing `ItemDrawer`). No new tables, hooks, or routes.
- **`src/screens/mbbs/ItemsCards.jsx`** (727 lines, major rewrite of Cards tab):
  - Added `ChevronDown` import.
  - New `CardsTab` component: manages `expandedCardId` + `addingCardId` local state; single card expands at a time; renders subject dot+name header, then each card via `CardCard`.
  - New `CardCard` component: full card header (ring, name, status badge, chevron) is click-to-toggle; chevron rotates 180° when expanded; when expanded shows a bordered inner region with `ItemRow` list and either `AddItemForm` (`isAdding=true`) or a ghost `+ Add item` button (`e.stopPropagation()` prevents header toggle); `ItemRow` click → `onEditItem(item)` → opens existing `ItemDrawer` modal.
  - Main `ItemsCards`: passes `onEditItem` and `onAddItem` props into both `ItemsTab` and `CardsTab`; removed `filterCardId`/`handleFilterItems` cross-tab wiring (no longer needed).
  - `TABS` constant correctly uses `key` not `id` (T2 QA fix applied).
- **Build:** `npm run build` clean. No new lazy chunks.
- **QA'd (preview):** Cards tab renders grouped subjects with rings, status badges, chevrons. Thorax expands showing 5 items (4 CLEARED + 1 PENDING); chevron rotates to ↑. Clicking an item opens `ItemDrawer` with all fields. `+ Add item` inline `AddItemForm` renders with datalist. No `filterCardId` errors after dev-server restart (only pre-existing `ReadinessGrid` key warning in `MbbsDashboard.jsx`).

### v2.0 Session 4 — University Question Bank (2026-06-16, `main`)
Past professional questions: admin-seeded global content + student-private content, with coverage tracking, plan/SR integration, and contextual surfacing. **3 migrations are FILE-ONLY — run manually in Supabase**; the client degrades on `42P01/PGRST205/42703/PGRST204`.
- **Migrations:** `mbbs_004_questions_restore.sql` (idempotent `mbbs_question_logs` restore — no-op, `mbbs_005_questions.sql` already does it). `mbbs_008_question_bank.sql` (data-model C5, **two RLS scopes in one file**: shared-read/admin-write `mbbs_universities` + `mbbs_university_questions`; owner-only `mbbs_question_study_status` + `mbbs_user_questions` + `mbbs_user_universities`; seeds 5 universities). `core_feature_flags.sql` appended a v2.0 block (new flags + idempotent UPDATE repurposing `mbbs.question_bank` → free).
- **`src/hooks/mbbs/useMbbsQuestionBank.js`** — `useMbbsQuestionBank(config)` unions seeded + owner questions for the querying user only; resolves `myUniversityId` from `mbbs_config.university` (id or legacy name); `markStudied`/`addUserQuestion`/`addUserUniversity`/`coverageForSubject(subject, univIds, qType)`; `available:false` when tables missing.
- **`src/screens/mbbs/MbbsQuestionBank.jsx`** at **`/mbbs/questions-bank`** (own lazy chunk, FREE) — scope filter (mine/select/all verified), subject + q_type filters, per-subject coverage bars, studied toggle + confidence chips, **Use in plan** (→ `mbbs_daily_tasks` via `useMbbsDailyTasks.addTask`), **Add to review** + studied-spawns-SR (`useMbbsSR.createSR`), add-private-question + add-private-university modals. Runs a one-time legacy-string→id backfill of `mbbs_config.university`.
- **`src/components/mbbs/ContextualQuestionPanel.jsx`** (D-qbank) — surfaces matching university questions for a subject/topic with "completed learning these?" → mark studied + spawn SR; wrapped in `<ProGate feature="mbbs.qb_surfacing">` (Pro automation; browsing free). Mounted in `ItemsCards.jsx` `ItemDrawer` (editing an existing item).
- **Onboarding (D4):** `MbbsOnboarding.jsx` fetches `mbbs_universities` → passes to `MbbsStepCollege.jsx` (`universities` prop); the Step-2 university select stores a real `university_id` into `mbbs_config.university` (falls back to `MBBS_UNIVERSITIES` names pre-migration).
- **Flags/nav:** `mbbsFeatures.js` — `mbbs.question_bank` (free, `/mbbs/questions-bank`) + `mbbs.qb_surfacing` (pro, null). `uniGates.js` GATE_COPY for `mbbs.qb_surfacing`. `App.jsx` lazy + routeDef. Sidebar + BottomTabBar entry "Question Bank" (`Library` icon). hooks barrel.
- **Admin app:** `admin-actions.js` actions `get_qb_data` (read) + `qb_create/update/delete_university` + `qb_create/update/delete_question` (super_admin; in `SUPER_ADMIN_ONLY`). `adminApi.js` wrappers. `studyrise-admin/src/screens/QuestionBankAdmin.jsx` (manage universities + author seeded questions; support read-only). Layout nav + App route `/question-bank`.
- **Deviation:** legacy `mbbs.question_bank` flag repurposed to the FREE browse screen; the Pro contextual automation rides on the new `mbbs.qb_surfacing`.

### v2.0 Session 5 — Viva Question Bank (2026-06-16, `main`)
Community-driven viva/SOE bank with admin verification + an SR-feeding practice mode. **`mbbs_007_viva_bank.sql` is FILE-ONLY — run manually**; client degrades gracefully.
- **Migration `mbbs_007_viva_bank.sql`** (data-model C4, **two RLS scopes in one file**): shared-read/admin-write `mbbs_viva_questions_verified`; owner-only `mbbs_viva_questions_user` + `mbbs_viva_practice_log` (append-only, no trigger) + `mbbs_viva_locked`.
- **`src/hooks/mbbs/useMbbsViva.js`** — `useMbbsViva(config)` reads the verified pool + owner tables; **auto-tags `origin_college` + `origin_university_id` from `mbbs_config` on add** (the student never tags origin); `filterByScope('college'|'university'|'all')` (own questions always included); `requestPromote(id)`, `logPractice({...confidence})`, `toggleLock`; `available:false` on missing tables. SR spawning is done by the screen (keeps `useMbbsSR` the single source).
- **`src/screens/mbbs/MbbsViva.jsx`** at **`/mbbs/viva`** (own lazy chunk) — browse + scope chips; verified questions show origin label **and** "StudyRise Verified", own show "Mine" + "Submit for verification"; per-question lock (star) for the per-exam shortlist (`mbbs_viva_locked`). **Practice mode** (`PracticeRunner`): read → reveal → rate Easy/Medium/Hard/Blackout; uses the subject topic-list (`getSubjectTopics`) as the spine so it covers **every topic** even with zero questions; Hard/Blackout spawns an `mbbs_sr_records` topic row (sr1 in 3d blackout / 7d hard). Browse FREE; unlimited practice = `mbbs.viva_practice_unlimited` (Pro — registered, cap not enforced while the subscription switch is off).
- **Flags/nav:** `mbbsFeatures.js` — `mbbs.viva_bank` (free, `/mbbs/viva`) + `mbbs.viva_practice_unlimited` (pro, null). `uniGates.js` GATE_COPY. `App.jsx` lazy + routeDef. Sidebar + BottomTabBar entry "Viva Bank" (`MessageSquareQuote` icon). hooks barrel.
- **Admin app:** `admin-actions.js` actions `get_viva_data` (promote-requested queue + verified pool) + `viva_promote_question` (insert verified with origin carried over, clears the source row's `promote_requested`) + `viva_update_verified` + `viva_delete_verified` (super_admin). `adminApi.js` wrappers. `studyrise-admin/src/screens/VivaAdmin.jsx` (verification queue → improve answer → promote; verified pool edit/delete). Layout nav + App route `/viva-bank`.
- **Deviation:** the verified table stores subject as `subject_ref` (name) — the admin sets it on promotion (user rows carry `subject_id`, not the name).

### v2.0 Session 6 — Topic-by-topic completion (2026-06-16, `main`)
Per-topic coverage tracking within each card; optional SR offer when a topic is marked studied. **`mbbs_006_topic_completion.sql` is FILE-ONLY — run manually**; client degrades gracefully (`available:false`, amber banner in checklist, read-only UI).
- **Migration `mbbs_006_topic_completion.sql`** — `mbbs_topic_completion (id, user_id, subject_id, card_id nullable, topic_label, status CHECK('not_studied','studying','studied'), confidence CHECK('shaky','ok','strong') nullable, studied_at, created_at, updated_at)`. UNIQUE(user_id, subject_id, topic_label). RLS `owner_all`. `set_updated_at` trigger. Two indexes: `idx_mbbs_topic_completion_subject` on (user_id, subject_id); `idx_mbbs_topic_completion_studied` partial on (user_id, status) WHERE status='studied'. All idempotent (`IF NOT EXISTS`).
- **`src/hooks/mbbs/useMbbsTopicCompletion.js`** (NEW) — `useMbbsTopicCompletion()`: uses `const { user } = useAuth()` internally (no parameter). Returns `rows`, `loading`, `available`, `coverageBySubject` (useMemo → `{ [subjectId]: { studied, studying, rows[] } }`), `setTopicStatus({ subjectId, cardId, topicLabel, status, confidence })` (upsert on conflict `user_id,subject_id,topic_label`; stamps `studied_at` when status='studied'), `resetTopic({ subjectId, topicLabel })` (delete), `getTopicRow(subjectId, topicLabel)`, `refetch`. Degrades gracefully on `42P01/PGRST205/42703/PGRST204`.
- **`src/screens/mbbs/ItemsCards.jsx`** — topic completion UI added throughout:
  - `TOPIC_CYCLE`: `not_studied → studying → studied → not_studied`.
  - `TOPIC_STYLE`: status-keyed `{ color, icon, badge }` (gray / amber+Clock / green+CheckCircle2).
  - **`TopicChecklist` component**: renders curated topics from `getCardTopics(cardName)` per card; tap-to-cycle with color-coded backgrounds; fires non-forced `onSrOffer` when transitioning to 'studied'; amber degrade notice when `!available`.
  - **ItemsTab**: shows `"{pct}% topics"` coverage badge in subject group headers (green ≥80% / amber ≥40% / gray).
  - **CardCard**: shows `"{studied}/{total} topics"` subtitle + BookOpen badge; renders `<TopicChecklist>` inside expanded region after items list.
  - Main `ItemsCards`: calls `useMbbsTopicCompletion()`; distinguishes SR offer type `'item'` vs `'topic'` in toast copy.
- **Feature flag + catalogue:** `migrations/core_feature_flags.sql` appended Session 6 INSERT (`mbbs.topic_completion`, free, non-floor, sort_order 240, `ON CONFLICT DO NOTHING`). `src/lib/mbbsFeatures.js` gains matching entry (free, `route: null`). `src/hooks/mbbs/index.js` barrel updated.
- **`coverageBySubject` is available** for future sessions (S8 projection, S10 exam-period planner) — the hook returns it and callers compute the "total" topic count via `getSubjectTopics(subject.name).length` (the DB does not store the canonical topic list).
- **Confidence UI** deferred — `setTopicStatus` persists the `confidence` field, but no picker wired yet (future polish session).

### v2.0 Session 7 — Term object + real BMDC formative model (2026-06-16, `main`)
Adds the term unit (each term a hard 60% gate) and the real BMDC 1st-Prof formative computation. **`mbbs_005_terms.sql` is FILE-ONLY — run manually**; client degrades gracefully (`available:false`).
- **Migration `mbbs_005_terms.sql`** — `mbbs_terms` (term_number, name, phase, start/end_date, status `active|complete|upcoming`, sort_order) + `mbbs_term_results` (term_id FK cascade, subject_id FK cascade, written/oral/practical marks+max, passed_* flags, note; UNIQUE(user,term,subject)) + nullable `term_id` FK on `mbbs_cards` and `mbbs_formatives`. RLS `owner_all`, triggers, 3 indexes. **Distinct filename from the existing `mbbs_005_questions.sql`** — both coexist; the number is an ordering hint only.
- **`src/hooks/mbbs/useMbbsTerms.js`** (NEW, barrel-exported) — terms + term-results CRUD (`addTerm`/`updateTerm`/`deleteTerm`/`seedTerms`/`setTermResult` upsert on `user,term,subject`) + selectors (`resultsForSubject`, `getResult`, `termRollups`). Degrades gracefully.
- **`src/lib/mbbs/formativeHelpers.js`** — BMDC 1st-Prof model: `bmdcFormativeMark(termResults, attPct)` → 15 (term component via banded `termComponentMark` table) + 5 (`attendanceComponentMark`), **floored at 12/20**; `termResultPct(result)` (component-weighted %); `TERM_PASS_THRESHOLD=60`, `BMDC_FORMATIVE_FLOOR=12`. Band values are a transparent editable approximation; the floor + per-term 60% gate are binding.
- **`src/lib/mbbs/eligibility.js`** — `formativeGate` is **phase-aware**: 1st Prof WITH term results uses the term gate (subject term <60% → breach), else falls back per-subject to the weighted average; other phases unchanged. `computeEligibility` gained optional `termResults` (backward compatible — omitting it is byte-identical).
- **`src/screens/mbbs/Formatives.jsx`** — **Term results — BMDC formative model** section (1st Prof only): auto-seeds the term skeleton (`termsForPhase`) once when the table exists; per-subject card with tap-to-edit per-term cells (`TermResultModal`: written/oral/practical marks), computed formative /20 + floor note + term-fail badge + visible conversion math; amber degrade banner when unrun. Weighted-average cards remain below for other formatives.
- **`mbbsConstants.js`** — `MBBS_TERM_COUNTS` (1st=3, 2nd/3rd=2, final=2) + `termsForPhase(phaseId)`.
- **`MbbsDashboard.jsx` + `MbbsToday.jsx`** — pass `termResults` into `computeEligibility`; Dashboard formative roll-up is phase-aware (BMDC mark ≥12 + no failing term for 1st Prof).
- **Flags:** `mbbs.terms` (free) + pre-registered `mbbs.pass_projection` (pro), `mbbs.exam_period` (free), `mbbs.exam_period_planner` (pro) in `mbbsFeatures.js` + `core_feature_flags.sql`.
- **Deviation:** onboarding does NOT write term rows (would fail the save pre-migration) — Formatives auto-seeds on first mount.

### v2.0 Session 8 — Redesigned Pass Probability Projection + analytics (2026-06-16, `main`)
The projection is rebuilt on **gates + coverage + retention + send-up** (D6); a flagged-off feature contributes nothing (D2/D7). No migration (reads existing tables).
- **`src/lib/mbbs/passProjection.js`** (NEW, pure) — `computePassProjection({ subjects, attendance, formatives, items, cards, termResults, topicCoverage, qbCoverage, srCompliance, sendup, config, flags, today })` → `{ status, hasData, overall (0–100 index), subjects:[{gate,coverage,score,band}], layers:{gates,coverage,retention,sendup→{score,weight,present}}, message }`. Four layers (gates 0.40 / coverage 0.25 / retention 0.15 / send-up 0.20, redistributed across present). `gateReadiness(pct,gateLine)` (attendance 75, formative 60 term-aware via `bmdcFormativeMark`, item pace via `getItemPace`); coverage = mean(topic %, QB %); retention = SR compliance; send-up = normalised result. **Honest `not_enough_data`** unless ≥2 layers present (or send-up alone). Verdicts on_track ≥70 / borderline ≥50 / at_risk <50. **MCQ is not a layer — D2/D7 satisfied by construction; mocks removed entirely.** Exports `PROJECTION_STYLE` + `LAYER_LABELS`. NOT star-exported from `lib/mbbs/index.js` (analytics.js also exports `PROJECTION_STYLE`) — import directly.
- **`src/screens/mbbs/MbbsAnalytics.jsx`** — projection card rebuilt (overall index + verdict badge + per-layer bars + per-subject band chips + honest empty state; old mock-regression chart removed); wrapped `<ProGate feature="mbbs.pass_projection">`. Feeds topicCoverage (`useMbbsTopicCompletion` ÷ `getSubjectTopics(name).length`), qbCoverage (`useMbbsQuestionBank.coverageForSubject`), srCompliance (`useMbbsSR.getCompliance`), termResults, `config.sendup`, flags. **Weak-area engine excludes MCQ when off** (`questionLogs: mcqEnabled ? questionLogs : []`, `mcqEnabled = isEnabled('mbbs.questions')`).
- **Flags:** `mbbs.pass_projection` (pro) — the projection gate. The rest of analytics stays under `mbbs.analytics_full`.
- **Deviation:** dashboard projection wiring deferred to S12 (analytics is the S8 home). QB coverage uses all-verified scope.

### v2.0 Session 9 — Exam Period System part 1: schedule + send-up + state machine (2026-06-16, `main`)
The structural foundation for the during-exam experience (S10). **`mbbs_009_exam_period.sql` is FILE-ONLY — run manually**; client degrades gracefully.
- **Migration `mbbs_009_exam_period.sql`** — `mbbs_prof_schedule` (subject_id FK cascade, component `written|viva`, exam_date, sequence, note; UNIQUE(user,subject,component,exam_date) → 2 vivas/subject allowed) + `mbbs_exam_reflections` (subject_id, component, felt, asked_new, date). RLS `owner_all`, triggers, 3 indexes. Send-up + exam-period state are jsonb on `mbbs_config` (no table).
- **`src/hooks/mbbs/useMbbsProfSchedule.js`** (NEW, barrel-exported) — CRUD + `addReflection`; selectors `nextExam(from)`, `examsForSubject`, `writtenDates`, `vivaDates`, `dateConflict(date,component,excludeId)` (D10 — written/viva never share a day), `reflectionFor`. Degrades gracefully.
- **`src/lib/mbbs/examWindow.js`** — `getExamPeriodState(config, schedule, today)` → state ∈ none|prep|gap|window|done (from `exam_period.declared_at` + schedule + today; explicit `gap` respected before first exam). `EXAM_PERIOD_STATES` map.
- **`src/lib/mbbs/upcomingExams.js`** — `getUpcomingExams` gained `profSchedule` + `subjects`: future written/viva dates emitted as anchor targets. `NextExamsWidget` feeds them (dashboard shows written/viva dates).
- **`src/screens/mbbs/MbbsExamSchedule.jsx`** (NEW, lazy) at `/mbbs/exam-schedule` — prep-status card (declare prep / mark done / reset / open exam prep), send-up capture (→ `mbbs_config.sendup`), written+viva date list with overlap-blocking add modal. `mbbs.exam_period` (free).
- **Onboarding** — `MbbsStepCollege` "Does your college hold a send-up exam?" chip; `MbbsOnboarding` writes `sendup` + `exam_period` into `mbbs_config`.
- **`mbbs_config` v2.0 keys now written:** `sendup:{has_sendup,date,result}` + `exam_period:{state,declared_at}`.

### v2.0 Session 10 — Exam Period System part 2: during-exam focus + pre-prof mode (2026-06-16, `main`)
The during-exam payoff — one exam at a time + the pre-prof planner. No migration (reads S9 + existing). Forward-looking coverage only; SR stays separate (D5).
- **`src/lib/mbbs/prePropPlan.js`** (NEW, pure) — `getExamFocus({schedule,today,recentDays})` → `{ hasSchedule, current(+daysUntil), upcoming, recentlyPassed(+daysSince) }`; `buildSubjectRunPlan({topics,completionRows,daysAvailable,component})` → first-pass (gaps) / second-pass (studying) / revision (studied) + per-day target (viva = whole topic spine); `buildPrePropPlan({subjects,topicsForSubject,completionRowsBySubject,schedule,today})` → per-subject run-up ordered by nearest exam then lowest coverage. Topic spine = `getSubjectTopics(name)`, completion from `useMbbsTopicCompletion`.
- **`src/screens/mbbs/MbbsExamPrep.jsx`** (NEW, lazy) at `/mbbs/exam-prep` — `<ProGate feature="mbbs.exam_period_planner">`. State-aware: `none` → nudge to /mbbs/exam-schedule; `window` → **Focus now** card (current subject+component, run plan, viva bank surfacing incl. locked shortlist via `useMbbsViva`, "Study this today" → cockpit focus) + "after this" list; `gap` → calm note; the per-subject run-up overview (expandable run plans). **Post-exam reflections**: Good/Okay/Not sure → `addReflection`; after a viva "anything new asked?" → `useMbbsViva.addUserQuestion` + `requestPromote`. SR-separate footnote → /mbbs/review.
- **`src/screens/mbbs/MbbsToday.jsx`** — during the window the cockpit auto-focuses the next exam's subject (`getExamFocus` overrides the manual focus → `effectiveFocusId` feeds `generateDailyPlan`); coloured **Exam window — focus** banner above the (suppressed) old focus line.
- **`src/screens/mbbs/MbbsDashboard.jsx`** — exam-period banner (prep/gap/window) above the gate widgets with "Open prep" → /mbbs/exam-prep.
- **Wiring:** `App.jsx` lazy + routeDef `/mbbs/exam-prep` (`mbbs.exam_period_planner`, pro — open while subscription off). No dedicated nav entry (reached contextually).

### v2.0 Session 11 — Holidays: admin government + student college (2026-06-16, `main`)
Three-source holiday calendar — static BD_HOLIDAYS_2026 + admin-pushed `mbbs_gov_holidays` (DB) + student college `holiday_prefs` (jsonb). Floor feature — always free, always on.
- **`migrations/mbbs_010_holidays.sql`** (FILE-ONLY — run manually): `mbbs_gov_holidays (id uuid PK, date date NOT NULL, name text NOT NULL, year integer NOT NULL, created_at, updated_at)`. UNIQUE on `(date, name)`, index on `year`, `set_mbbs_gov_holidays_updated_at` trigger. RLS: SELECT for all authenticated; no INSERT/UPDATE/DELETE policy (service role bypasses for admin writes).
- **`src/hooks/mbbs/useMbbsGovHolidays.js`** (NEW) — fetches `mbbs_gov_holidays` via anon key + shared-read RLS; returns `{ govHolidays, loading, available }`; session-scoped `sessionStorage` unavailability marker on table-missing errors; barrel-exported via `src/hooks/mbbs/index.js`.
- **`src/lib/mbbs/bdHolidays.js`** (MODIFIED) — `getHoliday(dateISO, extraHolidays=[], govHolidays=[])` + `isHoliday(dateISO, extraHolidays=[], govHolidays=[])` gain backward-compatible 3rd `govHolidays` param; priority: static BD_HOLIDAYS_2026 first (national holidays always definitive) → admin govHolidays → student college extras.
- **`src/screens/mbbs/Timetable.jsx`** (MODIFIED) — `useMbbsGovHolidays` hook + `toggleCollegeHoliday(dateISO)` writes `mbbs_config.holiday_prefs` via `updateSettings`; day-header shows Flag button per day (amber = college holiday set, gray-faint = not set); holiday badge is amber+Flag for college vs red for public/gov; all `getHoliday`/`isHoliday` calls pass 3 sources. `Array.isArray()` guard on `holiday_prefs` (critical — DB defaults `{}` not `[]`).
- **`src/lib/mbbsFeatures.js`** (MODIFIED) — `mbbs.holidays` entry (tier:'free', is_floor:true). `migrations/core_feature_flags.sql` appended (sort_order 265, enabled TRUE, is_floor TRUE).
- **Admin app — `studyrise-admin/src/screens/HolidayAdmin.jsx`** (NEW) — full CRUD for gov holidays: `HolidayForm` (date/name/year, auto-fills year from date); `ConfirmModal` for deletes; year-filter tabs when multiple years; all writes gated on `isSuperAdmin = role === 'super_admin'`; toasts (success/error).
- **Admin app — `studyrise-admin/api/admin-actions.js`** (MODIFIED) — `SUPER_ADMIN_ONLY` gains `add_gov_holiday`/`update_gov_holiday`/`delete_gov_holiday`; dispatch + helper functions `getGovHolidays`/`addGovHoliday`/`updateGovHoliday`/`deleteGovHoliday` added. `studyrise-admin/src/lib/adminApi.js` gains 4 wrappers. `Layout.jsx` nav + `App.jsx` route `/holidays` wired.

### v2.0 Session 12 — Interactive dashboard pass (2026-06-16, `main`)
Makes the dashboard interactive for clarity, never compulsion — no streaks, no guilt. Verdict math unchanged (interactions read engines). No migration.
- **`src/screens/mbbs/MbbsDashboard.jsx`** — major rewrite. 6 interactive features:
  1. **Tappable gate rings expanding inline** — `expandedGate` state; `GateWidget` refactored with `expanded`/`onToggle`/`expandContent` props; header is a `<button>` with animated `ChevronDown` (rotates 180°); `AnimatePresence` + `expandY` for expand panel.
  2. **What-if attendance simulator** — per-subject range sliders (0–20 extra classes) in the attendance expand panel; live `whatIfElig` re-runs `computeEligibility` with modified `classes_attended`; amber verdict-diff banner.
  3. **Prof-countdown scrubber** — range slider (1–weeksLeft) in Prof Window expand; `scrubberElig` projects attendance linearly (current rate × extra weeks) → re-runs `computeEligibility`; shows breach/caution subjects at the projected week.
  4. **Swipeable subject cards** — "Subject snapshot" horizontal-scroll row (128px/card, `scrollbar-width: none`); attendance bar (zoneBarColor/zoneColor), items count; tap opens attendance gate expand.
  5. **Inline SR quick-action** — top 2 due reviews shown as mini cards in the overdue banner; "Done ✓" → `completeSRHit(item.record, 'easy')` + `srDone` optimistic Set.
  6. **"Today's one thing" focus card** — top priority subject from `generateDailyPlan`; "Focus today →" writes `localStorage:studyrise:mbbs:focus:${today}` = `{subjectId, label, daysAway:0}` → navigate `/mbbs/today`.
  - `ReadinessGrid` moved to Prof Window `expandContent` (kept compact when collapsed).
  - New imports: `useCallback`, `AnimatePresence`, `expandY`, `ChevronDown`, `Target`, `daysCanMiss`, `zoneBarColor`, `zoneColor`, `completeSRHit`, `generateDailyPlan`.
- Build: `MbbsDashboard` 40.03 kB / 10.55 kB gz (own lazy chunk). `npm run build` clean (14.4s). Exam/USM unaffected.

### v2.0 Session 13 — Gate-protection digest + holiday/gap hooks + .ics export (2026-06-16, `main`)
Closes the daily hook without anxiety mechanics; reaches calendar parity. No migration.
- **`src/lib/mbbs/mbbsNotifications.js`** (NEW) — **Floor feature: never paywalled, never toggleable off system-wide.** `DAILY_CAP = 3`. Four notify types: `morning_digest` (8 AM gate-protection digest — attendance standing, SR due, classes today), `sr_due` (9 AM when reviews due/overdue), `attendance_warning` (10 AM when a subject is 65–78%), `holiday_window` (8:30 AM when ≥2 consecutive holiday days within 1–4 days). Pure `computeMbbsNotifications` (24h window, quiet hours shifted, hard cap 3/day priority-sorted). Self-fetching `scheduleMbbsNotifications(userId, settings)`. **Attendance warning correctly calls `attendancePct(r.classes_attended||0, r.classes_held)` per row (not array+id), takes the minimum across class types.** `Array.isArray(config?.holiday_prefs)` guard throughout.
- **`src/components/Settings/MbbsNotificationsTab.jsx`** (NEW) — port of `uni/NotificationsTab.jsx`. Browser permission banner, master toggle, per-type toggles, quiet hours inputs. Re-calls `scheduleMbbsNotifications` on every pref change.
- **`src/lib/mbbs/mbbsIcsExport.js`** (NEW) — RFC 5545 ICS export; no migration; client-side only. `foldLine(line)` (75-octet fold per §3.1). `buildMbbsICS({ classes, subjects, schedule, config })` — weekly class VEVENTs (`RRULE:FREQ=WEEKLY;BYDAY={byday}`, anchored to nearest past occurrence from `phase_start_date`), prof schedule VEVENTs (DATE-only), exam window VEVENT (first-of-month). Defensive string-month coercion. `downloadMbbsICS(p)` browser download.
- **`src/screens/mbbs/MbbsToday.jsx`** (MODIFIED) — holiday + gap banners:
  - `upcomingHolidayRun` memo: 1–3 days lookahead for ≥2 consecutive holidays. Banner: soft-green, BookOpen, "{N}-day break in {M} days — your best window before prof", "Plan revision" → `/mbbs/exam-prep`.
  - `studyGapDays` memo: days since last study_log entry (null if <2). Banner: soft-amber, Flame, dismissible, "{N} days since your last session — time to get back on track".
- **`src/screens/Settings.jsx`** (MODIFIED) — `MBBS_TABS = ['Daily Routine', 'Notifications', 'Danger Zone']`; `MbbsNotificationsTab` imported and inserted at index 1.
- **`src/screens/mbbs/Timetable.jsx`** (MODIFIED) — `useMbbsProfSchedule` + `downloadMbbsICS` imports; "Export .ics" button in header → `downloadMbbsICS({ classes, subjects, schedule: profSchedule, config: settings?.mbbs_config })`.
- **`src/App.jsx`** (MODIFIED) — `mode === 'mbbs'` branch in `notifyRanRef` useEffect: dynamic-imports and calls `scheduleMbbsNotifications` once per load.
- Build: `MbbsToday` 25.85 kB / 8.03 kB gz; `Timetable` 18.34 kB / 5.83 kB gz. `npm run build` clean (11.34s). Exam/USM unaffected.

### v2.0 Session 14 — Supplementary screen + "what if I fail?" timeline (2026-06-16, `main`)
The dual-phase ("supplementary") track gets its own surface, computed honestly, framed for clarity not motivation (ethical frame — no streaks/guilt/urgency). No migration (reads `mbbs_config.supplementary` + existing tables). `mbbs_config.supplementary = { active, subjects:[NAMES], window:{month,year}|null }` — failed subjects are previous-phase NAMES with no `mbbs_subjects` row, so the engine works off the curriculum topic spine (`getSubjectTopics`), never DB completion rows.
- **`src/lib/mbbs/supplementaryPlan.js`** (NEW, pure — NOT star-exported from `lib/mbbs/index.js`; import directly): `getSupplementaryState(config)` → `{active, subjects:[names], window}` (tolerates the legacy `subject_ids` shape by ignoring it — reads `subjects`); `colorKeyForSubjectName(name)` (palette key via `MBBS_PHASES` search); `supplementaryWindowInfo(window, today)` → `{date, daysLeft, label, urgency}` (reuses examWindow `windowToDate`/`daysToWindow`/`windowUrgency`); `buildSupplementaryPlan({subjects, topicsForSubject?, window, today})` → per-failed-subject `{name, colorKey, topics, total, perDay, daysLeft}` (whole topic spine paced across days-to-window); `buildCombinedDaily({primaryTasks, supplementarySubjects, topicsForSubject?, perSubjectCap=1})` → `{primary, supplementary}` (primary from `generateDailyPlan`, supplementary = capped revision picks per failed subject); `buildWhatIfTimeline({config, today})` → ordered milestones `now → supplementary window → result (~window+6wk) → prof window → +12mo horizon` (plain projection, kinds `now|supplementary|result|prof|horizon`).
- **`src/screens/mbbs/MbbsSupplementary.jsx`** at **`/mbbs/supplementary`** (own lazy chunk; flag `mbbs.supplementary`, FREE): self-fetching (settings/subjects/items/attendance/formatives). Inactive → calm `EmptyState` ("No supplementary to track"). Active → header + window badge; FREE read-only summary (re-sitting chips + window line, the "what if I fail?" vertical timeline); then `<ProGate feature="mbbs.supplementary_planning">` (pro) wrapping the full planning — per-subject revision plan (topic chips + per-day target) + combined daily view (Primary | Supplementary columns, Sun/Moon, → cockpit). Tone: "you have two things to manage — here is what each needs", no exclamation/guilt.
- **`src/screens/mbbs/MbbsDashboard.jsx`** (MODIFIED) — the compact in-hero supplementary strip is REPLACED by a two-track split card (amber top-border, only when `supp.active`): PRIMARY (phase + eligibility label) ‖ SUPPLEMENTARY (failed subjects + window countdown) + a compact horizontal what-if timeline + "Open plan" → `/mbbs/supplementary`. New memos (`supp`/`suppWindowInfo`/`whatIfTimeline`) added before the early returns. **Also fixed a pre-existing latent Rules-of-Hooks violation exposed by full-reload QA:** `handleQuickReview`/`todayFocusSubject`/`todayFocusLabel`/`handleSetFocus` (Session 12 hooks) sat AFTER the `if (loading) return` / `if (subjects.length===0) return` early returns — moved all four above the returns (a cold load flips `loading` true→false and changed the hook count → "Rendered more hooks" crash).
- **Routing/flags:** `App.jsx` lazy `MbbsSupplementary` + routeDef `/mbbs/supplementary`. `mbbsFeatures.js` — new `mbbs.supplementary` (free, route `/mbbs/supplementary`) alongside the existing `mbbs.supplementary_planning` (pro, no route). `migrations/core_feature_flags.sql` — idempotent Session-14 INSERT (`mbbs.supplementary`, free, sort 270; **must be run manually**, client degrades to free/enabled until then). `uniGates.js` already carries `mbbs.supplementary_planning` GATE_COPY.
- **Deviations:** (1) No persistent sidebar/bottom-nav entry — reached contextually from the dashboard two-track card (mirrors the `MbbsExamPrep` precedent; avoids nav noise for the ~95% non-dual-phase students). (2) QA fixture: `scripts/seed-istiaqmcp-mbbs.mjs` `supplementary` flipped to `{active:true, subjects:['Anatomy'], window:{month:7,year:2026}}` (shape corrected from the legacy `subject_ids`) so the screen renders with data — a 1st-Prof student carrying a supplementary is pedagogically synthetic but exercises the feature end-to-end.
- **QA'd live** (preview, dark mode, 375px, seeded `istiaqmcp@gmail.com`): dashboard two-track split + horizontal timeline render; `/mbbs/supplementary` renders re-sitting (Anatomy) + the road-ahead timeline (Jun 2026 → Jul → Aug result → Aug prof → Jun 2027) + revision plan (63 Anatomy topics, ~5/day) + combined daily (Primary 4 tasks | Supplementary 1) ungated (subscription off → free preview); no new console errors from Session-14 code. Both `npm run build` (root) + `cd studyrise-admin && npm run build` clean; `MbbsSupplementary` + `supplementaryPlan` own lazy chunks; `MbbsDashboard` 42.53 kB. Exam/USM unaffected.

### Redesign Session R0 — BMDC curriculum constants: the seed spine (2026-06-17, `main`)
The canonical BMDC 2021 structure becomes one frozen constant every redesign feature reads (Decision R1). No migration (constant only). Exam/USM byte-unaffected (only MBBS-only files touched).
- **`src/lib/mbbs/mbbsBmdcCurriculum.js`** (NEW, barrel-exported) — **THE** BMDC 2021 spine. Deep-frozen `MBBS_BMDC` keyed `'1st'|'2nd'|'3rd'|'final'`. Per **phase**: `id`, `label`, `duration`, `totalMarks` (1300/600/900/1500), `termGate`+`phase1Lockout` booleans (both true only for `'1st'`), `classTypes`, `integratedTeaching:{count,sessions}` (counts 12/7/10/73), `genericTopics`, `termCardMap`. Per **subject**: `name`, `totalMarks`, `colorKey` (UNIT_COLORS palette key, never hex), `components:{written,soe,practical,clinical?,formative}` (exact BMDC mark tables 14–17), `writtenComposition`, `boards:{count,boards:[{label,marks,topics}]}`, `classTypes` (with BMDC hours where given — e.g. Physiology Lecture 120), `fieldPlacements`, `clinicalCard` (final only). Per **card**: `name`, `type` (`'dissection'|'histology'|'system'|'item_card'|'topic'|'clinical_posting'`), `term` (1st Prof), `defaultItemMark` (10 where BMDC states it), `items:[{number,name,maxMarks}]` (`number` sequential 1..N structural; `name` verbatim curriculum text). Also exports `MBBS_GPA_SCALE` (Table 13, desc bands) + **`gradeFor(pct)`** → `{letter,gp,label}` (honours = A ≥75% NOT 85%; null/''/undefined → "Not graded", NOT F — the nullish guard precedes the numeric check since `Number(null)===0`), `MBBS_ELIGIBILITY` (attendance 75 / formative 60 / pass 60 / passPreviousProf / completionYears 12 / examMonths [5,11]), `WRITTEN_COMPOSITION` (FA 10% / MCQ 20% [SBA 50 / MTF 50] / SAQ-SEQ 70% [SAQ 75 / SEQ 25]), `CARD_COLUMN_SHAPE` (the paper continuous-assessment card columns — R5 mirrors), `CLINICAL_POSTING_CARD_SHAPE` (final clinical card — R12), `MBBS_BMDC_PHASE_IDS`. **Selectors:** `getBmdcPhase`, `getBmdcSubjects(phase)`, `getBmdcCards(phase,subject)`, `getBmdcItems(phase,subject,card)`, `getClassTypes(phase,subject)` (subject-specific with hours else phase default), `getBoards(phase,subject)`, `getTermCardMap(phase)` (1st Prof, keyed by subject — Anatomy), `getItSessions(phase)`, `getGenericTopics(phase)`, `getFieldPlacements(phase,subject)`, `getBmdcSubjectTopics(name)`/`getBmdcCardTopics(name)`. The module does NOT import `mbbsConstants` (one-directional, no cycle).
- **Verbatim transcription** (from `docs/curriculum/BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md`, the curriculum copied there): **1st Prof in full** — Anatomy 9 cards (6 regional dissection: Thorax 8 / Superior Extremity 10 / Abdomen 16 / Inferior Extremity 10 / Head & Neck 16 / CNS & Eyeball 12 [Tables 57/60/63/66/69/72] + 3 histology item cards 8/6/5 [Tables 75/78/81]), Board I/II topic split (Table 51), Anatomy term↔card map First/Second/Third [Tables 54/55]; Physiology 8 system cards (Card 1 Cellular & Blood ×10 … Card 8 Practical ×24 [Tables 104–112]) + Board I/II split; Biochemistry 6 cards [Tables 125–130]. **3rd Prof item cards** — Pathology 4 class-performance cards (1A General 15 / 1B Haematolymphoid 13 / 2A+2B Systemic [Tables 242–246]) + oral-box A/B board themes; Microbiology 2 item cards [Tables 270–276]. **2nd Prof** — Pharmacology 10 topic-group cards across Term I/II (the BMDC-mandated 20 item exams [Tables 141–153]); Forensic 3 topic cards + 16-day field placements. Community Medicine 4 topic cards + COME 30-day field placements. **Final Prof** — 3 subjects + mark tables (Table 17) + clinical-posting card SHAPE + Medicine 4-board structure (Table 5930); per-posting clinical item lists deferred to R12.
- **`src/lib/mbbs/mbbsConstants.js`** (MODIFIED — the shim): `_CARD_TOPICS_MAP` is now **exported**; `getCardTopics`/`getSubjectTopics` prefer the BMDC verbatim item lists (`getBmdcCardTopics`/`getBmdcSubjectTopics`) and fall back to the legacy map (so college-renamed/extra card names still resolve). This re-points all consumers (ItemsCards datalist, `useMbbsTopicCompletion` seed denominators, QB contextual surfacing, MbbsAnalytics coverage, viva spine, supplementaryPlan/prePropPlan) onto the BMDC truth without changing their signatures. `MBBS_PHASES` (the v2.0 onboarding-seed structure) is unchanged — onboarding still seeds from it; R3 switches onboarding to the BMDC cards/items.
- **`src/lib/mbbs/index.js`** — `export * from './mbbsBmdcCurriculum'` added first (collision-checked: no overlap with existing barrel exports). Bundled into the MBBS-only `mbbsConstants` chunk (Exam/USM never import it).
- **Deviations:** (1) Item `number` is sequential 1..N (structural); intra-cell line-wrap `/` markers un-wrapped to single strings (same words, no paraphrase). (2) Boards `count:2` only where BMDC defines two boards (Anatomy, Physiology, Community Medicine, Pathology A/B); Medicine `count:4`; others `count:1`. (3) Forensic field days = 16 (10 mortuary + 6 court/lab) per the reference §4.5/§7 (overrides the curriculum's 8+4 time-schedule table; reference wins). (4) IT per-session topic lists + the full 16 generic-humanities list land in R7; R0 seeds counts + the reference's per-phase generic-topic subset.
- **QA'd:** 31-assertion Node selector test green; preview (`istiaqmcp@gmail.com`, 1st Prof) — `/mbbs`, `/mbbs/items`, `/mbbs/analytics` render with zero console errors after the topic re-point. `npm run build` clean. R0 ships no new UI.

### Redesign Session R1 — Corrections: honours 75%, GPA scale, Phase-1 lockout, 12-year window (2026-06-17, `main`)
Four BMDC correctness fixes. No migration. Exam/USM byte-unaffected.
- **Honour = A (≥75%)** — `gradeFor(pct)` in `mbbsBmdcCurriculum.js` was already correct at ≥75% = A; no change needed there. The fix is DISPLAY: a new `src/components/mbbs/GradeBadge.jsx` component (`compact` prop for letter-only; full pill shows letter + GP) uses `gradeFor` and CSS token colours (`var(--soft-green)`, `var(--green-ink)`, `var(--soft-blue)`, `var(--blue-ink)`, `var(--soft-red)`, `var(--red-ink)`) — no hex. Mounted in `MbbsDashboard`'s formative expand panel next to each per-subject detail line (`{pct !== null && <GradeBadge pct={pct} />}`). Barrel-exported from `src/components/mbbs/` (new `index.js`).
- **Phase-1 lockout** — `src/lib/mbbs/eligibility.js` `computeEligibility` now short-circuits at the very top (before any gate math) when `config?.phase === '1st' && config?.supplementary?.phase1_lockout === true`, returning `status: 'phase1_locked'` with all gates 'incomplete' and a single-line blocker. `eligibilityVerdict` gained the `phase1_locked` case. `STATUS_STYLE` gained a `phase1_locked` entry (red tokens, label "Phase 1 — locked"). `MbbsDashboard` gained `phase1_locked: Lock` in `STATUS_ICON` and the two-track split card is gated `!config?.supplementary?.phase1_lockout` (hidden for Phase-1 failures). `MbbsSupplementary` gained a `isPhase1Locked` branch that returns a single-track view (red "First Prof — repeat track" header + BMDC-rule explanation + re-sitting subjects + road-ahead timeline) before the dual-phase path.
- **12-year window** — `src/lib/mbbs/supplementaryPlan.js` `buildWhatIfTimeline` now uses `config?.admission_date` (ISO date string in `mbbs_config` JSONB) to compute the horizon as `admDate + 12 years` (label "12-year BMDC completion window", note "BMDC requires completing the MBBS course within 12 years of admission."). Falls back to the previous 12-month forward marker when `admission_date` is null (backward compatible). `src/screens/Settings.jsx` MBBS Daily Routine tab (mbbsTabContent[0]) now wraps `DailyScheduleSettings` in a `<div>` with a "Programme" `<Card2>` above it containing a `type="date"` input that saves `mbbs_config.admission_date` on blur via `updateSettings({ mbbs_config: { ...existing, admission_date: v } })`.
- **Deviations:** (1) `src/components/mbbs/index.js` created as a barrel for `GradeBadge` (only export so far). (2) `GradeBadge` not yet mounted in `Formatives.jsx` or elsewhere — Dashboard is the first touchpoint; other screens can adopt it incrementally without a protocol change.
- **Build:** `npm run build` clean (28.78s). `MbbsDashboard` 43.46 kB / 11.17 kB gz. Exam/USM unaffected.

### Redesign Session R2 — Per-class-type attendance (2026-06-17, `main`)
Per-BMDC-class-type attendance tracking: the eligibility gate now binds on the worst (minimum) class type per subject. No migration.
- **`src/lib/mbbs/attendanceHelpers.js`** — `CLASS_TYPES` updated: BMDC full-name entries added as primary (`'Lecture'`, `'Tutorial'`, `'Practical'`, `'Dissection'`, `'Integrated teaching'`, `'Ward posting'`, `'Clinical/Bedside teaching'`, `'Ambulatory care'`, `'Block posting'`, `'Field placement'`); legacy lowercase short-key entries kept for backward compatibility (rows seeded before R2). New `subjectHeadlinePct(subjectId, attendance)` selector: returns the **minimum** attendance % across all class types that have data for a subject (the gate-binding value).
- **`src/hooks/mbbs/useMbbsAttendance.js`** — `backfillClassTypes(subjects, config)` function added: calls `getClassTypes(phase, subject.name)` for each subject and upserts missing `mbbs_attendance` rows at zero via `ignoreDuplicates:true` (atomically inserts only missing rows — never overwrites existing counts). Exported from hook return.
- **`src/lib/mbbs/eligibility.js`** — `attendanceGate` now surfaces `worstType` in each problem object (the specific class type with the lowest attendance). `blockers` and `atRisk` strings include the type label ("Physiology Lecture attendance 72% — below the 75% eligibility threshold." vs the old subject-only string).
- **`src/lib/mbbs/gateSummary.js`** — `buildGateSummary` attendance gate line now names the specific worst class type ("`${subj.name}${typeLabel} attendance ${pct}%…`"). `canMiss` calculation looks up the specific worst-type row first (not just the min across all rows), falling back to the minimum scan when `worstType` is unavailable.
- **`src/screens/mbbs/Attendance.jsx`** — major rewrite: (1) `backfillClassTypes` runs once on mount (ref guard) to ensure all BMDC class-type rows exist; (2) per-subject types computed from `getClassTypes(phase, subject.name)` merged with any DB types already present — each subject shows only its own BMDC types (not a global list); (3) headline % badge in subject header = `subjectHeadlinePct` (the minimum across all types with data); (4) subtitle updated to "75% required in every class type — the gate binds on the lowest category."
- **Migration:** none. `mbbs_attendance` table already has `UNIQUE(user_id, subject_id, class_type)` and supports the upsert back-fill.
- **Build:** `npm run build` clean (1m11s). Exam/USM unaffected (only MBBS-only files touched).
- **QA'd:** `/mbbs/attendance` shows per-class-type rows per subject (BMDC types backfilled at zero for new types, existing data intact); headline % = minimum across types (Anatomy "78% OVERALL" from Dissection 78%; Physiology "72% OVERALL" from Lecture 72%); gate lines at top name the specific type ("Physiology Lecture attendance 72% — below the 75% eligibility threshold."); zero console errors.

### Redesign Session R3 — Onboarding overhaul: seed the real BMDC cards + items (2026-06-17, `main`)
When a 1st-Prof student confirms a subject, onboarding now pre-loads its **genuine BMDC cards with their verbatim core items**, all editable. No migration. Only MBBS-only onboarding files touched → Exam/USM byte-unaffected. Blast radius is contained: the wizard subject shape is consumed only by `MbbsStepSubjects` (Step 3) + the `MbbsOnboarding` save routine.
- **`src/lib/mbbs/mbbsConstants.js` `subjectsForPhase(phaseId)`** — rewritten to build the wizard subject state from the **BMDC spine** (`getBmdcSubjects` in `mbbsBmdcCurriculum.js`) instead of the legacy flat item-count + card-name list. New shape: `{ name, total_marks, color_key, expanded, *_confidence, cards: [{ name, type, term, defaultItemMark, expanded, items: [{ number, name, maxMarks, cleared }] }] }`. All BMDC defaults are `national_confirmed` (green wizard label — they're transcribed verbatim from BMDC 2021). The legacy `MBBS_PHASES` table stays (still feeds `componentsForPhase`/`getPhase` + the `getSubjectTopics` fallback); only `subjectsForPhase` re-points onto the BMDC truth. `getBmdcSubjects` added to the existing `mbbsBmdcCurriculum` import.
- **`src/screens/Onboarding/mbbs/MbbsStepSubjects.jsx`** — rewritten from a flat item-count + card-name-chip editor to a **3-level nested editor** (subject → cards → items). Subject row keeps its name/marks/colour-picker; the expand toggle now reads "{cards} cards · {items} items". Expanded subject lists `CardBlock`s (subject-colour left accent, chevron, inline-editable card name, "{cleared}/{total}" mono badge, remove, "Add card"). Each `CardBlock` expands to its `ItemRow`s — a round cleared toggle (green check = current progress), inline-editable item name, a 64px max-marks number input, remove, plus "Add an item". Confidence note under each subject's card list. No hardcoded hex (all `var(--token)`), no motion (matches the prior plain-conditional pattern), no exclamation marks. `subjectsStepValid` unchanged (subject names only). `onSkip` ("Use the defaults — set these up later") seeds the BMDC defaults silently (defaults already in state).
- **`src/screens/Onboarding/MbbsOnboarding.jsx`** — save routine updated for the new shape (the one ordered save with the `user_settings` flip LAST is unchanged):
  - **Cards insert** — cards are now BMDC objects; insert `card.name` (fallback `Card {ci+1}`), `sort_order = ci` so `cardIdsBySubject[si][ci]` lines up with `s.cards[ci]`.
  - **Items insert** — writes the genuine BMDC items per card, preserving `item_number` + `max_marks`, `topic_name` = the verbatim item text, `status`/`date_cleared` from the per-item `cleared` flag (replaces the old round-robin item-count generation).
  - **NEW step 4b — attendance seeding** — after readiness, seeds a `mbbs_attendance` row per subject × BMDC class type (from `getClassTypes(phase, name)`) at zero via `upsert({onConflict:'user_id,subject_id,class_type', ignoreDuplicates:true})`, so R2's per-class-type attendance works from day one (not just the existing first-load back-fill for legacy users). `getClassTypes` imported from `mbbsBmdcCurriculum`. Unused `MBBS_PHASES` import dropped.
  - **Summary** `itemsToClear` now counts un-cleared items across all cards (was `itemCount − clearedCount`).
- **Term↔card mapping (deviation):** the wizard subject state carries `card.term` (BMDC term tag, e.g. "Term I") but it is **not persisted to a card column** — `mbbs_cards.term_id` is a FK to `mbbs_terms`, and term rows don't exist at onboarding (Formatives auto-seeds them on first mount, per v2.0 S7), and R3 ships no migration. The mapping is preserved structurally: seeded cards keep their verbatim BMDC names, so R5 re-derives each card's term via `getTermCardMap(phase)` by card name. No `term_id` written.
- **Build:** `npm run build` clean (6.4s). `mbbsBmdcCurriculum` chunk 46.0 kB / 15.41 kB gz (MBBS-only). Exam/USM unaffected.
- **QA'd live** (preview, fresh throwaway MBBS account, dark mode + 375px): Step 3 renders the genuine BMDC structure — Anatomy 9 cards/91 items, Physiology 8/71, Biochemistry 6/31 (verbatim counts) — cards expand to verbatim items (Thorax 8 items "Thoracic wall…/Heart with pericardium/…"), max-marks 10 each (widened the input to 64px after catching a 48px clip), cleared toggle updates the card badge (Thorax 1/8) and subject summary; no 375px overflow. Completing the wizard saved correctly: Items & Cards shows "1 of 193 items cleared across 3 subjects" with verbatim `topic_name` + item numbers; `/mbbs/attendance` shows the 4 seeded BMDC class types (Lecture/Tutorial/Practical/Integrated teaching) per subject at 0/0; dashboard eligibility engine computes from the seeded data; zero console errors.

### Redesign Session R4 — The Continuous Assessment Card (digital twin) (2026-06-17, `main`)
The Cards tab in `ItemsCards.jsx` redesigned to mirror the physical BMDC continuous-assessment card (R5 decision). Migration: nullable columns. Only MBBS-only files touched → Exam/USM byte-unaffected.
- **Migration `migrations/mbbs_R01_card_assessment.sql` (FILE ONLY — run manually in Supabase; idempotent, additive):** nullable `mbbs_items.exam_date date` ("Date of examination", distinct from `date_cleared`) + `mbbs_items.remarks text` ("Remarks / signature"); nullable `mbbs_cards.attendance_in_card int` + `mbbs_cards.attendance_out_of int` (per-card "attendance in practical classes / out of"). Owner-only RLS already covers both tables; no new table, no RLS change. **Client degrades gracefully until run.**
- **`src/screens/mbbs/ItemsCards.jsx` — Cards tab rewrite.** Each expanded card renders the paper card as a real `<table>` (in `overflow-x:auto`, `min-width:560px`) with columns **Item · Full · Marks · Date of exam · Remarks/Sign. · Grade**:
  - `ItemAssessmentRow` — per-item inline-editable cells (`max_marks`/`marks`/`exam_date`/`remarks`), each persisting **on blur, one field at a time** via `handlePatchItem` → `useMbbsItems.updateItem` (so marks/status always save even pre-migration). The item name + status badge is a `no-print` button opening the existing `ItemDrawer`. Live `<GradeBadge compact>` in the Grade column from marks/max (`pctFor`).
  - Card header adds: `Next due` (first pending/scheduled item via `nextDueItem`), a **caution-only** amber pace note (`getItemPace`, shown only behind/critical), the completion result badge (Passed/Failed), and a card-aggregate `<GradeBadge>` (credit-weighted mean of recorded item marks via `cardMarksAggregate`).
  - Expanded body: the **attendance line** (`attendance_in_card`/`attendance_out_of` inputs → `handlePatchCard` → `useMbbsCards.updateCard`, with a ≥75/60 zone badge) + a **Print** button; the table; "Add item" (kept); the **card completion exam** editor (date input + Pass/Fail toggle → `updateCard` `card_exam_date`/`card_exam_result`); the topic checklist (kept).
- **`ItemDrawer`** extended with `DATE OF EXAMINATION` + `REMARKS / SIGNATURE` fields and a live GradeBadge by the marks; `handleSaveItem` **retries without `exam_date`/`remarks`** on a missing-column error so the rest still saves.
- **Print artefact.** `PrintableCard` renders the selected card off-screen (`position:fixed; left:-99999`) as a clean static table (#/Item/Full/Obtained/Date/Remarks/Grade + attendance line + completion result + card grade). Scoped `CARD_PRINT_CSS` (`@media print` visibility trick) shows only `.cac-print-root`; `printCard` state + a `useEffect` drive `window.print()` and clear on `afterprint`. `window.print()` = the PDF.
- **Graceful degradation:** `isMissingColumn(err)` (codes `42703`/`PGRST204` or "column … does not exist") flips `cacAvailable=false` → an amber banner ("Run `mbbs_R01_card_assessment.sql` … Marks and status save without it"). Marks/status/completion never depend on the new columns.
- **Build:** `npm run build` clean (6.8s). `ItemsCards` 34.26 kB / 9.27 kB gz (own lazy chunk). Exam/USM unaffected.
- **QA'd live** (preview, seeded `istiaqmcp@gmail.com` 1st-Prof, dark + 375px): Thorax expands to the 6-column assessment table (Full=10 BMDC default, 8 verbatim items); 8/10 shows an A+ green grade band; attendance line + Print + Pass/Fail completion + topic checklist render; Print produces the off-screen "Continuous Assessment Card — Anatomy — Thorax" artefact (8 rows) and fires `window.print()`; dark correct; table scrolls within its container at 375px (no page overflow); zero console errors.

### Redesign Session R5 — Assessment model correction: embedded formative + term gates + GPA (2026-06-17, `main`)
The formative maths made BMDC-correct, phase-aware, and framed as the embedded in-course mark. **No migration** (extends the v2.0 Session-7 term model). Only MBBS-only files touched → Exam/USM byte-unaffected. Session 7 already built the term-gate model (`bmdcFormativeMark`, `mbbs_terms`/`mbbs_term_results`) and made `eligibility.js` phase-aware; R5 layers on the embedded-10% framing, GPA on every result, a direct-formative-figure override, and phase-aware "marks needed".
- **`src/lib/mbbs/formativeHelpers.js`** — imports `WRITTEN_COMPOSITION` + `gradeFor` from `mbbsBmdcCurriculum.js` (the curriculum module is import-free → no cycle). New exports: `WRITTEN_FORMATIVE_PCT` (=10); `embeddedContribution(pct)` → `{ marks: round1(pct/100×10), of:10 }` (60% → 6 of 10); **`subjectFormativePct({ formatives, termResults, attPct, phase, override })`** — the phase-aware resolver, resolution order **override → (1st Prof with term rows) BMDC term mark/20→% → weighted average**, returns `{ pct, source:'override'|'term'|'weighted', model, grade: gradeFor(pct) }`. All Session-7 exports unchanged.
- **`src/lib/mbbs/eligibility.js`** — the formative gate honours a directly-recorded college figure: `overrideFor(subjectId)` reads `config.formative_overrides[subjectId].pct` and wins in the weighted-average path (other phases + the 1st-Prof-no-terms fallback). The 1st-Prof term hard-gates are unchanged (term-pass stays the binding constraint there). Omitting overrides is byte-identical to before.
- **`src/screens/mbbs/Formatives.jsx`** — reframed end to end: header "Your in-course mark — ≥60% required to sit your prof"; a soft-blue **embedded-model explainer** ("Formative isn't a separate exam … carried into every written paper as 10% … ≥60% to be eligible{, for 1st Prof all three term exams are hard 60% gates}. Every result shows its BMDC grade."). **GPA everywhere** via `<GradeBadge>` (logged `FormativeRow`, FormativeModal live %, every per-term cell compact, the TermSubjectCard formative mark, the SubjectFormativeCard headline). **SubjectFormativeCard rebuilt phase-aware** — headline = canonical formative % (`subjectFormativePct`) + GradeBadge + source label ("recorded directly" / "from N term results + attendance" / "weighted average of N assessments") + an `EmbeddedLine` ("Carried into every written paper as 10% — that's X of 10 formative marks") + eligible/below-60 badge. **Direct-formative override** ("single figure" rule): inline `OverrideEditor` (% 0–100 + note + live GradeBadge + Save/Clear/Cancel) from each card's expanded actions, persisted to **`mbbs_config.formative_overrides[subjectId] = { pct, note }`** via `updateSettings` (jsonb merge, spread-preserves other config keys); when set the card is badged purple "Recorded" and the figure drives both display and verdict. **Marks-needed is phase-aware** — weighted → `recoveryLine`; term → "{N} term(s) below 60% — each must be cleared (re-sit ≥60%) before your prof"; override → "recorded formative below the 60% gate — check the figure with your department". Lifted `useUserSettings`/`useMbbsTerms`/`attPctBySubject` to the main component (TermResultsSection takes `termsApi`/`attPctBySubject` props — no double-fetch); the Session-7 TermResultsSection/TermResultModal/`bmdcFormativeMark` math is unchanged, now with GradeBadge + EmbeddedLine added.
- **Migration:** none — `formative_overrides` lives in the existing `mbbs_config` jsonb.
- **Build:** `npm run build` clean (6.5s). Exam/USM unaffected.
- **QA'd live** (preview, seeded `istiaqmcp@gmail.com` 1st-Prof): embedded explainer + term-results section (3 subjects, FIRST/SECOND/THIRD cells) + phase-aware subject cards render; override exercised end-to-end — 72% → GradeBadge "A- · 3.50", saved → "72% formative · A- · 3.50 · Eligible · Recorded · recorded directly · …that's 7.2 of 10 formative marks", then Cleared → restored to "No data" (account left untouched); `/mbbs` eligibility verdict still computes; zero console errors.

### Redesign Session R6 — Two-board oral (SOE) in the Exam Period System (2026-06-17, `main`)
The oral/viva component for Anatomy (Board I + Board II per BMDC) and Physiology are two separate examiners on different days — the `sequence` column on `mbbs_prof_schedule` already supports this (UNIQUE constraint `(user_id, subject_id, component, exam_date)` allows two viva rows per subject). R6 surfaces the two-board structure in the Exam Schedule + Exam Prep screens. **No migration.** Only MBBS-only files touched → Exam/USM byte-unaffected.
- **`src/hooks/mbbs/useMbbsProfSchedule.js`** — new `vivaByBoard(subjectId)` selector: returns `{ board1, board2, unsequenced }` from the `schedule` array filtered by `component === 'viva'` and `sequence === 1|2|null`. Exported in the hook's return object.
- **`src/screens/mbbs/MbbsExamSchedule.jsx`** — `ExamDateModal` now calls `getBoards(phase, subjectName)` (from `mbbsBmdcCurriculum.js`). When `boards.count >= 2` AND `component === 'viva'`, the modal renders two board buttons ("Board I — {label}" / "Board II — {label}") above the date picker; the chosen sequence is passed to `addEvent({ …, sequence })`. Single-board subjects and non-viva components pass `sequence: null` (unchanged). Schedule list rows show a `<Badge2 variant="blue">Board I/II</Badge2>` chip when `sequence` is set.
- **`src/screens/mbbs/MbbsExamPrep.jsx`** — `VivaSurfacing` gains a `boardTopics` prop (string[] | null). When the current focus record has `sequence` set, the prep screen calls `getBoards(phase, subjectName).boards[sequence-1]?.topics` and passes it as `boardTopics`; the component filters the viva question pool to questions whose `topic` is in the board's topic list. Falls back to the full subject pool when the filtered set is empty (best-effort, not hard-blocking). Focus card description shows the board label + topic list when `focus.current.sequence` is set.
- **`src/lib/mbbs/mbbsBmdcCurriculum.js`** (read-only) — `getBoards(phase, subject)` is the data source; all BMDC board metadata was already transcribed in R0 (Anatomy 2 boards, Physiology 2 boards, Community Medicine 2 boards, Pathology A/B). No code changes to the curriculum module.
- **Build:** `npm run build` clean. Exam/USM unaffected.

### Redesign Session R7 — Integrated Teaching tracker + generic-topics checklist (2026-06-17, `main`)
BMDC mandates attended IT sessions (Phase I 12, II 7, III 10, IV 73) and completion of a generic-topics ("humanities") list. R7 adds `mbbs_it_sessions` and a full tracking screen at `/mbbs/integrated-teaching`. **`migrations/mbbs_R02_integrated_teaching.sql` is FILE ONLY — run manually in Supabase; client degrades gracefully.** Only MBBS-only files touched → Exam/USM byte-unaffected.
- **Migration `migrations/mbbs_R02_integrated_teaching.sql`** (FILE ONLY, idempotent): `mbbs_it_sessions (id uuid PK, user_id FK, phase CHECK('1st'|'2nd'|'3rd'|'final'), kind CHECK('integrated'|'generic_topic'), topic text NOT NULL, attended bool default false, summary_submitted bool default false, date date, note text, created_at, updated_at)`. UNIQUE(user_id, phase, kind, topic). RLS `owner_all`. `set_updated_at` trigger. Index on (user_id, phase).
- **`migrations/core_feature_flags.sql`** — Session R7 INSERT block appended: `('mbbs.integrated_teaching', 'mbbs', 'Integrated Teaching Tracker', TRUE, 'free', FALSE, 275)` `ON CONFLICT DO NOTHING`.
- **`src/hooks/mbbs/useMbbsItSessions.js`** (NEW, barrel-exported) — `useMbbsItSessions(phase)`: fetches all rows for the user+phase; **auto-seeds** on first load if table is available and no rows exist — integrated: "IT Session 1" … "IT Session N" (N from `getItSessions(phase).count`); generic_topic: each topic string from `getGenericTopics(phase)` — idempotent upsert `onConflict:'user_id,phase,kind,topic', ignoreDuplicates:true`. Returns `rows`, `integrated`, `genericTopicRows`, `available`, `loading`, `integratedTarget`, `integratedDone`, `genericDone`, `toggleAttended`, `toggleSummary`, `updateDate`, `refetch`. Degrades gracefully on `42P01/PGRST205/42703/PGRST204` (`available:false`).
- **`src/screens/mbbs/MbbsIntegratedTeaching.jsx`** (NEW, own lazy chunk) at `/mbbs/integrated-teaching` — phase label header (1st Prof / 2nd Prof / etc.); amber degrade banner when table not yet migrated; two sections: **"IT Sessions"** (N numbered rows, attendance toggle via CheckCircle2/Circle, summary_submitted toggle for integrated rows, "N of T attended" progress bar) and **"Generic Topics"** (collapsible with ChevronDown, same toggle pattern, done/total badge). `Empty state` when both targets are 0 and available. Tone: plain list-view, no streak mechanics, no anxiety framing.
- **`src/screens/mbbs/Formatives.jsx`** — imports `useMbbsItSessions`; shows a compact read-only **IT signal card** between the TermResultsSection and subject cards (only when `itSessions.available && itSessions.integratedTarget > 0`): "Integrated Teaching Sessions N/T attended" badge + "Track sessions →" link to `/mbbs/integrated-teaching`.
- **`src/lib/mbbsFeatures.js`** — `mbbs.integrated_teaching` entry added (tier:'free', is_floor:false, route:'/mbbs/integrated-teaching').
- **Wiring:** `App.jsx` lazy import + routeDef `/mbbs/integrated-teaching`. `Sidebar.jsx` MBBS_NAV gains "IT Sessions" (`BookOpen` icon). `BottomTabBar.jsx` `MBBS_MORE_ITEMS` gains "IT Sessions". Hooks barrel (`src/hooks/mbbs/index.js`) exports `useMbbsItSessions`.
- **Build:** `npm run build` clean (4210 modules, 7.28s). `MbbsIntegratedTeaching` 6.55 kB / 2.18 kB gz (own lazy chunk); `useMbbsItSessions` 2.40 kB / 1.00 kB gz. Exam/USM unaffected.

### Redesign Session R8 — Field placements (COME / forensic) + Phase-1 supplementary branch (2026-06-17, `main`)
Two BMDC-mirror gaps. **No migration** (existing `mbbs_attendance` + `mbbs_config` jsonb); the only SQL is a feature-flag registry append, which degrades to enabled-by-default. Only MBBS-only files touched → Exam/USM byte-unaffected.
- **Goal A — field placements.** Community Medicine COME (30 days: Day Visit 10 + RFST 10 + Study Tour 10) and Forensic Medicine visits (16 days: mortuary 10 + court/PS/lab 6) modelled as a distinct activity (`getFieldPlacements(phase, subjectName)` from `mbbsBmdcCurriculum.js` → `[{key,label,days,report}]`).
  - **`src/screens/mbbs/MbbsFieldPlacements.jsx`** (NEW, own lazy chunk) at **`/mbbs/field-placements`** (flag `mbbs.field_placements`, FREE; **contextual — no persistent nav entry**, reached from Attendance, mirroring the `MbbsExamPrep`/`MbbsSupplementary` precedent since only 2 phases have any). Self-fetching (useUserSettings/useMbbsSubjects/useMbbsAttendance). Per phase subject with placements: a card per placement — required-days badge, attendance bar (days attended / required), one-tap **Day done / Missed** (reuses `useMbbsAttendance.logAttended`/`logMissed`/`setTotals` with `class_type = placement.label`, so it **counts toward the 75% worst-category gate automatically** — R2/R10), a **report-deliverable** checkbox + optional due date, and a "days you can miss" line. A top **Report targets** card lists dated, unsubmitted reports sorted by due date. Empty state for phases without field placements (1st Prof).
  - **Report checklist** persists to **`mbbs_config.field_reports`** (jsonb `[{key, done, due_date}]`, `Array.isArray()` guard, merged via `updateSettings` — never `?? []`). No table.
  - **`src/screens/mbbs/Attendance.jsx`** — a contextual "Field placements →" link card under the header, shown only when `subjects.some(s => getFieldPlacements(phase, s.name).length > 0)`. The specific placement rows (class_type = the placement label) also surface naturally in the existing Attendance per-type list once logged.
- **Goal B — Phase-1 supplementary branch.** R1 already added the `phase1_locked` verdict (`eligibility.js`) + the single-track `isPhase1Locked` view in `MbbsSupplementary.jsx`; R8 completes it by adding the **failed-subject revision plan** (`RevisionPlanCard` per subject, free) between the re-sitting card and the road-ahead timeline in the locked view. The timeline is already bounded by the 12-year window (`buildWhatIfTimeline` reads `admission_date`). 2nd-Prof-onward failures keep the dual-phase combined view (unchanged).
- **Flag/wiring:** `mbbsFeatures.js` — `mbbs.field_placements` (free, route `/mbbs/field-placements`). `migrations/core_feature_flags.sql` — idempotent R8 INSERT (`mbbs.field_placements`, free, sort 280; **run manually**, degrades to enabled until then). `App.jsx` lazy import + routeDef.
- **Drive-by fix (R7 regression):** `Formatives.jsx` had a TDZ crash — `const itSessions = useMbbsItSessions(phase)` ran before `const phase = ...` was declared, hard-crashing the whole Formatives screen in MBBS mode. Moved the `phase`/`overrides` declarations above the `useMbbsItSessions(phase)` call. (Hooks order unchanged → no Rules-of-Hooks impact.)
- **Build:** `npm run build` clean (7.5s). `MbbsFieldPlacements` 11.3 kB (own lazy chunk). Exam/USM unaffected. QA'd live (preview, 1st-Prof seed): dashboard renders; `/mbbs/field-placements` shows the correct 1st-Prof empty state; `/mbbs/formatives` renders post-fix (no crash); no new console errors.

### Redesign Session R9 — Pass-probability recalibration (2026-06-17, `main`)
Recalibrate the v2.0 projection's INPUTS to the corrected gates (R11 — keep the architecture, fix the inputs). **No migration.** Only MBBS-only files touched → Exam/USM byte-unaffected.
- **`src/lib/mbbs/passProjection.js`** `subjectGateScore` recalibrated: (1) the worst-category attendance % is now **passed into `bmdcFormativeMark(termResults, worstAtt)`** so the BMDC formative attendance component is computed (was 0 before); (2) **term-pass status** — for 1st Prof, a failing term (`m.termsFailing > 0`) is a hard gate, so it caps the subject's formative readiness at ≤15 regardless of the computed mark (and contributes 15 even when no mark is available); (3) **card-completion pace** added as a gate signal (cleared cards vs total, via `getItemPace` against the real BMDC card counts) alongside item pace. Worst-category attendance (R2), real BMDC item/card counts (R0/R3), and topic/QB coverage against real BMDC topics were already in place from v2.0 S8. MCQ logging is not a layer, so a flag-off feature contributes nothing by construction (D2/D7).
- **`src/screens/mbbs/MbbsDashboard.jsx`** — the recalibrated projection is now surfaced on the dashboard (was Analytics-only). Adds `useMbbsTopicCompletion` + `useMbbsQuestionBank(config)` + `getCompliance` (from the existing `useMbbsSR`) and computes `topicCoverage`/`qbCoverage`/`srCompliance`/`projection` with the **same inputs as MbbsAnalytics** so the readiness index matches. A compact **Pass-probability projection** card (verdict badge, readiness index 0–100, present-layer mini-bars, message, "Full breakdown →" to /mbbs/analytics) wrapped in `<ProGate feature="mbbs.pass_projection">` after the four gate widgets. All projection hooks/memos sit above the early returns (Rules-of-Hooks safe).
- **Build:** `npm run build` clean. `MbbsDashboard` 45.8 kB / 11.77 kB gz (own lazy chunk). QA'd live (1st-Prof seed): dashboard projection card renders "AT RISK · 31 · readiness index (0–100)" with the weakest-subject (Physiology) message; Analytics projection unchanged in shape; no new console errors; cold reload clean (no hooks regression).

## University Mode (USM)

University Student Mode — a second app mode for university students (terms, units, assessments, classes, grades) built additively alongside Exam Mode. Spec: `docs/planning/FEATURES.md` (Part 2 — University Student Mode). **USM MVP COMPLETE as of Session 14 (2026-06-13)** — all 14 sessions shipped: every uni route is a real screen, the intelligence layer (planner/radar/check-in/fallacy/SR/revision) is live, LMS iCal import + re-sync works, analytics/notifications/exports/Wrapped are in, and the Free/Pro gates are wired to the `subscription_activated` admin switch (everything stays free until it flips).

### app_mode semantics
`user_settings.app_mode`: `'exam' | 'university' | 'mbbs_bd' | NULL`. **NULL = exam mode, always** — every pre-USM user has NULL and must be unaffected. `'university'` activates USM; `'mbbs_bd'` activates MBBS Bangladesh mode (see the MBBS section).

`src/lib/appMode.js` is THE one place mode is derived (returns `'exam' | 'university' | 'mbbs'`):
```js
export const getAppMode = (settings) => {
  if (settings?.app_mode === 'university') return 'university';
  if (settings?.app_mode === 'mbbs_bd') return 'mbbs';   // stored 'mbbs_bd' → derived 'mbbs'
  return 'exam';
};
```
Never read `settings.app_mode` directly anywhere else. App.jsx computes `mode = getAppMode(settings)` once and passes it down (Layout → Sidebar/BottomTabBar take a `mode` prop, default `'exam'`).

### Route split (App.jsx)
Two route arrays rendered by mode — exam users see byte-identical routes to before USM:
| University route | Screen |
|---|---|
| `/` | UniDashboard — **Session 7**: real semester-at-a-glance dashboard (KPI row, deadline strip, heavy-week radar, unit cards, coach, check-in slot); **S14**: Semester Wrapped banner once today > term end_date |
| `/today` | UniToday — **Session 6**: real daily cockpit (classes timeline, focus card, uni DayPlanner, quick add, day log) |
| `/semester` | SemesterPlan — **Session 8**: full semester command view (list / timeline / kanban-Pro, filter bar, quick-add FAB) |
| `/semester/unit/:id` | UnitDetail — **Session 10**: one unit's full picture (grade progress + inline what-do-I-need, assessments, classes + attendance dots, study-hours chart, notes) |
| `/grades` | Grades — **Session 9+10**: all four §2.5 sections — tracker, "What do I need?", what-if simulator, GPA/WAM panel |
| `/grades/report` | GradeReport — **Session 14**: transcript-style print page (Pro gate `grades_pdf`); window.print() = the PDF |
| `/timetable` | Timetable — **Session 5**: real weekly grid / agenda screen |
| `/analytics` | UniAnalytics — **Session 14**: 7-chart suite (3 free / 4 Pro) — see "Uni analytics chart map" |
| `/settings` | existing Settings (shared screen, mode-aware) |
`/profile`, `/admin`, `/privacy`, `/terms`, and the `*` catch-all are shared by both modes. Every uni route is real as of Session 14 — `UniPlaceholder.jsx` and the `uniScreen()` helper were removed from App.jsx (the placeholder file remains on disk, unimported).

Navigation is mode-aware: Sidebar has `NAV` (exam, untouched) and `UNI_NAV` (Dashboard, Today, Semester, Grades, Timetable, Analytics, Settings); BottomTabBar has `UNI_TABS` (Today, Home, Semester, Grades) + `UNI_MORE_ITEMS` (Timetable, Analytics, Settings).

### Data fetching by mode
In university mode App.jsx skips the exam-only fetches: `useSRRecords`, `useTasks`, `useSubjects` accept an `{ enabled }` option (defaults `true`; `false` short-circuits the fetch and returns empty arrays). `user_settings` and `study_log` stay fetched in both modes — **study_log is shared so streak continuity across modes is intentional**. The SR auto-create effect is gated to exam mode. Note: useUserSettings is now called FIRST in AppInner (mode must derive before the gated hooks).

### New tables (migrations/usm_001_foundation.sql — run manually in Supabase SQL editor, idempotent)
All have RLS with four `auth.uid() = user_id` policies. Realtime publication: assessments, study_sessions, attendance_log, planned_sessions, review_reminders.

**user_settings additions**: `app_mode` (text), `subject_term` (text, default 'unit'), `grade_scale` (text), `week_start` (text, default 'monday'), `date_format` (text, default 'dd_mm'), `planning_control` (text, default 'suggest'), `weekly_hours_target` (numeric), `support_services_url` (text), `rotation_anchor` (text, default 'a_first' — usm_003_timetable.sql, Session 5), `checkin_state` (jsonb, default `{}` — usm_004_dashboard.sql, Session 7: `{ week3: { dismissed, dismissedAt }, week6: {...} }`; Session 12 adds a `response` key per check-in), `ical_feeds` (jsonb, default `[]` — usm_006_ical.sql, Session 11: `[{ url, providerId, lastSyncedAt }]`)

| Table | Key columns |
|---|---|
| terms | name, term_type ('semester'\|'trimester'\|'term'\|'quarter'\|'block'\|'custom'), start_date, end_date, break_start/end, study_week_start/end, exam_period_start/end, is_active — **partial unique index: one active term per user** |
| units | term_id FK (cascade), name, code, **color_key (12-palette key, NOT hex)**, credit_value + credit_label, coordinator, target_grade, priority ('low'\|'normal'\|'high'), is_pass_fail, sr_mode ('off'\|'lite'\|'full'), notes, sort_order |
| assessments | unit_id FK (cascade), title, assessment_type, category (7 cats), due_date + due_time (default 23:59), weight, is_hurdle, estimated_hours, logged_hours, status ('not_started'\|'in_progress'\|'submitted'\|'graded'), submitted_at, grade_received/max, is_late + late_penalty_note, original_due_date (extension), word/question_count, group_members, submission_location, recurrence_group_id, ical_uid (unique partial idx per user) + ical_synced_at + manually_edited, **checklist jsonb `[{text, done}]` (usm_002_assessments.sql, Session 4)**, **target_score numeric (usm_005_grades.sql, Session 10 — what-if targets, never read by grade math)**, **last_lms_change jsonb (usm_006_ical.sql, Session 11 — `{field, old, new, at, resolution}`; powers the "Updated by your LMS" drawer badge + kept-mine conflict memory)** |
| classes | unit_id FK (cascade), class_type, **day_of_week (0=Monday … 6=Sunday)**, start/end_time, location + location_is_url, repeat_pattern ('weekly'\|'odd'\|'even'\|'specific'\|'rotation_a'\|'rotation_b'), specific_weeks int[], track_attendance |
| attendance_log | class_id FK (cascade), date, status ('attended'\|'skipped'), UNIQUE(user_id, class_id, date) |
| study_sessions | assessment_id (set null), unit_id (set null), date, minutes, progress_pct, estimated_hours_snapshot, source ('manual'\|'planner'\|'block_timer'\|'quick_add') — **USM study log, separate from exam study_log** |
| planned_sessions | assessment_id FK (cascade), date, start_time, duration_minutes, label, reason, status ('proposed'\|'accepted'\|'moved'\|'rejected'\|'done'), user_locked (AI never overrides human moves) — Session 12 |
| review_reminders | unit_id FK (cascade), topic, due_date, interval_days (7→14→30), done, done_date — SR Lite, Session 13 |

### uniConstants.js (source of truth — data entry, not code)
`src/lib/uniConstants.js`: `TERM_TYPES` (with default teaching weeks: semester 13, trimester 11, term 8, quarter 10, block 4, custom null), `SUBJECT_TERMS` (unit/module/course/subject/paper → {singular, plural, add}), `UNIT_COLORS` (12 entries mapping color_key → `--uni-*` CSS var tokens, + `getUnitColor` helper), `ASSESSMENT_TYPES` (36 types across 7 categories with Lucide icon names + defaultEstimatedHours), `ASSESSMENT_CATEGORIES`, `CLASS_TYPES`, `REPEAT_PATTERNS`, `CREDIT_LABELS`, `GRADE_SCALES` (ids only — full math registry is Session 9), `PLANNING_FALLACY_DEFAULT_MULTIPLIER = 1.5`.

The 12 `--uni-{color}` + `--uni-{color}-text` tokens live at the end of the light `:root` block in `src/styles/tokens.css` (light values only; dark overrides land with the USM dark pass). Components must use `var(--uni-*)` via UNIT_COLORS — never hex.

### useTerminology hook
`useTerminology(settings)` → `{ term: {singular, plural, add}, t(key) }` from `SUBJECT_TERMS` with 'unit' fallback. Takes settings as a param (does not re-fetch). **All USM UI must use this — never hardcode "Unit".**

### USM data hooks (all follow the useSubjects pattern: fetch by user_id, loading state, refetch)
- `useTerms()` → `{ terms, activeTerm, addTerm, updateTerm, archiveTerm, activateTerm, deleteTerm }`. `activateTerm`/`addTerm` deactivate the current active term first (partial unique index!). `deleteTerm` (Session 3) hard-deletes — units/assessments/classes/attendance cascade via FK; study_sessions survive (refs SET NULL)
- `useUnits(termId)` → CRUD scoped by term_id, `reorderUnit`, `canAddUnit(plan)` (stub: always true until Session 14), `nextUnitColor(units)`, `FREE_UNIT_CAP = 5`
- `useAssessments(unitIds)` → CRUD via `unit_id IN (term units)`, `markSubmitted(id)` (stamps submitted_at), `setGrade(id, received, max)` (sets status 'graded'), realtime. Session 4 additions: `createRecurringSeries(data, dueDates)` (one recurrence_group_id, titles suffixed " — Week {k}"), `updateWithScope(id, patch, 'one'\|'following')` (following = same group, due_date ≥ this one; field deltas not blind copies — due_date shifts by day-delta, title keeps each member's Week suffix), `grantExtension(id, newDueDate)` (writes original_due_date only once), `toggleChecklistItem(id, index)`. `manually_edited` is stamped only when a patch touches a sync-owned field (title/due_date/due_time) — checklist seeding and status flips never opt a row out of future iCal re-sync
- `useClasses(unitIds)` → CRUD, ordered by day_of_week + start_time
- `useAttendance()` → `logAttendance(classId, date, status)` upsert, exports pure `attendancePctByUnit(classes, logs)` (scheduled-to-date denominator refinement is Session 5)
- `useStudySessions()` → `logSession({...})`, `totalMinutesByAssessment` map, `minutesThisWeek` (Monday-start for now), realtime

### termWeeks.js (USM Session 3)
`src/lib/termWeeks.js` — teaching-week math, used by Term Setup and every later week-based feature (timeline, timetable, dashboard).
- `getTeachingWeeks(term, settings)` → ordered `[{ weekNumber, startDate, endDate, isBreak, isStudyWeek, isExamPeriod }]`
- `getTotalTeachingWeeks(term, settings)` → count of numbered weeks
- `getCurrentWeek(term, today, settings)` → the week containing today (Date or ISO string), or null outside the term
Rules (MVP decisions, hand-traced cases in the file header):
- Week boundaries honour `settings.week_start` ('monday' default | 'sunday'). Week 1 starts on `term.start_date` itself (possibly partial); later weeks start on the aligned boundary; the last week clamps to `end_date`.
- **Breaks pause the week count**: a week whose entire span lies inside `[break_start, break_end]` gets `weekNumber: null` and numbering resumes after it (Week 6 → break → Week 7). A break that only partially covers a week (spans a boundary) pauses nothing.
- Study week / exam period are overlap flags only — they never affect numbering.

### assessmentHelpers.js (USM Session 4)
`src/lib/assessmentHelpers.js` — the taskHelpers.js equivalent for assessments. Pure helpers only.
- `getTypeMeta(typeId)` → `{label, category, icon, defaultEstimatedHours}` from ASSESSMENT_TYPES, safe fallback to Assignment
- `getTypeIcon(typeId)` → Lucide component (explicit name→component map, no wildcard lucide import — keeps tree-shaking)
- `formatAssessmentDueChip(a)` → reuses the pure exam `formatDueChip` (taskHelpers.js) + due_time awareness ("Today 11:59 PM" when due today); `formatDueTime('23:59')` → '11:59 PM'
- `getAssessmentUrgency(a, today)` → `'overdue'|'urgent'(≤3d)|'soon'(≤7d)|'normal'|'done'` (submitted/graded = done); `URGENCY_COLORS` token map
- `weightLabel(a)` → `"30%" | "Hurdle" | "30% · Hurdle" | null`
- `DEFAULT_CHECKLISTS` per category + `buildChecklist(category)` → `[{text, done:false}]`. Seeded client-side by the drawer the first time it opens an assessment whose `checklist` is NULL
- `submissionDelta(a, submittedAt)` → `{late, label}` vs the due datetime (uses due_time, default 23:59) — powers the submission moment copy
- `seriesBaseTitle(title)` strips the `" — Week {k}"` suffix; `generateWeeklyDates(startISO, count, term, settings)` → N weekly dates skipping occurrences that fall inside term break weeks (via termWeeks; the series resumes after the break so the count stays N)

### AssessmentDrawer (USM Session 4)
`src/components/uni/AssessmentDrawer.jsx` — slide-in editor mirroring TaskDrawer interaction patterns (mobile bottom sheet / desktop right panel, drawerSlide + backdrop variants, useReducedMotion, 500ms debounced persist, Saved tick, Escape/outside-click close).
Props: `assessment, units, loggedMinutes, onClose, onSave(id, patch, scope), onExtend(id, newDueDate), onDelete(id)`.
- Field groups: Basics (type grouped select by 7 categories, unit select with color dot, due date + time), Grading (weight, hurdle, grade received/max visible once status ≥ submitted), Effort (estimated hours — `<PlanningFallacyChip/>` mount point comment reserved for Session 12; logged hours read-only from study_sessions), Details (word_count for written/group/digital, question_count for exam/digital, group members for group category, submission location, notes), Checklist (add/rename/reorder/remove/check; auto-seeded from DEFAULT_CHECKLISTS)
- Status flow segmented control Not Started → In Progress → Submitted → Graded. Submitting stamps `submitted_at` and shows the submission moment ("Submitted {n} {days/hours} early. Logged." / late → auto-sets `is_late` + reveals penalty note field). Leaving submitted/graded confirms first and clears `submitted_at`/grades.
- **Scope rule**: status/grade/submission/checklist writes are always scope 'one' (submitting one quiz never submits the series). Shared field edits on a series member prompt "This one / This and following" once per drawer open and remember the choice.
- Extension: "Grant extension" sets a new due_date, preserves the first original in `original_due_date`, header shows an "Extended from {date}" chip.
- "Plan study sessions" (wired Session 12): toggles an embedded `<PlannerTray assessmentId compact />` — planned sessions for this assessment with Accept/Move/Resize/Reject and a "Plan sessions" (draftRange) button. The Effort group mounts `<PlanningFallacyChip/>` below the estimate input; tap applies `suggestedHours` via `updateField('estimated_hours', …)` (not a sync-owned field — no `manually_edited` stamp).

`src/components/uni/AddAssessmentModal.jsx` — slim add modal (title, unit, grouped type, due date+time, weight, hurdle, estimated hours defaulting from type meta). "Repeats weekly" section: count 2–15, live date-chip preview from `generateWeeklyDates` (breaks skipped), save calls `createRecurringSeries`.

`src/screens/uni/SemesterPlan.jsx` — **Session 8 full command view** (replaced the Session-4 temp list): self-fetching screen with a 3-way view toggle (Plan.jsx pill pattern, persisted via `useSemesterView` → `localStorage:studyrise:semester:view`), the composable `SemesterFilterBar`, the `due7` preset chip, AssessmentDrawer + AddAssessmentModal, and the full navigate-state contract (see below). List view uses `max-w-[860px]`; timeline/kanban widen to `max-w-[1200px]`.

### Semester view map (USM Session 8)
| View | Component | Notes |
|---|---|---|
| List | `components/uni/SemesterListView.jsx` | Grouped by unit (color left-border header with code + count), rows due-date sorted (sort=weight/unit honored), urgency left-accent rows, completed (submitted+graded) collapsed per group. Exports `AssessmentRow`. |
| Timeline | `components/uni/SemesterTimeline.jsx` | Weeks axis from `getTeachingWeeks` (break columns striped + numbering pause, study week / exam period tinted+labelled), one lane per unit (sticky left labels), markers positioned by due-date day fraction, dot size by weight tier (<10 → 8px, 10–29 → 12px, ≥30 → 16px), hurdle = amber ring, done markers faded. Heavy weeks (`detectHeavyWeeks`) get amber header glow + "{h}h" badge (S12: + "Plan it" button → SemesterPlan's replan tray modal when `onPlanHeavyWeek` passed). S12: accepted/moved planner sessions render as 6px hollow dots at the top of the unit lane (`plannedSessions` prop; done = filled). Red "Today" line. Zoom toggle: Comfort (104px cols, drag/swipe scroll, auto-scroll to current week or `scrollToWeek`) / Weeks fit. Marker tap → fixed mini card → Open → drawer. Undated assessments counted in a footnote. |
| Kanban (Pro) | `components/uni/SemesterKanban.jsx` | Wrapped in `<ProGate feature="kanban">`. Fixed status columns Not Started / In Progress / Submitted / Graded; exam KanbanBoard dnd-kit sensors (PointerSensor distance 8 click-vs-drag). No within-column reorder — cards sort by due date. Drop into Submitted → submission-moment toast + `submitted_at` (+ `is_late`); into Graded → status graded + drawer opens with `focusGrade` (scrolls to `#ad-grade`); OUT of Submitted/Graded → inline confirm bar, then clears stamps (mirrors drawer's confirmStatusChange). Mobile: status tab strip, tap-to-open (no drag). |

### ProGate / uniGates contract (USM Session 8)
`src/lib/uniGates.js` — **LIVE since Session 14.** `UNI_GATES` ({KANBAN, AI_PLANNER, GRADES_PDF, MULTI_TERM_GPA (S10), BUNCHING_REPLAN (S12 — one-tap replan; the warning itself stays free), FALLACY_LEARNED (S12 — learned per-type multiplier; free tier keeps the 1.5 default chip), REVISION_ALL_UNITS (S13), FULL_SR (S13), FULL_ANALYTICS (S14), ICAL_OUTBOUND (S14), ATTACHMENTS (reserved — no UI yet)}), `GATE_COPY` (pitch-card copy per gate). `src/components/uni/ProGate.jsx`: `<ProGate feature="kanban">{children}</ProGate>` — open gate renders children untouched; locked gate renders a blurred (`blur(6px)`, pointer-events-none) preview behind a centered pitch card (Lock icon, GATE_COPY, navy "Pro" pill). Components never read subscription state directly — always gate through ProGate/canUse.

**How the live gates work (Session 14):** App.jsx calls `configureGates({ plan: subscription.isPro ? 'pro' : 'free', subscriptionActivated: subscription.activated })` during render (module-level gate context — every existing `canUse(feature)` call site kept its no-arg signature; an optional second ctx arg overrides for tests). `canUse`: master switch `app_settings.subscription_activated` OFF → everything true (free preview, identical to the pre-S14 stub); ON + plan 'pro' → true; ON + free → `FEATURE_MATRIX[feature]`. `useUnits.canAddUnit(plan, count)` reads the same context via `gateContext()` — free + activated caps at `FREE_UNIT_CAP = 5` per term (enforced in both `addUnit` and the UnitsTab button).

**Free/Pro gate matrix (Part 7, once subscription_activated is ON):**
| Gate | Free | Pro |
|---|---|---|
| units (canAddUnit) | 5 per term | unlimited |
| `ai_planner` | OPEN but capped — 10 accepted proposals / rolling 7 days (`plannerWeeklyCap()`; PlannerTray counts accepted/moved/done rows stamped in the window, shows "{k} of 10 this week", disables Accept at the cap, auto mode only auto-accepts up to the remaining allowance) | unlimited |
| `kanban`, `multi_term_gpa`, `bunching_replan`, `fallacy_learned`, `revision_all_units` (free = weakest unit), `full_sr`, `full_analytics` (free = 3 basic charts), `grades_pdf`, `ical_outbound`, `attachments` | ✗ | ✔ |

**EXPLICITLY FREE FOREVER (asserted in uniGates.js header — never gate these):** grade calculator / what-do-I-need / what-if / GPA-WAM all scales, dark mode (when shipped), iCal LMS import + re-sync, notifications, Week 3-4/6 check-in, timetable image export, terms/timetable/Today/day-planner/Pomodoro, unlimited assessments.

### Uni analytics chart map (USM Session 14 — §2.7)
`src/screens/uni/UniAnalytics.jsx` — self-fetching (exam Analytics precedent), own lazy chunk. Every chart documents its data source:
| # | Chart | Data source | Tier |
|---|---|---|---|
| 1 | Grade trend (line per unit, declining chip) | assessments (graded), plotted at due week via `getTeachingWeeks` | FREE |
| 2 | Study hours by unit vs credit share (+ honest caption "X is {c}% of your credits but received {t}% of your study time") | study_sessions (unit_id or assessment→unit) vs `units.credit_value` | FREE |
| 6 | Study consistency heatmap | study_log ∪ study_sessions — REUSES the exam `StudyHeatmap` via new optional props `thresholds`/`intensityLabels`/`valueLabel` (defaults keep exam rendering byte-identical); minutes buckets 0/<1h/<2h/2h+ | FREE |
| 3 | Deadline adherence (lead-time line + avg + "down from X at semester start") | `due_date+due_time` − `submitted_at` | PRO `full_analytics` |
| 4 | Planning accuracy (estimated-vs-actual scatter + diagonal + multiplier readout) | estimated_hours vs max(study_sessions/60, logged_hours); `personalMultiplier` | PRO `full_analytics` |
| 5 | Attendance heatmap (unit × teaching week) | attendance_log × `classOccursInWeek`/`dateForClassInWeek` | PRO `full_analytics` |
| 7 | Projected finals (per-unit band track: floor/ceiling + projected marker, scale-formatted) | `unitGradeBreakdown` — running average held constant on remaining weight | PRO `full_analytics` |
Each Pro chart is individually wrapped in `<ProGate feature="full_analytics">` (blurred preview per chart).

### Notifications (USM Session 14 — §3.5, FREE forever)
Delivery layer `src/lib/notify/notifier.js`: provider interface `{getPermission, requestPermission, schedule(id, when, {title, body}), cancel, cancelAll}` — `webNotificationProvider` ships (Notification API + in-page setTimeout, 24.5h max horizon); FCM/APNs implement the same interface later. Denied/unsupported permission → delivery falls back to a `studyrise:notify` CustomEvent that App.jsx surfaces as a 10s toast (never silently dropped).
Content layer `src/lib/notify/uniNotifications.js`: `NOTIFY_TYPES` (digest 8AM default-on / exam_7d / assignment_72h "time to start" / assignment_24h / day_of 9AM / attendance (toggle only — those fire event-driven in the skip flow) / heavy_week 8:30AM on the week's first day), prefs in `localStorage:studyrise:notify:prefs` (per-device is honest scope — the browser permission is per-device too): `{enabled, types{}, quietStart '22:00', quietEnd '07:00'}`. `computeUpcomingNotifications` (pure): next-24h window, quiet hours SHIFT to window end (overnight ranges handled), hard cap 5/day dropped by priority exam(1) > assignment(2) > digest(3) > others(4). Digest content rule: "Today: {n} classes. {nearest} due in {d} days ({h}h work remaining). Suggested: {x}h study this afternoon." `scheduleUniNotifications(userId, settings)` is self-fetching (terms/units/assessments/classes) — App.jsx calls it once per load in uni mode (`notifyRanRef`); NotificationsTab re-calls it on every pref change. No server cron — Phase 3.

### Exports (USM Session 14 — §4.3)
`src/lib/uniExport.js` — all client-side, zero new dependencies:
| Export | Tier | Path |
|---|---|---|
| Full term JSON (term/units/assessments/classes + settings subset, versioned payload) | free | `exportTermJSON` |
| Assessments CSV (due-date sorted, quoted cells) | free | `exportAssessmentsCSV` |
| Timetable PNG (purpose-built SVG week grid → canvas → toBlob; CSS vars resolved to hex via getComputedStyle at build time) | free — it's marketing | `buildTimetableSVG`/`downloadTimetableImage` |
| Outbound .ics (assessments as VEVENTs at due datetime; weekly classes as RRULE, odd/even/rotation as INTERVAL=2, specific-weeks as individual events; floating local times matching the importer's wall-clock simplification) | Pro `ical_outbound` | `buildICS`/`downloadICS` — UI says "Download .ics · live feed URL coming soon" (hosted feed = Phase 3) |
| PDF grade report | Pro `grades_pdf` | route `/grades/report` (`GradeReport.jsx`) — print stylesheet + window.print(), no pdf lib |
`svgToPngBlob`/`downloadBlob` are shared with SemesterWrapped. The Import card points at Settings → LMS Sync (`onGoToLms` switches the tab).

### Semester Wrapped (USM Session 14 — Part 5)
`src/components/uni/SemesterWrapped.jsx` — self-fetching full-screen overlay (`open`/`onClose` only). Stats: hours studied + session count (study_sessions inside term dates), assessments completed (submitted+graded of total), final average (`currentWeightedAverage` → `formatAverageDisplay`), busiest week survived ("Week 12: 31 hours" — max session minutes per numbered teaching week), attendance % (attended / max(logged, scheduled) summed across `attendanceStatsByUnit`). "Save as image" renders a 600×760 navy SVG card → `svgToPngBlob` → download (the organic-acquisition share loop). Mounts: UniDashboard banner card when `todayStr > activeTerm.end_date`; Settings → Term Setup "Preview" button (testing). Quiet brand tone — no confetti. FREE.

### quickAddParser grammar (USM Session 8)
`src/lib/quickAddParser.js` — `parseQuickAdd(input, units, now?)` → `{ title, unitId, typeId, dueDate, weight, estimatedHours }` (nulls when unparsed; leftover text = title). Consumption order: (1) weight `"20%"`; (2) hours `"3h"/"3 hrs"/"3 hours"`; (3) date — `today` | `tomorrow` | weekday name/abbrev → NEXT occurrence (never today; "Friday" said on Friday = next week) | explicit `d/m` or `d-m` (rolls to next year when passed, rejects invalid like 31/2); (4) type — longest ASSESSMENT_TYPES label found as a whole phrase ("group presentation" beats "presentation"); (5) unit — first token ≥2 chars matching name/code case-insensitive substring, then code startsWith fallback. No regex lookbehind (Safari < 16.4). 10 hand-verified test cases live as comments in the file header.

### Quick-add FAB (USM Session 8 — §4.2)
`src/components/uni/QuickAddFab.jsx`, lazy-mounted ONCE in App.jsx inside Layout when `mode === 'university'` (own 7.7 kB chunk — exam bundle unchanged). Rides on Dashboard/Today/Semester/Grades/Timetable/Analytics; hides itself on `/settings`, `/profile`, `/admin`, `/privacy`, `/terms` via pathname prefix. Fixed bottom-right (`bottom-[88px]` above the mobile tab bar, `lg:bottom-6`), z-30 (under drawers/modals). Opens a Common/Modal: one NL input live-parsed by quickAddParser into a confirm chip row — unit (color dot select), type (grouped select), due date, weight %, estimated hours — every chip editable (overrides reset when the input text changes), unparsed text stays in the title field. Save → `addAssessment` (type defaults to assignment, estimated_hours from type meta, title falls back to the type label); realtime refetch propagates the row to whatever screen is open. Self-fetching via useTerms/useUnits/useAssessments. Session 10: on `/semester/unit/:id` the unit chip pre-fills from the route (parsed text or a manual chip edit still wins).

### uniPriority.js (USM Session 6)
`src/lib/uniPriority.js` — the focus engine. Pure functions only.
- `score(a) = urgencyFactor(daysUntilDue) × (weight||10)/100 × max(0.5, estimated_hours − logged_hours)`, hurdles ×1.25. `urgencyFactor`: overdue=4, ≤1d=3, ≤3d=2.5, ≤7d=1.5, else 1 (no due date = 1). Submitted/graded score 0 and are excluded.
- `getFocusQueue(assessments, totalMinutesByAssessment, today)` → descending by score; deterministic ties: earlier due_date → higher weight → created_at. `getFocusAssessment(...)` → queue[0] or null. `loggedMinutes` (from useStudySessions.totalMinutesByAssessment) narrows the remaining-effort factor.
- `getDeferralStreak(assessment, sessions, today)` — consecutive days ending YESTERDAY with zero study_sessions minutes for the assessment (bounded by created_at, capped 30). ≥ 3 → the focus card shows the 5-minute-rule variant ("Just open the document and write one sentence.") with a 15-minute mini-block start.

### generateUniBlocks (USM Session 6 — blockGenerator.js, NOT a fork)
`generateUniBlocks({ classes, focusQueue, settings, date, startTime='08:00', endTime='22:00' })` exported from `src/components/DayPlanner/blockGenerator.js` alongside the untouched exam `generateBlocks`.
- `classes` are TODAY'S occurrences pre-shaped by the caller: `[{ id, label ("BIO101 Lecture"), start_time, end_time, unit_id, colorToken ('--uni-*'), location, location_is_url }]` → fixed blocks of `type:'class'` (added to `FIXED_TYPES`, so `recalculateBlockTimes` cascades around them like prayer/gym/cdpath).
- Study blocks fill remaining time up to the `settings.daily_hours` budget (50-min work / 10-min break, 30-min long break every 3); rest day (`settings.rest_day` vs date weekday) → class blocks only.
- The top 3 of `focusQueue` are packed into study blocks by remaining-hours quota (ceil(remaining/0.833)); each carries `{ assessmentId, unitId, assessmentTitle, unitColor }` plus the exam subtitle slots (`taskLabel`, `subjectName` ← caller's `_unitLabel`/`_colorToken` annotations) so BlockRow renders unchanged.
- **Every uni study block gets `uni: true`** — the block-type flag for the timer-end branch.
- **S12 `planned` param**: accepted/moved planned_sessions for the date, pre-shaped `[{ id, label, start_time, duration_minutes, assessmentId, unitId, colorToken, unitLabel, reason }]` → pre-placed study blocks at their start_time (immovable during the free walk, consume the daily budget upfront, keep their implementation-intention label + `plannedSessionId`, reason lands in `note`). Sessions colliding with a class are dropped (move them in the tray). Free study blocks renumber around them; the focus-queue assignment loop skips them.

### Uni block timer-end flow (USM Session 6 — DayPlanner)
When a completed work block has `uni: true`, DayPlanner shows **"Log progress?"** instead of the exam Done/Continue prompt (same branching pattern as the SR rating prompt): minutes auto = block length, 0–100% slider "How far through this assessment are you?", Save → `onUniProgress(block, minutes, progressPct)` → UniToday writes a `study_sessions` row `{assessment_id, unit_id, minutes, progress_pct, estimated_hours_snapshot, source:'block_timer'}` and adds minutes/60 to `assessments.logged_hours` (single optimistic update). Skip → block done + break, no log. Exam blocks are untouched (flag never set in exam mode).
New optional DayPlanner props (exam callers unaffected): `uniMode` (hides the exam SetupForm/regenerate — UniToday owns generation), `onUniProgress`, `externalStartSignal` (`{idx, durationSecs?, ts}` — focus card starts/locates a block; `durationSecs < 50min` runs a mini-block via `resumeForBlock`, stored on the block as `blockDurationSecs` so restore-after-reload uses the right duration).

### UniToday (USM Session 6)
`src/screens/uni/UniToday.jsx` — self-fetching daily cockpit replacing the `/today` placeholder. Layout top-to-bottom per §2.2: classes timeline (classesForDate, isNow/isNext badges, Join links, one-tap attendance with the S5 hurdle-warning skip confirm) → focus card (uniPriority pick; unit color bar, due chip, weightLabel, "logged Xh of Yh" Bar, Start Focus Session → externalStartSignal; deferralStreak ≥ 3 swaps in the softened 5-minute-rule copy + "Just 15 minutes" button) → planner tray section (S12: `<PlannerTray/>` between focus card and planner, hidden when `planning_control === 'manual'`) → DayPlanner (uniMode, generateUniBlocks via a "Plan your day" start/end card — S12: today's accepted/moved planned_sessions passed as `planned`, timer completion also `markDone`s the planned row; blocks persisted to `study_log.blocks` exactly like exam Today) → quick add bar (regex `/(\d+(?:\.\d+)?)\s*h(?:ours?|rs?)?/i` + minutes variant; "essay draft 2h" → 2h ad-hoc `uni:true` block, default 1h, optional assessment select; study_sessions row only when its timer completes) → day log row (Complete/Partial/Rest/Missed → `upsertLog`).
**Shared study_log decision**: the uni day log writes the SAME `study_log` table as exam mode — intentional, so the streak continues across modes. Uni study time lives in `study_sessions` (separate); study_log carries day status + blocks JSONB only.

### gradeScales.js (USM Session 9 — pluggable scale registry)
`src/lib/gradeScales.js` — **adding a national grading system is data entry, not code**. `GRADE_SCALE_REGISTRY` maps scale id → `{ id, label, regions, kind: 'continuous'|'banded', bands: [{min, label, long, points}] (sorted desc by min), gpaMax, toPercent(x), fromPercent(p), format(v) }`. Ships: `percentage` (continuous), `gpa4` (A≥85→4.0 common-default letter map — cutoffs vary by institution, custom registry editing is Phase 3), `gpa7_wam` (AU: ≥85 HD 7 / 75 D 6 / 65 C 5 / 50 P 4 / N 0; WAM IS the raw credit-weighted percent), `cgpa10` (India: 90 O 10 … 40 P 5 — the P-band 4/5 variance is commented), `uk_honours` (≥70 First / 60 2:1 / 50 2:2 / 40 Third / Fail), `passfail`. Exports: `getScale(id)` (percentage fallback), `bandForPercent(bands, pct)`, `approxConvert(value, fromId, toId)` — **percent is the interchange format and the result is ALWAYS prefixed "≈"; never imply exact equivalence**, `formatAverageDisplay(scaleId, percent)` → `{primary, secondary}` for KPI tiles / Grades headers (e.g. gpa4 → `{"3.0", "GPA 4.0 · B · ≈73.2%"}`), `targetOptionsForScale(scaleId)` → passing bands (or % presets for continuous) for the What-do-I-need selector.

### gradeEngine.js (USM Session 9 — FULL engine, MATH-CRITICAL)
`src/lib/gradeEngine.js` — pure; works exclusively in raw percentages (gradeScales formats at display time). **7 hand-verified worked examples live in the file header — re-trace them if you change any formula.** Every result is shown with its math in the UI (anti-black-box rule).
- `unitGradeBreakdown(unit, assessments)` → `{ rows: [{assessment, weight, score, contribution, graded}], completedWeight, earnedPct, runningAverage, remainingWeight, totalWeight }`; pass/fail unit → `{ passFail: true, rows, completedCount, totalCount }`. The spec example reproduces exactly: Essay 30%×68 + Quiz 20%×81 → earnedPct 36.6 of 50% completed, runningAverage 73.2.
- `currentWeightedAverage(units, assessments, scale)` — same export name/shape as the S7 stub, but now **credit-weighted across units** (per-unit runningAverage × credit_value, default credit 1) instead of pooling assessment weights globally; single-unit calls return that unit's runningAverage (call sites unchanged). Pass/fail units excluded; null when nothing graded.
- `whatDoINeed(unit, assessments, targetPct, scaleId)` → `required = (target − earnedPct)/remainingWeight × 100`; status `'achievable'` (≤ runningAverage+5, or ≤70 with nothing graded) | `'stretch'` (≤100) | `'impossible'` (>100) | `'no_remaining'` | `'pass_fail'`; plus `secured` (raw required ≤ 0), `maxPossible` (= earnedPct + remainingWeight), `maxPossibleBand`, `lowerBands` (reachable scale bands below the target with their required %, powers the honest "Distinction is gone — highest possible is 72% (Credit), for a Credit you need 61%" copy), `remaining` rows, `hurdles` (titles of remaining must-pass items → "…and you must pass the {title} (hurdle)"), `bestGradedScore` (stretch copy).

### Grades screen (USM Sessions 9 + 10 — all four §2.5 sections)
`src/screens/uni/Grades.jsx` — self-fetching, own lazy chunk. Section order: B → A → C → D. Section B "What do I need?" lives in `src/components/uni/WhatDoINeedCard.jsx` (extracted Session 10 so UnitDetail embeds it; props `presetUnitId` locks+hides the unit select, `compact` drops the Card2 wrapper — extraction note: it returns `wrap(<>…</>)`, NOT an inline `<Wrapper>` component, which would remount inputs and drop focus every keystroke): gradable-unit select, target select from `targetOptionsForScale` + Custom %, tone-colored result card — green/amber/red for achievable/stretch/impossible — with per-assessment required lines when remaining weights differ, hurdle line, and the visible formula footer `(target − earned) ÷ remaining × 100`; recomputes live on grade entry. Section A: tracker card per unit — color bar, running average via `formatAverageDisplay` in the unit's text color, target_grade chip, assessment table (weight, grade or inline pending entry `received/max` + ✓ → `setGrade`, contribution column), **the visible math line** (`"Essay (30%) × 68 = 20.4 of 50% completed"` in a mono surface-2 strip), remaining-weight note + "weights entered total X%" honesty caption when ≠100. Pass/fail units render a completion-only card. Sections C and D below. Entire screen is FREE (acquisition engine — never gate it).

### WhatIfSimulator (USM Session 10 — §2.5 C, EPHEMERAL rule)
`src/components/uni/WhatIfSimulator.jsx` — unit select → every ungraded weighted assessment gets a 0–100 slider (accent = unit color) + numeric input; graded items shown locked (Lock icon, actual score). Slider default: saved `target_score` → round(runningAverage) → 65; sliders re-seed on unit change or when a row graduates to graded (keyed on unit id + ungraded-row ids). Live projection `projected = (earnedPct + Σ sim×weight/100) / totalWeight × 100` — equals the plain sum when weights total 100, honest when they don't. Animated number via framer-motion `useSpring` + `useMotionValueEvent` (jumps under `useReducedMotion`). Sentence: items listed verbatim for ≤3 sliders ("If I get 75 on the report and 60 on the exam, I finish with 68."), weighted-average phrasing beyond. **THE RULE: simulation is ephemeral and NEVER writes `grade_received`.** The only persist path is "Set as my targets" → `assessments.target_score` (usm_005_grades.sql), a planning number gradeEngine never reads. Reset returns sliders to the pure default (running average / 65), ignoring saved targets. Grades passes `onSaveTargets(targets)` which loops `updateAssessment(id, { target_score })` — not a sync-owned field, so `manually_edited` is never stamped.

### GpaPanel (USM Session 10 — §2.5 D, multi-term data flow)
`src/components/uni/GpaPanel.jsx` — Grades only fetches the ACTIVE term's units/assessments, so the panel does its own two flat reads (`units` + `assessments` by user_id) and joins them to the full `terms` list passed in from useTerms (archived included). Per-term rows (terms sorted by start_date asc): unit count, credits (Σ credit_value over gradable units, default 1), term average = `currentWeightedAverage(termUnits, allAssessments)`, cumulative = `currentWeightedAverage(unitsSoFarAcrossTerms, …)` — all credit-weighted gradeEngine math, formatted per scale via `formatAverageDisplay` (gpa7_wam shows WAM headline + GPA band together). **Free vs Pro split: the current-term headline is free; the all-terms history table sits in `<ProGate feature="multi_term_gpa">`** (stub open until S14). Exchange conversion line for every non-gpa4 scale: `"Your WAM 74 ≈ 3.0 GPA (B)"` via `approxConvert(pct, 'percentage', 'gpa4')` — always "≈" (gpa4 users already get ≈% in the secondary line, so no extra line). Pass/fail units: "Completed (pass/fail): n of m — excluded from averages" (completed = has assessments, all submitted/graded).

### UnitDetail (USM Session 10 — §2.4)
`src/screens/uni/UnitDetail.jsx` — `/semester/unit/:id`, replaces the placeholder (deep-linked from Dashboard unit cards). Self-fetching via the standard USM hooks; unit looked up in the ACTIVE term's units — ids from archived terms get a "not in your active term" empty state. Top-to-bottom: header card (5px color bar, name/code, credits Badge2 with credit_label, pass/fail + priority badges, coordinator, running average via `formatAverageDisplay` vs `target_grade`) → grade progress (earned/dropped/remaining stacked bar over a 0–100 track + embedded `<WhatDoINeedCard presetUnitId compact/>`; hidden for pass/fail units) → assessments (the exported Semester `AssessmentRow`, open rows then completed, click → AssessmentDrawer with updateWithScope/grantExtension/delete) → classes (rows + attendance % from `attendanceStatsByUnit` (≥80 green / below red, "N not logged") + **per-week attendance dots**: one column per numbered teaching week, a dot per tracked-class occurrence — green attended / red skipped / hollow past-unlogged / dashed future, built from getTeachingWeeks × classOccursInWeek × dateForClassInWeek) → study hours (Recharts BarChart of hours per teaching week, bar fill = the unit's `var(--uni-*)` token; sessions matched by `unit_id` OR `assessment_id ∈ unit's assessments`) → notes (`units.notes`, autosave on blur with Saved flash). Back button → `navigate('/semester')` — the previous list/timeline/kanban view restores automatically because useSemesterView persists in localStorage. The global QuickAddFab pre-fills this unit on this route (it matches the pathname; explicit parse text or a chip edit still wins).

### bunchingRadar.js (USM Session 7 — detection; one-tap replan wired Session 12)
`src/lib/bunchingRadar.js` — pure. `detectHeavyWeeks(assessments, term, settings)` → `[{ weekNumber, startDate, endDate, hours, count, weightPct, assessments }]` for flagged teaching weeks, in order. A week is heavy if any of: (1) sum of `estimated_hours` due that week > weekly target, (2) ≥3 assessments due, (3) combined weight ≥50% inside any 7-day window overlapping the week (windows anchored at each due date — catches clusters spanning week boundaries). Submitted/graded are excluded (radar = pain still ahead); break weeks are never flagged. `weeklyHoursTarget(settings)` = `weekly_hours_target` falling back to `daily_hours × (7 − rest day)`, default 4×6/7. Session 8 adds the Timeline amber glow; Session 12 wires the one-tap auto-replan ("Start early — plan it" on the Dashboard card + "Plan it" badge on the Timeline glow → ProGate `bunching_replan` → PlannerTray `autodraft="week"` — buildDemand's heavy-week pull does the actual pulling-forward).

### uniPlanner.js (USM Session 12 — the AI planner engine; lock semantics)
`src/lib/uniPlanner.js` — pure, deterministic ("AI" = this engine + reason strings; NO OpenAI anywhere). **THE LOCK RULE: AI never overrides human decisions.** Rows with `user_locked` or status `accepted`/`moved`/`done` are never regenerated or deleted — `buildDemand` subtracts their minutes from demand and `packWeek` packs around their time slots; `usePlannedSessions.replaceProposals` deletes ONLY `status='proposed' AND user_locked=false` rows (optionally scoped by date range / assessment) before inserting a fresh draft. Rejected rows are ignored.
- `buildDemand({assessments, sessions, plannedSessions, settings, term, today, onlyAssessmentIds})` → priority-ordered items `{assessment, remainingMinutes, targetHours, doneHours, multiplier, pulled}`. Demand per open sized assessment = `estimated_hours × personalMultiplier(category) − max(sessions minutes, logged_hours) − kept planned minutes` (skip < 0.4h). **Heavy-week pull**: assessments due in a `detectHeavyWeeks` week get `startBy` = the previous teaching week's startDate; urgency scores against `min(due_date, startBy)` so their sessions distribute backward into lighter weeks. Ordered by uniPriority `scoreAssessment`.
- `draftWeek({…, weekStart})` → `{proposals, demand}`; `draftRange({…, fromDate, toDate})` loops weeks carrying leftover demand (≤26 weeks). Never drafts the past.
- Packing REUSES `scheduler.js packItemsByHours` (never duplicate the walk): day budget = `daily_hours − class minutes (classesForDate) − kept planned minutes`, rest day = 0 budget, chunks = 100-min sessions + trailing 50, `overflow:'drop'` (unfit chunks stay in demand for the next week).
- Proposal rows: `{assessment_id, date, start_time, duration_minutes, label, reason, status:'proposed'}`. start_time = first free slot after that day's classes (+10-min gaps between placements), 14:00 default on class-free days, fallback scan from 08:00, 08:00–22:00 window. Label (implementation-intention): `"{next unchecked checklist item || 'Work on'}: {title} ({k} of {n} estimated hours)"`. Reasons: pulled → `"Scheduled early because this is worth {w}% and your Week {n} is already heavy"`; due ≤7d → `"Due in {d} days, {h} hours remaining"`; overdue/dated/undated variants.
- Control dial `settings.planning_control` ('auto'|'suggest' default|'manual', S1 column; UI = `PlanningControlCard` in the uni Daily Routine tab): auto → PlannerTray inserts drafts as `accepted` (instant blocks + Timeline dots); suggest → review tray; manual → planner UI hidden everywhere (tray null, plan-it buttons hidden, drawer tray shows a one-line note) — only warnings (radar, coach) remain.
- Accepted/moved sessions for today flow into `generateUniBlocks({…, planned})`: placed at their start_time BEFORE free packing as immovable study blocks (uni:true, `plannedSessionId`, implementation-intention label kept, reason in note), consume the daily budget, class-collisions dropped (move them in the tray); block timer completion → study_sessions log + `markDone(plannedSessionId)`.

### planningFallacy.js (USM Session 12 — multiplier algorithm)
`src/lib/planningFallacy.js` — pure. `personalMultiplier(sessions, assessments, typeCategory)` → `{multiplier, source:'category'|'overall'|'default', samples}`. History = assessments with status submitted/graded, `estimated_hours > 0`, and actual hours > 0 where actual = `max(study_sessions minutes for it / 60, logged_hours)`. ratio = actual/estimated; multiplier = median of the category's ratios (≥3 samples) else overall median (≥3) else `PLANNING_FALLACY_DEFAULT_MULTIPLIER` 1.5; clamped [1.0, 3.0] (never suggest planning less than the estimate). 5 hand-traced examples in the file header — re-trace if the math changes. `suggestedHours(E, m) = ceil(E×m)`. `<PlanningFallacyChip/>` (drawer Effort group): learned source + m > 1.15 → "You estimated {E}h. On similar past work you needed {m}× your estimate — consider planning for {ceil}h."; no history → the research-backed 1.5× buffer copy; learned m ≤ 1.15 → renders nothing. Tap applies — NEVER a silent override. Learned multiplier is behind `fallacy_learned` (free tier always gets the 1.5 default chip). The chip self-fetches (useStudySessions + one flat submitted/graded assessments read — GpaPanel precedent).

### Check-in state machine (USM Session 12 — Week 3-4/6, §3.3)
UniDashboard card (weeks 3/4 → key 'week3', week 6 → 'week6'; gated by `settings.checkin_state[key].dismissed`). Answering persists `{dismissed:true, dismissedAt, response, answeredAt}` — the card never re-asks. Branches:
- **on_track** → inline confirmation "Good. Your next deadline is {title} · {due chip}." (dismissible)
- **slightly_behind** → `PlannerTray autodraft="range"` modal (draftRange today → term end)
- **struggling** (week3) → workload review modal: heaviest unit by remaining estimated hours ("{Unit} carries ~{h}h of your remaining ~{H}h"), lower-target-grade suggestion, support link from `settings.support_services_url` (GradingTab field; line hidden when unset — never medical advice), recovery-plan tray below
- **struggling** (week6, lighter variant) → range tray only, no workload review
- `planning_control = 'manual'` → behind/struggling branches degrade to a "nothing was drafted" note (the planner never acts in manual).

### useReviewReminders (USM Session 13)
`src/hooks/useReviewReminders.js` — SR Lite CRUD. `addReminder({unit_id, topic, interval_days:7})`, `completeReminder(r)` (7→14→30 expanding ladder; done at 30 = done for good), `snoozeReminder(id, days=2)`, `dismissReminder(id)`. `dueReminders` = reminders where `!done && due_date ≤ today`. Realtime-subscribed.

### revisionPlanner.js (USM Session 13)
`src/lib/revisionPlanner.js` — pure, deterministic exam revision planner. `getOpenExams(assessments)` — category='exam', open, has due_date. `getRevisionWindow({assessments, term, today})` — window start = study_week_start || exam_period_start−14d || first_exam−14d, clamped to today; end = last exam. `generateRevisionPlan({assessments, units, classes, plannedSessions, settings, term, today, scope:'all'|'weakest'})` → `{proposals, window, perUnit, scope}`. Weighting: inverse-gap (gap = targetPct − runningAverage, clamped [2,40], unknown grade = 10). Round-robin interleave across days. Per-exam taper: sessions end before each exam's due_date; final-day slot leads with that unit. scope='weakest' = free tier (one unit); scope='all' = Pro (`revision_all_units` gate). Output: planned_sessions rows, status='proposed', reuses full S12 tray machinery. Entry points: Grades banner (≥1 open exam), SemesterTimeline exam-period zone, Dashboard coach card (≤21 days to first exam).

### SR Lite + Full SR bridge (USM Session 13)
SR Lite (default, `units.sr_mode='lite'`): after logging a study session in UniToday, an 8-second toast offers "Remind me to review this in 7 days?". Accepts → `addReminder`. Due reminders render above the quick-add bar: Done/Snooze/Dismiss. Done advances the ladder (7→14→30→done). Zero ratings, zero setup.

Full SR (Pro, `units.sr_mode='full'`, gate `FULL_SR`): sessions ≥50 min offer a "Track with spaced repetition" modal → creates an sr_records row via `createSRRecord({subject_name: unitName+': '+topic, completed_date, sr1_due})`. subject_name format is "UnitName: topic" so SR records are scoped by unit. Due SR hits surface on UniToday with the SRModal rating picker (reuses exam SR components). A compact SR panel on UnitDetail shows all records for that unit.

sr_mode toggle: units edit modal in UnitsTab (Off / Reminders / Full SR). Full chip disabled + Pro badge when `!canUse(FULL_SR)`.

SR auto-create guard: App.jsx's SR effect has `if (mode !== 'exam') return;` on line 1 — uni mode NEVER triggers exam-style milestone SR auto-creation. useSRRecords in App.jsx uses `{ enabled: examFetchesEnabled }`. UniToday's own `useSRRecords()` call (no enabled flag) is intentional — uni users need SR records for the Full SR bridge.

### UniDashboard (USM Session 7)
`src/screens/uni/UniDashboard.jsx` — self-fetching semester-at-a-glance replacing the `/` placeholder. No new queries — everything derives from the standard USM hooks. Sections top-to-bottom per §2.1:

**Uni KPI map (4 tappable KPITiles):**
| Tile | Value | Source | Tap → |
|---|---|---|---|
| Semester progress | Week {n} ("—" in breaks/outside term) + Bar of n/total | `getCurrentWeek` / `getTotalTeachingWeeks` | `/semester` |
| Due in 7 days | count of open (not submitted/graded) assessments with `due_date ≤ today+7` (overdue included); amber value + copy when ≥3 | assessments | `/semester` state `{filter:'due7'}` |
| Current average | `currentWeightedAverage(units, assessments, grade_scale)` rendered via `formatAverageDisplay(grade_scale, avg)` — primary in the student's scale (e.g. "3.0" for gpa4, WAM % for AU), secondary shows band + ≈% ; "—" when null | gradeEngine (full, S9) + gradeScales | `/grades` |
| Hours this week | `minutesThisWeek/60` vs `weeklyHoursTarget(settings)` + mini Ring % | useStudySessions / bunchingRadar | `/analytics` |

Below: **deadline strip** (horizontal scroll, next 14 days, overdue pinned first with red chip + "{n}d late", unit-color left accent, tap → `/semester` state `{openAssessmentId}`) → **heavy-week warning** (first `detectHeavyWeeks` result ending ≥ today; spec copy + "~Xh against your Yh week"; tap → `/semester` state `{scrollToWeek}`; S12 adds the "Start early — plan it" button → ProGate `bunching_replan` → PlannerTray autodraft modal, hidden in manual control) → **Week 3-4/6 check-in card** (visible when `getCurrentWeek ∈ {3,4}` → key 'week3' or `6` → 'week6' and not dismissed in `settings.checkin_state`; INTERACTIVE since S12 — see "Check-in state machine"; X persists `{dismissed, dismissedAt}`, answers add `{response, answeredAt}`) → **coach card** (rule-based one-liner, NO OpenAI, priority: overdue exists > heavy week within 14 days > focus pick with zero logged minutes due ≤4d (spec copy with `h = ceil(estimated/days)`) > "Next deadline in {n} days. You're ahead of schedule."; hidden when no dated assessments) → **unit cards grid** (color bar, name+code, per-unit stub grade or "Pass/fail", attendance Badge2 when tracked (green ≥80% / red), mini Ring (submitted+graded)/total, next-deadline line in urgency color; tap → `/semester/unit/:id`) → **today's classes compact list** (classesForDate, Now/Next badges, Join links). Empty states on every section for brand-new accounts.

**SemesterPlan navigate-state contract (added Session 7, fully honored since Session 8):** `{openAssessmentId}` opens that drawer once assessments load (one-shot ref guard); `{filter:'due7'}` filters to open assessments due ≤ 7 days with a dismissible amber chip (composes with the filter bar); `{scrollToWeek}` switches the view to the timeline (one-shot) and auto-scrolls it to that teaching week.

### LMS iCal import (USM Session 11 — §4.1, the moat)
One pasted URL imports the whole semester. Built behind a **provider interface** so Canvas REST (grades sync back) / Google two-way sync plug in later with zero UI rework: `src/lib/ical/lmsProviders.js` providers are `{ id, label, instructions[], detect(url), mapEvent(vevent) → {title, dueDate, dueTime, courseKey, suggestedType} }`. Ships canvas (`/instructure|canvas/`), moodle, blackboard, brightspace_d2l, generic (fallback, always last). Type inference: quiz→quiz, final→final_exam, midterm→mid_semester_exam, exam/test→in_class_test, lab→lab_report, presentation/essay/report/discussion → likewise, default assignment. courseKey = trailing `[BRACKET]` in the summary, else CATEGORIES[0]. Boilerplate suffixes ("is due", "closes") stripped.

**Fetch path**: browser → `POST /api/ical-fetch {url}` (Supabase JWT required — never an open relay) → SSRF guard (http(s) only; reject IP literals v4/v6, localhost, `*.local`, `*.internal`, dotless intranet names) → 15s AbortController timeout → streamed 2MB cap → must contain `BEGIN:VCALENDAR`. `webcal://` is normalised to https. Parser (`parseIcal.js`) is dependency-free: unfolds CRLF+space folds, splits name/params/value at the first colon outside quotes, unescapes TEXT, handles VALUE=DATE vs DATE-TIME, converts trailing-Z via Date.UTC, treats TZID as wall-clock local (commented simplification). Events without UID get a synthetic `summary+date` key via `eventUid`.

**Sync rules (syncEngine.js — the contract):**
| Feed state | manually_edited | Action |
|---|---|---|
| new uid | — | PROPOSE (checkbox modal on manual sync; count-only badge from background sync) |
| changed due date | false | apply silently + stamp `last_lms_change {field, old, new, at, resolution:'applied'}` → drawer shows "Updated by your LMS" (14-day transient chip) |
| changed due date | true | CONFLICT card "Your LMS moved this to {new}. You edited it to {current}. Keep mine / Take theirs." Keep mine remembers the rejected value (`resolution:'kept_mine'`) so the same feed date never re-asks; a NEW move re-raises. Take theirs sets the date and clears `manually_edited` (ownership returns to the feed). |
| uid disappeared | — | FLAG list only — never auto-delete |

`manually_edited` is stamped by `useAssessments.updateWithScope` whenever a patch touches title/due_date/due_time (wired in Session 4). Dedupe: the usm_001 partial unique index on (user_id, ical_uid); `insertImportedAssessments` tries the batch, falls back to per-row on 23505 and reports `{imported, skipped}` — re-importing the same feed creates zero duplicates.

**Daily auto-sync MVP**: App.jsx runs `runBackgroundSync` once per load in uni mode when any feed's `lastSyncedAt` is >20h old — silent-rule subset only (clean date changes apply; new events are counted into `localStorage:studyrise:lms:pendingProposals`, surfaced as a banner on Settings → LMS Sync, never a modal interrupt). True server-side cron is Phase 3. `LmsSyncTab` owns manual "Sync now", the proposal modal (auto-matched unit + editable type per event), conflict cards, the missing-from-feed list, feed add/remove. Both new columns land in `migrations/usm_006_ical.sql` — **run it in the Supabase SQL editor before testing sync** (import itself only needs the usm_001 columns).

### Conventions
- `classes.day_of_week`: **0 = Monday … 6 = Sunday**
- Exam Mode must never break — all USM code is additive; legacy users (`exam_type` NULL, `app_mode` NULL) are sacred
- Unit colors: `color_key` palette keys only, resolved through `UNIT_COLORS` → CSS vars

## What Is Not Built Yet

- No offline support or PWA
- No server-side notification cron and no native push (FCM/APNs) — uni notifications are computed on app load and fire only while a tab is open (notifier.js provider interface is ready for native push)
- No hosted outbound iCal feed URL — only the .ics file download ships (S14); the live-feed URL is Phase 3
- No Canvas REST API integration (grades sync back) — the lmsProviders interface is ready for it
- No app-wide dark mode pass for USM screens (dark tokens exist; a dedicated session later)
- No syllabus PDF AI parsing
- bKash/Nagad payments — separate plan (UpgradeModal shows "coming soon")
- No multi-user sharing or collaboration
- Admin panel pagination (currently fetches up to 1000 users in one request)
- OTP verification (phone): infrastructure built in Auth/Security Session 8 (mock mode — codes logged to Vercel function logs). Swap to Twilio: implement `OTP_PROVIDER='twilio'` branch in `api/send-otp.js` and set `VITE_OTP_PROVIDER='twilio'`. Admin toggle (`otp_required`) controls whether the gate is enforced.
- Google brand verification: submitted to Google for the OAuth consent screen; approval can take 1–6 weeks (pending).
- 2FA via authenticator apps: deferred.
- bKash/Nagad payment processing: separate plan (UpgradeModal shows "coming soon").

## Profile System (Sessions 4–6)

### New columns on user_settings
| Column | Type | Notes |
|--------|------|-------|
| display_name | text | Editable name (separate from Supabase auth metadata) |
| phone_number | text | Required for all users; collected on registration or via CompleteProfileModal |
| phone_verified | boolean | Set to true when OTP is verified (Auth/Security Session 8); false on phone change |
| avatar_url | text | Full public URL in Supabase Storage (`avatars` bucket) |

### Key files
- `src/screens/Profile.jsx` — `/profile` route; edit name, phone, photo; account info with plan badge
- `src/components/ui/Avatar.jsx` — renders photo if set, initials fallback (deterministic color from userId)
- `src/lib/profileUtils.js` — `getInitials`, `getAvatarColor`, `uploadAvatar`, `deleteAvatar`
- `src/components/CompleteProfileModal.jsx` — shown to Google OAuth users missing a phone number; cannot be dismissed until phone is saved
- `src/components/ui/GoogleButton.jsx` — official Google branding button used on Auth screen

### Avatar storage
- Bucket: `avatars` (public read, authenticated write)
- Path format: `{userId}/avatar.{ext}`
- Max size: 3 MB; allowed types: JPEG, PNG, WebP, GIF
- `uploadAvatar` upserts with cache-busting `?t=` query param

### Auth flow additions
- Google OAuth: `signInWithGoogle` in `useAuth.js` calls `supabase.auth.signInWithOAuth`
- Phone is mandatory; email registrations collect it on the sign-up form
- On email registration: phone + trial start written to `user_settings` in one upsert
- `needsPhone` guard in `App.jsx` shows `CompleteProfileModal` when `settings.phone_number` is null

### Sidebar / mobile entry points
- Desktop sidebar: avatar strip at bottom → `/profile`
- Mobile: profile strip at top of Settings screen → `/profile`

---

## Subscription System (Sessions 7–10)

### Global activation flag
The `app_settings` table (key = `'subscription'`) holds a JSON value:
```json
{ "activated": false, "trial_days": 14, "announcement": "..." }
```
- `activated = false` (default) → **free preview mode**: everyone gets `isPro: true`, nothing is gated
- `activated = true` → tier-based access enforced for all users
- The admin flips this from the Admin Panel → "Subscription Settings" tab (with confirmation modal when turning ON)

### useSubscription hook
```js
const subscription = useSubscription(user, settings, appSettings);
// Returns: { tier, isPro, isTrial, isExpired, trialDaysLeft, trialEndsAt, activated, status }
```
- `appSettings` comes from `useAppSettings()` — reads `app_settings` table; defaults to `activated: false` if table missing
- Admin (`ias.ndc@gmail.com`) always returns `isPro: true`, `tier: 'admin'`
- Passed from `App.jsx` to: Dashboard, SRModule, Analytics, Settings, Profile

### Tiers
| Tier | Meaning |
|------|---------|
| `trial` | 14-day full access from registration |
| `pro` | Paid subscription, access until `subscription_period_end` |
| `free` | Trial expired, limited access (once activated) |
| `admin` | Always full access |

### Trial auto-start
- Email registration: writes `subscription_tier: 'trial'`, `subscription_status: 'trialing'`, `trial_ends_at: now+14d` to `user_settings`
- Google OAuth first login: same upsert triggered in `App.jsx` `useEffect` if `subscription_tier` is missing

### Key files
- `src/hooks/useSubscription.js` — core subscription state logic
- `src/hooks/useAppSettings.js` — reads global config from `app_settings` table
- `src/lib/subscriptionGates.js` — `GATES` constants and `FREE_TASK_LIMIT = 30` (gates not enforced yet)
- `src/components/PlanBadge.jsx` — pill badge: Free Preview / Trial (Xd left) / Pro / Free / Admin
- `src/components/UpgradeModal.jsx` — pricing preview + feature list + "coming soon" banner; no payment
- `src/components/Settings/BillingTab.jsx` — Settings tab 9; adapts to all 4 subscription states

### Settings — Billing tab
Added as the 9th tab in Settings (before Danger Zone). Shows:
- Current plan card (free preview info box / trial progress bar / expired warning / pro active)
- Pro feature list (two-column grid)
- Free plan feature list with "coming active once subscriptions launch" note

### Admin Panel — subscription tabs
Two new tabs added to Admin Panel (alongside existing Users tab):
- **Subscription Settings**: global on/off toggle (with confirmation when enabling), trial days field, announcement text field
- **User Subscriptions**: table of all users with tier/status/trial-end; Edit modal per user to change tier, extend trial (+7/+14/+30 day shortcuts), set Pro end date

### Feature gates (DEFINED but NOT enforced)
```js
GATES = {
  SR_MODULE, ANALYTICS, AI_ADVISOR, EXPORT, KANBAN_VIEW, UNLIMITED_TASKS
}
FREE_TASK_LIMIT = 30
```
Gates are defined in `subscriptionGates.js` for future use. Nothing is blocked until `subscription_activated = true` in `app_settings` AND gate checks are wired into screens.

---

## Admin Panel v2 — `studyrise-admin/` (standalone app)

A **separate Vite + React project** at the repo root (`studyrise-admin/`, sibling to the main app). Deployed as its own Vercel project at **https://admin.studyrise.app**, sharing the same Supabase project as the main app. Plan: `docs/sessions/ADMIN_V2_SESSIONS.md` (6 sessions). **Status: Session 1 complete (scaffold + auth + layout shell), Sessions 2–6 are placeholders.**

### Deployment status (as of 2026-06-13)
- **Vercel project**: `istiaques-projects/studyrise-admin` — live at https://studyrise-admin.vercel.app and aliased to https://admin.studyrise.app
- **Vercel env vars set**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — all configured in Vercel project settings (key values: get `SUPABASE_SERVICE_ROLE_KEY` from Supabase Dashboard → Project Settings → API → service_role)
- **DNS**: requires an `A` record `admin → 76.76.21.21` at the Namecheap registrar for `studyrise.app` — add this if the custom domain stops working or is being reconfigured
- **Deploy command**: Run from the **repo root** (NOT from inside `studyrise-admin/`): `VERCEL_PROJECT_ID=prj_IDGEh1AkamPQhb654NdaDHXyrBc6 VERCEL_ORG_ID=team_V8AGP149vmOLOfxBVLXUf6a4 npx vercel --prod --yes`. The Vercel cloud project has `rootDirectory: "studyrise-admin"` configured — the CLI appends this to whatever directory it runs from, so running from inside `studyrise-admin/` produces a non-existent path `studyrise-admin/studyrise-admin/` and fails. The explicit env vars are required to avoid the repo root's `.vercel/project.json` targeting the main `studyrise` project instead.

The admin panel is being **migrated out of the main app** — the old `/admin` route (`AMC Tracker/src/screens/Admin/AdminPanel.jsx`, `api/admin.js`) still lives in the main app and is removed in Session 6.

### admin_role column (run before Session 1 — `migrations/admin_001_roles.sql`)
```sql
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS admin_role TEXT DEFAULT NULL;
-- values: NULL (regular user) | 'super_admin' | 'support'
UPDATE user_settings SET admin_role = 'super_admin'
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'ias.ndc@gmail.com');
```
`super_admin` = full access; `support` = read + limited actions (extend trials); NULL = no admin access → Access Denied screen. Also add `https://admin.studyrise.app` + `/**` to Supabase Auth → URL Configuration → Redirect URLs.

### Architecture / security
- **Auth**: Admin login supports both email/password (`supabase.auth.signInWithPassword`) and Google OAuth (`supabase.auth.signInWithOAuth`), separated by an 'or' divider. Email/password renders above the Google button. Both have independent loading states.
- **All data access goes through `studyrise-admin/api/admin-actions.js`** (Vercel serverless, holds `SUPABASE_SERVICE_ROLE_KEY`, bypasses RLS). The service role key is NEVER in the client bundle.
- **Server-side role guard**: every request carries the caller's JWT in the `Authorization` header; the endpoint verifies it, reads the caller's `admin_role` from `user_settings`, and rejects NULL with 403. `get_user_role` is the only action any authenticated user may call (only for their own id) — it's how the client decides login vs access-denied. Every other action requires `super_admin`/`support`. Client-side role checks are UI-only (disabling buttons).
- **Lightweight**: no Framer Motion / no animation lib — CSS transitions only. Deps: react, react-router-dom, @supabase/supabase-js, lucide-react, date-fns, recharts. Tokens copied from the main app's `tokens.css` (same `var(--token)` system, no hardcoded hex).

### Structure
```
studyrise-admin/
├── index.html · package.json · vite.config.js · tailwind.config.js · postcss.config.js · vercel.json · .env.local · eslint.config.js
├── public/favicon.svg                  # copied from main app
├── api/admin-actions.js                # serverless — { action, payload }; JWT + admin_role guard; service role key
└── src/
    ├── main.jsx · App.jsx              # App.jsx: auth state → fetch admin_role → route (login / access-denied / Layout)
    ├── styles/{tokens.css (copied), globals.css (tailwind + reset + .admin-skeleton)}
    ├── lib/{supabase.js (anon, auth only), adminApi.js (callAction wrapper + fetchUserRole/fetchDashboardMetrics/fetchUsers)}
    ├── components/ui/{Button, Badge, Card, Table}.jsx
    └── screens/                          # 12 screens (was 8 at Session-1 scaffold)
        ├── Login.jsx · AccessDenied.jsx · Layout.jsx   # auth shell + navy sidebar nav
        ├── Dashboard.jsx                 # KPI tiles + 30-day signups chart (Session 2)
        ├── Users.jsx                     # search/filter/paginate + UserDrawer (Session 3)
        ├── Subscriptions.jsx             # global activation + bulk trial extend + CSV (Session 4)
        ├── FeatureFlags.jsx              # Feature Registry + global flags + per-user overrides (Session 5 + Redesign S3/S4)
        ├── Announcements.jsx             # banner composer + history (Session 6)
        ├── QuestionBankAdmin.jsx         # v2.0 S4 — manage mbbs_universities + author seeded mbbs_university_questions
        ├── VivaAdmin.jsx                 # v2.0 S5 — viva verification queue → promote to verified pool; edit/delete verified
        ├── HolidayAdmin.jsx              # v2.0 S11 / R7 — CRUD for mbbs_gov_holidays (super_admin writes)
        └── Security.jsx                  # Auth & Security toggles (captcha/otp/email-verify/rate-limit) → app_settings key='auth_security'. SHIPPED-BUT-UNLOGGED: built + routed (App.jsx, Layout nav) with get_auth_security/update_auth_security endpoints, but predates a logged admin session (the Auth/Security "admin toggles never built" notes are stale for this screen)
```
Routes: `/login`, `/access-denied`, `/dashboard`, `/users`, `/subscriptions`, `/feature-flags`, `/announcements`, `/question-bank`, `/viva-bank`, `/holidays`, `/security` (`/` → `/dashboard`). Layout = navy 260px sidebar (collapses to a hamburger drawer < 1024px) + nav + user footer (avatar, name, role badge — navy for super_admin / blue for support, Sign out). **All 12 screens are real and shipped** (the old "Session-1 placeholder" note no longer applies — Dashboard/Users/Subscriptions/FeatureFlags/Announcements were built in Sessions 2–6; QuestionBankAdmin/VivaAdmin/HolidayAdmin/Security in the v2.0 + Redesign work).

**Run locally:** `cd studyrise-admin && npm install && npm run dev` (preview launch config name: `studyrise-admin`, port 5199). Build: `npm run build`. The serverless `/api/admin-actions` only runs on Vercel (no Vite dev proxy) — local dev shows the Login screen; full auth/data needs the deployed function. Vercel env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`.

- **Admin v2 Session 1 — Scaffold + Auth + Layout Shell (2026-06-13, `emp` branch)**: created the entire `studyrise-admin/` project from scratch (config, tokens, UI kit, auth flow, layout, 5 placeholder screens, serverless endpoint with role guard + `get_user_role`/placeholder `get_dashboard_metrics`/`get_users`). `npm run build` clean (401 KB JS / 114 KB gz). Login screen verified live in preview (renders, no console errors). Authenticated routes are build-verified only (OAuth + serverless can't run under Vite dev). Nothing in the main app (`AMC Tracker/`) touched.
- **Admin v2 — Email/password login added (2026-06-13, `emp` branch)**: `studyrise-admin/src/screens/Login.jsx` gains an email/password form (`supabase.auth.signInWithPassword`) ABOVE the existing Google button, separated by an "or" divider (email input → password input → navy "Sign in" submit). Independent loading states (`pwLoading` vs OAuth `loading`); validates non-empty fields; errors surface in the shared red banner. No backend/guard change — the password session flows through the same `onAuthStateChange` → `fetchUserRole` (`admin_role`) path as OAuth, so the access-denied/role logic is untouched. The admin user (`ias.ndc@gmail.com`) needs a password set in Supabase Auth for this path. `npm run build` clean (403 KB JS / 114 KB gz); login screen verified live in preview (both form + Google button render, no console errors).
- **Admin v2 Session 6 — Announcement Composer + `/admin` cleanup (2026-06-13, `emp` branch)**: **Part A/B — composer** (`studyrise-admin/src/screens/Announcements.jsx`, takes `role`): message textarea (500-char counter, red over-limit), audience radio (all / trial / free), type radio (info/warning/urgent with icons), live `BannerPreview` (**"Dismiss" button is display-only, non-functional**), Push (confirm modal showing the audience headcount from `fetchDashboardMetrics`), "Clear live banner", and a "Recent Announcements" list (last 5, each with Reuse → repopulates the form). API (`admin-actions.js`): `push_announcement` (admin OR support; validates text ≤500 + audience/type whitelists; writes app_settings `key='announcement'` = `{text,audience,type,pushed_at,pushed_by}` + prepends to `key='announcement_history'` capped at 20), `clear_announcement` (sets the announcement row value to null), `get_announcement_history`. `adminApi.js` gains `pushAnnouncement`/`clearAnnouncement`/`fetchAnnouncementHistory`. **Storage note**: the live banner is a SEPARATE app_settings row from the subscription row's `announcement` string (which is the unrelated Billing-page message) — no collision. **Part C — banner in main app**: NEW `src/components/AnnouncementBanner.jsx` (self-fetches app_settings `key='announcement'`; sticky top banner, type-colored via `--soft-blue/amber/red` + `--blue/amber/red-ink`; audience filter — `trial` → active-trial only, `free` → free/expired only, `all` → everyone; dismiss persists `localStorage:studyrise:dismissed_announcement:<pushed_at>` so a new push re-shows). Mounted in `App.jsx` as the first child of `<Layout>` with `subscription` prop. **Part D — `/admin` removal**: deleted `src/screens/Admin/AdminPanel.jsx` (dir now empty); removed the `/admin` route + `AdminPanel` lazy import from `App.jsx` (→ `/admin` now hits the `*` catch-all → redirect to `/`); removed the Admin nav link + unused `ShieldCheck`/`ADMIN_EMAIL` imports from `Sidebar.jsx`. **DEVIATION (documented):** `src/lib/adminApi.js` + `api/admin.js` were KEPT — still used by retained code: `isAdmin`/`ADMIN_EMAIL` (useSubscription, Settings, DangerZoneTab), and `getFlagStats`/`rolloutFlag`/`listAuditLog`/`resetUser`/`deleteUser` (the Settings admin tabs **Audit Log** + **Feature Flags** via `AuditLogViewer`/`FeatureFlagsPanel`, and DangerZoneTab). The prompt's "delete adminApi.js / api/admin.js" was not safe — it would break those retained tabs; the prompt itself says keep `isAdmin` if used elsewhere. Both `npm run build` clean. QA'd in the logged-in main-app preview (University test user): dashboard renders, `/admin` redirects to `/`, no Admin sidebar link, no new console errors, banner renders nothing with no announcement (correct default). Admin-app data path (push/clear) is post-deploy only (serverless can't run under Vite dev).
- **Admin v2 Session 5 — Feature Flags (global + per-user) (2026-06-13, `emp` branch)**: **Pre-session SQL** — `migrations/admin_002_feature_flags.sql` creates `user_feature_flags (id, user_id FK→auth.users CASCADE, flag_name, enabled, set_by, created_at, UNIQUE(user_id,flag_name))` + RLS "users read own flags" (run in Supabase SQL Editor). API (`admin-actions.js`): `GLOBAL_FLAGS` constant (subscription_activated / kanban_enabled / dark_mode_enabled / ai_advisor_enabled / usm_beta_enabled); `get_global_flags` (subscription_activated read from the `subscription` app_settings row's `activated`; the rest from a `key='feature_flags'` row); `update_global_flag` (super_admin; subscription_activated funnels through `updateSubscriptionSettings` so the ACTIVATE/DEACTIVATE confirm token still applies; other flags upsert the feature_flags row); `get_user_flags` / `set_user_flag` (upsert with `set_by`) / `remove_user_flag` (super_admin). `SUPER_ADMIN_ONLY` gains the three write actions. `adminApi.js` gains `fetchGlobalFlags`/`updateGlobalFlag`/`fetchUserFlags`/`setUserFlag`/`removeUserFlag`. `studyrise-admin/src/screens/FeatureFlags.jsx` FULL build (takes `role`): Section A global flags (toggle switches, subscription_activated → ACTIVATE/DEACTIVATE confirm modal), Section B per-user overrides (user search reusing `fetchUsers`, then a flag table across `OVERRIDE_FLAGS` = global keys + subscriptionGates GATES + uniGates Pro keys, each row showing global state + No override/Enabled/Disabled badge + Enable/Disable/Remove). `App.jsx` passes `role` to `<FeatureFlags>` + `<Announcements>`. **Main-app integration (Part C):** NEW `src/hooks/useUserFeatureFlags.js` — reads `user_feature_flags` for the current user (anon key + RLS), returns `{flags, hasFlag, hasOverride, loading, refetch}`; missing table → `{}` (no crash, tier behavior unchanged). **DEVIATION (documented):** named `useUserFeatureFlags` (NOT `useFeatureFlags`) because the main app already has a `useFeatureFlags.js` reading the legacy `feature_flags` table for the in-app dark-mode/demo panel (used in 5 files) — clobbering it would break dark mode. `uniGates.js` `configureGates`/`canUse` extended with an optional `userFlags` map: an override (`feature in userFlags`) wins over plan/tier/master-switch (enabled unlocks, disabled locks); omitting it leaves behavior unchanged (backward-compatible). `App.jsx` calls `useUserFeatureFlags(user?.id)` and passes `userFlags` into the existing `configureGates(...)` call. Both `npm run build` clean. QA'd in preview: dashboard + gates work even with the table absent (hook degrades to `{}`).
- **Admin v2 Session 4 — Subscription Controls + CSV Export (2026-06-13, `emp` branch)**: migrated the subscription management out of the main app's `/admin` AdminPanel into the standalone admin app, plus bulk trial extension and CSV export. **Schema note**: the global config lives in the main app's existing `app_settings` key/value table as ONE row — `key='subscription'`, `value` jsonb `{ activated, trial_days, announcement, updated_at, updated_by }` (the SAME row `useAppSettings` reads, so admin writes hit the live app immediately). The API speaks the storage shape (`activated`/`trial_days`), NOT the spec's flat column names. `studyrise-admin/api/admin-actions.js` adds 4 actions: `get_subscription_settings` (read, any admin — returns merged-over-defaults value), `update_subscription_settings` (super_admin; merges only present keys; **`activated` flips require a typed confirm token** — `'ACTIVATE'` to enable, `'DEACTIVATE'` to disable; validates trial_days 1–365; upsert onConflict 'key'), `bulk_extend_trials` (super_admin; fetches tier='trial' AND `trial_ends_at > now`, extends each by N days in 50-row chunks, returns `{count}`), `export_users_csv` (read; full `user_settings` join + `buildEmailMap` + `getLastActiveMap` → array of email/name/mode/exam_type/tier/trial_ends/pro_ends/created/last_active). `SUPER_ADMIN_ONLY` gains `update_subscription_settings`, `bulk_extend_trials`. `studyrise-admin/src/lib/adminApi.js` gains `fetchSubscriptionSettings`, `updateSubscriptionSettings(patch)`, `bulkExtendTrials(days)`, `fetchUsersForExport`. `studyrise-admin/src/screens/Subscriptions.jsx` FULL build (takes `role` prop; App.jsx passes it): **Section 1 global settings** (status dot green=Active/amber=Free-Preview, Enable/Disable button → inline `ConfirmModal` with typed ACTIVATE/DEACTIVATE word, trial-duration number + Save, announcement textarea + Save/Clear, last-updated stamp); **Section 2 bulk actions** (extend-all-active-trials days input + Extend All → confirm modal showing active-trial count, Download CSV button → client-side CSV build with quoted cells + `studyrise_users_YYYY-MM-DD.csv` download); **Section 3 overview** (tier-distribution bar Trial/Pro/Free + counts + total, sourced from `fetchDashboardMetrics`). Lightweight inline `ConfirmModal` (no Modal dep). **Role gating**: super_admin-only controls (toggle/trial-days/announcement/bulk-extend) disabled with "Requires super_admin" note for `support`; CSV export available to both. **Part C — main app cleanup** (`src/screens/Admin/AdminPanel.jsx`): removed the `SubSettingsTab` + `UserSubsTab` components, their two tab buttons, the two `effectiveTab` renders, and now-unused imports (`supabase`, `addDays`, `Modal`, `Button2`) + the `fmtDate` helper. Users + Audit Log tabs remain (screen kept, per spec). Both `npm run build` clean (admin 842 KB / 235 KB gz; main chunks unchanged). QA'd live in the authenticated preview: Subscriptions screen renders + error/Retry state works; full data path verified post-deploy (the preview proxies the deployed serverless, so the new actions only resolve once `studyrise-admin` redeploys).

- **Admin v2 Session 3 — User Management (2026-06-13, `emp` branch)**: **Pre-session SQL** — `ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS account_suspended BOOLEAN DEFAULT FALSE;` must be run in Supabase SQL Editor before suspend works. `api/admin-actions.js` FULL REWRITE adding 6 new actions: `get_users` (searches user_settings + builds email map from auth.users via `buildEmailMap(db)` paging 1000-user chunks; `getLastActiveMap(db, userIds)` max-dates from study_log ∪ study_sessions; applies mode/tier/suspended filter, in-memory sort+pagination because email+last_active are cross-table); `get_user_detail` (profile + subscription + parallel stat fetch — exam: tasks/SR/questionLogs/mockExams/studyDays; USM: units/assessments/classes + activeTerm name); `extend_trial` (`Math.max(Date.now(), existing_trial_ends_at)` base so always additive); `change_tier` (pro→+365d subscription_period_end, trial→+14d trial_ends_at, free→clears both); `suspend_user` (updates `account_suspended`, prevents self-suspension); `delete_user` (`auth.admin.deleteUser`, prevents self-deletion). `SUPER_ADMIN_ONLY = ['change_tier','suspend_user','delete_user']` gate runs after the general admin check. `studyrise-admin/src/lib/adminApi.js` gains 5 new exports: `fetchUserDetail`, `extendTrial`, `changeTier`, `suspendUser`, `deleteUser`. NEW `studyrise-admin/src/components/UserDrawer.jsx` — 400px max slide-in from right with backdrop; profile header (Avatar initials with deterministic color, name/email/tier badge/suspended badge/admin-role badge), account section (joined/last-active/phone/mode/exam), subscription section (plan/status/trial-ends/pro-until), study stats section (exam: tasks done/total, SR, questionLogs, mocks, studyDays; USM: units/assessments/classes/activeTerm), user-id copy button; actions footer: extend-trial (+7/+14/+30d, support + super_admin), change-plan (Pro/Trial/Free chips, super_admin only), suspend/unsuspend (super_admin only), delete with "DELETE" text confirm (super_admin only); action success/error flash banners; Escape-to-close. `studyrise-admin/src/screens/Users.jsx` FULL REWRITE: search input (300ms debounce, by name or email), 9 filter chips (All/Exam Mode/University/MBBS/Trial/Pro/Free/Expired/Suspended), sortable Table (User with AvatarInitial+name+email, Plan badge, Mode, Joined, Last active, Status), pagination (25/page with ChevronLeft/Right), click row → `UserDrawer`; refresh button; `role` prop gates super_admin-only actions in drawer. `studyrise-admin/src/App.jsx` — `<Users role={role} />` (passes caller's admin_role). **Suspend guard in main app** (`src/App.jsx`): `suspendGuardRef` + `useEffect` checks `settings.account_suspended === true` after settings load → calls `toast.error(…, 10000)` + `signOut()` (uses existing `useToastContext` + `signOut` from `useAuth`). Both `npm run build` clean (admin: 830 KB / 232 KB gz; main: unchanged chunk sizes).

- **Feature Flag Disconnects + Admin Panel QA (2026-06-14, `main`)**: Three fixes wiring the admin panel's feature-flag controls to the main app, plus three admin panel QA bugs. **Fix 1 — `useAppSettings` parallel fetch**: `src/hooks/useAppSettings.js` now runs `Promise.all` for BOTH `key='subscription'` and `key='feature_flags'` rows, exposing `globalFeatureFlags` in its return value (was only returning `appSettings`; callers that didn't destructure `globalFeatureFlags` are unaffected). **Fix 2 — Dark mode three-priority chain** (`src/App.jsx`): `isDark` now resolves in priority order: (1) `userFlags['dark_mode_enabled']` (per-user admin override via `user_feature_flags` table) → (2) `globalFeatureFlags.dark_mode_enabled !== false` (global admin kill-switch via `app_settings key='feature_flags'`) → (3) `!!flags.darkMode` (user's own in-app toggle). Before: only (3) was checked, so admin overrides were silently ignored. **Fix 3 — AIAdvisor gate** (`src/screens/Dashboard.jsx`): `useAppSettings()` destructuring gains `globalFeatureFlags`; `aiAdvisorEnabled = globalFeatureFlags.ai_advisor_enabled !== false` (default true when row absent); the `<AIAdvisor>` render is wrapped in `{aiAdvisorEnabled && …}`. **Admin Bug 1 — pagination field name** (`studyrise-admin/src/screens/Users.jsx`): all 3 `fetchUsers` call sites sent `pageSize: PAGE_SIZE` but `admin-actions.js getUsers()` destructures `perPage` — changed with `replace_all` to `perPage: PAGE_SIZE`. **Admin Bug 2 — hardcoded trial duration** (`studyrise-admin/api/admin-actions.js changeTier`): `trial` branch was hardcoded to 14 days; now calls `getSubscriptionSettings(db)` and uses `trial_days ?? 14`. **Admin Bug 3 — trialDays string type** (`studyrise-admin/src/screens/Subscriptions.jsx`): `setTrialDays(e.target.value)` → `setTrialDays(Number(e.target.value) || 14)` so the numeric input stores a number, not a string. Both `npm run build` clean. App renders correctly (UniDashboard verified in preview).

- **Admin v2 Session 2 — Metrics Dashboard (2026-06-13, `emp` branch)**: real `/dashboard` home screen. `api/admin-actions.js` `get_dashboard_metrics` now implemented (`getDashboardMetrics(serviceClient)` helper, all queries via the service-role client): 4 core KPIs (total users = `user_settings` count · active today = distinct `user_id` across `study_log` ∪ `study_sessions` where `date = today` · active this week = same, `date ≥ 7d ago` · new this week = `user_settings.created_at ≥ 7d ago`), 4 subscription KPIs (trials active = tier 'trial' AND `trial_ends_at > now` · trials expiring 7d = trial AND `trial_ends_at` ∈ [now, now+7d] · pro = tier 'pro' · free/expired = tier 'free' + expired trials [trial AND `trial_ends_at < now`]), mode split (exam = `app_mode = 'exam'` OR NULL · USM = `app_mode = 'university'`), top-5 exam types (group `exam_type` in JS, NULL → 'unset'), and 30-day signups (`created_at` bucketed by UTC date, zero-filled). Counts use `{count:'exact',head:true}`; active-user dedup uses a `Set` over fetched `user_id`s; the free/expired OR is split into two additive counts (no `.or()` timestamp-parsing risk); `app_mode` OR-null uses `.or('app_mode.eq.exam,app_mode.is.null')`; timestamps in filters strip milliseconds. Returns one flat `metrics` object (+ `generatedAt`). `adminApi.fetchDashboardMetrics()` unchanged (already returned `metrics`). New `studyrise-admin/src/components/KPITile.jsx` (icon-in-soft-circle + 28px mono value + label/sub, 7 color keys → soft-bg/ink token pairs). `Dashboard.jsx` rebuilt: 2 KPI rows (`grid-cols-2 lg:grid-cols-4`), mode-split row (2 cards — two-segment app-mode bar + horizontal exam-type bars), full-width **recharts** `BarChart` "Signups — Last 30 Days" (`var(--blue)` bars, custom tooltip, `d/M` ticks every 5th day); `.admin-skeleton` pulse loading tiles, error state with Retry, 60s auto-refresh + live "Last updated: Xs ago". Added **recharts ^2.15** dependency (`npm install` run). `npm run build` clean (810 KB JS / 228 KB gz — recharts bulk; chunk-size warning only, not an error). Dashboard data path is build-verified only (serverless + OAuth can't run under Vite dev — same constraint as Session 1). Nothing in `AMC Tracker/` touched.

### Government Holidays Management
`studyrise-admin/src/screens/HolidayAdmin.jsx` — full CRUD for `mbbs_gov_holidays` (the DB table from `migrations/mbbs_010_holidays.sql`). `HolidayForm` (date/name/year inputs; year auto-fills from date). `ConfirmModal` for all deletes. Year-filter tabs when multiple years of holidays are present. All write actions (add/update/delete) gated on `isSuperAdmin = role === 'super_admin'` — support accounts see the list read-only. Success/error toasts on every action. API actions: `get_gov_holidays` (read, any admin), `add_gov_holiday` / `update_gov_holiday` / `delete_gov_holiday` (super_admin; in `SUPER_ADMIN_ONLY`). `adminApi.js` wrappers: `fetchGovHolidays()` / `addGovHoliday()` / `updateGovHoliday()` / `deleteGovHoliday()`. `Layout.jsx` nav + `App.jsx` route `/holidays` wired. RLS on `mbbs_gov_holidays` allows SELECT for all authenticated users; no INSERT/UPDATE/DELETE policy — only the service role (used by the admin endpoint) can write.

### MBBS User Drawer Stats
When `UserDrawer` opens a user whose `app_mode = 'mbbs_bd'`, the study stats section shows MBBS-specific data fetched via `get_user_detail`:
- **Programme**: phase label (e.g. "1st Professional"), college, university, prof window (month + year)
- **Subjects enrolled**: count of `mbbs_subjects` rows
- **Attendance status**: worst class-type percentage across all `mbbs_attendance` rows for that user (the gate-binding value matching R2's `subjectHeadlinePct` logic)
- **Formative standing**: weighted average across `mbbs_formatives` (or term-gate standing for 1st Prof when `mbbs_term_results` exist)
- **Items cleared / total**: `count(status='cleared')` vs `count(*)` in `mbbs_items`
- **Cards complete**: `count(status='complete' OR status='exam_passed')` in `mbbs_cards`
- **SR records**: count of `mbbs_sr_records` rows
- **Study log entries**: count of `mbbs_study_log` rows
- **Eligibility verdict**: `eligible` / `at_risk` / `not_eligible` derived from `computeEligibility` called server-side with the fetched data

### Admin — Known Gaps (Not Yet Built)
The following admin features are registered/planned but have no admin UI yet:
1. **Auth security toggles** (`captcha_enabled`, `otp_required`, `email_verification_required`, `rate_limit_*`): the `auth_security` row in `app_settings` must be flipped manually via Supabase SQL until the admin panel toggle ships (per Auth/Security Session 2 spec — never built).
2. **MBBS eligibility distribution on Dashboard**: the `/dashboard` metrics screen has no MBBS-mode breakdown (exam/USM split is present; MBBS is counted under mode = 'mbbs_bd' but not surfaced as its own KPI tile or chart).
3. **MBBS onboarding review**: no admin surface for reviewing or correcting what students entered during MBBS onboarding (phase / subjects / term structure).
4. **Announcement audience for MBBS users**: `AnnouncementBanner.jsx` audience filter handles `'all'` / `'trial'` / `'free'` — there is no `'mbbs'` audience targeting. MBBS users see `'all'` announcements; targeted MBBS-only messages require a manual workaround.

### Admin API Actions Reference
All actions POST to `studyrise-admin/api/admin-actions.js` as `{ action, payload }` with an `Authorization: Bearer <jwt>` header. The endpoint verifies the JWT, reads the caller's `admin_role`, and rejects NULL with 403. `get_user_role` is the only action any authenticated user may call (own id only).

| Action | Description | Min Role |
|---|---|---|
| `get_dashboard_metrics` | All 12 KPI values + signups chart data | support |
| `get_users` | Paginated/filtered user list (mode/tier/suspended) | support |
| `get_user_detail` | Full profile + subscription + mode-specific stats | support |
| `extend_trial` | Add N days to one user's trial (additive) | support |
| `change_tier` | Set free / trial / pro for one user | super_admin |
| `suspend_user` | Toggle `account_suspended` (no self-suspension) | super_admin |
| `delete_user` | Delete from auth.users + cascade (no self-delete) | super_admin |
| `get_subscription_settings` | Read `app_settings key='subscription'` global config | support |
| `update_subscription_settings` | Write global config (ACTIVATE/DEACTIVATE token required for `activated` flip) | super_admin |
| `bulk_extend_trials` | Extend ALL active trial users by N days (50-row chunks) | super_admin |
| `export_users_csv` | Full user list array for CSV generation | support |
| `push_announcement` | Write `app_settings key='announcement'` + history (text ≤500 + audience/type) | support |
| `clear_announcement` | Set announcement row value to null | support |
| `get_announcement_history` | Read `app_settings key='announcement_history'` (last 20) | support |
| `get_global_flags` | Read legacy global flags from `app_settings key='feature_flags'` | support |
| `update_global_flag` | Toggle a legacy global flag (subscription_activated uses ACTIVATE/DEACTIVATE confirm) | super_admin |
| `get_user_flags` | Read `user_feature_flags` rows for one user | support |
| `set_user_flag` | Upsert per-user override in `user_feature_flags` | super_admin |
| `remove_user_flag` | Delete per-user override from `user_feature_flags` | super_admin |
| `get_feature_registry` | Read all rows from `app_feature_flags` | support |
| `update_feature_flag` | Toggle `enabled` or change `tier` (floor rows blocked by DB trigger) | super_admin |
| `get_gov_holidays` | Read all `mbbs_gov_holidays` rows | support |
| `add_gov_holiday` | Insert into `mbbs_gov_holidays` | super_admin |
| `update_gov_holiday` | Update a `mbbs_gov_holidays` row | super_admin |
| `delete_gov_holiday` | Delete from `mbbs_gov_holidays` | super_admin |
| `get_qb_data` | Read MBBS universities + seeded questions | support |
| `qb_create/update/delete_university` | Manage `mbbs_universities` rows | super_admin |
| `qb_create/update/delete_question` | Manage `mbbs_university_questions` rows | super_admin |
| `get_viva_data` | Read promote-requested queue + verified pool | support |
| `viva_promote_question` | Move a user-submitted viva Q to the verified pool (carries origin) | super_admin |
| `viva_update_verified` | Edit a row in `mbbs_viva_questions_verified` | super_admin |
| `viva_delete_verified` | Delete from `mbbs_viva_questions_verified` | super_admin |

### Admin → Main App Integration Points

| Admin action | Main app effect |
|---|---|
| Suspend user | `account_suspended = true` → `App.jsx` `suspendGuardRef` useEffect signs the user out on next load with a 10s error toast |
| Push announcement | `app_settings.announcement` populated → `AnnouncementBanner.jsx` shows a sticky top banner filtered by audience (`all`/`trial`/`free`) and type-colored; dismiss persists to `localStorage:studyrise:dismissed_announcement:<pushed_at>` so a new push re-shows |
| Toggle `subscription_activated` | All gates in `subscriptionGates.js` / `uniGates.js` enforce or lift; `canUse(feature)` flips from always-true (free-preview) to tier-based on next load |
| Toggle feature registry flag (`app_feature_flags`) | `useFeatureRegistry` hook returns updated state on next load; MBBS route guards hide/show nav items and routes; `ProGate` wrappers lock/unlock Pro sub-features |
| Set per-user flag override (`user_feature_flags`) | `useUserFeatureFlags(user.id)` hook returns the override → passed into `configureGates({ userFlags })` → wins over plan/tier/master-switch for that user only |
| Extend trial / change tier | `subscription_tier` + `trial_ends_at` / `subscription_period_end` updated in `user_settings` → `useSubscription` re-evaluates gates on next load |

---

## How To Run Locally

```bash
cd "AMC Tracker"
npm install
npm run dev          # Starts at http://localhost:5173
```

For AI advisor to work locally, the Vite dev server needs to proxy `/api/` -- currently no proxy configured in vite.config.js, so AI advisor only works on Vercel deployment.

## How To Deploy

> See [`docs/deployment/deployment-architecture.md`](docs/deployment/deployment-architecture.md) for the full deployment reference.

### Main student app

```bash
# From repo root:
npm run build        # verify build passes locally
npx vercel --prod --yes    # deploys to studyrise.app (reads /.vercel/project.json)
```

### Admin panel

```bash
# From repo root — explicit project IDs are required:
VERCEL_PROJECT_ID=prj_IDGEh1AkamPQhb654NdaDHXyrBc6 \
VERCEL_ORG_ID=team_V8AGP149vmOLOfxBVLXUf6a4 \
npx vercel --prod --yes
```

Do NOT use `cd studyrise-admin && npx vercel --prod` — the Vercel cloud project has `rootDirectory: studyrise-admin` set, which causes a double-nesting build failure when deploying from inside that directory.

### Key env vars (both apps — set in Vercel project settings)

- `OPENAI_API_KEY` — AI Study Advisor (main app only, **never `VITE_`**)
- `SUPABASE_SERVICE_ROLE_KEY` — bypasses RLS; present in BOTH Vercel projects (**never `VITE_`**)
- `RECAPTCHA_SECRET_KEY`, `OTP_HASH_SALT` — main app serverless functions (**never `VITE_`**)

**Branch strategy (2026-06-15 onwards — single branch):**
- `main` is the only active branch. All development goes here.
- `emp` and `USM` were merged 2026-06-13; `mbbs` was merged 2026-06-15. All stale branches deleted.
- Pushing to `main` auto-deploys **both** Vercel projects simultaneously.
- Never commit directly breaking changes to `main` — it auto-deploys to https://studyrise.app (real users).

## Supabase Setup

Run these SQL files in Supabase SQL Editor in order:

1. `supabase/full_schema.sql` — Creates all 12+ tables with RLS policies and triggers
2. `supabase/add_sr_questions_columns.sql` — Adds sr1/sr2/sr3_questions to sr_records
3. `supabase/add_schedule_columns.sql` — Adds prayer_times, cdpath_schedule, gym_schedule to user_settings
4. `supabase/ai_advisor_function.sql` — Creates get_ai_advisor_data RPC function
5. `supabase/examos_migration_01.sql` — Adds exam_type, onboarding_complete, exam_display_name to user_settings; adds task_steps, topics, exam_import_logs tables
6. `supabase/app_settings_migration.sql` — Creates app_settings table for global subscription config (Session 10)

Note: `schema.sql` and `customization_migration.sql` are legacy files superseded by `full_schema.sql`.

Also run the registration/subscription column migration in Supabase SQL Editor:
```sql
ALTER TABLE user_settings
  ADD COLUMN IF NOT EXISTS display_name        TEXT,
  ADD COLUMN IF NOT EXISTS phone_number        TEXT,
  ADD COLUMN IF NOT EXISTS phone_verified      BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS avatar_url          TEXT,
  ADD COLUMN IF NOT EXISTS subscription_tier       TEXT DEFAULT 'trial',
  ADD COLUMN IF NOT EXISTS subscription_status     TEXT DEFAULT 'trialing',
  ADD COLUMN IF NOT EXISTS trial_ends_at           TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS subscription_period_end TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS subscription_activated  BOOLEAN DEFAULT FALSE;
```

Create the avatars storage bucket (public read, authenticated write) — see Session 1 in `REGISTRATION_SUBSCRIPTION_PLAN.md` for the full SQL.

Ensure email confirmation is disabled in Supabase Auth settings for immediate login after signup (or the signup flow will require email verification).

## Animation System (Framer Motion)

All Framer Motion variants are defined centrally in `src/lib/animations.js`. **Never write one-off inline animation objects** — always import the matching variant.

### How to animate a new component

```jsx
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, cardHover } from '../lib/animations'

function MyComponent() {
  const reduced = useReducedMotion()
  return (
    <motion.div
      variants={reduced ? {} : fadeUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      …
    </motion.div>
  )
}
```

### Variant catalogue

| Import | Use case |
|--------|----------|
| `fadeUp` | Full screens, major sections, page-level reveals |
| `fade` | Overlays, tooltips, anything where vertical drift is wrong |
| `scaleIn` | Cards, dropdowns, action menus — pop into view |
| `fadeLeft` | Sidebar nav items, list entries sliding from left |
| `slideFromRight` | Right-edge panels (use via `drawerSlide`) |
| `slideFromBottom` | Mobile bottom sheets (use via `drawerSlide`) |
| `drawerSlide(isMobile)` | TaskDrawer, side panels — auto-picks direction |
| `backdrop` | Scrim/overlay behind any drawer or modal |
| `stagger` | Parent container to stagger list children (0.04s apart) |
| `staggerTight` | Dense lists (task rows, SR hits) — 0.025s stagger |
| `kanbanBoard` | Kanban container (staggers columns at 0.06s) |
| `kanbanColumn` | Individual kanban column — use as child of `kanbanBoard` |
| `cardHover` | Spread `{...cardHover}` on interactive cards for lift + shadow |
| `btnPress` | Spread `{...btnPress}` on buttons for tap scale |
| `rowHover` | Spread `{...rowHover}` on nav/table rows (x nudge, no lift) |
| `pulseDot` | Spread `{...pulseDot}` on overdue/active status dots |
| `completionFlash(reduced)` | Green flash on task complete — spread result as props |
| `sidebarEntry` | Sidebar wrapper slide-in from left |
| `sidebarActiveBg` | Sidebar active indicator (use with `layoutId`) |
| `expandY` | Accordion expand/collapse (height: 0 → auto) |
| `toast` | Toast notifications entering from top-right |

### Rules

1. **Always call `useReducedMotion()`** and pass `{}` as variants when true — motion must be off-able.
2. **Keep durations short**: entrance ≤ 0.25s, exit ≤ 0.18s, layout ≤ 0.2s.
3. **Use spring for interactive** (drag, `cardHover`, `btnPress`); use `ease` for page-level transitions.
4. **Exits mirror entries**: reverse y/scale direction; never linger longer than the entrance.
5. **Stagger via parent**: add `stagger` to the container; children use individual variants (e.g. `fadeLeft`). Never set `delay` manually per-child.
6. **List items need `layout` + `AnimatePresence`**: add `layout` to each item so reorders animate; wrap the list with `<AnimatePresence>` so removals animate out.
7. **Never hardcode hex in animations** — always reference CSS vars (e.g. `'var(--soft-green)'`).
8. **No one-off `animate={}` on interactive elements** — use `whileHover` / `whileTap` from the variants instead.
9. **Add new variants to `animations.js`** — don't scatter them in component files.

---

## Important Conventions

- **DOCS_MAP RULE:** After any task that adds, deletes, moves, or renames a file in `docs/`, update `docs/DOCS_MAP.md` before committing. Update the Tree (file + line count), Folder Summaries if the folder changed, and Biggest Files table if the file is over 300 lines. Never commit a `docs/` change without updating `DOCS_MAP.md` in the same commit.
- **No CSS modules** — all styling is Tailwind utility classes or inline styles
- **CSS custom properties** (`var(--navy)`, `var(--ink)`, etc.) defined in `src/styles/tokens.css` — imported first in `main.jsx`. All screens and components can use these vars in inline styles. Do NOT redeclare a `:root` block in `globals.css`. Dark mode overrides live in `:root.dark { … }` at the bottom of `tokens.css`.
- **Dark mode pattern**: Use CSS vars (`var(--ink)`, `var(--surface)`, etc.) in inline styles — they flip automatically when `.dark` is on `<html>`. For Tailwind utility classes, add corresponding `.dark .class-name { !important }` rules in `globals.css` (Tailwind compiles token classes to hardcoded hex at build time so vars don't reach them). Also add `.dark .hover\:class-name:hover` rules for hover variants. Avoid hardcoded hex colors in new components — use CSS vars or token classes.
- **Design tokens in Tailwind**: Colors, fonts, sizes, shadows, radii defined in `tailwind.config.js`. Use token classes (e.g. `text-ink`, `bg-surface`, `border-border`, `text-ink-4`, `bg-soft-blue`, `text-blue-ink`, `rounded-token`, `shadow-sm`, `text-body`, `text-h1`, `font-mono text-data`) instead of hardcoded hex values.
- **Chart styling**: All Recharts styling imports from `src/lib/chartTheme.js` — never hardcode chart colours/axes in components (Brand Kit §8). Use `CHART_COLORS` + the shared axis/grid theme it exports.
- **Inline styles with CSS vars**: Preferred for new screen-level layout work (e.g. `style={{ background: 'var(--navy)', color: 'var(--ink)' }}`). Tailwind classes preferred for spacing, typography, responsive utilities.
- **Color palette** (via Tailwind tokens + CSS vars): `bg`/`surface`/`ink` (grays), `navy` (#0F2744), `brand-blue`/`brand-green`/`brand-amber`/`brand-red`/`brand-purple`, `soft-blue`/`soft-green`/`soft-amber`/`soft-red`/`soft-purple` (tinted backgrounds), `blue-ink`/`green-ink`/`amber-ink`/`red-ink`/`purple-ink` (dark text on soft backgrounds), `border`
- **Font families**: `font-serif` (Newsreader) for headings/dates, `font-sans` (IBM Plex Sans) for body/labels, `font-mono` (IBM Plex Mono) for numbers/times. Loaded from Google Fonts in `app.html`.
- **Font sizes** (token): `text-display` (42px), `text-h1` (24px), `text-h2` (15px), `text-body` (13px), `text-caption` (11px), `text-label` (11px, wider tracking), `text-data` (26px)
- **Border radius** (token): `rounded-sm-token` (8px), `rounded-token` (12px), `rounded-lg-token` (16px), `rounded-xl-token` (20px), `rounded-card` (16px), `rounded-pill` (999px)
- **Component library**: Use `src/components/ui/` components (Card2, Button2, Badge2, Bar, Ring, Tabs2, KPITile, SectionHeader, etc.) for new UI work. Old `src/components/Common/` kept for Modal and backward compat.
- **Component pattern**: Screens in `src/screens/`, reusable components in `src/components/`, hooks in `src/hooks/`, utilities in `src/lib/`
- **Data flow**: App.jsx fetches all data via hooks, passes as props to screens. Settings.jsx fetches its own data internally.
- **Supabase pattern**: Each hook handles its own CRUD with `user_id` filtering. All tables use RLS.
- **Fallback constants**: `src/lib/constants.js` has hardcoded 77 tasks and 18 subjects as fallback when DB is empty
- **Debounce**: Block saves use 500ms debounce to avoid excessive Supabase writes
- **LocalStorage keys**: `amc_timer_state` (timer), `amc_timer_sound` (mute), `amc_ai_advisor_cache` (AI cache)
- **Responsive breakpoints**: Mobile-first. `lg:` (1024px) for multi-column grids. Screen wrappers use `w-full` (NOT `max-w-[1200px]` — that caused right-side whitespace on wide monitors).
- **Layout shell**: `100vw/100vh` flex shell in `Layout.jsx`. Navy sidebar (240px) hidden on mobile. Main content: white, `flex-1`, `overflowY: auto`. Bottom tab bar adds `pb-[72px]` on mobile.

---

## Build Log

### Doc discrepancy cleanup (2026-06-20, `main`)
Resolved all 31 findings in `docs/_audit/DOC_DISCREPANCY_REPORT.md` (+ the 2 INFO entries reviewed): **30 fixed** (doc edits across 5 docs + **5 code-file edits** — several findings touched both), **1 no-action by design** (F4-6, the 4 future-screen flags — same pattern as `mbbs.ospe`), and the **2 INFO** findings (honours ≥75%, Phase-1 lockout) reviewed → already consistent, no change. Full per-finding table in `docs/_audit/DOC_DISCREPANCY_RESOLUTION.md`. Surgical doc/comment changes only; no source file deleted, nothing wired up, Exam/USM byte-unaffected; `npm run build` clean.
- **Five Phase-1 verdicts:** `LandingPage.jsx` / `AIPlanChat.jsx` / `PlanPreview.jsx` = **orphans** (zero import sites — documented in the new "Orphaned / unimported source files" list + the §Onboarding "Old screens" list, NOT deleted). `useStepsForTask.js` = the **canonical active** per-task steps hook (TaskDrawer/TaskDetailDrawer/TaskChecklist); `useTaskSteps.js` stays live only for its `DEFAULT_STEPS` export (consumed by `services/TaskService`; its hook fn is unused) — both now documented with distinct purposes. `studyrise-admin/src/screens/Security.jsx` = **shipped-but-unlogged** (routed in admin `App.jsx`, in Layout nav, with `get_auth_security`/`update_auth_security` endpoints + `adminApi` wrappers) — added to the admin structure block; the Auth/Security "admin toggles never built" notes are stale for this screen.
- **Code fixes (5):** appended idempotent orphan-flag cleanup to `migrations/core_feature_flags.sql` (`DELETE` of `mbbs.mocks`, `mbbs.mistakes`, `mbbs.viva` — confirmed zero `canUse`/`ProGate`/`isEnabled` consumers); removed orphan `GATE_COPY['mbbs.viva']` from `src/lib/uniGates.js`; inline reserved/no-consumer comments on `mbbs.analytics_full` / `mbbs.mistakes_full` / `mbbs.review_full` in `src/lib/mbbsFeatures.js`; added the WARNING header to `migrations/mbbs_R03_term_unique.sql` (the single non-additive migration — one-time de-dup `DELETE`); created `src/components/mbbs/index.js` barrel (`GradeBadge`/`NextExamsWidget`/`ContextualQuestionPanel` — all default exports, additive, no existing barrel import was broken).
- **Doc fixes:** routes/screens (`/mistakes` gate note, FAB `/admin` removals, `03` nav-row ✅ KEEP, `/mbbs/review-sheet` nav, field-placements contextual note); the full `src/lib/services/` layer + 5 hooks + 9 libs + 11 prose-only hooks + 6 prose-only libs added to the project-structure tree; `chartTheme.js` Conventions rule; migration docs (`mbbs_R03_term_unique` documented + Rules exception; deferred `mbbs_R03_postings`→`R04`…`R07`→`R08` rename; removed the false "003 dropped `mbbs_question_logs`" claim in `04`/`07`/FEATURES.md; R7 `kind` enum `departmental` removed; FEATURES.md migration scope note + RUN/Run-manually legend); admin structure block 8→12 screens; `POST /api/log-failed-login` added to API Routes; `OnboardingShell.jsx` added to the tree.
- **Added a top-of-file Current State block** (overwritable living snapshot, above all durable content). F4-6 + the two INFO findings (honours ≥75%, Phase-1 lockout) reviewed → no action (consistent / by-design, same pattern as `mbbs.ospe`).
