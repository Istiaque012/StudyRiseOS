# BUILD PLAN — Exam Mode Help Center (Wave 1), sessionised for Claude Code

> **For:** Claude Code, operating as the StudyRise Content & SEO brain executor.
> **Scope:** content, SEO, and marketing pages for a public Help Center that documents
> **[EXAM]** mode **completely** — every function a user can touch, written to be
> genuinely easy to read. Cornerstone first, then a full-coverage article set.
> **Coverage mandate (Istiaque, 2026-07-02):** the Help Center must cover *all* Exam
> Mode functions — adding/editing/deleting subjects and tasks, rescheduling when you
> fall behind, the SR (spaced-repetition) module, logging days, logging questions,
> logging mocks, the Dashboard cards (Go/No-Go, readiness projection, the compliance
> ring), analytics, planning a day, and what every Settings option means. If a feature
> exists in Exam Mode, a user must be able to find out here how to use it. When you need
> to know how a feature actually works, read the product-fact sources in §0 — never
> invent behaviour.
> **How this file differs from a phase plan:** it is cut into **discrete Claude Code
> sessions**. Each session is one sitting — clear preconditions, a fixed read list,
> a task list, and a **Definition of Done** that ends at a clean commit. Do **one
> session per run.** Do not run ahead into the next session.
> **After every session, update this plan** (see §5 "Session status log"): record what
> shipped, any decisions made, and anything the next session needs to know. The plan is
> the handoff between sessions — keep it current.
> **Status gate:** this is an execution plan, not a licence to skip the brain's rules.
> Where this plan and a knowledge file disagree on a *non-negotiable*, the
> non-negotiable wins.
> Last updated: 2026-07-02 (expanded to full-feature coverage).

---

## 0. Repo map — read this before anything

This job spans **three locations**. Know which is which or you will edit the wrong tree.

| Role | Path | You may write? | Where it lands |
|---|---|---|---|
| **Website repo** (execution) | `/Users/istiaque/Desktop/StudyRise` → `git@github.com:Istiaque012/StudyRise.git` | **Yes** — this is where the Help Center pages ship | PR → **`main`** ("the studyrise app") |
| **Content OS** (this repo — brain + wiki) | `/Users/istiaque/Downloads/StudyRIse Main/StudyRIse Content OS` | **Yes** — brain files in `raw/brain-v1/` and the `wiki/` layer | committed/pushed per this repo's conventions |
| **Dev/app project** (source of product facts) | `/Users/istiaque/Downloads/StudyRIse Main/StudyRise App` | **Read only** | — |

- **Product facts** for this build come from these READ-ONLY sources, in priority order:
  1. `…/StudyRise App/docs/guides/EXAM_MODE_TUTORIAL.md` — **the primary source.** Its 14
     sections map 1:1 onto the article set (§3) and already document every screen a user
     touches, Pro flags included. Start here for every article.
  2. `…/StudyRise App/docs/dev-os/feature-index.md` — the Exam-mode route/engine inventory,
     for confirming a feature exists and what engine drives it (e.g. `readiness`,
     `projectReadinessToExamDate`, the Revision Sprint planner).
  3. `raw/brain-v1/FEATURES.md` — supplementary feature detail.
  Do not invent product facts. If a fact you need is in none of these, it is a stop-and-ask.
- **Pro-gated features:** several Exam Mode features are Pro (Analytics screen, AI Study
  Advisor, Go/No-Go card, Revision Sprint). Today the subscription master switch is **OFF**
  — everything renders free — but the copy must still note Pro honestly. Say it plainly:
  "This is part of StudyRise Pro." Use the exact compliant trial sentence (§2) when the
  trial is referenced. **Never** "unlock", "upgrade", "premium", or "free trial."
- **Exam/curriculum facts** (subject counts, pass marks, blueprint) come from the
  dedicated AMC/PLAB/USMLE content, **not** from these help pages — help pages name
  the exams and link out. Keep every fact in exactly one place.
- The numbered brain files live in `raw/brain-v1/` **in this Content OS repo**. The
  original plan called them `studyrise-brain/`; that folder does not exist — use
  `raw/brain-v1/`. These files are content-project-owned and **editable** (the
  PROMOTION RULE depends on it).

### Two PRs, not one

1. **Website PR** — `public/help/**`, `public/help/images/**`, `sitemap.xml`,
   `vercel.json` → branch `content/help-exam-wave1` → PR to StudyRise `main`.
2. **Content OS commit** — `raw/brain-v1/` edits, new `raw/brain-v1/13_HELP_CENTER.md`,
   `wiki/` updates (index, log, new Help Center page) → this repo.

Never claim a file is "updated" in prose. The diff is the record.

---

## 1. Decisions locked (answered by Istiaque, 2026-07-02)

These are settled. Do not re-ask.

1. **Routing is yours to do.** Add the `/help` rewrites to the website repo's
   `vercel.json` yourself, mirroring the existing `/blog/:path*` pattern (Session 0).
   It is no longer a hands-off "dev ticket."
2. **No screenshots — illustrate with HTML/CSS mocks (updated 2026-07-02).** Istiaque will
   not supply screen captures. Every feature illustration is a Claude-authored, on-brand
   **HTML/CSS mock** that ships as final (see §6). The **only** raster asset is a single reusable
   **OG card** Istiaque generates from the ChatGPT prompt in §6.3. Session 1's shipped
   `[SCREENSHOT PENDING]` markers are converted to mocks in Session 11.
3. **Cornerstone H1:** `Getting Started with StudyRise Exam Mode`.
4. **Cornerstone outbound content link:** `/blog/amc-mcq-study-plan`.

---

## 2. Non-negotiables — carried into EVERY session

From `01_CONTEXT.md`, `02_BRAND_VOICE.md`, `04_SEO_TECHNICAL_RULES.md`,
`11_PRICING_MODEL.md`. These override anything below.

### Technical (file 04)
- **GA snippet `G-R38JK89PP5`** in `<head>` of every HTML file. Never altered or omitted.
- **Canonical domain `https://www.studyrise.app/…`** everywhere: canonical, `og:url`,
  `og:image`, `twitter:image`, all JSON-LD URLs (`url`, `@id`, `mainEntityOfPage`,
  breadcrumb items, `publisher.logo.url`), sitemap `<loc>`, every in-body link.
  **Bare `studyrise.app` is never correct** — substitute `www` before delivering.
- **Auth URLs are query params:** sign-up CTA → `https://www.studyrise.app/?auth=register`;
  returning-user copy → `https://www.studyrise.app/?auth=login`. Never `/login` or `/register`.
- **No trailing slashes** (match the live registry, e.g. `/blog/amc-mcq-study-plan`).
- Exactly **one `<h1>`** per page.

### Pricing copy (file 11)
- Primary CTA **"Try StudyRise free"**. Secondary line **"Start free — no card required."**
- **Banned:** "premium", "unlock", "free trial". "Upgrade" is banned in help **body**
  copy (pricing-page / in-app-billing only).
- The **only** compliant way to describe the trial window is this full sentence, verbatim:
  > "30 days of full access, no card required — after that, the core planner stays
  > free forever, and a few deeper features become part of Pro."
  Do not shorten it to "full access, no card required" (a retired phrase).

### Voice & readability (file 02)
- Sharp, calm coach. Second person. **Lead every section with its answer, then the steps.**
- Short paragraphs (1–3 sentences). Plain language ~grade 8. Define any app term on
  first use ("spaced repetition — reviews timed to land just before you'd forget").
- Steps numbered, one action each — a reader can *do* the task from steps alone.
- Honest about difficulty. No hype, no hollow motivation.
- **No AI tells:** "let's dive in", "in conclusion", "it's worth noting",
  "furthermore/moreover" as padding, "unlock", "seamless", "elevate".
- Brand is **StudyRise** — one word, capital S, capital R. Keep entity disambiguation
  visible (locale, tagline "Plan today. Rise tomorrow.", the `studyrise.app` URL, and
  IMG/AMC context) so search/AI don't conflate it with the unrelated Indian company.

### Content facts
- **No invented facts.** Product facts from the tutorial doc only; exam facts from the
  dedicated exam content. Flag any gap as a stop-and-ask.

---

## 3. Architecture (build to this)

**Wave 1 now = complete Exam Mode coverage** (per the coverage mandate). Every article maps
to a tutorial-doc section so nothing about the feature is invented. Grouped for the hub:

```
/help                                  Help home — 3 mode cards, most-read (search = later)
/help/exam                             Exam Mode hub  ◄── Wave 1 (the map to everything below)

  ── Getting started ──
  /help/exam/getting-started           ★ Cornerstone — first-run journey        [DONE  S1]
  /help/exam/build-your-plan           3-step wizard, 4 exam types, 3 phases     (S3)
  /help/exam/subjects-and-tasks        Add / edit / reorder / delete subjects
                                       & tasks; the task-detail drawer          (S3)

  ── Your daily study loop ──
  /help/exam/daily-study-session       Today: day planner, 50/10 block timers,
                                       Pomodoro, prayer/commitment blocks, Log   (S4)
  /help/exam/spaced-repetition         SR Module: review queue, recall ratings,
                                       intervals, retention heatmap, SR settings (S4)
  /help/exam/logging-questions         Questions screen + floating "+" logger,
                                       Paste-results, Flag-for-review            (S5)
  /help/exam/mock-exams                Log a mock, readiness bands, per-subject
                                       breakdown, pace                           (S5)

  ── Manage & adjust your plan ──
  /help/exam/plan-and-schedule         Plan views (List/Kanban/Timeline), editing
                                       & reordering tasks                        (S6)
  /help/exam/staying-on-track          Falling behind: backdate, skip, reflow,
                                       deficit, rest days, the burnout/overload
                                       nudge — "how to reschedule"               (S6)

  ── Track your progress ──
  /help/exam/dashboard                 Mission-control tour: every card & banner (S7)
  /help/exam/readiness-and-projections The three readiness numbers, kept distinct:
                                       compliance ring vs pass projection vs
                                       Go/No-Go card                             (S7)
  /help/exam/history                   The study calendar                        (S8)
  /help/exam/analytics-and-reports     Analytics charts, Focus Areas, the
                                       printable Progress Report                 (S8)

  ── Final month & configuration ──
  /help/exam/revision-sprint           Activating & running the Revision Sprint  (S9)
  /help/exam/settings                  The 11 Settings tabs — what every option
                                       does (reference article)                  (S9)

  /help/exam/faq                       Collected Exam Mode FAQ                    (S10)

  -- later waves, do NOT build now --
  /help/mbbs/*   (Wave 4)   /help/university/*  (Wave 5)
```

**Fact-boundary reminder:** these pages name the exams and explain the *product*; exam-specific
facts (subject counts, pass marks, blueprints) live in the dedicated AMC/PLAB/USMLE content and
are **linked out to**, kept in exactly one place. `build-your-plan` names the four exam types and
links each to its exam content; it does not restate subject counts.

**File paths (website repo):** `public/help/index.html`, `public/help/exam/index.html`,
`public/help/exam/getting-started.html`, etc. Directory-style URLs → these files via
the `vercel.json` rewrite added in Session 0. **No trailing slashes.**

### Three page types
1. **Help home (`/help`)** — router, not article. "Start with your mode" line, three
   mode cards (Exam live; MBBS + University shown "coming soon", **not linked** to dead
   URLs), a few most-read links. Schema: `CollectionPage` + `BreadcrumbList`.
2. **Mode hub (`/help/exam`)** — the map. All Wave-1 articles grouped under the six headings
   from §3 (*Getting started · Your daily study loop · Manage & adjust your plan · Track your
   progress · Final month & configuration · FAQ*) as sections on **one page** — no separate
   category URLs until 25+ articles. Links down to **every** article. Schema: `CollectionPage`
   + `BreadcrumbList` (its `hasPart` lists every published article). **Each content session
   adds its new article(s) to this hub** (and to the help-home "most read" only if warranted)
   so the hub is never stale and no article is an orphan.
3. **Help article** — fixed anatomy (see the article template in Session 1).

### Help template = blog template + a delta
Reuse the site shell **verbatim** from the website repo — do not hand-write these:
`templates/partials/nav.html`, `templates/partials/footer.html`, `studyrise-core.css`,
`studyrise-chrome.js`. Start from the `06_PRODUCTION_PLAYBOOK.md` article template
(GA, canonical, OG/Twitter, JSON-LD; confirmed against
`public/blog/amc-mcq-study-plan.html`). Then add the help delta:
- **Breadcrumb** at top: `Home › Help › Exam Mode › {Article}` (visible + `BreadcrumbList`).
- **"In this guide"** jump-link list for articles with 3+ sections.
- **Sibling nav** — small "Exam Mode guides" list. With ~15 articles you do **not** list
  them all: link the **2–4 most-relevant** siblings for that article (usually its cluster-mates
  from §3), plus one link to the hub (`/help/exam`) for the full map.
- **"Was this helpful?"** — plain line only: "Something unclear or out of date?
  [Tell us](https://www.studyrise.app/contact)." **No JS/feedback widget** (later dev feature).
- **"Still stuck?"** → `https://www.studyrise.app/contact`.
- Visually distinct from `BlogPosting` so a reader knows this is product docs.

### Schema per help page
- `BreadcrumbList` on every page (live rich result — keep it valid).
- Articles: `Article` (or `TechArticle`). Add `HowTo` and `FAQPage` blocks **as
  GEO/AI-citation signals only** — Google deprecated HowTo rich results and FAQ rich
  results are effectively retired. Present for AI answer engines, not expected in SERPs.
- **FAQ schema ↔ visible parity:** every Q&A in JSON-LD must appear on the page.
- Do **not** add `WebSite`/`SearchAction` (needs real on-site search — later).

### Linking & feeds (file 12)
- Hub-and-spoke: home → mode hubs; hub → all its articles; each article → its hub +
  2–3 siblings. **No orphans.**
- **Help pages never appear in the blog feed, blog hub, or blog category listings.**
  Separate content type, no shared listing surface with blog.
- Help pages **do** go in `sitemap.xml` (with image entries) once routing is live.
- Cross-links to existing content are encouraged — but wire inbound links **only from
  live-fetched HTML**, never from memory, and only after the target resolves.

---

## 4. The reusable QA gate (Pre-Delivery Technical Gate, file 04)

Run this against **every page** at the end of the session that builds it. If any check
fails, fix — don't defer. Paste the completed checklist into the PR per page.

- [ ] GA snippet `G-R38JK89PP5` present in `<head>`, unaltered.
- [ ] All URLs `https://www.studyrise.app/…` — canonical, `og:url`, `og:image`,
      `twitter:image`, every JSON-LD URL, in-body links. No bare `studyrise.app`.
- [ ] Canonical is **self-referential** (the page's own URL, not `/`).
- [ ] Sign-up CTAs → `?auth=register`; login copy → `?auth=login`. No `/login`|`/register`.
- [ ] Exactly **one `<h1>`**.
- [ ] Banned-words scan: no "premium", "unlock", "free trial"; no "upgrade" in body;
      no retired trial phrases; no AI tells (§2 list).
- [ ] Trial window uses the exact compliant sentence (§2), when mentioned.
- [ ] JSON-LD valid; `BreadcrumbList` correct; `Article`/`FAQPage`/`HowTo` present where planned.
- [ ] **FAQ schema ↔ visible parity.**
- [ ] Title ≤ ~60 chars; meta description ≤ ~155 chars.
- [ ] Feature illustrations are HTML/CSS mocks per §6 — `<figure role="img" aria-label="…">`,
      captioned *Illustration*, no `<img>`/JS/motion files. Only raster asset is the shared OG card.
- [ ] Help page **absent** from blog hub / blog category / blog feed.
- [ ] No orphans: page links to its hub + ≥2 others; hub links to it.
- [ ] Shell partials (`nav`, `footer`, core.css, chrome.js) reproduced verbatim from repo.
- [ ] `python3 build_site.py` passes (see the build note in Session 0).

---

## 5. Sessions

> **Every session, before you finish**, do BOTH:
> 1. (Mandatory per CLAUDE.md capture ritual) append one line to `wiki/log.md` in Content OS —
>    `## [YYYY-MM-DD] <type> | <one-line summary> | <files touched>`. If a session created a
>    new wiki page, also update `wiki/index.md`.
> 2. **Update this plan** — tick the session in the "Session status log" (§5.0) with the date,
>    the exact files shipped, any decision made, and a one-line "next session needs to know…".
>    This is how each session hands off to the next.

### 5.0 Session status log (update at the end of every session)

> **2026-07-02 plan update (no build ran):** Istiaque confirmed **no screenshots** — all feature
> illustrations become **HTML/CSS mocks** (§6, full inventory §6.2); only raster asset is one
> shared **OG card** from the ChatGPT prompt (§6.3). S0–S2 committed on both repos. **S3 not yet
> built.**

| # | Session | Status | Date | Notes for the next session |
|---|---|---|---|---|
| 0 | Recon, routing, scaffolding, template skeleton | ✅ done | 2026-07-02 | `vercel.json` `/help` rewrites live (catch-all still last); dirs created; template skeleton in scratch (not shipped); `build_site.py` green, `check_blog.py` ignores `/help/`. Website commit `ec8440e`. |
| 1 | Cornerstone `getting-started` | ✅ done | 2026-07-02 | Full 9-section page + TechArticle/BreadcrumbList/HowTo/FAQPage, 11 shot placeholders + alt, OG brief. Passes §4. Website commit `a1fbd23`. Forward-refs to build-your-plan/daily-study-session/mock-exams/dashboard noted in PR notes. |
| 2 | Help home `/help` + Exam hub `/help/exam` | ✅ done | 2026-07-02 | Home + hub built (CollectionPage+BreadcrumbList); no orphan. **Hub currently lists only the original 4 articles under 2 groups — must be re-grouped to the 6 headings / ~15 articles as later sessions ship them.** Website commit `88b71a2`; Content OS commit `fe0c112` (log + PR notes). |
| 3 | build-your-plan + subjects-and-tasks | ✅ done | 2026-07-02 | Both built w/ HTML/CSS mocks (no screenshots), full schema, §4 gate + build green. Hub re-grouped to §3 headings (Getting started / Your daily study loop) and `hasPart` now lists all 7 S3–S5 articles. **Link-debt:** only AMC exam content is live — AMC MCQ links to `/blog/amc-mcq-study-plan`; PLAB 1 + USMLE Step 1 named without dead links until their content ships. Committed to `content/help-exam-wave1`. |
| 4 | daily-study-session + spaced-repetition | ✅ done | 2026-07-02 | Both built w/ 8 HTML/CSS mocks total (day planner, block timer, log modal, floating "+" / SR queue, grade buttons, retention heatmap, SR settings). Full schema, §4 gate + build green. SR intervals per tutorial §7 (3/7/14/21). Already in hub hasPart. Committed to `content/help-exam-wave1`. |
| 5 | logging-questions + mock-exams | ⬜ todo | — | — |
| 6 | plan-and-schedule + staying-on-track | ⬜ todo | — | — |
| 7 | dashboard + readiness-and-projections | ⬜ todo | — | — |
| 8 | history + analytics-and-reports | ⬜ todo | — | — |
| 9 | revision-sprint + settings | ⬜ todo | — | — |
| 10 | faq + sitemap (register all pages) | ⬜ todo | — | — |
| 11 | brain + wiki updates, finalize hub/home, open PR(s) | ⬜ todo | — | — |
| 12 | post-merge: live-route check + indexing | ⬜ todo | — | — |

> **Nothing is pushed, merged, or indexed** until Sessions 11–12. All content sessions commit
> to `content/help-exam-wave1` locally.

### 5.0.1 Resuming in a new chat / commit discipline (read at the start of every session)

Sessions may run in **separate Claude Code chats** — that's expected. Chat memory is *not* the
handoff; these three artifacts are: the **git branch**, this plan's **§5.0 table**, and
**`wiki/log.md`**. So, at the **start** of every session:

1. **Website repo — get on the branch, do not branch from `main`:**
   `cd /Users/istiaque/Desktop/StudyRise && git checkout content/help-exam-wave1`
   (If it somehow doesn't exist, recreate from `main`, but first check `git branch -a`.)
   Run `git log --oneline -8` and read §5.0 to confirm what's already done before writing.
2. **Two repos change every session:** the `.html` pages land in the **website repo**
   (commit to `content/help-exam-wave1`); the `wiki/log.md` line, the §5.0 update, and the
   PR-notes edits land in **Content OS** (commit to its own `main`). Neither is deployed until
   the Session-11 PR (website) / normal push (Content OS).
3. **Commit at the end of every session** (each session's DoD). A commit is a local checkpoint
   only — it does **not** push or deploy. Uncommitted edits survive to the next chat on disk, but
   commit anyway so a fresh chat can tell done from half-done via `git log`.
4. **Do NOT push the website branch until Session 11.** Optional exception: push it early if you
   want Vercel **preview** deploys to eyeball pages before merge — previews don't touch production.
5. **How it reaches the live app:** Session 11 pushes the branch + opens a PR → you merge to
   `main` → Vercel (project "studyrise") auto-deploys production → `/help/*` serves live via the
   `vercel.json` rewrites. **Merge = deploy.** Content OS is the brain/wiki and is never deployed
   to the website; the pages are authored directly in the website repo, not copied from Content OS.

---

### SESSION 0 — Recon, routing, scaffolding, template skeleton  ✅ DONE (2026-07-02)

**Goal:** lay the rails so every later session is pure content. No article copy yet.

**Preconditions:** none (first session).

**Read first:**
- This plan §0–§4.
- `raw/brain-v1/01_CONTEXT.md`, `04_SEO_TECHNICAL_RULES.md`, `06_PRODUCTION_PLAYBOOK.md`,
  `07_IMAGE_PROTOCOL.md`, `12_INTERNAL_LINKS.md`.
- Website repo: `templates/partials/nav.html`, `templates/partials/footer.html`,
  `public/blog/amc-mcq-study-plan.html` (the shell reference), `build_site.py`,
  `check_blog.py`, `vercel.json`, `public/sitemap.xml`.

**Tasks (website repo):**
1. `git checkout -b content/help-exam-wave1`.
2. **Add routing** to `vercel.json`. Insert, next to the blog rules and **above** the
   `/(.*)` → `/app.html` catch-all:
   ```
   { "source": "/help", "destination": "/help/index.html" },
   { "source": "/help/:path*", "destination": "/help/:path*.html" },
   ```
   Verify ordering: catch-all stays last, or `/help/*` falls through to the SPA.
3. Create dirs: `public/help/`, `public/help/exam/`,
   `public/help/images/exam-getting-started/`.
4. **Build the reusable help template** as a skeleton file (not shipped copy) —
   `public/help/_template.html` or a scratch note — capturing: the verbatim shell head
   (GA, canonical, OG/Twitter, font stack from the blog reference), plus the help delta
   (breadcrumb, in-this-guide, sibling nav, was-this-helpful line, still-stuck block,
   `BreadcrumbList` + `Article` + `FAQPage` + `HowTo` JSON-LD stubs). This is the
   pattern Sessions 1–10 clone. If you use a scratch file, delete it before the PR.
5. **Build note — verify, don't hack.** Run `python3 build_site.py`. Confirm it (a)
   copies `public/help/**` into `dist/` and (b) `check_blog.py` does **not** flag help
   pages (it should only scan `public/blog/`). If `check_blog.py` errors on the new
   `/help/` type, **STOP** — do not modify the build/check scripts (dev-owned logic);
   flag to Istiaque with the exact error.

**Definition of Done:**
- Branch created; `vercel.json` has the two `/help` rewrites, catch-all still last.
- Help dirs exist; template skeleton captured.
- `build_site.py` passes (or the build blocker is flagged and the session pauses).
- `wiki/log.md` line appended (type `refactor`).
- Committed (website repo). **Nothing indexed, no pages written yet.**

**Stop and ask if:** `build_site.py`/`check_blog.py` errors on help pages; the shell
partials differ materially from the blog reference in a way the template can't absorb.

---

### SESSION 1 — Cornerstone: `/help/exam/getting-started`  ✅ DONE (2026-07-02)

**Goal:** the anchor page, built completely to a high bar. Everything else links back here.

**Preconditions:** Session 0 done (branch, routing, dirs, template skeleton).

**Read first:**
- `…/StudyRise App/docs/guides/EXAM_MODE_TUTORIAL.md` — **the product-fact source.**
  Sections 1–5 and 5-Today map directly onto this page's outline.
- `raw/brain-v1/02_BRAND_VOICE.md`, `11_PRICING_MODEL.md` (trial sentence), `12_INTERNAL_LINKS.md`.
- The Session-0 template skeleton.

**Page spec:**
- **H1:** `Getting Started with StudyRise Exam Mode` (locked).
- **Title tag:** `Getting Started with StudyRise Exam Mode | StudyRise Help` (≤60 chars — trim if over).
- **Meta description:** one sentence ≤155 chars, first-run walkthrough for AMC/PLAB/USMLE
  prep; include "StudyRise" and "exam" for disambiguation.
- **Scope discipline:** *first-run journey only.* Do **not** reproduce the full Dashboard
  card catalogue or full Settings tour — link out (some targets ship in later waves; link
  anyway and note forward-references in the PR).

**Section outline** (each section opens with a 40–60 word direct answer, then steps):
1. **Intro** — what Exam Mode is + what this guide covers. No preamble.
2. **Create your account** — register form (name/email/password + strength meter, phone,
   ToS checkbox, optional marketing checkbox) or Continue with Google. State the trial
   window with the **exact compliant sentence** (§2).
3. **Choose Exam Prep and build your plan** — Mode Select → 3-step wizard (Step 1 exam
   type: AMC MCQ / PLAB 1 / USMLE Step 1 / Custom + exam date + start date; Step 2 hours +
   days sliders; Step 3 summary → Generate my plan) → build animation. **Name exam types
   only — no subject counts or pass marks** (those live in the dedicated exam content).
4. **Take the guided tour** *(short aside)* — the in-app Feature Tour exists, replayable
   from Settings. One paragraph.
5. **Your first look at the Dashboard** — **Day-0 state only**: Finish-setting-up banner,
   empty KPI tiles, zero streak, exam countdown. Link to `/help/exam/dashboard` (Wave 2).
6. **Your first study session on Today** — generate a day plan, how 50/10 blocks work,
   start a block timer, log the day in the Log modal (Complete / Partial / Missed / Rest).
   This is the "aha" — reader finishes able to run one real day.
7. **What's next** — bridge to `build-your-plan`, `daily-study-session`, `mock-exams`.
8. **FAQ** (4 Q&As, tutorial-sourced, visible + in schema):
   - Do I need a credit card to start? → No. (compliant trial sentence)
   - What if StudyRise doesn't have my exam? → Custom Exam.
   - Can I skip the guided tour? → Yes; replay from Settings.
   - What happens if I miss a day? → Log it honestly; rest days aren't penalised; the
     coach nudges, never guilts.
9. **Related guides** + **Still stuck? → /contact** (fixed footer block).

**Closing CTA (conditional — readers arrive both logged-in and cold):**
> "Haven't started your plan yet?
> [Try StudyRise free →](https://www.studyrise.app/?auth=register)"

**Links:**
- Outbound (≥2): `https://www.studyrise.app/features` **and**
  `https://www.studyrise.app/blog/amc-mcq-study-plan` (locked).
- Inbound links (from `/features` and the AMC article) are **Session 12** (post-merge),
  from live fetch only — do not edit those pages now.

**Images:** *(as shipped — placeholders with exact filenames + `[SCREENSHOT PENDING]` captions,
alt text written).* **⚠️ Superseded by the 2026-07-02 no-screenshots decision (§1.2, §6):** these
11 markers convert to **HTML/CSS mocks** in **Session 11** (inventory row "S1" in §6.2). OG uses
the shared `help-og.webp` (§6.3), not a per-page `og.webp`.

**Definition of Done:**
- `public/help/exam/getting-started.html` complete, all 9 sections, FAQ, full schema.
- Passes the **full §4 QA gate**; `build_site.py` green.
- OG brief + alt text written; placeholders clearly marked.
- QA checklist + forward-reference list drafted for the PR.
- `wiki/log.md` line appended (type `deploy`/`strategy`).
- Committed. **Not merged, not indexed.**

**Stop and ask if:** a tutorial-doc fact conflicts with a screenshot/live app (screenshot
wins, patch copy — but confirm); a needed product fact is missing from the tutorial doc.

---

### SESSION 2 — Help home `/help` + Exam hub `/help/exam`  ✅ DONE (2026-07-02)

**Goal:** give the cornerstone its parents so it is not an orphan; establish the router
and the map.

**Preconditions:** Session 1 done (cornerstone exists to link to).

**Read first:** Session-1 cornerstone (for exact title/slug), `12_INTERNAL_LINKS.md`,
Session-0 template skeleton.

**Tasks:**
1. **`public/help/exam/index.html` (mode hub)** — `CollectionPage` + `BreadcrumbList`.
   Groups Wave-1 articles under *Getting started* (getting-started, build-your-plan) and
   *Daily use* (daily-study-session, mock-exams). Links down to each. MBBS + University
   shown as **"coming soon" (unlinked)**. Links to getting-started; getting-started links
   back up (verify the sibling/hub links resolve).
2. **`public/help/index.html` (help home)** — `CollectionPage` + `BreadcrumbList`. "Start
   with your mode" line; three mode cards (Exam **live**; MBBS + University "coming soon",
   unlinked); a few most-read links (cornerstone + hub).
3. Run the **§4 QA gate on both**; `build_site.py` green.

**Definition of Done:** home + hub built and passing the gate; cornerstone reachable from
hub and vice versa (no orphan); `wiki/log.md` appended; committed.

**Stop and ask if:** hub grouping needs an article that isn't planned for Wave 1.

---

### Article build recipe (all content sessions, 3–10) — read once, apply every time

Each content session builds **two articles** (S10 builds one + the sitemap) to the exact bar
set by the Session-1 cornerstone. For **every** article:

1. **Brief first.** Write a one-paragraph brief + section outline (in the PR notes doc,
   `docs/_audit/HELP_WAVE1_PR_NOTES.md`). Proceed unless something is genuinely ambiguous —
   then batch it as a stop-and-ask; don't stall the other article.
2. **Clone the template** (Session-0 skeleton / the cornerstone shell): verbatim shell head
   (GA `G-R38JK89PP5`, `www` canonical + OG/Twitter, font stack, `/assets/studyrise-core.css`,
   `<!--#include nav-->`/`<!--#include footer-->`), plus the help delta (breadcrumb + doc badge
   + "In this guide" TOC + sibling nav + was-this-helpful + still-stuck).
3. **Structure:** exactly one `<h1>`; each `<h2>` **opens with a 40–60 word direct answer,
   then numbered steps** a reader can act on alone. Define every app term on first use.
4. **Schema:** `TechArticle` + `BreadcrumbList` always; add `HowTo` for step-based articles and
   `FAQPage` where the page has a visible FAQ — with **schema ↔ visible parity**. No `BlogPosting`.
5. **Facts:** tutorial doc first (§0). **Call out Pro features plainly** (§0 Pro rule). Exam-
   specific facts link out, never restated.
6. **Links:** each article → the hub (`/help/exam`) + 2–4 relevant siblings; ≥1 outbound to
   `/features` or relevant content; a conversion CTA (`?auth=register`). No orphans.
7. **Illustrations = HTML/CSS mocks (no screenshots):** author the article's mocks per the §6.2
   inventory — self-contained, on-brand, `<figure role="img" aria-label="…">`, persona **Dr.
   Sarah Chen at a mid-plan state**, demo data only, captioned as *Illustration* (rules: §6.1).
   These are final. The only raster asset is the shared OG card (`help-og.webp`, §6.3).
8. **Hub upkeep:** add each new article to the hub (`/help/exam`) under its §3 group and to the
   relevant siblings' nav. The hub must always list every published article.
9. **Gate & log:** run the full **§4 QA gate** on each page; `python3 build_site.py` green;
   append `wiki/log.md`; **update the §5.0 status table** in this plan; commit to
   `content/help-exam-wave1`.

**Standing stop-and-ask (all content sessions):** a tutorial fact conflicts with the live app
(screenshot wins — confirm, then patch); a needed product fact is in none of the §0 sources; an
exam-specific fact is needed that isn't in the dedicated exam content. Never invent.

---

### SESSION 3 — `build-your-plan` + `subjects-and-tasks`

**Goal:** how a plan gets built, and how to shape it — the setup cluster.

**Preconditions:** Sessions 0–2 done.

**Read first:** `EXAM_MODE_TUTORIAL.md` §2 (wizard, exam types, phases, build animation),
§6 (task-detail drawer), §13.1–13.3 & 13.7 (Exam Setup, Subjects, Tasks, Phases);
`02_BRAND_VOICE.md`, `12_INTERNAL_LINKS.md`.

1. **`/help/exam/build-your-plan`** — Mode Select → the 3-step wizard in depth (exam type +
   dates → hours/days sliders → summary → Generate) → the build animation → landing on Plan
   with a full task list. The **four exam types by name only**, each linking to its AMC/PLAB/
   USMLE content. The **three phases** (foundation → consolidation/system depth → mocks). How
   to rebuild from scratch later ("Start a new plan" in Exam Setup — history preserved).
2. **`/help/exam/subjects-and-tasks`** — *directly answers "how do I add or delete subjects and
   tasks."* Settings → **Subjects** (add / edit / reorder / remove; blueprint category, class
   count, question target, tier, required SR hits) and Settings → **Tasks** (search, add: title/
   phase/question target). Then the **task-detail drawer** from Plan (edit due date, hours,
   phase, subject, question target, step checklist; mark complete with a date).

**Stop and ask if:** subject/task field behaviour differs between the tutorial and the live app.

---

### SESSION 4 — `daily-study-session` + `spaced-repetition`

**Goal:** the daily study loop — do the work, then keep it retained.

**Preconditions:** Session 3 done.

**Read first:** `EXAM_MODE_TUTORIAL.md` §5 (Today) & §7 (SR Module); §13.4 (SR Settings),
§13.5 (Daily Routine — prayer/work/gym/shift blocks); `02_BRAND_VOICE.md`.

1. **`/help/exam/daily-study-session`** — *"how the user will plan a day" + "how he will log."*
   The Today screen end to end: day counter + prayer strip, the coach banner, current-task card
   (Complete / Skip / Backdate / Log), the **day planner** (start/end time → 50-min blocks + 10-
   min breaks + a 30-min long break every 3 blocks; fixed commitments treated as immovable),
   **block timers** (live red countdown, Pause re-times later blocks, "Done or Continue" prompt;
   SR blocks get the recall-quality prompt), the sidebar (Pomodoro, Insert Break, Quick Stats,
   SR due), the floating **"+" logger**, and the **Log modal** (Complete / Partial-with-slider /
   Missed / Rest Day + questions field + subject-correct panel).
2. **`/help/exam/spaced-repetition`** — *"what SR does + how to use it."* Define spaced repetition
   in one plain line. The unified **Review Queue** (Subject Review blue / Topic Review purple),
   recall ratings **Blackout/Hard/Medium/Easy** and their intervals (3/7/14/21 days), the
   compliance ring + stats, the retention heatmap, the Next-7-Days preview. Then **SR Settings**
   (SR1 interval, grace period, SR2/SR3 multipliers with live preview). Link to logging-questions
   for how topics become Topic Reviews (Flag for review).

**Stop and ask if:** the interval numbers on the live app differ from the tutorial's 3/7/14/21.

---

### SESSION 5 — `logging-questions` + `mock-exams`

**Goal:** the two logging surfaces that feed the projections.

**Preconditions:** Session 4 done.

**Read first:** `EXAM_MODE_TUTORIAL.md` §8 (Questions) & §9 (Mock Exams); `02_BRAND_VOICE.md`.

1. **`/help/exam/logging-questions`** — the Questions screen: the log form (source; mode
   Timed/Untimed/Tutor; first-attempt vs review; optional confidence Confident/Unsure/Guessed;
   subject + attempted/correct → live accuracy vs your average + Strong/Improving/Needs-work
   badge), the 30-day accuracy trend, session history, subject-by-subject panel, **"Paste
   results"** (paste a provider report → auto-parse → review/correct in a table → import), and
   **"Flag for review"** (send any topic into the SR queue as a Topic Review). Plus the floating
   **"+"** quick-logger available on almost every screen.
2. **`/help/exam/mock-exams`** — logging a mock (title, date, total, correct, time, notes → live
   score + band), the optional **per-subject breakdown** (and the total-mismatch warning), the
   **readiness bands** (Unsafe <55 / Improving 55–60 / Borderline 61–64 / Exam-ready ≥65), the
   hero trend chart with the 65% reference line, and **average pace** (sec/question vs target,
   default 72s). Emphasise: log every mock **with the breakdown** — it's the single biggest input
   to the pass projection (forward-link to readiness-and-projections).

**Stop and ask if:** band thresholds or default pace differ on the live app.

---

### SESSION 6 — `plan-and-schedule` + `staying-on-track`

**Goal:** working the plan, and recovering when life happens.

**Preconditions:** Session 5 done.

**Read first:** `EXAM_MODE_TUTORIAL.md` §6 (Plan views + task drawer) & §5 (backdate/skip,
block re-timing, Rest Day); Dashboard §4 (consistency strip never reds a rest day; question
deficit KPI; overload/burnout note); `02_BRAND_VOICE.md`.

1. **`/help/exam/plan-and-schedule`** — the four Plan views: **List** (phase groups, filter
   bar with live counts, sort dropdown, phase summary strip), **Kanban/Board** (drag to
   Completed), **Timeline** (per-subject + mock lanes, milestone/SR markers, heavy-week amber
   glow, the "stop new material" dashed line, exam-day red line). *(Sprint view is covered in
   revision-sprint — link, don't duplicate.)* Reordering and editing via the task drawer.
2. **`/help/exam/staying-on-track`** — *directly answers "how to reschedule if you get behind."*
   Backdating a task, Skip Today, how Pause re-times the rest of the day, the **question
   deficit** KPI and how to close it, why **Rest Days are a plan not a failure** (never shaded
   red), logging a Missed day honestly, and the **overload/burnout** coach nudge. Frame it as the
   coach's calm, no-guilt recovery playbook. Link to daily-study-session and settings (Daily
   Routine cap / rest day).

**Stop and ask if:** reflow/backdate behaviour on the live app differs from the tutorial.

---

### SESSION 7 — `dashboard` + `readiness-and-projections`

**Goal:** read mission control, and tell the three readiness numbers apart.

**Preconditions:** Session 6 done.

**Read first:** `EXAM_MODE_TUTORIAL.md` §4 (full Dashboard card catalogue), `feature-index.md`
(the readiness engines: `getReadiness`, `projectReadinessToExamDate`, Go/No-Go); `02_BRAND_VOICE.md`.

1. **`/help/exam/dashboard`** — a guided tour of *every* card/banner, grouped as the tutorial
   groups them: time-sensitive banners (T-minus checklist, logistics nudge, finish-setting-up,
   Revision Sprint nudge [Pro], overload note), always-on cards (consistency strip, SR banner,
   Today's task, the six KPI tiles, qbank first-pass ring, phase bars, Top-3-priorities, AI Study
   Advisor [Pro]), and the right-hand readiness column. Explain the phone Today/Progress split.
   For the three readiness widgets, give a one-line each and **link to article #2** for the full
   distinction (don't duplicate).
2. **`/help/exam/readiness-and-projections`** — *"readiness projection + Go/No-Go," explicitly.*
   Keep the **three similarly-named numbers distinct**, because users conflate them:
   - **Today's study compliance ring** — a composite 0–100 of how much of your plan/SR/questions
     you've *done* (present-tense effort).
   - **Readiness Projection** — a calibrated **pass-probability forecast** from your logged mock
     scores (regression trend, confidence band, pass line, margin, trend arrow). Needs ≥2 mocks.
   - **Go/No-Go card** — a plain-English verdict in the final 35 days (clear the line / a short
     deferral changes the math) with a sparkline + weak subjects. **Pro.**
   Explain plainly what feeds each and why logging mocks + days honestly makes them trustworthy.
   No fabricated formulae — describe behaviour, not the maths.

**Stop and ask if:** a Dashboard card exists in the live app that the tutorial doesn't describe.

---

### SESSION 8 — `history` + `analytics-and-reports`

**Goal:** the review surfaces — the calendar and the deep-dive.

**Preconditions:** Session 7 done.

**Read first:** `EXAM_MODE_TUTORIAL.md` §10 (History), §11 (Analytics), §12 (Progress Report);
`02_BRAND_VOICE.md`.

1. **`/help/exam/history`** — the month calendar colour code (green complete / amber partial /
   red missed / blue rest), tapping a day for its detail (subjects, questions, time, SR done),
   and using it to spot patterns. Short article; link to staying-on-track.
2. **`/help/exam/analytics-and-reports`** — *"how he will use analytics."* The Analytics screen
   is **Pro (whole screen)** — say so up front. Walk the chart groups (qbank progress + SR
   compliance, forgetting curves, SR timeline, subject-balance vs blueprint, mock trend, exam
   pace, **Focus Areas** with next-actions, the **Pass Probability Trajectory**, per-subject mock
   breakdown, confidence-vs-accuracy, retention map + study heatmap) as *questions they answer*,
   not a chart dump. Then the **Progress Report** (`/report`): what's in it, Print/Save-as-PDF,
   reached from Analytics or Settings → Import/Export. Frame analytics as a **weekly** habit.

**Stop and ask if:** a chart is present in the live app but absent from tutorial §11.

---

### SESSION 9 — `revision-sprint` + `settings`

**Goal:** the final-month mode, and the complete settings reference.

**Preconditions:** Session 8 done.

**Read first:** `EXAM_MODE_TUTORIAL.md` §6 (Sprint activation + Sprint view), §4 (Sprint nudge,
T-minus), §9 (Sprint mocks), §13 (all 11 Settings tabs), §14 (weekly rhythm); `feature-index.md`
(`examRevisionPlanner.js` — opt-in, never auto-activates); `11_PRICING_MODEL.md` (trial sentence).

1. **`/help/exam/revision-sprint`** — **Pro.** What the Sprint is (weakness-weighted, interleaved
   revision with mock days and a final-3-day taper), that it's **opt-in and never auto-activates**,
   how you **Activate Sprint** from the Dashboard nudge (within 28 days), the **Sprint view** that
   then appears in Plan, and the Sprint mocks cadence (~every 4 days, tapering). Tie in the T-minus
   checklist for the final week.
2. **`/help/exam/settings`** — the reference article: **what every option does**, tab by tab
   (Exam Setup, Subjects, Tasks, SR Settings, Daily Routine, Study Plans, Phases, Import/Export,
   Notifications [free for everyone], Billing, Danger Zone [type-to-confirm]). Cross-link each tab
   to its dedicated article (Subjects/Tasks → subjects-and-tasks, SR Settings → spaced-repetition,
   etc.) so this stays a **map, not a duplicate**. Handle Billing with the compliant trial sentence;
   no "upgrade."

**Stop and ask if:** the live Settings has a tab or option not in tutorial §13.

---

### SESSION 10 — `faq` + sitemap (register all pages)

**Goal:** the collected FAQ, and every help URL in the sitemap.

**Preconditions:** Sessions 3–9 done (all ~14 articles built).

**Read first:** every built article's FAQ block; `04_SEO_TECHNICAL_RULES.md` (sitemap + image
entries); current `public/sitemap.xml`.

1. **`/help/exam/faq`** — a curated top-of-mind FAQ (do I need a card to start; what if my exam
   isn't listed; what if I miss a day; is my data safe on reset/new-plan; which features are Pro;
   how the readiness numbers differ). `FAQPage` schema ↔ visible parity. Pull from existing
   article FAQs; don't contradict them. Link each answer to its full article.
2. **`sitemap.xml`** — add **all** help URLs (home, hub, every article + faq) with **image
   entries**, `www` canonical, no trailing slashes. Live-route confirmation is the post-merge gate.
3. Finalize the hub (`/help/exam`) and help home so they list the complete set.

**Definition of Done:** faq built + passing; sitemap has every help URL; hub/home complete;
`wiki/log.md` appended; §5.0 updated; committed.

---

### SESSION 11 — Brain + wiki updates, then open the PR(s)

**Goal:** make the Help Center a first-class content type in the brain/wiki, then assemble
the PR. Two repos.

**Preconditions:** Sessions 3–10 done (all pages built and passing).

**Content OS repo — brain (`raw/brain-v1/`):**
1. **`12_INTERNAL_LINKS.md`** — add every new page to the Page Registry (URL, title,
   audience `[EXAM]`, type `help`, status, primary keyword); record the link graph
   (outbound/inbound); add a `help` type to the type legend; note forward-reference links
   to Wave-2 pages as `H-series` link debt.
2. **`05_CONTENT_PIPELINE.md`** — add rows for **all** Wave-1 help pages (home, hub, ~14
   articles, faq); set built ones to 🟨 (built, pending routing/indexing) with slug + a log line.
3. **New `raw/brain-v1/13_HELP_CENTER.md`** — the Help Center spec: the §3 full-coverage article
   map, page-type definitions, the template delta, schema rules, the article build recipe, the
   Pro-feature copy rule, the wave plan, and the standing rule **help ≠ blog** (separate feeds/
   listings). So future sessions treat it as a first-class type.
4. **`raw/brain-v1/CHANGELOG.md`** — one entry: Help Center introduced at `/help/`, Exam Wave 1
   (full Exam Mode coverage) built, files 05/12 updated, new file 13 created, routing in `vercel.json`.

**Content OS repo — wiki (`wiki/`):**
5. Create a wiki page (e.g. `wiki/content/Help Center.md`) summarising the spec, and add
   it to `wiki/index.md` under Content Production. Append the session to `wiki/log.md`
   (type `strategy`).
6. Commit + push Content OS (per this repo's conventions).

**Website repo — the PR:**
7. Ensure committed: `public/help/**`, `public/help/images/**` (briefs/placeholders),
   `sitemap.xml`, `vercel.json`.
8. Open PR **"Content: Exam Help Center — Wave 1"** to `main`. Description includes: the
   page list; the per-page **§4 QA checklists**; the OG/screenshot briefs outstanding; the
   list of forward-reference links; and any open questions.
9. **Merge gate — all true before merging to `main`:**
   - Every page passes the full §4 gate.
   - Placeholders are clearly marked (Istiaque approved placeholders-first — decision §1.2).
   - `vercel.json` `/help` rewrites present, catch-all last.
   - Brain + wiki updates committed in Content OS.
   If a gate isn't met, leave the PR open and ask — do not merge past a failing gate.

**Definition of Done:** brain + wiki updated and pushed (Content OS); website PR open with
full description and passing gates; `wiki/log.md` appended; §5.0 updated. **Hold indexing (Session 12).**

---

### SESSION 12 — Post-merge: indexing (gated on live routing)

**Goal:** get the pages indexed. Only after the website PR is merged **and** `/help/*`
serves real static HTML.

**Preconditions:** PR merged; deploy done.

1. **Live-route check.** Fetch **every** help URL. Confirm each returns a real static
   page: meaningful `<title>`, **self-referential** `<link rel="canonical">` (not `/`),
   populated `<body>`. A 200 with `<div id="root">` + homepage canonical = **SPA
   fallthrough = not ready** → stop, the `vercel.json` rewrite or deploy needs fixing.
2. **Wire inbound links** (from live-fetched HTML only): a contextual line on `/features`
   and on `/blog/amc-mcq-study-plan` pointing to the cornerstone. Commit (website repo).
3. **Submit `sitemap.xml`** in GSC if not auto-picked up.
4. **GSC → URL Inspection → Request Indexing** for each help page.
5. Flip `05_CONTENT_PIPELINE.md` rows to ✅ live with confirmed slugs; update
   `12_INTERNAL_LINKS.md` inbound entries; append `wiki/log.md` (type `deploy`).
6. **Images:** no screenshot drop is coming — illustrations are HTML/CSS mocks, already final
   (§6). Confirm the shared **OG card** (`help-og.webp`) Istiaque produced from §6.3 is in place
   and referenced by every page's `og:image`/`twitter:image`; re-run `build_site.py`.

**Definition of Done:** every help page live with self-referential canonicals; inbound links
wired; sitemap submitted; indexing requested; pipeline flipped to ✅; log appended; §5.0 updated.

---

## 6. Illustrations — HTML/CSS mocks (all features) + OG images

### Decision (Istiaque, 2026-07-02): NO screenshots — mocks instead

Istiaque will **not** supply screen captures. Therefore **every in-article feature
illustration is a self-contained HTML/CSS mock authored by Claude** — a lightweight, on-brand
rendering of the UI (cards, buttons, sliders, timers, tables, chips) built from the site's own
CSS. These are **final deliverables, not placeholders**: they ship *as* the illustration.

The **only** raster asset is the **OG / share image (1200×630)**, one reusable branded card
that Istiaque generates from the **ChatGPT prompt in §6.3**. No hero images, no video/motion
files (the build-animation and live-timer flows become a small animated-or-static CSS mock, not
an MP4).

> This supersedes the old "ship placeholders, add real screenshots later" flow. There is no
> later screenshot drop. Session 1 already shipped 11 `[SCREENSHOT PENDING]` markers — those get
> **converted to HTML/CSS mocks during Session 11** (finalize) using the inventory below.

### 6.1 Mock authoring rules (apply to every mock)

- **Build with the site's tokens** — use `/assets/studyrise-core.css` variables (brand gradient
  `#7C3AED→#2563EB→#06B6D4`, navy `#0D1B3E`, radius, shadow, font stack). No inline hex that
  drifts from brand.
- **Self-contained & light** — pure HTML + scoped CSS (a `.help-mock` wrapper). **No `<img>`,
  no JS, no external requests.** Must not bloat LCP or fail the §4 page-weight gate.
- **Fits the 760px content column** (~704px usable); responsive/stacks on mobile.
- **Demo data only** — persona **Dr. Sarah Chen at a mid-plan state** (populated, not empty
  screens), no real names, no notifications, no PII.
- **Honest framing** — caption each mock as an *illustration* (e.g. `<figcaption>Illustration:
  the Go/No-Go card</figcaption>`); never imply it's a live screenshot. It's a teaching diagram.
- **Accessible** — wrap in `<figure role="img" aria-label="…">` with a written description that
  carries the same information the old `alt` text would have. The alt-equivalents already drafted
  in the PR notes are reused verbatim as `aria-label`.
- **Match, don't invent** — the mock must reflect the **real** UI per `EXAM_MODE_TUTORIAL.md`
  (correct button labels, real SR intervals 3/7/14/21, real readiness bands). If a detail isn't
  in the tutorial doc, don't draw it — flag NEEDS VERIFICATION.

### 6.2 Mock inventory — every feature/window, by session

Each content session authors the mocks for its two articles. This is the master list so no
feature is missed; each session also restates its subset in its PR-notes section.

| Session · Article | HTML/CSS mocks to author |
|---|---|
| **S1** `getting-started` *(shipped as markers → mock in S11)* | register form · mode-select (3 cards) · wizard step 1/2/3 · build animation (CSS) · feature-tour overlay · day-0 dashboard · today planner · block timer · log modal |
| **S3** `build-your-plan` | wizard step 1 (4 exam-type cards: AMC MCQ / PLAB 1 / USMLE Step 1 / Custom) · step 2 (daily-hours + days-per-week sliders + live weekly-hours line) · step 3 summary · the 3-phase timeline (foundation → consolidation → mocks) |
| **S3** `subjects-and-tasks` | subject list with add/edit/delete controls · a single task row · task-detail drawer |
| **S4** `daily-study-session` | Today day-planner (50/10 blocks) · a block with its timer (running state) · Log modal (Complete / Partial / Missed / Rest Day + questions-done field) · floating "+" quick-logger |
| **S4** `spaced-repetition` | SR review queue card · the 4 grade buttons (Blackout / Hard / Medium / Easy → 3 / 7 / 14 / 21 days) · retention heatmap · SR settings panel |
| **S5** `logging-questions` | question log form · Paste-results parser · Flag-for-review control |
| **S5** `mock-exams` | mock log form (title/date/total/correct/time/notes) · readiness bands (Unsafe <55 / Improving 55–60 / Borderline 61–64 / Exam-ready ≥65) · per-subject breakdown table · pace indicator (default 72s) |
| **S6** `plan-and-schedule` | the 4 Plan views — List / Kanban / Timeline / Sprint · task-detail drawer (reuse S3's) |
| **S6** `staying-on-track` | a missed/behind state · the reschedule / catch-up flow |
| **S7** `dashboard` | top banners · KPI tiles · consistency strip · phase progress bars · the 3 readiness widgets · **Go/No-Go card** (Pro) · **AI Study Advisor** card (Pro) |
| **S7** `readiness-and-projections` | readiness gauge · projection chart (regression trend + confidence band + pass line + margin) · pass-probability forecast |
| **S8** `history` | month calendar / consistency heatmap |
| **S8** `analytics-and-reports` | analytics screen (Pro) · progress report layout |
| **S9** `revision-sprint` | sprint setup (opt-in) · sprint plan with mock cadence + 3-day taper (Pro) |
| **S9** `settings` | the 11 settings tabs (a tab-strip mock + one representative panel) |
| **S10** `faq` | none (text page) |

Pro features (Go/No-Go, AI Study Advisor, Analytics, Revision Sprint) still carry the plain-Pro
label in copy per §1 — the mock shows the feature; the prose says "This is part of StudyRise Pro."

### 6.3 OG image — the one raster asset (ChatGPT prompt for Istiaque)

One **reusable branded Help-Center OG card**, 1200×630, saved to
`public/help/images/help-og.webp` and referenced by every help page's `og:image` /
`twitter:image` (per-page headline swap optional later). Generate with this prompt, then export
to WebP at exactly 1200×630:

```
Create a 1200 x 630 pixel Open Graph share image for a product Help Center. Landscape, flat
modern SaaS-docs style, NOT a photograph.

Background: a smooth diagonal brand gradient from violet #7C3AED through blue #2563EB to
cyan #06B6D4, dark and calm (not neon).

Left ~40%: a solid deep-navy (#0D1B3E) rounded panel holding the headline text
"StudyRise Help Center" on two lines, in a bold geometric sans-serif (like Plus Jakarta Sans
800), white, large and clearly legible even at small sizes. A smaller line under it reads
"Exam Mode — guides & how-tos".

Right ~60%: a clean, simplified illustration (vector/UI-mock style, no real screenshot) of a
study dashboard — a countdown ring, a couple of progress bars, and a small calendar/heatmap —
in white and light-blue on the gradient, softly shadowed, slightly angled. Demo-looking, no real
names or numbers.

Bottom-right: a small "StudyRise" wordmark logo.

Style: calm, focused, trustworthy, coaching tone — no hype, no glow, no stethoscope, no stock
clichés, no lens flare. Plenty of contrast so text reads on both light and dark share surfaces.
```

Only `help-og.webp` is a real image the whole Help Center needs. Everything else is a mock.

---

## 7. Standing stop-and-ask triggers (any session)

- A tutorial-doc product fact conflicts with a screenshot or the live app (screenshot
  wins — but confirm, then patch copy).
- A medical/exam fact is needed that isn't in the tutorial doc, the dedicated exam
  content, or `FEATURES.md`.
- A shot-list image is missing at a step that genuinely needs it (vs. a marked placeholder).
- You're tempted to touch anything **outside content**: the SPA, auth, in-app Help links,
  the search index, or the build/check scripts (`build_site.py`/`check_blog.py`). The
  `vercel.json` `/help` rewrite is the **one** infra change you own (§1.1) — everything
  else infra is a flag-and-wait.

Batch questions; specific over vague. Don't stall the whole build on one blocker if other
sessions can proceed.

---

## 8. Remaining open question (non-blocking)

- **Footer "Help Center" link** — add to the shared footer partial now, or after Wave 1 is
  live? It re-propagates to every page (one shared-partial edit). **Default:** add it in
  Session 12, once the pages are live, so no page links to a not-yet-serving `/help`.
  Override if you'd rather ship it dark.

---

*End of plan. One session per run. Cornerstone first. Keep the brain clean. Ask when unsure.*
