# MBBS Bangladesh Module — Current State Ledger (R3.0)

<!-- docnav -->
> **Docs ·** folder map [00_MBBS_INDEX.md](00_MBBS_INDEX.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Version 3.0 — June 2026. The honest record of what is **deployed on `main` today** (after the full v2.0 build, Sessions 0–14) and what the R3.0 redesign keeps, changes, or removes. Read this before writing or running any redesign session so nothing is rebuilt or assumed._

Tags: **✅ KEEP** (deployed, correct; R3.0 leaves alone or only extends) · **🔧 CHANGE** (deployed, R3.0 modifies behaviour) · **🆕 NEW** (does not exist; an R3.0 session builds it) · **🗑 GONE** (already removed in v2.0; do not look for it).

> Authoritative cross-check: the running MBBS record in `CLAUDE.md` and the v2.0 entries in `07_MBBS_BUILD_LOG.md`. If a file path here disagrees with the repo, the repo wins — verify before editing.

---

## 1. Foundation & routing — ✅ KEEP

| Item | State |
|---|---|
| `app_mode='mbbs_bd'` → derived `'mbbs'` via `getAppMode` (`src/lib/appMode.js`) | ✅ KEEP |
| `App.jsx` route selector `university?uni:mbbs?mbbs:exam`; `needsMbbsOnboarding` guard | ✅ KEEP |
| Sidebar `MBBS_NAV`, BottomTabBar `MBBS_TABS` / `MBBS_MORE_ITEMS` | ✅ KEEP |
| Mode Select 3rd card "MBBS Bangladesh" | ✅ KEEP |
| `migrations/mbbs_001_foundation.sql` — 10 tables + `user_settings.mbbs_config` jsonb, RLS owner-only, triggers (RUN) | ✅ KEEP |
| Lazy chunking — every MBBS screen its own chunk; Exam/USM download zero MBBS code | ✅ KEEP — non-negotiable |
| v2.0 migrations RUN: `mbbs_002_exam_prep`, `mbbs_003_card_exams` (dropped then…), `core_feature_flags`, `mbbs_005_terms`, `mbbs_006_topic_completion`, `mbbs_007_viva_bank`, `mbbs_008_question_bank`, `mbbs_009_exam_period`, `mbbs_010_holidays`, and `mbbs_004_questions_restore` (re-created the dropped MCQ table) | ✅ KEEP — additive-only from here |

## 2. Constants & curriculum — 🔧 CHANGE (the core of the redesign)

| Item | State |
|---|---|
| `src/lib/mbbs/mbbsConstants.js` — `MBBS_PHASES` (BMDC placement + marks), `_CARD_TOPICS_MAP` (generic item-topic *suggestions*), `CONFIDENCE_VOCAB`/`CONFIDENCE_COPY`, `MBBS_COMPONENTS`, `MBBS_UNIVERSITIES`, `MONTHS` | 🔧 CHANGE — `MBBS_PHASES` marks verified correct; **`_CARD_TOPICS_MAP` replaced** by the real BMDC card/item structure |
| **`src/lib/mbbs/mbbsBmdcCurriculum.js`** — the canonical BMDC structure: per phase→subject→cards→items, mark tables, written composition, oral boards, term↔card map, class types, IT topics, field placements, GPA scale, eligibility constants | 🆕 NEW (R0) — the seed spine everything reads |

## 3. Onboarding — 🔧 CHANGE

| Item | State |
|---|---|
| `MbbsOnboarding.jsx` 6-step wizard; step components in `src/screens/Onboarding/mbbs/`; one ordered save (subjects → cards → items → readiness → classes → user_settings last) | ✅ KEEP structure |
| Step 3 pre-populates cards/items from `_CARD_TOPICS_MAP` (generic) | 🔧 CHANGE (R3) — pre-load the **real BMDC cards + core items** per subject from `mbbsBmdcCurriculum.js`, all editable |
| Step 2 affiliating-university select (wired to QB), send-up question | ✅ KEEP |
| Step 4 timetable | 🔧 CHANGE (R3) — seed the **BMDC class types** per subject (Lecture/Tutorial/Practical/IT + clinical/field where relevant) |

## 4. The gate engine & dashboard — 🔧 CHANGE (extend, never fork)

| Item | State |
|---|---|
| `src/lib/mbbs/eligibility.js` — `computeEligibility(...)`; attendance/formative hard gates; items+cards caution-only; unpassed prev prof → not_eligible | 🔧 CHANGE (R1, R2, R5) — per-class-type attendance (worst category), term-gate for 1st Prof, **Phase-1 lockout branch**, honours = A (≥75%); still pure, still one engine |
| `src/screens/mbbs/MbbsDashboard.jsx` — status hero + 4 gate widgets + summary + readiness grid + next-exams + overdue-review + interactivity + supplementary two-track split | 🔧 CHANGE — wire corrected gates, the lockout state, GPA display; interactivity kept |
| `src/lib/mbbs/gateSummary.js` — `buildGateSummary`/`computeItemTotals` | 🔧 CHANGE (R2, R5) — class-type-aware attendance summary; term-aware formative line |
| `src/lib/mbbs/examWindow.js` — statuses, window→date, countdown | ✅ KEEP — extend for per-board oral dates (R6) |

## 5. Items, Cards, Attendance, Formatives — 🔧 CHANGE (the mirror)

| Item | State |
|---|---|
| `useMbbsSubjects`/`useMbbsItems`/`useMbbsCards`; `itemHelpers.js`; `ItemsCards.jsx` (Items tab + Cards tab; item editing inside a card) | 🔧 CHANGE (R4) — the Cards tab becomes the **Continuous Assessment Card** digital twin: per-card table of Item · Full Marks · Marks Obtained · Date · Remarks, the card attendance line, the card-completion result; seeded from BMDC; marks + GPA per item |
| `useMbbsAttendance` + `attendanceHelpers.js` + `Attendance.jsx` (zones, days-can-miss, one-tap; `UNIQUE(user,subject,class_type)`) | 🔧 CHANGE (R2) — surface **per-class-type** rows (Lecture/Tutorial/Practical/IT + clinical/field), each vs 75%, binding = worst; seed class types from BMDC |
| `useMbbsFormatives` + `formativeHelpers.js` + `Formatives.jsx` (weighted average, 60% gate, score-needed); `mbbs_005_terms` + `useMbbsTerms` (term object, 1st-Prof term model) | 🔧 CHANGE (R5) — formative = **10% embedded in written**, term-gate model phase-aware, GPA shown on every result; the term object exists (v2.0) and is extended, not rebuilt |
| `mbbs_subjects.color` = palette key, not hex | ✅ KEEP — no-hex rule |

## 6. Timetable, Today, Holidays — 🔧 CHANGE

| Item | State |
|---|---|
| `useMbbsClasses` + `Timetable.jsx` (week nav, holiday badges, class blocks, today's attendance; `.ics` export) | 🔧 CHANGE (R2, R8) — class-type-aware blocks; **field-placement** activity type (COME/mortuary/court) as a distinct kind |
| `bdHolidays.js` (`BD_HOLIDAYS_2026`) + admin gov holidays (`mbbs_010_holidays`) + student college holidays (`mbbs_config.holiday_prefs`) | ✅ KEEP |
| `MbbsToday.jsx` cockpit (`generateMbbsBlocks`); `dailyPlan.js`; SR-first; holiday + gap banners | 🔧 CHANGE (R2) — class-strip is class-type aware; one-tap attendance per type |
| Extended class types (`ward_posting`, `integrated_teaching`, `generic_topic`, free-text) | ✅ KEEP — R7/R8 give them seeded structure |

## 7. Spaced repetition — ✅ KEEP

| Item | State |
|---|---|
| `useMbbsSR.js` (`createSR`/`completeSRHit`/`getReviewQueue`/`getCompliance`); `mbbs_sr_records` (`mbbs_002`); `MbbsReview.jsx` at `/mbbs/review`; ported `SRModal`; dashboard overdue banner; cockpit SR-first; SR seams from viva practice + QB studied | ✅ KEEP — now seeds against real BMDC topics |

## 8. Exam events, card exams, Exam Period System — 🔧 CHANGE

| Item | State |
|---|---|
| `mbbs_exam_events` (`mbbs_002`); `useMbbsExamEvents`; `upcomingExams.js`; `NextExamsWidget.jsx` | ✅ KEEP — the spine |
| `MbbsCardExams.jsx` at `/mbbs/card-exams` — record a college-set exam + result (Custom Exam Builder intent) | ✅ KEEP |
| `mbbs_009_exam_period` + `useMbbsProfSchedule` + the during-exam focus + pre-prof study mode (`MbbsExamPrep`) | 🔧 CHANGE (R6) — `mbbs_prof_schedule` already allows 2 viva rows per subject (`UNIQUE(user,subject,component,exam_date)`); R6 surfaces **per-board** oral entry (Board I / Board II dates) + the board topic split from `mbbsBmdcCurriculum.js` |
| MCQ logging (`mbbs_question_logs`, restored in `mbbs_004`) | ✅ KEEP — built, **off** behind the flag; contributes nothing while off |

## 9. Question banks & topic completion — ✅ KEEP

| Item | State |
|---|---|
| Viva QB (`mbbs_007_viva_bank`, two RLS scopes) + practice mode + admin verify; University QB (`mbbs_008_question_bank`, three scopes) + contextual surfacing + admin authoring; `mbbs_006_topic_completion` + topic-by-topic | ✅ KEEP — surfaces against real BMDC topics after R0/R3; topic seed re-sourced from `mbbsBmdcCurriculum.js` |

## 10. Projection, readiness, analytics — 🔧 CHANGE

| Item | State |
|---|---|
| `passProjection.js` (gates + coverage + retention + send-up; "not enough data" state) + the analytics suite | 🔧 CHANGE (R9) — recalibrate inputs against corrected gates (per-class-type attendance, term-pass status, embedded formative); exclude flag-off features |
| `useMbbsReadiness` + `mbbs_readiness` (5 states × component); `ReadinessGrid` | ✅ KEEP — per-component self-assessment, distinct from the projection |

## 11. Supplementary — 🔧 CHANGE

| Item | State |
|---|---|
| `MbbsSupplementary.jsx` at `/mbbs/supplementary` + `supplementaryPlan.js` + dashboard two-track split + "what if I fail?" timeline; `mbbs_config.supplementary` (failed subjects as NAMES) | 🔧 CHANGE (R1) — add the **Phase-1 lockout** branch (single-track "clear First Prof to proceed", not dual-phase); bound the timeline by the **12-year window** |

## 12. Admin, flags, notifications, .ics — ✅ KEEP

| Item | State |
|---|---|
| `app_feature_flags` registry (`core_feature_flags`) + admin UI + per-feature on/off + Free/Pro; `mbbsFeatures.js`; ethical-floor locked free; MCQ off | ✅ KEEP — R3.0 registers its new features here |
| `mbbsNotifications.js` (morning digest, caps, quiet hours) + `MbbsNotificationsTab` + `mbbsIcsExport.js` | ✅ KEEP — digest content reads the corrected gates after R2/R5 |

## 13. Mistakes & mocks — 🗑 GONE (already removed in v2.0)

| Item | State |
|---|---|
| `MbbsMistakes`, `useMbbsMistakes`, `MbbsMocks`, `useMbbsMocks`, the mistake→SR graduation | 🗑 GONE (v2.0 S0). Orphan tables `mbbs_mistakes`/`mbbs_mocks`/`mbbs_mock_breakdown` remain physically in the DB, unread. Do not reintroduce. |
| `MbbsReviewSheet.jsx` (rapid-review sheet, re-sourced from item/topic notes) | ✅ KEEP — ethical-floor; reads notes, not mistakes |

---

## 14. What's NEW in R3.0 (built by the redesign sessions)

| Feature | Session |
|---|---|
| BMDC curriculum constants (`mbbsBmdcCurriculum.js`) — real cards/items/marks/rules | R0 |
| Corrections: honours 75%, GPA scale, Phase-1 lockout, 12-yr window | R1 |
| Per-class-type attendance | R2 |
| BMDC-seeded onboarding (real cards + items) | R3 |
| Continuous Assessment Card view (digital twin) | R4 |
| Corrected formative/term/GPA assessment model | R5 |
| Two-board oral in the Exam Period System | R6 |
| Integrated-teaching tracker + generic-topics checklist | R7 |
| Field placements (COME / mortuary / court) | R8 |
| Pass-probability recalibration | R9 |
| Clinical posting cards + privacy + case log + OSPE; internship (1-mo/UHC/2-yr); resources; payment | R10+ (deferred) |

---

## 15. The migration reality (do-not-recreate list)

Already RUN in Supabase (additive-only from here): `mbbs_001` … `mbbs_010`, `core_feature_flags`, `mbbs_004_questions_restore`. R3.0 adds at most a small number of **new** migrations (R2 seed-class-types is config/code, R5/R7/R8 may add nullable columns or one small table each — see `04_MBBS_DATA_MODEL.md`). **No destructive change to any shipped table.** The client must degrade gracefully (`42703/PGRST204/42P01/PGRST205`) until each new migration is run manually.

---

_See `04_MBBS_DATA_MODEL.md` for the schema deltas and `06_MBBS_BUILD_SESSIONS.md` for the sequenced build._


---
<!-- docnav-related -->
### Related docs
- [StudyRise — MBBS Bangladesh Module · Document Index (Redesign R3.0)](00_MBBS_INDEX.md)
- [BMDC MBBS Curriculum 2021 — Reference & Seed Authority](01_BMDC_CURRICULUM_REFERENCE.md)
- [StudyRise — MBBS Bangladesh Module · Product Specification (R3.0)](02_MBBS_PRODUCT_SPEC.md)
- [MBBS Bangladesh Module — Data Model (R3.0)](04_MBBS_DATA_MODEL.md)
- [MBBS Bangladesh Module — Decision Log (R3.0)](05_MBBS_DECISIONS.md)
- [MBBS Bangladesh Module — Build Sessions (R3.0)](06_MBBS_BUILD_SESSIONS.md)
- [MBBS Bangladesh Module — Build Log (R3.0)](07_MBBS_BUILD_LOG.md)
- [BMDC Curriculum (original) → moved (de-duplicated)](Original%20BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
