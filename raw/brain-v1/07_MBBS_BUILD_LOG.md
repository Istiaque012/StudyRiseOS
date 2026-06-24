# MBBS Bangladesh Module — Build Log (R3.0)

<!-- docnav -->
> **Docs ·** folder map [00_MBBS_INDEX.md](00_MBBS_INDEX.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Implementation log, distinct from the product spec. Append-only; newest entries at the bottom. Each Claude Code session records what it **actually** built (not what was planned)._

This log opens with a condensed record of the **already-shipped** work (Tier 1 + Tier 2 + v2.0 Sessions 0–14), so context isn't lost when the old session files are deleted. The R3.0 redesign sessions append below the divider.

---

## ALREADY SHIPPED (pre-R3.0, on `main`)

### Tier 1 — the daily loop (COMPLETE)
- **Foundation + routing:** `app_mode='mbbs_bd'`→`'mbbs'` (`appMode.js`); App.jsx selector `university?uni:mbbs?mbbs:exam`; `needsMbbsOnboarding`; Sidebar `MBBS_NAV` + BottomTabBar `MBBS_TABS`/`MBBS_MORE_ITEMS`; ModeSelect 3rd card. **Migration `mbbs_001_foundation.sql` (RUN):** 10 tables + `user_settings.mbbs_config` jsonb, RLS owner-only, `update_updated_at()` triggers.
- **Onboarding:** `MbbsOnboarding.jsx` 6-step wizard (Phase → College & window → Subjects+items/cards → Timetable → Supplementary → Finishing); step components in `src/screens/Onboarding/mbbs/`; one ordered save (subjects → cards → items round-robin → readiness → classes → user_settings flip last).
- **Constants:** `mbbsConstants.js` — `MBBS_PHASES` (BMDC 2021 placement + marks), `_CARD_TOPICS_MAP` (generic), `CONFIDENCE_VOCAB`/`CONFIDENCE_COPY`, `MBBS_COMPONENTS`, `MBBS_UNIVERSITIES`, `MONTHS`, helpers.
- **Items & Cards:** `useMbbsSubjects`/`useMbbsItems`/`useMbbsCards`, `itemHelpers.js` (pace/status), `ItemsCards.jsx` (Items tab + Cards tab).
- **Attendance:** `useMbbsAttendance` + `attendanceHelpers.js` + `Attendance.jsx` (zones, days-can-miss, one-tap log, edit totals).
- **Formatives:** `useMbbsFormatives` + `formativeHelpers.js` + `Formatives.jsx` (weighted average, 60% gate, score-needed).
- **Eligibility engine:** `eligibility.js` — `computeEligibility(...)`; attendance/formative the only hard gates; items+cards caution-only; unpassed prev prof → not_eligible.
- **Dashboard:** `MbbsDashboard.jsx` — status hero + 4 gate widgets + gate summary + `ReadinessGrid` + next-exams widget + overdue-review banner.
- **Timetable + holidays:** `useMbbsClasses` + `Timetable.jsx`; `bdHolidays.js` (`BD_HOLIDAYS_2026`).
- **Today cockpit:** `MbbsToday.jsx` on the shared Exam-Today engine (`generateMbbsBlocks`); `dailyPlan.js`; `gateSummary.js`.
- **Readiness:** `useMbbsReadiness` + `mbbs_readiness`.
- **Exam window:** `examWindow.js` (statuses, window→date, countdown, string-month defensive).

### Tier 2 — exam prep
- **Migration `mbbs_002_exam_prep.sql` (RUN):** `mbbs_exam_events`, `mbbs_sr_records`, `mbbs_question_logs`, `mbbs_mistakes`, `mbbs_mocks`, `mbbs_mock_breakdown`.
- **SR engine:** `useMbbsSR.js`; `MbbsReview.jsx` at `/mbbs/review`; ported `SRModal`; dashboard overdue banner; cockpit SR-first blocks.
- **Upcoming exams spine:** `upcomingExams.js`, `useMbbsExamEvents`, `NextExamsWidget.jsx`.
- **Card exams:** `MbbsCardExams.jsx` at `/mbbs/card-exams`; **migration `mbbs_003_card_exams.sql`** (`mbbs_exam_event_cards` + result columns on `mbbs_exam_events`).
- **Daily routine settings tab** for MBBS.

### v2.0 Sessions 0–14 (COMPLETE, deployed)
- **S0 — Cleanup:** removed the mistake log (`MbbsMistakes`, `useMbbsMistakes`, the `srService.js` mistake graduation) + mocks (`MbbsMocks`, `useMbbsMocks`); kept `mbbs_question_logs`; re-sourced `MbbsReviewSheet.jsx` from item/topic notes. Orphan tables left untouched.
- **S1–S2 — Admin control plane:** `app_feature_flags` registry (`core_feature_flags.sql`, shared-read/admin-write) + admin UI + per-feature on/off + Free/Pro; `mbbsFeatures.js`; ethical-floor locked free; MCQ gate wired **off**.
- **S3 — Items inside cards:** item add/edit/delete within a card.
- **S4 — University Question Bank:** `mbbs_008_question_bank.sql` (+ `mbbs_004_questions_restore.sql`) — `mbbs_universities` + `mbbs_university_questions` (shared-read/admin-write) + `mbbs_question_study_status` + `mbbs_user_questions` + `mbbs_user_universities` (owner); onboarding university; admin authoring; contextual surfacing.
- **S5 — Viva Question Bank:** `mbbs_007_viva_bank.sql` — verified (shared-read/admin-write) + user + practice-log + locked (owner); admin verify; practice mode → SR.
- **S6 — Topic completion:** `mbbs_006_topic_completion.sql` — `mbbs_topic_completion`; topic-by-topic.
- **S7 — Term object + formative model:** `mbbs_005_terms.sql` — `mbbs_terms`, `mbbs_term_results`; nullable `term_id` on `mbbs_cards`/`mbbs_formatives`; `useMbbsTerms`.
- **S8 — Pass Probability Projection + analytics:** `passProjection.js` (gates + coverage + retention + send-up; "not enough data" state).
- **S9–S10 — Exam Period System:** `mbbs_009_exam_period.sql` — `mbbs_prof_schedule` (**UNIQUE(user,subject,component,exam_date)**) + `mbbs_exam_reflections`; schedule entry + send-up + state machine; during-exam focus + pre-prof study mode (`MbbsExamPrep`).
- **S11 — Holidays:** `mbbs_010_holidays.sql` — `mbbs_gov_holidays` (shared-read/admin-write); admin gov + student college (`holiday_prefs`); `bdHolidays.js` merge.
- **S12 — Interactive dashboard:** tappable gate rings, what-if sliders, countdown scrubber, swipeable subject cards, SR quick-action, "today's one thing" focus.
- **S13 — Engagement:** `mbbsNotifications.js` (morning gate-protection digest, ≤3/day, quiet hours), `MbbsNotificationsTab`, `mbbsIcsExport.js` (RFC 5545 .ics), holiday + gap cockpit banners.
- **S14 — Supplementary + "what if I fail?":** `MbbsSupplementary.jsx` at `/mbbs/supplementary` + `supplementaryPlan.js`; dashboard two-track split; "what if I fail?" timeline; `mbbs_config.supplementary` (failed subjects as NAMES). (Also fixed a latent Rules-of-Hooks violation in `MbbsDashboard.jsx`.)

### Migrations RUN (additive-only from here)
`mbbs_001` … `mbbs_010`, `core_feature_flags`, `mbbs_004_questions_restore`.

### Known facts the R3.0 redesign corrects
- `_CARD_TOPICS_MAP` is **generic**, not the real BMDC items → replaced by `mbbsBmdcCurriculum.js` (R0).
- Honours threshold shipped at **85%** → should be **75% / grade A** (R1).
- Attendance shipped per-subject (single %) → should be **per class type, worst-category gate** (R2).
- Formative shipped as a generic weighted average → should be **10% embedded in written + term gates, phase-aware** (R5).
- Phase-1 failure handled as dual-phase → should be a **full lockout** (R1/R8).
- 12-year completion window, two-board oral, integrated teaching, field placements → **not yet modelled** (R1/R6/R7/R8).

> v2.0 product/state detail lives in `02_MBBS_PRODUCT_SPEC.md` + `03_MBBS_CURRENT_STATE.md`.

---

## R3.0 REDESIGN SESSIONS (append below, newest at the bottom)

<!--
Template for each entry:

## Session R{N} — <title> (<date>)
_Corresponds to 06_MBBS_BUILD_SESSIONS.md Session R{N}. <one-line intent>._
- Built: <files created/changed — constants, tables, hooks, libs, screens, routes, nav>
- Migration: <name> — <RUN / FILE-ONLY, run via Supabase SQL Editor> / <none>
- Build size: <chunk size / gz>; `npm run build` <clean, time, modules>
- Deviations: <any departure from the session spec or decision log, with reason>
- QA'd: <what was verified — route renders, dark mode, 375px, cold-reload, Exam/USM byte-unaffected>
-->

## Session R0 — BMDC curriculum constants: the seed spine (2026-06-17)
_Corresponds to 06_MBBS_BUILD_SESSIONS.md Session R0. Builds the single canonical BMDC 2021 structure every redesign feature reads._
- Built: **`src/lib/mbbs/mbbsBmdcCurriculum.js`** (NEW) — deep-frozen `MBBS_BMDC` keyed `1st/2nd/3rd/final`; per phase: id/label/duration/totalMarks, `termGate`/`phase1Lockout` flags, class types, `integratedTeaching {count,sessions}`, `genericTopics`, `termCardMap`; per subject: name/totalMarks/colorKey (palette key), `components {written,soe,practical,clinical?,formative}`, `writtenComposition`, `boards {count,boards:[{label,marks,topics}]}`, `classTypes` (BMDC hours where known), `fieldPlacements`, `clinicalCard` (final); per card: name/type(`dissection|histology|system|item_card|topic|clinical_posting`)/term/`defaultItemMark`/`items:[{number,name,maxMarks}]`. Also `MBBS_GPA_SCALE` (Table 13) + `gradeFor(pct)`, `MBBS_ELIGIBILITY` (75/60/60/term-gate/phase-1-lockout/12-yr/May+Nov), `WRITTEN_COMPOSITION` (FA 10 / MCQ 20 [SBA50/MTF50] / SAQ-SEQ 70 [SAQ75/SEQ25]), `CARD_COLUMN_SHAPE`, `CLINICAL_POSTING_CARD_SHAPE`. Selectors: `getBmdcPhase/getBmdcSubjects/getBmdcCards/getBmdcItems/getClassTypes/getBoards/getTermCardMap/getItSessions/getGenericTopics/getFieldPlacements/getBmdcSubjectTopics/getBmdcCardTopics`.
  - **Verbatim transcription** (from `docs/curriculum/BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md`): **1st Prof in full** — Anatomy 6 regional dissection cards (Thorax 8 / Superior Extremity 10 / Abdomen 16 / Inferior Extremity 10 / Head & Neck 16 / CNS & Eyeball 12; Tables 57/60/63/66/69/72) + 3 histology item cards (8/6/5; Tables 75/78/81), Board I/II topic split (Table 51), Anatomy term↔card map (Tables 54/55); Physiology 8 system cards (Tables 104–112; Card 1 ×10 … Card 8 practical ×24) + Board I/II split; Biochemistry 6 cards (Tables 125–130). **3rd Prof item cards** — Pathology 4 class-performance cards (1A General 15 / 1B Haematolymphoid 13 / 2A + 2B Systemic; Tables 242–246) + oral-box themes; Microbiology 2 item cards (Tables 270–276). **2nd Prof** — Pharmacology 10 topic-group cards across Term I/II (the BMDC-mandated 20 item exams; Tables 141–153), Forensic 3 topic cards + 16-day field placements; Community Medicine 4 topic cards + COME 30-day field placements. **Final Prof** — 3 subjects + mark tables (Table 17) + clinical-posting card SHAPE + Medicine 4-board structure (Table 5930); per-posting item lists deferred to R12.
- Changed: **`mbbsConstants.js`** — `getCardTopics`/`getSubjectTopics` now prefer the BMDC verbatim item lists (via `getBmdcCardTopics`/`getBmdcSubjectTopics`) and fall back to the legacy `_CARD_TOPICS_MAP` (now exported) so card names the BMDC spine doesn't carry still resolve — the "thin shim" keeping mid-migration consumers (ItemsCards datalist, topic-completion seed, QB surfacing, MbbsAnalytics coverage denominators, viva spine) working. **`src/lib/mbbs/index.js`** — `export * from './mbbsBmdcCurriculum'` added first (no export-name collisions; verified). Curriculum source copied to `docs/curriculum/`.
- Migration: **none** (constant only).
- Build size: bundled into the MBBS-only `mbbsConstants` chunk (63.32 kB / 20.70 kB gz; mbbsConstants imports the curriculum). `npm run build` clean, 1m37s.
- Deviations: (1) `_CARD_TOPICS_MAP` was module-local; the session asked it be "exported as a thin shim" — I export the map AND re-point the two topic functions (the actual consumers) to BMDC-first, which satisfies the intent. (2) Item `number` is sequential 1..N (structural); `name` is verbatim, with intra-cell line-wrap `/` markers un-wrapped to single strings — same words, no paraphrase. (3) Boards encoded `count:2` only where BMDC defines two boards (Anatomy, Physiology, Community Medicine, Pathology box A/B); others `count:1` (Medicine `count:4`). (4) Forensic field days = **16** (10 mortuary + 6 court/lab) per the reference §4.5/§7, overriding the curriculum's 8+4 time-schedule table (reference wins). (5) IT/generic-topic full lists are count + the reference's per-phase generic-topic seed; the full per-session IT topic lists land in R7.
- QA'd: 31-assertion Node selector test green (frozen, grade bands incl. `gradeFor(null)→Not graded`, per-phase totals 1300/600/900/1500, verbatim item counts, class-type hours, boards, term map, IT counts 12/73, field placements, topic spine). Preview (logged-in `istiaqmcp@gmail.com`, 1st Prof): `/mbbs` (eligibility hero NOT ELIGIBLE intact), `/mbbs/items`, `/mbbs/analytics` all render, **zero console errors** after the topic re-point. R0 ships no new UI. Exam/USM byte-unaffected (only MBBS-only files touched; Exam/USM never import them).

## Session R2 — Per-class-type attendance (2026-06-17)
_Corresponds to 06_MBBS_BUILD_SESSIONS.md Session R2. Surfaces per-BMDC-class-type attendance; gate binds on worst category._
- Built:
  - **`src/lib/mbbs/attendanceHelpers.js`** — `CLASS_TYPES` expanded with BMDC full-name primary entries (`Lecture`, `Tutorial`, `Practical`, `Dissection`, `Integrated teaching`, `Ward posting`, `Clinical/Bedside teaching`, `Ambulatory care`, `Block posting`, `Field placement`); legacy lowercase entries retained for backward compatibility. New `subjectHeadlinePct(subjectId, attendance)` function returns the **minimum** % across all class types with data (the gate-binding value, null when no data).
  - **`src/hooks/mbbs/useMbbsAttendance.js`** — `backfillClassTypes(subjects, config)` added + exported. Uses `getClassTypes(phase, subject.name)` from `mbbsBmdcCurriculum.js` to build the set of BMDC rows, then upserts with `{ onConflict: 'user_id,subject_id,class_type', ignoreDuplicates: true }` — only missing rows are created at zero, existing data untouched.
  - **`src/lib/mbbs/eligibility.js`** — `attendanceGate` problem objects now include `worstType` (the specific class type with the worst attendance). `computeEligibility` `blockers` and `atRisk` strings include the type label so the user sees "Physiology Lecture attendance 72%" not just "Physiology attendance 72%".
  - **`src/lib/mbbs/gateSummary.js`** — `buildGateSummary` names the worst class type in the gate line ("Physiology Lecture attendance 72% — below 75%. Attend every remaining class to recover."). `canMiss` path looks up the specific worst-type row from `attendance` first, falls back to min-scan.
  - **`src/screens/mbbs/Attendance.jsx`** — rewritten: one-time `backfillClassTypes` via `useEffect` + `backfillRan` ref; per-subject type list = BMDC types merged with any existing DB types (not a global list); headline `subjectHeadlinePct` badge in subject card header; subtitle: "75% required in every class type — the gate binds on the lowest category."
- Migration: **none** (`mbbs_attendance` already has `UNIQUE(user_id, subject_id, class_type)`).
- Build size: `npm run build` clean, 1m11s. No new lazy chunks. Exam/USM byte-unaffected.
- Deviations: none — implementation matches the session spec exactly.
- QA'd: `/mbbs/attendance` renders per-class-type rows (BMDC types backfilled at zero for types not yet logged); Anatomy headline "78% OVERALL" (bound by Dissection 78%); Physiology headline "72% OVERALL" (bound by Lecture 72%); top gate lines name the specific type and tone correctly (danger for Lecture 72%, caution for others); zero console errors. Today cockpit one-tap attendance was already writing to `cls.class_type` from `mbbs_classes` rows — no change needed; verified by code trace.

## Session R1 — Corrections: honours 75%, GPA scale, Phase-1 lockout, 12-year window (2026-06-17)
_Corresponds to 06_MBBS_BUILD_SESSIONS.md Session R1. Four BMDC correctness fixes; no migration._
- Built:
  - **`src/components/mbbs/GradeBadge.jsx`** (NEW) — inline BMDC grade pill using `gradeFor(pct)` from `mbbsBmdcCurriculum.js`; shows letter + GP (e.g. "A · 3.75"). `compact=true` renders letter only in mono. CSS token colours only (no hex). `src/components/mbbs/index.js` barrel created.
  - **`src/lib/mbbs/eligibility.js`** — `computeEligibility` gained a `phase1_locked` early-return at the top (before any gate math) when `config?.phase === '1st' && config?.supplementary?.phase1_lockout === true`; returns `{ status:'phase1_locked', hasData:true, gates: all-incomplete, blockers:['First Prof must be cleared before Phase 2…'], atRisk:[] }`. `eligibilityVerdict` gained `phase1_locked` case. `STATUS_STYLE` gained `phase1_locked` (red tokens, "Phase 1 — locked").
  - **`src/screens/mbbs/MbbsDashboard.jsx`** — added `phase1_locked: Lock` to `STATUS_ICON`; `<GradeBadge pct={pct} />` alongside each formative per-subject detail line in the formative expand panel; two-track split card gated on `!config?.supplementary?.phase1_lockout`.
  - **`src/screens/mbbs/MbbsSupplementary.jsx`** — `isPhase1Locked` branch added before the dual-phase return: a simplified single-track view (red "First Prof — repeat track" header, BMDC rule note, re-sitting subjects, road-ahead timeline).
  - **`src/lib/mbbs/supplementaryPlan.js`** — `buildWhatIfTimeline` reads `config?.admission_date` (ISO date in `mbbs_config` JSONB, no migration) and computes the horizon as `admDate + 12 years` (label "12-year BMDC completion window"). Falls back to `today + 12 months` when `admission_date` is null.
  - **`src/screens/Settings.jsx`** — MBBS Daily Routine tab (mbbsTabContent[0]) gains a "Programme" `<Card2>` with a `type="date"` input for "Date of admission" (saves `mbbs_config.admission_date` on blur via `updateSettings`; caption "Bounds the 12-year BMDC completion window in your 'What if I fail?' timeline").
- Migration: **none** (`admission_date` lives in the existing `mbbs_config` JSONB).
- Build size: `MbbsDashboard` 43.46 kB / 11.17 kB gz; Settings 155.47 kB / 40.13 kB gz. `npm run build` clean, 28.78s.
- Deviations: `GradeBadge` not yet mounted in `Formatives.jsx` or `ItemsCards.jsx` — Dashboard formative expand is the first touchpoint; other screens can adopt incrementally.
- QA'd: build clean; `phase1_locked` early-return verified by logic trace (no gate math runs, all gates 'incomplete'); `buildWhatIfTimeline` falls back correctly when `admission_date` null; Settings field renders in MBBS Daily Routine tab.

## Session R3 — Onboarding overhaul: seed the real BMDC cards + items (2026-06-17)
_Corresponds to 06_MBBS_BUILD_SESSIONS.md Session R3. The "feels real" payoff — confirming a subject pre-loads its genuine BMDC cards + verbatim core items, all editable. No migration._
- Built:
  - **`src/lib/mbbs/mbbsConstants.js` `subjectsForPhase(phaseId)`** — rewritten to build the wizard subject state from the BMDC spine (`getBmdcSubjects` from `mbbsBmdcCurriculum.js`) rather than the legacy flat item-count + card-name list. New shape `{ name, total_marks, color_key, expanded, *_confidence, cards:[{ name, type, term, defaultItemMark, expanded, items:[{ number, name, maxMarks, cleared }] }] }`; all BMDC defaults `national_confirmed`. `getBmdcSubjects` added to the existing import. `MBBS_PHASES` retained (still feeds `componentsForPhase`/`getPhase` + `getSubjectTopics` fallback).
  - **`src/screens/Onboarding/mbbs/MbbsStepSubjects.jsx`** — rewritten to a 3-level nested editor (subject → cards → items). `CardBlock` (subject-colour left accent, chevron, inline card-name edit, "{cleared}/{total}" mono badge, remove, "Add card") expands to `ItemRow`s (round cleared toggle = current progress, inline item-name edit, 64px max-marks number input, remove, "Add an item"). Confidence note per subject. No hex (var tokens only), no motion, no exclamation marks. `subjectsStepValid` unchanged. `onSkip` seeds BMDC defaults silently.
  - **`src/screens/Onboarding/MbbsOnboarding.jsx`** — save routine updated (one ordered save, `user_settings` flip LAST, unchanged): cards insert uses `card.name`; items insert writes the genuine BMDC items per card preserving `item_number` + `max_marks` + `topic_name` (verbatim) + cleared status; NEW step 4b seeds `mbbs_attendance` rows per subject × BMDC class type (`getClassTypes`) at zero via `upsert(ignoreDuplicates:true)`; summary `itemsToClear` counts un-cleared items across cards. Dropped the now-unused `MBBS_PHASES` import; added `getClassTypes`.
- Migration: **none**.
- Term↔card mapping: deviation — `card.term` is carried in wizard state but not persisted (`mbbs_cards.term_id` is a FK to `mbbs_terms`, which don't exist at onboarding; R3 ships no migration). Faithful BMDC card names let R5 re-derive each card's term via `getTermCardMap(phase)`.
- Build size: `npm run build` clean, 6.4s. `mbbsBmdcCurriculum` chunk 46.0 kB / 15.41 kB gz (MBBS-only). Exam/USM byte-unaffected.
- Deviations: (1) term mapping above. (2) Caught + fixed a 48px max-marks input clipping "10" → widened to 64px during QA.
- QA'd live (preview, fresh throwaway MBBS account, dark + 375px): Step 3 renders Anatomy 9 cards/91 items, Physiology 8/71, Biochemistry 6/31 (verbatim BMDC counts); cards expand to verbatim items (Thorax 8 items), max-marks 10, cleared toggle updates badges; no 375px overflow. Completing the wizard saved correctly — Items & Cards "1 of 193 items cleared across 3 subjects" with verbatim `topic_name`; `/mbbs/attendance` shows 4 seeded BMDC class types per subject at 0/0; dashboard eligibility computes from it; zero console errors.

### Redesign Session R4 — The Continuous Assessment Card (digital twin) (2026-06-17, `main`)
The centrepiece view: the Cards tab in `ItemsCards.jsx` redesigned to mirror the physical BMDC continuous-assessment card (R5 decision). Only MBBS-only files touched → Exam/USM byte-unaffected.
- **Migration `migrations/mbbs_R01_card_assessment.sql` (FILE ONLY — run manually in Supabase; idempotent, additive nullable columns):** `mbbs_items.exam_date date` (the "Date of examination" column, distinct from `date_cleared`) + `mbbs_items.remarks text` ("Remarks / signature"); `mbbs_cards.attendance_in_card int` + `mbbs_cards.attendance_out_of int` (the per-card "attendance in practical classes / out of" line). Owner-only RLS already covers both tables; no new table, no RLS change. **The client degrades gracefully until it runs** (see below).
- **`src/screens/mbbs/ItemsCards.jsx` — Cards tab rewrite.** Each expanded card now renders the paper card as a real `<table>` (in an `overflow-x:auto` wrapper, `min-width:560px`) with columns **Item · Full · Marks · Date of exam · Remarks/Sign. · Grade**:
  - `ItemAssessmentRow` — per-item inline-editable cells (`max_marks`/`marks`/`exam_date`/`remarks`), each persisting on blur via `handlePatchItem` → `updateItem` (one field at a time, so marks/status always save even pre-migration). The item name + status badge is a `no-print` button that opens the existing `ItemDrawer` for full edit (topic/status/examiner/notes/delete/SR). Live `<GradeBadge compact>` in the Grade column from marks/max.
  - Card header gains: `Next due` (first pending/scheduled item), a **caution-only** amber pace note (`getItemPace`, shown only behind/critical), the card-completion result badge (Passed/Failed), and a card-aggregate `<GradeBadge>` (credit-weighted mean of recorded item marks via `cardMarksAggregate`).
  - Expanded body: the **attendance line** (`attendance_in_card` / `attendance_out_of` number inputs persisting via `handlePatchCard` → `updateCard`, with a ≥75/60 zone badge) + a **Print** button; the assessment table; "Add item" (kept); the **card completion exam** editor (date input + Pass/Fail toggle → `updateCard`); the topic checklist (kept).
- **`ItemDrawer`** extended with `DATE OF EXAMINATION` (exam_date) + `REMARKS / SIGNATURE` (remarks) fields and a live GradeBadge beside the marks; `handleSaveItem` retries without `exam_date`/`remarks` on a missing-column error so the rest still saves.
- **Print artefact.** `PrintableCard` renders the selected card off-screen (`position:fixed; left:-99999`) as a clean static table (#/Item/Full/Obtained/Date/Remarks/Grade + attendance line + completion result + card grade). A scoped `CARD_PRINT_CSS` (`@media print` visibility trick) shows only `.cac-print-root`; `printCard` state + a `useEffect` drive `window.print()` and clear on `afterprint`. `window.print()` = the PDF.
- **Graceful degradation:** `isMissingColumn(err)` (codes `42703`/`PGRST204` or "column … does not exist") flips `cacAvailable=false` → an amber banner ("Run `mbbs_R01_card_assessment.sql` … Marks and status save without it"); marks/status/completion never depend on the new columns.
- **`useMbbsCards.updateCard`** (already exported) now consumed by ItemsCards; `useMbbsItems.updateItem` returns `{error}` (unchanged) used for the missing-column probe.
- Build: `npm run build` clean (6.8s). `ItemsCards` 34.26 kB / 9.27 kB gz (own lazy chunk). Exam/USM unaffected.
- QA'd live (preview, seeded `istiaqmcp@gmail.com` 1st-Prof, dark + 375px): Cards tab → Thorax expands to the 6-column assessment table (Full=10 BMDC default, 8 verbatim items); entering 8/10 shows an A+ green grade band; attendance line + Print + completion Pass/Fail + topic checklist all render; Print produces the off-screen "Continuous Assessment Card — Anatomy — Thorax" artefact with 8 rows and fires `window.print()`; dark mode correct; table scrolls within its container at 375px (no page overflow); zero console errors.
- Migration run status: **`mbbs_R01_card_assessment.sql` MUST be run manually in Supabase** for exam_date/remarks/attendance to persist; the client degrades until then.

### Redesign Session R5 — Assessment model correction: embedded formative + term gates + GPA (2026-06-17, `main`)
Correct the formative maths and make it phase-aware + BMDC-framed. **No migration** (extends the v2.0 term model from Session 7). Only MBBS-only files touched → Exam/USM byte-unaffected. The Session-7 work already built the term-gate model (`bmdcFormativeMark`, `mbbs_terms`/`mbbs_term_results`) and made `eligibility.js` phase-aware; R5 layers on the embedded-10% framing, GPA on every result, the direct-formative-figure override, and phase-aware "marks needed".
- **`src/lib/mbbs/formativeHelpers.js`** — now imports `WRITTEN_COMPOSITION` + `gradeFor` from `mbbsBmdcCurriculum.js` (curriculum is import-free → no cycle). New: `WRITTEN_FORMATIVE_PCT` (=10), `embeddedContribution(pct)` → `{ marks: round1(pct/100×10), of:10 }` (e.g. 60% → 6 of 10), and `subjectFormativePct({ formatives, termResults, attPct, phase, override })` — **the phase-aware resolver**: override → (1st Prof with terms) BMDC term mark/20→% → weighted average; returns `{ pct, source:'override'|'term'|'weighted', model, grade: gradeFor(pct) }`. All Session-7 exports unchanged.
- **`src/lib/mbbs/eligibility.js`** — the formative gate now honours a directly-recorded college figure: `overrideFor(subjectId)` reads `config.formative_overrides[subjectId].pct` and wins in the weighted-average path (other phases + the 1st-Prof-no-terms fallback). The 1st-Prof term hard-gates are unchanged (term-pass is the binding constraint there). Omitting overrides is byte-identical to before.
- **`src/screens/mbbs/Formatives.jsx`** — reframed end to end:
  - Header subtitle → "Your in-course mark — ≥60% required to sit your prof"; a soft-blue **embedded-model explainer** card ("Formative isn't a separate exam … carried into every written paper as 10% … ≥60% to be eligible{, for 1st Prof all three term exams are hard 60% gates}. Every result shows its BMDC grade.").
  - **GPA everywhere** via `<GradeBadge>`: on each logged `FormativeRow`, the FormativeModal live %, every per-term cell (compact), the TermSubjectCard formative mark + the SubjectFormativeCard headline.
  - **SubjectFormativeCard rebuilt phase-aware**: headline now shows the canonical formative % (from `subjectFormativePct`) + GradeBadge + a source label ("recorded directly" / "from N term results + attendance" / "weighted average of N assessments") + an `EmbeddedLine` ("Carried into every written paper as 10% — that's X of 10 formative marks") + the eligible/below-60 gate badge.
  - **Direct-formative override** (R6/R5 "single figure" rule): an inline `OverrideEditor` (% 0–100 + optional note, live GradeBadge, Save/Clear/Cancel) reachable from each card's expanded actions; persists to **`mbbs_config.formative_overrides[subjectId] = { pct, note }`** via `updateSettings` (no migration — jsonb merge, spread-preserves other config keys). When set, the card is badged purple "Recorded" and the override drives both the display and the eligibility verdict.
  - **Marks-needed is phase-aware**: weighted path → existing `recoveryLine`; term path → "{N} term(s) below 60% — each must be cleared (re-sit ≥60%) before your prof"; override path → "recorded formative below the 60% gate — check the figure with your department".
  - Lifted `useUserSettings`/`useMbbsTerms`/`attPctBySubject` to the main component and passed down (TermResultsSection takes `termsApi`/`attPctBySubject` props — no double-fetch); the Session-7 TermResultsSection/TermResultModal/`bmdcFormativeMark` math is unchanged, now with GradeBadge + EmbeddedLine added.
- Migration: **none**. The `formative_overrides` map lives in the existing `mbbs_config` jsonb.
- Build: `npm run build` clean (6.5s). Exam/USM unaffected.
- QA'd live (preview, seeded `istiaqmcp@gmail.com` 1st-Prof): Formatives renders the embedded-10% explainer, the term-results section (3 subjects, FIRST/SECOND/THIRD cells) and the phase-aware subject cards; exercised the override end-to-end — entered 72% → GradeBadge "A- · 3.50", saved → headline "72% formative · A- · 3.50 · Eligible · Recorded · recorded directly · Carried into every written paper as 10% — that's 7.2 of 10 formative marks", then Cleared → restored to "No data" (QA account left untouched). `/mbbs` dashboard eligibility verdict still computes ("At risk — Item pace slipping"); zero console errors.

### Redesign Session R6 — Two-board oral (SOE) in the Exam Period System (2026-06-17, `main`)
The oral/viva component for multi-board subjects (Anatomy Board I + II, Physiology Board I + II per BMDC) now has explicit scheduling support. The `sequence` column on `mbbs_prof_schedule` already existed; the UNIQUE constraint `(user_id, subject_id, component, exam_date)` already allows two viva rows per subject. R6 surfaces this in the UI. **No migration.** Only MBBS-only files touched → Exam/USM byte-unaffected.
- **`src/hooks/mbbs/useMbbsProfSchedule.js`** — `vivaByBoard(subjectId)` selector added: filters `schedule` by `subject_id` + `component === 'viva'`, returns `{ board1 (sequence=1), board2 (sequence=2), unsequenced }`. Exported in the hook's return object.
- **`src/screens/mbbs/MbbsExamSchedule.jsx`** — `ExamDateModal` imports `getBoards` from `mbbsBmdcCurriculum.js`. When `getBoards(phase, subjectName).count >= 2` AND `component === 'viva'`, the modal renders Board I / Board II selector buttons above the date picker; the chosen sequence is passed to `addEvent`. Single-board subjects and non-viva components pass `sequence: null` (unchanged). Schedule list rows display `<Badge2 variant="blue">Board I/II</Badge2>` when `sequence` is set.
- **`src/screens/mbbs/MbbsExamPrep.jsx`** — `VivaSurfacing` gains `boardTopics` prop (string[] | null). When focus has `sequence` set, calls `getBoards(phase, subjectName).boards[sequence-1]?.topics` and passes it as `boardTopics` to filter the viva question pool by that board's topic list. Falls back to the full subject pool when the filtered set is empty (best-effort). Focus card description shows the board label + topics when applicable.
- Build: `npm run build` clean. Exam/USM unaffected.

### Redesign Session R7 — Integrated Teaching tracker + generic-topics checklist (2026-06-17, `main`)
BMDC mandates attended IT sessions (1st Prof 12, 2nd 7, 3rd 10, Final 73) and completion of a generic-topics list. R7 adds `mbbs_it_sessions` and a tracking screen at `/mbbs/integrated-teaching`, plus an IT signal card in the Formatives screen. **`migrations/mbbs_R02_integrated_teaching.sql` is FILE ONLY — run manually in Supabase; client degrades gracefully.** Only MBBS-only files touched → Exam/USM byte-unaffected.
- **Migration `migrations/mbbs_R02_integrated_teaching.sql`** (FILE ONLY, idempotent): `mbbs_it_sessions` table — `phase CHECK('1st'|'2nd'|'3rd'|'final')`, `kind CHECK('integrated'|'generic_topic')`, `topic text NOT NULL`, `attended bool default false`, `summary_submitted bool default false`, `date date`, `note text`. UNIQUE(user_id, phase, kind, topic). RLS owner_all. `set_updated_at` trigger. Index on (user_id, phase).
- **`migrations/core_feature_flags.sql`** — Session R7 block appended: seeds `mbbs.integrated_teaching` (free, non-floor, sort_order 275) `ON CONFLICT DO NOTHING`.
- **`src/hooks/mbbs/useMbbsItSessions.js`** (NEW, barrel-exported): `useMbbsItSessions(phase)` — fetches rows for user+phase; auto-seeds on first load when available and empty: integrated rows = "IT Session 1"…"IT Session N" (N from `getItSessions(phase).count`), generic_topic rows from `getGenericTopics(phase)` — idempotent upsert `ignoreDuplicates:true`. Returns `rows`, `integrated`, `genericTopicRows`, `available`, `loading`, `integratedTarget`, `integratedDone`, `genericDone`, `toggleAttended`, `toggleSummary`, `updateDate`, `refetch`. Degrades gracefully on table-missing errors.
- **`src/screens/mbbs/MbbsIntegratedTeaching.jsx`** (NEW, own lazy chunk) at `/mbbs/integrated-teaching`: phase label header, amber degrade banner when unrun, two sections — **IT Sessions** (numbered attendance + summary_submitted toggles, progress bar) and **Generic Topics** (collapsible, same toggle pattern). Empty state when both targets are 0 and table available.
- **`src/screens/mbbs/Formatives.jsx`** — imports and calls `useMbbsItSessions(phase)`; renders a compact read-only IT signal card between the TermResultsSection and subject cards when `itSessions.available && itSessions.integratedTarget > 0` ("Integrated Teaching Sessions N/T attended" + link to the tracker).
- **Wiring:** `App.jsx` lazy + routeDef. `Sidebar.jsx` MBBS_NAV gains "IT Sessions" (BookOpen). `BottomTabBar.jsx` MBBS_MORE_ITEMS gains "IT Sessions" (BookOpen). `src/lib/mbbsFeatures.js` + `src/hooks/mbbs/index.js` barrel updated.
- Build: `npm run build` clean (4210 modules, 7.28s). `MbbsIntegratedTeaching` 6.55 kB / 2.18 kB gz; `useMbbsItSessions` 2.40 kB / 1.00 kB gz (own lazy chunks). Exam/USM unaffected.


### Redesign Session R8 — Field placements (COME / forensic) + Phase-1 supplementary branch (2026-06-17, `main`)
Two BMDC-mirror gaps. **No migration** (existing `mbbs_attendance` + `mbbs_config.field_reports` jsonb); the only SQL is a feature-flag registry append (degrades to enabled-by-default). Only MBBS-only files touched → Exam/USM byte-unaffected.
- **Goal A — field placements.** COME (30 days) + Forensic (16 days) modelled as a distinct activity via `getFieldPlacements(phase, subjectName)` (`mbbsBmdcCurriculum.js` → `[{key,label,days,report}]`).
  - **`src/screens/mbbs/MbbsFieldPlacements.jsx`** (NEW, own lazy chunk) at `/mbbs/field-placements` (flag `mbbs.field_placements`, FREE; contextual — no persistent nav entry, reached from Attendance, like MbbsExamPrep/MbbsSupplementary). Per-placement card: required-days badge, attendance bar (days attended/required), one-tap Day done/Missed (reuses `useMbbsAttendance.logAttended`/`logMissed`/`setTotals` with `class_type = placement.label` → counts toward the 75% worst-category gate automatically), report-deliverable checkbox + due date, "days you can miss" line. Top Report targets card lists dated unsubmitted reports. Empty state for phases without placements (1st Prof).
  - Report checklist persists to `mbbs_config.field_reports` (jsonb, `Array.isArray()` guard, merged via `updateSettings`). No table.
  - **`src/screens/mbbs/Attendance.jsx`** — contextual "Field placements →" link card under the header when `subjects.some(s => getFieldPlacements(phase, s.name).length > 0)`.
- **Goal B — Phase-1 supplementary branch.** R1 already shipped the `phase1_locked` verdict + single-track `isPhase1Locked` view. R8 adds the failed-subject revision plan (`RevisionPlanCard`, free) between the re-sitting card and road-ahead timeline in the locked view; the timeline is already 12-year-bounded (`buildWhatIfTimeline` reads `admission_date`). 2nd-Prof-onward failures keep the dual-phase view.
- **Flag/wiring:** `mbbsFeatures.js` `mbbs.field_placements` (free); `migrations/core_feature_flags.sql` idempotent R8 INSERT (sort 280, **run manually**, degrades to enabled until then); `App.jsx` lazy import + routeDef.
- **Drive-by fix (R7 regression):** `Formatives.jsx` TDZ crash — `useMbbsItSessions(phase)` called before `const phase` was declared, hard-crashing the Formatives screen in MBBS mode. Moved `phase`/`overrides` declarations above the `useMbbsItSessions(phase)` call (hook order unchanged).
- **Migration:** none (feature-flag append only). **Run status:** the `mbbs.field_placements` row in `core_feature_flags.sql` is optional-until-needed; client enables by default until run.
- **Build:** `npm run build` clean (7.5s). `MbbsFieldPlacements` 11.3 kB own lazy chunk. **QA** (preview, 1st-Prof seed): dashboard renders; `/mbbs/field-placements` shows the 1st-Prof empty state; `/mbbs/formatives` renders post-fix (no crash); no new console errors. Exam/USM unaffected.

### Redesign Session R9 — Pass-probability recalibration (2026-06-17, `main`)
Recalibrate the v2.0 projection's INPUTS to the corrected gates (R11 — keep architecture, fix inputs). **No migration.** Only MBBS-only files touched → Exam/USM byte-unaffected.
- **`src/lib/mbbs/passProjection.js`** `subjectGateScore` recalibrated: (1) worst-category attendance % now passed into `bmdcFormativeMark(termResults, worstAtt)` so the BMDC formative attendance component is computed (was 0); (2) term-pass status — a failing 1st-Prof term (`m.termsFailing > 0`) caps the subject's formative readiness at ≤15 (and contributes 15 when no mark is available); (3) card-completion pace added as a gate signal (cleared cards vs total via `getItemPace`, real BMDC card counts) alongside item pace. Worst-category attendance (R2), real BMDC item/card counts (R0/R3), topic+QB coverage already in place from v2.0 S8. MCQ is not a layer → flag-off contributes nothing by construction.
- **`src/screens/mbbs/MbbsDashboard.jsx`** — projection surfaced on the dashboard (was Analytics-only): adds `useMbbsTopicCompletion` + `useMbbsQuestionBank(config)` + `getCompliance` and computes the projection with the same inputs as MbbsAnalytics (matching readiness index). Compact card (verdict badge, readiness index 0–100, present-layer mini-bars, message, "Full breakdown →") wrapped in `<ProGate feature="mbbs.pass_projection">` after the four gate widgets. All projection hooks/memos above the early returns (Rules-of-Hooks safe).
- **Migration:** none. **Build:** `npm run build` clean. `MbbsDashboard` 45.8 kB / 11.77 kB gz. **QA** (1st-Prof seed): dashboard projection renders "AT RISK · 31 · readiness index (0–100)" with the weakest-subject (Physiology) message; cold reload clean (no hooks regression); no new console errors. Exam/USM unaffected.


---
<!-- docnav-related -->
### Related docs
- [StudyRise — MBBS Bangladesh Module · Document Index (Redesign R3.0)](00_MBBS_INDEX.md)
- [BMDC MBBS Curriculum 2021 — Reference & Seed Authority](01_BMDC_CURRICULUM_REFERENCE.md)
- [StudyRise — MBBS Bangladesh Module · Product Specification (R3.0)](02_MBBS_PRODUCT_SPEC.md)
- [MBBS Bangladesh Module — Current State Ledger (R3.0)](03_MBBS_CURRENT_STATE.md)
- [MBBS Bangladesh Module — Data Model (R3.0)](04_MBBS_DATA_MODEL.md)
- [MBBS Bangladesh Module — Decision Log (R3.0)](05_MBBS_DECISIONS.md)
- [MBBS Bangladesh Module — Build Sessions (R3.0)](06_MBBS_BUILD_SESSIONS.md)
- [BMDC Curriculum (original) → moved (de-duplicated)](Original%20BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
