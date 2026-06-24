# Doc Discrepancy Resolution
Session: 2026-06-20 · driven by `DOC_DISCREPANCY_REPORT.md` (31 findings + 2 INFO)
Result: **30 fixed · 1 no-action by design · 2 INFO reviewed** · `npm run build` clean · no source file deleted · nothing wired up · Exam/USM byte-unaffected.

In-scope files edited: `CLAUDE.md` · `docs/mbbs/03_MBBS_CURRENT_STATE.md` · `docs/mbbs/04_MBBS_DATA_MODEL.md` · `docs/mbbs/07_MBBS_BUILD_LOG.md` · `docs/planning/FEATURES.md` · `migrations/core_feature_flags.sql` · `migrations/mbbs_R03_term_unique.sql` · `src/lib/uniGates.js` · `src/lib/mbbsFeatures.js` · **new** `src/components/mbbs/index.js`.

---

## Five Phase-1 verdicts (investigated on disk)

| # | File | Verdict | Action taken |
|---|---|---|---|
| F1-2 | `src/screens/LandingPage.jsx` | **Orphan** — 0 import sites (App.jsx imports `LandingPageStatic` only) | Documented in new "Orphaned / unimported source files" list. Not deleted. |
| F1-3 | `src/screens/Onboarding/AIPlanChat.jsx` | **Orphan** — 0 import sites | Added to §Onboarding "Old screens" list + orphan list. Not deleted. |
| F1-7 | `src/screens/Onboarding/PlanPreview.jsx` | **Orphan** — 0 import sites | Added to §Onboarding "Old screens" list + orphan list. Not deleted. |
| F2-2 | `useStepsForTask.js` vs `useTaskSteps.js` | **Both live, distinct.** `useStepsForTask` = the active per-task steps hook (TaskDrawer/TaskDetailDrawer/TaskChecklist). `useTaskSteps` = live only for its `DEFAULT_STEPS` export (consumed by `services/TaskService`); its hook fn is unused. | Both documented in tree with distinct purposes. Neither deleted. |
| F5-2 | `studyrise-admin/src/screens/Security.jsx` | **Shipped-but-unlogged** — routed (admin `App.jsx`), in Layout nav, with `get_auth_security`/`update_auth_security` endpoints + `adminApi` wrappers | Added to admin structure block; corrective note that the Auth/Security "admin toggles never built" notes are stale for this screen. Not re-wired (already wired). |

---

## All 31 findings + 2 INFO

| ID | Sev | Finding | Resolution |
|---|---|---|---|
| F1-1 | MED | `/mistakes` shown as ungated | **doc-fixed** — FEATURES.md row note: gated behind `exam.mistake_log` (free, default-on) |
| F1-2 | MED | `LandingPage.jsx` orphan | **doc-fixed** — orphan list (verdict above) |
| F1-3 | MED | `AIPlanChat.jsx` orphan | **doc-fixed** — orphan + Onboarding "Old screens" lists |
| F1-4 | LOW | FAB hide-lists reference `/admin` | **doc-fixed** — removed "Admin"/"/admin" from LogSessionFab + QuickAddFab |
| F1-5 | LOW | `03` §1 nav row marker stale | **doc-fixed** — `🔧 CHANGE` → `✅ KEEP`, parenthetical dropped |
| F1-6 | LOW | `/mbbs/review-sheet` "(no nav)" | **doc-fixed** — FEATURES.md row now "(Printer icon — sidebar + bottom-bar More)" |
| F1-7 | LOW | `PlanPreview.jsx` 7th orphan | **doc-fixed** — orphan + Onboarding "Old screens" lists |
| F1-8 | LOW | CLAUDE.md T2 nav omits field-placements contextual | **doc-fixed** — dated correction bullet in §T2 nav/routes |
| F2-1 | HIGH | `src/lib/services/` (9 files) undocumented | **doc-fixed** — `services/` sub-section added to tree (9 files, responsibilities) |
| F2-2 | HIGH | `useStepsForTask` vs `useTaskSteps` | **doc-fixed** — both documented, distinct purposes (verdict above) |
| F2-3 | MED | 5 hooks undocumented | **doc-fixed** — tree one-liners (useRealtimeRefetch/useSchedules/useTaskActions/useToast/useTopics) |
| F2-4 | MED | 9 lib files undocumented | **doc-fixed** — tree one-liners + `chartTheme.js` added to Conventions as a required import |
| F2-5 | LOW | 11 prose-only hooks absent from tree | **doc-fixed** — tree one-liners |
| F2-6 | LOW | 6 prose-only lib files absent from tree | **doc-fixed** — tree one-liners |
| F3-1 | HIGH | `mbbs_R03_term_unique.sql` undocumented + name collision | **doc-fixed** — documented in `04` §B + Section E; deferred `mbbs_R03_postings`→`R04`…`R07`→`R08` rename |
| F3-2 | HIGH | `mbbs_R03_term_unique.sql` DELETE violates additive rule | **code-fixed** (SQL WARNING header) + **doc-fixed** (`04` §Rules exception + FEATURES.md Rule note) |
| F3-3 | MED | 3 docs falsely claim 003 dropped `mbbs_question_logs` | **doc-fixed** — `04` / `07` / FEATURES.md mbbs_004 row corrected |
| F3-4 | MED | `04` §R7 schema lists `kind='departmental'` | **doc-fixed** — removed `'departmental'` |
| F3-5 | LOW | non-MBBS migrations missing scope note | **doc-fixed** — FEATURES.md scope preamble above the table |
| F4-1 | HIGH | `mbbs.mocks`/`mbbs.mistakes` still seeded | **code-fixed** — idempotent `DELETE` appended to `core_feature_flags.sql` (0 consumers confirmed) |
| F4-2 | HIGH | `mbbs.analytics_full` dead gate (code uses `mbbs.pass_projection`) | **doc-fixed** (Current State correction) + **code-fixed** (inline comment in `mbbsFeatures.js`) |
| F4-3 | HIGH | `mbbs.mistakes_full` dead gate (screen deleted S0) | **doc-fixed** (Current State correction) + **code-fixed** (inline comment) |
| F4-4 | MED | `mbbs.viva` orphan SQL row + GATE_COPY | **code-fixed** — SQL `DELETE` + removed `GATE_COPY['mbbs.viva']` from `uniGates.js` |
| F4-5 | LOW | `mbbs.review_full` placeholder uncommented | **code-fixed** — inline placeholder comment in `mbbsFeatures.js` |
| F4-6 | LOW | 4 future screens registered, no route | **no-action** — by design (same pattern as `mbbs.ospe`); noted in build log |
| F5-1 | HIGH | `src/components/mbbs/index.js` documented but missing | **code-fixed** — created barrel (3 default exports; additive, no broken import) |
| F5-2 | HIGH | `Security.jsx` undocumented | **doc-fixed** — admin block + Current State (verdict: shipped-but-unlogged) |
| F5-3 | HIGH | admin structure block stale (8 vs 12 screens) | **doc-fixed** — updated to 12 screens + routes + "all real" note |
| F5-4 | MED | `api/log-failed-login.js` absent from API Routes | **doc-fixed** — `POST /api/log-failed-login` entry added |
| F5-5 | LOW | `OnboardingShell.jsx` absent from tree | **doc-fixed** — added to tree |
| F6-1 | MED | migration run-status terminology (RUN vs Run-manually) | **doc-fixed** — FEATURES.md status legend + `mbbs_R03` row ("Run manually — verify") |
| F6-2 | INFO | honours ≥75% threshold | **no-action** — reviewed; consistent across all sources |
| F6-3 | INFO | Phase-1 lockout wording | **no-action** — reviewed; consistent across all sources |

---

## Tally
- **Doc fixes:** F1-1…F1-8, F2-1…F2-6, F3-1, F3-3, F3-4, F3-5, F4-2/F4-3 (doc half), F5-2…F5-5, F6-1.
- **Code fixes (5 files):** `core_feature_flags.sql` (F4-1, F4-4a), `uniGates.js` (F4-4b), `mbbsFeatures.js` (F4-2/F4-3/F4-5 comments), `mbbs_R03_term_unique.sql` (F3-2a WARNING), `src/components/mbbs/index.js` (F5-1 new barrel).
- **No-action:** F4-6 (by design), F6-2 + F6-3 (INFO, consistent).
- **Plus:** top-of-file Current State block (overwritable living snapshot) + one dated build-log entry in CLAUDE.md.
