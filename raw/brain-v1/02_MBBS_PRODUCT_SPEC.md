# StudyRise — MBBS Bangladesh Module · Product Specification (R3.0)

<!-- docnav -->
> **Docs ·** folder map [00_MBBS_INDEX.md](00_MBBS_INDEX.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Version 3.0 — June 2026. The source of truth for **what** the redesigned module is and **why**. The BMDC facts live in `01_BMDC_CURRICULUM_REFERENCE.md`; the schema, decisions, and build prompts are separate files._

---

## Product Vision

**One sentence:** StudyRise MBBS Bangladesh Mode is the digital twin of the Bangladeshi medical student's BMDC continuous-assessment card and eligibility file — pre-loaded with the exact BMDC 2021 cards, items, marks, and rules for their phase, so the app maps one-to-one onto what their college and university actually do, and answers the two questions that drive their daily anxiety: **"Am I eligible to sit my prof, and am I ready?"**

**Why it exists:** Bangladeshi MBBS students navigate the most gate-heavy medical curriculum in the region. Progression is not about grades — it is about clearing dozens of small, BMDC-defined checkpoints (items, cards, term exams, per-class-type attendance, formative marks) before they are even *allowed* to sit a professional examination. They track this on a paper card, in their heads, and across scattered WhatsApp messages. No app understands the system. StudyRise becomes the digital version of the artefacts they already carry — the same cards, the same items, the same columns, the same rules — and then carries them through the exam itself.

**Why this is a redesign:** v2.0 shipped against a *summary* of BMDC. It works, but its content is generic (placeholder card topics, not the real Thorax-card items), some rules are wrong (honours 85%, should be 75%), and it does not yet mirror the artefacts. R3.0 re-grounds the module on the genuine BMDC 2021 structure so it feels — and is — real.

---

## Design principles

1. **Mirror the artefacts.** Every screen maps onto a real BMDC artefact: the continuous-assessment card (item · full marks · marks obtained · date · signature), the attendance record (per class type), the term gate, the professional-exam mark table. If a student could hold their paper card next to the app and see the same thing, the design is right.
2. **Rigid by BMDC, configurable by college.** The app is rigid where BMDC is rigid (subjects, phases, components, pass marks, card/item names, mark tables, eligibility rules) and configurable where colleges differ (extra items, timetable, send-up, internal patterns). Seeded BMDC content is always editable.
3. **Survive the system, then optimise.** First question: *"am I eligible?"* Second: *"am I prepared?"* Different questions, different urgency. The app never confuses them. Eligibility is the ethical-floor, always-free spine.
4. **Built for the real student.** Bangladeshi MBBS students do not pre-practice MCQs, rarely sit extra mocks, and will not keep a mistake journal. The module is designed around what they *actually do* — clear items, protect attendance, pass terms, prepare vivas — not imported study habits.
5. **Reduce cognitive load at the worst moments.** When a student fails a subject, or sits five exams in three weeks, the app's job is clarity, not motivation. No hollow encouragement, no streaks, no guilt. Given the documented stress and suicide risk among Bangladeshi MBBS students, engineering dependency through anxiety would be irresponsible.

---

# PART 1 — THE ACADEMIC STRUCTURE

## 1.1 Mode & shared infrastructure

MBBS Bangladesh is the third StudyRise mode (alongside Exam and University), selected at onboarding Step 0. It routes into a completely separate onboarding and screen set; modes never bleed into each other.

**Shared (no rebuild):** auth + profile, subscription/payment (bKash/Nagad when integrated), Pomodoro timer, the `ui/` component library + design tokens, the admin panel + feature-flag registry, the Supabase connection + RLS patterns.

**Already built (v2.0, see `03_MBBS_CURRENT_STATE.md`):** foundation + routing, onboarding wizard, items/cards/attendance/formatives, the eligibility engine + dashboard, timetable + today cockpit, spaced repetition, exam-event spine, the Viva & University Question Banks, topic completion, the term object, the pass-probability projection, the Exam Period System, holidays, notifications, the supplementary screen.

**Redesigned/added by R3.0:** the BMDC curriculum constants (real cards + items + rules), the corrected assessment + eligibility model, per-class-type attendance, the BMDC-seeded onboarding, the Continuous Assessment Card view, the two-board oral, the integrated-teaching tracker, field placements, the recalibrated projection.

## 1.2 Professional phases (the root container)

Four phases — the top-level organiser. Everything lives inside a phase. Per `01_BMDC_CURRICULUM_REFERENCE.md §1`. During onboarding the student picks their current phase; the app configures subjects, the real BMDC cards/items, class types, and exam components from it.

**Phase rules (BMDC, non-configurable — §2):** pass the previous prof before the next · ≥75% attendance in **all** class types · ≥60% formative · 60% pass per component, each separate · 1st Prof requires passing all term exams · Phase-1 failure = full lockout from Phase 2 · honours = A (≥75%) · 12-year completion window from admission.

## 1.3 Dual-phase state (supplementary) — with the Phase-1 exception

When a student fails one or more subjects in a prof (2nd Prof onward), they move into the next phase's classes while preparing the supplementary for the failed subject(s) — two concurrent contexts (primary + supplementary track). The daily view merges both.

**The Phase-1 exception (R1, BMDC §2):** a 1st-Prof failure does **not** grant the concurrent track — the student is locked out of Phase 2 entirely until they pass. The app presents this case as a single-track "you must clear First Prof before proceeding" state, not a dual-phase state. The supplementary screen branches on this.

**Emotional design:** when most stressed, the student needs *"here is exactly what each track needs today,"* never encouragement. The eligibility-protection summary stays free.

## 1.4 Subjects, cards, items (the BMDC mirror)

Pre-loaded from the phase using the **real BMDC structure** (§4 of the reference): each subject carries name, total marks, component breakdown, colour (palette key), and its **BMDC cards** — each card carrying its **BMDC core items**. Item counts/extra cards are editable; the BMDC core is seeded. This is the heart of the redesign (R0, R3).

## 1.5 Exam components (BMDC mark tables)

Every prof exam has components, each passed separately, encoded from the exact BMDC tables (§1, §4):

| Component | Structure |
|---|---|
| Written | per paper: Formative 10% (embedded) + MCQ 20% (SBA 50% + MTF 50%) + SAQ/SEQ 70% (SAQ 75% + SEQ 25%) |
| Structured Oral (SOE / viva) | usually **2 boards** on separate days; topic-fixed, rating-scale marked |
| Practical / OSPE | OSPE + traditional + practical note book (+ field reports where applicable) |
| Clinical (Final Prof) | long case + short cases (+ X-ray/ECG/lab interpretation) |

Self-assessed readiness is tracked **per component** independently. The two-board oral is modelled in the Exam Period System (R6).

## 1.6 Exam windows (not hard dates)

May/November cycles, drifting. Student sets target month+year; app builds the timeline; when the university announces, the student enters per-subject written + per-board viva dates (R6). Postponement preserves all progress and recalculates. Result-pending is a lighter state. A failure activates the dual-phase (or Phase-1-lockout) track.

---

# PART 2 — THE GATE SYSTEM (the eligibility spine — free, always)

The four BMDC gates determine whether a student can sit their prof. All four are ethical-floor (free, never paywalled, never toggleable off).

## 2.1 Items & Cards — the Continuous Assessment Card (R4, the centrepiece)

The card view is a **faithful digital twin of the paper continuous-assessment card**: per card, a table of **Item · Full Marks · Marks Obtained · Date of exam · Remarks/Signature**, with the card's attendance line and the card-completion-exam result. Items are added/edited/deleted inside the card (kept from v2.0 D1). Seeded with the real BMDC items; the student records marks as the college gives them. Status per item: pending · scheduled · cleared · failed. The card shows cleared/total, the next item due, and (caution-only) whether item/card pace endangers the term.

## 2.2 Attendance — per class type (R2)

Tracks **each BMDC class type separately** (Lecture, Tutorial, Practical, Integrated teaching, + clinical/field types in later phases), each counting toward 75%. The binding gate is the **worst** category (the certificate needs ≥75% in *all*). One-tap logging; "classes you can still miss" per category; danger zone surfaced honestly. This mirrors the BMDC attendance record (§6).

## 2.3 Formatives & terms — the correct model (R5)

Formative = the in-course mark (items + cards + term exams + IT weightage + attendance), **embedded as 10% of each written paper**, gated at 60%. For 1st Prof, the three term exams are hard 60% gates. The student records real item/card/term marks; the app computes the running formative %, the gate verdict, and "marks needed." Every recorded result shows its **GPA letter grade** (Table 13). Phase-aware: 1st Prof = term-gate model; others = aggregate (§5).

## 2.4 The eligibility verdict (extended, never forked)

`eligibility.js` computes the verdict from: attendance (all class types ≥75%) · formative ≥60% · previous prof passed · (1st Prof) all terms passed. Items/cards are **caution-only** (they predict, they don't gate). New in R3.0: the **Phase-1 lockout** branch and the **honours = A (≥75%)** display. The verdict is the free spine of the dashboard and the daily digest.

---

# PART 3 — THE DASHBOARD & DAILY LOOP

## 3.1 Phase Eligibility Dashboard

Status hero (eligible / at-risk / locked / not-eligible) + four gate widgets (attendance, formative, items, cards) + the gate summary + the readiness grid (per component) + next exams + overdue review. Interactive (tappable rings, what-if sliders, countdown scrubber) for clarity, never compulsion (kept from v2.0). R3.0 wires the corrected gates, the Phase-1-lockout state, and the GPA display.

## 3.2 Today cockpit

The shared Exam-Today engine: hero clock, today's classes strip (with per-class-type one-tap attendance), gate-priority day plan, Pomodoro, study log, SR-first blocks. Holiday + gap banners. R3.0 makes the classes strip class-type aware.

## 3.3 The morning digest

One-a-morning gate-protection digest (≤3/day, quiet hours, urgency-ordered) — ethical-floor, never paywalled. Surfaces the worst gate, items/terms due, SR overdue, holiday windows. No streaks, no guilt.

---

# PART 4 — EXAM PREPARATION (Pro intelligence on a free spine)

## 4.1 Topic-by-topic completion

Granular "studied / studying / not studied" per topic within each subject, seeded from the BMDC card/item topic lists. Feeds coverage and the projection. (v2.0; reads the new BMDC seed.)

## 4.2 Viva Question Bank (the exam-prep centrepiece)

Community-entered viva questions auto-tagged with the student's college + university; admin-verified + promotable to a shared "StudyRise Verified" pool; filter by college / university / verified pool; practice mode feeds SR. Works for every topic even where no questions exist (examiners cover the whole subject). (v2.0; unchanged by R3.0 except it now surfaces against real BMDC topics.)

## 4.3 University Question Bank

University chosen at onboarding drives the bank; contextual surfacing while studying a topic ("here are your university's professional questions for this topic — done?") drives SR + coverage. (v2.0.)

## 4.4 The two-board oral & the Exam Period System (R6)

Before the window the student enters per-subject **written dates** and per-board **viva dates** (Anatomy/Physiology = Board I + Board II on separate days). The system focuses one exam at a time, builds a first-pass → second-pass → revision schedule per subject before each written, builds a topic-coverage viva schedule (with bank questions surfaced and a lockable personal shortlist) before each oral, progresses automatically, and optionally captures reflections + new viva questions after each. The student uses the app **during** the exams. (v2.0 Exam Period System, extended for per-board oral dates.)

## 4.5 Pass Probability Projection (R9)

Rebuilt around what BMDC readiness actually depends on: hard gates (attendance trajectory, formative %, term-pass status, item/card pace) + content coverage (topic completion % + QB coverage %) + retention (SR compliance) + college assessment (send-up if held). Never a single confident % where data is thin; a neutral "not enough data" state when sparse. R3.0 recalibrates inputs against the corrected gates and term model and excludes any flag-off feature (e.g. MCQ logging).

---

# PART 5 — INTEGRATED TEACHING & FIELD PLACEMENTS (R7, R8 — BMDC gates we missed)

## 5.1 Integrated teaching tracker (R7)

The BMDC integrated-teaching sessions (Phase I 12 · II 7 · III 10 · IV 73) carry **practical marks** via attendance + a written summary. A seeded session list per phase; the student marks "attended + summary submitted" per session; the contribution surfaces in the formative/practical picture. The 16 generic medical-humanities topics seed alongside as a mandatory checklist.

## 5.2 Field placements (R8)

A distinct activity type (not a class, not a clinical posting) for **Community Medicine COME (30 days: Day Visit 10 + RFST 10 + Study Tour 10)** and **Forensic Medicine (10 mortuary + 6 court/lab)**, each producing a report deliverable that counts toward practical. Tracked in the timetable/attendance as its own category, surfaced as dated targets with the report as a checklist item.

---

# PART 6 — SUPPLEMENTARY & "WHAT IF I FAIL?"

The dual-phase student's own surface: an independent revision plan for the failed subject(s), the next supplementary window, failed-subject readiness, and a combined daily view (primary + supplementary). The "What if I fail?" timeline projects the next cycle and the 6–12 months ahead, bounded by the **12-year window**, stated plainly — never guilt. **The Phase-1 case** (R1) renders instead as a single-track "clear First Prof to proceed" view, since Phase-1 failure is a full lockout. (v2.0 screen, extended for the Phase-1 branch.)

---

# PART 7 — CLINICAL PILLAR (Final Prof) — deferred (R10)

Lower priority — most early users are pre-clinical. Build when Final-Prof demand appears.

## 7.1 Clinical posting cards

The BMDC clinical card (§4.9) is the model: a posting (unit, hospital, weeks, total 100, pass 60%) with **clinical items (required case counts)**, **practical items (required procedure counts: Observed/Assisted/Performed)**, **tutorial items**, and the official-record block. Placement attendance counts toward 75% separately from lectures. Block posting (concentrated 4-week rotation) is distinct from ward/bedside teaching. The Phase IV eligibility verdict computes from postings + ward-finals + placement + lecture attendance — never items/cards.

## 7.2 Privacy & disclaimer (hard prerequisite)

One-time consent (educational-not-medical + anonymisation) before any patient case; anonymisation guard strips names/IDs at write time; never paywalled.

## 7.3 Clinical case log & OSPE checklists

Long/short/ward case templates linked to a posting; the procedure log maps onto the BMDC required counts; PDF export — a digital replacement for the handwritten clinical card. Student-built OSPE station checklists with a timer and self-score.

---

# PART 8 — POST-MBBS (deferred, R10)

## 8.1 Internship tracker

Shown only after Final-Prof pass: the 52-week rotation (Medicine 19 / Surgery 19 / O&G 14) + the BMDC logbook (Observed → Supervised → Independent). New in R3.0 per BMDC §8: **must join within 1 month** (a calendar countdown), **1 month at UHC/field**, **complete within 2 years** of start.

## 8.2 Career branches & community/templates

FCPS-1 / BCS / Undecided / Foreign (Foreign hands off to Exam Mode). Admin-promoted university/question content; admin-curated + batchmate-shared card/item/class templates (metadata-only). Reuses the QB + resource tables.

---

# PART 9 — RESOURCE LIBRARY (deferred, R10)

Organise the hybrid resource stack tagged by subject/phase/gate relevance, with a personal rating and a local-file reference (on-device, data-cost-aware). Filterable.

---

# PART 10 — ADMIN CONTROL PLANE

Every MBBS feature is configuration, not code, via the v2.0 `app_feature_flags` registry (on/off + Free/Pro per feature, no redeploy). Ethical-floor features are locked free in code and can never be toggled off: the eligibility verdict + four gate trackers, the dashboard + daily gate line, the morning digest, the Pomodoro + basic daily plan + timetable + one-tap attendance + free class creation, the Continuous Assessment Card, the rapid-review sheet, the eligibility-critical calculators, and the privacy/consent layer. MCQ logging stays built but **off**.

---

# PART 11 — WHAT THIS MODULE IS NOT

- **Not a content platform.** Students bring content; the app organises it. No video lectures, no textbook summaries.
- **Not a social network.** No groups, forums, chat, or leaderboards. WhatsApp owns social coordination; the app exports to it.
- **Not a gamification engine.** No badges, no streaks-for-their-own-sake, no public leaderboards. Daily use is earned through usefulness, not anxiety.
- **Not a clinical reference tool.** No drug database, no clinical calculator. DIMS serves that.
- **Not a mock simulator.** The Custom Exam Builder records *real* college-set exams; it does not generate or AI-score mocks.
- **Not an MCQ-practice driver.** MCQ logging exists but ships off; the module does not assume students pre-practice MCQs.
- **Not Bangla at launch.** English is the language of instruction and of all MBBS textbooks. Bangla localisation is a future consideration.
- **Not a curriculum invented by StudyRise.** The structure is BMDC 2021, transcribed — not designed. The app mirrors; it does not editorialise.

---

# PART 12 — ONBOARDING (R3 overhaul)

- **Step 0 — Mode Select** (shared): Exam / University / MBBS Bangladesh.
- **Step 1 — Phase:** 1st / 2nd / 3rd / Final Prof. Subjects auto-populate from BMDC.
- **Step 2 — College & University & Window:** college (free text), **affiliating university** (real selection — drives the QB), target prof window (month + year), phase start date, **"does your college hold a send-up exam?"**.
- **Step 3 — Subjects + the real BMDC cards/items:** confirm subjects; the app **pre-loads the genuine BMDC cards and their core items** per subject (Thorax card with its 8 items, Physiology's 8 system cards, etc.), all editable; the student optionally enters current progress, or chooses "set up later." This is the redesign's onboarding payoff.
- **Step 4 — Timetable (optional)** with the seeded class types per subject.
- **Step 5 — Supplementary (conditional):** failed subject(s) + supplementary window — or, for a 1st-Prof repeat, the single-track lockout state.
- **Complete:** the Phase Eligibility Dashboard loads, pre-populated with the real BMDC structure at zero, the daily gate-protection summary active from day one.

---

# PART 13 — FEATURE PRIORITY (the redesign order)

**R0–R1 (foundation + correctness):** BMDC curriculum constants; honours 75%; GPA scale; Phase-1 lockout; 12-year window.
**R2–R5 (the mirror):** per-class-type attendance; BMDC-seeded onboarding; the Continuous Assessment Card; the corrected formative/term/GPA model.
**R6–R9 (exam-prep correctness):** two-board oral; integrated-teaching tracker; field placements; projection recalibration.
**R10+ (deferred):** clinical posting cards + privacy + case log + OSPE; internship (1-mo join / UHC / 2-yr) + career + community/templates; resource library; bKash/Nagad payment.

**Kept from v2.0, unchanged in behaviour (re-grounded on real content):** Viva QB, University QB, topic completion, SR, the Exam Period spine, the dashboard interactivity, notifications + .ics, the supplementary screen.

---

_End of product specification R3.0. See `03_MBBS_CURRENT_STATE.md` for what exists, `04_MBBS_DATA_MODEL.md` for the schema, `05_MBBS_DECISIONS.md` for the binding decisions, `06_MBBS_BUILD_SESSIONS.md` for the prompts._


---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
