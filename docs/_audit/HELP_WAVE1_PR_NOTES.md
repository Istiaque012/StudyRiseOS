# Help Center Wave 1 — PR notes (accumulating across sessions)

> Working notes for the eventual **"Content: Exam Help Center — Wave 1"** PR (assembled in Session 5).
> Per-page QA checklists, OG/screenshot briefs, and forward-reference lists collect here as each
> page is built. Not shipped to the site.

---

## Page: `/help/exam/getting-started` (Cornerstone — Session 1)

**File:** `public/help/exam/getting-started.html`
**H1:** Getting Started with StudyRise Exam Mode
**Title tag (57):** Getting Started with StudyRise Exam Mode | StudyRise Help
**Meta desc (149):** Your first-run walkthrough of StudyRise Exam Mode — create your account, build an AMC MCQ, PLAB 1, or USMLE study plan, and run your first study day.

### §4 QA gate — PASS
- [x] GA snippet `G-R38JK89PP5` in `<head>`, unaltered.
- [x] All URL fields `https://www.studyrise.app/…` (canonical, og:url, og:image, twitter:image, all JSON-LD URLs, in-body links). Only bare `studyrise.app` occurrences are the intentional in-prose brand-disambiguation mention ("a study-planning app at studyrise.app", per 02_BRAND_VOICE) and the footer Instagram handle — neither is a URL field.
- [x] Canonical self-referential (`/help/exam/getting-started`, not `/`).
- [x] Sign-up CTAs → `?auth=register`; no `/login`|`/register`; no login-only copy needed.
- [x] Exactly one `<h1>`.
- [x] Banned-words scan clean: no "premium", "unlock", "free trial", "upgrade" in body; no retired trial phrase; no AI tells.
- [x] Trial window uses the exact compliant sentence (appears 3×: body + visible FAQ + FAQ schema).
- [x] JSON-LD valid: TechArticle + BreadcrumbList + HowTo + FAQPage. No BlogPosting (help ≠ blog).
- [x] FAQ schema ↔ visible parity confirmed (4 Q&As, exact match).
- [x] Title ≤60 (57); meta description 140–160 (149).
- [x] Every screenshot placeholder carries its exact final filename + written alt text (see below); motion flows (#6, #10) specced as looping muted MP4/WebM + WebP poster, not GIF.
- [x] Absent from blog hub / category / feed (lives under `public/help/`, not `public/blog/`).
- [x] No orphan: links to hub (`/help/exam`) + 3 siblings; hub will link back (Session 2).
- [x] Shell partials via `<!--#include nav-->` / `<!--#include footer-->`, injected verbatim by `build_site.py`.
- [x] `python3 build_site.py` passes; `check_blog.py` does not scan `/help/`.

### Outbound links present
- `https://www.studyrise.app/features` (intro + CTA secondary button)
- `https://www.studyrise.app/blog/amc-mcq-study-plan` (locked content link, in #plan)
- Conversion: `https://www.studyrise.app/?auth=register` (CTA band)

### Forward-reference links (targets not yet built — expected; wire/confirm later)
- `/help/exam/build-your-plan` — ships Session 3
- `/help/exam/daily-study-session` — ships Session 3
- `/help/exam/mock-exams` — ships Session 4
- `/help/exam` (hub) — ships Session 2
- `/help/exam/dashboard` — Wave 2 (not in Wave 1 scope); noted as H-series link debt
- `/contact` — "Tell us" / "Still stuck?" (per plan; may never be built — mirrors existing nav/footer contact usage)

### Inbound links (Session 5+/Session 6, from live fetch only)
- From `/features` and `/blog/amc-mcq-study-plan` → cornerstone. NOT edited now.

### Screenshot shot-list (placeholders shipped; real files later → `public/help/images/exam-getting-started/`)
Persona Dr. Sarah Chen at **true Day 0**. Alt text finalised now:
| File | Alt text |
|---|---|
| `01-register.webp` | StudyRise Exam Mode register form showing name, email and password fields with a password-strength meter, plus a Continue with Google button |
| `02-mode-select.webp` | StudyRise Mode Select screen with three cards — Exam Prep, University, and MBBS Bangladesh |
| `03-wizard-exam.webp` | Exam wizard Step 1 with AMC MCQ selected and exam-date and start-date fields |
| `04-wizard-hours.webp` | Exam wizard Step 2 showing daily-hours and days-per-week sliders with a live weekly-hours summary line |
| `05-wizard-summary.webp` | Exam wizard Step 3 summary showing exam name, days until the exam, and daily pace before generating the plan |
| `06-build.webp` + `06-build.mp4/webm` | The plan-build animation ticking through mapping subjects, pacing days, scheduling reviews, and finishing the dashboard (looping muted video, 3–4s) |
| `07-tour.webp` | The StudyRise Feature Tour overlay on step one, explaining what Exam Mode does |
| `08-dashboard-day0.webp` | The StudyRise Dashboard on day zero — Finish setting up banner, empty KPI tiles, a zero streak, and a large exam countdown |
| `09-today-planner.webp` | The Today day-planner setup asking for a start and end time before it builds a schedule of study blocks |
| `10-today-timer.webp` + `10-today-timer.mp4/webm` | A live block timer on Today counting down in red with Pause and Skip controls (looping muted video, 3–4s) |
| `11-log-modal.webp` | The Today Log modal with Complete, Partial, Missed and Rest Day buttons and a questions-done field |

### OG image brief (Istiaque produces final asset → `public/help/images/exam-getting-started/og.webp`)
```
IMAGE BRIEF — Getting Started with StudyRise Exam Mode · OG
─────────────────────────────────────────────
Purpose:      Open Graph / share card for the Exam Mode cornerstone help page
Dimensions:   1200×630
Filename:     og.webp   → public/help/images/exam-getting-started/og.webp

Concept:      "Getting started" product-docs card — calm, oriented, first-run feel.
Composition:  Left third: heading text on a solid/gradient panel for contrast.
              Right two-thirds: a clean, cropped mock of the 3-step wizard or the
              Day-0 Dashboard countdown (demo data only, no notifications).
Text overlay: "Getting started with Exam Mode"  (5 words; legible small)
Brand colours: gradient #7C3AED → #2563EB → #06B6D4; navy #0D1B3E for text.
              Bake contrast into the image (panel behind text) — must read on both
              light and dark backings (dark-mode share surfaces).
Font:         Plus Jakarta Sans 700/800 for the heading; Inter for any sub-text.
Mood:         Calm, focused, welcoming — the "coach" tone, not hype.
Must include: StudyRise logo bottom-right, small.
Avoid:        stethoscope-on-keyboard, fake AI glow, stock clichés, GIF.
─────────────────────────────────────────────
```

### Notes for Session 5 brain/wiki updates
- Add row to `12_INTERNAL_LINKS.md` Page Registry: URL `/help/exam/getting-started`, title, audience `[EXAM]`, type `help`, status 🟨 built (pending routing/indexing), primary keyword "StudyRise exam mode getting started".
- Add row to `05_CONTENT_PIPELINE.md`.
- New file `13_HELP_CENTER.md` (spec) + `CHANGELOG.md` entry.
- Wiki page `wiki/content/Help Center.md` + `wiki/index.md` entry.

---

## Page: `/help/exam/build-your-plan` (Session 3)

**File:** `public/help/exam/build-your-plan.html`
**H1:** Build your Exam Mode study plan
**Title tag (49):** Build Your Study Plan in StudyRise Exam Mode | Help
**Meta desc (150):** How StudyRise Exam Mode builds your study plan — pick your exam type, set your dates and study load, and generate a paced plan across three phases for AMC, PLAB or USMLE.

### §4 QA gate — PASS
- [x] GA `G-R38JK89PP5` in `<head>`, unaltered.
- [x] All URL fields `https://www.studyrise.app/…`; only bare `studyrise.app` is the intentional brand-disambiguation prose mention.
- [x] Canonical self-referential (`/help/exam/build-your-plan`).
- [x] CTAs → `?auth=register`; no `/login`|`/register`.
- [x] Exactly one `<h1>`.
- [x] Banned-words scan clean (no premium/unlock/free trial/upgrade-in-body/AI tells).
- [x] Trial window not mentioned on this page — compliant sentence not required.
- [x] JSON-LD: TechArticle + BreadcrumbList + HowTo + FAQPage. No BlogPosting.
- [x] FAQ schema ↔ visible parity (4 Q&As).
- [x] Title ≤60 (49); meta desc ≤155 (150).
- [x] Illustrations are HTML/CSS mocks (`<figure role="img">`, captioned *Illustration*): wizard step-1 exam-type cards, step-2 load sliders + weekly-hours line, step-3 summary, 3-phase timeline. No `<img>`/JS/motion.
- [x] Absent from blog hub/category/feed.
- [x] No orphan: links to hub + getting-started/subjects-and-tasks/daily-study-session; hub links back.
- [x] Shell partials via includes, injected verbatim.
- [x] `python3 build_site.py` green.

### Links
- Outbound: `/features` (CTA), `/blog/amc-mcq-study-plan` (AMC exam content).
- Internal: hub, getting-started, subjects-and-tasks, spaced-repetition, mock-exams.
- Conversion: `?auth=register`.

### Link-debt / forward-refs
- **PLAB 1 and USMLE Step 1 have no dedicated content page yet** — named in copy without a dead link (only AMC content exists). Wire when PLAB/USMLE exam content ships.
- `spaced-repetition` (S4), `mock-exams` (S5), `subjects-and-tasks` (S3) — resolve within Wave 1.

---

## Page: `/help/exam/subjects-and-tasks` (Session 3)

**File:** `public/help/exam/subjects-and-tasks.html`
**H1:** Add, edit, and delete subjects and tasks
**Title tag (48):** Subjects & Tasks in StudyRise Exam Mode | Help
**Meta desc (147):** How to add, edit, reorder, and delete subjects and tasks in StudyRise Exam Mode, plus the task-detail drawer for tuning due dates, hours, and checklists.

### §4 QA gate — PASS
- [x] GA `G-R38JK89PP5` in `<head>`, unaltered.
- [x] All URL fields `https://www.studyrise.app/…`.
- [x] Canonical self-referential (`/help/exam/subjects-and-tasks`).
- [x] CTAs → `?auth=register`; no `/login`|`/register`.
- [x] Exactly one `<h1>`.
- [x] Banned-words scan clean.
- [x] Trial window not mentioned — compliant sentence not required.
- [x] JSON-LD: TechArticle + BreadcrumbList + HowTo + FAQPage. No BlogPosting.
- [x] FAQ schema ↔ visible parity (4 Q&As).
- [x] Title ≤60 (48); meta desc ≤155 (147).
- [x] Illustrations are HTML/CSS mocks: Settings→Subjects list (reorder/edit/remove), task row + add fields, task-detail drawer with step checklist. No `<img>`/JS.
- [x] Absent from blog hub/category/feed.
- [x] No orphan: links to hub + build-your-plan/plan-and-schedule/settings; hub links back.
- [x] Shell partials injected verbatim.
- [x] `python3 build_site.py` green.

### Links
- Outbound: `/features` (CTA).
- Internal: hub, build-your-plan, plan-and-schedule (S6), staying-on-track (S6), settings (S9), daily-study-session (S4).
- Conversion: `?auth=register`.

### Link-debt / forward-refs
- `plan-and-schedule`, `staying-on-track` (S6), `settings` (S9) — resolve within Wave 1.

---

## Page: `/help/exam/daily-study-session` (Session 4)

**File:** `public/help/exam/daily-study-session.html`
**H1:** Your daily study session on Today
**Title tag (48):** Your Daily Study Session in StudyRise | Help
**Meta desc (154):** Run a study day in StudyRise Exam Mode — generate a day plan of 50/10 blocks, use the block timers, work the sidebar tools, and log your day honestly in the Log modal.

### §4 QA gate — PASS
- [x] GA `G-R38JK89PP5` unaltered; all URL fields `www`; canonical self-referential; CTAs `?auth=register`; one `<h1>`.
- [x] Banned-words clean; trial window not mentioned (sentence not required).
- [x] JSON-LD TechArticle + BreadcrumbList + HowTo + FAQPage; FAQ schema↔visible parity (4 Q&As); no BlogPosting.
- [x] Title ≤60 (48); meta desc ≤155 (154).
- [x] Mocks (HTML/CSS, `<figure role="img">`, *Illustration*): Today day-planner (50/10 blocks + fixed commitment), running block timer (red countdown ring), Log modal (Complete/Partial/Missed/Rest + questions), floating "+" quick-logger. No `<img>`/JS/motion.
- [x] Absent from blog surfaces; no orphan (links hub + spaced-repetition/logging-questions/staying-on-track; hub links back); shell partials verbatim; build green.

### Links
- Outbound `/features` (CTA); internal hub, getting-started, spaced-repetition, logging-questions, staying-on-track (S6); conversion `?auth=register`.

### Link-debt / forward-refs
- `staying-on-track` (S6) — resolves within Wave 1.

---

## Page: `/help/exam/spaced-repetition` (Session 4)

**File:** `public/help/exam/spaced-repetition.html`
**H1:** Spaced repetition in Exam Mode
**Title tag (49):** Spaced Repetition in StudyRise Exam Mode | Help
**Meta desc (152):** How the StudyRise Exam Mode SR module works — the review queue, recall ratings and their 3/7/14/21-day intervals, the retention heatmap, and your SR settings.

### §4 QA gate — PASS
- [x] GA unaltered; all URL fields `www`; canonical self-referential; CTAs `?auth=register`; one `<h1>`.
- [x] Banned-words clean; trial window not mentioned.
- [x] JSON-LD TechArticle + BreadcrumbList + HowTo + FAQPage; FAQ schema↔visible parity (4 Q&As).
- [x] SR intervals stated as tutorial: Blackout 3 / Hard 7 / Medium 14 / Easy 21 days. (Stop-and-ask if live app differs — matches tutorial §7.)
- [x] Title ≤60 (49); meta desc ≤155 (152).
- [x] Mocks: review queue (Subject-blue/Topic-purple + compliance ring), 4 grade buttons w/ intervals, retention heatmap, SR Settings panel w/ live preview. No `<img>`/JS.
- [x] Absent from blog surfaces; no orphan (links hub + daily-study-session/logging-questions/settings; hub links back); shell verbatim; build green.

### Links
- Outbound `/features` (CTA); internal hub, daily-study-session, logging-questions, analytics-and-reports (S8), settings (S9); conversion `?auth=register`.

### Link-debt / forward-refs
- `analytics-and-reports` (S8), `settings` (S9) — resolve within Wave 1.

---

## Page: `/help/exam/logging-questions` (Session 5)

**File:** `public/help/exam/logging-questions.html`
**H1:** Logging questions in Exam Mode
**Title tag (49):** Logging Questions in StudyRise Exam Mode | Help
**Meta desc (152):** How to log question-bank practice in StudyRise Exam Mode — the log form, paste-results import, flagging a topic for spaced-repetition review, and the quick logger.

### §4 QA gate — PASS
- [x] GA unaltered; URL fields `www`; canonical self-referential; CTAs `?auth=register`; one `<h1>`; banned-words clean; trial not mentioned.
- [x] JSON-LD TechArticle + BreadcrumbList + HowTo + FAQPage; FAQ schema↔visible parity (4 Q&As).
- [x] Title ≤60 (49); meta ≤155 (152).
- [x] Mocks (HTML/CSS, `role="img"`, *Illustration*): question log form + accuracy badge, Paste-results parser (pasted text → editable table), Flag-for-review control. No `<img>`/JS.
- [x] Absent from blog surfaces; no orphan (links hub + mock-exams/spaced-repetition/daily-study-session; hub links back); shell verbatim; build green.

### Links
- Outbound `/features` (CTA); internal hub, mock-exams, spaced-repetition, daily-study-session; conversion `?auth=register`. No forward-ref debt.

---

## Page: `/help/exam/mock-exams` (Session 5)

**File:** `public/help/exam/mock-exams.html`
**H1:** Logging mock exams
**Title tag (50):** Logging Mock Exams in StudyRise Exam Mode | Help
**Meta desc (140):** How to log mock exams in StudyRise Exam Mode — the mock form, the readiness bands, the per-subject breakdown, and your score trend and average pace.

### §4 QA gate — PASS
- [x] GA unaltered; URL fields `www`; canonical self-referential; CTAs `?auth=register`; one `<h1>`; banned-words clean; trial not mentioned.
- [x] JSON-LD TechArticle + BreadcrumbList + HowTo + FAQPage; FAQ schema↔visible parity (4 Q&As).
- [x] Facts per tutorial §9: bands Unsafe<55 / Improving 55–60 / Borderline 61–64 / Exam-ready ≥65; default pace 72s. (Stop-and-ask if live app differs.)
- [x] Title ≤60 (50); meta ≤155 (140).
- [x] Mocks: mock log form + live band, readiness bands, per-subject breakdown + total-mismatch warning, score trend vs 65% line + pace indicator. No `<img>`/JS.
- [x] Absent from blog surfaces; no orphan (links hub + logging-questions/readiness-and-projections/analytics-and-reports; hub links back); shell verbatim; build green.

### Links
- Outbound `/features` (CTA); internal hub, logging-questions, readiness-and-projections (S7), analytics-and-reports (S8), revision-sprint (S9); conversion `?auth=register`.

### Link-debt / forward-refs
- `readiness-and-projections` (S7), `analytics-and-reports` (S8), `revision-sprint` (S9) — resolve within Wave 1.

---

# Session 6 PR Notes — Help Center Exam Wave 1

## A) `public/help/exam/plan-and-schedule.html`

**Brief.** Covers the Plan screen (`/plan`) per tutorial §6: the four-way view toggle — List (phase groups, All/Not started/In progress/Completed filter bar with live counts, Manual/Due date/Subject/Hours sort, phase summary strip), Kanban "Board" (drag into Completed to mark done), Timeline (week-by-week, mock lane + per-subject lanes, task/milestone/SR markers, amber heavy-week glow, dashed stop-new-material line, red exam-day line), and Sprint (appears only after activating a Revision Sprint from the Dashboard nudge — linked to the revision-sprint guide, not duplicated). Closes with the task detail drawer: due date, estimated hours, phase, subject, question target, checklist, mark complete with a specific date.

**Outline.** answer lead → #list → #kanban → #timeline → #sprint → #drawer → #faq (4 Q&As).

**Mocks (2, Dr. Sarah Chen, mid-plan).**
1. `aria-label`: "The Plan screen's List view for Dr. Sarah Chen — a view toggle with List selected next to Board, Timeline; filter chips reading All 96, Not started 41, In progress 3, Completed 52; a sort dropdown set to Due date; a phase summary strip; and Phase 2 tasks including a completed Cardiology task and an in-progress Respiratory task"
2. `aria-label`: "The task detail drawer for Dr. Sarah Chen's Respiratory task — editable fields for due date 14 Aug 2026, estimated hours 3, phase Phase 2, subject Respiratory, question target 60; a step-by-step checklist with two of four steps ticked; and a Mark complete button with a completion-date field"

**§4 QA checklist.**
- [x] GA snippet G-R38JK89PP5 present
- [x] All URLs `https://www.studyrise.app/...`, no bare domain, no trailing slashes
- [x] Self-referential canonical (`/help/exam/plan-and-schedule`)
- [x] Sign-up CTAs use `?auth=register` (nav, mobile menu, CTA band, footer)
- [x] Exactly one `<h1>`
- [x] Banned words clean (no premium/unlock/free trial/upgrade/seamless/elevate/etc.; trial not mentioned)
- [x] JSON-LD: TechArticle + BreadcrumbList (4 items ending at page) + HowTo (4 steps mirroring #list/#kanban/#timeline/#drawer with anchor URLs) + FAQPage in exact parity with visible `<details>`
- [x] Title 51 chars ("Plan Views & Editing Your Schedule | StudyRise Help"); meta description 135 chars
- [x] Mocks: pure HTML + scoped CSS, no `<img>`/JS, `role="img"` + aria-label, figcaption "Illustration: …", Dr. Sarah Chen persona, no invented UI
- [x] Sibling box: hub + staying-on-track + subjects-and-tasks + revision-sprint

## B) `public/help/exam/staying-on-track.html`

**Brief.** The "how do I reschedule when I'm behind" page, framed as the coach's calm, no-guilt recovery playbook (tutorial §5 + §4). Covers Backdate and Skip Today on the Today current-task card; Pause on a live block timer re-timing every later block around the interruption; the question-deficit KPI tile and paying it down gradually; rest days as a plan (consistency strip never shades rest red — blue = planned rest) and logging Missed honestly in the Log modal (Complete/Partial slider/Missed/Rest Day); and the overload/burnout amber card from "your study coach" driven by accuracy trend, SR compliance, and missed days — never guilt, just a nudge. Links to daily-study-session and settings (Daily Routine max-tasks cap / rest day).

**Outline.** answer lead → #reschedule → #pause → #deficit → #rest → #coach → #faq (4 Q&As).

**Mocks (2, Dr. Sarah Chen, mid-plan).**
1. `aria-label`: "Dr. Sarah Chen's Today screen mid-plan — the current task card for a Phase 2 Renal task with Mark Complete, Skip Today, Backdate, and Log buttons, next to a question deficit KPI tile reading 35 questions behind target"
2. `aria-label`: "Dr. Sarah Chen's Dashboard showing the amber overload note from the study coach — a calm message suggesting easing off after three heavy days, above a consistency strip of colored dots where the planned rest day is blue, not red"

**§4 QA checklist.**
- [x] GA snippet G-R38JK89PP5 present
- [x] All URLs `https://www.studyrise.app/...`, no bare domain, no trailing slashes
- [x] Self-referential canonical (`/help/exam/staying-on-track`)
- [x] Sign-up CTAs use `?auth=register`
- [x] Exactly one `<h1>`
- [x] Banned words clean (trial not mentioned)
- [x] JSON-LD: TechArticle + BreadcrumbList (4 items) + HowTo (5 steps mirroring #reschedule/#pause/#deficit/#rest/#coach with anchors) + FAQPage in exact parity with `<details>`
- [x] Title 50 chars ("Falling Behind? How to Reschedule | StudyRise Help"); meta description 151 chars
- [x] Mocks per rules (HTML+CSS only, role="img", Illustration captions, persona, tutorial-grounded)
- [x] Sibling box: hub + daily-study-session + plan-and-schedule + settings

**Note.** One soft extrapolation flagged: the deficit tile in mock 1 shows a "Catch-up mode" chip label — decorative copy, not a claimed product feature; everything else is straight from tutorial §4–§6.

---

# Session 7 PR Notes — Help Center Exam Wave 1 (Dashboard + Readiness)

Branch: `content/help-exam-wave1` · Source of truth: `EXAM_MODE_TUTORIAL.md` §4 · Template cloned: `public/help/exam/mock-exams.html`

---

## A) `public/help/exam/dashboard.html`

**Brief.** A guided tour of the Exam Mode Dashboard (`/` route), grouped exactly as the tutorial groups it: time-sensitive banners (T-minus checklist, logistics nudge, finish-setting-up, Revision Sprint nudge [Pro], overload/burnout note), always-on cards (consistency strip, SR due banner, Today's task, six KPI tiles, question-bank first-pass ring, phase bars, Top 3 priorities, AI Study Advisor [Pro]), and the right-hand readiness column — where the three readiness widgets get one line each plus a link to readiness-and-projections rather than duplication. Closes with the phone layout (Today / Progress tabs).

**Outline.** H1 "Your Dashboard — mission control" → answer lead → `#banners` Time-sensitive banners → `#cards` Always-on cards → `#right` The readiness column → `#phone` On your phone → `#faq` (4 Q&As).

**Mocks (3, Dr. Sarah Chen, mid-plan; all `figure.help-mock` > `.hm[role=img]`, figcaption "Illustration:", no img/JS):**
1. aria-label: "The T-minus exam-day checklist banner showing 6 days to exam for Dr. Sarah Chen, with five checklist items — test-center route confirmed and ID documents ready ticked manually, recent mock completed ticked automatically, no new material and sleep schedule adjusted still open"
2. aria-label: "Six KPI tiles for Dr. Sarah Chen mid-plan — 62 percent plan tasks completed, 84 percent SR compliance, 1,240 questions done, 61 percent mock average, 6 of 7 days consistency, and a question deficit of 35 — above a consistency strip of seven dots, five green, one blue rest day, one gray, with a 4-day streak"
3. aria-label: "The Go/No-Go card for Dr. Sarah Chen showing a Pro badge, the verdict you clear the line with a solid margin, a small rising sparkline of recent mock scores, and top weak subjects Renal, Pharmacology, and Biostatistics"

**Sibling box:** hub, readiness-and-projections, daily-study-session, analytics-and-reports.

---

## B) `public/help/exam/readiness-and-projections.html`

**Brief.** Disambiguates the three similarly-named readiness numbers users conflate: the Today's study compliance ring (composite 0–100 of present-tense effort, with sub-bars), the Readiness Projection (calibrated pass-probability forecast from logged mocks via a regression trend line, with confidence band, pass line, margin, trend arrow — described as needing "several" mocks, no exact minimum stated), and the Go/No-Go card (plain-English verdict in the final 35 days, sparkline + weak subjects; "This is part of StudyRise Pro"). Ends with what feeds each number and why honest logging matters; links to mock-exams (breakdown = biggest input) and logging-questions. No formulae fabricated — behaviour only.

**Outline.** H1 "Readiness, projections, and Go/No-Go" → answer lead → comparison card → `#compliance` Compliance ring → `#projection` Readiness Projection → `#gonogo` Go/No-Go → `#feeds` What feeds these numbers → `#faq` (4 Q&As).

**Mocks (3):**
1. aria-label: "Three readiness numbers side by side for Dr. Sarah Chen — Today's study compliance 78 out of 100 measuring today's effort, Readiness Projection 71 percent pass probability forecasting from mocks, and Go/No-Go showing the verdict Go, a Pro feature in the final 35 days"
2. aria-label: "Dr. Sarah Chen's Today's study compliance ring at 78 out of 100, with sub-bars showing plan completion 85 percent, SR retention 80 percent, questions 70 percent, and mocks 62 percent"
3. aria-label: "Dr. Sarah Chen's Readiness Projection chart — a rising blue regression trend line through five mock scores inside a shaded confidence band, crossing a dashed green pass line at 65 percent, with a margin of plus 3 points and a trend arrow reading Improving plus 2 points per week"

**Sibling box:** hub, mock-exams, dashboard, analytics-and-reports.

---

## QA checklist (both pages)

| Check | dashboard | readiness-and-projections |
|---|---|---|
| GA G-R38JK89PP5 present | ✅ | ✅ |
| All URLs www.studyrise.app, no bare domain, no trailing slashes (except root) | ✅ | ✅ |
| Self-referential canonical | ✅ | ✅ |
| Sign-up CTAs `?auth=register` (nav, mobile, CTA band, footer) | ✅ | ✅ |
| Exactly one `<h1>` | ✅ | ✅ |
| Banned words clean (grep: premium/unlock/free trial/upgrade/seamless/elevate/dive in/in conclusion/worth noting/furthermore/moreover → 0 hits) | ✅ | ✅ |
| FAQPage JSON-LD exactly mirrors on-page FAQ (4/4) | ✅ | ✅ |
| HowTo steps mirror sections with anchors (4 steps) | ✅ | ✅ |
| BreadcrumbList 4 items, matches on-page crumb | ✅ | ✅ |
| Title ≤60 (51 / 45), meta description ≤155 (146 / 148) | ✅ | ✅ |
| Mocks: figure.help-mock, role="img" + aria-label, figcaption "Illustration:", no `<img>`, no JS, Dr. Sarah Chen persona, no PII | ✅ | ✅ |
| Cross-links: dashboard→readiness (readiness column, no duplication); readiness→mock-exams + logging-questions | ✅ | ✅ |
| Nav/footer shell copied byte-for-byte incl. include markers | ✅ | ✅ |
| Pro features stated plainly ("This is part of StudyRise Pro."); trial not mentioned | ✅ | ✅ |
| Facts sourced from EXAM_MODE_TUTORIAL.md §4 only; no invented behaviour | ✅ | ✅ |

**Flags:** tutorial doesn't state an exact mock minimum for the projection — described as "several logged mocks" per instruction. No other gaps.

---

# Session 8 PR Notes — Help Center Exam Wave 1 (history, analytics-and-reports)

## Article A — `public/help/exam/history.html`

**Brief.** Short guide to the History screen (`/history`), per tutorial §10. Positions History as the honest month calendar of the plan: four colour codes (green complete, amber partial, red missed, blue planned rest day), tap-a-day detail (what you studied, questions logged, time spent, SR reviews completed), and its real job — pattern-spotting (missed Wednesdays, dropped-pace weeks). Recovery angle links to staying-on-track. 3 min read.

**Outline.**
- Answer lead
- `#calendar` — The month calendar (colour code)
- `#day-detail` — The day detail (tap a day)
- `#patterns` — Spotting patterns (→ staying-on-track)
- `#faq` — 3 Q&As (colours / day detail / what to use it for)

**Mocks (1).**
1. `History · September 2026` — month grid with colour-coded days + tapped-day detail card. aria-label: "The History month calendar for Dr. Sarah Chen with colour-coded days — mostly green complete days, some amber partial days, red missed days on two Wednesdays, and blue rest-day Fridays — with a detail card for the selected day showing Cardiology study, 45 questions logged, 2 hours 10 minutes spent, and 3 SR reviews completed". Caption starts "Illustration:".

**Sibling box.** hub, staying-on-track, daily-study-session, analytics-and-reports.

## Article B — `public/help/exam/analytics-and-reports.html`

**Brief.** Guide to Analytics (`/analytics`, tutorial §11) and the Progress Report (`/report`, §12). States up front "This is part of StudyRise Pro." Walks the dozen-plus charts as three questions — is the ground work happening (qbank area chart, SR donut, forgetting curves, SR timeline, SR per subject, subject-balance vs blueprint), am I on track to pass (mock trend, pace card, Pass Probability Trajectory, per-subject mocks, confidence-vs-accuracy at ≥5 tagged sessions), where should next week go (Focus Areas, retention map, heatmap) — then the Progress Report's sections, its two entry points, and light-mode-PDF printing. Frames Analytics as a weekly habit. 8 min read.

**Outline.**
- Answer lead (Pro note, weekly habit)
- `#groundwork` — Is the ground work happening?
- `#trajectory` — Am I on track to pass? (→ mock-exams, readiness-and-projections)
- `#focus` — Where should next week go? (Focus Areas mock)
- `#report` — The Progress Report (report mock)
- `#faq` — 4 Q&As (Pro / cadence / confidence chart threshold / save as PDF)

**Mocks (2).**
1. `Analytics · Focus Areas` — ranked weak subjects with next actions + Print report button. aria-label: "The Analytics Focus Areas panel for Dr. Sarah Chen ranking her three weakest subjects — Renal at 55 percent with a suggested action to schedule an SR review block, Pharmacology at 58 percent with a suggested 40-question practice set, and Endocrine at 61 percent with a suggested revisit of flagged questions — with a Print report button in the header".
2. `Progress Report` — stacked report sections + Print / Save as PDF button. aria-label: "The Progress Report for Dr. Sarah Chen with a Print / Save as PDF button, overview stats showing 68 study days, 2140 questions logged and a 61 percent mock average, followed by stacked sections for the readiness summary, subject performance table, mock exam history, question-bank first-pass progress, top focus areas, and the 30-day consistency chart".

**Sibling box.** hub, readiness-and-projections, mock-exams, logging-questions.

## QA checklist (both pages)

- [x] GA tag G-R38JK89PP5 present, same snippet as template
- [x] All URLs `https://www.studyrise.app/...`, no bare domain, no trailing slashes (grep-verified)
- [x] Self canonical (history / analytics-and-reports), OG/Twitter use shared help-og.webp
- [x] Sign-up CTAs use `?auth=register`; nav/footer shell copied byte-for-byte incl. include markers
- [x] Exactly one `<h1>` per page (grep-verified)
- [x] Banned words absent: premium/unlock/free trial/upgrade(body)/seamless/elevate/let's dive in/in conclusion/it's worth noting/furthermore/moreover (grep-verified; trial sentence used verbatim in analytics Pro FAQ only)
- [x] JSON-LD: TechArticle + BreadcrumbList (4 items) + HowTo (steps mirror h2 anchors) + FAQPage with exact on-page parity (3 Q&As history, 4 analytics)
- [x] Title ≤60 chars ("The History Calendar | StudyRise Help" 38; "Analytics & Progress Report | StudyRise Help" 45); meta descriptions ≤155
- [x] Mocks: `figure.help-mock`, `role="img"` + aria-label, figcaption "Illustration: …", pure HTML + scoped CSS via tokens, no `<img>`/JS in mock, Dr. Sarah Chen mid-plan demo data, no PII
- [x] Voice: second person, each h2 opens with 40–60 word direct answer then numbered steps; SR and blueprint categories defined on first use
- [x] Internal links: history → staying-on-track, analytics-and-reports hub siblings; analytics → mock-exams, readiness-and-projections; CTA band → ?auth=register + /features + "Start free — no card required."
- [x] Product facts sourced only from EXAM_MODE_TUTORIAL.md §10–12; nothing invented

**Missing facts flagged.** None blocking. Notes: (a) tutorial doesn't specify how "partial" vs "complete" days are determined — article describes colours only, no thresholds invented; (b) Focus Areas next-action wording in the mock is illustrative demo copy (tutorial says "a suggested next action" without examples); (c) Progress Report overview-stat labels in the mock are demo data consistent with "overview stats".

---

# Session 9 PR Notes — Help Center Wave 1 (Exam Mode)

## A) `public/help/exam/revision-sprint.html`
**Brief:** New Pro-feature guide for the Revision Sprint — the weakness-weighted final-month schedule. States "This is part of StudyRise Pro" in the lead and opening paragraph. Covers what the Sprint is (weighted days, built-in mock days, final-3-day taper), the strictly opt-in activation from the Dashboard nudge at ≤28 days ("Activate Sprint" — not from Plan), the Sprint tab appearing in Plan's view toggle pre-built, the Sprint mocks section on Mock Exams (~every 4 days, tapering), and the T-minus exam-day checklist handoff (5 items, three auto-tick, no-new-material auto-checks in final 3 days). Facts sourced from EXAM_MODE_TUTORIAL.md §6, §4, §9.

**Outline:** answer lead → What the Sprint is → Activate it from the Dashboard (+HowTo) → The Sprint schedule → Sprint mocks → The final 7 days: T-minus checklist → FAQ (4).

**Mocks (2), persona Dr. Sarah Chen, mid-plan:**
1. Dashboard Sprint nudge — aria-label: "The Dashboard Revision Sprint nudge for Dr. Sarah Chen, 26 days from her exam, inviting her to switch to a weakness-weighted revision schedule, with an Activate Sprint button and a Not yet option"
2. Sprint schedule strip — aria-label: "A Sprint day-by-day schedule strip for Dr. Sarah Chen showing seven days: weakness-weighted revision days for Renal and Endocrine, a scheduled mock day, more weighted revision, then two lighter taper days marked light review before exam day"

## B) `public/help/exam/settings.html`
**Brief:** Reference "map" article covering all eleven Settings tabs per tutorial §13 — one subsection per tab, each cross-linking to its dedicated guide (build-your-plan, subjects-and-tasks, spaced-repetition, daily-study-session, staying-on-track) rather than duplicating them. Includes Exam Setup's three cards (Question Bank Pools, Exam Day Logistics, feasibility) and "Start a new plan"; Notifications noted free/no-gate; Billing uses the exact mandated trial sentence and avoids "upgrade"; Danger Zone's two type-to-confirm actions; "Take the tour" compass replay button (§3). TechArticle + BreadcrumbList + FAQPage only (no HowTo — reference article, permitted).

**Outline:** answer lead + tour note → Exam Setup → Subjects → Tasks → SR Settings → Daily Routine → Study Plans → Phases → Import/Export → Notifications → Billing → Danger Zone → FAQ (4).

**Mocks (2), persona Dr. Sarah Chen, mid-plan:**
1. 11-tab strip — aria-label: "The Settings screen's eleven-tab strip — Exam Setup selected, followed by Subjects, Tasks, SR Settings, Daily Routine, Study Plans, Phases, Import/Export, Notifications, Billing, and Danger Zone in red"
2. Exam Setup panel — aria-label: "The Exam Setup panel for Dr. Sarah Chen showing exam name AMC MCQ, exam date 15 Oct 2026, daily question target 80, and target time per question 72 seconds, with a feasibility chip reading 9 tasks per week — on pace"
3. (bonus) Daily Routine panel — aria-label: "The Daily Routine panel for Dr. Sarah Chen — daily study hours 4, max tasks per day 2, rest day Friday, with toggles showing prayer times on, work commitments on for Mon to Wed 9 to 5, gym schedule off, and shift work off"

## QA checklist (both pages)
- [x] GA tag G-R38JK89PP5 present
- [x] All URLs `https://www.studyrise.app/...` — grep confirmed zero bare-domain links, no trailing slashes
- [x] Self canonical (revision-sprint / settings)
- [x] Auth CTAs use `?auth=register` / `?auth=login` only — no /register, /login paths
- [x] Exactly one `<h1>` per page (grep -c = 1 each)
- [x] Banned words — grep for premium/unlock/free trial/upgrade/seamless/elevate/let's dive in/in conclusion/it's worth noting/furthermore/moreover: zero hits
- [x] JSON-LD: revision-sprint = TechArticle + BreadcrumbList (4 items) + HowTo + FAQPage; settings = TechArticle + BreadcrumbList (4 items) + FAQPage. FAQPage answers match on-page FAQ verbatim
- [x] Title ≤60 (37 / 42 chars); meta description ≤155 (both ~150)
- [x] Mocks: `figure.help-mock` + `role="img"` + aria-label, pure HTML+scoped CSS, no `<img>`, no JS, figcaptions start "Illustration:", demo data, no PII
- [x] Nav + footer shell copied byte-for-byte incl. `<!--#include-->` / `<!--shell:*-->` markers
- [x] Sibling boxes: sprint → hub/plan-and-schedule/mock-exams/dashboard; settings → hub/subjects-and-tasks/spaced-repetition/staying-on-track
- [x] Billing trial sentence used verbatim; Sprint declared Pro early; facts confined to EXAM_MODE_TUTORIAL.md §§3, 4, 6, 9, 13, 14

## Missing facts flagged
- Sprint mock illustration uses invented but plausible demo day labels (subject names, day numbers) — tutorial doesn't specify Sprint-view visuals.
- Tutorial doesn't say whether a Sprint can be deactivated/paused once active — not claimed on the page.

---

## Page: `/help/exam/faq` (Session 10)

**Brief:** curated top-of-mind Exam Mode FAQ — 7 Q&As (card to start / exam not listed / missed day / data safety on reset vs new plan / which features are Pro / three readiness numbers / replay the tour), each linking to its full article. Text page, no mocks.

### §4 QA gate — PASS
- GA `G-R38JK89PP5` ✓ · all URLs www, self canonical ✓ · `?auth=register` CTAs ✓ · one `<h1>` ✓
- Banned words: none; compliant trial sentence used verbatim in Q1 ✓
- TechArticle + BreadcrumbList(4) + FAQPage with exact schema↔visible parity (7/7) ✓
- Title 32 chars; meta ≤155 ✓ · siblings: hub + getting-started + staying-on-track + readiness ✓

### Session 10 — sitemap & hub finalization
- `sitemap.xml`: all 18 help URLs added (home, hub, 16 pages) with `help-og.webp` image entries, lastmod 2026-07-02. XML validated.
- Hub `/help/exam`: re-grouped to all six §3 headings; hasPart now lists all 15 articles; lede updated.
- Help home: most-read expanded (getting-started, staying-on-track, readiness-and-projections, faq, hub).
- `python3 build_site.py` green (help pages not flagged by check_blog).

---

## Session 11 — merge-gate summary

- All 18 pages pass the §4 gate (per-page checklists above); build green.
- Illustrations: all HTML/CSS mocks per plan §6 (no screenshots). **Outstanding asset: `public/help/images/help-og.webp`** — Istiaque generates from the §6.3 ChatGPT prompt; every page already references it. This is the ONLY missing asset (pages 404 the OG image until it's added — acceptable pre-merge, must be in place by Session 12 step 6).
- Forward-reference/link debt: PLAB 1 + USMLE Step 1 exam-content links (build-your-plan) deferred; inbound links from /features and /blog/amc-mcq-study-plan wired post-merge (S12); /contact page status unconfirmed (help pages link to it).
- vercel.json /help rewrites present, catch-all last (S0).
- Agent-flagged notes: "Catch-up mode" chip and deficit-recovery pacing (staying-on-track) are coaching copy, not claimed app behaviour; Sprint-mock day labels are demo data; no exact mock minimum stated for the Readiness Projection (tutorial silent).
