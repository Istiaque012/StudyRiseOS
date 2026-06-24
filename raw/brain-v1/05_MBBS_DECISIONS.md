# MBBS Bangladesh Module — Decision Log (R3.0)

<!-- docnav -->
> **Docs ·** folder map [00_MBBS_INDEX.md](00_MBBS_INDEX.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Version 3.0 — June 2026. Every binding decision for the BMDC-faithful redesign, stated plainly with reasoning, so no build session re-litigates a settled question. IDs are `Rn`. Where a session and this log disagree, **this log wins**._

These decisions sit on top of the v2.0 decisions, which remain in force unless superseded here. The v2.0 standing principles (additive migrations, flag-gating, never-break-Exam/USM, the visual bar) are restated at the end.

---

## R1 — The BMDC curriculum is seeded as a single canonical constant, and it is the structural authority

**Decision:** Build one module, `src/lib/mbbs/mbbsBmdcCurriculum.js`, that encodes the entire BMDC 2021 structure — per phase → subject → cards → items, mark tables, written composition, oral-board splits, the term↔card map, class types, integrated-teaching topics, generic-humanities topics, field placements, the GPA scale, and the eligibility constants. Every other feature (onboarding seeding, the Card view, the formative model, the exam-period boards, the projection) reads from it. It replaces the generic `_CARD_TOPICS_MAP`.

**Why:** The redesign's whole premise is that the app mirrors BMDC. That requires one trustworthy source of the real structure, transcribed (not paraphrased) from the curriculum, that the rest of the code reads. A single constant is testable, reviewable, and impossible to drift out of sync the way scattered literals would.

**Affects:** R0 builds it; everything downstream consumes it. Verbatim item text comes from `BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md` in the repo.

---

## R2 — Honours is grade A (≥75%), not 85%; the GPA scale is shown on every result

**Decision:** Correct the honours/distinction threshold from 85% to **75% (letter grade A, GP 3.75)**, per BMDC Table 13. Show the letter grade + grade point next to every recorded mark (item, card, term, formative, projected prof).

**Why:** 85% is simply wrong — it does not appear in BMDC. The A-grade band (≥75%) is the canonical distinction line. Students care intensely about their grade band; showing it on every result is both correct and useful.

**Affects:** `mbbsConstants.js`/`mbbsBmdcCurriculum.js` (the scale), `eligibility.js` + the dashboard (honours display), `formativeHelpers.js` + the Card/Formatives screens (per-result GPA). R1 session.

---

## R3 — Attendance is tracked per BMDC class type, and the binding gate is the worst category

**Decision:** Attendance is recorded **per class type** (Lecture, Tutorial, Practical, Integrated teaching, + clinical/field types in later phases), each against 75%. The eligibility gate is the **minimum** across categories — because the BMDC certificate requires ≥75% in *all* classes, not on average.

**Why:** The real attendance card (BMDC Table 102) is per class type, and a student can be safe on lectures but failing practicals — which is exactly the situation that gets people barred from the prof. Averaging hides the binding risk. The schema already supports it (`UNIQUE(user,subject,class_type)`); the redesign surfaces it.

**Affects:** `Attendance.jsx`, `attendanceHelpers.js`, `eligibility.js` (worst-category gate), `gateSummary.js`, the today cockpit strip, onboarding seeding of class types. R2 session.

---

## R4 — Onboarding pre-loads the real BMDC cards and core items, all editable

**Decision:** When a student confirms a subject at onboarding, the app pre-populates that subject's **genuine BMDC cards** with their **BMDC core items** (Anatomy's Thorax card with its 8 dissection items; Physiology's 8 system cards; Biochemistry's 6 cards; Microbiology's 2 item cards; etc.). Everything is editable — the student can rename, add, remove to match their college — but the default is the truth.

**Why:** This is the redesign's "feels real" payoff. A student opening the app to find their actual Thorax card already there, with the items their college examines, is the difference between a generic planner and a tool built for them. Editability respects college variation without abandoning the BMDC core.

**Affects:** `MbbsOnboarding.jsx` Step 3, the seeding logic, `mbbsBmdcCurriculum.js`. R3 session. (R0 must land first.)

---

## R5 — The Cards tab becomes the Continuous Assessment Card (a digital twin of the paper card)

**Decision:** The Cards tab in `ItemsCards.jsx` is redesigned to mirror the physical continuous-assessment card: per card, a table of **Item · Full Marks · Marks Obtained · Date of examination · Remarks/Signature**, plus the card's attendance line ("No. of attendance in practical classes / Out of") and the card-completion-exam result. Items remain editable inside the card (kept from v2.0).

**Why:** Mirroring the artefact is principle #1 of the redesign. A student should be able to hold their paper card next to the app and see the same columns. This also makes mark-entry natural — they copy from the card the teacher signed.

**Affects:** `ItemsCards.jsx` (Cards tab), `mbbs_items` nullable columns `exam_date`/`remarks`, `mbbs_cards` nullable `attendance_in_card`/`attendance_out_of` (`mbbs_R01_card_assessment.sql`), per-item GPA display. R4 session.

---

## R6 — Formative is the in-course mark embedded as 10% of each written paper; terms are hard 60% gates; the model is phase-aware

**Decision:** Formative is **not** a separate sit-down exam. It is the in-course mark (items + cards + term exams + integrated-teaching weightage + attendance), carried into each written paper as **10%**. The 60% formative gate is enforced. For 1st Prof, the three term exams are **hard 60% gates** (all must pass before the prof). The student records real item/card/term marks; the app computes the running formative %, the gate verdict, and "marks needed." Where a college supplies a single formative figure, the student records it directly. The display explains what the number means ("10% of each written paper").

**Why:** The v2.0 generic weighted-average misrepresents how BMDC formative works and can mislead a student about their gate. The embedded-10% framing is the real mechanic; the term gates are the real 1st-Prof constraint. Honesty about the model is a trust feature.

**Affects:** `formativeHelpers.js` (phase-aware), `eligibility.js`, the term object (`mbbs_terms`, extended not rebuilt), `Formatives.jsx`, the Card view. R5 session.

---

## R7 — The Structured Oral is modelled as two boards on separate days where BMDC defines them

**Decision:** For subjects with a two-board SOE (Anatomy Board I/II, Physiology Board I/II, and others per the reference), the Exam Period System lets the student enter **two viva dates** (Board I, Board II) and shows the **board topic split** so the right topics are revised before each board.

**Why:** Anatomy's Board I and Board II are sat on separate days and cover non-overlapping regions; treating the oral as a single event misschedules the student's revision. `mbbs_prof_schedule` already allows two `viva` rows per subject; the redesign surfaces them with the board topics.

**Affects:** the exam-period schedule entry, the during-exam focus, `mbbsBmdcCurriculum.js` (board splits). R6 session. No migration.

---

## R8 — The Phase-1 failure is a full lockout, not a dual-phase state

**Decision:** A 1st-Prof failure does **not** grant the concurrent supplementary track. Per BMDC, the student is **locked out of Phase 2** until they pass First Prof. The app presents this as a single-track "you must clear First Prof before proceeding" state (`mbbs_config.supplementary.phase1_lockout = true`), distinct from the 2nd-Prof-onward dual-phase state. The "What if I fail?" timeline is bounded by the **12-year completion window** from admission.

**Why:** BMDC's Common Rules make Phase 1 uniquely strict — no carry-on. Presenting a 1st-Prof repeat as a dual-phase student would be factually wrong and would mislead a vulnerable student about what they may attend. The 12-year window gives the timeline a real, calm horizon.

**Affects:** `eligibility.js` (lockout branch), `MbbsSupplementary.jsx` (the single-track view), the supplementary timeline, `mbbs_config.admission_date` + `supplementary.phase1_lockout`. R1 + R8-of-supplementary session.

---

## R9 — Integrated teaching and generic medical-humanities topics are tracked because they carry marks

**Decision:** Seed the BMDC integrated-teaching sessions (Phase I 12 · II 7 · III 10 · IV 73) and the 16 generic medical-humanities topics as a tracked list per phase; the student marks "attended + summary submitted" per session. The IT contribution (which carries practical marks in Phases II and IV) surfaces in the formative/practical picture as a **read-only signal** — it does not change the core eligibility verdict math (attendance + formative + prev-prof + terms).

**Why:** Integrated teaching is mandatory, mark-bearing, and currently invisible in the app. Surfacing it completes the mirror. Keeping it read-only relative to the verdict avoids fabricating a gate BMDC doesn't define while still showing the student a real obligation.

**Affects:** `mbbs_R02_integrated_teaching.sql` (`mbbs_it_sessions`), a new tracker surface (or a Formatives sub-section), `mbbsBmdcCurriculum.js` (topic lists). R7 session.

---

## R10 — Field placements are a distinct activity type, not a class and not a clinical posting

**Decision:** Community Medicine COME (30 days: Day Visit 10 + RFST 10 + Study Tour 10) and Forensic Medicine field visits (10 mortuary + 6 court/lab) are a **third activity type**. They appear in the timetable/attendance as their own category (counting toward 75% and practical), with the required **report deliverables** tracked as a checklist in `mbbs_config.field_reports`.

**Why:** These mandatory, report-producing placements are neither regular classes nor ward postings; modelling them as either loses the report obligation and miscounts attendance. They are a real, gradeable part of two subjects and must be visible.

**Affects:** `mbbs_classes`/`mbbs_attendance` class-type vocabulary, the timetable activity kinds, `mbbs_config.field_reports`, `mbbsBmdcCurriculum.js`. R8 session. No migration (uses existing tables + jsonb).

---

## R11 — The pass-probability projection is recalibrated, not redesigned

**Decision:** Keep the v2.0 projection architecture (gates + coverage + retention + send-up; "not enough data" when sparse) but recalibrate its **inputs** to the corrected model: per-class-type attendance trajectory (worst category), embedded-formative %, term-pass status, item/card pace against the real BMDC counts, topic-coverage % against real BMDC topics. Any flag-off feature (MCQ logging) contributes nothing.

**Why:** The projection's shape is sound; only its inputs were built on the wrong gates. Recalibration is cheaper and safer than a redesign and keeps the honest-when-sparse behaviour.

**Affects:** `passProjection.js`, the analytics suite, the dashboard. R9 session. No migration.

---

## R12 — The clinical pillar models the BMDC clinical card directly; it stays deferred

**Decision:** When built (R10+, on Final-Prof demand), the clinical posting feature mirrors the BMDC clinical card: a posting with **clinical items (required case counts)**, **practical items (required procedure counts → Observed/Assisted/Performed)**, **tutorial items**, and the official-record block. The privacy/consent layer is a hard prerequisite and is never paywalled. Until demand appears, it stays deferred — most early users are pre-clinical.

**Why:** The BMDC clinical card *is* a logbook with required counts; modelling it faithfully gives a true digital replacement for the handwritten clinical card. But it serves almost nobody at launch, so it waits.

**Affects:** deferred `mbbs_R03_postings.sql` etc., `eligibility.js` phase-aware extension. R10+.

---

## R13 — Internship encodes the three BMDC time constraints

**Decision:** When built (R10+), the internship tracker encodes: **join within 1 month** of Final-Prof pass (a calendar countdown), **1 month at UHC/field** within the 12 months, and **complete within 2 years** of start — alongside the 52-week rotation (Medicine 19 / Surgery 19 / O&G 14) and the BMDC logbook levels.

**Why:** These are hard BMDC rules with real consequences (registration depends on them) that the v2.0 plan omitted. Surfacing the 1-month join deadline as a countdown is genuinely protective.

**Affects:** deferred `mbbs_R07_internship.sql`, the internship screen. R10+.

---

## Standing principles (carried from v2.0, still binding)

- **Additive, idempotent migrations; nullable columns only; engines extended not forked.** No destructive change to a shipped table.
- **Flag-gate every feature** via `app_feature_flags`; **ethical-floor features locked free in code** (the eligibility verdict + four gate trackers, the dashboard + daily gate line, the morning digest, Pomodoro + basic plan + timetable + one-tap attendance + free class creation, the Continuous Assessment Card, the rapid-review sheet, the eligibility-critical calculators, the privacy/consent layer).
- **MCQ logging stays built but off**; off means zero contribution to analytics/projection.
- **Never break Exam or USM**; every MBBS screen its own lazy chunk.
- **Visual bar:** `ui/` library only, `var(--token)` only, `animations.js` only + `useReducedMotion()`, dark mode, 375px floor, no exclamation marks, status-colour discipline, subject colour via palette key.
- **No gamification for a high-stress population**; clarity over compulsion; honest when data is sparse.
- **Run the SQL manually**; the client degrades gracefully until then.
- **Seeded BMDC content is always editable by the student** — the app pre-loads the truth and lets reality diverge, never the reverse.

---

_These decisions are the binding answers. Where a build session and this log disagree, this log wins._


---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
