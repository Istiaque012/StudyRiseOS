# 12 · INTERNAL LINKS — Site Map & Internal Link Registry

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** The living map of every StudyRise page that exists (or is planned)
> and how the pages link to each other. File 05 is *what to build*; this file is *what exists
> and how it's wired*. Read it during the Build phase of every page so the new page links out
> correctly and earns its inbound links — and update it after every page ships. This file
> sits under the non-negotiables in 01/04; nothing here overrides them.

> **Seeded 2026-06-22** from the live-site inventory (all rows verified by fetch that day).
> Re-verify status before trusting a row — the site changes faster than this file.

---

## 1. Why internal links matter here

Three jobs, in priority order:

1. **No orphans.** Every indexable page must be reachable by at least one in-body link from
   another page — not nav/footer alone. A page only reachable by direct URL barely gets crawled.
2. **Hub-and-spoke topical authority.** The blog hub and (later) category pages link down to
   articles; articles link back up and sideways to 2–3 genuine siblings. This is what tells
   Google the site has depth on a topic.
3. **Flow toward conversion.** Articles point readers to the relevant landing page and the
   primary CTA, using the freemium copy in file 11 — never "premium / unlock / free trial".

---

## 2. Page Registry

Status: `✅ live (200)` · `⚠️ unconfirmed` · `⬜ planned` · `🔁 needs update` · `🗑 deleted`
Type: landing · hub · category · article · legal · system

| URL | Title | Audience | Type | Status | Primary keyword | Notes |
|---|---|---|---|---|---|---|
| `/` | StudyRise Smart Study Planner… | [ALL] | landing | ✅ live (200) | study planner | Homepage (`landing.html`) |
| `/blog/what-is-studyrise` | What Is StudyRise? | [ALL] | article | ✅ live (200) | what is studyrise | Product explainer |
| `/blog/how-to-make-a-study-plan` | How to Make a Study Plan… | [ALL] | article | ✅ live (200) | how to make a study plan | Study Skills |
| `/blog/amc-mcq-study-plan` | AMC MCQ Study Plan… | [EXAM] | article | ✅ live (200) | amc mcq study plan | Cluster A; carded on /blog/medical-licensing-exams. NOTE: `how-to-pass-amc-mcq-in-4-months` is the SPA fallback, not a real post — this is the live AMC article |
| `/features` | Features | [ALL] | landing | ⚠️ unconfirmed | studyrise features | In sitemap; fetch to confirm 200/404 |
| `/blog` | Blog hub | [ALL] | hub | ⬜ planned | studyrise blog | Awaiting Option A/B; ~3 articles out |
| `/pricing` | Pricing | [ALL] | landing | ⬜ planned | studyrise pricing | Deleted 2026-06-21, rebuild pending |
| `/study-planner` | Study Planner | [ALL] | landing | ⬜ planned | study planner app | Deleted 2026-06-21, rebuild pending |
| `/contact` | Contact | [ALL] | system | ⬜ planned | — | Linked in nav; likely never built |
| `/privacy` | Privacy Policy | [ALL] | legal | ⚠️ unconfirmed | — | Linked in footer; status unknown |
| `/terms` | Terms | [ALL] | legal | ⚠️ unconfirmed | — | Linked in footer; status unknown |
| `/blog/medical-licensing-exams` | Medical Licensing Exams | [EXAM] | category | ✅ live (200) | — | Built 2026-06-24; grid: amc-mcq-study-plan |
| `/blog/mbbs` | Category: MBBS | [MBBS-BD] | category | ⬜ planned | — | Footer link; build when volume warrants |
| `/blog/university-courses` | Category: university | [UNI] | category | ⬜ planned | — | Footer link; build when volume warrants |
| `/blog/study-skills` | Category: study skills | [ALL] | category | ⬜ planned | — | Footer link; build when volume warrants |
| `/amc-study-planner` | AMC MCQ Study Planner | [EXAM] | Segment landing (SoftwareApplication) | ✅ live (200) | AMC study planner app | Built 2026-06-24; `public/amc-study-planner.html` |
| `/help` | StudyRise Help Center | [ALL] | help-hub | 🟨 built (branch `content/help-exam-wave1`, pending merge) | studyrise help | Router page — 3 mode cards + most-read. Help ≠ blog: never in blog feed/hub/categories |
| `/help/exam` | Exam Mode Help & Guides | [EXAM] | help-hub | 🟨 built (pending merge) | studyrise exam mode help | Mode hub; CollectionPage `hasPart` lists all 15 articles below |
| `/help/exam/getting-started` | Getting Started with StudyRise Exam Mode | [EXAM] | help | 🟨 built (pending merge) | studyrise exam mode | ★ Cornerstone (S1) |
| `/help/exam/build-your-plan` | Build your plan | [EXAM] | help | 🟨 built (pending merge) | studyrise exam study plan wizard | S3 |
| `/help/exam/subjects-and-tasks` | Subjects and tasks | [EXAM] | help | 🟨 built (pending merge) | studyrise subjects tasks | S3 |
| `/help/exam/daily-study-session` | Your daily study session | [EXAM] | help | 🟨 built (pending merge) | studyrise today study session | S4 |
| `/help/exam/spaced-repetition` | Spaced repetition | [EXAM] | help | 🟨 built (pending merge) | studyrise spaced repetition | S4 |
| `/help/exam/logging-questions` | Logging questions | [EXAM] | help | 🟨 built (pending merge) | studyrise log questions | S5 |
| `/help/exam/mock-exams` | Mock exams | [EXAM] | help | 🟨 built (pending merge) | studyrise mock exams | S5 |
| `/help/exam/plan-and-schedule` | Plan views and editing your schedule | [EXAM] | help | 🟨 built (pending merge) | studyrise plan views | S6 |
| `/help/exam/staying-on-track` | Staying on track when you fall behind | [EXAM] | help | 🟨 built (pending merge) | studyrise reschedule study plan | S6 |
| `/help/exam/dashboard` | Your Dashboard — mission control | [EXAM] | help | 🟨 built (pending merge) | studyrise dashboard | S7 |
| `/help/exam/readiness-and-projections` | Readiness, projections, and Go/No-Go | [EXAM] | help | 🟨 built (pending merge) | studyrise readiness projection | S7 |
| `/help/exam/history` | History — your study calendar | [EXAM] | help | 🟨 built (pending merge) | studyrise study history calendar | S8 |
| `/help/exam/analytics-and-reports` | Analytics and the Progress Report | [EXAM] | help | 🟨 built (pending merge) | studyrise analytics progress report | S8 — whole screen is Pro |
| `/help/exam/revision-sprint` | The Revision Sprint — your final month | [EXAM] | help | 🟨 built (pending merge) | studyrise revision sprint | S9 — Pro |
| `/help/exam/settings` | Settings — every option explained | [EXAM] | help | 🟨 built (pending merge) | studyrise exam settings | S9 — reference article, maps to sibling guides |
| `/help/exam/faq` | Exam Mode FAQ | [EXAM] | help | 🟨 built (pending merge) | studyrise exam mode faq | S10 — FAQPage schema ↔ visible parity |

> **Type legend addition (2026-07-02):** `help` = product-docs article (TechArticle, not BlogPosting);
> `help-hub` = Help Center router/hub (CollectionPage). Help pages never appear in the blog feed, blog hub,
> or blog category listings — separate content type (see `13_HELP_CENTER.md`).
>
> **Help link graph (all on branch, hub-and-spoke):** `/help` → mode hub + most-read; `/help/exam` → all 15
> articles; every article → `/help/exam` + 2–4 cluster siblings + ≥1 outbound (`/features`, `/contact`,
> `/blog/amc-mcq-study-plan` from the cornerstone/build-your-plan) + a `?auth=register` CTA. No orphans.
> **H-series link debt:** inbound links from `/features` and `/blog/amc-mcq-study-plan` to the cornerstone
> are wired POST-merge from live-fetched HTML only (Session 12); PLAB 1 / USMLE Step 1 exam-content links
> from `build-your-plan` deferred until those exam pages ship.

> Add a row the moment a page is created. One keyword owns one URL (file 03) — confirm no
> existing row owns a keyword before assigning it.

---

## 3. The Link Graph (live pages only)

For each live page: what it links OUT to (in-body, excluding nav/footer) and what links INTO it.
Nav/footer global links are handled by the verbatim partials (file 10) and are not tracked here.

### `/` — Homepage
- **Links out (in-body):** none yet.
- **Linked from:** nav/footer everywhere (global only).
- **Should gain:** a contextual link to `/features` once `/features` is confirmed 200; links
  down to flagship articles once the blog hub ships.

### `/blog/what-is-studyrise` — Article
- **Links out (in-body):** none confirmed in inventory.
- **Linked from:** nothing in-body → **ORPHAN** (debt #O1).
- **Should gain:** inbound from `/blog/how-to-make-a-study-plan` (worklist W1); inbound from
  `/blog` hub when it ships.

### `/blog/how-to-make-a-study-plan` — Article
- **Links out (in-body):** `/study-planner` (target ⬜ planned — currently dead, debt #D3);
  `/blog/spaced-repetition-for-exams` (404, debt #D1); `/blog/how-to-stop-cramming` (404, debt #D2).
- **Linked from:** nothing in-body → **ORPHAN** (debt #O2).
- **Should gain:** inbound from `/blog/what-is-studyrise` (worklist W1); inbound from `/blog`
  hub when it ships.

### `/amc-study-planner` — Segment landing page
- **Links out (in-body):** `/features`, `/pricing`, `/study-planner` (planned hub), `/blog`, external `amc.org.au`.
- **Linked from:** `/blog/amc-mcq-study-plan` (in-body, anchor "dedicated AMC MCQ study planner"). Built 2026-06-24.
- **Should gain:** inbound from `/study-planner` hub once it ships (as a spoke).

---

## 4. Linking Rules (apply to every new page)

**Outbound (links the new page must contain):**
- 1 link to the single most relevant **landing page** (or the homepage), using a descriptive anchor.
- 2–3 links to genuine **sibling articles** (same cluster/audience) — only ones that are live
  (200). Never link to a planned/404 URL; if the ideal sibling isn't built, log it as debt and
  add the link when it ships.
- The primary **CTA** to `/?auth=register` ("Try StudyRise free"), per file 11.
- Blog articles also link **up** to the `/blog` hub once it exists.

**Inbound (links existing pages must add to the new page):**
- Every new indexable page must earn **at least 1** in-body inbound link from a live page.
- **Cap inbound edits at 1–3** highest-relevance existing pages — don't spray links.
- Inbound edits are ALWAYS derived from a **live fetch** of the target page during the Build
  phase (Vercel `web_fetch_vercel_url`, full body), then written as surgical exact-string edits.
  Never write an inbound edit from memory — the live markup is the source of truth (anti-drift).

**Anchor text:**
- Descriptive and keyword-aware ("how to make a study plan", not "click here" / "this article").
- Vary anchors to the same target; don't repeat the exact same phrase from many pages.

**Orphan check:** after wiring, confirm the new page has ≥1 in-body inbound link and that any
page it links to is live (200). Log anything unresolved in §6.

---

## 5. Build-time procedure (where this file plugs in)

This file is read and updated as part of producing any page. The mechanics live in:
- **File 06 → "After Building"** — the internal-link pass (read §3–4 here, add outbound links,
  fetch + write inbound edits, update this file).
- **File 08 → handoff package** — the internal-link note (item 5) carries the inbound edits, and
  the deploy prompt is delivered in **sequenced sessions** so no single Claude Code paste tries
  to ship the page AND wire every inbound link AND verify all at once.
- **File 09 → monthly audit** — the orphan / broken-internal-link sweep keeps §3 and §6 honest.

**Session sequencing (file 08 governs the detail):**
- **Session 1 — Ship & register:** place the page, add its rewrite + sitemap entry, its own
  outbound links, run the gate, verify live, update this registry (add the row + link-graph entry).
- **Session 2+ — Wire inbound:** fetch each existing target live, write the surgical inbound
  edits, re-verify, tick the debt/worklist rows here. Split across more sessions if many pages
  point in.
- Each session ends with a PASS/FAIL verification before the next begins.

---

## 6. Link-Debt Ledger

Open items, cleared as pages ship. `id | description | resolves when`

| ID | Description | Resolves when |
|---|---|---|
| O1 | `/blog/what-is-studyrise` has no in-body inbound link (orphan) | Worklist W1 done + `/blog` hub ships |
| O2 | `/blog/how-to-make-a-study-plan` has no in-body inbound link (orphan) | Worklist W1 done + `/blog` hub ships |
| D1 | `how-to-make-a-study-plan` links to `/blog/spaced-repetition-for-exams` (404) | That article ships (in pipeline) |
| D2 | `how-to-make-a-study-plan` links to `/blog/how-to-stop-cramming` (404) | That article ships (in pipeline) |
| D3 | `how-to-make-a-study-plan` links to `/study-planner` (planned, currently dead) | `/study-planner` rebuild ships |
| F1 | Footer links 4 category hubs that don't exist (`/blog/medical-licensing-exams`, `/blog/mbbs`, `/blog/university-courses`, `/blog/study-skills`) | Category pages built (kept as-is by decision; tracked only) |
| H1 | Homepage→`/features` contextual link parked | `/features` confirmed 200 |

> Footer category links (F1) are intentionally left in place per Istiaque's call; they are
> tracked here, not fixed now.

---

## 7. Do-Now Worklist (safe, both endpoints live)

Execute in a **live-fetch session** (Session 2 pattern) — not from memory, and not in the
docs-only task that created this file.

**W1 — Cross-link the two live articles (mutual).**
- In `/blog/what-is-studyrise`: add one in-body link to `/blog/how-to-make-a-study-plan`
  with a descriptive anchor (e.g. where it discusses building/sticking to a plan).
- In `/blog/how-to-make-a-study-plan`: add one in-body link to `/blog/what-is-studyrise`
  with a descriptive anchor (e.g. the StudyRise mention near the CTA).
- Fetch both live first; write exact-string edits; clears debt O1 and O2's in-body half.

Parked (do NOT do yet): Homepage→`/features` (H1) until `/features` returns 200.

---
<!-- docnav-related -->
_See the [index](../README.md) for the full file map · [CLAUDE.md](../../CLAUDE.md)_
