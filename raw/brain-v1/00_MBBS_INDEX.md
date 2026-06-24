# StudyRise — MBBS Bangladesh Module · Document Index (Redesign R3.0)

<!-- docnav -->
> **Docs ·** part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


_Version 3.0 — June 2026. This file set supersedes and replaces the entire v2.0 MBBS document set (`00_MBBS_INDEX` … `06_MBBS_BUILD_LOG`). Delete the old MBBS files; these are the new source of truth._

This is the complete, self-contained document set for the **BMDC-faithful redesign** of the MBBS Bangladesh module. The module already shipped (v2.0, deployed on `main`). This redesign re-grounds it so the app becomes a precise digital twin of the real BMDC 2021 system Bangladeshi medical students actually live inside — the continuous-assessment card, the term-card-item hierarchy, the per-class-type attendance record, the embedded-formative written paper, the two-board oral, and the exact professional-exam mark tables.

---

## The thesis of this redesign

The v2.0 module is structurally sound but was built against a **summary** of BMDC, not BMDC itself. With the full BMDC MBBS Curriculum 2021 now in hand, several facts are wrong or missing, and — more importantly — the app does not yet **mirror the artefacts** the student carries in real life. The redesign closes that gap.

**One sentence:** StudyRise MBBS Mode becomes the digital version of the student's BMDC continuous-assessment card and eligibility file — pre-loaded with the exact BMDC cards, items, marks, and rules for their phase, so the app maps one-to-one onto what their college and their university actually do.

**What changes at the core:**

1. **Real BMDC content, seeded.** Every subject's cards and items are the genuine BMDC-defined ones (Anatomy's Thorax card with its 8 dissection items, Physiology's 8 system cards, Biochemistry's 6 cards, Microbiology's 2 item cards, the clinical posting cards with their required case/procedure counts) — not generic placeholders. This is the single largest change and the reason the app will feel "real."
2. **The Continuous Assessment Card becomes a faithful digital twin** — Item · Full Marks · Marks Obtained · Date of exam · Remarks/Signature — exactly the paper card's columns.
3. **Per-class-type attendance** (Lecture / Tutorial / Practical / Integrated teaching), each tracked separately and each counting toward 75% — exactly as the BMDC attendance record table.
4. **Corrected assessment model** — formative is **10% embedded in each written paper** (not a separate exam), terms are hard 60% gates, the two-board oral is modelled, and the exact mark tables per professional exam are encoded.
5. **Corrected rules** — Honours = **75% (Grade A)** not 85%; the **Phase-1 lockout** rule; the **12-year** completion window; the GPA/letter-grade scale shown on every result.

Everything is **additive** on top of the deployed v2.0 schema and engines — nullable columns, idempotent migrations, engines extended not forked. Nothing destructive. Exam and USM modes are never touched.

---

## The files, in reading order

| # | File | What it is | When to read |
|---|---|---|---|
| 00 | `00_MBBS_INDEX.md` | This file — the map and the thesis | First |
| 01 | `01_BMDC_CURRICULUM_REFERENCE.md` | **The BMDC truth.** The full curriculum distilled into the canonical facts the app must mirror: phases, subjects, the exact card+item structure per subject, mark tables, eligibility rules, assessment mechanics, the GPA scale, field placements, internship. This is the seed-data and correctness authority. | Before any planning; it is the spine |
| 02 | `02_MBBS_PRODUCT_SPEC.md` | **What the redesigned module is and why.** Vision, principles, every feature redefined around the BMDC mirror, scope boundaries. | Before any session |
| 03 | `03_MBBS_CURRENT_STATE.md` | **What is deployed now (post-v2.0).** Every shipped table, hook, lib, screen, route — and what the redesign keeps / changes / removes. The honest ledger. | Before writing any session |
| 04 | `04_MBBS_DATA_MODEL.md` | **The migration contract for the redesign.** Existing v2.0 tables (do-not-recreate) + every new/changed table, columns, RLS scopes, additive-only rules. | When a session touches the schema |
| 05 | `05_MBBS_DECISIONS.md` | **The decision log.** Every binding decision for the redesign, with reasoning, so no session re-litigates a settled question. References as `Rn`. | When a session hits an ambiguity |
| 06 | `06_MBBS_BUILD_SESSIONS.md` | **The build prompts.** Self-contained Claude Code sessions in dependency order, each with read-first / goal / specs / done-when / close-out. Paste one at a time. | When building |
| 07 | `07_MBBS_BUILD_LOG.md` | **The implementation log.** Append-only. Opens with the v2.0 already-shipped record, then each redesign session appends what it actually built. | Updated every session |

---

## How these fit your existing repo docs

These files do **not** replace your repo-wide engineering docs. They sit alongside them:

- **`CLAUDE.md`** (repo root) stays the authoritative engineering index — conventions, the `ui/` library, `animations.js`, mode derivation, deploy commands, and the running record of the MBBS stack. Every session reads it and appends its durable facts to it.
- **`BRAND_KIT.md`** stays the authority on tokens, status colours, and voice.
- **`Deployment_Architecture.md`** stays the authority on the two Vercel projects and deploy commands.
- **The curriculum file `BMDC_MBBS_Curriculum_2021_Clean_StudyRise.md`** must live in the repo (e.g. `docs/curriculum/`) so the seed session (R0) can read verbatim item text directly from it.

The MBBS files above are the **module-specific layer**: what this one mode is, the BMDC facts it must mirror, and how to build it without breaking Exam or USM.

---

## The redesign at a glance (the build order)

| Session | Title | Why it is here |
|---|---|---|
| R0 | BMDC curriculum constants — the seed spine | Everything downstream reads it |
| R1 | Corrections — honours 75%, GPA scale, Phase-1 lockout, 12-yr window | Cheap, high-trust fixes |
| R2 | Per-class-type attendance (Lecture/Tutorial/Practical/IT) | Mirrors the real attendance card |
| R3 | Onboarding overhaul — seed real BMDC cards + items per phase | The "feels real" payoff |
| R4 | Continuous Assessment Card — the digital twin of the paper card | The centrepiece view |
| R5 | Assessment model correction — embedded formative + term gates + GPA | Correct marks maths |
| R6 | Two-board oral in the Exam Period System | Real exam scheduling |
| R7 | Integrated teaching tracker (attendance → practical marks) | A BMDC gate we missed |
| R8 | Field placements (COME / mortuary / court) | BMDC activity types we missed |
| R9 | Pass-probability recalibration against corrected gates | Honest projection |
| R10+ | Deferred: clinical posting cards, internship (1-mo join / UHC / 2-yr) | Build when Final-Prof demand appears |

Full detail and the binding reasoning are in `05_MBBS_DECISIONS.md`; the prompts are in `06_MBBS_BUILD_SESSIONS.md`.

---

## Working rules (apply to every build session)

- **Additive only.** New `mbbs_` tables; existing tables touched only via nullable columns. Idempotent migrations (`create table if not exists`, `add column if not exists`). Never a destructive change to a shipped v2.0 table; engines are extended, not forked.
- **Run the SQL manually.** Every migration is written into `migrations/` but run by you in the Supabase SQL Editor. The client degrades gracefully (`42703 / PGRST204 / 42P01 / PGRST205`) until it runs.
- **Flag-gate every feature.** The v2.0 feature registry (`app_feature_flags`) exists; every new feature ships gated so it can be turned off instantly. Ethical-floor features are locked free in code.
- **Never break Exam or USM.** Every MBBS screen is its own lazy chunk; Exam/USM users download and fetch zero MBBS code.
- **Match the visual bar.** `src/components/ui/` only, `var(--token)` only, `animations.js` only, dark mode, 375px floor, no exclamation marks, status-colour discipline, subject colour via palette key → `getUnitColor`, never hex.
- **BMDC is the authority on structure; the college is the authority on counts.** The app is rigid where BMDC is rigid (subjects, phases, components, pass marks, card/item names, mark tables) and configurable where colleges differ (item counts a college adds, timetable, send-up, internal patterns). Seeded BMDC content is always editable by the student.

---

_Start with `01_BMDC_CURRICULUM_REFERENCE.md`._
