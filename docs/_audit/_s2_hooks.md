# Audit Session 2 — Hooks & Lib Modules
**Audited:** 2026-06-20  
**Method:** disk listing vs CLAUDE.md project-structure tree + text references; `src/hooks/mbbs/index.js` barrel (the only barrel).  
**Scope:** `src/hooks/` (57 files), `src/lib/` (88 files), `src/hooks/mbbs/index.js`.  
**Not in scope:** component files, screens.

---

## Barrel status

| Barrel | Status |
|---|---|
| `src/hooks/mbbs/index.js` | 20 named exports — matches disk exactly |
| `src/hooks/index.js` | **Does not exist** — top-level hooks have no barrel |

Because there is no top-level barrel, barrel-miss checks only apply to MBBS hooks. All MBBS barrel exports were verified present on disk.

---

## Positive confirmations (no action needed)

### [INFO] useMbbsMistakes correctly absent
- Doc says: "DELETED in Session 0" — `CLAUDE.md` §Redesign Session 0
- Code shows: file absent from `src/hooks/mbbs/`; not in barrel — `src/hooks/mbbs/index.js`
- Verdict: accurate-historical
- Suggested action: none — doc and disk agree.

### [INFO] useMbbsMocks correctly absent
- Doc says: "DELETED in Session 0" — `CLAUDE.md` §Redesign Session 0
- Code shows: file absent from `src/hooks/mbbs/`; not in barrel — `src/hooks/mbbs/index.js`
- Verdict: accurate-historical
- Suggested action: none — doc and disk agree.

---

## Hooks: mentioned in docs but absent from project-structure tree

These hooks are described somewhere in CLAUDE.md text but are missing from the `src/hooks/` tree block (project structure listing around lines 266–290). They exist on disk and are not bugs — just gaps in the structure listing.

### [LOW] useStudyHistory not in structure tree
- Doc says: described in "Hooks" section — `CLAUDE.md` §Hooks
- Code shows: file present — `src/hooks/useStudyHistory.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add one-liner to the structure tree.

### [LOW] useReviewReminders not in structure tree
- Doc says: described at §useReviewReminders (USM Session 13) — `CLAUDE.md`
- Code shows: file present — `src/hooks/useReviewReminders.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree with "USM Session 13: SR Lite CRUD".

### [LOW] usePlanView not in structure tree
- Doc says: "usePlanView.js VALID gains 'timeline'" — `CLAUDE.md` §EMP Session 14
- Code shows: file present — `src/hooks/usePlanView.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree.

### [LOW] useSubscription not in structure tree
- Doc says: described in full — `CLAUDE.md` §Subscription System
- Code shows: file present — `src/hooks/useSubscription.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree.

### [LOW] useAppSettings not in structure tree
- Doc says: "useAppSettings() — reads `app_settings` table" — `CLAUDE.md` §Subscription System
- Code shows: file present — `src/hooks/useAppSettings.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree.

### [LOW] useCookieConsent not in structure tree
- Doc says: "src/hooks/useCookieConsent.js" — `CLAUDE.md` §Cookie Consent Banner
- Code shows: file present — `src/hooks/useCookieConsent.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree.

### [LOW] useAuthSecuritySettings not in structure tree
- Doc says: "from `useAuthSecuritySettings`" — `CLAUDE.md` §Consent Audit Trail and §reCAPTCHA
- Code shows: file present — `src/hooks/useAuthSecuritySettings.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree.

### [LOW] useFeatureFlags not in structure tree
- Doc says: "Sidebar moon/sun toggle via `useFeatureFlags`" — `CLAUDE.md` §EMP Session 18; "main app already has a `useFeatureFlags.js`" — §Admin v2 Session 5
- Code shows: file present — `src/hooks/useFeatureFlags.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree noting it reads the legacy `feature_flags` table for dark mode / demo panel.

### [LOW] useFeatureRegistry not in structure tree
- Doc says: "`useFeatureRegistry()` — reads `app_feature_flags`" — `CLAUDE.md` §Redesign Session 3
- Code shows: file present — `src/hooks/useFeatureRegistry.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree.

### [LOW] useUserFeatureFlags not in structure tree
- Doc says: "NEW `src/hooks/useUserFeatureFlags.js`" — `CLAUDE.md` §Admin v2 Session 5
- Code shows: file present — `src/hooks/useUserFeatureFlags.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree.

### [LOW] useTheme not in structure tree
- Doc says: "pre-existing: `useTheme` hook" — `CLAUDE.md` §EMP Session 18
- Code shows: file present — `src/hooks/useTheme.js`
- Verdict: doc-is-stale (structure tree only)
- Suggested action: add to tree noting it drives the dark-mode toggle.

---

## Hooks: zero doc mentions anywhere

These hooks exist on disk but are not referenced in CLAUDE.md, any MBBS doc, or FEATURES.md.

### [MED] useRealtimeRefetch entirely undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/hooks/useRealtimeRefetch.js`
- Verdict: code-missing-doc
- Suggested action: read file, add one-liner to CLAUDE.md structure tree; if deprecated, delete it.

### [MED] useSchedules entirely undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/hooks/useSchedules.js`; distinct from `useScheduleTemplates.js` which IS documented
- Verdict: code-missing-doc
- Suggested action: read file, determine if active or superseded, add or delete.

### [MED] useTaskActions entirely undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/hooks/useTaskActions.js`
- Verdict: code-missing-doc
- Suggested action: read file, add to tree if active.

### [MED] useToast entirely undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/hooks/useToast.js`
- Verdict: code-missing-doc
- Suggested action: read file, add to tree (likely the toast context helper referenced as `useToastContext` in suspend guard notes).

### [MED] useTopics entirely undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/hooks/useTopics.js`
- Verdict: code-missing-doc
- Suggested action: read file; if used by exam module topics table (from `examos_migration_01.sql`), add to tree.

---

## Hooks: NEEDS HUMAN — potential duplicate

### [HIGH] useStepsForTask alongside useTaskSteps — possible duplicate or stale copy
- Doc says: "useTaskSteps.js — CRUD for task_steps table" — `CLAUDE.md` §Project Structure line ~286; `src/lib/services/TaskService.js` imports `DEFAULT_STEPS` from `'../../hooks/useTaskSteps'`
- Code shows: BOTH `src/hooks/useStepsForTask.js` AND `src/hooks/useTaskSteps.js` exist on disk; neither is imported by the other
- Verdict: NEEDS HUMAN
- Suggested action: open both files, check if one is an older version of the other; delete the stale one and update any import sites.

---

## Lib: mentioned in docs but absent from project-structure tree

### [LOW] src/lib/taskHelpers.js not in project structure tree
- Doc says: "the taskHelpers.js equivalent for assessments" — `CLAUDE.md` §assessmentHelpers.js (Session 4)
- Code shows: file present — `src/lib/taskHelpers.js`
- Verdict: doc-is-stale (tree only)
- Suggested action: add to tree alongside `assessmentHelpers.js`.

### [LOW] src/lib/index.js (lib barrel) undocumented
- Doc says: (no mention)
- Code shows: file present — `src/lib/index.js`
- Verdict: code-missing-doc
- Suggested action: read file; if it's a barrel exporting lib utilities, note it in the tree.

---

## Lib: zero doc mentions anywhere

### [HIGH] src/lib/services/ directory entirely undocumented
- Doc says: (no mention of `src/lib/services/` in any scanned doc)
- Code shows: 9 files present — `src/lib/services/index.js`, `AnalyticsService.js`, `PhaseService.js`, `PlanService.js`, `SRService.js`, `StudyLogService.js`, `SubjectService.js`, `TaskCompletionService.js`, `TaskService.js`; `SRService.js` imports `completesSRHit` from `studyUtils` and `logEvent` from `audit`; `TaskService.js` imports `DEFAULT_STEPS` from `useTaskSteps` — they are actively used
- Verdict: code-missing-doc
- Suggested action: add a `services/` sub-section to the project structure tree documenting each service's responsibility; this is a significant architectural layer with no doc coverage.

### [MED] src/lib/audit.js undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/lib/audit.js`; writes to `audit_log` table; non-critical (logs on failure rather than throwing); imported by `SRService.js`
- Verdict: code-missing-doc
- Suggested action: add one-liner to tree: "writes events to `audit_log` table; non-throwing."

### [MED] src/lib/bulkParser.js undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/lib/bulkParser.js`; parses bulk task paste text (CSV and other formats) into structured plan data
- Verdict: code-missing-doc
- Suggested action: add to tree; distinct from `quickAddParser.js` which is documented.

### [MED] src/lib/calculations.js undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/lib/calculations.js`; pure calculation functions (date-fns only, no side effects); comment says "Import only date-fns; never import supabase or hooks here"
- Verdict: code-missing-doc
- Suggested action: add to tree with "pure date/math helpers — no side effects."

### [MED] src/lib/chartTheme.js undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/lib/chartTheme.js`; "single source of truth for all Recharts styling — Brand Kit §8"; comment says "Always import from here, never hardcode in chart components"
- Verdict: code-missing-doc
- Suggested action: add to tree and add to the Conventions section (charts must import from here).

### [MED] src/lib/feasibility.js undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/lib/feasibility.js`; pure feasibility calculator; imports `RECIPE_HOURS` from `recipeHours.js`
- Verdict: code-missing-doc
- Suggested action: add to tree; clarify relationship with `scheduler.js` / exam plan generation.

### [MED] src/lib/fieldNormalizer.js undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/lib/fieldNormalizer.js`; maps alias names to canonical DB column names (e.g. `isMilestone → is_milestone`); imported by `TaskService.js`
- Verdict: code-missing-doc
- Suggested action: add to tree with "alias → canonical DB field name map."

### [MED] src/lib/mbbs/itemHelpers.js undocumented
- Doc says: (no mention in CLAUDE.md MBBS sections or MBBS build log)
- Code shows: file present — `src/lib/mbbs/itemHelpers.js`; pure MBBS item/card pace math (no network, no React); exports `getItemPace`
- Verdict: code-missing-doc
- Suggested action: add to CLAUDE.md `src/lib/mbbs/` file listing alongside `eligibility.js`, `bunchingRadar.js`, etc.

### [MED] src/lib/recipeHours.js undocumented
- Doc says: (no mention in any scanned doc)
- Code shows: file present — `src/lib/recipeHours.js`; exports `RECIPE_HOURS` constant (estimated hours per task recipe: `first_pass_applied: 3.0`, `subject_qbank: 2.0`, `consolidation: 4.0`, etc.); comment says "quickPlanGenerator.js is the authoritative source for these values"; imported by `feasibility.js`
- Verdict: code-missing-doc
- Suggested action: add to tree alongside `quickPlanGenerator.js`; note it is the extracted constant companion.

### [MED] src/lib/scheduleEngine.js undocumented
- Doc says: (no mention in any scanned doc); `scheduler.js` IS documented — "Exam plan generator + reflowTasks"
- Code shows: file present — `src/lib/scheduleEngine.js`; computes due dates for tasks based on study preferences (startDate, examDate, daysPerWeek, etc.); distinct from `scheduler.js`
- Verdict: code-missing-doc
- Suggested action: add to tree, clarify how it differs from `scheduler.js` (date scheduling vs hours packing).

---

## Summary

| Severity | Count | Category |
|---|---|---|
| HIGH | 2 | `src/lib/services/` entirely undocumented; `useStepsForTask`+`useTaskSteps` potential duplicate |
| MED | 12 | lib files with zero doc mentions anywhere |
| LOW | 13 | hooks/lib present on disk, mentioned in CLAUDE.md text but absent from the project-structure tree |
| INFO | 2 | Positive confirmations — `useMbbsMistakes` and `useMbbsMocks` correctly absent |

**Total findings: 27** (excluding the 2 INFO confirmations).

The most impactful gap is the `src/lib/services/` directory (9 files, actively imported, zero doc coverage). The second-most impactful is `useStepsForTask.js` alongside `useTaskSteps.js` — a NEEDS HUMAN judgment call on which is canonical.

SESSION 2 DONE — 27 findings written to docs/_audit/_s2_hooks.md
