# Session 1 Audit — Routes, Screens & Nav Constants
Generated: 2026-06-20
Source of truth: code. Docs audited: CLAUDE.md · docs/mbbs/03_MBBS_CURRENT_STATE.md · docs/mbbs/07_MBBS_BUILD_LOG.md · docs/planning/FEATURES.md

---

## Reference: Routes on Disk (App.jsx)

### Exam routes (src/App.jsx:529–540)
| Path | Component |
|---|---|
| `/` | Dashboard |
| `/today` | Today |
| `/plan` | Plan |
| `/sr` | SRModule |
| `/analytics` | Analytics |
| `/questions` | Questions |
| `/mistakes` | Mistakes — **feature-gated**: `isFeatureEnabled('exam.mistake_log')` (line 535) |
| `/mocks` | MockExams |
| `/history` | History |
| `/review-sheet` | ReviewSheet |
| `/report` | ExamReport |
| `/settings` | Settings |

### USM routes (App.jsx:545–553)
`/` · `/today` · `/semester` · `/semester/unit/:id` · `/grades` · `/grades/report` · `/timetable` · `/analytics` · `/settings`

### MBBS routes (App.jsx:561–592, via mbbsRouteDefs array filtered by isFeatureEnabled)
`/mbbs` · `/mbbs/items` · `/mbbs/attendance` · `/mbbs/formatives` · `/mbbs/timetable` · `/mbbs/today` · `/mbbs/review` · `/mbbs/card-exams` · `/mbbs/review-sheet` · `/mbbs/questions` · `/mbbs/questions-bank` · `/mbbs/viva` · `/mbbs/analytics` · `/mbbs/exam-schedule` · `/mbbs/exam-prep` · `/mbbs/supplementary` · `/mbbs/integrated-teaching` · `/mbbs/field-placements` · `/settings`

### Shared routes (App.jsx:652–668)
`/profile` · `/privacy` · `/terms` · `/reset-password` · `*` → Navigate to `/`

### Confirmed absent (correctly removed)
- `/admin` — removed Admin v2 S6 ✓
- `/mbbs/mistakes` — removed Redesign S0 ✓
- `/mbbs/mocks` — removed Redesign S0 ✓

---

## Findings

### [MED] `/mistakes` is feature-gated in code; docs show it as always-present

- Doc says: `| /mistakes | Mistakes | AlertTriangle |` (plain row, no flag note) — `docs/planning/FEATURES.md` §"Exam Mode route table" (line 26)
- Code shows: `{isFeatureEnabled('exam.mistake_log') && <Route path="/mistakes" .../>}` — `src/App.jsx:535`; same gating in `Sidebar.jsx:215` and `BottomTabBar.jsx:79`
- Verdict: doc-is-stale
- Suggested action: Add a note to the FEATURES.md route table row for `/mistakes` that it is gated behind `exam.mistake_log` (free, enabled by default per `migrations/core_feature_flags.sql:207`).

---

### [LOW] LogSessionFab documented as "hidden on … Admin" — `/admin` was removed

- Doc says: "A **floating action button (LogSessionFab)** appears … hidden on Settings/Profile/**Admin**." — `docs/planning/FEATURES.md` §"Screen: Log Session FAB" (line 31); same copy at line 866 for uni FAB
- Code shows: `/admin` route was deleted in Admin v2 Session 6; no `/admin` path exists in `src/App.jsx`
- Verdict: doc-is-stale
- Suggested action: Remove the "Admin" entry from both LogSessionFab and QuickAddFab "hidden on" lists in FEATURES.md.

---

### [LOW] `docs/mbbs/03_MBBS_CURRENT_STATE.md` §1 nav marker "🔧 CHANGE (nav gains the Card view)" is stale

- Doc says: `Sidebar MBBS_NAV, BottomTabBar MBBS_TABS / MBBS_MORE_ITEMS | 🔧 CHANGE (nav gains the Card view; loses nothing)` — `docs/mbbs/03_MBBS_CURRENT_STATE.md` §"1. Foundation & routing" (line 21)
- Code shows: `/mbbs/card-exams` (Card Exams, Award icon) is already present in `Sidebar.jsx:47` and `BottomTabBar.jsx` MBBS_MORE_ITEMS — the nav gain already happened
- Verdict: doc-is-stale
- Suggested action: Change the §1 nav row tag from 🔧 CHANGE to ✅ KEEP, removing the "(nav gains the Card view; loses nothing)" parenthetical.

---

### [LOW] FEATURES.md marks `/mbbs/review-sheet` as "(print, no nav)" but it IS in persistent nav

- Doc says: `| /mbbs/review-sheet | MbbsReviewSheet (print, no nav) | Printer | ✅ |` — `docs/planning/FEATURES.md` §MBBS route table (line 1072)
- Code shows: `{ to: '/mbbs/review-sheet', label: 'Review Sheet', icon: Printer }` is entry 12 in `MBBS_NAV` (`src/components/Layout/Sidebar.jsx:55`) AND entry 8 in `MBBS_MORE_ITEMS` (`src/components/Layout/BottomTabBar.jsx:59`)
- Verdict: doc-is-stale
- Suggested action: Change the FEATURES.md row to `MbbsReviewSheet (print)` and change the Icon column from `Printer` → `Printer` (no change there) and the "no nav" note → "(Printer, in sidebar + bottom bar More)".

---

### [NEEDS HUMAN] `src/screens/LandingPage.jsx` exists on disk but is not imported anywhere

- Doc says: nothing — `LandingPage.jsx` is not mentioned in CLAUDE.md's file tree or in FEATURES.md; CLAUDE.md documents `LandingPageStatic.jsx` (line ~"Screens" section) but not a separate `LandingPage.jsx`
- Code shows: `src/screens/LandingPage.jsx` exists on disk; `grep -rn "import.*LandingPage\b"` in src/ returns zero results — it is not imported in App.jsx or any other file; `App.jsx` only imports `LandingPageStatic`
- Verdict: NEEDS HUMAN
- Suggested action: Determine whether LandingPage.jsx is a superseded predecessor of LandingPageStatic.jsx or an in-progress file. If it is dead code, delete it and note the deletion in CLAUDE.md.

---

### [NEEDS HUMAN] `src/screens/Onboarding/AIPlanChat.jsx` exists on disk but is not imported anywhere and is not in CLAUDE.md's orphan list

- Doc says: CLAUDE.md lists intentional orphans in the Onboarding section: `OnboardingExamPicker.jsx`, `OnboardingDates.jsx`, `OnboardingPlanMethod.jsx`, `OnboardingPreview.jsx`, `QuickTaskBuilder.jsx`, `BulkPaste.jsx` — `AIPlanChat.jsx` is absent from this list
- Code shows: `src/screens/Onboarding/AIPlanChat.jsx` exists on disk; only its own self-export at line 60 matches any grep — it is not imported in `src/App.jsx` or anywhere else in src/
- Verdict: NEEDS HUMAN
- Suggested action: Determine if AIPlanChat.jsx is an abandoned feature or an in-progress file; if dead code, delete it; if intentional orphan, add it to CLAUDE.md's documented orphan list alongside the other six.

---

### [LOW] Seven legacy onboarding orphan files documented as intentional but only six are listed explicitly in CLAUDE.md

- Doc says: "The old screens (kept on disk, unimported): `OnboardingExamPicker.jsx`, `OnboardingDates.jsx`, `OnboardingPlanMethod.jsx`, `OnboardingPreview.jsx`, `QuickTaskBuilder.jsx`, `BulkPaste.jsx`" — `CLAUDE.md` §"Onboarding"
- Code shows: `src/screens/Onboarding/PlanPreview.jsx` also exists on disk and is not imported in App.jsx; it does not appear in CLAUDE.md's orphan list (7th orphan)
- Verdict: code-missing-doc
- Suggested action: Add `PlanPreview.jsx` to the CLAUDE.md orphan list, or delete it if it is no longer needed.

---

### [LOW] Three contextual MBBS routes intentionally absent from persistent nav — docs inconsistently describe this

- Doc says: `/mbbs/exam-prep | MbbsExamPrep (**contextual**, no nav entry) | — | ✅` and same for `/mbbs/field-placements` and `/mbbs/supplementary` — `docs/planning/FEATURES.md` lines 1073–1075
- Code shows: All three routes ARE present in `mbbsRouteDefs` (App.jsx:576–577), correctly excluded from `MBBS_NAV` and `MBBS_MORE_ITEMS`, reached via contextual links only — consistent with FEATURES.md description
- Verdict: No mismatch in FEATURES.md; informational only. However, CLAUDE.md §"T2 nav / routes" does not explicitly call these three "contextual" — it only says they have "no persistent nav entry" for Exam Prep and Supplementary, and omits any description of Field Placements' nav status.
- Suggested action: Add a one-line "contextual, no persistent nav entry" note for `/mbbs/field-placements` in CLAUDE.md §"T2 nav / routes" to match FEATURES.md.

---

### [LOW] `UniPlaceholder.jsx` on disk, not imported — documented as intentional, no action needed

- Doc says: "`src/screens/uni/UniPlaceholder.jsx` — DEAD since Session 14 (every uni route is real) — kept on disk, not imported anywhere" — `CLAUDE.md` §"Project Structure"
- Code shows: `src/screens/uni/UniPlaceholder.jsx` exists; not imported in App.jsx (confirmed) — matches doc claim
- Verdict: No discrepancy; recorded for completeness
- Suggested action: None; already documented correctly.

---

## Summary
| Severity | Count | Findings |
|---|---|---|
| HIGH | 0 | — |
| MED | 1 | `/mistakes` feature-gate undocumented |
| LOW | 5 | LogSessionFab Admin ref, nav 🔧→✅, review-sheet "no nav", 7th orphan, field-placements contextual note |
| NEEDS HUMAN | 2 | `LandingPage.jsx` unknown orphan, `AIPlanChat.jsx` undocumented orphan |
| **Total** | **8** | |
