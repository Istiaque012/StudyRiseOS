# 09 · AUDIT PLAYBOOK — Periodic SEO Health Checks

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** The repeatable process for checking how StudyRise is doing in search and deciding what to fix next. Run the monthly check on a cadence; run the targeted checks whenever Istiaque asks ("audit the blog", "is StudyRise showing in AI?", "why did traffic drop?"). Output is **always a short, prioritised action list** — never a data dump.

---

## The Three Audit Types

| Type | Cadence | Question it answers |
|---|---|---|
| **Monthly health check** | Monthly | "What's the state of SEO and what are the top 3 things to do?" |
| **AI-visibility check** | Monthly | "Is StudyRise being cited in AI answers, and where could it be?" |
| **Targeted check** | On demand | "Why did X happen / what's wrong with page Y?" |

---

## MONTHLY HEALTH CHECK

Work through these using the connected tools. Record numbers so month-on-month comparison is possible.

**1 — Search Console (the core)**
- Total clicks & impressions vs last month — up or down?
- Top queries: which are gaining, which slipping?
- **Near-miss keywords (position 8–20):** these are the highest-leverage opportunities — a page that's almost there. List them; each is a candidate for an on-page improvement or a supporting article.
- Pages losing position month-on-month → flag for refresh (`🔁 Needs update` in file 05).
- Index coverage: any pages dropped out of the index? Any crawl errors?
- Sitemap status: submitted, processing, no errors?

**2 — Google Analytics**
- Traffic to `/blog/*` and landing pages — trend.
- Which articles drive the most engaged sessions? Which convert toward sign-up?
- Bounce/engagement on key pages — anything unusually poor signals a content or speed problem.

**3 — Google Trends**
- Any rising query in StudyRise's space (study planning, the three exams, MBBS BD) worth a fast article?
- Seasonality check: which segment is heating up (e.g. exam seasons) so content can be timed ahead of demand?

**4 — Live page checks (web fetch)**
- Fetch the homepage (the only live page until rebuilds ship). Confirm: title/meta intact, canonical correct, schema present, no broken layout.
- Spot-check one recent article for the full technical gate (file 04) — applies once articles are rebuilt; none are live as of 2026-06-21.

**5 — Technical spot-check**
- Sitemap loads and lists only valid 200 pages.
- robots.txt unchanged and correct: `/today`, `/plan`, `/auth`, and all other app routes are blocked; `/login`, `/register`, and all marketing/blog routes are allowed; `Sitemap:` line present. `/login` and `/register` stay allowed in robots but must **never** appear in `sitemap.xml` (they're auth entry points, not indexable pages).
- No accidental `noindex` on anything that should rank.
- **Internal-link sweep (file 12):** every live indexable page has ≥1 in-body inbound link
  (no orphans); no in-body internal link points to a 404 or a not-yet-built URL. Reconcile any
  drift against `12_INTERNAL_LINKS.md` §3 and update its Link-Debt Ledger (§6).
- **Listing-thumbnail sweep (Image Protocol Rule 4):** across `public/blog.html` and every
  `public/blog/{category}.html`, no article card is left with a bare-gradient thumbnail when its
  `-og.webp` exists in `public/blog/images/`. Every card whose `href` is `/blog/{slug}` must carry
  `background-image:url('/blog/images/{slug}-og.webp')` on its thumbnail. Flag any blank/gradient
  card as a fix (this is the "blog cards show flat gradient blocks" regression).
- Confirm `index.html` does NOT exist at repo root (would shadow the `/` → `public/landing.html`
  Vercel rewrite and silently break homepage SEO). Check after any Vite build.
- Confirm homepage has zero `target="_top"` attributes (legacy iframe artifact — if any appear,
  someone has overwritten `landing.html` with an older version).
- [ ] Favicon tag points to `/assets/brand/favicon.svg` (not the old `/favicon.svg`)
- [ ] Logo `<img>` src attributes use `/assets/brand/` prefix
- [ ] Page links /assets/studyrise-core.css and /assets/studyrise-chrome.js
- [ ] Footer logo src = /assets/brand/studyrise-logo-deep.svg (not the old missing white logo)

**Output:** a one-screen summary —
```
MONTHLY SEO CHECK · {{Month}}
Clicks: {{n}} ({{±%}})   Impressions: {{n}} ({{±%}})   Indexed pages: {{n}}
Wins:   {{1–2 lines}}
Risks:  {{1–2 lines}}
TOP 3 ACTIONS THIS MONTH:
  1. {{highest-leverage fix — usually a near-miss page}}
  2. {{...}}
  3. {{...}}
```

---

## AI-VISIBILITY CHECK (appearing in AI search)

GSC won't separate AI-Overview citations, so this is a manual + search-based loop.

1. Take StudyRise's 8–10 most important target queries (from file 05 — the P0 transactional/commercial ones).
2. For each, search and record:
   - Does an **AI Overview** appear?
   - **Is StudyRise cited?** (Y/N)
   - If not, **who is cited** — and what do they have that StudyRise doesn't (original data, clearer answer, stronger entity)?
3. Compare to last month's record. Track the count of "StudyRise cited" over time — that's the AI-visibility KPI.
3b. **Also pull the GA4 AI-referral numbers** — sessions and sign-ups from `chatgpt.com` / `perplexity.ai` / `gemini.google.com` / `copilot.microsoft.com` (the GA4 channel/segment configured in file 03's Baseline Setup). Record them alongside the manual citation count: the citation count says *whether* StudyRise is named, the GA4 referral number says *whether anyone clicked through*. Watch both month-on-month.
4. Translate gaps into actions: usually "make the direct-answer opening on page X sharper and more original" or "add original data to earn the citation."

**Output:** a small table —
```
AI VISIBILITY · {{Month}}
Query                         AIO?  StudyRise cited?  Who's cited / gap
{{query}}                     Y     N                 {{competitor}} — has {{X}}
...
Cited count: {{n}}/{{total}}  (last month: {{m}})
NEXT: {{1–3 actions}}
```

---

## TARGETED CHECKS (on demand)

**"Why did traffic drop?"**
- GSC: clicks vs impressions — is it lost rankings (impressions down) or lost CTR (impressions same, clicks down)?
- Check for a lost position on a top page, a deindexed page, a broken canonical, or an algorithm-update date alignment.
- Check GA for whether the drop is one segment/page or sitewide.

**"Audit page X."**
- Run the full technical gate (file 04) against the live page via fetch.
- Compare it to the current top 3 ranking pages for its keyword — what do they cover that it doesn't?
- Output: specific edits, in priority order.

**"What should I publish next?"**
- Combine: near-miss keywords from GSC + rising queries from Trends + the next P0/P1 rows in file 05.
- Recommend 3–5 pieces with the reason each is timely.

---

## The Maintenance Mindset

Rankings decay if left alone. The two highest-return recurring actions are nearly always:
1. **Refresh near-miss pages** (position 8–20) — small on-page improvements move these into clicks faster than any new article.
2. **Update decaying winners** — a page that's slipping usually needs freshened facts, a sharper opening, and a few new internal links, not a rewrite.

Beyond reactive refreshes, hold the **per-type freshness cadence** from file 03 (`Staying Ranked → Freshness cadence by content type`): exam-sensitive and pricing pages on the shorter clock, evergreen content on the longer one. Any refresh bumps `dateModified` + sitemap `lastmod` + the visible "Last updated" line together.

Always end an audit by updating `05_CONTENT_PIPELINE.md`: mark refresh candidates `🔁 Needs update`, and add any new article ideas as rows.

---

## A Calibration Note

Don't over-claim from the data. A one-month wobble isn't a trend; a single uncited query isn't a crisis. Present findings plainly, flag what's genuinely actionable, and let Istiaque decide. The job is a clear, honest read of the situation plus the few moves that matter most — not a 40-metric report nobody acts on.


---
<!-- docnav-related -->
### Related docs
- [01 · CONTEXT — Read This First, Every Time](01_CONTEXT.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [03 · SEO STRATEGY — What to Make and Why](03_SEO_STRATEGY.md)
- [04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File](04_SEO_TECHNICAL_RULES.md)
- [05 · CONTENT PIPELINE — The Master Queue](05_CONTENT_PIPELINE.md)
- [06 · PRODUCTION PLAYBOOK — How to Make One Article, End to End](06_PRODUCTION_PLAYBOOK.md)
- [07 · IMAGE PROTOCOL — The Locked Image Rules](07_IMAGE_PROTOCOL.md)
- [08 · DEPLOYMENT GUIDE — Delivering the Finished File](08_DEPLOYMENT_GUIDE.md)
- [Blog Page Animation & Motion Guide](BLOG_ANIMATIONS_GUIDE.md)
- [Brand Kit → moved (de-duplicated)](BRAND_KIT.md)
- [Design Prompts → moved (de-duplicated)](DESIGN_PROMPTS.md)
- [StudyRise — Static Page Motion Guide](MOTION_GUIDE.md)
- [README — How to Use the StudyRise Content & SEO Brain](README.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
