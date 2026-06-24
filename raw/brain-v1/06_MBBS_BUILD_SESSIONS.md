# MBBS Bangladesh Module — Build Sessions (R3.0)

<!-- docnav -->
> **Docs ·** folder map [00_MBBS_INDEX.md](00_MBBS_INDEX.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Version 3.0 — June 2026. Self-contained Claude Code build prompts, in dependency order. Paste **one session at a time** into Claude Code on the `main` branch and let it run end to end. These build the BMDC-faithful redesign on top of the deployed v2.0 module._

**Before Session R0, read once and keep open:**
- `01_BMDC_CURRICULUM_REFERENCE.md` — the BMDC truth + the seed structure. **The spine.**
- `02_MBBS_PRODUCT_SPEC.md` — what each feature is and why.
- `03_MBBS_CURRENT_STATE.md` — what's deployed; what stays / changes.
- `04_MBBS_DATA_MODEL.md` — the migration contract.
- `05_MBBS_DECISIONS.md` — the binding answers (referenced as `Rn`).
- `CLAUDE.md` (repo root) — engineering conventions, the `ui/` library, `animations.js`, mode derivation, the built MBBS stack, deploy commands. **Authoritative on conventions.**
- `BRAND_KIT.md`, `Deployment_Architecture.md`.
- The curriculum file `docs/curriculum/BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md` (put it there first) — R0 reads verbatim item text from it.

---

## Standing Protocol (every session — do not skip)

**Build bar (while working):**
- `src/components/ui/` library + `var(--token)` only — **no hardcoded hex**.
- Framer Motion only via `src/lib/animations.js` + `useReducedMotion()` — no one-off inline animation objects.
- Dark mode correct; mobile-first to a **375px** floor.
- Voice: direct, honest, **no exclamation marks**; status-colour discipline (green safe/done, amber caution, red only for genuine danger); subject colour via the palette key → `getUnitColor`, never hex.
- **Every new screen is its own lazy chunk** — Exam/USM users never download MBBS code, run no MBBS fetch.
- **Migrations additive + idempotent only** (`create table if not exists`, `add column if not exists`); existing tables touched only via nullable columns; engines **extended, not forked**; no destructive change to a shipped table.
- **RLS owner-only** on every new `mbbs_` table; the v2.0 shared-read/admin-write exceptions are unchanged (R3.0 adds none).
- **Every feature flag-registered** in `app_feature_flags`; ethical-floor features locked free.
- Client **degrades gracefully** if a migration hasn't run (`42703 / PGRST204 / 42P01 / PGRST205` → fallback).
- **Seeded BMDC content is always editable by the student.** Pre-load the truth; let reality diverge.

**Close-out (last thing, in order):**
1. **Clean build.** `npm run build` from repo root, zero errors. (Admin-touching sessions also `cd studyrise-admin && npm run build`.)
2. **QA.** Verify the "Done when" list in the logged-in preview on an MBBS test account. Check: route renders, dark mode correct, 375px holds, no new console errors, **Exam/USM byte-unaffected**. Test a **cold/full reload** (not just SPA nav) to catch Rules-of-Hooks regressions.
3. **Update `CLAUDE.md`** — append under the MBBS area exactly what shipped (tables, hooks, libs, screens, routes, nav, deviations) in the existing dense style.
4. **Update `07_MBBS_BUILD_LOG.md`** — dated entry: built, migration name + run status, build size, QA result, deviations.
5. **Commit to `main`.** `git add -A && git commit -m "<msg>" && git push origin main` (auto-deploys both Vercel projects).
6. **Deploy.** Main app `npx vercel --prod --yes` from repo root; admin (admin-touching sessions, from repo root) with the `VERCEL_PROJECT_ID`/`VERCEL_ORG_ID` prefix in `CLAUDE.md`.

**Migrations are run by the user manually in Supabase.** Each session that ships SQL must (a) write the `.sql` into `migrations/`, (b) make the client degrade gracefully, (c) state in its output + the build log that the SQL must be run.

**When a session and `05_MBBS_DECISIONS.md` disagree, the decision log wins.**

---

## Session index

| # | Title | Model | Migration | Depends on |
|---|---|---|---|---|
| R0 | BMDC curriculum constants — the seed spine | Opus 4.8 | none (constant) | — |
| R1 | Corrections — honours 75%, GPA scale, Phase-1 lockout, 12-yr window | Sonnet | none | R0 |
| R2 | Per-class-type attendance | Sonnet | none (seed via existing table) | R0 |
| R3 | Onboarding overhaul — seed real BMDC cards + items | Opus 4.8 | none | R0 |
| R4 | Continuous Assessment Card — the digital twin | Opus 4.8 | `mbbs_R01_card_assessment.sql` | R0, R3 |
| R5 | Assessment model correction — embedded formative + term gates + GPA | Opus 4.8 | none | R0, R1 |
| R6 | Two-board oral in the Exam Period System | Sonnet | none | R0 |
| R7 | Integrated-teaching tracker + generic-topics checklist | Sonnet | `mbbs_R02_integrated_teaching.sql` | R0 |
| R8 | Field placements (COME / mortuary / court) + Phase-1 supplementary branch | Opus 4.8 | none | R0, R1, R2 |
| R9 | Pass-probability recalibration | Opus 4.8 | none | R2, R5 |
| — | Clinical posting cards → privacy + case log → OSPE | Opus 4.8 | `mbbs_R03/04/05` | deferred |
| — | Internship (1-mo/UHC/2-yr) + career + community/templates | Opus 4.8 / Sonnet | `mbbs_R07` | deferred |
| — | Resource library | Sonnet | `mbbs_R06` | deferred |

> **Order rationale:** R0 is the spine — nothing else is correct without it, so it goes first. R1 (cheap correctness fixes) builds trust fast. R2 and R3 prepare the mirror; R4 is the centrepiece and needs R3's seeded data. R5 corrects the marks maths the Card view shows. R6–R8 complete the BMDC mirror's edges. R9 recalibrates last, once the gates it reads are correct. Reorder R6/R7/R8 to taste while dependencies hold.

---

# SESSION R0 — BMDC curriculum constants: the seed spine
**Model: Opus 4.8.** Content-heavy, transcription-precise, no migration. Everything downstream reads this.

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` (all of it, especially §4 + §10) · `05_MBBS_DECISIONS.md` R1 · `03_MBBS_CURRENT_STATE.md` §2 · the existing `src/lib/mbbs/mbbsConstants.js` (`MBBS_PHASES`, `_CARD_TOPICS_MAP`, `MBBS_COMPONENTS`) · the curriculum file `docs/curriculum/BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md`.

**Goal.** Build `src/lib/mbbs/mbbsBmdcCurriculum.js` — the single canonical BMDC 2021 structure that all redesign features read. Transcribe item text verbatim from the curriculum file; do not paraphrase.

**Shape (export a frozen object `MBBS_BMDC` keyed by phase, plus helper selectors):**
- Per **phase**: id (`'1st'|'2nd'|'3rd'|'final'`), label, duration, total marks, the GPA scale (shared), eligibility constants (attendance 75, formative 60, pass 60, term-gate boolean, phase-1-lockout boolean, completion-years 12), the class-type list, the integrated-teaching topic list, the generic-medical-humanities topic list.
- Per **subject** (within a phase): name, total marks, colour palette key, component breakdown (`{written, soe, practical, clinical?, formative}` from §1's exact tables), written composition (`{formativePct:10, mcqPct:20, sbaShare:50, mtfShare:50, saqSeqPct:70, saqShare:75, seqShare:25}`), oral boards (`{count, boards:[{label, topics:[…]}]}` where BMDC defines them — Anatomy, Physiology), the term↔card map (1st Prof), field placements (`[{key,label,days,report}]` for COME + Forensic).
- Per **card** (within a subject): name, type (`'dissection'|'histology'|'system'|'topic'|'item_card'|'clinical_posting'`), term (1st Prof), default item mark, and the **BMDC core item list** (verbatim — `[{number, name, maxMarks}]`).
- Helper selectors: `getBmdcSubjects(phase)`, `getBmdcCards(phase, subjectName)`, `getBmdcItems(phase, subjectName, cardName)`, `getClassTypes(phase, subjectName)`, `gradeFor(pct)` → `{letter, gp}`, `getBoards(phase, subjectName)`, `getTermCardMap(phase)`, `getItSessions(phase)`, `getGenericTopics(phase)`, `getFieldPlacements(phase, subjectName)`.

**Transcription scope (do this carefully — it is the point of the session):**
- **1st Prof in full:** Anatomy (6 regional cards: Thorax 8, Superior Extremity 10, Abdomen 16, Inferior Extremity 10, Head & Neck, CNS & Eyeball — items verbatim from Tables 57/60/63/66/69/72 + 3 histology cards from Tables 47–49; term map from Table 54/55; boards I/II topic split from Table 51). Physiology (8 system cards — items verbatim from the Continuous Assessment Card tables; boards I/II = 50/50). Biochemistry (6 cards — items verbatim).
- **2nd/3rd Prof structure:** Pharmacology, Forensic (cards/items + field visits), Community Medicine (+ COME 30-day), Pathology (oral-box themes), Microbiology (2 item cards) — transcribe the card names and as many core items as the curriculum lists; where the curriculum gives a topic list rather than a numbered item card, encode it as `type:'topic'` items.
- **Final Prof:** subjects + mark tables + the clinical posting card *shape* (leave the per-posting item lists for the deferred clinical session, but encode the board structure from Table 5930).
- **GPA scale** (Table 13), **eligibility constants**, **IT topic lists** (per phase), **generic-humanities topics** (per phase), **field placements**.

**Then:** replace `_CARD_TOPICS_MAP` consumers to read `getBmdcItems(...)` (keep `_CARD_TOPICS_MAP` exported as a thin shim that delegates, so nothing breaks mid-migration), and re-point the topic-completion seed + QB contextual surfacing to the BMDC topic lists.

**Done when:** `mbbsBmdcCurriculum.js` exists, frozen, with 1st-Prof cards/items transcribed verbatim and 2nd/3rd/final structure encoded; the helper selectors return correct data for every phase/subject; existing screens still build and render (the shim keeps `_CARD_TOPICS_MAP` working); `npm run build` clean; Exam/USM unaffected. No migration. Close-out protocol.

---

# SESSION R1 — Corrections: honours 75%, GPA scale, Phase-1 lockout, 12-year window
**Model: Sonnet.** Small, high-trust correctness fixes. No migration.

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §2 · `05_MBBS_DECISIONS.md` R2, R8 · `CLAUDE.md` — `eligibility.js`, `MbbsDashboard.jsx`, `mbbsConstants.js`, `MbbsSupplementary.jsx`, `mbbs_config`.

**Goal.** Fix the four BMDC facts the v2.0 module got wrong or missed.

- **Honours = A (≥75%).** Remove the 85% threshold everywhere (`mbbsConstants.js`, `eligibility.js`, the dashboard honours/distinction display). Use `gradeFor(pct)` from `mbbsBmdcCurriculum.js`.
- **GPA scale display.** Wherever a mark/percentage shows on the dashboard or status hero, show the letter grade + GP beside it (small, muted). A reusable `<GradeBadge pct={…} />` in `ui/` or `mbbs/` (palette-keyed colour by band, no hex).
- **Phase-1 lockout.** In `eligibility.js`, add the branch: if `phase==='1st'` and a previous First-Prof attempt failed (read `mbbs_config.supplementary.phase1_lockout`), the verdict is a distinct `phase1_locked` state ("Clear First Prof before proceeding to Phase 2") — **not** the dual-phase state. Surface it on the dashboard hero and route the supplementary strip to the single-track view (the full single-track screen is R8; here just the verdict + a holding message).
- **12-year window.** Add `mbbs_config.admission_date` (settings field; default null). Compute years-remaining = 12 − (today − admission_date). Surface only where relevant (the supplementary/"what if I fail?" timeline, and a quiet line in settings). Never a threat.

**Done when:** no 85% remains; every result shows its grade band; a Phase-1 repeat shows the locked verdict (not dual-phase); the 12-year remaining figure computes from `admission_date`; `npm run build` clean; Exam/USM unaffected. No migration. Close-out.

---

# SESSION R2 — Per-class-type attendance
**Model: Sonnet.** Surfaces the real BMDC attendance card. No migration (seed via the existing table).

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §6 · `05_MBBS_DECISIONS.md` R3 · `CLAUDE.md` — `useMbbsAttendance`, `attendanceHelpers.js`, `Attendance.jsx`, `eligibility.js`, `gateSummary.js`, the today cockpit class strip, `mbbs_attendance` (`UNIQUE(user,subject,class_type)`), `getClassTypes` from `mbbsBmdcCurriculum.js`.

**Goal.** Track attendance per BMDC class type; make the binding gate the worst category.

- **Seed class types.** For each subject, ensure attendance rows exist for its BMDC class types (Lecture, Tutorial, Practical, Integrated teaching, + clinical/field in later phases) from `getClassTypes(phase, subject)`. New users seed at onboarding (R3); existing users get a one-time idempotent client back-fill on first load (insert missing `class_type` rows at zero; never overwrite existing counts).
- **`Attendance.jsx`:** show per-class-type rows per subject, each with held/attended/%, its own zone, and "classes you can still miss" for that type. The subject's headline % is the **minimum** category.
- **`eligibility.js` + `attendanceHelpers.js`:** the attendance gate = worst category ≥75% across all types (extend the engine, do not fork). `gateSummary.js` names the worst category in the gate line ("Practical attendance is your risk: 71%").
- **Today cockpit:** the class strip's one-tap attendance writes to the correct `class_type` row.

**Done when:** each subject shows per-type attendance; the gate binds on the worst type; the cockpit logs to the right type; existing users back-fill without data loss; `npm run build` clean; Exam/USM unaffected. No migration. Close-out.

---

# SESSION R3 — Onboarding overhaul: seed the real BMDC cards + items
**Model: Opus 4.8.** The "feels real" payoff. No migration.

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §4 · `05_MBBS_DECISIONS.md` R4 · `02_MBBS_PRODUCT_SPEC.md` Part 12 · `CLAUDE.md` — `MbbsOnboarding.jsx`, the step components in `src/screens/Onboarding/mbbs/`, the ordered save (subjects → cards → items → readiness → classes → user_settings last), `getBmdcCards`/`getBmdcItems`/`getClassTypes`.

**Goal.** When a student confirms a subject, pre-load its genuine BMDC cards with their core items, all editable.

- **Step 3 (Subjects + cards/items):** for each confirmed subject, render its BMDC cards from `getBmdcCards(phase, subject)`, each expandable to its BMDC core items from `getBmdcItems(...)`. The student can rename/add/remove any card or item; defaults are the BMDC truth. Show item max-marks (default 10 where BMDC states it). Optional "enter current progress." "Set up later" still allowed (seeds the BMDC defaults silently).
- **Save:** write the confirmed cards → items (preserving BMDC item_number + max_marks) → seed class types into `mbbs_attendance` (R2 vocabulary) → seed timetable class types into `mbbs_classes` (Step 4). Keep the existing one-ordered-save with `user_settings` flip last.
- **Term map (1st Prof):** tag seeded cards with their BMDC `term_id` association (from `getTermCardMap`) so R5's term model has the mapping.

**Done when:** a new 1st-Prof student finishes onboarding to find their real Anatomy/Physiology/Biochemistry cards and items already present and editable; class types seeded; term↔card mapping tagged; the save order holds; `npm run build` clean; Exam/USM unaffected. No migration. Close-out.

---

# SESSION R4 — The Continuous Assessment Card (digital twin)
**Model: Opus 4.8.** The centrepiece view. Migration: nullable columns.

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §0 + §4 · `05_MBBS_DECISIONS.md` R5 · `04_MBBS_DATA_MODEL.md` R4 · `CLAUDE.md` — `ItemsCards.jsx`, `useMbbsItems`/`useMbbsCards`, `itemHelpers.js`, the `ui/` table/`Card2`/`Badge2`, `gradeFor`.

**Migration: `migrations/mbbs_R01_card_assessment.sql`** — nullable `mbbs_items.exam_date`, `mbbs_items.remarks`; nullable `mbbs_cards.attendance_in_card`, `mbbs_cards.attendance_out_of` (per `04_MBBS_DATA_MODEL.md` R4). Client degrades gracefully if unrun.

**Goal.** Redesign the Cards tab to mirror the paper continuous-assessment card.

- Per card, render a table with the paper card's columns: **Item · Full Marks · Marks Obtained · Date of examination · Remarks/Signature**, plus the card's attendance line ("attendance in practical classes / out of") and the card-completion-exam result.
- Per item: editable marks/max, exam_date, remarks; status (pending/scheduled/cleared/failed); a `<GradeBadge>` from the marks. Items remain add/edit/delete inside the card (kept from v2.0 D1).
- Card header: cleared/total, the next item due, caution-only pace note (does the item/card pace endanger the term?), the card-completion result + its grade.
- Print/PDF: a clean `@media print` rendering of the card (a real artefact the student can show or keep).
- Voice/visuals per the bar; subject colour via palette key.

**Done when:** the Cards tab reads as the BMDC card (item/marks/date/remarks + attendance line + completion result); marks entry shows the grade band; print renders cleanly; nullable columns degrade gracefully if the SQL is unrun; `npm run build` clean; Exam/USM unaffected. Log that `mbbs_R01_card_assessment.sql` must be run. Close-out.

---

# SESSION R5 — Assessment model correction: embedded formative + term gates + GPA
**Model: Opus 4.8.** Correct the marks maths. No migration (extend the v2.0 term model).

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §3 + §5 · `05_MBBS_DECISIONS.md` R2, R6 · `CLAUDE.md` — `formativeHelpers.js`, `Formatives.jsx`, `eligibility.js`, `useMbbsTerms` + `mbbs_terms`/`mbbs_term_results` (`mbbs_005`), `gradeFor`, the written-composition constants from `mbbsBmdcCurriculum.js`.

**Goal.** Make the formative model BMDC-correct and phase-aware.

- **Embedded framing:** present formative as **10% of each written paper** (built from items + cards + term exams + IT weightage + attendance). The Formatives screen explains this plainly. The 60% formative gate is enforced in `eligibility.js`.
- **Phase-aware:** for 1st Prof, the three term exams are hard 60% gates (all-must-pass before the prof) — read `mbbs_terms`/`mbbs_term_results`; surface each term's pass/fail + grade; the gate is "all terms passed AND formative ≥60%." Other phases keep the aggregate model but show the embedded-10% framing.
- **GPA everywhere:** every recorded result (item, card, term, formative, projected) shows `gradeFor(pct)`.
- **"Marks needed":** keep/extend the score-needed calculation so it reflects the embedded model and term gates.
- Where a college gives a single formative figure, let the student record it directly (overrides the computed aggregate, clearly labelled).

**Done when:** the Formatives screen reads as the BMDC model (embedded 10%, term gates for 1st Prof, GPA on every result); the eligibility formative gate is phase-aware; "marks needed" is correct; `npm run build` clean; Exam/USM unaffected. No migration. Close-out.

---

# SESSION R6 — Two-board oral in the Exam Period System
**Model: Sonnet.** No migration (the schedule table already allows it).

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §3 + §4.1/§4.2 · `05_MBBS_DECISIONS.md` R7 · `CLAUDE.md` — `useMbbsProfSchedule` + `mbbs_prof_schedule` (`UNIQUE(user,subject,component,exam_date)`), the exam-period schedule entry UI, the during-exam viva focus, `MbbsExamPrep`, `getBoards` from `mbbsBmdcCurriculum.js`.

**Goal.** Let students schedule and prepare for the two-board oral where BMDC defines it.

- **Schedule entry:** for subjects with `getBoards(...).count === 2` (Anatomy, Physiology, …), let the student enter **two viva dates** (Board I, Board II) — two `component='viva'` rows with different dates (the UNIQUE already permits this). Single-board subjects keep one viva date.
- **During-exam viva focus:** before each board, show that board's **topic split** (from `getBoards`) so the student revises the right regions/systems; surface bank questions for those topics + the lockable personal shortlist.
- **.ics + countdown:** the per-board dates flow into the existing .ics export and the next-exams widget.

**Done when:** a student can enter Board I + Board II dates for Anatomy/Physiology; the during-exam focus shows the correct board topics; both dates appear in the .ics + countdown; `npm run build` clean; Exam/USM unaffected. No migration. Close-out.

---

# SESSION R7 — Integrated-teaching tracker + generic-topics checklist
**Model: Sonnet.** Migration: one small owner-only table.

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §7 · `05_MBBS_DECISIONS.md` R9 · `04_MBBS_DATA_MODEL.md` R7 · `CLAUDE.md` — `Formatives.jsx` (or a new sub-surface), `mbbsFeatures.js`, `getItSessions`/`getGenericTopics`.

**Migration: `migrations/mbbs_R02_integrated_teaching.sql`** — `mbbs_it_sessions` (owner-only, trigger) per `04_MBBS_DATA_MODEL.md` R7. Client degrades gracefully if unrun.

**Goal.** Track the mandatory, mark-bearing integrated-teaching sessions and generic-humanities topics.

- Seed the IT sessions (Phase I 12 · II 7 · III 10 · IV 73) and the 16 generic-humanities topics for the student's phase from `getItSessions`/`getGenericTopics`.
- A tracker (a Formatives sub-tab or a small dedicated screen, own lazy chunk): the student marks each session "attended" + "summary submitted"; show completion N/total.
- Surface the IT contribution as a **read-only signal** in the formative/practical picture (it carries practical marks in Phases II/IV) — it does **not** change the core eligibility verdict math.
- Flag `mbbs.integrated_teaching` (free).

**Done when:** the student sees their phase's IT sessions + generic topics, can mark attended/submitted, sees completion; the signal shows in the formative picture without altering the verdict; `npm run build` clean; Exam/USM unaffected. Log that `mbbs_R02_integrated_teaching.sql` must be run. Close-out.

---

# SESSION R8 — Field placements + the Phase-1 supplementary branch
**Model: Opus 4.8.** No migration (existing tables + jsonb). Two related BMDC-mirror gaps.

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §7 + §2 · `05_MBBS_DECISIONS.md` R10, R8 · `04_MBBS_DATA_MODEL.md` R8 · `CLAUDE.md` — `Timetable.jsx`, `mbbs_classes`/`mbbs_attendance`, `MbbsSupplementary.jsx` + `supplementaryPlan.js`, `mbbs_config` (`field_reports`, `supplementary.phase1_lockout`, `admission_date`), `getFieldPlacements`.

**Goal A — field placements.** Model COME (30 days) and Forensic visits (16 days) as a distinct activity type.
- A field-placement activity kind in the timetable/attendance, tagged via the BMDC keys (`come_day_visit`/`come_rfst`/`come_study_tour`/`forensic_mortuary`/`forensic_court`). Counts toward 75% and practical.
- The required **report deliverables** as a checklist in `mbbs_config.field_reports` (jsonb, `Array.isArray()` guard) — surfaced as dated targets.

**Goal B — the Phase-1 supplementary branch.** Complete R1's lockout in the supplementary screen.
- When `supplementary.phase1_lockout` is true, `MbbsSupplementary.jsx` renders the **single-track** view: "You must clear First Prof before proceeding to Phase 2," the re-sit window, the failed-subject revision plan, and the "what if I fail?" timeline bounded by the **12-year window** — **not** the dual-phase combined view.
- 2nd-Prof-onward failures keep the existing dual-phase combined view.

**Done when:** COME/forensic placements appear as their own activity with report checklists and count toward attendance/practical; a Phase-1 repeat sees the single-track lockout view with a 12-year-bounded timeline; a 2nd-Prof failure still sees the dual-phase view; `npm run build` clean; Exam/USM unaffected. No migration. Close-out.

---

# SESSION R9 — Pass-probability recalibration
**Model: Opus 4.8.** No migration. Last, because it reads the gates the earlier sessions corrected.

**Read first:** `01_BMDC_CURRICULUM_REFERENCE.md` §2 + §5 · `05_MBBS_DECISIONS.md` R11 · `CLAUDE.md` — `passProjection.js`, the analytics suite, `eligibility.js` (corrected), `useMbbsTerms`, the topic-completion + QB coverage reads, the send-up input, the feature-flag gate (exclude flag-off MCQ).

**Goal.** Keep the projection's architecture; recalibrate its inputs to the corrected model.

- Hard gates: per-class-type attendance trajectory (**worst category**), embedded-formative %, **term-pass status** (1st Prof), item/card pace against the **real BMDC counts**.
- Coverage: topic completion % + QB coverage % against the **real BMDC topics**.
- Retention: SR compliance. College assessment: send-up if held.
- Keep the honest "not enough data" state when sparse; redistribute weight across present signals; **exclude any flag-off feature** (MCQ logging contributes nothing).
- No single confident % where data is thin.

**Done when:** the projection reads the corrected gates/terms/coverage; sparse data yields "not enough data," not a false %; flag-off features contribute nothing; the dashboard + analytics reflect it; `npm run build` clean; Exam/USM unaffected. No migration. Close-out.

---

# DEFERRED SESSIONS (build when Final-Prof demand appears)

**Clinical pillar (R10):** Clinical posting cards modelling the BMDC clinical card (`mbbs_R03_postings.sql` — `mbbs_clinical_postings` + `mbbs_posting_items` with required case/procedure counts → Observed/Assisted/Performed; extend `eligibility.js` phase-aware so the Phase-IV verdict computes from postings + ward-finals + placement + lecture attendance) → Privacy & Disclaimer + Clinical Case Log (`mbbs_R04_cases.sql`; privacy first; never paywalled) → OSPE/OSCE checklists (`mbbs_R05_ospe.sql`). Per `02_MBBS_PRODUCT_SPEC.md` Part 7 + R12.

**Internship + career + community/templates (R10):** `/mbbs/internship` + `mbbs_R07_internship.sql` — the 52-week rotation (Medicine 19 / Surgery 19 / O&G 14) + the BMDC logbook levels + the three time rules (**join within 1 month** as a countdown, **1 month at UHC/field**, **complete within 2 years**) per R13; career branches (Foreign → Exam Mode); community promotion + college templates reusing the QB + resource tables.

**Resource library (R10):** `/mbbs/resources` + `mbbs_R06_resources.sql` per `02_MBBS_PRODUCT_SPEC.md` Part 9.

**bKash / Nagad payment (blocked on pricing):** until `subscription_activated` is ON everything is free, so the whole control plane + gate wiring runs with zero user impact ahead of payment. When pricing lands, wire the gateway to `subscription_activated` + the registry, keeping every ethical-floor feature free in code.

---

## Final notes

- **Run the SQL.** Only R4 (`mbbs_R01_card_assessment.sql`) and R7 (`mbbs_R02_integrated_teaching.sql`) ship migrations in the core redesign; both additive. Run them manually in Supabase; the client degrades until then; the build log records the name + run status.
- **Order.** R0 first (the spine). R1 next (cheap trust). R2/R3 before R4. R0/R1 before R5. R0 before R6/R7/R8. R2/R5 before R9. Reorder R6/R7/R8 to taste while dependencies hold.
- **Never break what works.** Every session is additive: clean build, idempotent migration, nullable columns, engines extended not forked, feature flag-gated so it can ship dark and be disabled instantly. Seeded BMDC content is always editable by the student.

_End of build sessions R3.0._


---
<!-- docnav-related -->
### Related docs
- [StudyRise — MBBS Bangladesh Module · Document Index (Redesign R3.0)](00_MBBS_INDEX.md)
- [BMDC MBBS Curriculum 2021 — Reference & Seed Authority](01_BMDC_CURRICULUM_REFERENCE.md)
- [StudyRise — MBBS Bangladesh Module · Product Specification (R3.0)](02_MBBS_PRODUCT_SPEC.md)
- [MBBS Bangladesh Module — Current State Ledger (R3.0)](03_MBBS_CURRENT_STATE.md)
- [MBBS Bangladesh Module — Data Model (R3.0)](04_MBBS_DATA_MODEL.md)
- [MBBS Bangladesh Module — Decision Log (R3.0)](05_MBBS_DECISIONS.md)
- [MBBS Bangladesh Module — Build Log (R3.0)](07_MBBS_BUILD_LOG.md)
- [BMDC Curriculum (original) → moved (de-duplicated)](Original%20BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
