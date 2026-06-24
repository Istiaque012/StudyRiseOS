---
# Doc Discrepancy Report
Generated: 2026-06-20
Audited docs: CLAUDE.md · docs/mbbs/03_MBBS_CURRENT_STATE.md · docs/mbbs/07_MBBS_BUILD_LOG.md · docs/planning/FEATURES.md · docs/mbbs/04_MBBS_DATA_MODEL.md (table list only)
Out of scope: BRAND_KIT.md · DESIGN_PROMPTS.md · ANIMATION_PLAN.md · seo_content_brain/ · SECURITY_RULES.md · sessions/ plans · diagnostics/ · docs/_archive/

## Summary
Total findings: 31  |  HIGH: 10  |  MED: 10  |  LOW: 11

---

## 1. Routes & Screens

### [MED] `/mistakes` is feature-gated in code; docs show it as always-present

- **Source:** `docs/planning/FEATURES.md` §Exam Mode route table — plain row, no gate annotation.
- **Code:** `src/App.jsx:535` — `{isFeatureEnabled('exam.mistake_log') && <Route path="/mistakes" …/>}`; same gate in `Sidebar.jsx:215` and `BottomTabBar.jsx:79`.
- **Verdict:** doc-is-stale.
- **Action:** Add a note to the FEATURES.md `/mistakes` row: "gated behind `exam.mistake_log` (free, enabled by default — `core_feature_flags.sql:207`)."

---

### [MED] `LandingPage.jsx` exists on disk, is not imported anywhere, and is undocumented — NEEDS HUMAN

- **Source:** CLAUDE.md project structure tree and screen list document `LandingPageStatic.jsx` only. `LandingPage.jsx` does not appear anywhere in any doc.
- **Code:** `src/screens/LandingPage.jsx` exists on disk. `grep -rn "import.*LandingPage\b"` in `src/` returns zero results — it is not imported in `App.jsx` or any other file.
- **Verdict:** NEEDS HUMAN — either a superseded predecessor of `LandingPageStatic.jsx` or an abandoned feature.
- **Action:** Determine if dead code and delete; or add to CLAUDE.md's documented orphan list.

---

### [MED] `AIPlanChat.jsx` exists on disk, is not imported anywhere, and is not in CLAUDE.md's orphan list — NEEDS HUMAN

- **Source:** CLAUDE.md §Onboarding orphan list names six files (`OnboardingExamPicker`, `OnboardingDates`, `OnboardingPlanMethod`, `OnboardingPreview`, `QuickTaskBuilder`, `BulkPaste`). `AIPlanChat.jsx` does not appear anywhere in any doc.
- **Code:** `src/screens/Onboarding/AIPlanChat.jsx` exists on disk. No import site found in `src/` or `App.jsx`.
- **Verdict:** NEEDS HUMAN — may be an abandoned interactive plan-import feature.
- **Action:** Determine if dead code and delete; or add to CLAUDE.md orphan list alongside the other six.

---

### [LOW] LogSessionFab and QuickAddFab hide-list references `/admin` — route was removed

- **Source:** `docs/planning/FEATURES.md` §Log Session FAB and §Quick-add FAB both say these components are "hidden on Settings/Profile/**Admin**."
- **Code:** `/admin` route was deleted in Admin v2 Session 6 (`src/App.jsx` — no `/admin` route exists).
- **Verdict:** doc-is-stale.
- **Action:** Remove "Admin" from both FAB "hidden on" lists in FEATURES.md.

---

### [LOW] `03_MBBS_CURRENT_STATE.md` §1 nav row marker "🔧 CHANGE (nav gains the Card view)" is stale

- **Source:** `docs/mbbs/03_MBBS_CURRENT_STATE.md` §"1. Foundation & routing" — `Sidebar MBBS_NAV … | 🔧 CHANGE (nav gains the Card view; loses nothing)`.
- **Code:** `/mbbs/card-exams` (Card Exams, Award icon) is already present in `Sidebar.jsx:47` and `BottomTabBar.jsx` MBBS_MORE_ITEMS — the nav change already shipped.
- **Verdict:** doc-is-stale.
- **Action:** Change the §1 nav row tag to ✅ KEEP and remove the parenthetical.

---

### [LOW] FEATURES.md marks `/mbbs/review-sheet` as "(print, no nav)" — it is in persistent nav

- **Source:** `docs/planning/FEATURES.md` §MBBS route table — `| /mbbs/review-sheet | MbbsReviewSheet (print, no nav) | Printer | ✅ |`
- **Code:** `{ to: '/mbbs/review-sheet', label: 'Review Sheet', icon: Printer }` is entry 12 in `MBBS_NAV` (`Sidebar.jsx:55`) and entry 8 in `MBBS_MORE_ITEMS` (`BottomTabBar.jsx:59`).
- **Verdict:** doc-is-stale.
- **Action:** Update FEATURES.md row to remove "(no nav)" note; replace with "(Printer icon, sidebar + bottom bar More)."

---

### [LOW] `PlanPreview.jsx` is a 7th onboarding orphan not listed in CLAUDE.md

- **Source:** CLAUDE.md §Onboarding orphan list names exactly six files; `PlanPreview.jsx` is absent.
- **Code:** `src/screens/Onboarding/PlanPreview.jsx` exists on disk and is not imported anywhere.
- **Verdict:** code-missing-doc.
- **Action:** Add `PlanPreview.jsx` to the CLAUDE.md orphan list, or delete if no longer needed.

---

### [LOW] CLAUDE.md §"T2 nav / routes" omits "contextual" description for `/mbbs/field-placements`

- **Source:** CLAUDE.md §T2 nav / routes notes `/mbbs/exam-prep` and `/mbbs/supplementary` as having no persistent nav entry; Field Placements is not mentioned in that section at all.
- **Code:** `/mbbs/field-placements` is in `mbbsRouteDefs` (`App.jsx:577`) but correctly excluded from `MBBS_NAV` and `MBBS_MORE_ITEMS` — contextual only, reached via Attendance screen.
- **Verdict:** doc-is-stale (omission only; `FEATURES.md` correctly describes it as contextual).
- **Action:** Add a one-line "contextual, no persistent nav entry" note for `/mbbs/field-placements` in CLAUDE.md §"T2 nav / routes."

---

## 2. Hooks & Lib Modules

### [HIGH] `src/lib/services/` directory (9 files) is entirely undocumented

- **Source:** No mention of `src/lib/services/` in CLAUDE.md, FEATURES.md, or any MBBS doc. The CLAUDE.md project structure tree treats `src/lib/` as a flat directory.
- **Code:** 9 active files on disk: `index.js`, `AnalyticsService.js`, `PhaseService.js`, `PlanService.js`, `SRService.js`, `StudyLogService.js`, `SubjectService.js`, `TaskCompletionService.js`, `TaskService.js`. `SRService.js` imports from `studyUtils` and `audit.js` and is imported by `useSRRecords`. `TaskService.js` imports from `useTaskSteps`. These are actively used.
- **Verdict:** code-missing-doc — a significant architectural layer with zero doc coverage.
- **Action:** Add a `src/lib/services/` sub-section to the CLAUDE.md project structure tree documenting each service's responsibility.

---

### [HIGH] `useStepsForTask.js` exists alongside `useTaskSteps.js` — potential stale copy

- **Source:** CLAUDE.md §Project Structure documents `useTaskSteps.js` only: "CRUD for task_steps table." `useStepsForTask.js` is absent from all docs.
- **Code:** Both `src/hooks/useStepsForTask.js` and `src/hooks/useTaskSteps.js` exist on disk. `src/lib/services/TaskService.js` imports `DEFAULT_STEPS` from `../../hooks/useTaskSteps`. Neither imports the other. Purpose of `useStepsForTask.js` is unknown without opening it.
- **Verdict:** NEEDS HUMAN — one file may be a renamed or superseded copy of the other.
- **Action:** Open both files and check if one is stale; delete the duplicate and update any import sites; document the canonical one in the CLAUDE.md tree.

---

### [MED] Five hooks exist on disk with zero mentions in any doc

- **Code:** `src/hooks/useRealtimeRefetch.js` · `src/hooks/useSchedules.js` · `src/hooks/useTaskActions.js` · `src/hooks/useToast.js` · `src/hooks/useTopics.js` — all exist on disk; none appear in CLAUDE.md, FEATURES.md, or any MBBS doc.
- **Verdict:** code-missing-doc — likely active utilities (e.g. `useToast` is probably the `useToastContext` referenced in the suspend-guard notes; `useTopics` likely serves the `topics` table from `examos_migration_01.sql`).
- **Action:** Read each file; add one-liners to the CLAUDE.md Hooks section; delete any that are genuinely dead.

---

### [MED] Nine lib files exist on disk with zero mentions in any doc

- **Code:** `src/lib/audit.js` · `src/lib/bulkParser.js` · `src/lib/calculations.js` · `src/lib/chartTheme.js` · `src/lib/feasibility.js` · `src/lib/fieldNormalizer.js` · `src/lib/recipeHours.js` · `src/lib/scheduleEngine.js` · `src/lib/mbbs/itemHelpers.js` — all exist on disk; none appear anywhere in docs.
- **Notable:** `chartTheme.js` self-describes as "single source of truth for all Recharts styling — Brand Kit §8. Always import from here, never hardcode in chart components." This convention is undocumented. `fieldNormalizer.js` maps alias field names to canonical DB columns and is imported by `TaskService.js`. `feasibility.js` imports from `recipeHours.js` and calculates plan feasibility.
- **Verdict:** code-missing-doc.
- **Action:** Add one-liners for each in the CLAUDE.md structure tree; add `chartTheme.js` to the Conventions section as a required import for all chart components.

---

### [LOW] Eleven hooks are described in CLAUDE.md prose but absent from the Hooks section of the project structure tree

The following exist on disk and are referenced in CLAUDE.md session notes or prose but have no entry in the `src/hooks/` tree block:
`useStudyHistory`, `useReviewReminders`, `usePlanView`, `useSubscription`, `useAppSettings`, `useCookieConsent`, `useAuthSecuritySettings`, `useFeatureFlags`, `useFeatureRegistry`, `useUserFeatureFlags`, `useTheme`.

- **Verdict:** doc-is-stale (tree only).
- **Action:** Add one-liner entries for each in the CLAUDE.md project structure Hooks section.

---

### [LOW] Several lib files are described in CLAUDE.md prose but absent from the project structure tree

The following are mentioned in session notes or prose but do not appear in the `src/lib/` tree block: `taskHelpers.js` (referenced as the exam-mode counterpart of `assessmentHelpers.js`), `legalVersions.js` (Auth/Security S1), `passwordStrength.js` (Auth/Security S5), `quickPlanGenerator.js` (EMP S9), `captcha.js` (Auth/Security S7), `src/lib/index.js` (barrel, no mention).

- **Verdict:** doc-is-stale (tree only).
- **Action:** Add all six to the CLAUDE.md `src/lib/` tree block with brief descriptions.

---

## 3. Database Tables & Migrations

### [HIGH] `mbbs_R03_term_unique.sql` is undocumented and its filename collides with the planned `mbbs_R03_postings.sql`

- **Source:** `docs/mbbs/04_MBBS_DATA_MODEL.md §"R10+ (deferred)"` lists `mbbs_R03_postings.sql` as the next planned R3.x migration (for `mbbs_clinical_postings` + `mbbs_posting_items`). Neither `04_MBBS_DATA_MODEL.md` nor CLAUDE.md nor FEATURES.md contains any entry for `mbbs_R03_term_unique.sql`.
- **Code:** `migrations/mbbs_R03_term_unique.sql` exists on disk; adds `UNIQUE(user_id, phase, term_number)` to `mbbs_terms`.
- **Verdict:** code-missing-doc + name collision risk.
- **Action:** Document `mbbs_R03_term_unique.sql` in `04_MBBS_DATA_MODEL.md` under Section B. Rename the planned posting migration to `mbbs_R04_postings.sql` (shift R04–R07 up by one) and update the R10+ deferred list.

---

### [HIGH] `mbbs_R03_term_unique.sql` contains a DELETE statement — violates the documented additive-only rule

- **Source:** `04_MBBS_DATA_MODEL.md §Rules (Rule 1)` — "Additive + idempotent only … Never a destructive change to a shipped table."
- **Code:** `migrations/mbbs_R03_term_unique.sql:8–19` contains `DELETE FROM public.mbbs_terms WHERE id IN (…)` as a de-duplication step before adding the unique constraint. This is a destructive write.
- **Verdict:** contradiction — the file violates a documented hard rule.
- **Action:** Add a `WARNING` comment at the top of the file flagging the DELETE step explicitly. Add a documented exception note to `04_MBBS_DATA_MODEL.md §Rules`: "`mbbs_R03_term_unique.sql` performs a de-dup DELETE before the constraint — must only be run once; not purely additive."

---

### [MED] Three doc files falsely claim `mbbs_003_card_exams.sql` dropped `mbbs_question_logs`

- **Source 1:** `docs/mbbs/04_MBBS_DATA_MODEL.md:44` — "mbbs_003_card_exams.sql — `mbbs_exam_event_cards` + result cols (dropped MCQ table; reversed below)."
- **Source 2:** `docs/mbbs/07_MBBS_BUILD_LOG.md:33` — "migration `mbbs_003_card_exams.sql` … + dropped `mbbs_question_logs` — reversed in v2.0 S0/`mbbs_004`."
- **Source 3:** `docs/planning/FEATURES.md:1650` — "`mbbs_004_questions_restore.sql` | RUN | Re-creates `mbbs_question_logs` (dropped in 003)."
- **Code:** `migrations/mbbs_003_card_exams.sql` — full file contains only `CREATE TABLE IF NOT EXISTS mbbs_exam_event_cards`, `ALTER TABLE mbbs_exam_events ADD COLUMN`, RLS, and indexes. No `DROP TABLE` of any kind. The DROP was removed in Redesign Session 0 (Decision D2) per CLAUDE.md, but the three docs were not updated.
- **Verdict:** doc-is-stale in three locations.
- **Action:** Update `04_MBBS_DATA_MODEL.md:44` to remove "(dropped MCQ table; reversed below)." Update `07_MBBS_BUILD_LOG.md:33` to remove "dropped `mbbs_question_logs`." Update FEATURES.md `mbbs_004` description to: "Ensures `mbbs_question_logs` exists (no-op if `mbbs_005` already ran); idempotent."

---

### [MED] `04_MBBS_DATA_MODEL.md §R7` schema lists `kind = 'departmental'` — absent from the actual migration

- **Source:** `docs/mbbs/04_MBBS_DATA_MODEL.md:92` — schema snippet: `kind text check (kind in ('integrated','departmental','generic_topic'))`.
- **Code:** `migrations/mbbs_R02_integrated_teaching.sql` — `CHECK (kind IN ('integrated', 'generic_topic'))` only. `'departmental'` was never added.
- **Verdict:** doc-is-stale.
- **Action:** Remove `'departmental'` from the `04_MBBS_DATA_MODEL.md §R7` schema snippet.

---

### [LOW] Non-MBBS migrations absent from FEATURES.md migration table with no scope note

- **Source:** `docs/planning/FEATURES.md §Migrations` — the table lists only MBBS and core migrations (14 rows). No rows for `admin_001_roles.sql`, `admin_002_feature_flags.sql`, `auth_security_001_columns.sql`, `exam_improvements_001.sql`, or any `usm_001` through `usm_006`.
- **Code:** All six `usm_*` files and the four non-MBBS files exist in `migrations/` and are documented in CLAUDE.md prose.
- **Verdict:** scope gap — not an error, but confusing to a new developer.
- **Action:** Add a note above the FEATURES.md migration table: "This table covers MBBS-specific and shared-infra migrations only. For USM migrations see CLAUDE.md §usm_00N. For exam/auth/admin migrations see CLAUDE.md §migrations/."

---

## 4. Feature Flags

### [HIGH] `mbbs.mocks` and `mbbs.mistakes` are still seeded in `core_feature_flags.sql` despite all consuming code being deleted

- **Source:** CLAUDE.md Redesign Session 2 (v2.0) — "stale catalogue cleanup … `mbbs.mocks` and `mbbs.mistakes` entries removed" from `mbbsFeatures.js`.
- **Code:** `mbbsFeatures.js` correctly lacks both keys. `MbbsMocks.jsx`, `MbbsMistakes.jsx`, `useMbbsMocks.js`, `useMbbsMistakes.js` were all deleted. But `migrations/core_feature_flags.sql:101,104` (Session 3 INSERT block) still inserts both rows: `('mbbs.mocks', …)` and `('mbbs.mistakes', …)`. No `canUse()`, `ProGate`, or `isEnabled()` call in `src/` reads either key. On every fresh DB install, two orphan rows are inserted into `app_feature_flags`.
- **Verdict:** SQL is stale — orphan rows on every install.
- **Action:** Append `DELETE FROM app_feature_flags WHERE flag_key IN ('mbbs.mocks','mbbs.mistakes');` (idempotent) to `core_feature_flags.sql` — same pattern as the `mbbs.questions` UPDATE at line 130.

---

### [HIGH] `mbbs.analytics_full` is a dead gate — code uses `mbbs.pass_projection` instead; CLAUDE.md not updated

- **Source:** CLAUDE.md Redesign Session 4 — "`src/screens/mbbs/MbbsAnalytics.jsx` — pass-projection section wrapped `<ProGate feature=\"mbbs.analytics_full\">`."
- **Code:** `src/screens/mbbs/MbbsAnalytics.jsx:229` — `<ProGate feature="mbbs.pass_projection">`. No file in `src/` contains `ProGate feature="mbbs.analytics_full"` or `canUse('mbbs.analytics_full')`. The gate exists in `MBBS_FEATURE_FLAGS` (pro) and `GATE_COPY` but has zero active consumers. The swap to `mbbs.pass_projection` happened in Redesign Session 8/9.
- **Verdict:** DEAD FLAG in active code; CLAUDE.md is stale.
- **Action:** Update CLAUDE.md Redesign Session 4 note to reference `mbbs.pass_projection`. Consider adding a comment to `mbbsFeatures.js` marking `mbbs.analytics_full` as "reserved for future analytics sub-features — currently no consumer."

---

### [HIGH] `mbbs.mistakes_full` is a dead gate — consumer screen was deleted

- **Source:** CLAUDE.md Redesign Session 4 — "`MbbsMistakes.jsx` — review queue section was wrapped `<ProGate feature=\"mbbs.mistakes_full\">`."
- **Code:** `MbbsMistakes.jsx` was deleted in Redesign Session 0. No file in `src/` contains `ProGate feature="mbbs.mistakes_full"` or `canUse('mbbs.mistakes_full')`. The key exists in `mbbsFeatures.js` (pro, route null) and in `GATE_COPY` (`uniGates.js:111`).
- **Verdict:** DEAD FLAG. CLAUDE.md Session 4 note is stale.
- **Action:** Update CLAUDE.md Session 4 note to state the screen was deleted in Redesign Session 0 and the gate has no current consumer. Add a comment to `mbbsFeatures.js` marking it as "reserved — no screen; MbbsMistakes.jsx deleted in Redesign S0."

---

### [MED] `mbbs.viva` is an orphan SQL row and GATE_COPY entry superseded by `mbbs.viva_bank`

- **Source:** CLAUDE.md v2.0 Session 5 — viva browse screen is FREE (`mbbs.viva_bank`); unlimited practice is Pro (`mbbs.viva_practice_unlimited`). The Session 4 `mbbs.viva` (pro) key was the earlier design for a wholly-Pro viva screen.
- **Code:** `mbbsFeatures.js` — no `mbbs.viva` key. `migrations/core_feature_flags.sql:117` inserts `('mbbs.viva', 'mbbs', 'Viva Prep', TRUE, 'pro', FALSE, 150)`. `uniGates.js:119` has `GATE_COPY['mbbs.viva']`. No `ProGate feature="mbbs.viva"` or `canUse('mbbs.viva')` anywhere in `src/`.
- **Verdict:** Orphan DB row + orphan GATE_COPY entry; superseded by Session 5's split design.
- **Action:** Append `DELETE FROM app_feature_flags WHERE flag_key = 'mbbs.viva';` to `core_feature_flags.sql`. Remove the `'mbbs.viva'` block from `GATE_COPY` in `uniGates.js`.

---

### [LOW] `mbbs.review_full` is an intentional placeholder with no inline comment marking it as such

- **Source:** CLAUDE.md Redesign Session 4 — "`MbbsReview.jsx` NOT gated: `mbbs.review_full` is registered for a future Lite vs Full SR split but no ProGate wired yet."
- **Code:** Key exists in `mbbsFeatures.js` (pro, route null), SQL, and `GATE_COPY`. No ProGate or canUse reads it. Documented as intentional.
- **Verdict:** No mismatch; LOW risk that a future developer wires the wrong gate.
- **Action:** Add an inline comment to the `mbbs.review_full` entry in `mbbsFeatures.js` mirroring the CLAUDE.md intent note.

---

### [LOW] Four future MBBS screens (`postings`, `case_log`, `resources`, `internship`) are registered in `mbbsFeatures.js` and `core_feature_flags.sql` but have no screen or route

- **Source:** CLAUDE.md Redesign Session 4 lists these as "future screens."
- **Code:** All four keys exist in `mbbsFeatures.js` (free) and `core_feature_flags.sql`. `MBBS_ROUTE_FLAG` maps their routes. No screen file, no `App.jsx` route, and no nav entry exists for any of them. The route guard in `App.jsx` silently omits them (disabled → `*` → `/mbbs`).
- **Verdict:** By design; same pattern as `mbbs.ospe` / `mbbs.custom_exams`.
- **Action:** None required today. Flag for update if any of these screens ships without a corresponding `mbbsFeatures.js` update.

---

## 5. Project Structure Tree

### [HIGH] `src/components/mbbs/index.js` is documented as created in Redesign Session R1 but is missing from disk

- **Source:** CLAUDE.md Redesign Session R1 — "Barrel-exported from `src/components/mbbs/` (new `index.js`)." `GradeBadge.jsx` is said to be barrel-exported from this barrel.
- **Code:** `src/components/mbbs/` directory contains `GradeBadge.jsx`, `NextExamsWidget.jsx`, `ContextualQuestionPanel.jsx` — no `index.js`. Any `import … from 'src/components/mbbs'` barrel import would fail at runtime.
- **Verdict:** file documented as existing is missing from disk.
- **Action:** Create `src/components/mbbs/index.js` exporting at minimum `GradeBadge` (and any other components that should be barrel-exported); verify no import site is already broken.

---

### [HIGH] `studyrise-admin/src/screens/Security.jsx` exists on disk and is entirely unmentioned in any doc or session note

- **Source:** CLAUDE.md admin section lists the Session 1 scaffold: `screens/{Login, AccessDenied, Layout, Dashboard, Users, Subscriptions, FeatureFlags, Announcements}.jsx`. Auth/Security sessions mark captcha/OTP/rate-limit admin toggles as "Session 2 deliverables that were never built."
- **Code:** `studyrise-admin/src/screens/Security.jsx` — a complete screen implementing `fetchAuthSecurity` / `updateAuthSecurity` calls with toggle controls for `captcha_enabled`, `otp_required`, `email_verification_required`, and `rate_limit_*` settings. Not referenced in any admin session note.
- **Verdict:** contradiction — the screen described as "never built" appears to exist; OR it was built outside the session-note system and never logged.
- **Action:** Determine when and how this screen was created. Update CLAUDE.md admin structure block to include it; correct the Auth/Security "never built" note accordingly. Add it to the Admin API Actions Reference table once its endpoint is confirmed.

---

### [HIGH] CLAUDE.md admin structure block is stale by four screens

- **Source:** CLAUDE.md `studyrise-admin/` structure block lists 8 files under `screens/`: Login, AccessDenied, Layout, Dashboard, Users, Subscriptions, FeatureFlags, Announcements.
- **Code:** Twelve files exist in `studyrise-admin/src/screens/`: the original 8 plus `QuestionBankAdmin.jsx` (v2.0 S4), `VivaAdmin.jsx` (v2.0 S5), `HolidayAdmin.jsx` (v2.0 S11/R7), and `Security.jsx` (undocumented — see finding above).
- **Verdict:** doc-is-stale.
- **Action:** Update the CLAUDE.md `studyrise-admin/` structure block to reflect all 12 screens, including a one-line description for each of the four additions.

---

### [MED] `api/log-failed-login.js` is referenced in prose but absent from the API Routes section

- **Source:** CLAUDE.md §Failed Login Rate Limiting (Auth/Security Session 10) — "logs to `/api/log-failed-login`." CLAUDE.md §API Routes documents only `ai-advisor.js`, `admin.js`, `ical-fetch.js` (and mentions `send-otp.js`, `verify-captcha.js`, `verify-otp.js`). `log-failed-login.js` appears in none of these lists.
- **Code:** `api/log-failed-login.js` exists on disk; receives `{ email }` and inserts a row into `auth_failed_attempts` using the service role key.
- **Verdict:** code-missing-doc (partial — mentioned in prose, absent from the canonical API Routes reference table).
- **Action:** Add a `POST /api/log-failed-login` entry to the CLAUDE.md API Routes section.

---

### [LOW] `src/screens/Onboarding/OnboardingShell.jsx` is described in CLAUDE.md prose but is absent from the project structure tree

- **Source:** CLAUDE.md §Onboarding — "OnboardingShell: Reusable frame for exam and USM wizards (prop-driven `step`, `totalSteps`, `brandLabel`, `progressHint`). Top: BrandBar. Center: GlassCard. Footer: action buttons."  `OnboardingShell.jsx` does not appear in the project structure tree block.
- **Code:** File exists at `src/screens/Onboarding/OnboardingShell.jsx` (spot-checked).
- **Verdict:** doc-is-stale (tree only).
- **Action:** Add `OnboardingShell.jsx` to the CLAUDE.md project structure tree under `src/screens/Onboarding/`.

---

## 6. Internal Contradictions

### [MED] Migration run-status: FEATURES.md labels mbbs_001–004 as "RUN"; CLAUDE.md labels them "FILE ONLY — run manually"

- **Source:** `docs/planning/FEATURES.md §Migrations` — rows for `mbbs_001_foundation.sql`, `mbbs_002_exam_prep.sql`, `mbbs_003_card_exams.sql`, `mbbs_004_questions_restore.sql` carry status **RUN**. The same migrations in CLAUDE.md prose carry language like "FILE ONLY — run manually in Supabase SQL editor."
- **Interpretation:** FEATURES.md "RUN" likely reflects that these have been applied to the live Supabase DB. CLAUDE.md "FILE ONLY" describes the deployment pattern (no CI migration runner; paste into the Supabase SQL editor). Both can be simultaneously true but the terminology is inconsistent and would confuse a developer setting up a fresh environment.
- **Compounding factor:** `mbbs_R03_term_unique.sql` exists on disk but appears in neither table, so its live-DB run status is unknown.
- **Verdict:** contradiction in terminology across two canonical docs.
- **Action:** Align terminology — either (a) change FEATURES.md "RUN" to "Run manually (applied to prod)" and add a column legend explaining the distinction, or (b) add a preamble note explaining that "RUN" means applied to the production Supabase instance (not auto-applied via CI). Add `mbbs_R03_term_unique.sql` to the table with an appropriate status note.

---

### [INFO] Honours threshold ≥75% — no contradiction found

All sources (`FEATURES.md §3.6 Table 13`, `03_MBBS_CURRENT_STATE.md` R1 row, `src/lib/mbbs/mbbsBmdcCurriculum.js gradeFor()`, CLAUDE.md Redesign Session R1) consistently use ≥75%. No source uses ≥85%. No action required.

---

### [INFO] Phase-1 lockout wording — no contradiction found

Exhaustive search found only "Phase-1 lockout" / `phase1_lockout` (jsonb key) consistently throughout CLAUDE.md and FEATURES.md. No "Phase-2 lockout" claim exists anywhere. No action required.
