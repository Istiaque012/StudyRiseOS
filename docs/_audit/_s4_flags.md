# Session 4 Audit — Feature Flags
**Scope:** `src/lib/mbbsFeatures.js`, `src/lib/uniGates.js`, `src/lib/subscriptionGates.js`,
`migrations/core_feature_flags.sql`, all `canUse()`/`ProGate`/`isEnabled()`/`MBBS_ROUTE_FLAG`
call sites in `src/`.

**Date:** 2026-06-20

---

## Catalogue summary

### MBBS flags (`mbbsFeatures.js`) — 34 entries

| Key | tier | is_floor | route |
|---|---|---|---|
| mbbs.dashboard | free | ✓ | /mbbs |
| mbbs.today | free | ✓ | /mbbs/today |
| mbbs.timetable | free | ✓ | /mbbs/timetable |
| mbbs.attendance | free | ✓ | /mbbs/attendance |
| mbbs.review_sheet | free | ✓ | /mbbs/review-sheet |
| mbbs.holidays | free | ✓ | null |
| mbbs.items | free | — | /mbbs/items |
| mbbs.card_exams | free | — | /mbbs/card-exams |
| mbbs.formatives | free | — | /mbbs/formatives |
| mbbs.questions | free | — | /mbbs/questions |
| mbbs.analytics | free | — | /mbbs/analytics |
| mbbs.review | free | — | /mbbs/review |
| mbbs.postings | free | — | /mbbs/postings (no screen yet) |
| mbbs.case_log | free | — | /mbbs/case-log (no screen yet) |
| mbbs.resources | free | — | /mbbs/resources (no screen yet) |
| mbbs.internship | free | — | /mbbs/internship (no screen yet) |
| mbbs.question_bank | free | — | /mbbs/questions-bank |
| mbbs.viva_bank | free | — | /mbbs/viva |
| mbbs.topic_completion | free | — | null |
| mbbs.terms | free | — | null |
| mbbs.exam_period | free | — | /mbbs/exam-schedule |
| mbbs.supplementary | free | — | /mbbs/supplementary |
| mbbs.integrated_teaching | free | — | /mbbs/integrated-teaching |
| mbbs.field_placements | free | — | /mbbs/field-placements |
| mbbs.analytics_full | pro | — | null |
| mbbs.mistakes_full | pro | — | null |
| mbbs.review_full | pro | — | null |
| mbbs.qb_surfacing | pro | — | null |
| mbbs.viva_practice_unlimited | pro | — | null |
| mbbs.pass_projection | pro | — | null |
| mbbs.exam_period_planner | pro | — | /mbbs/exam-prep |
| mbbs.ospe | pro | — | /mbbs/ospe (no screen yet) |
| mbbs.custom_exams | pro | — | null |
| mbbs.supplementary_planning | pro | — | null |

**Confirmed absent from `mbbsFeatures.js`:** `mbbs.mocks`, `mbbs.mistakes`, `mbbs.viva`.

### USM gates (`uniGates.js` UNI_GATES) — 11 keys

kanban · ai_planner · grades_pdf · multi_term_gpa · bunching_replan ·
fallacy_learned · revision_all_units · full_sr · full_analytics ·
ical_outbound · attachments

All 11 have `FEATURE_MATRIX` entries and `GATE_COPY`. All actively read via
`<ProGate feature={UNI_GATES.*}>` in their respective screens — no dead entries.

### Exam gates (`subscriptionGates.js` GATES) — 6 keys

sr_module · analytics · ai_advisor · export · kanban_view · unlimited_tasks

CLAUDE.md explicitly states these are "defined but not yet enforced" — no
`canUse()` or `ProGate` consumer reads them anywhere in `src/`. This is
documented behaviour, not a bug.

### DB seed (`core_feature_flags.sql`) — keys that exist only in SQL

Keys seeded in the migration but absent from `mbbsFeatures.js`:
- `mbbs.mocks` (free, sort 100, Session 3 block) — **see Finding A**
- `mbbs.mistakes` (free, sort 130, Session 3 block) — **see Finding A**
- `mbbs.viva` (pro, sort 150, Session 4 block) — **see Finding D**
- `exam.mistake_log` (free, sort 300) — exam module; **see Finding G**

---

## Findings

### [HIGH] `mbbs.mocks` and `mbbs.mistakes` still seeded in migration SQL

- **Doc says:** CLAUDE.md Redesign Session 2 (v2.0) — "stale catalogue cleanup … `mbbs.mocks` and `mbbs.mistakes` entries removed" from `mbbsFeatures.js`.
- **Code shows:** `migrations/core_feature_flags.sql:101,104` — Session 3 INSERT block still inserts both rows:
  ```sql
  ('mbbs.mocks',    'mbbs', 'Model Tests', TRUE, 'free', FALSE, 100),
  ('mbbs.mistakes', 'mbbs', 'Mistake Log', TRUE, 'free', FALSE, 130)
  ```
  Neither key appears in any `canUse()`, `ProGate`, or `isEnabled()` call
  in `src/`. `mbbsFeatures.js` correctly has neither key. The screens
  `MbbsMocks.jsx` and `MbbsMistakes.jsx` were deleted in Redesign Session 0;
  the hooks were deleted too.
- **Verdict:** SQL is stale — orphan rows inserted into `app_feature_flags`
  on every fresh DB install.
- **Suggested action:** Append an idempotent `DELETE FROM app_feature_flags WHERE flag_key IN ('mbbs.mocks','mbbs.mistakes');` block to `core_feature_flags.sql` (pattern already used for the `mbbs.questions` UPDATE at line 130).

---

### [HIGH] `mbbs.analytics_full` ProGate replaced in code by `mbbs.pass_projection`; CLAUDE.md not updated

- **Doc says:** CLAUDE.md Redesign Session 4 — "`src/screens/mbbs/MbbsAnalytics.jsx` — pass-projection section wrapped `<ProGate feature=\"mbbs.analytics_full\">`."
- **Code shows:** `src/screens/mbbs/MbbsAnalytics.jsx:229` — `<ProGate feature="mbbs.pass_projection">`. No file in `src/` contains `ProGate feature="mbbs.analytics_full"` or `canUse('mbbs.analytics_full')`. The gate exists in `MBBS_FEATURE_FLAGS` (pro) and `GATE_COPY` but has zero active consumers.
- **Verdict:** DEAD FLAG in active code. CLAUDE.md is stale — the gate was
  swapped during Redesign Session 8/9 when `mbbs.pass_projection` was introduced
  as the dedicated projection gate, but the Session 4 note was never corrected.
- **Suggested action:** Update CLAUDE.md Redesign Session 4 note to read
  `<ProGate feature="mbbs.pass_projection">`. Keep `mbbs.analytics_full` in
  the registry as a reserved key for future analytics sub-features (its label
  "Full Analytics" still describes that scope), but add a code comment in
  `MbbsAnalytics.jsx` clarifying which gate covers which section.

---

### [HIGH] `mbbs.mistakes_full` — consumer screen deleted; gate is dead

- **Doc says:** CLAUDE.md Redesign Session 4 — "`MbbsMistakes.jsx` — review queue section was wrapped `<ProGate feature=\"mbbs.mistakes_full\">`."
- **Code shows:** `MbbsMistakes.jsx` was deleted in Redesign Session 0. No file in `src/` contains `ProGate feature="mbbs.mistakes_full"` or `canUse('mbbs.mistakes_full')`. The key exists in `mbbsFeatures.js` (pro, route null) and in `GATE_COPY` (`uniGates.js:111`).
- **Verdict:** DEAD FLAG. The only screen that read this gate was deleted.
  CLAUDE.md Session 4 note is stale.
- **Suggested action:** Update CLAUDE.md Session 4 note to clarify the screen
  was deleted in Redesign Session 0 and the gate has no current consumer.
  `mbbs.mistakes_full` can stay in the registry as a placeholder for a future
  mistake-review rebuild, but add a comment to `mbbsFeatures.js` marking it
  as "reserved — no screen yet."

---

### [MEDIUM] `mbbs.viva` is an orphan key in SQL and `GATE_COPY`; the viva screen uses `mbbs.viva_bank`

- **Doc says:** CLAUDE.md v2.0 Session 5 — "Browse FREE; unlimited practice = `mbbs.viva_practice_unlimited` (Pro — registered, cap not enforced while the subscription switch is off)." The free viva screen route `/mbbs/viva` is bound to `mbbs.viva_bank` in `mbbsFeatures.js`.
- **Code shows:**
  - `mbbsFeatures.js:42` — `mbbs.viva_bank` (free, route `/mbbs/viva`)
  - `mbbsFeatures.js` — no `mbbs.viva` key at all
  - `migrations/core_feature_flags.sql:117` — Session 4 block inserts `('mbbs.viva', 'mbbs', 'Viva Prep', TRUE, 'pro', FALSE, 150)` — a separate pro key
  - `uniGates.js:119` — `GATE_COPY['mbbs.viva']` exists with "Viva prep is a Pro feature" copy
  - No `ProGate feature="mbbs.viva"` or `canUse('mbbs.viva')` anywhere in `src/`
- **Verdict:** `mbbs.viva` (pro, sort 150) was registered in Session 4 with the intention that the whole viva screen would be Pro. Session 5 then shipped the viva bank as FREE (`mbbs.viva_bank`) with only unlimited practice as Pro (`mbbs.viva_practice_unlimited`). The Session-4 `mbbs.viva` row and its `GATE_COPY` entry were never cleaned up. The DB row and `GATE_COPY` are both dead. No code reads this key.
- **Suggested action:** Append `DELETE FROM app_feature_flags WHERE flag_key = 'mbbs.viva';` to `core_feature_flags.sql`. Remove the `'mbbs.viva'` block from `GATE_COPY` in `uniGates.js`.

---

### [LOW] `mbbs.review_full` is intentionally unwired — documented placeholder

- **Doc says:** CLAUDE.md Redesign Session 4 — "`MbbsReview.jsx` NOT gated: `mbbs.review_full` is registered for a future Lite vs Full SR split but no ProGate wired yet."
- **Code shows:** `mbbs.review_full` exists in `mbbsFeatures.js` (pro, route null), SQL, and `GATE_COPY`. No `ProGate` or `canUse` reads it anywhere.
- **Verdict:** Intentional placeholder — explicitly documented as future. Not a bug.
- **Suggested action:** No action needed. Consider adding an inline comment to `mbbsFeatures.js` line 32 to mirror the CLAUDE.md note for discoverability.

---

### [LOW] Four future free screens registered but have no implementation yet

- **Doc says:** CLAUDE.md lists `mbbs.postings`, `mbbs.case_log`, `mbbs.resources`, `mbbs.internship` as "future screens" in Redesign Session 4.
- **Code shows:** All four keys exist in `mbbsFeatures.js` (free) and `core_feature_flags.sql`. `MBBS_ROUTE_FLAG` includes their routes. No screen file, no App.jsx route exists for any of them. Route guard in `App.jsx` will silently omit them from `mbbsRoutes` (disabled → catches fall through to `*` → `/mbbs`).
- **Verdict:** By design. Same pattern as future pro screens `mbbs.ospe` and `mbbs.custom_exams`, which also have entries but no screens.
- **Suggested action:** No action needed. Flag it if a future session ships any of these without updating `mbbsFeatures.js`.

---

### [INFO] `exam.mistake_log` is in SQL seed only (exam module, not MBBS); usage is correct

- **Doc says:** CLAUDE.md (EMP sessions) — `exam.mistake_log` is an exam-mode feature flag.
- **Code shows:**
  - `core_feature_flags.sql:207` — `('exam.mistake_log', 'exam', 'Mistake Log', TRUE, 'free', FALSE, 300)`
  - NOT in `mbbsFeatures.js` (correct — only `mbbs.*` module flags belong there)
  - Actively read by `isFeatureEnabled('exam.mistake_log')` in 5 places: `src/App.jsx`, `src/screens/SRModule.jsx`, `src/screens/Today.jsx`, `src/components/Layout/Sidebar.jsx`, `src/components/Layout/BottomTabBar.jsx`
- **Verdict:** Consistent and correct. No issue.

---

## Cross-check matrix

| Flag key | In mbbsFeatures.js | In SQL | Active ProGate/canUse | Status |
|---|---|---|---|---|
| mbbs.dashboard | ✓ free/floor | ✓ | route guard only | ✓ consistent |
| mbbs.today | ✓ free/floor | ✓ | route guard only | ✓ consistent |
| mbbs.timetable | ✓ free/floor | ✓ | route guard only | ✓ consistent |
| mbbs.attendance | ✓ free/floor | ✓ | route guard only | ✓ consistent |
| mbbs.review_sheet | ✓ free/floor | ✓ | route guard only | ✓ consistent |
| mbbs.holidays | ✓ free/floor | ✓ | route guard only | ✓ consistent |
| mbbs.items … (other free non-floor) | ✓ | ✓ | route guard only | ✓ consistent |
| mbbs.questions | ✓ free | ✓ enabled=FALSE | route guard only | ✓ consistent |
| mbbs.analytics_full | ✓ pro | ✓ pro | ✗ NONE | **DEAD FLAG** — Finding B |
| mbbs.mistakes_full | ✓ pro | ✓ pro | ✗ NONE | **DEAD FLAG** — Finding C |
| mbbs.review_full | ✓ pro | ✓ pro | ✗ NONE | intentional placeholder |
| mbbs.pass_projection | ✓ pro | ✓ pro | ✓ MbbsAnalytics.jsx:229, MbbsDashboard | ✓ consistent |
| mbbs.qb_surfacing | ✓ pro | ✓ pro | ✓ ContextualQuestionPanel | ✓ consistent |
| mbbs.supplementary_planning | ✓ pro | ✓ pro | ✓ MbbsSupplementary.jsx | ✓ consistent |
| mbbs.exam_period_planner | ✓ pro | ✓ pro | ✓ MbbsExamPrep.jsx | ✓ consistent |
| mbbs.viva_practice_unlimited | ✓ pro | ✓ pro | ✓ MbbsViva.jsx | ✓ consistent |
| mbbs.mocks | ✗ ABSENT | ✓ free | ✗ NONE | **ORPHAN SQL** — Finding A |
| mbbs.mistakes | ✗ ABSENT | ✓ free | ✗ NONE | **ORPHAN SQL** — Finding A |
| mbbs.viva | ✗ ABSENT | ✓ pro | ✗ NONE | **ORPHAN SQL+GATE_COPY** — Finding D |
| exam.mistake_log | ✗ (exam module) | ✓ exam | ✓ 5 call sites | ✓ correct |

---

## Summary

| Severity | Count | Keys |
|---|---|---|
| HIGH | 3 | mbbs.mocks+mistakes (SQL orphans), mbbs.analytics_full (dead gate), mbbs.mistakes_full (dead gate) |
| MEDIUM | 1 | mbbs.viva (orphan SQL row + GATE_COPY entry) |
| LOW | 2 | mbbs.review_full (intentional placeholder), future-screen registrations |
| INFO | 1 | exam.mistake_log (correct, in exam module not MBBS) |

**`mbbs.mocks` and `mbbs.mistakes` removal status (specific audit requirement):**
- Correctly removed from `mbbsFeatures.js` ✓
- Correctly absent from all `canUse()`/`ProGate`/`isEnabled()` calls in `src/` ✓
- **Still seeded in `core_feature_flags.sql` lines 101 and 104** ✗ — HIGH finding

SESSION 4 DONE — 7 findings written to `docs/_audit/_s4_flags.md`.
