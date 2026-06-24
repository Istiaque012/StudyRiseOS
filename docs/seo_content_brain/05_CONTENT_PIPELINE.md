# 05 · CONTENT PIPELINE — The Master Queue

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** The single source of truth for *what gets built and in what order*. It holds every planned article, every segment landing page, the keyword each owns, and its live status. When Istiaque says "write the next one," you pull from here. **Update the Status column whenever a piece is assigned or published** — this file is the keyword→URL map (file 03) made concrete.

> **Rebuilt 2026-06-22.** The previous article list (Tiers 1–5, #1–#84) was retired and replaced with the clusters below, rebuilt from fresh live SERP research. Segment landing pages and the blog hub/category structure were retained. See the CHANGELOG entry of the same date.

---

## How to Read This

- **Status values:** `⬜ Not started` · `🟨 In progress` · `✅ Live` · `🔁 Needs update`
- **Audience:** [EXAM] · [UNI] · [MBBS-BD] · [ALL]
- **Priority:** P0 = first wave · P1 = next · P2 = long-tail
- **Intent:** T = transactional · C = commercial/comparison · I = informational
- **Diff:** qualitative keyword difficulty from live SERP inspection — Low / Med / High (NOT a Semrush KD score; see research note below)
- **Slug:** the URL the piece will own at `studyrise.app/blog/{slug}` (landing pages live at root, e.g. `/mbbs-bangladesh`)

When you assign a keyword to a piece, confirm **no other row already owns it**. One keyword, one URL.

---

## ⚑ Keyword-research note (read before trusting the numbers)

This rebuild was researched on **2026-06-22** by live Google SERP / "People also ask" / autocomplete analysis plus the product spec (`FEATURES.md`).

- **No search-volume figures are included.** The Semrush MCP returned a plan-access error, and Google Search Console / Google Trends / Google Analytics were not connected this session. Inventing volume bands would be worse than omitting them.
- **`Diff` is qualitative** — a read of who currently ranks and how entrenched they are, not a metric.
- **`✓` = SERP-validated** in this research pass · **`∘` = assign keyword then confirm volume + SERP at the Brief stage** (file 06, Phase 1) before writing.
- Before drafting, run each row's keyword through whatever volume tool is available (GSC once these pages exist, Keyword Planner, or a Semrush plan with MCP access) and back-fill a volume band here.
- **All BMDC / curriculum facts come from `FEATURES.md` only** — never from the web sources scanned during research.

---

## ▶ Start Here: Recommended Build Order

**Quick wins (lowest competition, highest product fit — build these first):**
1. #21 — Item & Card system / BMDC continuous assessment  ⭐
2. #22 — Send-up & supplementary exam planning  ⭐
3. #40 — Set up StudyRise for MBBS Bangladesh  ⭐
4. #5  — AMC MCQ study plan (beachhead exam head term)
5. #19 — Item/card... *(see cluster D)* and #10 — "What grade do I need" calculator

**Wave plan:**

| Wave | Articles | Focus |
|---|---|---|
| **Wave 1** (Month 1–2) | #1, #2, #3, #4, #5, #21, #40 | POV pillars + product + beachhead + AMC head |
| **Wave 2** (Month 2–3) | #6, #8, #10, #17, #22, #24, #38 | Readiness + timely + finals + beachhead quick wins + funnel bridge |
| **Wave 3** (Month 3–4) | #14, #15, #27, #28, #32, #33, #39, #41 | Technique + planner comparisons + university planning |
| **Wave 4** (Month 4–5) | #7, #9, #11–#13, #16, #18, #23, #25, #26, #42 | Long-tail coverage + product depth |
| **Ongoing** (Month 5+) | Remaining P2 | Long-tail + seasonal refresh |

> **Seasonal:** the finals pieces (#17, #18) and the calculator tools (#10–#13) peak around exam periods — schedule ahead of major sittings.

---

## SEGMENT LANDING PAGES (highest commercial leverage — prioritise)

Transactional root pages, not blog posts. They anchor internal linking and convert best.

| Page | URL | Keyword | Audience | Priority | Status |
|---|---|---|---|---|---|
| Study Planner (general) | `/study-planner` | study planner app | [ALL] | — | ⬜ rebuild-pending (deleted 2026-06-21) |
| MBBS Bangladesh | `/mbbs-bangladesh` | MBBS Bangladesh study app | [MBBS-BD] | **P0** | ⬜ rebuild-pending (deleted 2026-06-21) |
| AMC MCQ Planner | `/amc-study-planner` | AMC study planner app | [EXAM] | P0 | ✅ Live 2026-06-24 |
| University Planner | `/university-study-planner` | semester planner app | [UNI] | P1 | ⬜ Not started |

---

> Hub model (decided 2026-06-24): when `/study-planner` is rebuilt it becomes the hub and links out to the three segment planners as spokes — `/amc-study-planner` (live), `/university-study-planner` (planned), `/mbbs-bangladesh` (planned). Segment planners are intentionally NOT placed in the top nav or footer; discovery is content-driven until the hub exists.

## BLOG HUB + CATEGORY PAGES (shared-shell rebuild)

Built on the blog-homepage / category recipes in `10_SITE_SHELL.md`. Build the hub first, then each category page once that category has ~3+ articles.

| Page | Deliverable | Audience | Status | Notes |
|---|---|---|---|---|
| Blog hub `/blog` | `public/blog.html` + `/blog` rewrite | [ALL] | ✅ Live | Blog-homepage recipe (file 10). |
| `/blog/medical-licensing-exams` | `public/blog/medical-licensing-exams.html` + rewrite | [EXAM] | ✅ Live | Built 2026-06-24. Hosts Cluster A; 1 card live (amc-mcq-study-plan). |
| `/blog/mbbs` | `public/blog/mbbs.html` + rewrite | [MBBS-BD] | 🟨 Built — noindex, awaiting first article | Hosts Cluster D; light hero + [MBBS-BD] restraint. |
| `/blog/university-courses` | `public/blog/university-courses.html` + rewrite | [UNI] | 🟨 Built — noindex, awaiting first article | Hosts Cluster B. |
| `/blog/study-skills` | `public/blog/study-skills.html` + rewrite | [ALL] | ✅ Live (2 articles) | Hosts Clusters E + F. |

---

## ★ FEATURED / FLAGSHIP PILLARS [mixed] — build first, link everything up into these

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 1 | How to Build a Study Plan You'll Actually Stick To [ALL] | `how-to-make-a-study-plan` | how to make a study plan ∘ | I | Med | P0 | ✅ |
| 2 | Spaced Repetition for Exams: Schedule Reviews So You Actually Remember [ALL] | `spaced-repetition-for-exams` | spaced repetition ✓ | I | Med-High | P0 | ✅ |
| 3 | What Is StudyRise? The Complete Guide [ALL] | `what-is-studyrise` | what is StudyRise (branded) ✓ | T | Low | P0 | ✅ |
| 4 | How to Study Through MBBS in Bangladesh: A Phase-by-Phase Guide [MBBS-BD] | `how-to-study-mbbs-bangladesh` | MBBS study plan Bangladesh ✓ | I | Low | P0 | ⬜ |

> #1 anchors University + planner clusters · #2 anchors the technique cluster + the SR product story · #3 anchors the product set · #4 is the acquisition-beachhead pillar. #3 doubles as the product-set cornerstone (do not duplicate it below).

---

## CLUSTER A — AMC MCQ [EXAM] · anchors `/amc-study-planner`

**SERP reality (2026-06-22):** every ranking page sells a course or question bank (Academically, CanadaQBank, AMCBootcamp, Primex, AMBOSS). The neutral *plan-it-and-track-readiness* angle is open. Timely facts to use (verify against amc.org.au at draft): the MCQ pass standard rises slightly from 2026 on the same 0–500 scale; the test is computer-adaptive; AMC partnered with eMedici on a free practice resource (already a logged source inside StudyRise).

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 5 | AMC MCQ Study Plan: A Realistic 4–6 Month Timeline | `amc-mcq-study-plan` | AMC MCQ study plan ✓ | T | Med | P0 | ✅ |
| 6 | Are You Ready for the AMC MCQ? Tracking Mocks, Weak Areas & Pace | `amc-mcq-readiness` | am I ready for AMC MCQ ✓ | C | Med | P1 | ⬜ |
| 7 | How Many Questions a Day for the AMC MCQ? | `amc-mcq-questions-per-day` | AMC MCQ how many questions per day ∘ | I | Low-Med | P1 | ⬜ |
| 8 | The 2026 AMC MCQ Pass-Standard Change — What It Means for You | `amc-mcq-pass-standard-2026` | AMC MCQ pass mark 2026 ✓ | I | Low-Med | P1 | ⬜ |
| 9 | AMC vs PLAB vs USMLE: Which Pathway, and How Prep Differs | `amc-vs-plab-vs-usmle` | AMC vs PLAB vs USMLE ✓ | C | Med | P1 | ⬜ |

> #9 captures PLAB/USMLE searchers even though those full clusters are backlogged; it cross-links to #26 (after-MBBS bridge).

---

## CLUSTER B — University [UNI] · anchors `/university-study-planner`

**SERP reality (2026-06-22):** grade/GPA calculator terms are owned by single-purpose tool domains (RogerHub, CalculatorSoup, calculator.net, gpacalculator.io) — nearly all **US-4.0 or single-final**. StudyRise's grade engine handles WAM, CGPA-10, UK Honours and percentage, so **win on the scales the incumbents ignore**, not the generic head term. Finals/semester intent is generic learning-centre + listicle content — winnable with a more concrete, mechanism-based piece.

**Tools — build as interactive calculator pages (logic mirrors `gradeEngine.js`), not plain articles.** Pending Istiaque's go-ahead on the interactive build type.

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 10 | What Grade Do I Need on My Final? (Weighted Calculator) | `what-grade-do-i-need-calculator` | what grade do I need on my final ✓ | T | High (niche it) | P0 | ⬜ |
| 11 | WAM Calculator for University Students | `wam-calculator` | WAM calculator ✓ | T | Med | P1 | ⬜ |
| 12 | CGPA Calculator (10-Point Scale) | `cgpa-calculator` | CGPA calculator ✓ | T | Med | P1 | ⬜ |
| 13 | UK Honours Degree Classification Calculator | `uk-degree-classification-calculator` | degree classification calculator ∘ | T | Med | P2 | ⬜ |

**Planning & finals**

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 14 | How to Plan a Whole Semester (So Deadlines Don't Ambush You) | `how-to-plan-a-semester` | how to plan a semester ∘ | I | Med | P1 | ⬜ |
| 15 | How to Make a Study Schedule for University | `study-schedule-for-university` | study schedule for college students ✓ | I | Med | P1 | ⬜ |
| 16 | How to Stop Assignments Piling Up in the Same Week | `avoid-assignment-overload` | too many assignments at once ∘ | I | Low-Med | P2 | ⬜ |
| 17 | How to Build a Finals Week Study Plan (Work Backward From Each Exam) | `finals-week-study-plan` | finals week study plan ✓ | I | Med | P0 | ⬜ |
| 18 | How to Study for Multiple Exams in One Week | `study-for-multiple-exams` | how to study for multiple exams ∘ | I | Med | P2 | ⬜ |

**Focus & LMS**

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 19 | How to Stop Procrastinating on Coursework (Without Guilt Tricks) | `stop-procrastinating-studying` | how to stop procrastinating studying ∘ | I | Med-High | P2 | ⬜ |
| 20 | How to Get All Your Canvas Deadlines Into One Planner | `canvas-deadlines-planner` | canvas assignments to calendar ∘ | I | Low-Med | P2 | ⬜ |

> Tie-in for #10–#18: StudyRise's revision planner weights each subject by *exam weight × gap-to-target* and its dashboard flags deadline-bunching — those are the concrete hooks no listicle has.

---

## CLUSTER D — MBBS Bangladesh [MBBS-BD] · anchors `/mbbs-bangladesh`

**SERP reality (2026-06-22):** the most defensible cluster. English-language results are admission consultants (targeting inbound students), Indian NEET-PG platforms (wrong curriculum), and one dated local blog. **No modern, student-facing BMDC-2021 planning resource exists.** Restrained tone, no gamification, no pressure framing. **Every curriculum fact from `FEATURES.md`** (phase/subject/card/item structure, marks, send-up, supplementary) — flag and ask if a detail isn't there.

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 21 | Keeping Up With the Item & Card System (BMDC Continuous Assessment) ⭐ | `bmdc-continuous-assessment` | BMDC continuous assessment ∘ | I | Low | P0 | ⬜ |
| 22 | Send-Up and Supplementary Exams: Planning When You're Behind ⭐ | `mbbs-supplementary-exam-plan` | MBBS supplementary exam Bangladesh ∘ | I | Low | P0 | ⬜ |
| 23 | How to Study for Your First Professional Exam (BMDC 2021) | `first-professional-exam-study-plan` | first professional MBBS exam preparation ✓ | I | Low | P1 | ⬜ |
| 24 | A Weekly Study Routine Around Classes, Items, and Wards | `mbbs-weekly-study-routine` | MBBS study routine Bangladesh ∘ | I | Low | P1 | ⬜ |
| 25 | Managing Stress Through MBBS in Bangladesh | `mbbs-stress-management-bangladesh` | MBBS student stress Bangladesh ∘ | I | Low | P1 | ⬜ |
| 26 | After MBBS in Bangladesh: PLAB, USMLE, or AMC — How to Choose | `after-mbbs-bangladesh-licensing` | after MBBS Bangladesh options ∘ | C | Low-Med | P0 | ⬜ |

> #26 is the funnel bridge: it carries a free MBBS user toward higher-value licensing-exam prep (links to Cluster A + #9). #23 overlaps the flagship #4 — keep #4 broad (whole-degree) and #23 narrow (first prof only); confirm no keyword cannibalisation at Brief.

---

## CLUSTER E — Study Technique [ALL] · category `/blog/study-skills`

**SERP reality:** authority-heavy and evergreen (university centres, established study sites). Treat as entity/topical-depth + AI-citation plays that feed the funnel, not the traffic backbone. #27 and #28 pair directly with flagship #2.

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 27 | Active Recall vs Re-reading: Why Testing Yourself Wins | `active-recall` | active recall ∘ | I | Med-High | P1 | ⬜ |
| 28 | The Forgetting Curve, Explained — and How to Beat It | `forgetting-curve` | forgetting curve ∘ | I | Med | P1 | ⬜ |
| 29 | How to Use the Pomodoro Technique Without It Becoming Busywork | `pomodoro-technique-studying` | pomodoro technique for studying ∘ | I | Med-High | P2 | ⬜ |
| 30 | How to Stop Cramming: Spreading Study Across Weeks | `how-to-stop-cramming` | how to stop cramming ∘ | I | Med | P2 | ⬜ |
| 31 | Interleaving: Why Mixing Subjects Beats Block Studying | `interleaving-study` | interleaving study ∘ | I | Low-Med | P2 | ⬜ |

---

## CLUSTER F — Planner / Tracker Comparisons [ALL / UNI] · category `/blog/study-skills`

**SERP reality (2026-06-22):** crowded listicle space (MyStudyLife, Notion, Shovel, Structured, Anki) where competitor apps publish their own comparisons; reviewers openly criticise feature-bloat and gamification — which is StudyRise's positioning. **Win by niching** (medical/exam students) rather than the generic "best study planner" head term.

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 32 | The Best Study Planner Apps for Medical & Exam Students (2026) | `best-study-planner-apps-medical-students` | best study planner app for medical students ✓ | C | Med | P1 | ⬜ |
| 33 | StudyRise vs Anki: Two Tools for Two Jobs | `studyrise-vs-anki` | Anki alternative ✓ | C | Low-Med | P1 | ⬜ |
| 34 | StudyRise vs Notion for Studying: When to Use Which | `studyrise-vs-notion` | Notion for studying ✓ | C | Med | P2 | ⬜ |
| 35 | Do You Need a Study Tracker? What to Track and Why | `do-you-need-a-study-tracker` | study tracker ∘ | I | Med | P2 | ⬜ |
| 36 | Study Planner vs Study Tracker: What's the Difference? | `study-planner-vs-study-tracker` | study planner vs study tracker ∘ | I | Low-Med | P2 | ⬜ |

---

## PRODUCT-INCORPORATION SET [ALL] — branded, low difficulty, high conversion

Branded terms are low-competition and are the on-ramp from every cluster. (The product cornerstone, "What Is StudyRise?", is flagship #3 — not repeated here.)

| # | Title | Slug | Primary keyword | Intent | Diff | Pri | Status |
|---|---|---|---|---|---|---|---|
| 37 | How to Set Up StudyRise for AMC MCQ Prep | `studyrise-for-amc-mcq` | StudyRise AMC (branded) | T | Low | P1 | ⬜ |
| 38 | How to Use StudyRise for Your University Semester | `studyrise-for-university` | StudyRise university (branded) | T | Low | P1 | ⬜ |
| 39 | How to Set Up StudyRise for MBBS Bangladesh ⭐ | `studyrise-for-mbbs-bangladesh` | StudyRise MBBS Bangladesh (branded) | T | Low | P0 | ⬜ |
| 40 | How StudyRise Plans Your Spaced Repetition (and Why It Works) | `studyrise-spaced-repetition` | StudyRise spaced repetition (branded) | C | Low | P1 | ⬜ |
| 41 | How StudyRise Projects Your Exam Readiness | `studyrise-readiness-projection` | StudyRise readiness (branded) | C | Low | P1 | ⬜ |

> #40 and #41 are the feature-deep explainers — the readiness projection and the Ebbinghaus-based SR engine are mechanics no competitor blog has; lean on them for credibility and AI citations.

---

## ⛔ Backlog — NOT in this build (consciously parked)

These were live opportunities in earlier planning but fall outside the clusters selected for this rebuild. Retained here so they aren't lost; promote into the tables above when scope expands.

| Item | Type | Audience | Why parked | Note |
|---|---|---|---|---|
| PLAB 1 / UKMLA cluster | Blog cluster | [EXAM] | Not in the selected cluster set | Strong timely angle: PLAB content now aligned to the UKMLA content map; old materials obsolete. ~180 SBA / 3h / ~62% pass (2025). |
| USMLE Step 1 cluster | Blog cluster | [EXAM] | Not in the selected cluster set | Timely: new 14×30-min block format from 14 May 2026; pass/fail since 2022. |
| `/plab-study-planner` landing | Landing page | [EXAM] | Pairs with parked PLAB cluster | — |
| `/usmle-study-planner` landing | Landing page | [EXAM] | Pairs with parked USMLE cluster | — |
| Setup guides: StudyRise for PLAB 1 / USMLE Step 1 | Product set | [EXAM] | Pair with parked clusters | — |

---

## Maintenance Log (update as you go)

| Date | Action | Piece | Notes |
|---|---|---|---|
| 2026-06-21 | Deleted | all static pages except homepage | Clean slate; rebuild under new page-creation framework. |
| 2026-06-21 | Queued | Blog hub + 4 category pages | Added under the shared-shell framework (file 10). |
| 2026-06-22 | Rebuilt | entire article queue (#1–#41) | Retired old Tiers 1–5 (#1–#84); rebuilt from fresh SERP research into Flagships + Clusters A/B/D/E/F + Product set. PLAB & USMLE clusters moved to Backlog. Volumes pending (Semrush MCP plan-gated; GSC/Trends not connected). |
| 2026-06-24 | Built | #2 spaced-repetition-for-exams | [ALL] Study Skills pillar. Gate passed. Cepeda 2008 + Ebbinghaus sourced. Live verify PASSED (200, own canonical, not app.html) → ✅. Inbound from #1 + #3 cross-linked. |
| 2026-06-24 | Built | Blog hub + study-skills + mbbs + university-courses | Hub (Blog schema, featured=what-is-studyrise + 3-card grid + notify). study-skills lists 2 live articles. mbbs + university-courses are noindex empty states until first article. Sitemap corrected: added /blog, /blog/study-skills, and the live-but-missing /blog/medical-licensing-exams and /blog/amc-mcq-study-plan. |

_Keep this log current. When you publish, change the row's Status to ✅ Live, add the real slug, and add a line here._

---
<!-- docnav-related -->
### Related docs
- [01 · CONTEXT — Read This First, Every Time](01_CONTEXT.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [03 · SEO STRATEGY — What to Make and Why](03_SEO_STRATEGY.md)
- [04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File](04_SEO_TECHNICAL_RULES.md)
- [06 · PRODUCTION PLAYBOOK — How to Make One Article, End to End](06_PRODUCTION_PLAYBOOK.md)
- [07 · IMAGE PROTOCOL — The Locked Image Rules](07_IMAGE_PROTOCOL.md)
- [08 · DEPLOYMENT GUIDE — Delivering the Finished File](08_DEPLOYMENT_GUIDE.md)
- [09 · AUDIT PLAYBOOK — Periodic SEO Health Checks](09_AUDIT_PLAYBOOK.md)
- [Blog Page Animation & Motion Guide](BLOG_ANIMATIONS_GUIDE.md)
- [Brand Kit → moved (de-duplicated)](BRAND_KIT.md)
- [Design Prompts → moved (de-duplicated)](DESIGN_PROMPTS.md)
- [StudyRise — Static Page Motion Guide](MOTION_GUIDE.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
