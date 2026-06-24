# MBBS Bangladesh Module — Data Model (R3.0)

<!-- docnav -->
> **Docs ·** folder map [00_MBBS_INDEX.md](00_MBBS_INDEX.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Version 3.0 — June 2026. The migration contract for the redesign: the deployed v2.0 tables (do-not-recreate), the R3.0 deltas (nullable columns + a few small additive tables), RLS scopes, and the additive-only rules._

---

## Rules (apply to every migration)

1. **Additive + idempotent only.** `create table if not exists`, `add column if not exists`. Existing tables are touched **only via nullable columns / nullable FKs**. Never a destructive change to a shipped table. _Exception:_ `mbbs_R03_term_unique.sql` performs a de-dup `DELETE` before adding its unique constraint — the single non-additive migration; run once.
2. **Run manually.** Every `.sql` is written into `migrations/` and run by the user in the Supabase SQL Editor. The client degrades gracefully (`42703 / PGRST204 / 42P01 / PGRST205`) until then.
3. **RLS owner-only by default** (`auth.uid() = user_id`) on every new `mbbs_` table, with the documented shared-read/admin-write exceptions (registry, QB global tables, viva verified table, gov holidays).
4. **Triggers** via the project's `public.update_updated_at()`. Append-only log tables get RLS but no `updated_at` trigger.
5. **Colour** is a palette **key** (e.g. `'red'`), never hex.
6. **Most of the redesign is content + UI, not schema.** The BMDC mirror is delivered mainly through the `mbbsBmdcCurriculum.js` constants (R0) and existing tables, not new tables. Resist adding tables where a nullable column or a jsonb field on `mbbs_config` will do.

---

## SECTION A — Deployed v2.0 schema (DO NOT RECREATE)

These are live on `main`. R3.0 reads and extends them; it never recreates them.

### `mbbs_001_foundation.sql` (RUN) — 10 tables + `user_settings.mbbs_config`

| Table | Key columns |
|---|---|
| `mbbs_subjects` | name, total_marks, color (palette key), sort_order |
| `mbbs_cards` | subject_id, name, status `in_progress\|ready_for_exam\|exam_passed\|complete`, card_exam_date, card_exam_result |
| `mbbs_items` | subject_id, card_id, item_number, topic_name, status `pending\|scheduled\|cleared\|failed`, date_cleared, examiner, marks, max_marks, notes |
| `mbbs_attendance` | subject_id, class_type, classes_held, classes_attended, est_total_for_phase, college_policy_note; **UNIQUE(user,subject,class_type)** |
| `mbbs_formatives` | subject_id, type, date, marks_obtained, max_marks, weight |
| `mbbs_classes` | subject_id, class_type (free text), day_of_week (0=Mon…6=Sun), start_time, end_time, location, location_is_url |
| `mbbs_readiness` | subject_id, component `written\|viva\|practical\|clinical`, state `not_started\|weak\|average\|safe\|exam_ready`; UNIQUE(user,subject,component) |
| `mbbs_study_log` | subject_id, item_id, duration_minutes, session_type, date (append-only) |
| `mbbs_daily_tasks` | subject_id, date, title, est_minutes, status, source |

`mbbs_config` (jsonb on `user_settings`): `{ phase, college, university, exam_window, phase_start_date, exam_status, supplementary, holiday_prefs, sendup, exam_period, viva_filter_scope }`.

### Other RUN v2.0 migrations
- `mbbs_002_exam_prep.sql` — `mbbs_exam_events`, `mbbs_sr_records`, `mbbs_question_logs`, + orphan `mbbs_mistakes`/`mbbs_mocks`/`mbbs_mock_breakdown` (unread).
- `mbbs_003_card_exams.sql` — `mbbs_exam_event_cards` + result cols on `mbbs_exam_events`.
- `mbbs_004_questions_restore.sql` — ensures `mbbs_question_logs` exists (idempotent; no-op if `mbbs_005` already ran).
- `core_feature_flags.sql` — `app_feature_flags` registry (shared-read / admin-write).
- `mbbs_005_terms.sql` — `mbbs_terms`, `mbbs_term_results`; nullable `term_id` on `mbbs_cards` + `mbbs_formatives`.
- `mbbs_006_topic_completion.sql` — `mbbs_topic_completion`.
- `mbbs_007_viva_bank.sql` — `mbbs_viva_questions_verified` (shared-read/admin-write) + `mbbs_viva_questions_user` + `mbbs_viva_practice_log` + `mbbs_viva_locked` (owner).
- `mbbs_008_question_bank.sql` — `mbbs_universities` + `mbbs_university_questions` (shared-read/admin-write) + `mbbs_question_study_status` + `mbbs_user_questions` + `mbbs_user_universities` (owner).
- `mbbs_009_exam_period.sql` — `mbbs_prof_schedule` (**UNIQUE(user,subject,component,exam_date)** — already allows 2 viva rows/subject) + `mbbs_exam_reflections`.
- `mbbs_010_holidays.sql` — `mbbs_gov_holidays` (shared-read/admin-write).

---

## SECTION B — R3.0 deltas (additive only)

Most redesign sessions ship **no migration** — they deliver the BMDC mirror through `mbbsBmdcCurriculum.js` and the existing tables. The few schema touches below are all nullable columns or small additive tables.

### R0 · no migration
The BMDC curriculum is a **constants module** (`src/lib/mbbs/mbbsBmdcCurriculum.js`), not a table. It seeds onboarding and is read by helpers. No DB change.

### R1 · no migration
Honours threshold, GPA scale, Phase-1 lockout, 12-year window are **constants + engine logic**. The lockout and window read `mbbs_config` (phase, supplementary, phase_start_date) — already present. No DB change.

### R2 · no migration (seed via existing table)
Per-class-type attendance uses the existing `mbbs_attendance` with `UNIQUE(user,subject,class_type)`. R2 seeds the BMDC class types per subject as attendance rows at onboarding (and back-fills for existing users via a one-time client migration on load). No schema change. The `class_type` vocabulary is a constant in `mbbsBmdcCurriculum.js`.

### R3 · no migration
Seeded onboarding writes real BMDC cards/items into `mbbs_cards` / `mbbs_items` (existing tables) and class types into `mbbs_attendance` / `mbbs_classes`. No schema change.

### R4 · `mbbs_R01_card_assessment.sql` (small, nullable columns)
The Continuous Assessment Card needs a couple of fields the paper card has that `mbbs_items` lacks:
```
mbbs_items add column if not exists exam_date date            -- "Date of examination" column (distinct from date_cleared)
mbbs_items add column if not exists remarks  text             -- "Remarks / signature" free text
mbbs_cards add column if not exists attendance_in_card int    -- "No. of attendance in practical classes of the card / Out of"
mbbs_cards add column if not exists attendance_out_of  int
```
All nullable; the card view reads them defensively. (If you prefer zero migrations, `remarks` can piggyback on `mbbs_items.notes` and the rest on `mbbs_config` — but the explicit columns mirror the paper card cleanly. Owner-only RLS already covers `mbbs_items`/`mbbs_cards`.)

### R5 · no migration (extend the term model)
Formative-as-embedded-10% and the phase-aware term gate read `mbbs_terms` / `mbbs_term_results` / `mbbs_formatives` (all present from `mbbs_005`). GPA is a pure function. No schema change.

### R6 · no migration
Per-board oral entry uses `mbbs_prof_schedule` (the `UNIQUE(user,subject,component,exam_date)` already permits Board I + Board II as two `component='viva'` rows with different dates). The board topic split is a constant in `mbbsBmdcCurriculum.js`. No schema change.

### R7 · `mbbs_R02_integrated_teaching.sql` (one small table)
Integrated-teaching + generic-topics tracking:
```
mbbs_it_sessions (
  user_id, phase text, kind text check (kind in ('integrated','generic_topic')),
  topic text, attended boolean default false, summary_submitted boolean default false,
  date date?, note text?, UNIQUE(user_id, phase, kind, topic)
)
```
RLS owner-only, trigger. Seeded from the IT + generic-topic lists in `mbbsBmdcCurriculum.js`. Its contribution surfaces in the formative/practical picture (read-only signal; does not change the eligibility verdict math, which stays attendance+formative+prev-prof+terms).

### R8 · no migration (extend class types)
Field placements are a `class_type`/activity kind in `mbbs_classes` + `mbbs_attendance` (existing tables), tagged via the BMDC constant (`come_day_visit`, `come_rfst`, `come_study_tour`, `forensic_mortuary`, `forensic_court`). The report-deliverable checklist lives in `mbbs_config.field_reports` (jsonb) — no table. Defensive `Array.isArray()` reads.

### R9 · no migration
Projection recalibration reads existing tables; it only changes which inputs it weights and how. No schema change.

### `mbbs_R03_term_unique.sql` (constraint + one-time de-dup)
Adds `UNIQUE(user_id, phase, term_number)` to `mbbs_terms` so concurrent upserts never create duplicate term rows. **Includes a one-time de-dup `DELETE`** before adding the constraint (keeps the lowest `sort_order` / earliest row per group) — the single **non-additive** migration (see the Rules exception). Run once; idempotent on an already-deduped table.

### R10+ (deferred) — clinical / internship / resources
```
mbbs_R04_postings.sql   -- mbbs_clinical_postings (unit, hospital, weeks, total 100, pass 60, dates,
                        --   official_record jsonb) + mbbs_posting_items (kind clinical|practical|tutorial,
                        --   label, required_count, done_count, satisfactory, marks, signature)
                        --   + nullable posting_id on mbbs_exam_events; extend eligibility.js phase-aware
mbbs_R05_cases.sql      -- mbbs_cases + mbbs_procedures (after the privacy/consent system)
mbbs_R06_ospe.sql       -- mbbs_ospe_stations
mbbs_R07_resources.sql  -- mbbs_resources
mbbs_R08_internship.sql -- mbbs_internship_rotations + mbbs_logbook_tasks (+ career plan jsonb;
                        --   join-deadline + UHC month + 2-yr window are computed from Final-Prof pass date)
```
All owner-only, all additive, all flag-gated. The clinical posting tables model the BMDC clinical card (§4.9 of the reference): required case/procedure counts map onto Observed/Assisted/Performed counters.

---

## SECTION C — `mbbs_config` jsonb (the running shape after R3.0)

```json
{
  "phase": "1st",
  "college": "Dhaka Medical College",
  "university": "<mbbs_universities.university_id>",
  "exam_window": { "month": 11, "year": 2026 },
  "phase_start_date": "2025-01-15",
  "admission_date": "2024-01-10",
  "exam_status": "upcoming",
  "supplementary": { "active": false, "subjects": [], "window": null, "phase1_lockout": false },
  "holiday_prefs": [],
  "field_reports": [],
  "sendup": { "has_sendup": true, "date": null, "result": null },
  "exam_period": { "state": "prep", "declared_at": null },
  "viva_filter_scope": "university"
}
```
New in R3.0: `admission_date` (for the 12-year window), `supplementary.phase1_lockout` (the Phase-1 branch), `field_reports` (COME/forensic report checklist). Every jsonb array must be read with `Array.isArray()`, never `?? []` (a known crash — see CLAUDE.md).

---

## SECTION D — RLS scope summary (unchanged from v2.0 + R3.0 additions)

| Scope | Tables |
|---|---|
| **Owner-only** (`auth.uid() = user_id`) | every `mbbs_*` table except those below — including R3.0's `mbbs_it_sessions` and the deferred clinical/internship/resource tables |
| **Shared-read / admin-write** | `app_feature_flags`, `mbbs_universities`, `mbbs_university_questions`, `mbbs_viva_questions_verified`, `mbbs_gov_holidays` |

R3.0 adds no new shared-read tables. The BMDC curriculum is a client constant, not a table (it ships in the bundle, identical for all students), so it needs no RLS.

---

## SECTION E — Migration run order for R3.0

The R3.0 SQL files, all optional-until-needed and additive (except the one-time de-dup noted below):
1. `mbbs_R01_card_assessment.sql` (R4) — nullable columns on `mbbs_items` + `mbbs_cards`.
2. `mbbs_R02_integrated_teaching.sql` (R7) — one owner-only table.
3. `mbbs_R03_term_unique.sql` — `UNIQUE(user_id, phase, term_number)` on `mbbs_terms` + a one-time de-dup `DELETE` (the single non-additive migration; run once — see Rules exception).
4. (deferred) `mbbs_R04…R08` for the clinical pillar / internship / resources.

R0–R3, R5, R6, R8, R9 ship **no migration**. Each migration-bearing session writes the `.sql`, makes the client degrade gracefully, and states in its output + the build log that the SQL must be run manually.

---

_See `06_MBBS_BUILD_SESSIONS.md` for which session ships which delta._


---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
