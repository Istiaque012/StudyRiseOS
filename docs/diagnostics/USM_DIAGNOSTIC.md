# StudyRise — USM Diagnostic Prompts

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)

> One prompt per USM feature area. Copy the relevant prompt into Claude Code when you are ready to diagnose that area.
> Rule: diagnose and report only. Do NOT fix anything in these sessions.
> Each prompt ends with a required "REPORT FORMAT" section.

---

## AREA U-1: Foundation — App Mode, Routes, Navigation, USM Hooks

**When to use:** University mode not activating, wrong screens showing, nav items wrong, hooks not fetching.

```
Read the following files in full before doing anything else:
- src/lib/appMode.js
- src/App.jsx (route arrays and navigation)
- src/components/Layout/Sidebar.jsx
- src/hooks/useTerms.js
- src/hooks/useUnits.js
- src/hooks/useAssessments.js
- src/hooks/useClasses.js
- src/hooks/useStudySessions.js
- src/hooks/useAttendance.js
- src/lib/uniConstants.js

Diagnose the following, report findings only — do NOT modify any file:

1. ROUTE SPLIT
   - Does App.jsx render two separate route arrays based on `mode === 'university'` vs exam?
   - For university mode, do these routes exist: / → UniDashboard, /today → UniToday, /semester → SemesterPlan, /semester/unit/:id → UnitDetail, /grades → Grades, /grades/report → GradeReport, /timetable → Timetable, /analytics → UniAnalytics?
   - Are /profile, /admin, /privacy, /terms, and the * catch-all shared by both modes?
   - Does any exam route (e.g. Plan, SRModule, Questions, Mistakes, MockExams) appear in the university route array? It should NOT.

2. USM NAVIGATION
   - Does Sidebar.jsx have a `UNI_NAV` array with items: Dashboard, Today, Semester, Grades, Timetable, Analytics, Settings?
   - Is the bottom tab bar mode-aware? Does it show UNI_TABS for university mode?
   - Is the `UNI_NAV` only rendered when `mode === 'university'`?

3. APP_MODE DERIVATION SAFETY
   - Is `getAppMode` from appMode.js the only place mode is derived?
   - Search the entire codebase (Sidebar.jsx, App.jsx, all uni screens) for direct reads of `settings.app_mode !== 'university'` or `settings.app_mode === 'university'` that are NOT inside appMode.js or App.jsx. Report any found.

4. USM DATA HOOKS — ENABLED FLAG
   - Do `useSRRecords`, `useTasks`, `useSubjects` accept `{ enabled }` and short-circuit when false?
   - Are these called with `enabled: mode === 'exam'` in App.jsx?

5. UNIGATESCONFIGURATION
   - Is `configureGates` called from App.jsx during render (not inside a useEffect)?
   - Does it receive `{ plan: subscription.isPro ? 'pro' : 'free', subscriptionActivated: subscription.activated }`?

6. DEAD FILES
   - Does `UniPlaceholder.jsx` still exist on disk? If yes, is it imported anywhere? (It should not be.)
   - Does `UniPlaceholderTab.jsx` still exist on disk? If yes, is it imported anywhere?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-2: USM Onboarding Wizard

**When to use:** University onboarding not starting, steps not working, save failing, iCal import in onboarding broken.

```
Read the following files in full before doing anything else:
- src/screens/Onboarding/ModeSelect.jsx
- src/screens/Onboarding/UniOnboarding.jsx
- src/screens/Onboarding/uni/UniStepTerm.jsx
- src/screens/Onboarding/uni/UniStepTerminology.jsx
- src/screens/Onboarding/uni/UniStepUnits.jsx
- src/screens/Onboarding/uni/UniStepDeadlines.jsx
- src/screens/Onboarding/uni/UniStepWeek.jsx
- src/screens/Onboarding/uni/UniStepValue.jsx

Diagnose the following, report findings only — do NOT modify any file:

1. MODE SELECT (Step 0)
   - Does ModeSelect.jsx render two cards: "Exam Prep" and "University"?
   - On selection, does it call `updateSettings({ app_mode: mode })` AND then refetch settings?
   - Does a mid-setup refresh (app_mode already set) correctly skip Step 0 and resume the right wizard?

2. ONBOARDING GUARD
   - In App.jsx, when `app_mode === 'university'` AND `onboarding_complete === false`, does it render UniOnboarding?
   - Does `onBackToModeSelect` set `app_mode = null` (returning to Step 0)?

3. SAVE SEQUENCE
   - In UniOnboarding.jsx, is the save sequence: terms → units → assessments (manual only) → classes → upsert user_settings with `onboarding_complete: true` LAST?
   - Does a failed insert on any step leave the user in the wizard (not corrupt a partially-saved state)?

4. STEP 3 — UNITS
   - Does UniStepUnits.jsx show a soft cap note at 5 units (non-blocking)?
   - Does `FREE_UNIT_SOFT_CAP` exist and equal 5?

5. STEP 4 — DEADLINES
   - Does the iCal import fork render `IcalImportPanel` with props: `mode='onboarding'`, `units`, `terminology`, `term`, `onIcalImported`?
   - After a completed import, does the step show a "{n} ready to import / Start over" card instead of remounting the panel?

6. STEP 6 — MOMENT OF VALUE
   - Does UniStepValue.jsx show: term name, week count, unit chips, first-deadline line?
   - Does "Open my dashboard" navigate to '/'?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-3: Terms, Units, and Settings Tabs

**When to use:** Term setup broken, units not saving, terminology not updating, grading tab not working, settings tabs not appearing in uni mode.

```
Read the following files in full before doing anything else:
- src/components/Settings/uni/TermSetupTab.jsx
- src/components/Settings/uni/UnitsTab.jsx
- src/components/Settings/uni/GradingTab.jsx
- src/components/Settings/uni/uniShared.jsx
- src/hooks/useTerms.js
- src/hooks/useUnits.js
- src/hooks/useTerminology.js
- src/lib/termWeeks.js

Diagnose the following, report findings only — do NOT modify any file:

1. TERM SETUP TAB
   - Does TermSetupTab render: active term editor (all date fields), archived term list with reactivate, "Start a new term" modal that archives the current one?
   - Does the partial unique index constraint (one active term per user) get respected — does activating a new term deactivate the current one?

2. UNITS TAB
   - Does UnitsTab render a card grid with: color bar, name, code, next deadline?
   - Does the add/edit modal have all §1.2 fields including the 12-color picker marking used colors?
   - Does delete show cascade counts (how many assessments/classes will be removed)?
   - Is there a hidden free-cap counter that prevents adding more than 5 units when subscription is activated and plan is free?

3. GRADING TAB
   - Does GradingTab have save-on-tap chips for: subject_term, grade_scale, week_start, date_format?
   - Does it have a `support_services_url` field that saves on blur?

4. TERMINOLOGY SYSTEM
   - Does `useTerminology(settings)` return `{ term: {singular, plural, add}, t(key) }` derived from SUBJECT_TERMS?
   - In all USM UI (UnitsTab, SemesterPlan, etc.): is there any hardcoded "Unit" text (not from useTerminology)? Search for hardcoded strings "Add Unit", "Your Units", "units" (lowercase, as a label) in the uni component files.

5. TERMWEEKS MATH
   - Does `getTeachingWeeks` mark break weeks as `{ weekNumber: null }` and resume numbering after?
   - Does it use `settings.week_start` to align week boundaries?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-4: Assessments Core and Assessment Drawer

**When to use:** Assessments not loading, drawer not opening, status flow broken, checklist not working, recurring series not creating correctly, extension not saving.

```
Read the following files in full before doing anything else:
- src/hooks/useAssessments.js
- src/components/uni/AssessmentDrawer.jsx
- src/components/uni/AddAssessmentModal.jsx
- src/lib/assessmentHelpers.js

Diagnose the following, report findings only — do NOT modify any file:

1. STATUS FLOW
   - Does AssessmentDrawer show the segmented control: Not Started → In Progress → Submitted → Graded?
   - On Submitted: does it stamp `submitted_at`, detect late (compare vs due_date + due_time), set `is_late`, reveal penalty note field?
   - On Graded: does it reveal grade received + max fields?
   - Does moving backward from Submitted/Graded prompt a confirmation and clear the stamps?

2. SCOPE RULE
   - Does `useAssessments.updateWithScope(id, patch, 'one' | 'following')` exist?
   - Is 'following' defined as: same `recurrence_group_id`, `due_date >= this one`?
   - Does scope 'following' apply field deltas (e.g. due_date shifts by day-delta), NOT blind copies?
   - Are status/grade/submission/checklist writes always scope 'one' (never 'following')?

3. MANUALLY_EDITED FLAG
   - Is `manually_edited` stamped ONLY when the patch touches: title, due_date, or due_time?
   - Do checklist updates, status flips, and grade writes NOT stamp `manually_edited`?

4. CHECKLIST
   - Does the drawer auto-seed the checklist from DEFAULT_CHECKLISTS the first time it opens an assessment with `checklist === null`?
   - Can items be: added, renamed inline, reordered, removed, checked?

5. EXTENSION
   - Does `grantExtension(id, newDueDate)` write `original_due_date` only once (not overwrite if already set)?
   - Does the drawer header show an "Extended from {date}" chip?

6. RECURRING SERIES
   - Does AddAssessmentModal have a "Repeats weekly" section with count 2–15?
   - Does it show a live date-chip preview using `generateWeeklyDates` (with break-skipping)?
   - Does save call `createRecurringSeries`?

7. LMS BADGE
   - Does AssessmentDrawer show an "Updated by your LMS" chip when `last_lms_change` is set and within 14 days?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-5: Timetable Screen

**When to use:** Timetable not showing, classes wrong day/time, A/B rotation not working, attendance not registering.

```
Read the following files in full before doing anything else:
- src/screens/uni/Timetable.jsx
- src/components/Settings/uni/TimetableTab.jsx
- src/components/uni/ClassFormModal.jsx
- src/lib/timetableHelpers.js
- src/hooks/useClasses.js
- src/hooks/useAttendance.js

Diagnose the following, report findings only — do NOT modify any file:

1. LAYOUT
   - Does Timetable.jsx render a weekly grid on desktop and a day agenda on mobile?
   - Are class blocks rendered in their unit's color (via `--uni-*` tokens)?
   - Does each block show: class type, room/location, Join link (when location is URL)?

2. A/B ROTATION
   - Does Timetable.jsx use `settings.rotation_anchor` to determine which week is A and which is B?
   - Does `timetableHelpers.js` export functions for rotation letter determination and class occurrence per date?

3. ATTENDANCE
   - Does one-tap Attended/Skipped work from the Timetable screen?
   - Is there an 80% attendance hurdle warning when a skip would drop below threshold?

4. WEEK NAVIGATION
   - Does week navigation work correctly for A/B rotation patterns?
   - Is day_of_week 0 correctly treated as Monday (not Sunday)?

5. TIMETABLE TAB IN SETTINGS
   - Does TimetableTab show a class CRUD list grouped by day?
   - Does it include the rotation anchor control (a_first / b_first)?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-6: University Today Screen and Focus Engine

**When to use:** UniToday not loading, focus card blank, DayPlanner not generating uni blocks, attendance tapping broken, day log not saving.

```
Read the following files in full before doing anything else:
- src/screens/uni/UniToday.jsx
- src/lib/uniPriority.js
- src/components/DayPlanner/blockGenerator.js (generateUniBlocks function)
- src/components/DayPlanner/DayPlanner.jsx (uni additions)

Diagnose the following, report findings only — do NOT modify any file:

1. CLASSES TIMELINE
   - Does UniToday render a chronological class list for today with Now/Next badges?
   - Does one-tap attendance work (calls useAttendance.logAttendance)?
   - Are Join links rendered for class locations that start with http(s)?

2. FOCUS ENGINE
   - Does `uniPriority.score(a)` implement: `urgencyFactor × (weight||10)/100 × max(0.5, estimated_hours − logged_hours)` with hurdle ×1.25?
   - Does `getFocusQueue` exclude submitted/graded assessments (score 0)?
   - Does `getDeferralStreak` return consecutive days ending YESTERDAY with zero study_sessions for the assessment?
   - When deferralStreak ≥ 3, does the focus card show the "5-minute rule" variant copy?

3. GENERATEUNIBLOCKS
   - Is `generateUniBlocks` exported from blockGenerator.js as a SEPARATE export (not modifying `generateBlocks`)?
   - Does it treat classes as `type:'class'` fixed blocks (in FIXED_TYPES)?
   - Does it pack study blocks up to the `settings.daily_hours` budget?
   - Does it skip study block generation on rest days?
   - Does it add `uni: true` flag to every study block it creates?
   - Does it accept a `planned` parameter for pre-placing accepted/moved planned sessions?

4. DAYPLANNER UNI ADDITIONS
   - Does DayPlanner have a `uniMode` prop?
   - When a uni block's timer ends, does it show "Log progress?" slider (not the exam done/continue prompt)?
   - Does `onUniProgress(block, minutes, progressPct)` exist as a prop?
   - Does DayPlanner accept `externalStartSignal` for starting a block from the focus card?

5. DAY LOG
   - Does UniToday write to the shared `study_log` table (same as exam mode)?
   - Does it also write to `study_sessions` (separate USM table) on block timer completion?

6. EXAM MODE REGRESSION
   - Does `generateBlocks` (the exam function) still work unchanged — no `uni:true` flags in its output?
   - In DayPlanner, when `uniMode` is not passed (falsy), does it behave identically to before USM was added?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-7: University Dashboard

**When to use:** Dashboard blank, KPI tiles wrong, deadline strip not showing, heavy-week card not appearing, check-in card not working, coach card wrong.

```
Read the following files in full before doing anything else:
- src/screens/uni/UniDashboard.jsx
- src/lib/bunchingRadar.js
- src/lib/gradeEngine.js (currentWeightedAverage)
- src/lib/gradeScales.js (formatAverageDisplay)

Diagnose the following, report findings only — do NOT modify any file:

1. KPI TILES
   - Are there exactly 4 KPITile components: Semester progress, Due in 7 days, Current average, Hours this week?
   - Does "Semester progress" show "Week n of total" (from getCurrentWeek / getTotalTeachingWeeks)?
   - Does "Due in 7 days" count open assessments (not submitted/graded) with due_date ≤ today+7?
   - Does "Current average" call `formatAverageDisplay(grade_scale, currentWeightedAverage(...))`?
   - Does "Hours this week" use `minutesThisWeek` from useStudySessions and `weeklyHoursTarget(settings)`?

2. DEADLINE STRIP
   - Is it a horizontal scroll of the next 14 days?
   - Are overdue items pinned first with a red chip?
   - Does tapping a chip navigate to /semester with state `{openAssessmentId}`?

3. HEAVY-WEEK CARD
   - Does it appear only when `detectHeavyWeeks` returns at least one result ending ≥ today?
   - Does it show the hours vs weekly target?
   - Does "Start early — plan it" button render inside a ProGate with feature="bunching_replan"?
   - Is the WARNING itself (the card text) visible without ProGate (free users see the warning)?

4. CHECK-IN CARD
   - Does the check-in card appear in weeks 3 or 4 (key 'week3') and week 6 (key 'week6')?
   - Is it hidden after the user responds OR dismisses with X?
   - Is the response persisted to `settings.checkin_state` JSONB (not just local state)?
   - Does "slightly_behind" open PlannerTray with `autodraft="range"`?
   - Does "struggling" (week3) open a workload review modal with: heaviest unit, support URL link (from `settings.support_services_url`), recovery tray?

5. COACH CARD
   - Is there a rule-based coach card (no OpenAI call)?
   - Priority order: overdue > heavy week within 14d > focus pick with zero logged minutes > ahead-of-schedule?

6. SEMESTER WRAPPED BANNER
   - Does a Semester Wrapped banner appear when `today > activeTerm.end_date`?
   - Does it render `SemesterWrapped` component?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-8: Semester Plan — List, Timeline, Kanban

**When to use:** Semester plan views broken, filter not working, timeline not rendering, kanban drag broken.

```
Read the following files in full before doing anything else:
- src/screens/uni/SemesterPlan.jsx
- src/components/uni/SemesterListView.jsx
- src/components/uni/SemesterTimeline.jsx
- src/components/uni/SemesterKanban.jsx
- src/components/uni/SemesterFilterBar.jsx
- src/hooks/useSemesterView.js
- src/lib/quickAddParser.js

Diagnose the following, report findings only — do NOT modify any file:

1. VIEW PERSISTENCE
   - Does `useSemesterView` persist the current view ('list'|'timeline'|'kanban') to `localStorage:studyrise:semester:view`?
   - Does SemesterPlan read this on mount to restore the last view?

2. NAVIGATE-STATE CONTRACT
   - Does SemesterPlan handle `{openAssessmentId}` in navigation state (opens drawer once, one-shot ref guard)?
   - Does it handle `{filter:'due7'}` (filters to open assessments due ≤ 7 days with dismissible chip)?
   - Does it handle `{scrollToWeek}` (switches to timeline view and scrolls to that week)?

3. LIST VIEW
   - Is SemesterListView grouped by unit with a color left-border header?
   - Are completed (submitted+graded) assessments collapsed at the bottom of each group?
   - Are rows sorted by due date by default?

4. TIMELINE VIEW
   - Does SemesterTimeline render a teaching-week axis from `getTeachingWeeks`?
   - Are break columns striped and numbered weeks pause correctly?
   - Does each unit have its own lane with a sticky label on the left?
   - Do dots scale by weight tier: <10 → 8px, 10-29 → 12px, ≥30 → 16px?
   - Do hurdle assessments show an amber ring?
   - Do heavy weeks show an amber glow + hours badge?
   - Does a red "Today" line appear at the current date?
   - Do accepted/moved planned sessions render as hollow 6px dots?

5. KANBAN VIEW (Pro)
   - Is SemesterKanban wrapped in `<ProGate feature="kanban">`?
   - Does drop to Submitted column stamp `submitted_at` and show a toast?
   - Does drop to Graded column open the drawer with `focusGrade` prop?
   - Does backwards-move (e.g. Submitted → In Progress) show a confirm bar and clear stamps?

6. FILTER BAR
   - Does SemesterFilterBar export `applyFilters` and `EMPTY_FILTERS`?
   - Does it support: unit filter, category filter, status filter, week-range filter?
   - Is there a Clear button?

7. QUICKADDPARSER
   - Does `quickAddParser.js` export `parseQuickAdd(input, units, now?)` → `{ title, unitId, typeId, dueDate, weight, estimatedHours }`?
   - Does it NOT use regex lookbehind (for Safari <16.4 compatibility)?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-9: Grade Engine, Scales Registry, Grades Screen

**When to use:** Grades screen blank or wrong, What do I need calculator wrong, grade math incorrect.

```
Read the following files in full before doing anything else:
- src/screens/uni/Grades.jsx
- src/lib/gradeEngine.js
- src/lib/gradeScales.js
- src/components/uni/WhatDoINeedCard.jsx
- src/components/uni/WhatIfSimulator.jsx
- src/components/uni/GpaPanel.jsx

Diagnose the following, report findings only — do NOT modify any file:

1. GRADE ENGINE MATH (CRITICAL — re-trace these)
   - In `gradeEngine.js`: does the file header contain 7 hand-verified worked examples?
   - Does `unitGradeBreakdown` produce the spec example: Essay 30%×68 + Quiz 20%×81 → earnedPct=36.6, runningAverage=73.2?
     Verify: (0.30×68 + 0.20×81) = (20.4 + 16.2) = 36.6 earned out of 50% completed → 36.6/50×100 = 73.2
   - Does `currentWeightedAverage` weight across units by credit_value (default 1)?
   - Does `whatDoINeed` solver return status: 'achievable' | 'stretch' | 'impossible' | 'no_remaining' | 'pass_fail'?
   - Does it compute `required = (target − earnedPct) / remainingWeight × 100`?
   - Does it populate `lowerBands` (reachable bands below target)?
   - Does it populate `hurdles` (titles of remaining must-pass items)?

2. GRADE SCALES REGISTRY
   - Does `gradeScales.js` export: getScale, bandForPercent, approxConvert, formatAverageDisplay, targetOptionsForScale?
   - Does `approxConvert` ALWAYS prefix the result with "≈"?
   - Does `formatAverageDisplay` return `{primary, secondary}`?
   - Are these scales present: percentage, gpa4, gpa7_wam, cgpa10, uk_honours, passfail?

3. WHAT DO I NEED CARD
   - Does WhatDoINeedCard accept `presetUnitId` (locks + hides the unit select) and `compact` (drops Card2 wrapper) props?
   - Does it show three outcome tones: green/achievable, amber/stretch, red/impossible?
   - Does it show the visible formula footer `(target − earned) ÷ remaining × 100`?

4. WHAT-IF SIMULATOR — EPHEMERAL RULE (CRITICAL)
   - Does WhatIfSimulator NEVER write to `grade_received`?
   - Does "Set as my targets" write only to `assessments.target_score`?
   - Does Reset return sliders to the pure default (running average / 65), ignoring saved targets?

5. GPA PANEL
   - Does GpaPanel do its own flat fetch of all units + all assessments (not relying on parent)?
   - Is the current-term headline free and the all-terms history behind `<ProGate feature="multi_term_gpa">`?
   - Does it include the "≈" approxConvert line for non-gpa4 scales?

6. SECTION ORDER IN GRADES.JSX
   - Is the section order: B (What do I need) → A (Grade tracker) → C (What-if) → D (GPA panel)?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- CRITICAL MATH FAILURES: separate section if any grade calculation is wrong
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-10: What-if Simulator, GPA Panel, Unit Detail

**When to use:** What-if sliders broken, GPA not calculating, Unit Detail screen blank, attendance dots wrong.

```
Read the following files in full before doing anything else:
- src/screens/uni/UnitDetail.jsx
- src/components/uni/WhatIfSimulator.jsx
- src/components/uni/GpaPanel.jsx

Diagnose the following, report findings only — do NOT modify any file:

1. UNIT DETAIL SCREEN
   - Does UnitDetail look up the unit in the ACTIVE term's units (not all units)?
   - For a unit id from an archived term, does it show a "not in your active term" empty state?
   - Does the grade progress section show: earned/dropped/remaining stacked bar + compact WhatDoINeedCard?
   - Does the classes section show per-week attendance dots: green/red/hollow unlogged/dashed future?
   - Is the study hours chart a Recharts BarChart with bar fill = unit's `var(--uni-*)` color token?
   - Does the notes field autosave on blur with a "Saved" flash?
   - Does Back button navigate to /semester (not push a new entry) with view preserved from localStorage?

2. WHAT-IF SLIDER MATH
   - For a unit with: earnedPct=36.6, remainingWeight=50%
   - If slider for item A (weight 25%) is set to 80, and slider for item B (weight 25%) is set to 60:
     projected = (36.6 + 25×0.80 + 25×0.60) / 100 × 100 = (36.6 + 20 + 15) = 71.6%
   - Can you trace this formula from the actual code? Does it match?
   - Are graded rows rendered as locked (Lock icon, actual score shown)?

3. GPA PANEL DATA FETCHING
   - Does GpaPanel do its own independent fetch (not relying on Grades.jsx to pass data down)?
   - Does per-term cumulative average use credit-weighted math across all terms?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- CRITICAL MATH FAILURES: separate section if any calculation is wrong
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-11: LMS iCal Import and Daily Re-sync

**When to use:** iCal import not working, sync not running, conflict cards not appearing, dedupe not working, SSRF guard concerns.

```
Read the following files in full before doing anything else:
- api/ical-fetch.js
- src/lib/ical/parseIcal.js
- src/lib/ical/lmsProviders.js
- src/lib/ical/syncEngine.js
- src/components/uni/IcalImportPanel.jsx
- src/components/Settings/uni/LmsSyncTab.jsx

Diagnose the following, report findings only — do NOT modify any file:

1. ICAL-FETCH SERVERLESS (SECURITY)
   - Does api/ical-fetch.js require a Supabase JWT (not an open relay)?
   - Does it have an SSRF guard that rejects: IP literals (v4/v6), localhost, *.local, *.internal, dotless intranet hostnames?
   - Does it normalise `webcal://` to `https://`?
   - Does it have a 15s AbortController timeout?
   - Does it cap streaming at 2MB?
   - Does it verify the response contains `BEGIN:VCALENDAR`?

2. ICAL PARSER
   - Does parseIcal.js handle: CRLF+space folded lines, VALUE=DATE (date-only), VALUE=DATE-TIME with UTC-Z, TZID wall-clock simplification?
   - Are there 5 traced fixture examples in the file header?

3. PROVIDER INTERFACE
   - Do these providers exist: canvas, moodle, blackboard, brightspace_d2l, generic?
   - Does `detectProvider(url)` exist?
   - Does `inferTypeFromTitle(summary)` exist?
   - Does `matchCourseToUnit(courseKey, units)` exist?

4. SYNC RULES
   - For a new UID (not in DB): does it produce a PROPOSE action (not silently insert)?
   - For a changed due_date where `manually_edited = false`: does it apply silently and stamp `last_lms_change`?
   - For a changed due_date where `manually_edited = true`: does it produce a CONFLICT requiring user resolution?
   - For a disappeared UID: does it FLAG-list-only (never auto-delete)?

5. DEDUPLICATION
   - Does `insertImportedAssessments` try a batch insert and fall back per-row on a 23505 (unique constraint) error?
   - Does re-importing the same feed produce imported:0, skipped:n (not create duplicates)?

6. BACKGROUND AUTO-SYNC
   - Is `runBackgroundSync` called once per app load in App.jsx for uni mode?
   - Does it only run when any feed's `lastSyncedAt` is >20h old?
   - Does it apply only silent-rule updates (not interrupt with modals)?

7. ICAL IMPORT PANEL
   - Does IcalImportPanel accept: `mode: 'onboarding'|'settings'`, `units`, `terminology`, `term`, `existingUids`, `onImported`?
   - Does the panel NEVER write to the DB itself (parent persists)?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- SECURITY FAILURES: separate section for any SSRF or auth failures
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-12: AI Planner, Planning Fallacy, Bunching Replan, Check-in

**When to use:** Planner not generating proposals, proposals not accepting, lock semantics broken, planning fallacy chip not showing, check-in branches wrong.

```
Read the following files in full before doing anything else:
- src/lib/uniPlanner.js
- src/lib/planningFallacy.js
- src/hooks/usePlannedSessions.js
- src/components/uni/PlannerTray.jsx
- src/components/uni/PlanningFallacyChip.jsx
- src/components/Settings/uni/PlanningControlCard.jsx

Diagnose the following, report findings only — do NOT modify any file:

1. LOCK RULE (CRITICAL)
   - In `usePlannedSessions.replaceProposals`: does it ONLY delete rows where `status='proposed' AND user_locked=false`?
   - Does it never delete rows with status='accepted', 'moved', 'done', or `user_locked=true`?
   - When `accept(id)` is called, does it set `user_locked=false` (accepted but overrideable)?
   - When `move(id, ...)` is called, does it set `user_locked=true` (user explicitly placed, never override)?

2. BUILD DEMAND
   - Does `buildDemand` subtract both: (a) study_sessions minutes for an assessment AND (b) planned session minutes (accepted/moved/done rows) from demand?
   - Does it skip assessments with remaining demand < 0.4h?
   - For assessments in heavy weeks (from `detectHeavyWeeks`): does it set `startBy` = previous teaching week's startDate?

3. DRAFT WEEK / RANGE
   - Does `draftWeek` use `packItemsByHours` from scheduler.js (not duplicate the packing logic)?
   - Does `draftRange` loop weeks carrying leftover demand (not drop it between weeks)?
   - Does it never draft sessions for past dates?

4. PROPOSAL LABELS
   - Do proposal rows have a label in format: "{next unchecked checklist item || 'Work on'}: {title} ({k} of {n} estimated hours)"?
   - Do they have a reason string explaining the scheduling decision?

5. PLANNING FALLACY
   - Does `personalMultiplier` use the median (not mean) of historical actual/estimated ratios?
   - Does it fall back: category (≥3 samples) → overall (≥3) → 1.5 default?
   - Is it clamped [1.0, 3.0]?
   - Does PlanningFallacyChip NEVER silently apply the correction — always requires user tap?
   - Is the learned multiplier behind `FALLACY_LEARNED` ProGate (free users always see the 1.5 default)?

6. CONTROL DIAL
   - Does PlanningControlCard render a dial with three options: Full Auto / Suggest / Manual?
   - In auto mode: does PlannerTray insert drafts as `accepted` (not proposed)?
   - In manual mode: is the planner UI hidden everywhere (PlannerTray null, plan-it buttons hidden)?

7. OPENAI CALLS
   - Search uniPlanner.js, planningFallacy.js, PlannerTray.jsx for any fetch to api.openai.com or /api/ai-advisor. There must be ZERO OpenAI calls in the USM planner.

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- LOCK RULE FAILURES: separate section (these cause data integrity bugs)
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-13: Exam Revision Planner and SR Lite / Full SR Bridge

**When to use:** Revision plan not generating, SR Lite toasts not showing, Full SR rating modal not appearing, sr_mode toggle broken.

```
Read the following files in full before doing anything else:
- src/lib/revisionPlanner.js
- src/hooks/useReviewReminders.js
- src/screens/uni/UniToday.jsx (SR Lite toast and Full SR modal)
- src/screens/uni/UnitDetail.jsx (compact SR panel)
- src/components/Settings/uni/UnitsTab.jsx (sr_mode chip)

Diagnose the following, report findings only — do NOT modify any file:

1. REVISION PLANNER
   - Does `generateRevisionPlan` accept a `scope` parameter ('all' | 'weakest')?
   - Does it use inverse-gap weighting: gap = targetPct − runningAverage, clamped [2, 40]?
   - Does it produce round-robin interleaving across units (not single-unit blocks)?
   - Does it taper sessions per-exam: sessions end before each exam's due_date?
   - Does the file header contain 5 traced examples?

2. REVISION PLAN ENTRY POINTS
   - Is there a revision plan entry point on Grades.jsx (banner when ≥1 open exam)?
   - Is there one on SemesterTimeline (exam-period zone)?
   - Is there one on Dashboard coach card (≤21 days to first exam)?
   - Do all these entry points use `<PlannerTray autodraft="revision">`?

3. SR LITE
   - After logging a study session in UniToday, is an 8-second toast shown offering "Remind me to review in 7 days?"?
   - Does `addReminder` in useReviewReminders create a row with `interval_days=7`?
   - Does `completeReminder` advance: 7→14→30→done?
   - Are due reminders shown above the quick-add bar in UniToday?

4. FULL SR BRIDGE
   - For sessions ≥50 minutes on a unit with `sr_mode='full'`, is a "Track with spaced repetition" modal offered?
   - Does it create an `sr_records` row with `subject_name = "UnitName: topic"`?
   - Are due SR hits shown on UniToday with the SRModal rating picker?
   - Is there a compact SR panel on UnitDetail showing all records for that unit?

5. SR MODE TOGGLE
   - Does UnitsTab have an sr_mode chip picker per unit with options: Off / Reminders / Full SR?
   - Is the Full SR chip disabled (with Pro badge) for free users (gated by `FULL_SR` in uniGates)?

6. EXAM SR ISOLATION
   - In App.jsx, does the SR auto-create effect have `if (mode !== 'exam') return` on line 1?
   - In UniToday, is `useSRRecords()` called WITHOUT the `{ enabled }` flag? (Intentional — uni users need SR records for the Full SR bridge.)

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-14: Analytics, Notifications, Exports, Semester Wrapped, Gates LIVE

**When to use:** UniAnalytics charts broken, notifications not scheduling, exports failing, Semester Wrapped not appearing, Pro gates not enforcing.

```
Read the following files in full before doing anything else:
- src/screens/uni/UniAnalytics.jsx
- src/lib/notify/notifier.js
- src/lib/notify/uniNotifications.js
- src/components/Settings/uni/NotificationsTab.jsx
- src/lib/uniExport.js
- src/components/uni/SemesterWrapped.jsx
- src/lib/uniGates.js
- src/components/uni/ProGate.jsx

Diagnose the following, report findings only — do NOT modify any file:

1. UNIANALYTICS — CHART COUNT AND GATING
   - Are there exactly 7 charts?
   - Are these 3 FREE: grade trend, study hours vs credit share, study consistency heatmap?
   - Are these 4 PRO (each individually wrapped in `<ProGate feature="full_analytics">`): deadline adherence, planning accuracy scatter, attendance heatmap, projected finals?
   - Does the study consistency heatmap REUSE the exam StudyHeatmap component (not a new component)?
   - Does the exam StudyHeatmap still render identically when the new optional props (thresholds, intensityLabels, valueLabel) are NOT provided?

2. NOTIFICATIONS
   - Does `computeUpcomingNotifications` have a hard cap of 5 notifications per day?
   - Does it shift quiet-hours notifications to the end of the quiet window (not drop them)?
   - Are preferences stored in `localStorage:studyrise:notify:prefs`?
   - Does the delivery layer fall back to a CustomEvent (`studyrise:notify`) when Notification API is unavailable?
   - Is `scheduleUniNotifications` called once per app load in App.jsx (not repeatedly)?

3. EXPORTS
   - Does `exportTermJSON` exist in uniExport.js?
   - Does `exportAssessmentsCSV` exist?
   - Does `buildTimetableSVG` / `downloadTimetableImage` exist (timetable PNG, free)?
   - Does `buildICS` / `downloadICS` exist (outbound .ics, Pro)?
   - Is the PDF report route at `/grades/report` (window.print())?

4. SEMESTER WRAPPED
   - Does the Dashboard show a Semester Wrapped banner when `today > activeTerm.end_date`?
   - Does SemesterWrapped self-fetch (not rely on parent to pass data)?
   - Does "Save as image" produce a 600×760 SVG → PNG download?
   - Does it share `svgToPngBlob` with uniExport.js (not duplicate the function)?

5. PROGATES AND GATES LIVE
   - Does `configureGates` set a module-level gate context (not stored in React state)?
   - When `subscription_activated = false` (admin switch OFF): does `canUse(anything)` return `true` (free preview)?
   - When `subscription_activated = true` AND `plan = 'free'`: does `canUse('kanban')` return `false`?
   - When `subscription_activated = true` AND `plan = 'pro'`: does `canUse(anything)` return `true`?
   - Does `canAddUnit(plan, count)` enforce the 5-unit cap only when `subscription_activated = true` AND `plan = 'free'`?
   - Does PlannerTray count accepted proposals in the rolling 7-day window and show "{k} of 10 this week" for free users?

6. EXPLICITLY FREE FOREVER (verify these are NOT gated)
   - Is the grade calculator / WhatDoINeedCard accessible without ProGate?
   - Is the WhatIfSimulator accessible without ProGate?
   - Is the GpaPanel current-term headline accessible without ProGate?
   - Is the iCal LMS import accessible without ProGate?
   - Are notifications accessible without ProGate?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- FREE FOREVER VIOLATIONS: separate section if any "free forever" feature is incorrectly gated
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```

---

## AREA U-15: Quick Add FAB (Global)

**When to use:** FAB not appearing on uni screens, natural language parsing wrong, FAB appearing on exam screens.

```
Read the following files in full before doing anything else:
- src/components/uni/QuickAddFab.jsx
- src/lib/quickAddParser.js
- src/App.jsx (QuickAddFab mount point)

Diagnose the following, report findings only — do NOT modify any file:

1. MOUNT POINT
   - Is QuickAddFab mounted ONCE in App.jsx inside Layout, only when `mode === 'university'`?
   - Is it in its own lazy-loaded chunk?
   - Does it hide itself on these pathname prefixes: /settings, /profile, /admin, /privacy, /terms?
   - Does it appear on these uni screens: /, /today, /semester, /grades, /timetable, /analytics?

2. PARSER CORRECTNESS
   - Does parseQuickAdd use NO regex lookbehind (for Safari <16.4)?
   - Test these cases against the code logic (do not run code — trace the regex/logic manually):
     "Chem quiz Friday 20%" → expected: typeId=quiz, dueDate=next Friday, weight=20
     "essay draft 2h" → expected: estimatedHours=2, title="essay draft"
     "BIO101 group project next week 30%" → expected: unit matched to BIO101, weight=30
   - Does it correctly handle "today" and "tomorrow" as due date keywords?

3. UNIT PREFILL ON UNIT DETAIL
   - On `/semester/unit/:id`, does QuickAddFab pre-fill the unit chip from the route param?
   - Does explicit parse text or chip edit override this prefill?

REPORT FORMAT:
- PASS / FAIL / UNCERTAIN per numbered item above
- For each FAIL: file name, function/line, what was found vs expected
- RISK LEVEL: Low / Medium / High
```


---
<!-- docnav-related -->
### Related docs
- [SEO Agent — Blog Hub Redesign](SEO%20Agent.md)
- [StudyRise SEO Audit Report](SEO%20Audit.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
