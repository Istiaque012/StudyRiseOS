# 13 · HELP CENTER — Product Docs as a First-Class Content Type

> Created 2026-07-02 (Exam Wave 1 build). The Help Center documents the product itself —
> every function a user can touch — as public, indexable docs at `/help/*` on the website repo.
> **Help ≠ blog.** Separate content type, separate feeds, separate schema. This file is the spec.

---

## 1. Architecture

- `/help` — Help home. Router, not article: "Start with your mode" line, three mode cards
  (Exam live; MBBS + University "coming soon", **unlinked** until they exist), most-read links.
  Schema: `CollectionPage` + `BreadcrumbList`.
- `/help/exam` — Mode hub, the map. All articles grouped under six headings on ONE page
  (*Getting started · Your daily study loop · Manage & adjust your plan · Track your progress ·
  Final month & configuration · FAQ*). No separate category URLs until 25+ articles.
  Schema: `CollectionPage` (its `hasPart` lists **every** published article) + `BreadcrumbList`.
- `/help/exam/{slug}` — Articles. Fixed anatomy (see §3).
- Waves: Wave 1 = Exam Mode complete (15 articles, shipped 2026-07-02). Wave 4 = `/help/mbbs/*`.
  Wave 5 = `/help/university/*`.

**Routing:** `vercel.json` rewrites (`/help` → `/help/index.html`, `/help/:path*` → `/help/:path*.html`),
inserted above the SPA catch-all. Files live at `public/help/**`. Directory-style URLs, **no trailing slashes**.

## 2. The full Exam Wave 1 article map

Getting started: `getting-started` (★ cornerstone) · `build-your-plan` · `subjects-and-tasks`
Daily loop: `daily-study-session` · `spaced-repetition` · `logging-questions` · `mock-exams`
Manage & adjust: `plan-and-schedule` · `staying-on-track`
Track progress: `dashboard` · `readiness-and-projections` · `history` · `analytics-and-reports`
Final month & config: `revision-sprint` · `settings`
Plus: `faq`

## 3. Article template = blog shell + help delta

Clone the site shell **verbatim** (nav/footer partials, `studyrise-core.css`, `studyrise-chrome.js`,
GA `G-R38JK89PP5`, `www` canonical + OG/Twitter). Reference implementation:
`public/help/exam/mock-exams.html`. The help delta:

> **Footer default:** `Help Center → /help` is a **required** link in the Product footer column on
> **every** page — shell-managed and frozen alike. The shared partial `templates/partials/footer.html`
> carries it (so future shell-generated pages inherit it); frozen footers (marketing + blog pages,
> which lack the `<!--#include footer-->` anchor) must be edited directly. Never author a new footer
> without it.


1. Visible **breadcrumb** `Home › Help › Exam Mode › {Article}` + `BreadcrumbList` JSON-LD.
2. `doc-badge` ("Exam Mode guide") so it reads as product docs, not a blog post.
3. `.answer` lead block — the whole page's answer in 2–4 sentences before anything else.
4. **"In this guide"** jump-link TOC for articles with 3+ sections.
5. Every `<h2>` section opens with a **40–60 word direct answer, then numbered steps** (one action each).
6. **Sibling nav** — 2–4 most-relevant cluster-mates + one link to the hub. Never the full list.
7. "Was this helpful?" plain line → `/contact` (no JS widget). "Still stuck?" box → `/contact`.
8. Conversion CTA band: "Try StudyRise free" → `?auth=register`; "Start free — no card required."

## 4. Schema rules

- `TechArticle` (never `BlogPosting`) + `BreadcrumbList` on every article.
- `HowTo` on step-based articles, `FAQPage` where a visible FAQ exists — **as GEO/AI-citation
  signals only** (Google retired those rich results). **FAQ schema ↔ visible parity is mandatory.**
- Hubs: `CollectionPage` + `BreadcrumbList`. No `WebSite`/`SearchAction` until real on-site search.

## 5. Illustrations — HTML/CSS mocks (no screenshots; decision 2026-07-02)

Every feature illustration is a self-contained, on-brand **HTML/CSS mock**, final not placeholder:
- Built from core.css tokens; scoped page CSS (`.help-mock` / `.hm` kit); **no `<img>`, no JS, no motion files**.
- `<figure role="img" aria-label="…">` with a full written description; `<figcaption>` starts "Illustration:".
- Persona: **Dr. Sarah Chen at a mid-plan state**; demo data only, no PII.
- **Match, don't invent** — mocks reflect the real UI per the tutorial doc (real button labels,
  SR intervals 3/7/14/21, readiness bands Unsafe <55 / Improving 55–60 / Borderline 61–64 / Exam-ready ≥65,
  default pace 72s). Missing detail → don't draw it.
- The **only raster asset** is the shared OG card `public/help/images/help-og.webp` (1200×630),
  referenced by every help page's `og:image`/`twitter:image`.

## 6. Facts & Pro copy

- **Product facts** come from `…/StudyRise App/docs/guides/EXAM_MODE_TUTORIAL.md` (primary),
  `docs/dev-os/feature-index.md`, then `FEATURES.md`. Never invented; gaps are stop-and-ask.
- **Exam facts** (subject counts, pass marks, blueprints) live ONLY in the dedicated exam content —
  help pages name exams and link out.
- **Pro features** (Analytics screen, AI Study Advisor, Go/No-Go card, Revision Sprint): say plainly
  "This is part of StudyRise Pro." Banned: "premium", "unlock", "free trial", "upgrade" (in body).
  Trial window only via the exact compliant sentence (file 11).

## 7. Standing rules

- **Help ≠ blog:** help pages never appear in the blog feed, blog hub, or blog category listings.
- Help pages DO go in `sitemap.xml` (with image entries) once routing is live.
- Hub upkeep: every new article is added to the hub's group + `hasPart` in the same session. No orphans.
- Every page passes the file-04 Pre-Delivery Technical Gate + `python3 build_site.py` before commit.
- Registry: every help page has a row in `12_INTERNAL_LINKS.md` (types `help` / `help-hub`) and
  `05_CONTENT_PIPELINE.md`.
