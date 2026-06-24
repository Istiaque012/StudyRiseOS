# 03 · SEO STRATEGY — What to Make and Why

<!-- docnav -->
> **Docs ·** folder map [README.md](README.md) · part of the [StudyRise docs index](../README.md) · repo index [CLAUDE.md](../../CLAUDE.md)


> **What this file is.** The strategic brain. It decides *what* content to build, *which* keyword each piece owns, and *how* to angle it to win in 2026 search. The technical "how to build the HTML" lives in `04_SEO_TECHNICAL_RULES.md`; the step-by-step writing process lives in `06_PRODUCTION_PLAYBOOK.md`. This file is the why.

---

## How the SEO Surface Works

The indexable surface is static HTML in `public/`, served by Vercel rewrites: `landing.html` (homepage `/`), `/features`, `/pricing`, `/study-planner`, `/blog`, `/blog/*`. These are plain crawlable HTML files — no server-side rendering or prerendering needed. Most React SPAs fight Google to get indexed; StudyRise doesn't.

The React SPA (`app.html` catch-all) is the authenticated app. It is *not* an SEO surface and is correctly blocked in `robots.txt`. Never try to rank app routes (`/today`, `/plan`, `/auth`, etc.).

The admin app (`admin.studyrise.app`) is irrelevant to SEO — keep it `noindex`.

**Every SEO win lives in `public/` — its HTML pages, their `<head>` tags, the blog, the sitemap, robots.txt, and the images. That is the whole battlefield.**

---

## The 2026 Search Reality (internalise this first)

Everything below follows from four facts about how search works now:

1. **AI Overviews lead ~20–25% of searches**, most often on informational and education/medical queries — exactly StudyRise's territory. Pure "what is X" traffic increasingly gets answered without a click.
2. **Commercial, comparison, and transactional intent is where clicks and conversions survive.** "best free study planner", "StudyRise vs Notion", "PLAB 1 study planner app" — these still send real visitors who convert.
3. **Being *cited* inside the AI answer is the new front page.** Citations go to primary-source, original-data, clearly-attributed content from recognised brand entities — not restated summaries of what everyone else says.
4. **It is still just SEO.** There's no magic `llms.txt`, no schema hack, no 40-word-chunk trick. Indexability + genuinely helpful people-first content + clean technical structure + a clear brand entity earns both blue links *and* AI citations.

**The resulting strategy:**

> Nail the technical base → build a clear StudyRise brand entity → put the best effort into commercial/comparison pages and original-data content → use informational articles to build topical authority and feed AI citations, not to chase raw volume.

---

## The Keyword → URL Map Principle

The goal is **not** a giant keyword list. It's a map where **every important keyword has exactly one page responsible for ranking it.** This prevents StudyRise from competing against itself (keyword cannibalisation) and makes "what do we build next?" obvious.

Rules:
- One primary keyword owns one URL. Before assigning a keyword to a new article, confirm no existing page already owns it.
- If two planned pieces target the same keyword, merge them or re-angle one.
- The map is maintained in `05_CONTENT_PIPELINE.md`. Update it whenever a piece is assigned or published.

---

## Keyword Research Method

How to build the map:

1. **Seed from the product, not your imagination.** For each segment, list the literal phrases a target user would type. Extract existing targets from `05_CONTENT_PIPELINE.md` first.
2. **Expand with free tools.** Run each seed through: Google autocomplete, "People also ask", "Related searches", Google Keyword Planner, and AnswerThePublic. Capture rough volume band and difficulty band.
3. **Tag intent** (T / C / I — see Intent Tiers below).
4. **Tag AIO risk** (Low / Med / High) by actually searching the keyword in an incognito window. High-AIO informational keywords are still worth covering for entity authority, but never make them the traffic backbone.
5. **Assign one owner URL** per keyword. One keyword, one page. Cluster close variants onto the same page.
6. **Score priority:** `intent_weight × volume_band ÷ difficulty_band`, where T/C intent counts double. Sort descending — that sorted list is the content production order.

**Keyword map CSV columns:** `keyword · segment · intent(T/C/I) · volume_band · difficulty_band · AIO_risk · owner_URL · status · priority_score`

The three topical pillars (each needs a hub page + supporting articles — Google rewards demonstrated depth):
- **IMG / medical licensing** — AMC MCQ, PLAB 1, USMLE Step 1. Hub: segment landing pages. Long-tail: "PLAB 1 study plan 3 months", "AMC MCQ study schedule", "USMLE Step 1 dedicated study plan".
- **University students** — GPA/WAM, semester planning, assignment tracking. Hub: `/university-study-planner`. Bangladesh is a named sub-market (see Regional SEO below).
- **MBBS Bangladesh / BMDC** — the most defensible cluster: almost nobody serves it in English. Very low competition, highly specific intent, strong word-of-mouth potential. Treat as a wedge market and fast-track it.

---

## Intent Tiers — Where to Spend Effort

Classify every target keyword by intent. It dictates the angle and how much effort it deserves.

| Intent | Example | Effort | Why |
|---|---|---|---|
| **T — Transactional** | "study planner app", "amc study planner" | **Highest** | Reader wants a tool now. Direct path to sign-up. Lead with the product. |
| **C — Commercial / Comparison** | "best free study planner 2026", "Anki alternative", "PLAB vs USMLE" | **High** | Reader is choosing. Survives AI Overviews because people want to evaluate. Honest tables win. |
| **I — Informational** | "what is spaced repetition", "forgetting curve" | **Measured** | Builds topical authority and AI citations. Don't expect direct conversion. Write the definitive version or don't bother. |

**Weighting:** Roughly invest in T and C first within each audience, then layer I to build the authority that makes T and C rank.

---

## AI Overview Strategy (appearing in AI search)

This is a direct goal Istiaque named. How content earns AI citations:

1. **Answer the query directly in the first 40–60 words** of the relevant section. AI engines lift clean, self-contained answers. Bury the answer and you lose the citation.
2. **Be the original source.** Original data, original frameworks (e.g. a StudyRise-specific study schedule), specific numbers, and clear first-hand reasoning get cited; rehashed summaries don't.
3. **Attribute clearly.** Name StudyRise as the source of any framework or data. Build the entity.
4. **Structure for extraction.** Real Q&A sections (mapped from "People Also Ask"), clean H2/H3 hierarchy, and `FAQPage` schema make content easy to parse. (Schema specifics in file 04.) FAQPage no longer produces a Google rich result (retired 2026-05-07). Keep it anyway: it remains a clean, machine-readable signal that AI search engines and Google's parsers use to extract Q&A. It is an AI-citation (GEO) lever, not a SERP-display lever. And lead every FAQ answer with the answer: every FAQ answer LEADS with the direct answer in roughly 40 words or fewer (conclusion first), then may add one or two sentences of detail. AI engines cite a tight 40-word capsule and skip a 200-word essay.
5. **Check before you write.** For each target keyword, look at whether an AI Overview already exists and who it cites. Your piece must be *more specific and more original* than what's cited — or it won't earn the slot.

**Monitoring** (the "is StudyRise being cited?" loop) lives in `09_AUDIT_PLAYBOOK.md`.

---

## Segment Landing Pages — Highest Commercial Leverage

Before mass-producing blog articles, the highest-ROI build is a small set of **segment landing pages** with transactional/commercial intent. These convert far better than informational posts and anchor internal linking. Priority targets:

- `/study-planner` (deleted 2026-06-21 — rebuild pending)
- `/mbbs-bangladesh` — own the near-empty BMDC space (deleted 2026-06-21 — rebuild pending; see below)
- `/plab-1` / `/plab-study-planner`
- `/usmle-step-1` / `/usmle-study-planner`
- `/amc-mcq` / `/amc-study-planner`
- `/university-study-planner`

Each is a focused page targeting that segment's transactional keyword, linking down into the relevant blog cluster and up to sign-up. Track build status in `05_CONTENT_PIPELINE.md`.

---

## Competitive Landscape by Segment (June 2026 baseline)

Re-verify with live SERP checks before writing — this is the starting picture, not gospel.

**AMC MCQ:** Contested by mid-DR guides (primexstudy, gdaydoctor), India-focused coaching (academically, mokshacademy), and QBank products (amcbootcamp, canadaqbank). **None offer a planning tool or a day-by-day schedule.** That's StudyRise's wedge. Hooks: 2026 pass-standard change; the free 210-question eMedici prep app; "study plan / schedule / questions-per-day" angles where AI Overviews are thin or absent.

**MBBS Bangladesh:** Almost zero credible English content for *Bangladeshi* students preparing for professional exams. What ranks is foreign-student recruitment sites (writing for Indian students going to BD) and generic admission-result pages. **Effectively uncontested — fast-track this entire segment.** This is the single biggest greenfield opportunity in the project.

**PLAB / USMLE:** More competitive and more saturated with established players. Compete on the *planning* angle (schedules, timelines, spaced-repetition integration) rather than trying to out-resource the big QBank brands. Comparison content ("PLAB vs USMLE", "AMC vs PLAB vs USMLE") still earns clicks from people choosing a pathway.

**General study (ALL):** High volume, high competition, high AI-Overview risk. Use these to build topical authority and internal-linking depth, not as the primary click engine.

---

## Brand Entity & Off-Page Authority

In 2026, Google's AI needs to understand *what StudyRise is, who it serves, and how it differs.* Manipulative link schemes are now actively risky. The play is genuine entity-building and earned mentions.

**Entity definition (make StudyRise a recognisable "thing"):**
- Consistent brand block everywhere: same name ("StudyRise"), same one-line description, same logo, same `hello@studyrise.app`.
- `Organization` schema with `sameAs` linking every official profile (X, LinkedIn, Instagram, Product Hunt, Crunchbase). `sameAs` is how Google connects scattered presence into one entity.
- Create those off-site profiles — each is an unlinked-or-linked brand signal. Consider Wikidata once StudyRise has independent coverage.

**Earned links and mentions (quality over quantity):**
- **Quality directories only:** Product Hunt, AlternativeTo (list StudyRise as a Notion/Anki alternative), relevant "best study apps" roundups. Skip PBN links, bulk link packages — they're worse than nothing now.
- **Community presence:** student subreddits (r/medicalschool, r/IMGreddit, r/USMLE, r/GetStudying), IMG Facebook groups, Bangladeshi medical-student communities. Be a genuinely helpful participant who occasionally links the tool or a relevant article.
- **Original-data PR (highest leverage):** StudyRise sits on real usage data. One honest data piece per quarter — e.g. "We analysed N study plans: how far ahead students actually plan." Original statistics are the #1 thing AI Overviews and journalists cite because you're the only possible source. Anonymise/aggregate properly; never expose user data.
- **Guest contribution:** offer genuinely useful pieces to edtech/medical-education blogs and newsletters. One editorial link from a real publisher outweighs 50 directory links.

---

## Internal Linking Architecture

Internal links spread ranking equity and tell Google the site's structure. Free and high-impact, easy to neglect.

- **Hub-and-spoke per segment.** Each segment landing page is a hub; related blog articles are spokes that link up to the hub; the hub links down to the spokes. This builds the topical-authority clusters.
- **Every article links to the conversion page** (`/study-planner` or the relevant segment page) with descriptive anchor text — this is how readers become sign-ups and how equity reaches the money pages.
- **Related-articles block** at the bottom of every article (2–4 contextual links). Update older articles to link to new ones when publishing — don't leave new posts orphaned.
- **Descriptive anchors only.** "PLAB 1 study planner", "spaced repetition guide" — never "read more" or "click here". The anchor text is a ranking signal for the target page.
- **Breadcrumbs** (`Home › Blog › Article`) with `BreadcrumbList` schema on every article. Details in `04_SEO_TECHNICAL_RULES.md`.
- **No orphans.** Re-crawl quarterly (Screaming Frog) to confirm every indexable page is reachable within 3 clicks of the homepage.

---

## Regional SEO — Bangladesh + IMG Markets

StudyRise has explicit regional targets (Bangladesh for USM/MBBS) and geographically-clustered IMG audiences (UK for PLAB, US for USMLE, Australia for AMC). Use that specificity.

- **Geo-modified long-tail content** where natural: "MBBS study planner Bangladesh", "BMDC exam preparation", "PLAB study plan UK". Low competition, high relevance.
- **Localise examples** in regional articles — BDT pricing context for Bangladesh pieces, UK/AUS/US exam-board specifics in IMG pieces. This reads as genuinely written for that audience, a relevance signal for both classic and AI search.
- **Regional communities** (see Brand Entity above): Bangladeshi medical-student groups, country-specific IMG forums — this is where the wedge markets actually live.
- **`hreflang` is not needed** — one English site, no translated versions. Only revisit if localised into Bangla. Misconfigured hreflang causes more harm than good; don't add it prematurely.
- **Google Business Profile is N/A** — StudyRise is a web product with no physical location.

---

## ⚠️ Accuracy Guardrail: BMDC Curriculum

Before writing **any** MBBS-BD article that states curriculum specifics (which subject sits in which professional phase), **verify the current BMDC 2021 placement from an authoritative source** and confirm with Istiaque. There is a known discrepancy in older internal notes about where Community Medicine, Pharmacology, Forensic Medicine, Pathology, and Microbiology sit across 2nd and 3rd Prof. Publishing a wrong phase mapping would damage credibility with the exact expert audience StudyRise needs to win. **When in doubt, confirm — never guess a curriculum fact.**

---

## What "Done" Looks Like Strategically

A content piece is strategically sound when you can complete all of these sentences:
- "This page owns the keyword ___, and no other StudyRise page targets it."
- "The intent is T/C/I, so the angle is ___."
- "This is different from and better than what currently ranks because ___."
- "It links to ___ (internal) and earns trust by citing ___ (authoritative external)."
- "It serves the [EXAM]/[UNI]/[MBBS-BD]/[ALL] funnel by moving the reader toward ___."

If you can't complete them, refine the brief before writing.

---

## Baseline Setup (Do Before Any Content Work)

You cannot improve what you cannot see. Complete this before writing a word.

- **Google Search Console:** Add `https://studyrise.app` as a *Domain* property (DNS TXT record at Namecheap) — covers all subdomains and protocols in one. The single most important SEO tool; it is free.
- **Submit the sitemap** in GSC → Sitemaps → `https://studyrise.app/sitemap.xml` (after Phase 1 technical fixes are deployed).
- **Bing Webmaster Tools:** Import directly from GSC (one click). Bing feeds ChatGPT search — free AI-search visibility.
- **Analytics with conversion tracking.** Define one primary conversion: **account sign-up**. One secondary: **plan created**. Without conversion tracking, there is no way to know which keywords actually matter.
- **Track AI referral traffic in GA4.** Configure GA4 to make AI-sourced sessions visible — create a custom channel group / segment (or a referral filter / comparison) for the AI search referrers: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`. Without this, AI-driven sessions and sign-ups hide inside "Referral" or "Direct" and you can't see the GEO payoff. This is the only quantitative read on AI traffic — GSC can't isolate it.
- **Baseline crawl.** Screaming Frog (free ≤500 URLs) — inventory every `public/` page: title, meta description, H1, status code, canonical, word count. Save as `seo-baseline-YYYY-MM.csv`. Re-run quarterly.
- **PageSpeed baseline.** Run PageSpeed Insights on `/`, `/study-planner`, `/features`, and one blog article. Record CWV numbers. These are the "before" benchmark.
- **AI Overview baseline.** Search the 10 most important target queries in incognito. For each: does an AI Overview appear? Is StudyRise cited? Who *is* cited? Save as `aio-baseline-YYYY-MM.md`. Update monthly — GSC cannot isolate AI-search traffic.

---

## Staying Ranked — The Maintenance Machine

Ranking once is easy to lose. Staying in Google is a recurring habit, not a project. Put these on a literal calendar.

### Weekly (15–30 min)
- GSC → Performance: scan for queries gaining/losing impressions or CTR. Note pages slipping in position.
- GSC → Pages/Indexing: check for new "Not indexed" errors. Fix promptly.
- Publish per cadence (1–2 articles/week) and request-index new URLs.

### Monthly (1–2 hrs)
- Update the **`aio-baseline` log** for priority queries — is StudyRise being cited more/less? Test the same queries in ChatGPT, Perplexity, Gemini.
- Identify **decaying content** (articles down >5 positions or losing clicks). Queue the worst 1–2 for refresh.
- **Content refresh loop:** update stats/dates, add newly trending "People also ask" questions, improve the intro answer, add an internal link from a newer post, bump `dateModified` in schema and `lastmod` in sitemap. Refreshing beats writing-new for ROI once there's a back catalogue.
- Add new internal links from older posts to the month's new posts.

### Quarterly (half day)
- Full **Screaming Frog re-crawl** vs. baseline: broken links, redirect chains, missing titles/descriptions, duplicate canonicals, orphan pages.
- Re-validate **all structured data** (Rich Results Test) — schema breaks silently when templates change.
- **Competitor scan:** who's ranking/cited for the top 10 keywords now? What did they add? Close the gap.
- Publish the quarterly **original-data piece** (see Brand Entity above).
- Re-run **PageSpeed** on key pages; confirm CWV still pass.

### Freshness cadence by content type
Different pages decay at different speeds, so review them on different clocks:

- **Exam-sensitive and pricing pages** (exam dates, formats, pass marks, fees, plan prices) — review every **[CONFIRM: 90 days]**. These carry facts that go stale fast and quietly mislead the exact expert audience StudyRise needs.
- **Evergreen content** (study-technique guides, how-tos) — review every **[CONFIRM: 6 months]**.

A **refresh** means: update the facts/dates, bump `dateModified` in the JSON-LD **and** `lastmod` in the sitemap, and update the visible "Last updated: {Month YYYY}" line near the H1 — all three in lockstep (see file 04). The monthly content-refresh loop above handles ad-hoc decay; this cadence is the scheduled floor so a page never goes unreviewed.

### After any traffic drop
Don't panic-edit. Confirm in GSC it's a real, sustained drop (not a reporting blip). Identify which pages/queries dropped, read Google's update notes, and improve the affected pages' helpfulness and originality. Recovery is a content-quality exercise, not a trick.

---

## Metrics, KPIs & Tracking

**Primary KPIs (review monthly in GSC + analytics):**
- Organic **impressions** — early leading indicator, rises before clicks do
- Organic **clicks** to marketing/segment/blog pages
- **Sign-up conversions from organic** — the number that actually matters
- **Indexed page count** — every new page should appear within ~2 weeks
- **Average position** for priority-map keywords

**AI-search KPIs (manual, monthly — GSC cannot isolate these):**
- AI Overview **citation count** for priority queries (from `aio-baseline` log)
- **AI referral sessions & sign-ups (GA4)** — sessions and conversions from `chatgpt.com` / `perplexity.ai` / `gemini.google.com` / `copilot.microsoft.com` (the GA4 AI channel/segment from Baseline Setup), reviewed monthly. The one quantitative read on AI traffic.
- **Brand mentions** in ChatGPT / Perplexity / Gemini for category queries ("best study planner for PLAB" → is StudyRise named?)
- **Branded search volume** trend (people searching "StudyRise" directly = entity strength)

**Health KPIs (quarterly):**
- Core Web Vitals pass rate
- Crawl errors / broken links (trend to zero)
- Referring domains from *real* sites (quality, not raw count)

Build one `seo-dashboard` sheet with a row per month and these columns. Fill it the first week of every month. Trends matter more than any single number.

**Realistic timeline:** new content typically takes **3–6 months** to mature in rankings; a new domain takes longer to earn trust. Expect impressions to move first, then positions, then clicks, then conversions. Consistency over 6–12 months is what compounds — sporadic bursts don't rank.

---

## Appendix A — Keyword Map (starting skeleton)

> Volume/difficulty bands are placeholders — validate each with a free tool before committing. Intent: **T**ransactional · **C**ommercial · **I**nformational.

### Segment 1 — IMG / medical licensing
| Keyword (seed) | Intent | AIO risk | Owner URL |
|---|---|---|---|
| plab 1 study planner / study plan app | T | Low | `/plab-1-study-planner` |
| usmle step 1 study planner / schedule | T | Low | `/usmle-step-1-study-planner` |
| amc mcq study planner / study schedule | T | Low | `/amc-mcq-study-planner` |
| plab 1 study plan 3 months | I/C | Med | `/blog/plab-1-study-plan` |
| usmle step 1 study schedule 3 month | I/C | Med | `/blog/usmle-step-1-study-schedule` |
| amc vs plab vs usmle | C | Med | `/blog/amc-vs-plab-vs-usmle` |
| how many questions per day usmle/plab | I | High | `/blog/questions-per-day-study-guide` |

### Segment 2 — University students
| Keyword (seed) | Intent | AIO risk | Owner URL |
|---|---|---|---|
| study planner for university | T | Low | `/university-study-planner` |
| free study planner / schedule maker | T | Low | `/study-planner`, `/` |
| best free study planners 2026 | C | Med | `/blog/best-free-study-planners` |
| how to organise university semester | I | High | `/blog/university-semester-organisation` |
| gpa calculator / how to calculate gpa | I | High | `/blog/gpa-calculator-guide` |
| what is wam / weighted average mark | I | High | `/blog/what-is-wam` |
| studyrise vs notion (study planning) | C | Low | `/blog/studyrise-vs-notion` |
| anki alternative / anki vs studyrise | C | Low | `/blog/anki-vs-studyrise` |

### Segment 3 — MBBS Bangladesh / BMDC (the wedge)
| Keyword (seed) | Intent | AIO risk | Owner URL |
|---|---|---|---|
| mbbs study planner (bangladesh) | T | Low | `/mbbs-study-planner` |
| bmdc professional exam preparation | I/C | Low | `/mbbs-study-planner` + article |
| mbbs study routine / schedule | I | Med | new blog article |
| send-up / professional exam study plan | I/C | Low | new blog article |

### Cross-segment study-technique pillar (authority/citation plays)
| Keyword (seed) | Intent | AIO risk | Owner URL |
|---|---|---|---|
| how to create a study plan | I | High | `/blog/how-to-create-a-study-plan` |
| spaced repetition (for students) | I | High | `/blog/spaced-repetition-guide` |
| active recall | I | High | `/blog/active-recall-guide` |
| pomodoro technique for studying | I | High | `/blog/pomodoro-technique-guide` |
| how to study for exams | I | High | `/blog/how-to-study-for-exams` |
| study burnout / how to stay consistent | I | High | `/blog/study-burnout-guide` |
| how to track study progress | I/C | Med | `/blog/how-to-track-study-progress` |

---

## Appendix B — Tools (all free or freemium)

| Job | Tool | Cost |
|---|---|---|
| Measurement / index status / queries | **Google Search Console** | Free |
| Bing + ChatGPT-feed visibility | **Bing Webmaster Tools** | Free |
| Traffic + conversion | GA4 / Plausible / Umami | Free–low |
| Site crawl / technical audit | **Screaming Frog** (≤500 URLs) | Free |
| Speed / Core Web Vitals | **PageSpeed Insights** | Free |
| Keyword volume | Google Keyword Planner; Ahrefs/Semrush free tiers; Keyword Surfer | Free–freemium |
| Question mining | AnswerThePublic; "People also ask"; AlsoAsked | Free–freemium |
| Schema validation | Google Rich Results Test; Schema.org validator | Free |
| Social card check | Facebook Sharing Debugger; X Card Validator | Free |
| OG images / diagrams | Canva (per `07_IMAGE_PROTOCOL.md`) | Free |
| Image compression / WebP | Squoosh; TinyPNG | Free |
| Backlink / mention check | GSC Links; Ahrefs Webmaster Tools (free for verified site) | Free |
| AI-citation tracking | Manual log + ChatGPT / Perplexity / Gemini spot-checks | Free |

---
<!-- docnav-related -->
### Related docs
- [01 · CONTEXT — Read This First, Every Time](01_CONTEXT.md)
- [02 · BRAND VOICE — How StudyRise Sounds in Writing](02_BRAND_VOICE.md)
- [04 · SEO TECHNICAL RULES — Non-Negotiables for Every HTML File](04_SEO_TECHNICAL_RULES.md)
- [05 · CONTENT PIPELINE — The Master Queue](05_CONTENT_PIPELINE.md)
- [06 · PRODUCTION PLAYBOOK — How to Make One Article, End to End](06_PRODUCTION_PLAYBOOK.md)
- [07 · IMAGE PROTOCOL — The Locked Image Rules](07_IMAGE_PROTOCOL.md)
- [08 · DEPLOYMENT GUIDE — Delivering the Finished File](08_DEPLOYMENT_GUIDE.md)
- [09 · AUDIT PLAYBOOK — Periodic SEO Health Checks](09_AUDIT_PLAYBOOK.md)
- [Blog Page Animation & Motion Guide](BLOG_ANIMATIONS_GUIDE.md)
- [Brand Kit → moved (de-duplicated)](BRAND_KIT.md)
- [Design Prompts → moved (de-duplicated)](DESIGN_PROMPTS.md)
- [StudyRise — Static Page Motion Guide](MOTION_GUIDE.md)
- [README — How to Use the StudyRise Content & SEO Brain](README.md)

_Up: [docs index](../README.md) · [CLAUDE.md](../../CLAUDE.md)_
