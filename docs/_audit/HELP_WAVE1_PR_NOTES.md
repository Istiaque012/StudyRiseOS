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
