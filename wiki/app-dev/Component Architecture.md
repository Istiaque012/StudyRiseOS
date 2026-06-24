---
title: Component Architecture
type: app-dev
sources: [raw/app-dev-sources/StudyRise-CLAUDE-md-2026-06-24.md]
created: 2026-06-25
updated: 2026-06-25
---

# Component Architecture

Source tree organized by feature domain. Entry: `src/main.jsx` → `App.jsx` (auth, routing, data fetching).

## Screens (`src/screens/`)

### Shared / Exam Mode
- `Auth.jsx` — Login / Register
- `Dashboard.jsx` — Main exam dashboard (readiness projection, Go/No-Go)
- `Today.jsx` — Daily study view + DayPlanner
- `Plan.jsx` — Study plan (list/timeline/sprint/kanban views)
- `SRModule.jsx` — Spaced repetition
- `Analytics.jsx` — 13+ exam charts
- `ReviewSheet.jsx` — Printable rapid-review sheet
- `ExamReport.jsx` — Printable progress report (8 sections)
- `Settings.jsx` — All settings tabs

### University Mode (`src/screens/uni/`)
- `UniDashboard.jsx` — Semester at a glance (KPI row, deadline strip, heavy-week radar)
- `UniToday.jsx` — Daily cockpit (classes timeline, focus card, DayPlanner)
- `SemesterPlan.jsx` — List/timeline/kanban views with filter bar
- `Grades.jsx` — Grade tracker, "What do I need?", what-if simulator, GPA/WAM
- `Timetable.jsx` — Weekly grid (desktop) / day agenda (mobile)
- `UniAnalytics.jsx` — 7-chart suite (3 free / 4 Pro)
- `GradeReport.jsx` — Printable transcript
- `UnitDetail.jsx` — Per-unit deep view

### MBBS Mode (`src/screens/mbbs/`)
See [[MBBS Bangladesh Module]] for screen details.

### Onboarding (`src/screens/Onboarding/`)
- `ModeSelect.jsx` — Step 0: Exam Prep / University / MBBS fork
- `OnboardingFlow.jsx` — 4-step exam wizard
- `UniOnboarding.jsx` — 6-step university wizard
- MBBS onboarding via BMDC-seeded flow

## Components (`src/components/`)

### Design System (`ui/`)
Card2, Button2, Badge2, Bar, Ring, Tabs2, Toggle, Field, KPITile, SectionHeader, EmptyState, LoadingState.

### University (`uni/`)
IcalImportPanel, AssessmentDrawer, PlannerTray, PlanningFallacyChip, AddAssessmentModal, ClassFormModal, SemesterListView, SemesterTimeline, SemesterKanban, SemesterFilterBar, ProGate, QuickAddFab, WhatDoINeedCard, WhatIfSimulator, GpaPanel, SemesterWrapped.

### Exam (`Charts/`, `SR/`, `DayPlanner/`, `Timer/`)
6 chart components (area, forgetting curves, retention map, donut, timeline, heatmap). SR review modal + subject card. DayPlanner with drag-drop. Pomodoro timer.

### Settings (`Settings/uni/`)
TermSetupTab, UnitsTab, GradingTab, TimetableTab, LmsSyncTab, NotificationsTab, UniImportExportTab, UniDangerZoneTab, PlanningControlCard.

## Hooks (`src/hooks/`)

~35 hooks total. Key patterns:
- **USM CRUD hooks**: useAssessments, useClasses, useTerms, useUnits, useAttendance, useStudySessions, usePlannedSessions
- **Exam CRUD hooks**: useTasks, useSubjects, usePhases, useSRRecords, useMockExams, useQuestionLogs, useMistakeLogs
- **Shared**: useAuth, useSubscription, useFeatureRegistry, useTheme, useUserSettings, useAppSettings

## Lib (`src/lib/`)

Pure logic, no React:
- **Mode**: `appMode.js` — single derivation point
- **Exam engines**: `scheduler.js`, `studyUtils.js`, `calculations.js`, `examRevisionPlanner.js`, `qbankProgress.js`
- **USM engines**: `gradeEngine.js`, `uniPlanner.js`, `uniPriority.js`, `bunchingRadar.js`, `planningFallacy.js`
- **Shared**: `gradeScales.js` (6 scales), `chartTheme.js`, `dateUtils.js`
- **Services**: TaskService, TaskCompletionService, SRService, StudyLogService (DB + orchestration layer)
- **MBBS**: `mbbs/` subfolder (see [[MBBS Bangladesh Module]])

## Orphan Files (documented, not deleted)

- `src/screens/LandingPage.jsx` — superseded by LandingPageStatic
- `src/screens/Onboarding/AIPlanChat.jsx` — abandoned draft
- `src/screens/Onboarding/PlanPreview.jsx` — orphaned

## Related Pages

- [[Unified App Architecture]] — system overview
- [[App Features Spec]] — feature-level spec
- [[MBBS Bangladesh Module]] — MBBS screens and components
