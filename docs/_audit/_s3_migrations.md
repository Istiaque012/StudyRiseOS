# Session 3 Audit — Database Tables & Migrations

**Audit date:** 2026-06-20  
**Scope:** Every file in `migrations/` vs every migration reference in docs  
**Method:** `ls -1 migrations/ | sort`, then cross-reference FEATURES.md §Migrations, CLAUDE.md prose, and `docs/mbbs/04_MBBS_DATA_MODEL.md`

---

## Migration files on disk (25 total)

```
admin_001_roles.sql
admin_002_feature_flags.sql
auth_security_001_columns.sql
core_feature_flags.sql
exam_improvements_001.sql
mbbs_001_foundation.sql
mbbs_002_exam_prep.sql
mbbs_003_card_exams.sql
mbbs_004_questions_restore.sql
mbbs_005_questions.sql
mbbs_005_terms.sql
mbbs_006_topic_completion.sql
mbbs_007_viva_bank.sql
mbbs_008_question_bank.sql
mbbs_009_exam_period.sql
mbbs_010_holidays.sql
mbbs_R01_card_assessment.sql
mbbs_R02_integrated_teaching.sql
mbbs_R03_term_unique.sql        ← NOT documented anywhere
usm_001_foundation.sql
usm_002_assessments.sql
usm_003_timetable.sql
usm_004_dashboard.sql
usm_005_grades.sql
usm_006_ical.sql
```

---

## Findings

### [HIGH] `mbbs_R03_term_unique.sql` exists on disk but is undocumented and collides with a planned future migration name

- **Doc says:** `04_MBBS_DATA_MODEL.md §"R10+ (deferred)"` lists `mbbs_R03_postings.sql` as the next planned R3.x migration (for `mbbs_clinical_postings` + `mbbs_posting_items`). No entry for `mbbs_R03_term_unique.sql` anywhere in any doc file.
- **Code shows:** `migrations/mbbs_R03_term_unique.sql` exists on disk; adds `UNIQUE (user_id, phase, term_number)` constraint to `mbbs_terms`. The file's own comment says "Run manually in Supabase SQL Editor. Idempotent." — but see HIGH finding #2 below.
- **Verdict:** `code-missing-doc` + naming collision risk
- **Suggested action:** Document `mbbs_R03_term_unique.sql` in `04_MBBS_DATA_MODEL.md` under Section B; rename the planned posting migration to `mbbs_R04_postings.sql` (shifting R04–R07 up by one) and update the R10+ deferred list accordingly.

---

### [HIGH] `mbbs_R03_term_unique.sql` contains a DELETE statement — violates the additive-only migration rule

- **Doc says:** `04_MBBS_DATA_MODEL.md §Rules (Rule 1)` — "Additive + idempotent only. `create table if not exists`, `add column if not exists`. Existing tables are touched **only via nullable columns / nullable FKs**. Never a destructive change to a shipped table."
- **Code shows:** `migrations/mbbs_R03_term_unique.sql:8–19` — contains `DELETE FROM public.mbbs_terms WHERE id IN (...)` as a de-duplication step before adding the unique constraint. This is a destructive write, not an additive migration.
- **Verdict:** `contradiction` — the file violates a documented hard rule for this migration track
- **Suggested action:** Add a warning comment at the top of the file flagging the DELETE step explicitly ("WARNING: this migration deletes duplicate rows — NOT purely additive"); consider whether it has already been run against production and whether any data was lost; add a note to the data model docs under the Rules section: "Exception: `mbbs_R03_term_unique.sql` performs a de-dup DELETE before the constraint — must only be run once."

---

### [MED] `04_MBBS_DATA_MODEL.md:44` and `07_MBBS_BUILD_LOG.md:33` both claim `mbbs_003_card_exams.sql` dropped `mbbs_question_logs` — the actual file contains no DROP TABLE

- **Doc says:** `docs/mbbs/04_MBBS_DATA_MODEL.md:44` — "mbbs_003_card_exams.sql — `mbbs_exam_event_cards` + result cols (dropped MCQ table; reversed below)."  
  `docs/mbbs/07_MBBS_BUILD_LOG.md:33` — "migration `mbbs_003_card_exams.sql` (`mbbs_exam_event_cards` + result columns + dropped `mbbs_question_logs` — reversed in v2.0 S0/`mbbs_004`)."
- **Code shows:** `migrations/mbbs_003_card_exams.sql` — full file contains only: `CREATE TABLE IF NOT EXISTS mbbs_exam_event_cards`, `ALTER TABLE mbbs_exam_events ADD COLUMN IF NOT EXISTS result/marks/max_marks`, RLS policy, two indexes. No `DROP TABLE` statement of any kind.
- **Verdict:** `doc-is-stale` — the DROP TABLE was removed in Redesign Session 0 per CLAUDE.md ("removed `drop table if exists public.mbbs_question_logs cascade;` — Decision D2") but the data-model doc and build log were not updated to reflect this
- **Suggested action:** Update `04_MBBS_DATA_MODEL.md:44` to "mbbs_003_card_exams.sql — `mbbs_exam_event_cards` + result cols." (no drop mention). Update `07_MBBS_BUILD_LOG.md:33` similarly. The "reversed below" note for mbbs_004 should also be dropped.

---

### [MED] `FEATURES.md §Migrations` line 1650 says mbbs_004 re-creates mbbs_question_logs "(dropped in 003)" — the premise is false

- **Doc says:** `docs/planning/FEATURES.md:1650` — "`mbbs_004_questions_restore.sql` | RUN | Re-creates `mbbs_question_logs` (dropped in 003)"
- **Code shows:** `migrations/mbbs_003_card_exams.sql` — no DROP TABLE (see finding above). `migrations/mbbs_004_questions_restore.sql:8` self-documents: "Re-creates mbbs_question_logs if mbbs_003_card_exams.sql dropped it. v2.0 reverses that drop."
- **Verdict:** `doc-is-stale` — the description "(dropped in 003)" is the residual false premise from before Redesign Session 0 removed the DROP
- **Suggested action:** Update the FEATURES.md migration table description for mbbs_004 to: "Ensures `mbbs_question_logs` exists (no-op if mbbs_005 already ran); idempotent."

---

### [MED] `04_MBBS_DATA_MODEL.md §R7 schema` lists `kind = 'departmental'` but the actual migration file has only `'integrated'` and `'generic_topic'`

- **Doc says:** `docs/mbbs/04_MBBS_DATA_MODEL.md:92` — schema snippet for `mbbs_it_sessions`: `kind text check (kind in ('integrated','departmental','generic_topic'))` — three values including 'departmental'
- **Code shows:** `migrations/mbbs_R02_integrated_teaching.sql` — CHECK constraint: `CHECK (kind IN ('integrated', 'generic_topic'))` — only two values; 'departmental' is absent
- **Verdict:** `doc-is-stale` — 'departmental' was either dropped during authoring or never added; the migration file is the deployed truth
- **Suggested action:** Remove 'departmental' from the `04_MBBS_DATA_MODEL.md §R7` schema snippet to match the actual CHECK constraint.

---

### [LOW] Orphan tables confirmed: `mbbs_mistakes`, `mbbs_mocks`, `mbbs_mock_breakdown`

- **Doc says:** `docs/mbbs/04_MBBS_DATA_MODEL.md:43` — "orphan `mbbs_mistakes`/`mbbs_mocks`/`mbbs_mock_breakdown` (unread)." CLAUDE.md (Redesign Session 0) confirms these files were deleted.
- **Code shows:**  
  `grep -r "mbbs_mistakes" src/ api/` → `src/screens/mbbs/MbbsReviewSheet.jsx:2` only: `// (mbbs_items.notes) instead of mbbs_mistakes.correction_note` — code **comment only**, no active query.  
  `grep -r "mbbs_mocks" src/ api/` → `src/lib/mbbs/analytics.js:27` only: `// Derive a mock's percentage from total/correct (mbbs_mocks has no stored %).` — code **comment only**, no active query.  
  No `.from('mbbs_mistakes')`, `.from('mbbs_mocks')`, or `.from('mbbs_mock_breakdown')` anywhere in src/ or api/.
- **Verdict:** `dead-table` — confirmed. Docs are correct; orphan status verified.
- **Suggested action:** No action required on code. The comment references in MbbsReviewSheet.jsx and analytics.js are harmless historical notes; leave them.

---

### [LOW] `mbbs_question_logs` is NOT an orphan — actively used by `useMbbsQuestionLogs.js`

- **Doc says:** `docs/mbbs/04_MBBS_DATA_MODEL.md:43` — `mbbs_question_logs` is NOT listed alongside the orphan tables (it's listed separately as a table created by `mbbs_002`). CLAUDE.md (Redesign Session 2 v2.0) documents `useMbbsQuestionLogs.js` as the active hook.
- **Code shows:** `src/hooks/mbbs/useMbbsQuestionLogs.js:24` — `.from('mbbs_question_logs').select(...)`, `:44` — insert, `:60` — delete. Three active Supabase calls.
- **Verdict:** `docs-correct` — confirmed live table; no issue. Noting for completeness (the audit brief asked to confirm this).
- **Suggested action:** None.

---

### [LOW] `mbbs_004_questions_restore.sql` is correctly described as no-op; `core_feature_flags.sql` confirmed on disk

- **Doc says:** `docs/mbbs/04_MBBS_DATA_MODEL.md:45` — "mbbs_004_questions_restore.sql — re-created `mbbs_question_logs`." CLAUDE.md describes it as "no-op if mbbs_005 already ran."
- **Code shows:** `migrations/mbbs_004_questions_restore.sql:16` — `CREATE TABLE IF NOT EXISTS public.mbbs_question_logs` — fully idempotent. `migrations/core_feature_flags.sql` — confirmed present in `migrations/`.
- **Verdict:** `docs-correct` for both. No issue.
- **Suggested action:** None. (The only inaccuracy is the "dropped in 003" premise in the description — covered in finding MED-2 above.)

---

### [LOW] admin_*, auth_security_*, exam_improvements_*, and usm_* migrations exist on disk and appear in CLAUDE.md prose but have no entry in FEATURES.md migration table

- **Doc says:** `docs/planning/FEATURES.md §Migrations` — the migration table lists only MBBS and core migrations (14 rows). No rows for `admin_001_roles.sql`, `admin_002_feature_flags.sql`, `auth_security_001_columns.sql`, `exam_improvements_001.sql`, or any `usm_001` through `usm_006`.
- **Code shows:** All six `usm_*` files exist in `migrations/`. All four non-MBBS files exist. All are referenced in CLAUDE.md prose with their run instructions.
- **Verdict:** `code-missing-doc` — the FEATURES.md table is intentionally MBBS-focused (its header implies that scope), so this is a narrow coverage gap rather than an error
- **Suggested action:** Add a note above the FEATURES.md migration table clarifying its scope: "This table covers MBBS-specific and shared-infra migrations only. For USM migrations see CLAUDE.md §usm_00N. For exam/auth/admin migrations see CLAUDE.md §migrations/."

---

## Summary

| Severity | Count | Findings |
|---|---|---|
| HIGH | 2 | mbbs_R03_term_unique undocumented + name collision; DELETE in an "additive-only" migration |
| MED | 3 | mbbs_003 falsely said to drop mbbs_question_logs (in two doc files); mbbs_004 description carries that false premise; mbbs_R02 schema doc has a ghost 'departmental' kind value |
| LOW | 4 | Orphan tables confirmed (no code refs); mbbs_question_logs confirmed live; mbbs_004 no-op + core_feature_flags confirmed correct; non-MBBS migrations absent from FEATURES.md table (scope gap, not error) |
| **Total** | **9** | |

---

SESSION 3 DONE — 9 findings written to docs/_audit/_s3_migrations.md
