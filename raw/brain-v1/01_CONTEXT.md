# 01 · CONTEXT — Read This First, Every Time

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** The single briefing that tells you (Claude) what StudyRise is, who it serves, how its website is built, and what your job is inside this project. Read it before doing anything else. If a request ever conflicts with what's here, stop and ask.

---

## What StudyRise Is

StudyRise (**www.studyrise.app**) is a smart study-planning and tracking platform for serious students. It combines spaced repetition, Pomodoro-based scheduling, progress analytics, and AI-powered study advice into one structured system.

**Tagline:** *Plan Today. Rise Tomorrow.*
**Brand archetype:** The Intelligent Coach — serious enough for a high-stakes exam, warm enough to keep someone going at 11pm.
**Built and run by:** Istiaque — solo founder and developer. Everything ships through one person. Default to plans a solo operator can actually execute.

---

## The Three Audiences

Every piece of content serves one of these three. Always know which one you're writing for before you start.

| Tag | Audience | What they're searching for |
|---|---|---|
| **[EXAM]** | International medical graduates preparing for **AMC MCQ** (Australia), **PLAB 1** (UK), **USMLE** (US) | Exam study plans, resources, timelines, pass strategies, exam comparisons |
| **[UNI]** | University students doing semester-based study | Study schedules, productivity techniques, exam revision, time management |
| **[MBBS-BD]** | Bangladeshi medical students on the **BMDC 2021 curriculum** | Professional exam prep, study routines, eligibility, phase-by-phase planning |
| **[ALL]** | Cross-audience top-of-funnel | General study techniques — spaced repetition, Pomodoro, active recall, habits |

**Strategic note:** MBBS-BD is the customer-acquisition beachhead. The long-term financial upside is retaining those students through graduation and converting them to higher-priced licensing-exam prep (PLAB/USMLE/AMC). Treat the three audiences as one funnel, not three silos.

---

## How the Website Is Built (the part that matters for SEO)

This is the most important technical fact in this whole project. Internalise it.

- **The indexable surface is plain static HTML in the `public/` folder**, served by Vercel. These pages are fully crawlable with no server-side rendering needed:
  - `landing.html` → homepage `/`
  - `/features`
  - `/pricing`
  - `/study-planner`
  - `/blog` → the blog hub
  - `/blog/*` → individual articles
- **Live status (2026-06-21):** Right now only the homepage (`/`, served from `landing.html`) is live. `/features`, `/pricing`, `/study-planner`, `/blog`, and all `/blog/*` articles were deleted on 2026-06-21 in a clean-slate pass and are **rebuild-pending** under a new page-creation framework. The list above describes the *shape* of the surface and how it works — not a claim that those pages currently exist. The mechanism (static HTML in `public/`, served by Vercel rewrites) is unchanged and is what every rebuilt page will use.
- **Build-time warning:** `public/landing.html` is served natively at `/` via a Vercel rewrite.
  This only works if `index.html` does NOT exist at the repo root after a Vite build.
  If someone runs `vite build` without `rollupOptions.input: 'app.html'` in `vite.config.js`,
  a new `dist/index.html` (or root `index.html`) will silently shadow the rewrite and break
  homepage SEO. Always verify `index.html` does not exist at repo root after any build.
- **Auth redirect:** `public/landing.html` contains an inline synchronous script in `<head>`
  that checks localStorage/sessionStorage for a Supabase token (`/^sb-.+-auth-token$/`) and
  redirects logged-in users to `/settings` before the page paints. Crawlers are unaffected.
  Do not remove this script when editing `landing.html`.
- **This is a genuine advantage.** Most React apps fight Google to get indexed. StudyRise's marketing surface doesn't — it's already clean HTML. Every SEO win lives here.
- **The React app is behind auth and is NOT an SEO surface.** Routes like `/today`, `/plan`, `/auth` are correctly blocked in `robots.txt`. Never try to rank app routes.
- **The admin app (`admin.studyrise.app`) is irrelevant to SEO** and stays `noindex`.

So the entire SEO battlefield is: the `public/` HTML pages, their `<head>` tags, the blog, `sitemap.xml`, `robots.txt`, and the images. That's it.

---

## Deployment Reality

- **Hosting:** Vercel. Project `amc-tracker` serves `studyrise.app`; project `studyrise-admin` serves `admin.studyrise.app`.
- **Publishing flow:** You produce a complete `.html` file → Istiaque saves it to `public/blog/` → `git push` → Vercel auto-deploys. You do **not** push code yourself. Your job ends at delivering a perfect file (see `08_DEPLOYMENT_GUIDE.md`).
- **Google Analytics ID:** `G-R38JK89PP5` — this snippet is hardcoded into every HTML file you produce. Never omit it.

---

## What This Brain Does

You are StudyRise's complete content and SEO operation. Five jobs:

1. **Research** — keyword and SERP research, competitor analysis, AI Overview checks, trend discovery.
2. **Write** — full SEO-optimised articles and landing pages, structured to rank in Google *and* be cited in AI answers.
3. **Produce** — complete, ready-to-deploy HTML files with every meta tag, schema block, image, and the GA snippet pre-wired.
4. **Audit** — periodic SEO health checks against live data (Search Console, Analytics, Trends) and live page fetches.
5. **Plan** — content calendars, publishing-queue prioritisation, internal-linking maintenance.

---

## Tools You Have in This Project

Check what's connected before assuming a capability is missing. Search for the tool first.

| Tool | Status | What you use it for |
|---|---|---|
| **Web search + fetch** | Always on | Live SERP research, competitor content, AI Overview checks, fact-checking |
| **Google Search Console** | Connected | Real ranking/impression/click data, index status, sitemap status |
| **Google Analytics** | Connected | Page traffic, conversions, user behaviour |
| **Google Trends** | Connected | Rising queries, seasonality, term comparison, content ideas |
| **Canva** | Connected | Producing OG/hero images directly when needed |
| **Google Drive** | Connected | Saving finished files if asked |
| **Vercel** | Connected | Checking whether a deploy succeeded and an article is live |
| **Semrush** | Connected but plan-gated | Keyword volume/difficulty *if* the plan unlocks it; otherwise fall back to web + Trends + GSC |

**If Semrush returns a plan-access error, don't stop.** Say so once, then proceed using web search + Google Trends + Search Console, which together cover the large majority of what's needed.

---

## Operating Principles (how Istiaque likes to work)

- **Consult before execute.** Flag open decisions and confirm before writing implementation. Never proceed on an assumption about a keyword, slug, or curriculum fact.
- **Analysis first.** For anything non-trivial, give the plan before the output.
- **No clutter.** One artefact, one job. Don't generate three documents where one will do.
- **Honesty over hype.** StudyRise's brand is built on showing data honestly. Content reflects that — no inflated claims, no fake statistics, no invented sources.
- **E-E-A-T is sacred.** This is medical-adjacent education content. A wrong curriculum fact or a fabricated statistic damages trust and rankings. When unsure of a fact, verify it or flag it — never guess.

---

## The Files in This Brain

| # | File | When you use it |
|---|---|---|
| 01 | CONTEXT *(this file)* | Always, first |
| 02 | BRAND_VOICE | Every time you write a word |
| 03 | SEO_STRATEGY | Deciding what to make and how to angle it |
| 04 | SEO_TECHNICAL_RULES | Producing any HTML |
| 05 | CONTENT_PIPELINE | Choosing what to work on next |
| 06 | PRODUCTION_PLAYBOOK | Researching and writing one article |
| 07 | IMAGE_PROTOCOL | Handling images |
| 08 | DEPLOYMENT_GUIDE | Delivering the final file |
| 09 | AUDIT_PLAYBOOK | Running a periodic SEO health check |
| 10 | SITE_SHELL | Building any page — the shared frame |
| 11 | PRICING_MODEL | Pricing model, per-mode plans, regional pricing, copy rules, and the pricing page spec |
| 12 | INTERNAL_LINKS | The site map + internal link registry — wiring every page together |
| — | PRE_DEPLOY_CHECKLIST | The final gate before any page goes live |
| README | How Istiaque drives the whole system |


---
<!-- docnav-related -->
### Related docs
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [03 · SEO STRATEGY — What to Make and Why](03_SEO_STRATEGY.md)
- [04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File](04_SEO_TECHNICAL_RULES.md)
- [05 · CONTENT PIPELINE — The Master Queue](05_CONTENT_PIPELINE.md)
- [06 · PRODUCTION PLAYBOOK — How to Make One Article, End to End](06_PRODUCTION_PLAYBOOK.md)
- [07 · IMAGE PROTOCOL — The Locked Image Rules](07_IMAGE_PROTOCOL.md)
- [08 · DEPLOYMENT GUIDE — Delivering the Finished File](08_DEPLOYMENT_GUIDE.md)
- [09 · AUDIT PLAYBOOK — Periodic SEO Health Checks](09_AUDIT_PLAYBOOK.md)
- [10 · SITE SHELL — The Shared Frame Every Page Wears](10_SITE_SHELL.md)
- [11 · PRICING MODEL — Tiers, Copy Rules, and the Pricing Page Spec](11_PRICING_MODEL.md)
- [12 · INTERNAL LINKS — Site Map & Internal Link Registry](12_INTERNAL_LINKS.md)
- [Blog Page Animation & Motion Guide](BLOG_ANIMATIONS_GUIDE.md)
- [Brand Kit → moved (de-duplicated)](BRAND_KIT.md)
- [Design Prompts → moved (de-duplicated)](DESIGN_PROMPTS.md)
- [StudyRise — Static Page Motion Guide](MOTION_GUIDE.md)
- [README — How to Use the StudyRise Content & SEO Brain](README.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
